import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/ui/Loading";
import { useItinerary } from "../../context/ItineraryContext";
import { getSharedItinerary } from "../../utils/firestoreFunctions";

const SharedItinerary: FC = () => {
  const { shareId } = useParams<{ shareId: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setResponse } = useItinerary();

  useEffect(() => {
    const loadSharedItinerary = async () => {
      try {
        if (!shareId) {
          setError("ID de partage manquant");
          setLoading(false);
          return;
        }

        const sharedItinerary = await getSharedItinerary(shareId);

        if (sharedItinerary) {
          setResponse(sharedItinerary);
          navigate("/planner");
        } else {
          setError("Itinéraire non trouvé");
        }
      } catch (error) {
        console.error(
          "Erreur lors du chargement de l'itinéraire partagé:",
          error
        );
        setError("Une erreur est survenue lors du chargement de l'itinéraire");
      } finally {
        setLoading(false);
      }
    };

    loadSharedItinerary();
  }, [shareId, navigate, setResponse]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-lg bg-white p-8 text-center shadow-lg">
          <h2 className="mb-4 text-xl font-bold text-red-500">{error}</h2>
          <button
            onClick={() => navigate("/")}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default SharedItinerary;
