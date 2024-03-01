import React from "react";
import { useNavigate } from "react-router-dom";

const CtaSection: React.FC = () => {
    const navigate = useNavigate();

    const goPlan = () => {
        navigate("/planner");
    };

    return (
        <div className="border border-t-gray-300 bg-white px-6 pb-28 pt-16">
            <div className="mx-auto flex h-96 max-w-6xl flex-col items-center justify-evenly rounded-3xl bg-gradient-to-br from-sky-500 to-indigo-500 p-4 text-white sm:p-0">
                <h2 className="max-w-2xl text-center text-2xl font-bold leading-snug sm:max-w-3xl sm:text-4xl">Commencez votre aventure sans tracas avec Tripwise AI, votre guide gratuit pour planifier votre voyage sans effort.</h2>
                <button onClick={goPlan} className="rounded-2xl bg-gradient-to-b from-sky-400 to-sky-500 px-8 py-4 text-2xl font-semibold shadow-lg transition-transform duration-150 ease-in-out hover:scale-[1.02] sm:text-3xl">
                    Faites-en l'expérience maintenant
                </button>
            </div>
        </div>
    );
};

export default CtaSection;