import { faCircleUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import LanguageSelector from "../language/LanguageSelector";

const DesktopNav = () => {
  const { user, loading } = UserAuth();

  const navLoadClass = loading ? "opacity-0" : "";

  return (
    <div className="fixed box-border w-full border-b border-b-slate-800 bg-slate-950 py-4 text-gray-100">
      <div className="m-auto flex max-w-7xl items-center justify-between text-xl font-bold">
        <NavLink className="mr-4" to="/">
          <img
            src="/logo.svg"
            className="h-[58px] rounded-full"
            alt="Logo ExplorAI"
          />
        </NavLink>
        <NavLink
          to="/"
          className="transition-color rounded-full px-8 py-[14px] duration-150 hover:text-cyan-400"
        >
          Accueil
        </NavLink>
        <NavLink
          to="/planner"
          className="transition-color rounded-full px-8 py-[14px] duration-150 hover:text-cyan-400"
        >
          Planifier un voyage
        </NavLink>
        <NavLink
          to="/blog"
          className="transition-color rounded-full px-8 py-[14px] duration-150 hover:text-cyan-400"
        >
          Blog
        </NavLink>
        <Link
          target="_blank"
          to="https://tripwise.canny.io/feature-requests"
          className="transition-color rounded-full px-8 py-[14px] duration-150 hover:text-cyan-400"
        >
          Feedback
        </Link>
        <div className="ml-4 flex items-center gap-4">
          <LanguageSelector />
          {!user ? (
            <NavLink
              to="/sign"
              aria-label="Se connecter ou s'inscrire !"
              className={`flex h-[58px] w-[58px] items-center justify-center rounded-full border-4 border-gray-500 bg-gray-300 text-xl font-bold duration-300 hover:border-blue-500 ${navLoadClass}`}
            >
              <FontAwesomeIcon className="text-gray-500" icon={faUserPlus} />
            </NavLink>
          ) : (
            <NavLink
              to="/account"
              aria-label="Profil"
              className={`group flex w-fit items-center justify-center rounded-full border-4 border-[#264459] bg-[#264459] text-xl font-bold duration-300 hover:border-blue-500 hover:bg-blue-500`}
            >
              <FontAwesomeIcon
                className="text-5xl text-[#fbfcfd]"
                icon={faCircleUser}
              />
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default DesktopNav;
