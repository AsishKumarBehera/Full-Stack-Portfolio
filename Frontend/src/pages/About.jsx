import { useEffect, useRef, useState } from "react";

const skills = [
  { name: "React", icon: "⚛" },
  { name: "Next.js", icon: "▲" },
  { name: "Node.js", icon: "⬡" },
  { name: "MongoDB", icon: "🍃" },
  { name: "Express", icon: "⚡" },
  { name: "JavaScript", icon: "JS" },
  { name: "Tailwind", icon: "🌊" },
  { name: "Git", icon: "⎇" },
];

const stats = [
  ["5+", "Projects"],
  ["1+", "Years Exp"],
  ["20+", "Technologies"],
];

function About() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
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
      <div className="absolute top-0 -right-20 w-80 h-80 rounded-full
        bg-purple-300 dark:bg-purple-700 opacity-10 dark:opacity-20
        animate-[pulse_7s_ease-in-out_infinite] blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-10 left-0 w-72 h-72 rounded-full
        bg-cyan-300 dark:bg-cyan-700 opacity-10 dark:opacity-15
        animate-[pulse_9s_ease-in-out_infinite_1.5s] blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full
        bg-pink-300 dark:bg-pink-800 opacity-5 dark:opacity-10
        animate-[pulse_11s_ease-in-out_infinite_3s] blur-[100px] pointer-events-none" />

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(120,80,255,0.08) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }} />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Label */}
        <p className={`text-xs tracking-[0.14em] uppercase font-medium
          text-purple-500 dark:text-purple-400 mb-3
          transition-all duration-700 ease-out
          ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
          who i am
        </p>

        {/* Title */}
        <h1 className={`text-4xl md:text-5xl font-extrabold tracking-tight
          text-gray-900 dark:text-white mb-14
          transition-all duration-700 ease-out delay-100
          ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
          About{" "}
          <span style={{
            background: "linear-gradient(135deg, #c084fc, #60a5fa, #34d399)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>Me</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">

          {/* LEFT — Bio, slides in from left */}
          <div className={`transition-all duration-700 ease-out delay-200
            ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>

            {/* Avatar + Name */}
            <div className="flex items-center gap-4 mb-7">
              <div className="relative flex-shrink-0">
                {/* Rotating ring */}
                <div className={`absolute inset-0 rounded-full
                  bg-gradient-to-tr from-purple-500 via-blue-400 to-emerald-400
                  transition-all duration-1000
                  ${visible ? "animate-spin [animation-duration:8s]" : ""}`}
                  style={{ padding: "2px" }}>
                  <div className="w-full h-full rounded-full
                    bg-white dark:bg-[#0a0a0f]" />
                </div>
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden
                  border-2 border-purple-500 z-10">
                  <img
                    src="/projects/profile.jpeg"
                    alt="Asish Kumar"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.classList.add(
                        "bg-gradient-to-br", "from-purple-500", "to-blue-500",
                        "flex", "items-center", "justify-center"
                      );
                      e.target.parentElement.innerHTML =
                        '<span class="text-white font-bold text-lg">AK</span>';
                    }}
                  />
                </div>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Asish Kumar Behera
                </h2>
                <p className="text-base font-medium text-purple-500 dark:text-purple-400 mt-0.5">
                  Full Stack Developer
                </p>
              </div>
            </div>

            {/* Bio paragraphs — each fades in with stagger */}
            {[
              "I'm a Full Stack Developer with a strong passion for building scalable and user-friendly web applications using React, Next.js, Node.js, and MongoDB.",
              "I enjoy solving real-world problems and continuously learning new technologies to improve my development skills.",
              "My goal is to become a professional software developer and contribute to impactful projects in the IT industry.",
            ].map((para, i) => (
              <p key={i}
                className={`text-gray-500 dark:text-gray-400 leading-relaxed mb-4 text-[15px]
                  transition-all duration-700 ease-out
                  ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${300 + i * 100}ms` }}>
                {para}
              </p>
            ))}

            {/* Button */}
            <div className={`flex flex-wrap gap-3 mt-4
              transition-all duration-700 ease-out delay-[600ms]
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <a href="#contact"
                className="px-6 py-2.5 rounded-full text-sm font-medium transition-all
                  hover:-translate-y-0.5
                  text-gray-600 dark:text-gray-300
                  border border-gray-300 dark:border-gray-700
                  hover:border-purple-400 dark:hover:border-purple-500
                  hover:text-purple-600 dark:hover:text-purple-400
                  bg-white dark:bg-transparent">
                Contact Me →
              </a>
            </div>
          </div>

          {/* RIGHT — Skills + Stats, slides in from right */}
          <div className={`transition-all duration-700 ease-out delay-300
            ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>

            <p className="text-[11px] tracking-[0.14em] uppercase font-medium
              text-gray-400 dark:text-gray-500 mb-4">
              tech stack
            </p>

            {/* Skills grid — each card staggers in */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {skills.map((skill, i) => (
                <div key={i}
                  className={`flex flex-col items-center gap-1.5 p-4 rounded-xl
                    text-sm font-medium cursor-default
                    hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(124,77,255,0.2)]
                    bg-purple-50 dark:bg-purple-950/40
                    border border-purple-100 dark:border-purple-900/50
                    text-purple-700 dark:text-purple-300
                    hover:bg-purple-500 dark:hover:bg-purple-500
                    hover:text-white hover:border-purple-500
                    transition-all duration-200
                    ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                  style={{ transitionDelay: `${400 + i * 60}ms` }}>
                  <span className="text-xl">{skill.icon}</span>
                  {skill.name}
                </div>
              ))}
            </div>

            {/* Stats label */}
            <p className={`text-[11px] tracking-[0.14em] uppercase font-medium
              text-gray-400 dark:text-gray-500 mb-4
              transition-all duration-700 ease-out delay-[880ms]
              ${visible ? "opacity-100" : "opacity-0"}`}>
              at a glance
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map(([num, label], i) => (
                <div key={i}
                  className={`text-center p-4 rounded-xl cursor-default
                    bg-gray-50 dark:bg-white/5
                    border border-gray-100 dark:border-white/10
                    hover:border-purple-300 dark:hover:border-purple-700
                    hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(124,77,255,0.1)]
                    transition-all duration-300
                    ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                  style={{ transitionDelay: `${900 + i * 80}ms` }}>
                  <div className="text-2xl font-extrabold
                    text-gray-900 dark:text-white">
                    {num}
                  </div>
                  <div className="text-[10px] tracking-widest uppercase mt-1
                    text-gray-400 dark:text-gray-500">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default About;