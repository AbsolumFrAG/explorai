import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const generateItinerary = async (data: { destination: string; date: string; length: string; group: string; budget: string; activity: string }) => {
    if (!data.destination || !data.date || !data.length || !data.group || !data.budget || !data.activity) {
        return null;
    }

    const prompt = `Vous êtes un voyageur et un routard expert qui a vu le monde et connaît les tenants et les aboutissants de chaque destination. Créez un itinéraire de ${data.length} jours pour un voyage de ${data.group} vers ${data.destination} avec un budget de : ${data.budget}, à partir du : ${data.date}. Planifiez 5 programmes pour chaque jour dans la ou les catégories suivantes : ${data.activity}. Renvoyez les données demandées selon les détails spécifiés sous la forme d'un objet json avec le contour/format suivant. Renvoyez uniquement le json demandé et rien d’autre, quoi qu’il arrive ! Assurez-vous également de faire attention aux types et de répondre en français. Voici le format :
    {"destination": {"numberOfDays": Number,"destinationCity": String,"destinationCountry": String,"currency": String,"oneDollarInLocalCurrency": Number,"languagesSpoken": Array,"timeThereInUtcFormat": String // eg. UTC + 2,"capitalOfTheCountry": String, "localWeather": String // eg. mousson ou continental ou etc, "temperatureRangeThroughTheYear": String,"shortDescription": String // 2-3 phrases, "shortHistory": String // 2-3 phrases,"startDate": String,"endDate": String},"itinerary":[{"day": number, "date": String // ex. dayoftheweek day month, "program": [{"id": Number // continuer avec le numéro suivant le jour suivant,"programOrPlaceName": String, "timeSpentThere": String, "location": String, coordinateOfEvent: [lng: number // longtitude en 5 décimales, lat: number // latitude en 5 décimales] // array en [lng, lat], "shortDescriptionOfProgram": String // 2-3 phrases}, // ... Répéter pour chaque programme]}, // ... Répéter pour chaque jour], "estimatedCosts": [{"category": Accommodation, "hostelCostPerNight": Number, "hotelCostPerNight": Number,"luxuryHotelCostPerNight": Number,"airbnbCostPerNight": Number}, {"category": "Transportation","busCost": Number,"taxiCost": Number,"trainCost": Number,"rentalCost": Number},{"category": Food,"streetFoodCost": Number,"budgetRestaurantCost": Number,"fancyRestaurantCost": Number,"traditionalFoodCost": Number}, {"category": Activities, "mainActivityForEachDay": [{"mainActivityName": String,"costOfProgram": Number}, // ... La répétition de l'événement principal de chaque jour et le coût du programme doivent être exprimés en euros]}]}`;

    try {
        const response = await axios.post("https://api.openai.com/v1/chat/completions", {
            model: "gpt-3.5-turbo-0125",
            messages: [{ role: "system", content: "Tu es un assistant en organisation de voyages." }, { role: "user", content: prompt }],
            response_format: { type: "json_object" },
            max_tokens: 16385,
        }, {
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
            },
        });

        const contentString = response.data.choices[0].message.content;

        if (typeof contentString === "string") {
            const parsedContent = JSON.parse(contentString);
            return parsedContent;
        } else {
            return contentString;
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error("Error calling OpenAI API:", error.message);
            if (error.response) {
                console.error(error.response.data);
            }
        } else {
            console.error("An unexpected error occurred:", error);
        }
        return null;
    }
};