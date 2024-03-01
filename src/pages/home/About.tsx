import React from "react";
import { useNavigate } from "react-router-dom";
import ai from "../../assets/ai.webp";
import map from "../../assets/map.webp";
import passport from "../../assets/passport.webp";
import "../../styles/animations.css";

const About: React.FC = () => {
    const navigate = useNavigate();

    const handleNaviagtion = () => {
        navigate("/planner");
    };
    const about = [
        {
            id: 1,
            title: "Configurez vos entrées/besoins",
            par: "Saisissez les détails de votre voyage tels que la destination, les dates, le budget et les intérêts. Plus vous êtes précis, plus l'IA peut adapter votre itinéraire à vos préférences.",
            src: map,
            cta: "Commencez votre voyage",
            alt: "Illustration d'une carte",
            bg: "bg-gradient-to-r from-sky-500 to-indigo-500",
        },
        {
            id: 2,
            title: "Attendez les résultats",
            par: "Après avoir soumis vos coordonnées, notre IA travaille pour créer votre itinéraire personnalisé. Cela implique d'analyser un large éventail de données de voyage pour garantir la meilleure correspondance pour votre voyage. Vous serez averti une fois que votre plan personnalisé sera prêt.",
            src: ai,
            cta: "Voyager à travers le monde",
            alt: "Illustration d'une puce IA",
            bg: "bg-gradient-to-bl from-sky-500 to-indigo-500",
        },
        {
            id: 3,
            title: "Explorez votre voyage",
            par: "Révisez et personnalisez l’itinéraire suggéré. Apportez les modifications nécessaires pour répondre à vos besoins, explorez des options supplémentaires et enregistrez le plan final. Préparez-vous à vivre un voyage spécialement adapté à vos besoins.",
            src: passport,
            cta: "Essayez aujourd'hui",
            alt: "Illustration d'un passeport",
            bg: "bg-gradient-to-br from-sky-500 to-indigo-500",
        },
    ];

    return (
        <div style={{ backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.1), rgba(245,245,245,0.5),rgba(0,0,0,0)), url('https://img.freepik.com/premium-vector/vector-white-abstract-futuristic-background-with-perspective-infinity-grid-tile-floor-texture_547648-3196.jpg')" }} className="w-full bg-cover bg-center px-6 pb-40 pt-16">
            <h2 className="mx-auto mb-6 max-w-6xl text-5xl font-extrabold text-gray-800 sm:mb-16 ">Comment utiliser Tripwise ?</h2>
            <div className="mx-auto max-w-6xl gap-8">
                {about.map((item, id) => (
                    <div key={id} className="mb-8 flex flex-col justify-between gap-8 lg:flex-row">
                        <div className="flex w-full items-center justify-center">
                            <img className="aspect-square max-h-80" src={item.src} alt={item.alt} />
                        </div>
                        <div className="mx-auto max-w-xl rounded-3xl  bg-white px-8 py-10 shadow-lg backdrop-blur-xl">
                            <h3 className="mb-4 text-2xl font-bold text-gray-800 sm:text-3xl">{item.title}</h3>
                            <p className="mb-8 text-justify text-base font-medium leading-7 text-gray-400 sm:text-lg">{item.par}</p>
                            <button onClick={handleNaviagtion} className={`${item.bg} w-full rounded-xl px-6 py-4 text-center text-xl font-bold text-white shadow-md transition-transform duration-150 hover:scale-[1.02]`}>
                                {item.cta}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default About;