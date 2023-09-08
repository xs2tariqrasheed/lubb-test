import { useEffect, useState } from "react";
import fetchUserData from "@/utils/getUser";
import { useRouter } from "next/navigation";
import { auth, onAuthStateChanged, signOut } from "@/config/firebase";

function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        // For google Auth User
        if (authUser?.displayName) {
          setUser({
            name: authUser.displayName,
            email: authUser.email,
          });
          setIsLoading(false);
        } else {
          // User is signed in, fetch their data from Firestore
          const userData = await fetchUserData(authUser.uid);
          console.log("userData", userData);
          setUser(userData);
          setIsLoading(false);
        }
      } else {
        // User is not signed in
        setUser(null);
        setIsLoading(false);
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      router.replace("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {isLoading ? (
        <p className="text-xl text-gray-800 font-semibold">Loading...</p>
      ) : (
        <>
          {user ? (
            <div>
              <h1 className="text-2xl text-gray-700 font-semibold mb-4">
                Welcome, {user.name}!
              </h1>
              <p className="text-xl text-gray-500 font-semibold mb-4">
                Email: {user.email}
              </p>
              <button
                type="button"
                onClick={handleLogout}
                className="bg-blue-500 mt-4 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <p className="text-xl text-gray-800 font-semibold">
              User not signed in.
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
