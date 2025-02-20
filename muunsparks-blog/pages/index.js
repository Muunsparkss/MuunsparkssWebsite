import Layout from "../components/Layout";
import BlogCard from "../components/BlogCard";

export default function Home({ posts }) {
  return (
    <Layout>
      <h1 className="font-bold mb-8">Welcome to Muunsparks' Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </div>
    </Layout>
  );
}

// Fetch the latest 10 blog posts server-side
export async function getServerSideProps() {
  try {
    const res = await fetch("http://localhost:8800/blog-posts");
    
    // Ensure the response is successful
    if (!res.ok) {
      throw new Error('Failed to fetch blog posts');
    }
    console.log(res);
    const posts = await res.json();
    // Add a slug property to each post
    posts.forEach((post) => {
      
      post.slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    });

    return {
      props: {
        posts, // Pass the posts to the component as a prop
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        posts: [], // If there's an error, return an empty array
      },
    };
  }
}
