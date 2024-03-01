import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { ItineraryResponseType, ItineraryWithId } from "../types/ResponseTypes";
import { db } from "./firebaseConfig";

export const storeItinerary = async (userId: string, itineraryData: ItineraryResponseType): Promise<void> => {
    try {
        await addDoc(collection(db, "itineraries"), {
            userId,
            ...itineraryData,
            createdAt: new Date(),
        });
        console.log("Document écrit avec succès avec un ID !");
    } catch (error) {
        console.error("Erreur lors de l'écriture de l'itinéraire :", error);
    }
}

export const retrieveItineraries = async (userId: string): Promise<ItineraryWithId[]> => {
    try {
        const q = query(collection(db, "itineraries"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        const itineraries: ItineraryWithId[] = [];
        querySnapshot.forEach((doc) => {
            itineraries.push({
                id: doc.id,
                ...doc.data() as ItineraryResponseType
            });
        });
        return itineraries;
    } catch (error) {
        console.error("Erreur lors de la récupération des itinéraires :", error);
        return [];
    }
};

export const deleteItinerary = async (itineraryId: string) => {
    const itineraryRef = doc(db, "itineraries", itineraryId);
    await deleteDoc(itineraryRef);
};