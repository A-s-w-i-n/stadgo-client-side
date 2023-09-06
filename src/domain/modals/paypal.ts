import { stadim } from "./stadium";
export interface paypalProps {
  stadium: stadim;
  handleAddStadium: () => Promise<void>;
}
