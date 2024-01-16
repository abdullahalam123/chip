import { ChipProps } from "@/types/chip";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";

export const Chip = ({ item, backspaceClicked, onClick }: ChipProps) => (
  <div
    className={`inline-flex items-center ${
      backspaceClicked ? "border-2 border-blue-500" : ""
    } bg-gray-200 ml-2 rounded-full`}
    onClick={onClick}
  >
    <Image
      className="rounded-full"
      src={item.image}
      width={42}
      height={42}
      alt={item.name}
    />
    <div className="px-3 py-1 flex justify-center items-center">
      <span className="text-[#5f6368] ">{item.name}</span>
      <span className="text-[#5f6368] cursor-pointer ml-1">
        <RxCross2 size="1.5rem" />
      </span>
    </div>
  </div>
);
