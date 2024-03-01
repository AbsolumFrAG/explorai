import { useCallback, useState } from "react";
import { CitySuggestion } from "../types/CitySuggestion";
import { FormState } from "../types/ItineraryTypes";

export const useItineraryFormValidation = () => {
    const [errors, setErrors] = useState<{ [key: string]: string }>({
        destination: "",
        date: "",
        length: "",
        group: "",
        budget: "",
        activity: "",
    });

    const validate = useCallback((state: FormState, citySuggestions: CitySuggestion[]) => {
        let isValid = true;

        setErrors(prevErrors => {
            const newErrors = { ...prevErrors };

            if (!state.destination) {
                newErrors.destination = "La destination est requise";
                isValid = false;
            }
            if (!state.date) {
                newErrors.date = "Sélectionnez une date de départ";
                isValid = false;
            }
            if (!state.length) {
                newErrors.length = "La durée est requise";
                isValid = false;
            }
            if (!state.group) {
                newErrors.group = "Le nombre de voyageurs est requis";
                isValid = false;
            }
            if (!state.budget) {
                newErrors.budget = "Le budget est requis";
                isValid = false;
            }
            if (state.activity.length === 0) {
                newErrors.activity = "Sélectionnez au moins un type d'activité";
                isValid = false;
            }
            const cityNames = citySuggestions.map(city => city.name);
            if (!cityNames.includes(state.destination)) {
                newErrors.destination = "Veuillez sélectionner une destination valide";
                isValid = false;
            }

            return newErrors;
        });

        return isValid;
    }, []);

    return { errors, validate, setErrors };
};