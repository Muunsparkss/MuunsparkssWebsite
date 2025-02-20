const fs = require("fs");
const path = require("path");
const { randomInt } = require("crypto");
const { format } = require("date-fns");

const sessionsDir = path.join(__dirname, "sessions");

// Create a new session
const createSession = () => {
  try {
    // Ensure the sessions directory exists
    if (!fs.existsSync(sessionsDir)) {
      fs.mkdirSync(sessionsDir);
    }

    // Clean up old sessions if more than 1000 exist
    const files = fs.readdirSync(sessionsDir);
    if (files.length > 1000) {
      files.forEach((file) => fs.unlinkSync(path.join(sessionsDir, file)));
    }

    // Generate a unique session ID
    const sessionId = randomInt(1, 100000000);

    // Create session data
    const sessionData = {
      sId: sessionId,
      date: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    };

    // Save the session data to a JSON file
    const sessionFilePath = path.join(sessionsDir, `${sessionId}.json`);
    fs.writeFileSync(sessionFilePath, JSON.stringify(sessionData, null, 2));

    return sessionId;
  } catch (err) {
    console.error("Error creating a session:", err);
    return null;
  }
};

// Check if a session is valid
const checkSession = (sessionId) => {
  const sessionFilePath = path.join(sessionsDir, `${sessionId}.json`);
  if (!fs.existsSync(sessionFilePath)) return { isValid: false };

  try {
    const sessionData = JSON.parse(fs.readFileSync(sessionFilePath));
    const sessionDate = new Date(sessionData.date);

    // Check if the session date is older than 7 days
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    if (sessionDate < sevenDaysAgo) return { isValid: false };

    return { isValid: true };
  } catch (err) {
    console.error("Error checking session:", err);
    return { isValid: false };
  }
};

module.exports = { createSession, checkSession };
