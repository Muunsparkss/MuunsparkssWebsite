import { useEffect, useState } from "react";

export default function BlogCard({ title, image, content, slug, date_time, id }) {
  // Provide a default value for description if undefined
  const desc = content ? content.split(".")[0] : "No description available.";

  // Regex to capture image URL from Markdown format within the content string
  const regex = /!\[.*?\]\((.*?)\)/; // Matches the URL inside ![text](url)
  const imgUrl = content ? content.match(regex) : null;

  // State for formatted date after hydration
  const [formattedDate, setFormattedDate] = useState(null);

  useEffect(() => {
    // Set date after component mounts to avoid hydration issue
    if (date_time) {
      const date = new Date(date_time);
      setFormattedDate(date.toLocaleDateString());
    }
  }, [date_time]);

  // Log all props for debugging
  console.log("Title:", title);
  console.log("Image:", image);
  console.log("Description:", content);
  console.log("Slug:", slug);
  console.log("Date:", date_time);
  console.log("ID:", id);

  return (
    <div className="blog-card p-6 bg-white shadow-md rounded-lg">
      {/* Flex container with two blocks side-by-side */}
      <div className="flex justify-between items-start">
        {/* First block: title, image, and date */}
        <span className="flex flex-col items-center w-1/2 mr-6">
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <img 
            src={imgUrl ? imgUrl[1] : "/placeholder-image.png"} 
            alt={content ? content.split(".")[0] : "Blog Image"} 
            className="mx-auto rounded-lg w-64 h-64 object-cover mb-4 border-4 border-blue-500"
          />
          {formattedDate && <p className="text-sm text-500">{formattedDate}</p>}
        </span>

        {/* Second block: description and link */}
        <span className="flex flex-col justify-center items-center w-1/2 mr-6 h-full">
          <p>{desc}</p>
          <a href={`/blog/${slug}`} className="text-blue-500 mt-4 inline-block">Read more</a>
        </span>
      </div>
    </div>
  );
}
