import { faCreditCard } from "@fortawesome/free-regular-svg-icons";
import {
  faBagShopping,
  faBook,
  faBurger,
  faCloudMoon,
  faHouseChimney,
  faLandmark,
  faPeopleGroup,
  faPersonBiking,
  faPersonHiking,
  faSpa,
  faUmbrellaBeach,
  faUser,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { TFunction } from "i18next";

const getActivities = (t: TFunction) => [
  { name: t("planner.beach"), icon: faUmbrellaBeach, value: "beach" },
  { name: t("planner.hiking"), icon: faPersonHiking, value: "hiking" },
  { name: t("planner.culture"), icon: faBook, value: "culture" },
  { name: t("planner.sports"), icon: faPersonBiking, value: "sports" },
  { name: t("planner.nightlife"), icon: faCloudMoon, value: "nightlife" },
  { name: t("planner.food"), icon: faBurger, value: "food" },
  {
    name: t("planner.point-of-view"),
    icon: faLandmark,
    value: "point_of_view",
  },
  { name: t("planner.well-being"), icon: faSpa, value: "well_being" },
  { name: t("planner.shopping"), icon: faBagShopping, value: "shopping" },
];

const getBudgetOptions = (t: TFunction) => [
  {
    label: t("planner.budget.low"),
    value: t("planner.budget.low-value"),
    range: "0 - 1000 EUR",
    icon: faCreditCard,
  },
  {
    label: t("planner.budget.medium"),
    value: t("planner.budget.medium-value"),
    range: "1000 - 2500 EUR",
    icon: faCreditCard,
  },
  {
    label: t("planner.budget.high"),
    value: t("planner.budget.high-value"),
    range: "2500+ EUR",
    icon: faCreditCard,
  },
];

const getGroupOptions = (t: TFunction) => [
  {
    label: t("planner.solo"),
    value: t("planner.solo-value"),
    icon: faUser,
  },
  {
    label: t("planner.couple"),
    value: t("planner.couple-value"),
    icon: faUserGroup,
  },
  {
    label: t("planner.friends"),
    value: t("planner.friends-value"),
    icon: faPeopleGroup,
  },
  {
    label: t("planner.family"),
    value: t("planner.family-value"),
    icon: faHouseChimney,
  },
];

export { getActivities, getBudgetOptions, getGroupOptions };
