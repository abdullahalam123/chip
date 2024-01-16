import { DropdownProps } from "@/types";
import Image from "next/image";

export const Dropdown = ({ items, onItemClick }: DropdownProps) => {
  return (
    <div className="sm:w-[full] md:w-[full] lg:w-[37.5rem]  max-h-[21.875rem] border-2 overflow-y-scroll shadow-lg">
      {items.map((item, index) => (
        <div
          key={index}
          className="hover:bg-[#e1e1e1] h-10 flex flex-center gap-4 items-center p-8 cursor-pointer"
          onClick={() => onItemClick(item)}
        >
          <div className="flex gap-2 justify-center items-center">
            <Image
              className="border-2 rounded-full"
              src={item.image}
              width="42"
              height="42"
              alt={item.name}
            />
            <span className="font-semibold">{item.name}</span>
          </div>
          <span className="text-gray-500">{item.email}</span>
        </div>
      ))}
    </div>
  );
};
