import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
    const footerLinks = [
        {
            id: 1,
            title: "Politique de confidentialité",
            to: "/",
        },
        {
            id: 2,
            title: "Conditions d'utilisation",
            to: "/",
        },
        {
            id: 3,
            title: "Contact",
            to: "/",
        },
    ];

    return (
        <footer className="bg-gray-900 py-8 text-white">
            <div className="mx-auto max-w-screen-xl px-4 text-center">
                <p className="text-sm font-semibold">© {new Date().getFullYear()} Tripwise AI. All rights reserved.</p>
                <div className="mt-4 flex justify-center space-x-6">
                    {footerLinks.map((link, id) => (
                        <Link key={id} to={link.to} className="text-gray-400 hover:text-gray-300">
                            {link.title}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;