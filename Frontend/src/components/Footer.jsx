import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="px-6 py-10
      bg-white dark:bg-[#0a0a0f]
      border-t border-purple-100 dark:border-purple-900/40
      transition-colors duration-300">

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row
        justify-between items-center gap-6">

        {/* Left — Brand */}
        <div className="text-center md:text-left">
          <span className="text-2xl font-extrabold tracking-tight
            text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(135deg,#7c4dff,#4d79ff)" }}>
            AK
          </span>
          <p className="text-xs italic mt-1
            text-gray-400 dark:text-gray-600">
            Engineering efficiency with full-stack precision
          </p>
        </div>

        {/* Center — Social icons */}
        <div className="flex gap-3">
          {[
            { icon: <FaGithub />, href: "https://github.com/AsishKumarBehera", label: "GitHub" },
            { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/asish-kumar-behera-669920277/", label: "LinkedIn" },
            { icon: <FaEnvelope />, href: "mailto:yourmail@gmail.com", label: "Email" },
          ].map((item, i) => (
            <a key={i}
              href={item.href}
              target={item.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={item.label}
              className="w-10 h-10 rounded-xl flex items-center justify-center
                text-base transition-all duration-200 hover:-translate-y-1
                text-gray-400 dark:text-gray-600
                bg-purple-50 dark:bg-purple-950/30
                border border-purple-100 dark:border-purple-900/50
                hover:text-purple-600 dark:hover:text-purple-400
                hover:border-purple-300 dark:hover:border-purple-700">
              {item.icon}
            </a>
          ))}
        </div>

        {/* Right — Copyright */}
        <p className="text-xs text-center md:text-right
          text-gray-400 dark:text-gray-600">
          © {new Date().getFullYear()} Asish Kumar. All rights reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;