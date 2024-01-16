"use client";

import { Chip, Dropdown, Input } from "@/components";
import { items } from "@/constants";
import { Item } from "@/types";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";

export default function Test() {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [availableItems, setAvailableItems] = useState<Item[]>(items);
  const [backspaceClicked, setBackspaceClicked] = useState<boolean>(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const focusRef = useRef<HTMLInputElement>(null);

  const filteredItems = availableItems.filter((item) =>
    item?.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setBackspaceClicked(false);
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
        const lastSelectedItem = selectedItems[selectedItems.length - 1];
        setSelectedItems(selectedItems.slice(0, -1));
        setAvailableItems([...availableItems, lastSelectedItem]);
        setBackspaceClicked(false);
      } else {
        setBackspaceClicked(true);
      }
    }
  };

  const handleInputClick = () => {
    setIsDropdownVisible(true);
  };

  const handleFocusClick = () => {
    setIsDropdownVisible(true);

    if (focusRef.current) {
      focusRef.current.focus();
    }
  };

  const handleInputOutsideClick = () => {
    setTimeout(() => {
      setIsDropdownVisible(false);
      setBackspaceClicked(false);
    }, 500);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <main className="flex justify-center items-center flex-col h-screen w-screen gap-5">
      <div
        onClick={handleFocusClick}
        className="flex sm:w-[full] md:w-[full] lg:w-[37.5rem] border-solid pb-2 border-b-2 border-blue-500 cursor-pointer
      "
      >
        <div>
          {selectedItems.map((item, index) => (
            <Chip
              key={index}
              item={item}
              backspaceClicked={
                backspaceClicked && index === selectedItems.length - 1
              }
              onClick={() => handleChipClose(item)}
            />
          ))}

          <Input
            inputRef={focusRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleBackspace}
            onClick={handleInputClick}
            onBlur={handleInputOutsideClick}
            placeholder="Add new user"
          />
        </div>
      </div>

      {isDropdownVisible && filteredItems.length > 0 && (
        <Dropdown items={filteredItems} onItemClick={handleItemClick} />
      )}
    </main>
  );
}
