import { getAuth, connectAuthEmulator } from "firebase/auth";

const auth = getAuth();
connectAuthEmulator(auth, "http://localhost:9099");

export FIREBASE_AUTH_EMULATOR_HOST="localhost:9099"