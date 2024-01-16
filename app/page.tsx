"use client";

import Image from "next/image";
import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { RxCross2 } from "react-icons/rx";
interface Item {
  id: number;
  name: string;
  email: string;
  image: string;
}

export default function Test() {
  const allItems: Item[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@gmail.com",
      image: "https://bit.ly/dan-abramov",
    },
    {
      id: 2,
      name: "Joseph Doe",
      email: "jane.doe@gmail.com",
      image: "https://bit.ly/kent-c-dodds",
    },
    {
      id: 3,
      name: "Harris Smith",
      email: "alice.smith@gmail.com",
      image: "https://bit.ly/ryan-florence",
    },
    {
      id: 4,
      name: "Bob Johnson",
      email: "bob.johnson@gmail.com",
      image: "https://bit.ly/prosper-baba",
    },
    {
      id: 5,
      name: "Charlie Brown",
      email: "charlie.brown@gmail.com",
      image: "https://bit.ly/code-beast",
    },
    {
      id: 6,
      name: "David Wilson",
      email: "david.wilson@gmail.com",
      image: "https://bit.ly/sage-adebayo",
    },
  ];

  const [inputValue, setInputValue] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<Item[]>([]); // items in the
  const [availableItems, setAvailableItems] = useState<Item[]>(allItems); // items that can be selected
  const [backspaceClicked, setBackspaceClicked] = useState<boolean>(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredItems = availableItems.filter((item) =>
    item?.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setBackspaceClicked(false); // Reset backspaceClicked when input changes
  };

  const handleItemClick = (item: Item) => {
    setSelectedItems([...selectedItems, item]);
    setAvailableItems(
      availableItems.filter((availableItem) => availableItem?.id !== item.id)
    );
    setInputValue("");
    setBackspaceClicked(false);
    setIsDropdownVisible(false);
  };

  const handleChipClose = (item: Item) => {
    setSelectedItems(
      selectedItems.filter((selectedItem) => selectedItem.id !== item.id)
    );
    setAvailableItems([...availableItems, item]);
  };

  const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && inputValue === "") {
      if (backspaceClicked) {
        // Remove the last selected item
        const lastSelectedItem = selectedItems[selectedItems.length - 1];
        setSelectedItems(selectedItems.slice(0, -1));
        setAvailableItems([...availableItems, lastSelectedItem]);
        setBackspaceClicked(false);
      } else {
        // Highlight the last selected item with a blue border
        setBackspaceClicked(true);
      }
    }
  };

  const handleInputClick = () => {
    setIsDropdownVisible(true);
  };

  const handleFocusClick = () => {
    setIsDropdownVisible(true);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputOutsideClick = () => {
    setTimeout(() => {
      setIsDropdownVisible(false);
      setBackspaceClicked(false);
    }, 500);
  };

  useEffect(() => {
    // Focus the input element when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <main className="flex justify-center items-center flex-col h-screen w-screen gap-5">
      <div
        onClick={handleFocusClick}
        className="flex w-[37.5rem] border-solid pb-2 border-b-2 border-blue-500 cursor-pointer
      "
      >
        {/* Chip */}
        <div>
          {selectedItems.map((item, index) => (
            <div
              key={index}
              className={`inline-flex items-center ${
                backspaceClicked && index === selectedItems.length - 1
                  ? "border-2 border-blue-500"
                  : ""
              } bg-gray-200 ml-2 rounded-full`}
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
                <span
                  className="text-[#5f6368] cursor-pointer ml-1"
                  onClick={() => handleChipClose(item)}
                >
                  <RxCross2 size="1.5rem" />
                </span>
              </div>
            </div>
          ))}

          <input
            ref={inputRef}
            onKeyDown={handleBackspace}
            onClick={handleInputClick}
            onBlur={handleInputOutsideClick}
            value={inputValue}
            onChange={handleInputChange}
            type="text"
            placeholder="Add new user"
            required
            className="ml-3 w-[7.5rem] bg-transparent text-black focus:outline-none"
          />
        </div>
      </div>

      {/* Dropdown */}
      {isDropdownVisible && filteredItems.length > 0 && (
        <div className="w-[37.5rem] max-h-[21.875rem] border-2 overflow-y-scroll shadow-lg">
          {filteredItems.map((item, index) => (
            <div
              className="hover:bg-[#e1e1e1] h-10 flex flex-center gap-4 items-center p-8 cursor-pointer"
              key={index}
              onClick={() => handleItemClick(item)}
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
      )}
    </main>
  );
}
