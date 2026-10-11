import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  runTransaction,
  writeBatch,
} from 'firebase/firestore';
import { bundledBrands } from './brandService';
import { bundledContact } from './contactService';
import { bundledProjects } from './projectService';
import { db, requireFirebase } from './firebaseClient';
import { bundledProfile } from './profileService';

/**
 * Seeds the current bundled portfolio content once, and only into empty
 * collections. The caller must be signed in as an enabled Firestore admin.
 * @returns {Promise<void>} Resolves after the initial content batch commits.
 * @throws {Error} If any content collection already has records.
 */
export async function seedInitialPortfolioContent() {
  requireFirebase();

  const collectionNames = ['brands', 'projects', 'contact'];
  const snapshots = await Promise.all(
    collectionNames.map((name) => getDocs(query(collection(db, name), limit(1)))),
  );

  if (snapshots.some((snapshot) => !snapshot.empty)) {
    throw new Error(
      'Firestore already contains portfolio records. Initial import only runs on an empty database.',
    );
  }

  const batch = writeBatch(db);
  const profileReference = doc(db, 'profile', 'primary');
  const profileSnapshot = await getDoc(profileReference);

  bundledBrands.forEach((brand, displayOrder) => {
    batch.set(doc(db, 'brands', brand.slug), { ...brand, displayOrder });
  });

  bundledProjects.forEach((project) => {
    batch.set(doc(db, 'projects', project.id), project);
  });

  batch.set(doc(db, 'contact', 'primary'), bundledContact);
  if (!profileSnapshot.exists()) {
    batch.set(profileReference, bundledProfile);
  }
  batch.set(doc(db, 'settings', 'initialContent'), {
    initializedAt: new Date().toISOString(),
    brandCount: bundledBrands.length,
    projectCount: bundledProjects.length,
    profileImported: !profileSnapshot.exists(),
  });

  await batch.commit();
}

/**
 * Saves the bundled profile only when no profile document exists yet.
 * This supports migrating an already-imported portfolio without replacing
 * existing brand, project, or contact content.
 * @returns {Promise<boolean>} True when the profile was created; false if it existed.
 * @throws {Error} If Firebase is not configured or Firestore rejects the write.
 */
export async function seedBundledProfileIfMissing() {
  requireFirebase();

  const profileReference = doc(db, 'profile', 'primary');

  return runTransaction(db, async (transaction) => {
    const profileSnapshot = await transaction.get(profileReference);

    if (profileSnapshot.exists()) {
      return false;
    }

    transaction.set(profileReference, bundledProfile);

    return true;
  });
}
