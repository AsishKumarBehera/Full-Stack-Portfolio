import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BASE_URL from "../../config";
import Icon from "../../components/Icon";

const Template1 = () => {
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#0a0a0f]">
        <div className="w-12 h-12 rounded-full border-4 border-purple-200 dark:border-purple-900 border-t-purple-500 animate-spin mb-4" />
        <p className="text-sm tracking-widest uppercase text-gray-400">
          Loading portfolio...
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white dark:bg-[#0a0a0f] text-black dark:text-white overflow-x-hidden">

      {/* 🔥 Animated Background */}
      <div className="fixed -top-20 -left-20 w-72 h-72 rounded-full bg-purple-400 opacity-20 blur-[80px] animate-pulse" />
      <div className="fixed -bottom-20 -right-20 w-72 h-72 rounded-full bg-blue-400 opacity-20 blur-[80px] animate-pulse" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12 pt-24 sm:pt-28">

        {/* HERO */}
        <div className={`rounded-2xl p-6 sm:p-8 mb-6
          bg-purple-50/60 dark:bg-purple-950/30
          border border-purple-100 dark:border-purple-900/50
          flex flex-col lg:flex-row items-center gap-6
          transition-all duration-700 ease-out
          hover:shadow-[0_20px_60px_rgba(124,77,255,0.2)]
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>

          <div className="flex items-center gap-4 sm:gap-6 flex-1">

            <img
              src={data.photo}
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover border-2 border-purple-500 transition-transform duration-500 hover:scale-110"
            />

            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                {data.name}
              </h1>

              <p className="text-purple-500">
                {data.role}
              </p>

              <p className="text-sm text-gray-500 break-words">
                {data.email}
              </p>
            </div>
          </div>

          <div className="w-full lg:w-auto text-center lg:text-right border-t lg:border-t-0 lg:border-l pt-4 lg:pt-0 lg:pl-6">
            <p className="text-sm text-gray-500 italic max-w-xs mx-auto lg:mx-0">
              "{data.bio || "Creative developer building amazing apps"}"
            </p>
          </div>
        </div>

        {/* ABOUT */}
        <div className={`rounded-2xl p-6 mb-6
          bg-purple-50/60 dark:bg-purple-950/30 border border-purple-500
          transition-all duration-700 delay-100
          hover:-translate-y-1 hover:shadow-xl
          ${visible ? "opacity-100" : "opacity-0"}`}>

          <p className="text-sm text-gray-600 dark:text-gray-300">
            {data.about}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">

            <div className="text-center">
              <p className="text-xl font-bold">{data.projects?.length}</p>
              <p className="text-xs">Projects</p>
            </div>

            <div className="text-center">
              <p className="text-xl font-bold">{data.technologies?.length}</p>
              <p className="text-xs">Tech</p>
            </div>

            <div className="text-center">
              <p className="text-xl font-bold">
                {data.experience === "Fresher" ? "0–1 Year" : data.experience}
              </p>
              <p className="text-xs">Experience</p>
            </div>

          </div>
        </div>

        {/* PROJECTS */}
        <div className="rounded-2xl p-6 mb-6 border border-purple-500">

          <h2 className="mb-4 font-bold">Projects</h2>

          <div className={`grid gap-4 justify-items-center
            ${data.projects?.length === 1
              ? "grid-cols-1 max-w-md mx-auto"
              : data.projects?.length === 2
                ? "grid-cols-1 sm:grid-cols-2"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}>

            {data.projects?.map((p, i) => (
              <div key={i}
                className="group w-full max-w-md border rounded-xl overflow-hidden border-purple-500
                transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(124,77,255,0.25)]">

                <div className="overflow-hidden">
                  <img
                    src={p.image}
                    className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-3">
                  <h3 className="font-semibold group-hover:text-purple-500 transition">
                    {p.title}
                  </h3>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {p.description}
                  </p>
                </div>

              </div>
            ))}

          </div>
        </div>

        {/* CONTACT */}
        <div className="rounded-2xl p-6 border border-purple-500">

          <h2 className="mb-4 font-bold">Contact</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {[
              { label: "Phone", value: data.phone, icon: "phone" },
              { label: "Email", value: data.email, icon: "mail" },
              { label: "GitHub", value: data.github, icon: "github" },
              { label: "LinkedIn", value: data.linkedin, icon: "linkedin" },
              { label: "Location", value: data.location, icon: "location" },
            ]
              .filter((item) => item.value)
              .map((item, i) => (

                <div key={i}
                  className="flex items-center gap-3 p-4 rounded-xl
          border border-purple-500
          transition-all duration-300
          hover:-translate-y-1 hover:bg-purple-500 hover:text-white group">

                  {/* ICON */}
                  <div className="w-10 h-10 flex items-center justify-center
            rounded-lg bg-purple-100 dark:bg-purple-900/50
            group-hover:bg-white/20">

                    <Icon
                      name={item.icon}
                      className="w-5 h-5 text-purple-600 dark:text-purple-300 group-hover:text-white"
                    />
                  </div>

                  {/* TEXT */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 uppercase">
                      {item.label}
                    </p>

                    <p className="text-sm font-medium truncate break-words">
                      {item.value}
                    </p>
                  </div>

                </div>
              ))}

          </div>
        </div>

      </div>
    </div>
  );
};

export default Template1;