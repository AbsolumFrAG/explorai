import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { ItineraryResponseType, ItineraryWithId } from "../types/ResponseTypes";
import { db } from "./firebaseConfig";

export const storeItinerary = async (
  userId: string,
  itineraryData: ItineraryResponseType
): Promise<void> => {
  try {
    await addDoc(collection(db, "itineraries"), {
      userId,
      ...itineraryData,
      createdAt: new Date(),
      isShared: false,
    });
    console.log("Document écrit avec succès avec un ID !");
  } catch (error) {
    console.error("Erreur lors de l'écriture de l'itinéraire :", error);
  }
};

export const createSharedItinerary = async (
  itineraryData: ItineraryResponseType,
  userId: string
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "shared_itineraries"), {
      ...itineraryData,
      createdBy: userId,
      createdAt: new Date(),
      shareCount: 0,
    });
    return docRef.id;
  } catch (error) {
    console.error("Erreur lors de la création de l'itinéraire partagé:", error);
    throw error;
  }
};

export const getSharedItinerary = async (
  shareId: string
): Promise<ItineraryResponseType | null> => {
  try {
    const docRef = doc(db, "shared_itineraries", shareId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Mettre à jour le compteur de partages
      const data = docSnap.data() as ItineraryResponseType;
      return data;
    }
    return null;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de l'itinéraire partagé:",
      error
    );
    return null;
  }
};

export const retrieveItineraries = async (
  userId: string
): Promise<ItineraryWithId[]> => {
  try {
    const q = query(
      collection(db, "itineraries"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    const itineraries: ItineraryWithId[] = [];
    querySnapshot.forEach((doc) => {
      itineraries.push({
        id: doc.id,
        ...(doc.data() as ItineraryResponseType),
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
