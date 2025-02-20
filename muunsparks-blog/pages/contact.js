import Layout from "../components/Layout";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const response = await fetch("http://localhost:8800/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Thank you for your message! I will get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Error submitting the form. Please try again.");
      }
    } catch (error) {
      setStatus("Failed to connect to the server.");
    }
  };

  return (
    <Layout>
      <div className="w-full">
        <h1 className="font-semibold text-center mb-6">Contact Me</h1>
        <div className="max-w-2xl mx-auto p-6 bg-black shadow-md page-content">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 input-field"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 input-field"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block text-lg font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 input-field"
                rows="4"
                required
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 hover:bg-blue-600"
              >
                Send Message
              </button>
            </div>
          </form>

          {status && (
            <div className="mt-6 text-center text-lg font-medium text-green-600">
              {status}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
