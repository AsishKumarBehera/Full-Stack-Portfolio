import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BASE_URL from '../config.js';

const Template3 = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [activeProject, setActiveProject] = useState(0);

  useEffect(() => {
    fetch(`${BASE_URL}/api/portfolio/${id}`)
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setTimeout(() => setVisible(true), 100);
      });
  }, [id]);

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7f6f2] dark:bg-[#0d0d0d]">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-orange-500 dark:bg-orange-400"
              style={{ animation: `bounce 1s ease-in-out ${i * 0.2}s infinite` }}
            />
          ))}
        </div>
        <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }`}</style>
      </div>
    );
  }

  const proj = data.projects?.[activeProject];

  return (
    <div
      className={`min-h-screen
        bg-[#f7f6f2] dark:bg-[#0d0d0d]
        text-black dark:text-white
        px-4 md:px-8 py-6 pt-20
        transition-opacity duration-700
        ${visible ? "opacity-100" : "opacity-0"}`}
    >

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2">

          {/* CARD 1 — Hero / Name + New Description */}
          <div className="md:col-span-8 rounded-xl p-5 flex flex-col justify-between
            bg-white dark:bg-[#161616]
            border border-black/8 dark:border-white/5
            min-h-[210px] relative overflow-hidden">

            <div className="absolute top-0 left-0 w-12 h-12">
              <div className="absolute top-0 left-0 w-full h-px bg-orange-500/60 dark:bg-orange-400/60" />
              <div className="absolute top-0 left-0 w-px h-full bg-orange-500/60 dark:bg-orange-400/60" />
            </div>

            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-black/30 dark:text-white/30 mb-2">
                {data.role || "Developer"}
              </p>
              
              <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-none text-black dark:text-white">
                {data.name}
              </h1>

              {/* ← NEW DESCRIPTION ADDED HERE */}
              <p className="mt-4 text-lg text-black/60 dark:text-white/60 leading-relaxed max-w-md">
                Passionate full-stack developer with a strong love for clean code and building 
                scalable, user-friendly applications. Proficient in modern languages like 
                JavaScript, TypeScript, Python, and frameworks such as React, Node.js, and Next.js.
              </p>
            </div>

            <p className="text-sm text-black/40 dark:text-white/40 mt-auto">
              {data.experience || "Experienced developer — crafting scalable solutions & innovative products."}
            </p>
          </div>

          {/* CARD 2 — Avatar */}
          <div className="md:col-span-4 rounded-xl overflow-hidden
            bg-white dark:bg-[#161616]
            border border-black/8 dark:border-white/5
            min-h-[180px] relative group">
            <img
              src={data.photo || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
              alt="profile"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ minHeight: "180px" }}
              onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png"; }}
            />
            <div className="absolute bottom-3 left-3 right-3">
              <div className="bg-white/80 dark:bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5">
                <span className="text-xs text-black/60 dark:text-white/70 truncate block">
                  {data.email}
                </span>
              </div>
            </div>
          </div>

          {/* CARD 3 — Tech Stack */}
          <div className="md:col-span-5 rounded-xl p-4
            bg-white dark:bg-[#161616]
            border border-black/8 dark:border-white/5">
            <p className="text-[10px] tracking-[0.3em] uppercase text-black/30 dark:text-white/30 mb-4">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-1.5">
              {data.technologies?.map((tech, i) => (
                <span key={i}
                  className="px-2.5 py-1 rounded-md text-xs font-medium
                    bg-orange-50 dark:bg-orange-500/10
                    border border-orange-200 dark:border-orange-500/20
                    text-orange-700 dark:text-orange-300
                    hover:bg-orange-100 dark:hover:bg-orange-500/20
                    transition-colors duration-200 cursor-default">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CARD 4 — Stat */}
          <div className="md:col-span-3 rounded-xl p-4
            bg-gradient-to-br from-orange-500 to-rose-500
            flex flex-col justify-between min-h-[130px]">
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/60">Projects</p>
            <div>
              <p className="text-5xl font-black text-white leading-none">
                {String(data.projects?.length || 0).padStart(2, "0")}
              </p>
              <p className="text-xs text-white/60 mt-1">Shipped</p>
            </div>
          </div>

          {/* CARD 5 — Quick Info */}
          <div className="md:col-span-4 rounded-xl p-4
            bg-white dark:bg-[#161616]
            border border-black/8 dark:border-white/5 space-y-3">
            <p className="text-[10px] tracking-[0.3em] uppercase text-black/30 dark:text-white/30 mb-1.5">
              Quick Info
            </p>
            {[
              { icon: "📍", label: data.location },
              { icon: "📞", label: data.phone },
              { icon: "✉", label: data.contactEmail || data.email },
            ].filter((x) => x.label).map((x, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-black/5 dark:bg-white/5
                  flex items-center justify-center text-sm flex-shrink-0">
                  {x.icon}
                </div>
                <span className="text-sm text-black/50 dark:text-white/60 truncate">{x.label}</span>
              </div>
            ))}
          </div>

          {/* CARD 6 — Project Viewer */}
          <div className="md:col-span-8 rounded-xl overflow-hidden
            bg-white dark:bg-[#161616]
            border border-black/8 dark:border-white/5
            min-h-[260px] flex flex-col">
            <div className="relative flex-1 overflow-hidden min-h-[140px] bg-gray-100 dark:bg-[#111]">
              {proj && (
                <>
                  <img
                    src={proj.image || `https://placehold.co/800x400/e8e7e3/ff6b35?text=${encodeURIComponent(proj.title)}`}
                    alt={proj.title}
                    className="w-full h-full object-cover transition-all duration-500 opacity-80 dark:opacity-70"
                    style={{ minHeight: "140px" }}
                    onError={(e) => {
                      e.target.src = `https://placehold.co/800x400/e8e7e3/ff6b35?text=${encodeURIComponent(proj.title)}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#161616] via-transparent to-transparent" />
                </>
              )}
              <div className="absolute top-3 left-3 flex gap-1.5">
                {data.projects?.map((p, i) => (
                  <button key={i} onClick={() => setActiveProject(i)}
                    className={`h-1.5 rounded-full transition-all duration-200
                      ${activeProject === i
                        ? "bg-orange-500 dark:bg-orange-400 w-5"
                        : "w-1.5 bg-black/20 dark:bg-white/20 hover:bg-black/40 dark:hover:bg-white/40"}`}
                  />
                ))}
              </div>
            </div>
            {proj && (
              <div className="p-4 flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm mb-1 truncate text-black dark:text-white">
                    {proj.title}
                  </h3>
                  <p className="text-xs leading-relaxed line-clamp-2 text-black/40 dark:text-white/40">
                    {proj.description}
                  </p>
                </div>
                {proj.github && (
                  <a href={proj.github} target="_blank" rel="noreferrer"
                    className="flex-shrink-0 px-3 py-1.5 rounded-md text-xs font-medium
                      bg-orange-500 hover:bg-orange-600 dark:hover:bg-orange-400
                      text-white transition-colors duration-200">
                    GitHub →
                  </a>
                )}
              </div>
            )}
          </div>

          {/* CARD 7 — Social */}
          <div className="md:col-span-4 rounded-xl p-4
            bg-white dark:bg-[#161616]
            border border-black/8 dark:border-white/5 space-y-2.5">
            <p className="text-[10px] tracking-[0.3em] uppercase text-black/30 dark:text-white/30 mb-3">
              Links
            </p>
            {[
              { label: "LinkedIn", href: data.linkedin, icon: "💼" },
              { label: "GitHub", href: data.github, icon: "⎇" },
            ].filter((x) => x.href).map((x, i) => (
              <a key={i} href={x.href} target="_blank" rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-lg
                  bg-black/[0.03] dark:bg-white/[0.04]
                  border border-black/8 dark:border-white/5
                  hover:bg-black/[0.06] dark:hover:bg-white/[0.08]
                  transition-all duration-200 group">
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{x.icon}</span>
                  <span className="text-sm font-medium
                    text-black/60 dark:text-white/70
                    group-hover:text-black dark:group-hover:text-white transition-colors">
                    {x.label}
                  </span>
                </div>
                <span className="text-black/20 dark:text-white/20
                  group-hover:text-black/50 dark:group-hover:text-white/60
                  group-hover:translate-x-1 transition-all duration-200 text-sm">→</span>
              </a>
            ))}
            {(data.contactEmail || data.email) && (
              <a href={`mailto:${data.contactEmail || data.email}`}
                className="flex items-center justify-between p-2.5 rounded-lg mt-1.5
                  bg-orange-50 dark:bg-orange-500/10
                  border border-orange-200 dark:border-orange-500/20
                  hover:bg-orange-100 dark:hover:bg-orange-500/20
                  transition-all duration-200 group">
                <div className="flex items-center gap-2.5">
                  <span className="text-base">✉</span>
                  <span className="text-sm font-medium text-orange-700 dark:text-orange-300
                    group-hover:text-orange-800 dark:group-hover:text-orange-200">
                    Send Email
                  </span>
                </div>
                <span className="text-orange-400/50 dark:text-orange-400/40
                  group-hover:text-orange-500 dark:group-hover:text-orange-400
                  group-hover:translate-x-1 transition-all duration-200 text-sm">→</span>
              </a>
            )}
          </div>

          {/* CARD 8 — Projects Grid */}
          <div className="md:col-span-12 rounded-xl p-4
            bg-white dark:bg-[#161616]
            border border-black/8 dark:border-white/5">
            <p className="text-[10px] tracking-[0.3em] uppercase text-black/30 dark:text-white/30 mb-4">
              All Projects
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {data.projects?.map((p, i) => (
                <button key={i} onClick={() => setActiveProject(i)}
                  className={`text-left p-3 rounded-lg border transition-all duration-200
                    ${activeProject === i
                      ? "bg-orange-50 dark:bg-orange-500/10 border-orange-300 dark:border-orange-500/30"
                      : "bg-black/[0.02] dark:bg-white/[0.03] border-black/8 dark:border-white/5 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
                  }`}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] font-mono text-black/20 dark:text-white/20">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`text-sm font-semibold truncate
                      ${activeProject === i
                        ? "text-orange-700 dark:text-orange-300"
                        : "text-black/70 dark:text-white/80"}`}>
                      {p.title}
                    </span>
                  </div>
                  <p className="text-xs text-black/35 dark:text-white/30 line-clamp-1 pl-5">
                    {p.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* FOOTER */}
        <div className="mt-4 text-center">
          <p className="text-[10px] tracking-widest uppercase text-black/20 dark:text-white/20">
            {data.name} · Portfolio · {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Template3;