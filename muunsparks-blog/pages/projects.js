import Layout from "../components/Layout";
import Link from "next/link";

const projects = [
  {
    title: "Developer Tools for Developers",
    description: "This is a simple tool kit for front-end/back-end developers. It can be used for multiple reasons.",
    github: "https://github.com/Muunsparkss/DeveloperTools",
  },
  {
    title: "VR-Based Course & Examination System",
    description: "A VR application for education using Unreal Engine 5.",
    github: "https://www.linkedin.com/feed/update/urn:li:activity:7204447343037812736/",
  },
  {
    title: "Muunsparks Website",
    description: "My own website which I developed using React(Next.Js) and Node.js.",
    github: "https://github.com/Muunsparkss/MuunsparksWebsite",
  },
  {
    title: "Binance Trimming Automation with Python",
    description: "A bitcoin trading automation developed using Python (and binance API).",
    github: "https://github.com/Muunsparkss/BinanceBitcoinTrimmer",
  },
  {
    title:"MedicCrypto",
    description:"This is a simple information encrypting and embedding application which is developed using Python.",
    github:"https://github.com/Muunsparkss/MedicCrypto"
  }
];

export default function Projects() {
  return (
    <Layout>
      <h1 className="font-bold mb-8">My Projects</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {projects.map((project, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold">{project.title}</h2>
            <p className="text-gray-400 mt-2">{project.description}</p>
            <Link
              href={project.github}
              target="_blank"
              className="inline-block mt-4 text-blue-500 hover:underline"
            >
              View Project→
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
}
