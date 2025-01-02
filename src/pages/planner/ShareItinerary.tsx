import {
  faCheck,
  faCopy,
  faEnvelope,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { ItineraryResponseType } from "../../types/ResponseTypes";
import { createSharedItinerary } from "../../utils/firestoreFunctions";

interface ShareItineraryProps {
  itinerary: ItineraryResponseType;
}

const ShareItinerary: React.FC<ShareItineraryProps> = ({ itinerary }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateShareUrl = async () => {
    try {
      setLoading(true);
      const shareId = await createSharedItinerary(itinerary);
      const baseUrl = window.location.origin;
      return `${baseUrl}/planner/shared/${shareId}`;
    } catch (error) {
      console.error("Erreur lors de la création du lien de partage:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      const shareUrl = await generateShareUrl();
      const shareData = {
        title: `Itinéraire pour ${itinerary.destination.destinationCity}`,
        text: `Découvre mon itinéraire de voyage pour ${itinerary.destination.destinationCity} du ${itinerary.destination.startDate} au ${itinerary.destination.endDate}!`,
        url: shareUrl,
      };

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Erreur lors du partage:", error);
    }
  };

  const copyToClipboard = async () => {
    try {
      const shareUrl = await generateShareUrl();
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Erreur lors de la copie:", error);
    }
  };

  const shareByEmail = async () => {
    try {
      const shareUrl = await generateShareUrl();
      const subject = encodeURIComponent(
        `Itinéraire pour ${itinerary.destination.destinationCity}`
      );
      const body = encodeURIComponent(
        `Découvre mon itinéraire de voyage pour ${itinerary.destination.destinationCity} !\n\n` +
          `Du ${itinerary.destination.startDate} au ${itinerary.destination.endDate}\n\n` +
          `Voir l'itinéraire: ${shareUrl}`
      );
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    } catch (error) {
      console.error("Erreur lors du partage par email:", error);
    }
  };

  return (
    <>
      <button
        onClick={handleShare}
        disabled={loading}
        className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 disabled:opacity-50"
      >
        <FontAwesomeIcon icon={faShare} />
        {loading ? "Chargement..." : "Partager"}
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-xl font-bold">Partager l'itinéraire</h3>

            <div className="space-y-4">
              <button
                onClick={copyToClipboard}
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 p-3 hover:bg-gray-50 disabled:opacity-50"
              >
                <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                {copied ? "Lien copié !" : "Copier le lien"}
              </button>

              <button
                onClick={shareByEmail}
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 p-3 hover:bg-gray-50 disabled:opacity-50"
              >
                <FontAwesomeIcon icon={faEnvelope} />
                Partager par email
              </button>
            </div>

            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-full rounded-lg bg-gray-200 p-2 font-medium hover:bg-gray-300"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ShareItinerary;
