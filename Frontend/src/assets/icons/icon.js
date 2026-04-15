import githubDark from "./github-dark.svg";
import githubLight from "./github-light.svg";

import linkedinDark from "./linkedin-dark.svg";
import linkedinLight from "./linkedin-light.svg";

import mailDark from "./mail-dark.svg";
import mailLight from "./mail-light.svg";

import phoneDark from "./phone-dark.svg";
import phoneLight from "./phone-light.svg";

import moonDark from "./moon-dark.svg";
import moonLight from "./moon-light.svg";

import location from "./location.svg";

// single icons
import react from "./react-js.svg";
import node from "./node-js.svg";
import mongodb from "./mongodb.svg";
import nextjs from "./nextjs.svg";
import tailwind from "./tailwind-css.svg";

export const icons = {
  github: { light: githubLight, dark: githubDark },
  linkedin: { light: linkedinLight, dark: linkedinDark },
  mail: { light: mailLight, dark: mailDark },
  phone: { light: phoneLight, dark: phoneDark },
  moon: { light: moonLight, dark: moonDark },

  location, // single

  tech: {
    react,
    node,
    mongodb,
    nextjs,
    tailwind,
  },
};