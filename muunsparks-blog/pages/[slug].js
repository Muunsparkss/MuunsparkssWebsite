import Layout from "../components/Layout";

export async function getStaticPaths() {
  const paths = [
    { params: { slug: "first-post" } },
    { params: { slug: "second-post" } },
  ];
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = { title: "Post Title", content: "This is the content of the post." };
  return { props: { post } };
}

export default function Post({ post }) {
  return (
    <Layout>
      <h1 className="text-4xl font-bold text-primary">{post.title}</h1>
      <p className="mt-4 text-lg text-gray-700">{post.content}</p>
    </Layout>
  );
}
