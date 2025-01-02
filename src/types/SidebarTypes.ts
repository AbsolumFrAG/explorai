import { User } from "firebase/auth";
import { ReactElement } from "react";

export type AccountSection =
  | "history"
  | "help"
  | "details"
  | "bug"
  | "subscription";

export type Link = {
  title: string;
  state: AccountSection;
  icon: ReactElement;
};

export type SidebarProps = {
  links: Link[];
  setAccountSection: (section: AccountSection) => void;
  user: User | null;
  logout: () => void;
};
