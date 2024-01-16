import { Item } from ".";

export interface ChipProps {
  item: Item;
  backspaceClicked: boolean;
  onClick: () => void;
}
