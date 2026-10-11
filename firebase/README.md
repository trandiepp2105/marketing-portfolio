# Firebase setup for the portfolio

The frontend uses Firebase Authentication with Google Sign-In and Cloud
Firestore. Visitors can read portfolio content. Writes are restricted by
`firestore.rules` to user IDs explicitly enabled in the `admins` collection.

## 1. Create and configure a Firebase project

1. Firebase project `ly-gia-huy-portfolio` and web app `portfolio-web` are
   created in Firebase Console.
2. The default Cloud Firestore database is in **Production mode** in
   `asia-southeast1` (Singapore).
3. **Google** sign-in is enabled with support email
   `tranvandiepp2105@gmail.com`.
4. `localhost` and `marketing-portfolio-gold-iota.vercel.app` are authorized
   authentication domains.
5. The local Web app configuration is stored in the ignored file
   `frontend/.env.local`. The variable names are documented in
   `frontend/.env.example`.

Firebase web configuration values are public identifiers. Never put a service
account private key in the frontend or Vercel's `REACT_APP_` variables.

## 2. Deploy Firestore rules

Firestore rules in `firestore.rules` have been published in Firebase Console.
To deploy later rule or index changes, sign in to the Firebase CLI, select your
project, and deploy only Firestore:

```sh
npx firebase-tools login
npx firebase-tools use --add
npx firebase-tools deploy --only firestore
```

The rules permit public reads of `brands`, `projects`, `contact`, and `profile`,
but deny client writes unless the signed-in user's UID has an enabled admin
document. Admin documents cannot be created or changed from the website.

## 3. Enable your admin account

1. Run the site locally with the Firebase config and open `/admin`.
2. Sign in with your Google account. The page will show your Firebase UID while
   access is pending.
3. In **Firestore Database → Data**, create a collection named `admins`, then
   create a document whose document ID is that UID. Add a Boolean field
   `enabled` with value `true`.
4. Return to `/admin` and sign in again. Use **Import current portfolio data**
   to populate the initially empty `brands`, `projects`, and `contact`
   collections with the current portfolio content.

The initial import is allowed only while `brands`, `projects`, and `contact`
are empty, so it cannot overwrite edited data. It inserts 2 brands, 7 projects,
one contact document, and the initial `profile/primary` document. If the other
portfolio collections were already imported, use **Save profile to Firebase**
in the admin header. It only creates `profile/primary` when that document is
missing and leaves existing profile content intact.

## 4. Configure Vercel

All six variables from `frontend/.env.example` are configured in the Vercel
project for Production, Preview, and Development. Vercel needs a new deployment
to apply them. Keep the Vercel Root Directory set to `frontend`.

Google sign-in and Firestore reads are connected. The dashboard's add-brand,
add-project, project reordering, and one-time profile migration persist to
Firestore. Edit/delete controls and contact editing are still UI placeholders
and need their own implementation before those changes can be saved.
