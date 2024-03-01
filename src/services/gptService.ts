import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const generateItinerary = async (data: { destination: string; date: string; length: string; group: string; budget: string; activity: string }) => {
    if (!data.destination || !data.date || !data.length || !data.group || !data.budget || !data.activity) {
        return null;
    }

    const prompt = `Vous êtes un voyageur et un routard expert qui a vu le monde et connaît les tenants et les aboutissants de chaque destination. Créez un itinéraire de ${data.length} jours pour un voyage de ${data.group} vers ${data.destination} avec un budget de : ${data.budget}, à partir du : ${data.date}. Planifiez 5 programmes pour chaque jour dans la ou les catégories suivantes : ${data.activity}. Renvoyez les données demandées selon les détails spécifiés sous la forme d'un objet json avec le contour/format suivant. Renvoyez uniquement le json demandé et rien d’autre, quoi qu’il arrive ! Assurez-vous également de faire attention aux types. Voici le format :
    {"destination": {"numberOfDays": Number,"destinationCity": String,"destinationCountry": String,"currency": String,"oneDollarInLocalCurrency": Number,"languagesSpoken": Array,"timeThereInUtcFormat": String // eg. UTC + 2,"capitalOfTheCountry": String, "localWeather": String // eg. monsoon or continental or etc, "temperatureRangeThroughTheYear": String,"shortDescription": String // 2-3 sentances, "shortHistory": String // 2-3 sentances,"startDate": String,"endDate": String},"itinerary":[{"day": number, "date": String // eg. dayoftheweek day month, "program": [{"id": Number // continue with the next number on the next day,"programOrPlaceName": String, "timeSpentThere": String, "location": String, coordinateOfEvent: [lng: number // longtitude as 5 decimals, lat: number // latitude as 5 decimals] // array like [lng, lat], "shortDescriptionOfProgram": String // 2-3 sentances}, // ... Repeat for each program]}, // ... Repeat for each day], "estimatedCosts": [{"category": Accommodation, "hostelCostPerNight": Number, "hotelCostPerNight": Number,"luxuryHotelCostPerNight": Number,"airbnbCostPerNight": Number}, {"category": "Transportation","busCost": Number,"taxiCost": Number,"trainCost": Number,"rentalCost": Number},{"category": Food,"streetFoodCost": Number,"budgetRestaurantCost": Number,"fancyRestaurantCost": Number,"traditionalFoodCost": Number}, {"category": Activities, "mainActivityForEachDay": [{"mainActivityName": String,"costOfProgram": Number}, // ... Repeat for each day's main event and cost of program should be in usd]}]}`;

    try {
        const response = await axios.post("https://api.openai.com/v1/chat/completions", {
            model: "gpt-3.5-turbo-0125",
            messages: [{ role: "system", content: "You are a travel planning assistant." }, { role: "user", content: prompt }],
            response_format: { type: "json_object" },
            max_tokens: 4090,
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