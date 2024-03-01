import React, { createContext, useContext, useState } from "react";
import { ItineraryContextType, ItineraryProviderProps } from "../types/ItineraryContextTypes";
import { ItineraryResponseType } from "../types/ResponseTypes";

const ItineraryContext = createContext<ItineraryContextType | null>(null);

const useItinerary = () => {
    const context = useContext(ItineraryContext);
    if (!context) {
        throw new Error("useItinerary muse be used within a ItineraryProvider");
    }
    return context;
};

const ItineraryProvider: React.FC<ItineraryProviderProps> = ({ children }) => {
    const [response, setResponse] = useState<ItineraryResponseType | null>(null);
    const [isSaved, setIsSaved] = useState<boolean>(false);

    const updateResponse = (newResponse: ItineraryResponseType | null) => {
        setResponse(newResponse);
    }

    return <ItineraryContext.Provider value={{ response, setResponse: updateResponse, isSaved, setIsSaved }}>{children}</ItineraryContext.Provider>
};

export { ItineraryProvider, useItinerary };
