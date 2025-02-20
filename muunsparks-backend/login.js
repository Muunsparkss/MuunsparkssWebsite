const fs = require("fs");
const path = require("path");
const session = require("./session");

const checkAuth = (cred) => {
  const authFilePath = path.join(__dirname, "auth", "auth.json");
  let credJson;

  // Safely read the auth.json file
  try {
    credJson = JSON.parse(fs.readFileSync(authFilePath));
  } catch (err) {
    console.error("Error reading auth.json:", err);
    return { auth: false, error: "Server error: unable to read authentication file." };
  }
    const sessionId = cred.sId;
    console.log(`Checking for an existing session: ${sessionId}`);
    const checkSess = session.checkSession(sessionId);

    if (checkSess.isValid) {
      console.log("Session found");
      return { auth: true, id: sessionId };
    }else{
      console.warn("No existing session or invalid session ID");

      // Check credentials if session is not found or invalid
      if (credJson.uName === cred.uName && credJson.pwd === cred.pwd) {
        console.log("Credentials match. Creating a new session...");
        const newId = session.createSession();
  
        if (!newId) {
          console.error("Failed to create a new session.");
          return { auth: false, error: "Server error: unable to create a session." };
        }
  
        console.log(`New session created with ID: ${newId}`);
        return { auth: true, id: newId };
      } else {
        console.warn("Credentials do not match.");
      }

    }
  return { auth: false };
};

module.exports = { checkAuth };
