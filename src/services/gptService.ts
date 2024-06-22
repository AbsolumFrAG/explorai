import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const generateItinerary = async (data: {
  destination: string;
  date: string;
  length: string;
  group: string;
  budget: string;
  activity: string;
}) => {
  if (
    !data.destination ||
    !data.date ||
    !data.length ||
    !data.group ||
    !data.budget ||
    !data.activity
  ) {
    return null;
  }

  const prompt = `En tant que voyageur et routard expérimenté ayant exploré de nombreuses destinations, créez un itinéraire de ${data.length} jours pour un voyage de groupe de ${data.group} personnes à destination de ${data.destination}. Le budget est de ${data.budget} euros, avec un départ prévu le ${data.date}. Incluez 5 activités quotidiennes relevant des catégories suivantes : ${data.activity}. Fournissez les informations requises sous forme d'un objet JSON structuré comme suit, en vous concentrant exclusivement sur la réponse JSON demandée, sans ajouter d'informations supplémentaires. Assurez-vous de respecter les types de données et de répondre en français. Voici le format attendu :,
    "destination": {
      "numberOfDays": Number,
      "destinationCity": String,
      "destinationCountry": String,
      "currency": String,
      "oneDollarInLocalCurrency": Number,
      "languagesSpoken": Array,
      "timeThereInUtcFormat": String,
      "capitalOfTheCountry": String,
      "localWeather": String,
      "temperatureRangeThroughTheYear": String,
      "shortDescription": String,
      "shortHistory": String,
      "startDate": String,
      "endDate": String
    },
    "itinerary": [
      {
        "day": Number,
        "date": String,
        "program": [
          {
            "id": Number,
            "programOrPlaceName": String,
            "timeSpentThere": String,
            "location": String,
            "coordinateOfEvent": [lng: Number, lat: Number],
            "shortDescriptionOfProgram": String
          }
        ]
      }
    ],
    "estimatedCosts": [
      {
        "category": 'Commodités',
        "hostelCostPerNight": Number,
        "hotelCostPerNight": Number,
        "luxuryHotelCostPerNight": Number,
        "airbnbCostPerNight": Number
      },
      {
        "category": 'Transports',
        "busCost": Number,
        "taxiCost": Number,
        "trainCost": Number,
        "rentalCost": Number
      },
      {
        "category": 'Nourriture',
        "streetFoodCost": Number,
        "budgetRestaurantCost": Number,
        "fancyRestaurantCost": Number,
        "traditionalFoodCost": Number
      },
      {
        "category": 'Activités',
        "mainActivityForEachDay": [
          {
            "mainActivityName": String,
            "costOfProgram": Number
          }
        ]
      }
    ]
  }
`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "Tu es un assistant en organisation de voyages.",
          },
          { role: "user", content: prompt },
        ],
        response_format: { type: "json_object" },
        max_tokens: 4096,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data.choices[0].message.content);

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
