import { useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import {
  auth,
  db,
  googleAuthProvider,
  isFirebaseConfigured,
} from '../../../services/firebaseClient';
import './AdminAuthGate.scss';

/**
 * Restricts the admin workspace to Google accounts enabled in Firestore.
 * @param {Object} props Component properties.
 * @param {React.ReactNode} props.children Dashboard rendered for an authorized user.
 * @returns {JSX.Element} Sign-in, access-denied, loading, or protected dashboard view.
 */
function AdminAuthGate({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [hasCopiedUid, setHasCopiedUid] = useState(false);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setIsCheckingSession(false);
      return undefined;
    }

    let isMounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!isMounted) {
        return;
      }

      setUser(currentUser);
      setIsAuthorized(false);
      setErrorMessage('');

      if (!currentUser) {
        setIsCheckingSession(false);
        return;
      }

      setIsCheckingSession(true);

      try {
        const adminDocument = await getDoc(doc(db, 'admins', currentUser.uid));
        const adminIsEnabled = adminDocument.exists() && adminDocument.data().enabled === true;

        if (isMounted) {
          setIsAuthorized(adminIsEnabled);
          setIsCheckingSession(false);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error.message);
          setIsCheckingSession(false);
        }
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  async function handleGoogleSignIn() {
    setIsSigningIn(true);
    setErrorMessage('');

    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (error) {
      if (error.code !== 'auth/popup-closed-by-user') {
        setErrorMessage(error.message);
      }
    } finally {
      setIsSigningIn(false);
    }
  }

  async function handleSignOut() {
    await signOut(auth);
    setUser(null);
    setIsAuthorized(false);
    setHasCopiedUid(false);
  }

  async function handleCopyUid() {
    await navigator.clipboard.writeText(user.uid);
    setHasCopiedUid(true);
  }

  if (!isFirebaseConfigured) {
    return (
      <main className="admin-auth-gate">
        <section className="admin-auth-card" aria-labelledby="admin-auth-title">
          <span className="admin-auth-card__eyebrow">FIREBASE SETUP REQUIRED</span>
          <h1 id="admin-auth-title">Configure Firebase to open the admin</h1>
          <p>
            Add the Firebase project values from <code>frontend/.env.example</code> to your local
            environment and Vercel settings.
          </p>
        </section>
      </main>
    );
  }

  if (isCheckingSession) {
    return (
      <main className="admin-auth-gate" aria-live="polite">
        <p className="admin-auth-gate__status">Checking Google account access…</p>
      </main>
    );
  }

  if (user && isAuthorized) {
    return children;
  }

  return (
    <main className="admin-auth-gate">
      <section className="admin-auth-card" aria-labelledby="admin-auth-title">
        <span className="admin-auth-card__eyebrow">LY GIA HUY · CONTENT STUDIO</span>
        <h1 id="admin-auth-title">Admin sign in</h1>

        {!user ? (
          <>
            <p>Sign in with the Google account authorized to manage this portfolio.</p>
            <button
              className="admin-auth-card__google-button"
              disabled={isSigningIn}
              onClick={handleGoogleSignIn}
              type="button"
            >
              <span aria-hidden="true">G</span>
              {isSigningIn ? 'Connecting to Google…' : 'Continue with Google'}
            </button>
          </>
        ) : (
          <div className="admin-auth-card__access-denied" role="status">
            <p>
              Signed in as <strong>{user.email}</strong>, but this account is not enabled as a
              portfolio admin yet.
            </p>
            <p className="admin-auth-card__uid-label">Add this UID as an enabled document at:</p>
            <code>admins/{user.uid}</code>
            <button className="admin-auth-card__copy-button" onClick={handleCopyUid} type="button">
              {hasCopiedUid ? 'UID copied' : 'Copy UID'}
            </button>
            <button className="admin-auth-card__signout" onClick={handleSignOut} type="button">
              Sign out
            </button>
          </div>
        )}

        {errorMessage && (
          <p className="admin-auth-card__error" role="alert">
            {errorMessage}
          </p>
        )}
      </section>
    </main>
  );
}

export default AdminAuthGate;
