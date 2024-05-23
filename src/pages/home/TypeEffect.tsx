import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

const searchPhrases = ["Top 10 bars dans Budapest", "Randonnées au Népal", "Les meilleurs clubs de Berlin", "Où trouver de la nourriture locale ?", "Location de voiture à Rome"];

const TypingEffect: React.FC = () => {
    const [displayedText, setDisplayedText] = useState("");
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible((prev) => !prev);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let currentPhraseIndex = 0;
        let currentCharIndex = 0;
        let isTyping = true;

        const typeText = () => {
            setTimeout(
                () => {
                    if (isTyping) {
                        const currentPhrase = searchPhrases[currentPhraseIndex];
                        setDisplayedText(currentPhrase.substring(0, currentCharIndex + 1));
                        currentCharIndex++;

                        if (currentCharIndex === currentPhrase.length) {
                            isTyping = false;
                            setTimeout(typeText, 1000);
                        } else {
                            typeText();
                        }
                    } else {
                        setDisplayedText((prev) => prev.slice(0, -1));
                        currentCharIndex--;

                        if (currentCharIndex === 0) {
                            isTyping = true;
                            currentPhraseIndex = (currentPhraseIndex + 1) % searchPhrases.length;
                            setTimeout(typeText, 500);
                        } else {
                            typeText();
                        }
                    }
                },
                isTyping ? 100 : 50
            );
        };

        typeText();

        return () => {
            isTyping = false;
        };
    }, []);

    return (
        <>
            <div className="flex h-[60px] w-full items-center space-x-6 rounded-full bg-white px-6 py-3">
                <FontAwesomeIcon className="text-2xl text-gray-500" icon={faMagnifyingGlass} />
                <p className="text-xl sm:text-3xl">
                    {displayedText}
                    <span className="ml-1 text-gray-500">{isVisible ? "|" : ""}</span>
                </p>
            </div>
        </>
    );
};

export default TypingEffect;