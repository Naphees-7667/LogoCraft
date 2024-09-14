import React, { useContext, useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import ColorPickerController from "./ColorPickerController";
import { UpdateStorageContext } from "../context/UpdateStorageContext";

function BackgroundController() {
  const storageValue = JSON.parse(localStorage.getItem("value")) || {};
  const [rounded, setRounded] = useState(storageValue.bgRounded || 0);
  const [padding, setPadding] = useState(storageValue.bgPadding || 40); // Default padding to 40
  const [color, setColor] = useState(storageValue.bgColor || "#000");
  const { updateStorage, setUpdateStorage } = useContext(UpdateStorageContext);

  useEffect(() => {
    const updatedValue = {
      ...storageValue, // Keep the existing icon values first
      bgRounded: rounded,
      bgPadding: padding,
      bgColor: color,
    };
    setUpdateStorage(updatedValue);
    localStorage.setItem("value", JSON.stringify(updatedValue));
  }, [rounded, padding, color]); // Update on changes to these values

  return (
    <div>
      <div className="py-2">
        <label className="p-2 flex justify-between items-center">
          Rounded <span>{rounded} px</span>
        </label>
        <Slider
          defaultValue={[rounded]}
          max={512}
          step={1}
          onValueChange={(event) => setRounded(event[0])}
        />
      </div>

      <div className="py-2">
        <label className="p-2 flex justify-between items-center">
          Padding <span>{padding} px</span>
        </label>
        <Slider
          defaultValue={[padding]}
          max={100}
          step={1}
          onValueChange={(event) => setPadding(event[0])}
        />
      </div>

      <div className="py-2">
        <label className="p-2 flex justify-between items-center">
          Background Color
        </label>
        <ColorPickerController
          hideController={false}
          selectedColor={(color) => setColor(color)}
        />
      </div>
    </div>
  );
}

export default BackgroundController;