import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId"); // Retrieve session ID from localStorage

    if (!sessionId) {
      router.push("/login"); // Redirect to login page if no session ID is found
      return;
    }

    // Send a POST request to the Flask backend to validate the session
    const validateSession = async () => {
      try {
        const response = await fetch("http://localhost:8800/checkSess", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: sessionId }),
        });

        if (!response.ok) {
          throw new Error("Failed to validate session");
        }

        const data = await response.json();
        console.log(data);
        if (data.isValid) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("sessionId"); // Clear invalid session ID
          router.push("/login"); // Redirect to login if session is invalid
        }
      } catch (error) {
        console.error("Error validating session:", error);
        router.push("/login"); // Redirect to login if an error occurs
      }
    };

    validateSession();
  }, [router]);

  if (!isAuthenticated) {
    return <div>Loading...</div>; // Show a loading indicator while checking authentication
  }

  return <>{children}</>;
}
