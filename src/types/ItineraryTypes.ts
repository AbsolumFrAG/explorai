export interface FormState {
  destination: string;
  date: string;
  length: string;
  group: string;
  budget: string;
  activity: string[];
  itinerary?: string | null;
}

export type ItineraryAction =
  | { type: "SET_FIELD"; field: keyof FormState; value: string }
  | { type: "TOGGLE_ARRAY_FIELD_ITEM"; field: "activity"; value: string }
  | { type: "RESET_FORM" }
  | { type: "SET_ITINERARY"; itinerary: string | null };
