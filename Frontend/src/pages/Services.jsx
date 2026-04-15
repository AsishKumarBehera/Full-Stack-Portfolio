import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    shortName: "",
    role: "",
    email: "",
    photo: null,
    photoPreview: "",
    technologies: [],
    experience: "",
    projects: [
      { title: "", description: "", github: "", image: null, preview: "" }
    ],
    phone: "",
    contactEmail: "",
    linkedin: "",
    github: "",
    location: "",
    design: "template1",
  });

  const [techInput, setTechInput] = useState("");
  const [savedPortfolios, setSavedPortfolios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    fetch("http://localhost:5000/api/portfolio")
      .then(res => res.json())
      .then(data => setSavedPortfolios(data));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      const file = files[0];
      setFormData({ ...formData, photo: file, photoPreview: URL.createObjectURL(file) });
    } else if (name === "phone") {
      const numericValue = value.replace(/\D/g, "").slice(0, 9);
      setFormData({ ...formData, phone: numericValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addTechnology = () => {
    if (techInput.trim()) {
      setFormData({ ...formData, technologies: [...formData.technologies, techInput] });
      setTechInput("");
    }
  };

  const removeTechnology = (index) => {
    setFormData({ ...formData, technologies: formData.technologies.filter((_, i) => i !== index) });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, { title: "", description: "", github: "", image: null, preview: "" }],
    });
  };

  const removeProject = (index) => {
    setFormData({ ...formData, projects: formData.projects.filter((_, i) => i !== index) });
  };

  const handleProjectChange = (index, e) => {
    const { name, value, files } = e.target;
    const updated = [...formData.projects];
    if (name === "image") {
      updated[index].image = files[0];
      updated[index].preview = URL.createObjectURL(files[0]);
    } else {
      updated[index][name] = value;
    }
    setFormData({ ...formData, projects: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailPattern = /.+@.+\..+/;
    if (!formData.name.trim()) return alert("Name is required ❌");
    if (!formData.email.trim()) return alert("Email is required ❌");
    if(!formData.role.trim()) return alert("Role is Required")
    if (!emailPattern.test(formData.email.trim())) return alert("Please enter a valid email ❌");
    if (!formData.contactEmail.trim()) return alert("Contact email is required ❌");
    if (!emailPattern.test(formData.contactEmail.trim())) return alert("Please enter a valid contact email ❌");
    if (!formData.experience) return alert("Experience is required ❌");
    if (!formData.phone.trim()) return alert("Phone is required ❌");
    if (!/^\d+$/.test(formData.phone.trim())) return alert("Phone must contain only numbers ❌");
    if (formData.technologies.length === 0) return alert("Add at least one technology ❌");
    if (!formData.projects[0].title.trim()) return alert("Add at least one project with a title ❌");

    setLoading(true);
    const form = new FormData();
    form.append("name", formData.name);
    form.append("shortName", formData.shortName);
    form.append("role", formData.role)
    form.append("email", formData.email);
    form.append("experience", formData.experience);
    form.append("phone", formData.phone);
    form.append("contactEmail", formData.contactEmail);
    form.append("linkedin", formData.linkedin);
    form.append("github", formData.github);
    form.append("location", formData.location);
    form.append("technologies", JSON.stringify(formData.technologies));
    form.append("design", formData.design);

    const projectsMeta = formData.projects.map(({ title, description, github }) => ({
      title, description, github
    }));
    form.append("projects", JSON.stringify(projectsMeta));
    if (formData.photo) form.append("photo", formData.photo);
    formData.projects.forEach((proj, i) => {
      if (proj.image) form.append(`projectImage_${i}`, proj.image);
    });

    try {
      const res = await fetch("http://localhost:5000/api/portfolio/save", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (res.ok) {
        navigate(`/portfolio/${data.id}`);
      } else {
        alert(data.error || "Error ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `w-full px-4 py-3 rounded-xl text-sm outline-none
    transition-all duration-200
    bg-white dark:bg-[#0f0820]
    border border-purple-100 dark:border-purple-900/60
    text-gray-800 dark:text-gray-200
    placeholder-gray-400 dark:placeholder-gray-600
    focus:border-purple-400 dark:focus:border-purple-500
    focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900/50`;

  const sectionClass = `rounded-2xl p-6 mb-6
    bg-purple-50/60 dark:bg-purple-950/30
    border border-purple-100 dark:border-purple-900/50`;

  const sectionLabel = `text-[11px] tracking-[0.14em] uppercase font-medium
    text-gray-400 dark:text-gray-500 mb-4 block`;

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

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-20">

        {/* Header */}
        <div className={`text-center mb-12
          transition-all duration-700 ease-out
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6
            bg-purple-50 dark:bg-purple-500/10
            border border-purple-300 dark:border-purple-500/30
            text-purple-600 dark:text-purple-300
            text-xs tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
            portfolio generator
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3
            text-gray-900 dark:text-white">
            Build Your{" "}
            <span style={{
              background: "linear-gradient(135deg, #c084fc, #60a5fa, #34d399)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>Portfolio</span>
          </h1>
          <p className="text-gray-400 dark:text-gray-500 text-sm max-w-md mx-auto">
            Fill in your details and generate a beautiful portfolio instantly 🚀
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* PERSONAL INFO */}
          <div className={`${sectionClass}
            transition-all duration-700 ease-out delay-100
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className={sectionLabel}>personal info</span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="relative">
                <input name="name" required placeholder="Full Name"
                  onChange={handleChange} className={inputClass} />
                <span className="absolute right-3 top-3 text-red-500 font-bold">*</span>
              </div>
              <input name="shortName" placeholder="Short Name"
                onChange={handleChange} className={inputClass} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
              <input type="email" name="email" required placeholder="Email"
                onChange={handleChange} className={inputClass} />
              <span className="absolute right-3 top-3 text-red-500 font-bold">*</span>
              </div>
              <div className="relative">
              <input type="text" name="role" required placeholder="Role"
                onChange={handleChange} className={inputClass} />
              <span className="absolute right-3 top-3 text-red-500 font-bold">*</span>
              </div>
            </div>

            {/* Photo upload */}
            <div className="flex items-center gap-4 mt-2">
              <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                cursor-pointer text-sm font-medium transition-all duration-200
                bg-white dark:bg-[#0f0820]
                border border-purple-100 dark:border-purple-900/60
                text-gray-500 dark:text-gray-400
                hover:border-purple-400 dark:hover:border-purple-500
                hover:text-purple-600 dark:hover:text-purple-400">
                📷 Upload Photo
                <input type="file" name="photo" onChange={handleChange} className="hidden" />
              </label>

              {formData.photoPreview && (
                <div className="relative">
                  <div className="absolute inset-0 rounded-full
                    bg-gradient-to-tr from-purple-500 via-blue-400 to-emerald-400
                    animate-spin [animation-duration:8s]"
                    style={{ padding: "2px" }}>
                    <div className="w-full h-full rounded-full bg-white dark:bg-[#0a0a0f]" />
                  </div>
                  <img src={formData.photoPreview}
                    className="relative w-14 h-14 rounded-full object-cover border-2 border-purple-500 z-10" />
                </div>
              )}
            </div>
          </div>

          {/* EXPERIENCE */}
          <div className={`${sectionClass}
            transition-all duration-700 ease-out delay-150
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className={sectionLabel}>experience</span>

            <div className="relative">
              <select name="experience" required onChange={handleChange}
                className={inputClass}>
                <option value="">Select Experience</option>
                <option value="Fresher">Fresher</option>
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
                <option value="4+ Years">4+ Years</option>
              </select>
              <span className="absolute right-3 top-3 pr-3 text-red-500 font-bold">*</span>
            </div>
          </div>

          {/* TECHNOLOGIES */}
          <div className={`${sectionClass}
            transition-all duration-700 ease-out delay-200
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className={sectionLabel}>tech stack</span>

            <div className="flex gap-2 mb-4">
              <input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTechnology())}
                placeholder="e.g. React, Node.js..."
                className={inputClass} />
              <button type="button" onClick={addTechnology}
                className="px-5 py-3 rounded-xl text-sm font-medium text-white
                  transition-all duration-200 hover:-translate-y-0.5 flex-shrink-0
                  hover:shadow-[0_8px_24px_rgba(124,77,255,0.3)]"
                style={{ background: "linear-gradient(135deg,#7c4dff,#4d79ff)" }}>
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.technologies.map((tech, i) => (
                <span key={i}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                    bg-purple-100 dark:bg-purple-900/50
                    text-purple-700 dark:text-purple-300
                    border border-purple-200 dark:border-purple-800/50">
                  {tech}
                  <button type="button" onClick={() => removeTechnology(i)}
                    className="text-purple-400 hover:text-red-500 transition-colors text-xs">
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* PROJECTS */}
          <div className={`${sectionClass}
            transition-all duration-700 ease-out delay-300
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className={sectionLabel}>projects</span>

            {formData.projects.map((proj, i) => (
              <div key={i}
                className="mb-6 p-5 rounded-xl
                  bg-white dark:bg-[#0f0820]
                  border border-purple-100 dark:border-purple-900/50">

                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                    Project {i + 1}
                  </p>
                  {formData.projects.length > 1 && (
                    <button type="button" onClick={() => removeProject(i)}
                      className="text-xs px-3 py-1 rounded-full
                        text-red-500 dark:text-red-400
                        border border-red-200 dark:border-red-900/50
                        hover:bg-red-50 dark:hover:bg-red-900/20
                        transition-all duration-200">
                      Remove
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="relative">
                    <input name="title" required placeholder="Project Title"
                      onChange={(e) => handleProjectChange(i, e)} className={inputClass} />
                    <span className="absolute right-3 top-3 text-red-500 font-bold">*</span>
                  </div>
                  <textarea name="description" placeholder="Description" rows="3"
                    onChange={(e) => handleProjectChange(i, e)}
                    className={`${inputClass} resize-none`} />
                  <input name="github" placeholder="GitHub URL"
                    onChange={(e) => handleProjectChange(i, e)} className={inputClass} />

                  <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                    cursor-pointer text-sm font-medium w-fit transition-all duration-200
                    bg-purple-50 dark:bg-purple-950/30
                    border border-purple-100 dark:border-purple-900/60
                    text-gray-500 dark:text-gray-400
                    hover:border-purple-400 dark:hover:border-purple-500
                    hover:text-purple-600 dark:hover:text-purple-400">
                    🖼 Upload Image
                    <input type="file" name="image"
                      onChange={(e) => handleProjectChange(i, e)} className="hidden" />
                  </label>

                  {proj.preview && (
                    <img src={proj.preview}
                      className="w-32 h-20 object-cover rounded-xl
                        border border-purple-100 dark:border-purple-900/50" />
                  )}
                </div>
              </div>
            ))}

            <button type="button" onClick={addProject}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium
                transition-all duration-200 hover:-translate-y-0.5
                text-purple-600 dark:text-purple-400
                border border-purple-300 dark:border-purple-700
                hover:bg-purple-50 dark:hover:bg-purple-900/20">
              + Add Another Project
            </button>
          </div>

          {/* CONTACT */}
          <div className={`${sectionClass}
            transition-all duration-700 ease-out delay-[400ms]
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className={sectionLabel}>contact info</span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <input type="email" name="contactEmail" required placeholder="Email"
                  onChange={handleChange} className={inputClass} />
                <span className="absolute right-3 top-3 text-red-500 font-bold">*</span>
              </div>
              <div className="relative">
                <input type="tel" inputMode="numeric" pattern="[0-9]*" name="phone" required placeholder="Phone"
                  onChange={handleChange} className={inputClass} />
                <span className="absolute right-3 top-3 text-red-500 font-bold">*</span>
              </div>
              <input name="linkedin" placeholder="LinkedIn URL"
                onChange={handleChange} className={inputClass} />
              <input name="github" placeholder="GitHub URL"
                onChange={handleChange} className={inputClass} />
              <input name="location" placeholder="Location"
                onChange={handleChange} className={`${inputClass} md:col-span-2`} />
            </div>
          </div>
          {/* DESIGN SELECTION */}
<div className={sectionClass}>
  <span className={sectionLabel}>portfolio design</span>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

    {[
      { name: "template1", img: "/projects/template1.png" },
      { name: "template2", img: "/projects/template2.png" },
      { name: "template3", img: "/projects/template3.png" },
    ].map((template) => (
      <div
        key={template.name}
        onClick={() => setFormData({ ...formData, design: template.name })}
        className={`cursor-pointer rounded-2xl overflow-hidden border
          transition-all duration-300 group
          ${formData.design === template.name
            ? "border-purple-500 ring-2 ring-purple-400"
            : "border-gray-200 dark:border-gray-700"
          }`}
      >

        {/* IMAGE */}
        <div className="relative w-full h-45 sm:h-40 lg:h-48 overflow-hidden bg-gray-100 dark:bg-gray-900">
          <img
            src={template.img}
            alt={template.name}
            className="absolute inset-0 w-full h-full object-cover
              group-hover:scale-105 transition duration-300"
          />
        </div>

        {/* TITLE */}
        <div className="p-3 text-center bg-white dark:bg-[#0f0820]">
          <p className="text-sm font-medium capitalize">
            {template.name}
          </p>
        </div>

      </div>
    ))}

  </div>
</div>

          {/* Submit */}
          <button type="submit" disabled={loading}
            className={`w-full py-4 rounded-2xl text-white text-sm font-medium
              transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60
              hover:shadow-[0_12px_32px_rgba(124,77,255,0.4)] active:scale-95
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ background: "linear-gradient(135deg,#7c4dff,#4d79ff)" }}>
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/40 border-t-white
                  rounded-full animate-spin" />
                Generating...
              </span>
            ) : "Generate Portfolio →"}
          </button>

        </form>

        {/* PREVIOUS PORTFOLIOS */}
        {savedPortfolios.length > 0 && (
          <div className={`mt-16
            transition-all duration-700 ease-out delay-500
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

            <p className="text-[11px] tracking-[0.14em] uppercase font-medium
              text-gray-400 dark:text-gray-500 mb-6">
              previous portfolios
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {savedPortfolios.map((p) => (
                <div key={p._id}
                  onClick={() => navigate(`/portfolio/${p._id}`)}
                  className="group p-5 rounded-2xl cursor-pointer
                    bg-purple-50/60 dark:bg-purple-950/30
                    border border-purple-100 dark:border-purple-900/50
                    hover:border-purple-400 dark:hover:border-purple-500
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:shadow-[0_12px_32px_rgba(124,77,255,0.15)]">

                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center
                      text-sm font-bold text-white flex-shrink-0
                      group-hover:scale-110 transition-transform duration-200"
                      style={{ background: "linear-gradient(135deg,#7c4dff,#4d79ff)" }}>
                      {p.name?.charAt(0)?.toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold
                        text-gray-900 dark:text-white
                        group-hover:text-purple-600 dark:group-hover:text-purple-400
                        transition-colors duration-200">
                        {p.name}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        {p.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] tracking-widest uppercase
                      text-gray-400 dark:text-gray-500">
                      view portfolio
                    </span>
                    <span className="text-purple-400 group-hover:translate-x-1
                      transition-transform duration-200 text-sm">
                      →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}



      </div>
    </div>
  );
};

export default Services;