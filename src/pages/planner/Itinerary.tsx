import { faArrowRotateLeft, faArrowTurnUp, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useReducer, useState } from "react";
import { activities, budgetOptions, groupOptions } from "../../data/buttonData.ts";
import { useCityAutocomplete } from "../../hooks/useCityAutocomplete.ts";
import { useInputChange } from "../../hooks/useInputChange.ts";
import { useItineraryFormValidation } from "../../hooks/useItineraryFormValidation.ts";
import { useResetForm } from "../../hooks/useResetForm.ts";
import { useSubmitItinerary } from "../../hooks/useSubmitItinerary.ts";
import { ErrorObject } from "../../types/ErrorObject.ts";
import { FormState, ItineraryAction } from "../../types/ItineraryTypes.ts";

const initialState: FormState = {
    destination: "",
    date: "",
    length: "",
    group: "",
    budget: "",
    activity: [],
};

const itineraryReducer = (state: FormState, action: ItineraryAction) => {
    switch (action.type) {
        case "SET_FIELD":
            return { ...state, [action.field]: action.value };
        case "RESET_FORM":
            return { ...initialState };
        case "SET_ITINERARY":
            return { ...state, itinerary: action.itinerary };
        case "TOGGLE_ARRAY_FIELD_ITEM": {
            const arrayField = state[action.field] as string[];
            const valueIndex = arrayField.indexOf(action.value);

            const updatedArray =
                valueIndex >= 0
                    ? arrayField.filter((_, index) => index !== valueIndex)
                    : [...arrayField, action.value];

            return { ...state, [action.field]: updatedArray };
        }
        default:
            return state;
    }
};

