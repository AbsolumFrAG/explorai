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

const activities = [
    { name: "Plages", icon: faUmbrellaBeach, value: "plages" },
    { name: "Randonnées", icon: faPersonHiking, value: "randonnées" },
    { name: "Culture", icon: faBook, value: "culture" },
    { name: "Sports", icon: faPersonBiking, value: "sports" },
    { name: "Nightlife", icon: faCloudMoon, value: "nightlife" },
    { name: "Nourriture", icon: faBurger, value: "nourriture" },
    { name: "Point de vue", icon: faLandmark, value: "point_de_vue" },
    { name: "Bien-être", icon: faSpa, value: "bien_etre" },
    { name: "Shopping", icon: faBagShopping, value: "shopping" },
];

const budgetOptions = [
    {
        label: "Budget",
        value: "moins de 1000$",
        range: "0 - 1000 USD",
        icon: faCreditCard,
    },
    {
        label: "Medium",
        value: "entre 1000 et 2500$",
        range: "1000 - 2500 USD",
        icon: faCreditCard,
    },
    {
        label: "Luxe",
        value: "au-dessus de 2500$",
        range: "2500+ USD",
        icon: faCreditCard,
    },
];

const groupOptions = [
    {
        label: "Solo",
        value: "loup solitaire",
        icon: faUser,
    },
    {
        label: "Couple",
        value: "couple",
        icon: faUserGroup,
    },
    {
        label: "Amis",
        value: "groupe d'amis",
        icon: faPeopleGroup,
    },
    {
        label: "Famille",
        value: "famille",
        icon: faHouseChimney,
    },
];

export { activities, budgetOptions, groupOptions };
