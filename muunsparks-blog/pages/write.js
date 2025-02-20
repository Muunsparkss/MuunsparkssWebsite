import { useState, useRef } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import Layout from "../components/Layout";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import 'highlight.js/styles/github.css'; // Code block styles
import 'easymde/dist/easymde.min.css'; // EasyMDE styles

// Dynamically import SimpleMDE to prevent server-side rendering issues
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

export default function WriteBlog() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const contentRef = useRef(''); // Store content in a ref
  const [imageUrl, setImageUrl] = useState(""); // State to store image URL

  // Handle changes to the content editor
  const handleEditorChange = (value) => {
    contentRef.current = value; // Update the contentRef with the new value
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    try {
      const response = await fetch('http://127.0.0.1:8800/upload-image', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (result.imagePath) {
        // Insert the image markdown into the content
        const imageMarkdown = `![image](${result.imagePath})`;
        contentRef.current += `\n\n${imageMarkdown}`; // Append image to the markdown content
        setImageUrl(result.imagePath); // Store image URL in state
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      title,
      content: contentRef.current,
    };

    try {
      const response = await fetch('http://127.0.0.1:8800/newpost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      const result = await response.json();
      alert(result.message); // Shows the response message from Flask
    } catch (error) {
      console.error('Error:', error);
      alert('Error posting data');
    }
    // Set success message after submitting
    setMessage("Blog post saved successfully!");

    // Clear message after 3 seconds
    setTimeout(() => {
      setMessage('');
    }, 3000); // Reset the message after 3 seconds
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-3xl font-semibold mb-6 text-center">Write a New Blog</h1>
          <div className="max-w-3xl mx-auto p-6 bg-black shadow-md page-content">
            <form onSubmit={handleSubmit} className="space-y-4 inline justify-center items-center">
              <div>
                <label className="block text-lg">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)} // Handle title state
                  className="w-full px-4 py-2 border border-gray-300 input-field"
                  placeholder="Blog Title"
                />
              </div>

              <div>
                <label className="block text-lg">Content</label>
                <div className="mb-4 flex button-div justify-center items-center">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    type="button" // Ensure it doesn't submit the form
                    onClick={() => setIsPreview(!isPreview)}
                  >
                    {isPreview ? "Edit" : "Markdown Preview"}
                  </button>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="my-2"
                />
                {isPreview ? (
                  <div className="prose max-w-none">
                    <ReactMarkdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]}>
                      {contentRef.current}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <SimpleMDE
                    value={contentRef.current} // Use ref to avoid re-renders
                    onChange={handleEditorChange} // Update content on change
                    options={{
                      spellChecker: false,
                      toolbar: [
                        "bold",
                        "italic",
                        "heading",
                        "|",
                        "quote",
                        "code",
                        "unordered-list",
                        "ordered-list",
                        "|",
                        "link",
                        "image",
                        "preview",
                        "guide",
                      ],
                      autofocus: false, // Avoid autofocus to prevent the editor from taking focus automatically
                      placeholder: "Write your content here...",
                    }}
                  />
                )}
              </div>

              <div className="flex button-div justify-center items-center">
                <button
                  type="submit"
                  className="btn bg-blue-500 text-white"
                >
                  Save Blog Post
                </button>
              </div>

              {/* Show success message after form submission */}
              {message && <p className="mt-4 text-green-500">{message}</p>}
            </form>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
