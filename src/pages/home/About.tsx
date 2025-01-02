import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ai from "../../assets/ai.webp";
import map from "../../assets/map.webp";
import passport from "../../assets/passport.webp";
import "../../styles/animations.css";

const About: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNavigation = () => {
    navigate("/planner");
  };

  const about = [
    {
      id: 1,
      title: "home.faq.first-entry-title",
      par: "home.faq.first-entry-description",
      src: map,
      cta: "home.faq.first-entry-button",
      alt: t("A map illustration"),
      bg: "bg-gradient-to-r from-sky-500 to-indigo-500",
    },
    {
      id: 2,
      title: "home.faq.second-entry-title",
      par: "home.faq.second-entry-description",
      src: ai,
      cta: "home.faq.second-entry-button",
      alt: t("An AI chip illustration"),
      bg: "bg-gradient-to-bl from-sky-500 to-indigo-500",
    },
    {
      id: 3,
      title: "home.faq.third-entry-title",
      par: "home.faq.third-entry-description",
      src: passport,
      cta: "home.faq.third-entry-button",
      alt: t("A passport illustration"),
      bg: "bg-gradient-to-br from-sky-500 to-indigo-500",
    },
  ];

  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(to top, rgba(0,0,0,0.1), rgba(245,245,245,0.5),rgba(0,0,0,0)), url('https://img.freepik.com/premium-vector/vector-white-abstract-futuristic-background-with-perspective-infinity-grid-tile-floor-texture_547648-3196.jpg')",
      }}
      className="w-full bg-cover bg-center px-6 pb-40 pt-16"
    >
      <h2 className="mx-auto mb-6 max-w-6xl text-5xl font-extrabold text-gray-800 sm:mb-16">
        {t("home.faq.title")}
      </h2>
      <div className="mx-auto max-w-6xl gap-8">
        {about.map((item, id) => (
          <div
            key={id}
            className="mb-8 flex flex-col justify-between gap-8 lg:flex-row"
          >
            <div className="flex w-full items-center justify-center">
              <img
                className="aspect-square max-h-80"
                src={item.src}
                alt={item.alt}
              />
            </div>
            <div className="mx-auto max-w-xl rounded-3xl bg-white px-8 py-10 shadow-lg backdrop-blur-xl">
              <h3 className="mb-4 text-2xl font-bold text-gray-800 sm:text-3xl">
                {t(item.title)}
              </h3>
              <p className="mb-8 text-justify text-base font-medium leading-7 text-gray-400 sm:text-lg">
                {t(item.par)}
              </p>
              <button
                onClick={handleNavigation}
                className={`${item.bg} w-full rounded-xl px-6 py-4 text-center text-xl font-bold text-white shadow-md transition-transform duration-150 hover:scale-[1.02]`}
              >
                {t(item.cta)}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
