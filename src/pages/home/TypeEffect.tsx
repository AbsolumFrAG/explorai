import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useRef, FC } from "react";
import { useTranslation } from "react-i18next";

const TypingEffect: FC = () => {
  const { t, i18n } = useTranslation();
  const [displayedText, setDisplayedText] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const stateRef = useRef({
    currentPhraseIndex: 0,
    currentCharIndex: 0,
    isTyping: true,
  });

  useEffect(() => {
    return startTypingEffect();
  }, [i18n.language]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const getPhrase = (index: number) => {
    const phrases = [
      t("home.top-10-bars-in-budapest"),
      t("home.hiking-in-nepal"),
      t("home.best-clubs-in-berlin"),
      t("home.find-local-food"),
      t("home.car-rental-rome"),
    ];
    return phrases[index % phrases.length];
  };

  const startTypingEffect = () => {
    // Reset state
    stateRef.current = {
      currentPhraseIndex: 0,
      currentCharIndex: 0,
      isTyping: true,
    };

    const typeText = () => {
      const state = stateRef.current;
      const currentPhrase = getPhrase(state.currentPhraseIndex);

      if (state.isTyping) {
        // Typing
        setDisplayedText(
          currentPhrase.substring(0, state.currentCharIndex + 1)
        );
        state.currentCharIndex++;

        if (state.currentCharIndex === currentPhrase.length) {
          state.isTyping = false;
          timeoutRef.current = setTimeout(typeText, 1000);
        } else {
          timeoutRef.current = setTimeout(typeText, 100);
        }
      } else {
        // Erasing
        setDisplayedText((prev) => prev.slice(0, -1));
        state.currentCharIndex--;

        if (state.currentCharIndex === 0) {
          state.isTyping = true;
          state.currentPhraseIndex++;
          timeoutRef.current = setTimeout(typeText, 500);
        } else {
          timeoutRef.current = setTimeout(typeText, 50);
        }
      }
    };

    // Start the effect
    timeoutRef.current = setTimeout(typeText, 100);

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  };

  return (
    <div className="flex h-[60px] w-full items-center space-x-6 rounded-full bg-white px-6 py-3">
      <FontAwesomeIcon
        className="text-2xl text-gray-500"
        icon={faMagnifyingGlass}
      />
      <p className="text-xl sm:text-3xl">
        {displayedText}
        <span className="ml-1 text-gray-500">{isVisible ? "|" : ""}</span>
      </p>
    </div>
  );
};

export default TypingEffect;
