import { Dispatch, SetStateAction } from "react";

export type OverviewProps = {
  setState: Dispatch<SetStateAction<boolean>>;
  info: DestinationInfo;
};

export type DestinationInfo = {
  shortDescription: string;
  shortHistory: string;
  destinationCity: string;
  startDate: string;
};
