import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

const contactInfo = [
  { icon: "✉", label: "Email", text: "basishkumar54@gmail.com" },
  { icon: "📍", label: "Location", text: "India" },
  { icon: "⎇", label: "GitHub", text: "github.com/AsishKumarBehera" },
];

function Contact() {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
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

  const sendEmail = async (e) => {
  e.preventDefault();
  setLoading(true);
  setStatus("");

  const formData = {
    name: form.current.user_name.value,
    email: form.current.user_email.value,
    message: form.current.message.value,
  };

  try {
    // ✅ 1. Send Email (EmailJS)
    await emailjs.sendForm(
      "service_qmbfomk",
      "template_9pb52qc",
      form.current,
      "asuKIz-I0QCbaAqE2"
    );

    // ✅ 2. Store in Database (Backend)
    await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    setStatus("success");
    form.current.reset();

  } catch (error) {
    console.log(error);
    setStatus("error");
  }

  setLoading(false);
};

  return (
    <section
      ref={sectionRef}
      className="relative px-6 py-24 overflow-hidden
        bg-white dark:bg-[#0a0a0f]
        text-black dark:text-white
        transition-colors duration-300">

      {/* Animated background orbs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full
        bg-purple-300 dark:bg-purple-700 opacity-10 dark:opacity-20
        animate-[pulse_6s_ease-in-out_infinite] blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full
        bg-blue-300 dark:bg-blue-700 opacity-10 dark:opacity-20
        animate-[pulse_8s_ease-in-out_infinite_1s] blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full
        bg-pink-300 dark:bg-pink-800 opacity-5 dark:opacity-10
        animate-[pulse_10s_ease-in-out_infinite_2s] blur-[100px] pointer-events-none" />

      {/* Animated grid dots */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(120,80,255,0.08) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }} />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Label — slides in from left */}
        <p className={`text-xs tracking-[0.14em] uppercase font-medium
          text-purple-500 dark:text-purple-400 mb-3
          transition-all duration-700 ease-out
          ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
          say hello
        </p>

        {/* Title — slides in from left with delay */}
        <h1 className={`text-4xl md:text-5xl font-extrabold tracking-tight
          text-gray-900 dark:text-white mb-14
          transition-all duration-700 ease-out delay-100
          ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
          Let's{" "}
          <span style={{
            background: "linear-gradient(135deg, #c084fc, #60a5fa, #34d399)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            Connect
          </span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

          {/* LEFT — slides in from left */}
          <div className={`transition-all duration-700 ease-out delay-200
            ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>

            <h2 className="text-xl font-bold mb-3
              text-purple-600 dark:text-purple-400">
              Get in Touch
            </h2>

            <p className="text-sm leading-relaxed mb-8
              text-gray-500 dark:text-gray-400">
              Have a project in mind or just want to say hi? Feel free to send
              me a message — I usually respond within 24 hours.
            </p>

            {/* Info cards — each animates in with stagger */}
            <div className="space-y-3">
              {contactInfo.map((item, i) => (
                <div key={i}
                  className={`flex items-center gap-4 p-4 rounded-2xl
                    group cursor-default
                    bg-purple-50/60 dark:bg-purple-950/30
                    border border-purple-100 dark:border-purple-900/50
                    hover:border-purple-400 dark:hover:border-purple-500
                    hover:bg-purple-50 dark:hover:bg-purple-900/20
                    transition-all duration-300 hover:-translate-y-0.5
                    hover:shadow-[0_8px_24px_rgba(124,77,255,0.12)]
                    ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
                  style={{ transitionDelay: `${300 + i * 100}ms` }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center
                    text-base flex-shrink-0
                    bg-purple-100 dark:bg-purple-900/50
                    text-purple-600 dark:text-purple-300
                    group-hover:bg-purple-500 group-hover:text-white
                    transition-all duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest uppercase
                      text-gray-400 dark:text-gray-500 mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          
          </div>

          {/* RIGHT — slides in from right */}
          <form ref={form} onSubmit={sendEmail}
            className={`rounded-2xl p-7 space-y-4
              bg-purple-50/60 dark:bg-purple-950/30
              border border-purple-100 dark:border-purple-900/50
              transition-all duration-700 ease-out delay-300
              ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>

            {/* Floating label inputs */}
            {[
              { type: "text", name: "user_name", placeholder: "Your Name" },
              { type: "email", name: "user_email", placeholder: "Your Email" },
            ].map((field, i) => (
              <div key={i} className="relative group">
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none
                    transition-all duration-200
                    bg-white dark:bg-[#0f0820]
                    border border-purple-100 dark:border-purple-900/60
                    text-gray-800 dark:text-gray-200
                    placeholder-gray-400 dark:placeholder-gray-600
                    focus:border-purple-400 dark:focus:border-purple-500
                    focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900/50
                    group-hover:border-purple-300 dark:group-hover:border-purple-700" />
              </div>
            ))}

            <div className="relative group">
              <textarea
                name="message"
                rows="5"
                placeholder="Your Message"
                required
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none
                  transition-all duration-200
                  bg-white dark:bg-[#0f0820]
                  border border-purple-100 dark:border-purple-900/60
                  text-gray-800 dark:text-gray-200
                  placeholder-gray-400 dark:placeholder-gray-600
                  focus:border-purple-400 dark:focus:border-purple-500
                  focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900/50
                  group-hover:border-purple-300 dark:group-hover:border-purple-700" />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full text-sm font-medium text-white
                transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60
                hover:shadow-[0_8px_24px_rgba(124,77,255,0.35)]
                active:scale-95"
              style={{ background: "linear-gradient(135deg,#7c4dff,#4d79ff)" }}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white
                    rounded-full animate-spin" />
                  Sending...
                </span>
              ) : "Send Message →"}
            </button>

            {status === "success" && (
              <div className="flex items-center gap-2 justify-center text-sm
                text-emerald-600 dark:text-emerald-400 animate-[fadeIn_0.4s_ease]">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Message sent successfully!
              </div>
            )}
            {status === "error" && (
              <div className="flex items-center gap-2 justify-center text-sm
                text-red-500 dark:text-red-400 animate-[fadeIn_0.4s_ease]">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                Failed to send. Please try again.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;