const ItineraryPlanner = () => {
    const [state, dispatch] = useReducer<React.Reducer<FormState, ItineraryAction>>(itineraryReducer, initialState);
    const { errors, validate, setErrors } = useItineraryFormValidation();
    const [cityQuery, setCityQuery] = useState("");
    const citySuggestions = useCityAutocomplete(cityQuery);
    const handleSubmit = useSubmitItinerary(state, validate, citySuggestions);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [blurTimeoutId, setBlurTimeoutId] = useState<number | null>(null);

    const { handleInputChange, handleButtonInputChange, handleMultipleChoiceChange } = useInputChange(dispatch, setErrors);

    const resetForm = useResetForm(dispatch, setErrors);

    const handleReset = () => {
        resetForm();
        setCityQuery("");
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCityQuery(e.target.value);
        if (!citySuggestions.find((city) => city.name === e.target.value)) {
            dispatch({ type: "SET_FIELD", field: "destination", value: e.target.value });
        }
    };

    const handleFocus = () => {
        if (blurTimeoutId) {
            clearTimeout(blurTimeoutId);
            setBlurTimeoutId(null);
        }
        setShowSuggestions(true);
    };

    const handleBlur = () => {
        const timeoutId = setTimeout(() => {
            setShowSuggestions(false);
        }, 100) as unknown as number;
        setBlurTimeoutId(timeoutId);
    };

    const handleSelectCity = (cityName: string) => {
        setCityQuery(cityName);
        dispatch({ type: "SET_FIELD", field: "destination", value: cityName });
        setShowSuggestions(false);
        if (blurTimeoutId) {
            clearTimeout(blurTimeoutId);
            setBlurTimeoutId(null);
        }
    };

    function getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    function checkForErrors(errorObject: ErrorObject): boolean {
        for (const key in errorObject) {
            if (errorObject[key]) {
                return true;
            }
        }
        return false;
    }

    const hasErrors = checkForErrors(errors);

    return (
        <>
            <form onSubmit={handleSubmit} className="grid place-items-center space-y-4 border-gray-500 border-opacity-20 bg-white p-8 px-8 shadow-2xl sm:border md:rounded-2xl">
                <h2 className="text-3xl font-bold">Planifiez votre prochain voyage</h2>

                {/*Destination*/}
                <div className="relative w-full py-8">
                    <h4 className="mb-8 text-xl font-bold">
                        Où voudriez-vous aller ?
                        {errors.destination && (
                            <p className="error pl-2 text-lg font-normal text-red-600">
                                <FontAwesomeIcon className="fa-rotate-90 mr-3" icon={faArrowTurnUp} />
                                {errors.destination}
                            </p>
                        )}
                    </h4>
                    <input
                        id="destination"
                        type="text"
                        autoComplete="off"
                        name="destination"
                        value={cityQuery}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleCityChange}
                        placeholder="Entrez un emplacement"
                        className={`${errors.destination ? "border-red-500" : "border-gray-300"} placeholder:font-base mt-2 h-12 w-full rounded-xl border bg-gray-50 px-4 py-2 backdrop-blur-lg placeholder:text-gray-400 focus-within:outline-none`}
                    />
                    {showSuggestions && (
                        <ul className="absolute z-10 mt-1 w-full overflow-hidden rounded-xl border border-gray-300 bg-white shadow-lg">
                            {citySuggestions.map((city, index) => (
                                <li className="cursor-pointer px-6 py-2 hover:bg-gray-100" key={index} onClick={() => handleSelectCity(city.name)}>
                                    {city.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/*Date */}
                <div className="w-full border-t border-t-gray-300 py-8">
                    <h4 className="mb-8 text-xl font-bold">
                        Quand comptez-vous y aller ?
                        {errors.date && (
                            <p className="error pl-2 text-lg font-normal text-red-600">
                                <FontAwesomeIcon className="fa-rotate-90 mr-3" icon={faArrowTurnUp} />
                                {errors.date}
                            </p>
                        )}
                    </h4>
                    <input
                        id="date"
                        type="date"
                        name="date"
                        min={getTodayDate()}
                        max="2099-12-31"
                        value={state.date}
                        onChange={handleInputChange("date")}
                        placeholder="Entrez un emplacement"
                        className={`${errors.destination ? "border-red-500" : "border-gray-300"} placeholder:font-base mt-2 h-12 w-full rounded-xl border bg-gray-50  px-4 py-2 backdrop-blur-lg  placeholder:text-gray-400 focus-within:outline-none`}
                    />
                </div>

                {/*Length*/}
                <div className="w-full border-t border-t-gray-300 py-8">
                    <h4 className="mb-8 text-xl font-bold">
                        Combien de jours comptez-vous rester ? {state.length} {state.length ? (state.length == "1" ? "jour" : "jours") : ""}
                        {errors.length && (
                            <p className="error pl-2 text-lg font-normal text-red-600">
                                <FontAwesomeIcon className="fa-rotate-90 mr-3" icon={faArrowTurnUp} />
                                {errors.length}
                            </p>
                        )}
                    </h4>
                    <input id="length" type="range" min="1" max="5" name="length" value={state.length} onChange={handleInputChange("length")} className="h-10 w-full rounded-full bg-transparent py-2" />
                </div>

                {/*Group Size*/}
                <div className="w-full border-t border-t-gray-300 py-8">
                    <h4 className="mb-8 text-xl font-bold">
                        Combien de personnes voyagent ?
                        {errors.group && (
                            <p className="error pl-2 text-lg font-normal text-red-600">
                                <FontAwesomeIcon className="fa-rotate-90 mr-3" icon={faArrowTurnUp} />
                                {errors.group}
                            </p>
                        )}
                    </h4>
                    <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:grid-cols-3">
                        {groupOptions.map((group) => (
                            <button key={group.value} type="button" onClick={handleButtonInputChange("group", group.value)} className={`button h-28 bg-white text-gray-800 duration-75 ${state.group === group.value ? "border-2 border-gray-800" : "border border-gray-300 hover:border-gray-500"}`}>
                                <div className="space-y-2 text-left">
                                    <FontAwesomeIcon className="text-2xl" icon={group.icon} />
                                    <p className="text-lg text-gray-800">{group.label}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                    <input className="hidden" type="text" name="group" id="group" />
                </div>

                {/*Budget Section*/}
                <div className="w-full border-t border-t-gray-300 py-8">
                    <h4 className="mb-8 text-xl font-bold">
                        Quelle est votre fourchette budgétaire ?{" "}
                        {errors.budget && (
                            <p className="error pl-2 text-lg font-normal text-red-600">
                                <FontAwesomeIcon className="fa-rotate-90 mr-3" icon={faArrowTurnUp} />
                                {errors.budget}
                            </p>
                        )}
                    </h4>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                        {budgetOptions.map((budget) => (
                            <button key={budget.value} type="button" onClick={handleButtonInputChange("budget", budget.value)} className={`button h-32 bg-white duration-75 ${state.budget === budget.value ? "border-2 border-gray-800" : "border border-gray-300 hover:border-gray-500"}`}>
                                <div className="space-y-2 text-left">
                                    <FontAwesomeIcon className="text-2xl" icon={budget.icon} />
                                    <p className="text-lg text-gray-800">{budget.label}</p>
                                    <p className="text-sm font-medium text-gray-500">{budget.range}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                    <input id="budget" value={state.budget} readOnly className="hidden" type="text" name="budget" />
                </div>

                {/*Activities Section*/}
                <div className="w-full border-t border-t-gray-300 py-8">
                    <h4 className="mb-8 text-xl font-bold">
                        Quelles activités vous intéressent ?
                        {errors.activity && (
                            <p className="error pl-2 text-lg font-normal text-red-600">
                                <FontAwesomeIcon className="fa-rotate-90 mr-3" icon={faArrowTurnUp} />
                                {errors.activity}
                            </p>
                        )}
                    </h4>
                    <div className="grid grid-cols-2 grid-rows-3 gap-4 sm:grid-cols-3">
                        {activities.map((activity) => (
                            <button key={activity.value} type="button" onClick={() => handleMultipleChoiceChange("activity", activity.value)} className={`button h-28 bg-white text-gray-800 duration-75 ${state.activity.includes(activity.value) ? "border-2 border-gray-800" : "border border-gray-300 hover:border-gray-500"}`}>
                                <div className="space-y-2 text-left">
                                    <FontAwesomeIcon className="text-2xl" icon={activity.icon} />
                                    <p className="text-lg text-gray-800">{activity.name}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                    <input className="hidden" value={state.activity} readOnly type="text" name="activity" id="activity" />
                </div>

                <div className={`${hasErrors ? "-translate-y-28" : ""} error fixed bottom-0 left-0 w-full overflow-hidden bg-red-600 bg-opacity-80 px-16 py-4 text-white backdrop-blur-2xl transition-transform duration-300`}>
                    <p className="text-lg font-semibold">
                        <FontAwesomeIcon className="mr-2 text-xl" icon={faCircleExclamation} />
                        Entrée invalide : <span className="font-normal">Il manque une entrée dans un ou plusieurs champs</span>
                    </p>
                </div>

                <div className="fixed bottom-0 left-0 flex w-full justify-center border-t border-gray-300 bg-white px-8 py-8 sm:justify-end">
                    <div className="flex flex-row space-x-4 sm:max-w-2xl">
                        <button className="flex h-12 w-12 items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-lg font-semibold text-gray-400 shadow-md" type="button" onClick={handleReset} value="Réinitialiser">
                            <FontAwesomeIcon icon={faArrowRotateLeft} />
                        </button>
                        <button className="rounded-lg border border-blue-600 bg-blue-500 px-4 py-2 text-lg font-semibold text-white shadow-md" type="submit" value="Soumettre">
                            Obtenir l'itinéraire
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default ItineraryPlanner;