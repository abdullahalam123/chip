"use client";

import React, { useState, useEffect, ChangeEvent, useRef } from "react";

export default function Home() {
  const allItems = [
    "Biru Shai",
    "Biru Shok",
    "Shika Nara",
    "Shika Nara Miri Naru Patra",
    "Holio",
    "Miranda",
    "Koro",
    "Naro",
    "Milop",
    "Sunita",
    "Lori",
  ];

  const [inputValue, setInputValue] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]); // items in the
  const [availableItems, setAvailableItems] = useState<string[]>(allItems); // items that can be selected
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredItems = availableItems.filter((item) =>
    item.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleItemClick = (item: string) => {
    setSelectedItems([...selectedItems, item]);
    setAvailableItems(
      availableItems.filter((availableItem) => availableItem !== item)
    );
    setInputValue("");
  };

  const handleChipClose = (item: string) => {
    setSelectedItems(
      selectedItems.filter((selectedItem) => selectedItem !== item)
    );
    setAvailableItems([...availableItems, item]);
  };

  const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Backspace" &&
      inputValue === "" &&
      selectedItems.length > 0
    ) {
      const lastSelectedItem = selectedItems[selectedItems.length - 1];
      setSelectedItems(selectedItems.slice(0, -1));
      setAvailableItems([...availableItems, lastSelectedItem]);
    }
  };

  useEffect(() => {
    // Focus the input element when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <main className="flex justify-center items-center flex-col h-screen w-screen gap-5">
      <div className="flex w-[500px] border-solid  border-b-2 border-blue-500 ">
        {/* Chip */}
        <div>
          {selectedItems.map((item, index) => (
            <div
              key={index}
              className="inline-flex items-center bg-gray-200 rounded-full px-3 py-1 m-1"
            >
              <span className="text-[#5f6368]">{item}</span>
              <span
                className="text-[#5f6368] cursor-pointer ml-2"
                onClick={() => handleChipClose(item)}
              >
                X
              </span>
            </div>
          ))}

          <input
            onKeyDown={handleBackspace}
            value={inputValue}
            onChange={handleInputChange}
            type="text"
            placeholder="Add new user"
            required
            className="w-[120px] appearance-none border-none bg-transparent text-black focus:outline-none"
          />
        </div>
      </div>

      {/* Dropdown */}
      <div className="w-[500px]  border-solid text-red-800">
        {filteredItems.map((item, index) => (
          <div key={index} onClick={() => handleItemClick(item)}>
            {item}
          </div>
        ))}
      </div>
    </main>
  );
}
