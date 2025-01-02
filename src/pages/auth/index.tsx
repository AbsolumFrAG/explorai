import {
  faBug,
  faCircleInfo,
  faClockRotateLeft,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { AccountSection, Link } from "../../types/SidebarTypes";
import AccountBug from "./account/AccountBug";
import AccountHelp from "./account/AccountHelp";
import Sidebar from "./account/AccountSidebar";
import AccountSubscription from "./account/AccountSubscription";
import History from "./account/History";

const links: Link[] = [
  {
    title: "Historique",
    state: "history",
    icon: <FontAwesomeIcon icon={faClockRotateLeft} />,
  },
  {
    title: "Plans",
    state: "subscription",
    icon: <FontAwesomeIcon icon={faMoneyBillWave} />,
  },
  {
    title: "Bugs",
    state: "bug",
    icon: <FontAwesomeIcon icon={faBug} />,
  },
  {
    title: "Aide",
    state: "help",
    icon: <FontAwesomeIcon icon={faCircleInfo} />,
  },
];

const Account: React.FC = () => {
  const [accountSection, setAccountSection] =
    useState<AccountSection>("history");

  const { user, logout } = UserAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  };

  const renderSection = () => {
    switch (accountSection) {
      case "history":
        return <History />;
      case "help":
        return <AccountHelp />;
      case "bug":
        return <AccountBug />;
      case "subscription":
        return <AccountSubscription />;
      default:
        return (
          <>
            <h2 className="mb-8 text-5xl font-bold text-gray-800">
              Sélectionnez une section de compte
            </h2>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen gap-4 px-6 pb-20 pt-40 sm:grid sm:grid-cols-4">
      <Sidebar
        links={links}
        setAccountSection={setAccountSection}
        user={user}
        logout={handleLogout}
      />
      <div className="rounded-3xl pt-8 sm:col-span-3 sm:p-6">
        {renderSection()}
      </div>
    </div>
  );
};

export default Account;
