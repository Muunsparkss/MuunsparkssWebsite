import Layout from "../components/Layout";
import { FaPython, FaJs, FaReact, FaNodeJs, FaDatabase, FaBriefcase, FaCode, FaGithub, FaSpotify, FaYoutube } from "react-icons/fa"; 
import { SiNextdotjs, SiC, SiCplusplus } from "react-icons/si"; // Import additional icons

export default function About() {
  return (
    <Layout>
      <h1 className="font-semibold text-center mb-6">About Me</h1>

      <div className="p-6 bg-white shadow-md rounded-lg">
        {/* Profile Section */}
        <div className="flex flex-wrap items-center my-8">
          {/* Image */}
          <img
            src="http://localhost:3000/images/Sedatpp.jpg"
            className="w-64 h-auto rounded-lg border-4 border-black mb-4 md:mb-0 md:mr-6"
            alt="My Profile Picture"
          />
          {/* About Text */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-center mb-4">Who am I?</h2>
            <p className="text-start font-medium font-serif">
                          Hi there! My name is <b className="font-extrabold">Mehmet Sedat YILDIZ (aka. Muunsparks)</b>. I am a Full Stack Developer with expertise in modern web and mobile technologies. My primary tech stack includes <b className="font-extrabold">React, React Native, Node.js, Next.js, Python, C, and C++ </b>.

              I hold a <b className="font-extrabold">B.S. in Computer Engineering from Istanbul Kültür University (2020-2024)</b> and am currently pursuing an <b className="font-extrabold">M.S. in Computer Science at Bremen University</b>. During my academic journey, I specialized in backend development, front-end development, and machine learning.

              Throughout my career, I have worked on a diverse range of projects, from high-performance backend systems to interactive web and mobile applications. <br/><br/> I worked <b className="font-extrabold">7 months at MetaWorld Technology and Software as a Backend Developer</b>. I developed and deployed different real time applications and systems. I used <b className="font-extrabold">Python Flask, Node.JS, MongoDB, and SQL</b>. I also developed scaleble APIs. For example, I developed a cargo query system using Python Flask and React. I deployed the project with an nginx server using gunicorn for worker management.<br/><br/>

              I have been working as a <b className="font-extrabold">Coder RLHF(Reinforcement Learning From Human Feedback) at Scale AI since September 2024</b>. I developed and fine-tuned algorithms using Python, JavaScript, C, and C++ to enhance machine learning models and data annotation processes. <br/><br/>
              I have experience developing scalable <b className="font-extrabold">APIs, real-time applications, and complex front-end interfaces</b>.

              In addition to software development, I am highly interested in artificial intelligence, data science, and cybersecurity. I have built projects leveraging machine learning models, AI-driven automation, and secure authentication systems. My experience also extends to cloud computing and DevOps, where <b className="font-extrabold">I have deployed and managed applications on DigitalOcean, and Firebase</b>.

              <br/><br/>Beyond coding, I am an <b className="font-extrabold">independent musician</b>. I play the guitar and piano. Moreover, I released a single in 2023 called "<b className="font-extrabold">who open's the door?</b>".
          </p>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-center mb-6">Skills</h2>

          {/* Skill Bars */}
          <div className="space-y-6">
            <SkillBar icon={<FaPython className="text-blue-500 w-8 h-8" />} name="Python" level="98%" />
            <SkillBar icon={<SiNextdotjs className="text-black w-8 h-8" />} name="Next.js" level="95%" />
            <SkillBar icon={<FaJs className="text-orange-500 w-8 h-8" />} name="Javascript" level="95%" />
            <SkillBar icon={<FaReact className="text-blue-400 w-8 h-8" />} name="React & React Native" level="90%" />
            <SkillBar icon={<FaNodeJs className="text-green-600 w-8 h-8" />} name="Node.js" level="90%" />
            <SkillBar icon={<SiCplusplus className="text-blue-700 w-8 h-8" />} name="C++" level="85%" />
            <SkillBar icon={<SiC className="text-blue-600 w-8 h-8" />} name="C" level="70%" />
          </div>
        </div>

        {/* Experience Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-center mb-6">Experience</h2>
          <div className="space-y-8">
            <ExperienceCard
              icon={<FaBriefcase className="text-gray-700 w-10 h-10" />}
              company="MetaWorld Technology and Software"
              position="Backend Developer"
              duration="December 2023 - September 2024"
              description="Developed and deployed real-time applications and scalable APIs. Built a cargo query system using Python Flask and React, deploying it with Nginx and Gunicorn."
              techStack="Python Flask, Node.js, MongoDB, SQL"
            />
            <ExperienceCard
              icon={<FaCode className="text-gray-700 w-10 h-10" />}
              company="Scale AI"
              position="Coder RLHF (Reinforcement Learning From Human Feedback)"
              duration="September 2024 - Present"
              description="Fine-tuned AI algorithms and optimized machine learning models using Python, JavaScript, C, and C++. Developed systems to enhance data annotation processes."
              techStack="Python, JavaScript, C, C++"
            />
          </div>
        </div>

        {/* Links */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-center mb-6">Links</h2>
          <div className="flex flex-wrap justify-center space-x-6">
            <a
              href="https://github.com/Muunsparkss"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition"
            >
              <FaGithub className="w-8 h-8" />
              <span className="text-lg font-semibold">GitHub</span>
            </a>
            <a
              href="https://open.spotify.com/intl-tr/artist/532apTzkzDpOGoTodXk1wW"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition"
            >
              <FaSpotify className="w-8 h-8 text-green-500" />
              <span className="text-lg font-semibold">Spotify</span>
            </a>
            <a
              href="https://youtube.com/@Muunsparks"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition"
            >
              <FaYoutube className="w-8 h-8 text-red-600" />
              <span className="text-lg font-semibold">YouTube</span>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Experience Card Component
function ExperienceCard({ icon, company, position, duration, description, techStack }) {
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md flex items-start space-x-4">
      <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full shadow">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold">{company}</h3>
        <p className="text-gray-700 font-medium">
          {position} <span className="text-sm text-gray-500">({duration})</span>
        </p>
        <p className="mt-2 text-gray-600">{description}</p>
        <p className="mt-2 text-sm font-semibold text-gray-800">Tech Stack: {techStack}</p>
      </div>
    </div>
  );
}

// Skill Bar Component
function SkillBar({ icon, name, level }) {
  return (
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 flex justify-center items-center">{icon}</div>
      <div className="w-full">
        <div className="flex justify-between">
          <span className="text-lg text-black font-medium">{name}</span>
          <span className="ml-4 text-sm text-black font-semibold align-items-center">{level}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mt-1">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all duration-500"
            style={{ width: level }}
          ></div>
        </div>
      </div>
    </div>
  );
}
