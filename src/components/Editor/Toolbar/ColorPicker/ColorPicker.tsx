import { useState, useRef, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { ColorPickerContainer, ColorButton, PopoverContainer } from "./styles";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const popover = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popover.current && !popover.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <ColorPickerContainer>
      <ColorButton color={color} onClick={() => setIsOpen(!isOpen)} type="button" />

      {isOpen && (
        <PopoverContainer ref={popover}>
          <HexColorPicker color={color} onChange={onChange} />
        </PopoverContainer>
      )}
    </ColorPickerContainer>
  );
};

export default ColorPicker;
