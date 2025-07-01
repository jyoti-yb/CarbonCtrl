import { initializeApp, getApps, type FirebaseApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// Collect config from env – ALL of these must be non-empty
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
} as const

// Utility: make sure we have the bare minimum to avoid auth/invalid-api-key
function isValidConfig(cfg: Record<string, string | undefined>) {
  return Object.values(cfg).every((v) => typeof v === "string" && v.length > 0)
}

let firebaseApp: FirebaseApp | undefined

if (getApps().length) {
  // Re-use existing instance (e.g. hot-reload)
  firebaseApp = getApps()[0]
} else if (isValidConfig(firebaseConfig)) {
  firebaseApp = initializeApp(firebaseConfig)
} else {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.warn(
      "[Firebase] Missing env vars – Firebase auth disabled. " +
        "Add all NEXT_PUBLIC_FIREBASE_* keys to enable authentication.",
    )
  }
}

// Export services only if the app was successfully initialised
export const auth = firebaseApp ? getAuth(firebaseApp) : undefined
export const db = firebaseApp ? getFirestore(firebaseApp) : undefined
export default firebaseApp
