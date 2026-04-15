import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import BASE_URL from '../config.js';

const Template1 = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef();

  useEffect(() => {
    fetch(`${BASE_URL}/api/portfolio/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setTimeout(() => setVisible(true), 100);
      });
  }, [id]);

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center
        bg-white dark:bg-[#0a0a0f]">
        {/* Spinner */}
        <div className="w-12 h-12 rounded-full border-4
          border-purple-200 dark:border-purple-900
          border-t-purple-500 dark:border-t-purple-400
          animate-spin mb-4" />
        <p className="text-sm tracking-widest uppercase
          text-gray-400 dark:text-gray-500">
          Loading portfolio...
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen
      bg-white dark:bg-[#0a0a0f]
      text-black dark:text-white
      transition-colors duration-300">

      {/* Background orbs */}
      <div className="fixed -top-20 -left-20 w-80 h-80 rounded-full
        bg-purple-300 dark:bg-purple-700 opacity-10 dark:opacity-20
        animate-[pulse_7s_ease-in-out_infinite] blur-[80px] pointer-events-none" />
      <div className="fixed -bottom-20 -right-20 w-96 h-96 rounded-full
        bg-blue-300 dark:bg-blue-700 opacity-10 dark:opacity-15
        animate-[pulse_9s_ease-in-out_infinite_1s] blur-[80px] pointer-events-none" />

      {/* Dot grid */}
      <div className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(120,80,255,0.07) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 pt-28">

        {/* HERO SECTION - IMPROVED ALIGNMENT */}
        <div className={`rounded-2xl p-8 mb-6
          bg-purple-50/60 dark:bg-purple-950/30
          border border-purple-100 dark:border-purple-900/50
          flex flex-col md:flex-row items-center justify-between gap-6
          transition-all duration-700 ease-out
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

          {/* Left: Avatar + Main Info */}
          <div className="flex items-center gap-6 flex-1">
            {/* Avatar with ring */}
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 rounded-full
                bg-gradient-to-tr from-purple-500 via-blue-400 to-emerald-400
                animate-spin [animation-duration:8s]"
                style={{ padding: "3px" }}>
                <div className="w-full h-full rounded-full bg-white dark:bg-[#0a0a0f]" />
              </div>
              <img
                src={data.photo || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                alt="profile"
                className="relative w-28 h-28 md:w-32 md:h-32 rounded-full object-cover
                  border-2 border-purple-500 z-10"
                onError={(e) => {
                  e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                }}
              />
            </div>

            {/* Name and Title */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3
                bg-emerald-50 dark:bg-emerald-900/20
                border border-emerald-200 dark:border-emerald-800/50
                text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Available for opportunities
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-1">
                {data.name}
              </h1>
              <p className="text-base font-medium mb-1"
                style={{
                  background: "linear-gradient(135deg, #c084fc, #60a5fa, #34d399)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}>
                {data.role || "Developer"}

              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <span>✉️</span> {data.email} • <span>⎇</span> {data.github}
              </p>
            </div>
          </div>

          {/* Right: Short Bio / Quote */}
          <div className="text-right border-l border-purple-200 dark:border-purple-800/50 pl-6">
            <p className="text-md italic text-gray-500 dark:text-gray-400 max-w-xs">
              "{data.bio || "Building digital experiences with creativity and precision"}"
            </p>
            <p className="text-sm text-purple-500 dark:text-purple-400 mt-2 font-medium">
              {data.shortName}
            </p>
          </div>
        </div>

        {/* ABOUT / SUMMARY SECTION - NEW */}
        <div className={`rounded-2xl p-7 mb-6
          bg-purple-50/60 dark:bg-purple-950/30
          border border-purple-100 dark:border-purple-900/50
          transition-all duration-700 ease-out delay-75
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">📋</span>
            <p className="text-[11px] tracking-[0.14em] uppercase font-medium
              text-gray-400 dark:text-gray-500">
              About Me
            </p>
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {data.about || `Hi, I'm ${data.name}, a passionate ${data.role || "developer"} with ${data.experience || "entry-level"} experience. 
            I love creating elegant solutions to complex problems and continuously learning new technologies. 
            My focus is on building responsive, user-friendly applications that make a difference.`}
          </p>
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-purple-100 dark:border-purple-900/40">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {data.projects?.length || 0}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Projects</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {data.technologies?.length || 0}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Technologies</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {data.experience || "0+"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Years Exp</p>
            </div>
          </div>
        </div>

        {/* TECHNOLOGIES SECTION - IMPROVED */}
        <div className={`rounded-2xl p-7 mb-6
          bg-purple-50/60 dark:bg-purple-950/30
          border border-purple-100 dark:border-purple-900/50
          transition-all duration-700 ease-out delay-150
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">⚙️</span>
            <p className="text-[11px] tracking-[0.14em] uppercase font-medium
              text-gray-400 dark:text-gray-500">
              Tech Stack & Tools
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {data.technologies?.map((tech, i) => (
              <span key={i}
                className="px-4 py-2 rounded-xl text-sm font-medium
                  cursor-default transition-all duration-200
                  hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(124,77,255,0.2)]
                  bg-purple-100 dark:bg-purple-900/50
                  text-purple-700 dark:text-purple-300
                  border border-purple-200 dark:border-purple-800/50
                  hover:bg-purple-500 hover:text-white hover:border-purple-500">
                {tech}
              </span>
            ))}
          </div>
          {/* Additional tools if available */}
          {data.tools && data.tools.length > 0 && (
            <div className="mt-4 pt-3 border-t border-purple-100 dark:border-purple-900/40">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Tools & Platforms:</p>
              <div className="flex flex-wrap gap-2">
                {data.tools.map((tool, i) => (
                  <span key={i} className="px-3 py-1 rounded-lg text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* PROJECTS SECTION - IMPROVED ALIGNMENT */}
        <div className={`rounded-2xl p-6 mb-6
  bg-purple-50/60 dark:bg-purple-950/30
  border border-purple-100 dark:border-purple-900/50
  transition-all duration-700 ease-out delay-300
  ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-base">🚀</span>
              <p className="text-[10px] tracking-[0.14em] uppercase font-medium
        text-gray-400 dark:text-gray-500">
                Featured Projects
              </p>
            </div>
            {data.github && (
              <a href={data.github} target="_blank" rel="noreferrer"
                className="text-[11px] text-purple-500 hover:text-purple-600 dark:text-purple-400 flex items-center gap-1">
                View all on GitHub →
              </a>
            )}
          </div>

          <div className={`grid gap-4
    ${data.projects?.length === 1
              ? "grid-cols-1 max-w-md mx-auto"
              : data.projects?.length === 2
                ? "grid-cols-1 sm:grid-cols-2"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}>
            {data.projects?.map((p, i) => (
              <div
                key={i}
                className="group rounded-xl overflow-hidden
          bg-white dark:bg-[#0f0e19]
          border border-purple-100 dark:border-purple-900/50
          hover:border-purple-400 dark:hover:border-purple-500
          transition-all duration-300
          hover:-translate-y-0.5
          hover:shadow-[0_12px_32px_rgba(124,77,255,0.12)]
          flex flex-col h-full">

                {/* Image - smaller height */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-purple-900/20 to-blue-900/20">
                  <img
                    src={p.image || `https://placehold.co/600x340/0f0820/7c4dff?text=${encodeURIComponent(p.title)}`}
                    alt={p.title}
                    className="w-full h-full object-cover
              transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = `https://placehold.co/600x340/0f0820/7c4dff?text=${encodeURIComponent(p.title)}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300
            flex items-end justify-start p-3">
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noreferrer"
                        className="px-3 py-1 rounded-full text-[10px] font-medium text-white
                  bg-black/50 backdrop-blur-sm border border-white/30 hover:bg-white/20 transition-all">
                        ⎇ GitHub
                      </a>
                    )}
                  </div>
                </div>

                {/* Body - more compact */}
                <div className="p-3.5 flex-1 flex flex-col">
                  <h3 className="font-bold text-sm mb-1
            text-purple-600 dark:text-purple-400
            group-hover:text-purple-700 dark:group-hover:text-purple-300
            line-clamp-1">
                    {p.title}
                  </h3>
                  <p className="text-xs leading-relaxed
            text-gray-500 dark:text-gray-400 mb-2 flex-1
            line-clamp-2">
                    {p.description}
                  </p>

                  {/* Tech tags for project - smaller */}
                  {p.techStack && p.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {p.techStack.slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="text-[9px] px-1.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                          {tech}
                        </span>
                      ))}
                      {p.techStack.length > 3 && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500">
                          +{p.techStack.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {p.github && (
                    <div className="pt-2 border-t border-purple-100 dark:border-purple-900/40
              flex items-center justify-between">
                      <a href={p.github} target="_blank" rel="noreferrer"
                        className="text-[10px] font-medium flex items-center gap-1
                  text-gray-400 dark:text-gray-500
                  hover:text-purple-600 dark:hover:text-purple-400
                  transition-colors duration-200">
                        ⎇ Repo
                      </a>
                      {p.liveUrl && (
                        <a href={p.liveUrl} target="_blank" rel="noreferrer"
                          className="text-[10px] font-medium flex items-center gap-1
                    text-purple-500 hover:text-purple-600">
                          Live →
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CONTACT SECTION - IMPROVED ALIGNMENT */}
        <div className={`rounded-2xl p-7 mb-6
          bg-purple-50/60 dark:bg-purple-950/30
          border border-purple-100 dark:border-purple-900/50
          transition-all duration-700 ease-out delay-[450ms]
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center gap-2 mb-5">
            <span className="text-lg">📬</span>
            <p className="text-[11px] tracking-[0.14em] uppercase font-medium
              text-gray-400 dark:text-gray-500">
              Get in Touch
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: "Phone", value: data.phone, icon: "📞", href: `tel:${data.phone}` },
              { label: "Email", value: data.contactEmail || data.email, icon: "✉️", href: `mailto:${data.contactEmail || data.email}` },
              { label: "LinkedIn", value: data.linkedin, icon: "💼", href: data.linkedin },
              { label: "GitHub", value: data.github, icon: "⎇", href: data.github },
              { label: "Location", value: data.location, icon: "📍", href: null },
              { label: "Portfolio", value: data.portfolioUrl, icon: "🌐", href: data.portfolioUrl },
            ].filter(item => item.value).map((item, i) => (
              <div key={i}
                className="flex items-center gap-3 p-3 rounded-xl
                  group transition-all duration-200
                  bg-white dark:bg-[#0f0e19]
                  border border-purple-100 dark:border-purple-900/50
                  hover:border-purple-400 dark:hover:border-purple-500
                  hover:-translate-y-0.5
                  hover:shadow-[0_8px_24px_rgba(124,77,255,0.1)]">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center
                  text-sm flex-shrink-0
                  bg-purple-100 dark:bg-purple-900/50
                  text-purple-600 dark:text-purple-300
                  group-hover:bg-purple-500 group-hover:text-white
                  transition-all duration-200">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] tracking-widest uppercase
                    text-gray-400 dark:text-gray-500 mb-0.5">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a href={item.href} target={item.label === "Email" ? "_self" : "_blank"} rel="noreferrer"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300
                        hover:text-purple-600 dark:hover:text-purple-400 truncate block">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div className="text-center pt-4 pb-8 text-xs text-gray-400 dark:text-gray-600">
          <p>© {new Date().getFullYear()} {data.name} • Built with React & Tailwind</p>
        </div>

      </div>
    </div>
  );
};

export default Template1;