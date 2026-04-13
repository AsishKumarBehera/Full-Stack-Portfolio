import { useState, useEffect, useRef } from "react";
import About from "./About";
import Experience from "./Experience";
import Projects from "./Projects";
import Contact from "./Contact";

const roles = ["Full Stack Developer", "React Specialist", "I build scalable web apps"];

function Home() {
    const [text, setText] = useState("");
    const [index, setIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [visible, setVisible] = useState(false);

    // Trigger entrance animation on mount
    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 100);
        return () => clearTimeout(t);
    }, []);

    // Typewriter
    useEffect(() => {
        const current = roles[index];
        const speed = isDeleting ? 45 : 80;
        const timer = setTimeout(() => {
            setText((prev) =>
                isDeleting
                    ? current.substring(0, prev.length - 1)
                    : current.substring(0, prev.length + 1)
            );
            if (!isDeleting && text === current) {
                setTimeout(() => setIsDeleting(true), 1600);
            }
            if (isDeleting && text === "") {
                setIsDeleting(false);
                setIndex((prev) => (prev + 1) % roles.length);
            }
        }, speed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, index]);

    return (
        <>
            <section className="relative min-h-screen flex flex-col items-center justify-center
                text-center px-6 overflow-hidden
                pt-24 pb-16 md:pt-0 md:pb-16
                bg-white dark:bg-[#0a0a0f] transition-colors duration-300">

                {/* Grid background */}
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(rgba(120,80,255,0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(120,80,255,0.05) 1px, transparent 1px)`,
                        backgroundSize: "48px 48px",
                        maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)"
                    }}
                />

                {/* Animated glow orbs */}
                <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full blur-[80px]
                    opacity-10 dark:opacity-20 bg-purple-400 dark:bg-purple-600
                    animate-[pulse_6s_ease-in-out_infinite]
                    transition-opacity duration-300" />
                <div className="absolute top-16 -right-16 w-72 h-72 rounded-full blur-[80px]
                    opacity-10 dark:opacity-15 bg-cyan-300 dark:bg-cyan-400
                    animate-[pulse_8s_ease-in-out_infinite_1s]
                    transition-opacity duration-300" />
                <div className="absolute bottom-10 left-1/3 w-48 h-48 rounded-full blur-[80px]
                    opacity-10 dark:opacity-15 bg-pink-400 dark:bg-pink-500
                    animate-[pulse_10s_ease-in-out_infinite_2s]
                    transition-opacity duration-300" />

                {/* Dot grid — matches other sections */}
                <div className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: `radial-gradient(circle, rgba(120,80,255,0.06) 1px, transparent 1px)`,
                        backgroundSize: "32px 32px",
                    }} />

                {/* Floating tags — slide in from sides */}
                <div className={`hidden md:block absolute top-1/4 left-6
                    bg-white/80 dark:bg-[#0f0e19]/90
                    border border-purple-200 dark:border-purple-900/40
                    rounded-xl px-4 py-2 text-xs
                    text-gray-500 dark:text-white/50 backdrop-blur
                    transition-all duration-700 ease-out delay-[800ms]
                    ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse" />
                    React • Node.js
                </div>
                <div className={`hidden md:block absolute top-1/3 right-6
                    bg-white/80 dark:bg-[#0f0e19]/90
                    border border-purple-200 dark:border-purple-900/40
                    rounded-xl px-4 py-2 text-xs
                    text-gray-500 dark:text-white/50 backdrop-blur
                    transition-all duration-700 ease-out delay-[900ms]
                    ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-400 mr-2 animate-pulse" />
                    Full Stack Dev
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center">

                    {/* Badge — fades down from top */}
                    <div className={`flex items-center gap-2
                        bg-purple-50 dark:bg-purple-500/10
                        border border-purple-300 dark:border-purple-500/30
                        text-purple-600 dark:text-purple-300
                        text-xs tracking-widest px-5 py-2 rounded-full mb-4 sm:mb-8
                        transition-all duration-700 ease-out
                        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 dark:bg-purple-400 animate-pulse" />
                        available for opportunities
                    </div>

                    {/* Headline — fades up */}
                    <h1 className={`font-extrabold leading-tight tracking-tight
                        text-4xl sm:text-5xl md:text-7xl mb-3
                        text-gray-900 dark:text-white
                        transition-all duration-700 ease-out delay-150
                        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                        Hi, I'm{" "}
                        <span style={{
                            background: "linear-gradient(135deg, #c084fc, #60a5fa, #34d399)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text"
                        }}>Asish</span>
                    </h1>

                    {/* Typed line — fades up */}
                    <h2 className={`text-2xl sm:text-3xl md:text-5xl font-bold min-h-[1.3em] mb-3 sm:mb-4
                        transition-all duration-700 ease-out delay-300
                        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                        style={{
                            background: "linear-gradient(135deg, #c084fc, #60a5fa, #34d399)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text"
                        }}>
                        {text}
                        <span className="inline-block w-0.5 h-[0.85em] bg-purple-400 ml-1 align-middle animate-pulse rounded" />
                    </h2>

                    {/* Tagline — fades up */}
                    <p className={`italic font-light text-lg md:text-xl max-w-md mb-10
                        text-gray-400 dark:text-white/40
                        transition-all duration-700 ease-out delay-[400ms]
                        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                        Engineering efficiency with full-stack precision 🚀
                    </p>

                    {/* Buttons — fade up */}
                    <div className={`flex flex-wrap gap-4 justify-center mb-8 md:mb-16
                        transition-all duration-700 ease-out delay-500
                        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                        <a href="#projects"
                            className="px-8 py-3 rounded-full text-white text-sm font-medium transition-all
                                hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(124,77,255,0.4)]
                                active:scale-95"
                            style={{ background: "linear-gradient(135deg,#7c4dff,#4d79ff)" }}>
                            View Projects →
                        </a>
                        <a href="projects/Asish.pdf"
                            download
                            className="px-8 py-3 rounded-full text-sm transition-all hover:-translate-y-0.5
                                active:scale-95
                                text-gray-700 dark:text-white/70
                                border border-gray-300 dark:border-white/20
                                hover:bg-gray-100 dark:hover:bg-white/5
                                hover:border-purple-400 dark:hover:border-purple-500
                                hover:text-purple-600 dark:hover:text-purple-400">
                            Download Resume ↓
                        </a>
                    </div>

                    {/* Stats — each fades up with stagger */}
                    <div className="flex gap-10 md:gap-20 flex-wrap justify-center">
                        {[
                            ["5+", "Projects Built"],
                            ["20+", "Technologies"],
                            ["10+", "GitHub Repos"]
                        ].map(([num, label], i) => (
                            <div key={i}
                                className={`text-center cursor-default
                                    transition-all duration-700 ease-out
                                    hover:-translate-y-1
                                    ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                                style={{ transitionDelay: `${600 + i * 100}ms` }}>
                                <div className="text-3xl font-bold"
                                    style={{
                                        background: "linear-gradient(135deg, #c084fc, #60a5fa, #34d399)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text"
                                    }}>
                                    {num}
                                </div>
                                <div className="text-[11px] tracking-widest uppercase mt-1
                                    text-gray-400 dark:text-white/30">
                                    {label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scroll hint — fades in last */}
                <div className={`absolute bottom-8 left-1/2 -translate-x-1/2
                    flex flex-col items-center gap-2
                    transition-all duration-1000 ease-out delay-[900ms]
                    ${visible ? "opacity-40" : "opacity-0"}`}>
                    <div className="w-px h-12 bg-gradient-to-b from-gray-400 dark:from-white/50 to-transparent animate-pulse" />
                    <span className="text-[10px] tracking-[0.15em] uppercase text-gray-400 dark:text-white/40">scroll</span>
                </div>
            </section>

            <div id="about"><About /></div>
            <div id="experience"><Experience /></div>
            <div id="projects"><Projects /></div>
            <div id="contact"><Contact /></div>
        </>
    );
}

export default Home;