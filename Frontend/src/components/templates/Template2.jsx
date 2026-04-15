import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BASE_URL from '../config.js';

const Template2 = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [visible, setVisible] = useState(false);

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
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f4ef] dark:bg-[#111110]">
        <div className="w-10 h-10 border-2 border-black dark:border-white border-t-transparent dark:border-t-transparent animate-spin mb-4" />
        <p className="text-xs tracking-[0.2em] uppercase text-gray-500 dark:text-gray-400">
          Loading...
        </p>
      </div>
    );
  }

  
  const visionStatement = `I aspire to lead innovative teams that build products with meaningful impact. In the next 5 years, I see myself mentoring young developers and architecting solutions that solve real-world problems through elegant code.`;
    const formatExperience = (exp) => {
  if (exp === "Fresher") return "0–1 Year";
  return exp;
};

  return (
    <div
      className={`min-h-screen bg-[#f5f4ef] dark:bg-[#111110] text-black dark:text-white
        transition-opacity duration-700 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <main className="max-w-6xl mx-auto px-8 pt-28 pb-24">

        {/* ── HERO ── */}
        <section className="mb-20">
          {/* Issue label */}
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[10px] tracking-[0.3em] uppercase text-gray-400 dark:text-gray-500">
              Creative Developer
            </span>
            <div className="flex-1 h-px bg-black/10 dark:bg-white/10" />
            <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase
              text-emerald-700 dark:text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
              Open to work
            </span>
          </div>

          {/* Name — large editorial */}
          <div className="flex flex-col md:flex-row md:items-end gap-8">
            <div className="flex-1">
              <h1 className="text-[clamp(3rem,10vw,7rem)] font-black leading-none tracking-tighter
                text-black dark:text-white mb-6 uppercase">
                {data.name}
              </h1>
              <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-md leading-relaxed">
                {data.experience || "Fresher — eager to build meaningful things."}
              </p>
            </div>

            {/* Avatar — square, editorial crop */}
            <div className="flex-shrink-0 w-40 h-40 md:w-48 md:h-48 overflow-hidden
              border border-black/10 dark:border-white/10">
              <img
                src={data.photo || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                alt="profile"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                onError={(e) => {
                  e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                }}
              />
            </div>
          </div>
        </section>

        {/* ── NEW: FUTURE ROLE SECTION ── */}
        <section className="mb-20 bg-black/5 dark:bg-white/5 p-8 -mx-4 md:-mx-8">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-[10px] tracking-[0.3em] uppercase text-gray-400 dark:text-gray-500 mb-4 block">
              Vision & Trajectory
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">
              Role: {data.role}
              <span className="bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                {" "}
              </span>
            </h2>
            <div className="w-16 h-px bg-black/20 dark:bg-white/20 mx-auto my-6" />
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
              {visionStatement}
            </p>
            {/* Future goals timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-black/10 dark:border-white/10">
              <div>
                <p className="text-2xl font-black">{formatExperience(data.experience)}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Lead small teams</p>
              </div>
              <div>
                <p className="text-2xl font-black">{formatExperience(data.experience)}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Architect solutions</p>
              </div>
              <div>
                <p className="text-2xl font-black">{formatExperience(data.experience)}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Shape product strategy</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── DIVIDER ── */}
        <div className="flex items-center gap-4 mb-20">
          <div className="flex-1 h-px bg-black dark:bg-white" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-gray-400 dark:text-gray-500 px-2">
            Work & Skills
          </span>
          <div className="flex-1 h-px bg-black dark:bg-white" />
        </div>

        {/* ── TECH STACK ── */}
        <section className="mb-20">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400 dark:text-gray-500 mt-1 sticky top-20">
                Tech Stack
              </p>
            </div>
            <div className="col-span-12 md:col-span-9">
              <div className="flex flex-wrap gap-2">
                {data.technologies?.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 text-sm tracking-wide
                      border border-black/20 dark:border-white/20
                      text-black dark:text-white
                      hover:bg-black hover:text-white
                      dark:hover:bg-white dark:hover:text-black
                      transition-all duration-200 cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {/* Additional skill context */}
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
                Currently exploring {data.learningGoal || "cloud architecture and AI integration"}.
              </p>
            </div>
          </div>
        </section>

        {/* ── DIVIDER ── */}
        <div className="h-px bg-black/10 dark:bg-white/10 mb-20" />

        {/* ── PROJECTS ── */}
        <section className="mb-20">
          <div className="grid grid-cols-12 gap-6 mb-10">
            <div className="col-span-12 md:col-span-3">
              <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400 dark:text-gray-500 sticky top-20">
                Selected Projects
              </p>
            </div>
            <div className="col-span-12 md:col-span-9">
              <p className="text-sm text-gray-400 dark:text-gray-500">
                {data.projects?.length || 0} projects • {data.projects?.filter(p => p.github).length || 0} open source
              </p>
            </div>
          </div>

          {/* Project list — editorial rows */}
          <div className="space-y-0">
            {data.projects?.map((p, i) => (
              <div
                key={i}
                className="group border-t border-black/10 dark:border-white/10
                  last:border-b hover:bg-black/[0.02] dark:hover:bg-white/[0.03]
                  transition-colors duration-200"
              >
                <div className="grid grid-cols-12 gap-6 py-6">
                  {/* Index + image col */}
                  <div className="col-span-12 md:col-span-3 flex items-start gap-4">
                    <span className="text-[10px] tracking-widest text-gray-300 dark:text-gray-600 mt-1 font-mono">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {/* Thumbnail */}
                    <div className="w-16 h-16 flex-shrink-0 overflow-hidden
                      border border-black/10 dark:border-white/10
                      bg-gray-100 dark:bg-gray-900">
                      <img
                        src={p.image || `https://placehold.co/64x64/e5e4df/555?text=${encodeURIComponent(p.title?.charAt(0) || "P")}`}
                        alt={p.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        onError={(e) => {
                          e.target.src = `https://placehold.co/64x64/e5e4df/555?text=${encodeURIComponent(p.title?.charAt(0) || "P")}`;
                        }}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="col-span-12 md:col-span-6">
                    <h3 className="font-bold text-lg tracking-tight mb-2 group-hover:translate-x-1 transition-transform duration-200">
                      {p.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400 mb-2">
                      {p.description}
                    </p>
                    {/* Project tech tags */}
                    {p.techStack && p.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {p.techStack.slice(0, 3).map((tech, idx) => (
                          <span key={idx} className="text-[9px] px-1.5 py-0.5 bg-black/5 dark:bg-white/10 rounded-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Link */}
                  <div className="col-span-12 md:col-span-3 flex md:justify-end items-start">
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-xs tracking-widest uppercase
                          text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white
                          transition-colors duration-200 group/link"
                      >
                        <span>GitHub</span>
                        <span className="transform group-hover/link:translate-x-1 transition-transform duration-200">→</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── DIVIDER ── */}
        <div className="flex items-center gap-4 mb-20">
          <div className="flex-1 h-px bg-black dark:bg-white" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-gray-400 dark:text-gray-500 px-2">
            Contact
          </span>
          <div className="flex-1 h-px bg-black dark:bg-white" />
        </div>

        {/* ── CONTACT ── */}
        <section>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400 dark:text-gray-500 sticky top-20">
                Get in touch
              </p>
            </div>

            <div className="col-span-12 md:col-span-9">
              {/* Big email CTA */}
              {data.contactEmail && (
                <a
                  href={`mailto:${data.contactEmail}`}
                  className="block text-[clamp(1.2rem,3vw,2.2rem)] font-black tracking-tight
                    text-black dark:text-white hover:opacity-50 transition-opacity duration-200 mb-10 break-all"
                >
                  {data.contactEmail} ↗
                </a>
              )}

              {/* Availability message */}
              <div className="mb-8 p-4 bg-black/5 dark:bg-white/5 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  📬 Currently available for {data.availabilityType || "freelance and full-time opportunities"}. 
                  Best response time: within 24 hours.
                </p>
              </div>

              {/* Other contacts as inline list */}
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                {[
                  { label: "Phone", value: data.phone, href: `tel:${data.phone}` },
                  { label: "LinkedIn", value: "LinkedIn", href: data.linkedin },
                  { label: "GitHub", value: "GitHub", href: data.github },
                  { label: "Location", value: data.location, href: null },
                  { label: "Time Zone", value: data.timezone || "IST (UTC+5:30)", href: null },
                ]
                  .filter((item) => item.value)
                  .map((item, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <span className="text-[9px] tracking-[0.3em] uppercase text-gray-400 dark:text-gray-500">
                        {item.label}
                      </span>
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm font-medium text-black dark:text-white
                            hover:opacity-50 transition-opacity duration-200"
                        >
                          {item.value} →
                        </a>
                      ) : (
                        <span className="text-sm font-medium">{item.value}</span>
                      )}
                    </div>
                  ))}
              </div>

              {/* Preferred contact method note */}
              <div className="mt-6 text-xs text-gray-400 dark:text-gray-500 italic">
                ✉️ Email is the fastest way to reach me.
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-24 pt-8 border-t border-black/10 dark:border-white/10
          flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <span className="text-[10px] tracking-widest uppercase text-gray-400 dark:text-gray-500">
            {data.name} — Portfolio
          </span>
          <span className="text-[10px] tracking-widest uppercase text-gray-400 dark:text-gray-500">
            © {new Date().getFullYear()}
          </span>
        </footer>
      </main>
    </div>
  );
};

export default Template2;