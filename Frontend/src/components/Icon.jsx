import { icons } from "../assets/icons/icon";

const Icon = ({ name, className = "w-5 h-5" }) => {
  const icon = icons[name];

  // dual mode icon
  if (icon?.light && icon?.dark) {
    return (
      <>
        <img src={icon.dark} className={`block dark:hidden ${className}`} />
        <img src={icon.light} className={`hidden dark:block ${className}`} />
      </>
    );
  }

  // single icon
  if (icon) {
    return <img src={icon} className={className} />;
  }

  return null;
};

export default Icon;