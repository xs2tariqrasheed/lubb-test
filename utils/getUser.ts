import { db } from "@/config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

async function fetchUserData(uid: string) {
  try {
    const usersCollectionRef = collection(db, "users");
    const q = query(usersCollectionRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // There should be only one user with the matching UID
      const userDocSnapshot = querySnapshot.docs[0];
      return userDocSnapshot.data();
    } else {
      return null; // User not found in Firestore
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
}

export default fetchUserData;
