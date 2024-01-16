import { Item } from ".";

export interface DropdownProps {
  items: Item[];
  onItemClick: (item: Item) => void;
}
