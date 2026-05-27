import { doc, getDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";

export const validateUserSession = async () => {
  const user = JSON.parse(localStorage.getItem("user"))

  if (!user?.email) {
    return false
  }

  const userRef = doc(db, "users", user.email)
  const userSnap = await getDoc(userRef)

  if (!userSnap.exists()) {
    localStorage.removeItem("user")
    return false
  }

  return true
}
