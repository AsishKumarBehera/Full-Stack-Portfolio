import { useEffect, useRef, useState } from "react";

const experiences = [
  {
    role: "Frontend Developer Intern",
    company: "Weldxid",
    duration: "2024",
    desc: "Developed responsive UI components and improved user experience using modern frontend technologies.",
  },
  {
    role: "Web Development Intern",
    company: "Technook",
    duration: "2024",
    desc: "Built a weather forecast feature and worked on real-time API integration in web applications.",
  },
];

const stats = [
  ["2", "Internships"],
  ["1+", "Years Exp"],
  ["10+", "Projects Shipped"],
];

const Experience = () => {
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
      <div className="absolute -top-20 right-0 w-72 h-72 rounded-full
        bg-purple-300 dark:bg-purple-700 opacity-10 dark:opacity-20
        animate-[pulse_7s_ease-in-out_infinite] blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 -left-20 w-80 h-80 rounded-full
        bg-blue-300 dark:bg-blue-700 opacity-10 dark:opacity-20
        animate-[pulse_9s_ease-in-out_infinite_1s] blur-[80px] pointer-events-none" />

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
          my journey
        </p>

        {/* Title */}
        <h1 className={`text-4xl md:text-5xl font-extrabold tracking-tight
          text-gray-900 dark:text-white mb-14
          transition-all duration-700 ease-out delay-100
          ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
          Exp
          <span style={{
            background: "linear-gradient(135deg, #c084fc, #60a5fa, #34d399)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>erience</span>
        </h1>

        {/* Two column layout on tablet+ */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-10 items-start">

          {/* LEFT — Timeline */}
          <div className="relative pl-8
            before:absolute before:left-0 before:top-2 before:bottom-2
            before:w-0.5 before:rounded-full
            before:bg-gradient-to-b before:from-purple-500 before:via-blue-500 before:to-purple-200
            dark:before:to-purple-900">

            {experiences.map((exp, i) => (
              <div key={i}
                className={`relative mb-8 last:mb-0
                  transition-all duration-700 ease-out
                  ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
                style={{ transitionDelay: `${200 + i * 150}ms` }}>

                {/* Dot */}
                <div className={`absolute -left-[2.15rem] top-5 w-3.5 h-3.5 rounded-full
                  bg-purple-500 border-[3px]
                  border-white dark:border-[#0a0a0f]
                  transition-all duration-500
                  ${visible
                    ? "shadow-[0_0_0_4px_rgba(124,77,255,0.2)]"
                    : "shadow-[0_0_0_2px_rgba(124,77,255,0.3)]"}`} />

                {/* Card */}
                <div className="rounded-2xl p-6 transition-all duration-200
                  hover:translate-x-2 hover:shadow-[0_8px_32px_rgba(124,77,255,0.12)]
                  bg-purple-50/60 dark:bg-purple-950/30
                  border border-purple-100 dark:border-purple-900/50
                  hover:border-purple-300 dark:hover:border-purple-600">

                  {/* Header row */}
                  <div className="flex items-start justify-between gap-3 flex-wrap mb-1">
                    <h2 className="text-lg font-bold
                      text-purple-600 dark:text-purple-400">
                      {exp.role}
                    </h2>
                    <span className="text-[11px] font-medium px-3 py-1 rounded-full flex-shrink-0
                      bg-purple-100 dark:bg-purple-900/50
                      text-purple-700 dark:text-purple-300">
                      {exp.duration}
                    </span>
                  </div>

                  {/* Company */}
                  <p className="text-sm mb-3
                    text-gray-400 dark:text-gray-500">
                    {exp.company}
                  </p>

                  {/* Description */}
                  <p className="text-sm leading-relaxed
                    text-gray-600 dark:text-gray-400">
                    {exp.desc}
                  </p>

                </div>
              </div>
            ))}
          </div>

          {/* RIGHT — Stats */}
          <div className="grid grid-cols-3 md:grid-cols-1 gap-3 md:sticky md:top-24">
            {stats.map(([num, label], i) => (
              <div key={i}
                className={`text-center p-4 rounded-xl
                  bg-gray-50 dark:bg-white/5
                  border border-gray-100 dark:border-white/10
                  hover:border-purple-300 dark:hover:border-purple-700
                  hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(124,77,255,0.1)]
                  transition-all duration-300 cursor-default
                  ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${400 + i * 100}ms` }}>
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
    </section>
  );
};

export default Experience;