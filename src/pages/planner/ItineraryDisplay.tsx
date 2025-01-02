import {
  faCalendarDays,
  faChevronLeft,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { useItinerary } from "../../context/ItineraryContext";
import { fetchCityImage } from "../../services/placesAPI";
import {
  ItineraryDisplayProps,
  ItineraryResponseType,
} from "../../types/ResponseTypes";
import { storeItinerary } from "../../utils/firestoreFunctions";
import CostBreakdown from "./CostBreakdown";
import DayFragment from "./DayFragment";
import General from "./General";
import Overview from "./Overview";
import ShareItinerary from "./ShareItinerary";

const ItineraryDisplay: FC<ItineraryDisplayProps> = ({ response }) => {
  const [isOverview, setIsOverview] = useState<boolean>(true);
  const { setResponse, isSaved, setIsSaved } = useItinerary();
  const [bgImage, setBgImage] = useState("");
  const navigate = useNavigate();
  const { user } = UserAuth();

  useEffect(() => {
    const loadImage = async () => {
      const imageUrl = await fetchCityImage(
        response.destination.destinationCity
      );
      setBgImage(imageUrl);
    };

    loadImage();
  }, [response]);

  const isMultipledays = () => {
    return response.destination.numberOfDays > 1 ? "jours" : "jour";
  };

  const handleNewTrip = () => {
    if (response) {
      setResponse(null);
      setIsSaved(false);
    }
  };

  const saveItinerary = async (response: ItineraryResponseType) => {
    if (user && response && !isSaved) {
      try {
        await storeItinerary(user.uid, response);
        setIsSaved(true);
      } catch (error) {
        console.error("Error storing itinerary: ", error);
        setIsSaved(false);
      }
    }
  };

  useEffect(() => {
    if (response && user) {
      saveItinerary(response);
    }
  }, [response, user]);

  const goBack = () => {
    navigate(-1);
    setResponse(null);
    setIsSaved(false);
  };

  return (
    <>
      <div className="no-scrollbar fixed left-0 top-0 z-20 h-screen w-screen overflow-scroll border-r border-gray-300 bg-white md:w-[60vw]">
        <div
          style={{
            backgroundImage: `linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0)), url(${bgImage})`,
          }}
          className="relative flex h-72 flex-col justify-between bg-cover bg-center px-4 py-4"
        >
          <div className="py-3">
            <button
              onClick={goBack}
              className="text-lg font-semibold tracking-wide text-white underline"
            >
              <FontAwesomeIcon
                className="mr-2 text-base"
                icon={faChevronLeft}
              />
              Retour
            </button>
          </div>
          <div className="absolute right-5 top-5 flex space-x-2">
            <ShareItinerary itinerary={response} />
            <button className="button text-white" onClick={handleNewTrip}>
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Nouveau voyage
            </button>
          </div>
          <button
            className="button absolute right-5 top-5 text-white"
            onClick={handleNewTrip}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Nouveau voyage
          </button>
          <div>
            <h1 className="text-3xl font-bold leading-loose tracking-wide text-white">
              {response.destination.numberOfDays} {isMultipledays()} voyage vers{" "}
              {response.destination.destinationCity},{" "}
              {response.destination.destinationCountry}
            </h1>
            <div className="flex items-center">
              <FontAwesomeIcon
                className="mr-4 text-white"
                icon={faCalendarDays}
              />
              <h2 className="text-lg font-semibold text-white">
                {response.destination.startDate} -{" "}
                {response.destination.endDate}
              </h2>
            </div>
          </div>
        </div>
        <div id="info" className="border-y border-gray-300">
          {isOverview && (
            <Overview info={response.destination} setState={setIsOverview} />
          )}
          {!isOverview && (
            <General stats={response.destination} setState={setIsOverview} />
          )}
        </div>
        <div className="px-8 pt-8">
          <h2 className="text-3xl font-black text-gray-800">Itinéraire</h2>
          {response &&
            response.itinerary.map((days) => (
              <DayFragment key={days.day} itinerary={days} />
            ))}
        </div>
        <div id="cost" className="p-8">
          <CostBreakdown estimatedCosts={response.estimatedCosts} />
        </div>
      </div>
    </>
  );
};

export default ItineraryDisplay;
