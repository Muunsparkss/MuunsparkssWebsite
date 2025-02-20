const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const login = require("./login");
const session = require("./session");

const app = express();
const PORT = 8800;

// Enable CORS for specific origins
app.use(cors({
  origin: 'http://127.0.0.1:3000', // Allow requests from this origin
  methods: ['GET', 'POST'], // Allow specific HTTP methods
  credentials: true, // If you need to send cookies or authentication
}));

// Middleware to parse JSON request bodies
app.use(express.json());

// Set up multer storage with dynamic file naming
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../muunsparks-blog/public/images"); // Save the files in the 'uploads' directory
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // Get the file extension
    const filename = Date.now() + ext; // Generate a unique filename using timestamp
    cb(null, filename); // Use the generated filename
  },
});

// Set up multer for file uploads
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Only allow image files (jpg, jpeg, png, gif)
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPG, JPEG, PNG, GIF are allowed."), false);
    }
  },
}).single("image"); // Handling a single file uploaded with field name "image"

// Ensure the upload folder exists
const uploadFolder = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

// Folder where blog posts will be saved
const BLOG_POSTS_FOLDER = path.join(__dirname, "../muunsparks-blog/pages/blog");
const BLOG_POSTS_FOLDER_BACKEND = path.join(__dirname, "blog_posts");

// Ensure the blog_posts folder exists
if (!fs.existsSync(BLOG_POSTS_FOLDER_BACKEND)) {
  fs.mkdirSync(BLOG_POSTS_FOLDER_BACKEND);
}

// Function to create a slug from a title
const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, "");   // Remove leading or trailing hyphens
};

// Function to get the next ID by finding the highest current ID
const getNextId = () => {
  const files = fs.readdirSync(BLOG_POSTS_FOLDER_BACKEND);
  const ids = files
    .filter(file => file.endsWith(".json"))
    .map(file => parseInt(file.split(".")[0]));
  return Math.max(0, ...ids) + 1;
};

// Ensure "contacts" directory exists
const contactsDir = path.join(__dirname, "contacts");
if (!fs.existsSync(contactsDir)) {
  fs.mkdirSync(contactsDir);
}

// Handle Contact Form Submission
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const timestamp = new Date().toISOString().replace(/:/g, "-");
  const filename = `${contactsDir}/${timestamp}.txt`;

  const content = `Name: ${name}\nEmail: ${email}\nMessage:\n${message}\n\n`;

  fs.writeFile(filename, content, (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to save message." });
    }
    res.json({ message: "Message received successfully!" });
  });
});

app.post("/upload-image", upload, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image file uploaded." });
  }

  // Send back the relative path of the uploaded image
  const imagePath = `http://localhost:3000/images/${req.file.filename}`;
  return res.status(200).json({ imagePath });
});

// Function to create a blog page for Next.js
const createNextJsPage = (post) => {
  const contentString = JSON.stringify(post.content);
  const contentDate = JSON.stringify(post.date_time.slice(0, 10));
  
  const pageContent = `
import React from "react";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import 'highlight.js/styles/github.css'; // Code block styles

const BlogPost = () => {
  return (
    <Layout>
    <div>
      <h1 className="text-3xl font-semibold text-center justify-center mb-6">${post.title}</h1>
      <div className="text-center items-center justify-center">
      <p>Posted on: {${contentDate}}</p>
      </div>
      <div className="max-w-3xl mx-auto p-6 bg-black shadow-md page-content">
      <ReactMarkdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]}>
        {${contentString}} 
      </ReactMarkdown>
      </div>
    </div>
    </Layout>
  );
};

export default BlogPost;
`;

  const slug = createSlug(post.title);
  const blogPagePath = path.join(
    BLOG_POSTS_FOLDER, `${slug}.js`
  );
  fs.writeFileSync(blogPagePath, pageContent);

  return slug; // Return slug for response
};

// Endpoint to create a new post
app.post("/newpost", (req, res) => {
  const data = req.body;

  // Add metadata
  data.date_time = new Date().toISOString();
  const postId = getNextId();
  data.id = postId;

  // Save the JSON data
  const postFilePath = path.join(BLOG_POSTS_FOLDER_BACKEND, `${postId}.json`);
  fs.writeFileSync(postFilePath, JSON.stringify(data, null, 4));

  // Create the blog page for Next.js
  const slug = createNextJsPage(data);

  res.status(200).json({ message: "Post saved successfully!", id: postId, slug });
});

// Endpoint to get the latest 10 blog posts
app.get("/blog-posts", (req, res) => {
  const blogPosts = fs.readdirSync(BLOG_POSTS_FOLDER_BACKEND)
    .filter(file => file.endsWith(".json"))
    .slice(0, 10) // Limit to the latest 10 posts
    .map(file => {
      const postData = fs.readFileSync(path.join(BLOG_POSTS_FOLDER_BACKEND, file), "utf-8");
      return JSON.parse(postData);
    });

  res.status(200).json(blogPosts);
});

// Endpoint to handle login attempts
app.post("/logAtt", (req, res) => {
  const data = req.body;
  console.log(data);
  const result = login.checkAuth(data);
  res.json(result);
});

// Endpoint to check session validity
app.post("/checkSess", (req, res) => {
  const data = req.body;
  const result = session.checkSession(data.id);
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
