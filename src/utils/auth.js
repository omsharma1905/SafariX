import { doc, getDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";

export const validateUserSession = async () => {
  const user = JSON.parse(localStorage.getItem("user"))

  // No local user → not logged in
  if (!user?.email) {
    return false
  }

  // Check Firestore
  const userRef = doc(db, "users", user.email)
  const userSnap = await getDoc(userRef)

  // User deleted from DB → force logout
  if (!userSnap.exists()) {
    localStorage.removeItem("user")
    return false
  }

  return true
}