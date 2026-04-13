import { useEffect, useRef, useState } from "react";

const projects = [
  {
    title: "LifeCare Hub",
    desc: "Doctor appointment booking system with chat & payment integration.",
    tech: ["Next.js", "MongoDB", "REST API"],
    github: "https://github.com/AsishKumarBehera/LifeCare-Hub",
    image: "/projects/lifecare.jpeg",
  },
  {
    title: "Library Management System",
    desc: "Book issuing, return system with fine calculation.",
    tech: ["MERN Stack"],
    github: "https://github.com/AsishKumarBehera/Library-Management-System",
    image: "/projects/library.jpeg",
  },
  {
    title: "Gen-AI ChatBot",
    desc: "Responsive frontend website for a ChatBot.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/AsishKumarBehera/ai-chatbot-frontend",
    image: "/projects/aichat.jpeg",
  },
];

function Projects() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative px-6 py-24 overflow-hidden
        bg-white dark:bg-[#0a0a0f]
        text-black dark:text-white
        transition-colors duration-300">

      {/* Animated background orbs */}
      <div className="absolute -top-10 left-1/4 w-80 h-80 rounded-full
        bg-purple-300 dark:bg-purple-700 opacity-10 dark:opacity-20
        animate-[pulse_8s_ease-in-out_infinite] blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full
        bg-blue-300 dark:bg-blue-700 opacity-10 dark:opacity-15
        animate-[pulse_10s_ease-in-out_infinite_2s] blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2 -left-10 w-56 h-56 rounded-full
        bg-emerald-300 dark:bg-emerald-800 opacity-5 dark:opacity-10
        animate-[pulse_12s_ease-in-out_infinite_1s] blur-[100px] pointer-events-none" />

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(120,80,255,0.08) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }} />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Label */}
        <p className={`text-xs tracking-[0.14em] uppercase font-medium
          text-purple-500 dark:text-purple-400 mb-3
          transition-all duration-700 ease-out
          ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
          what i've built
        </p>

        {/* Title */}
        <h1 className={`text-4xl md:text-5xl font-extrabold tracking-tight
          text-gray-900 dark:text-white mb-14
          transition-all duration-700 ease-out delay-100
          ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
          My{" "}
          <span style={{
            background: "linear-gradient(135deg, #c084fc, #60a5fa, #34d399)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>Projects</span>
        </h1>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div key={i}
              className={`group rounded-2xl overflow-hidden
                bg-purple-50/60 dark:bg-purple-950/30
                border border-purple-100 dark:border-purple-900/50
                hover:border-purple-400 dark:hover:border-purple-500
                transition-all duration-500
                hover:-translate-y-2 hover:shadow-[0_20px_48px_rgba(124,77,255,0.18)]
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}>

              {/* Image with overlay */}
              <div className="relative aspect-video overflow-hidden bg-gray-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500
                    group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = `https://placehold.co/600x340/0f0820/7c4dff?text=${encodeURIComponent(project.title)}`;
                  }}
                />

                {/* Gradient overlay always visible at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-16
                  bg-gradient-to-t from-black/40 to-transparent" />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#0a0518]/85 opacity-0
                  group-hover:opacity-100 transition-all duration-300
                  flex flex-col items-center justify-center gap-3">
                  <p className="text-white/70 text-xs tracking-widest uppercase mb-1">
                    view project
                  </p>
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-full text-sm font-medium text-white
                      border border-white/30 hover:bg-white/10
                      hover:border-white/60 transition-all duration-200
                      hover:-translate-y-0.5">
                    ⎇ GitHub
                  </a>
                </div>
              </div>

              {/* Card body */}
              <div className="p-5">

                {/* Tech pills */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tech.map((t, j) => (
                    <span key={j}
                      className="text-[10px] font-medium tracking-wide px-3 py-1 rounded-full
                        bg-purple-100 dark:bg-purple-900/50
                        text-purple-700 dark:text-purple-300
                        group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50
                        transition-colors duration-300">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className="text-lg font-bold mb-1
                  text-purple-600 dark:text-purple-400
                  group-hover:text-purple-700 dark:group-hover:text-purple-300
                  transition-colors duration-200">
                  {project.title}
                </h2>

                {/* Desc */}
                <p className="text-sm leading-relaxed
                  text-gray-500 dark:text-gray-400">
                  {project.desc}
                </p>

                {/* Bottom link row */}
                <div className="mt-4 pt-4 border-t border-purple-100 dark:border-purple-900/40
                  flex items-center justify-between">
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                    className="text-xs font-medium flex items-center gap-1.5
                      text-gray-400 dark:text-gray-500
                      hover:text-purple-600 dark:hover:text-purple-400
                      transition-colors duration-200">
                    <span>⎇</span> View on GitHub →
                  </a>
                  <div className="w-2 h-2 rounded-full bg-emerald-400
                    animate-pulse" />
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`mt-14 text-center
          transition-all duration-700 ease-out delay-[650ms]
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">
            Want to see more of my work?
          </p>
          <a href="https://github.com/AsishKumarBehera"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-medium
              transition-all duration-200 hover:-translate-y-0.5
              hover:shadow-[0_12px_32px_rgba(124,77,255,0.3)]
              text-white"
            style={{ background: "linear-gradient(135deg,#7c4dff,#4d79ff)" }}>
            ⎇ Visit My GitHub →
          </a>
        </div>

      </div>
    </section>
  );
}

export default Projects;