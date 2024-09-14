import React, { useContext, useEffect, useState } from "react";
import { UpdateStorageContext } from "../context/UpdateStorageContext";
import { icons } from "lucide-react";
import html2canvas from "html2canvas";

const BASE_URL = "https://logoexpress.tubeguruji.com";

function LogoPreview({ downloadIcon, setDownloadIcon }) {
  const [storageValue, setStorageValue] = useState({});
  const { updateStorage } = useContext(UpdateStorageContext);

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem("value")) || {};
    setStorageValue(storageData);
  }, [updateStorage]);

  useEffect(() => {
    if (downloadIcon) {
      downloadPngLogo();
      setDownloadIcon(false); // Reset after download
    }
  }, [downloadIcon, setDownloadIcon]);

  const downloadPngLogo = () => {
    const downloadLogoDiv = document.getElementById("downloadLogoDiv"); // Correct selector
    html2canvas(downloadLogoDiv, { backgroundColor: null }).then((canvas) => {
      const pngImage = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngImage;
      downloadLink.download = "logo.png";
      downloadLink.click();
    });
  };

  const Icon = ({ name, color, size, rotate }) => {
    const LucidIcon = icons[name];
    if (!LucidIcon) {
      return;
    }
    return (
      <LucidIcon
        color={color}
        size={size}
        style={{
          transform: `rotate(${rotate}deg)`,
        }}
      />
    );
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="h-[500px] w-[500px] bg-gray-200 outline-dotted outline-gray-300"
        style={{
          padding: `${storageValue?.bgPadding}px`,
        }}
      >
        <div
          id="downloadLogoDiv" // Correct ID for selector
          className="h-full w-full flex items-center justify-center"
          style={{
            borderRadius: `${storageValue?.bgRounded}px`,
            background: storageValue?.bgColor,
          }}
        >
        {storageValue?.icon?.includes('.png') ? <img src={'/png/'+storageValue?.icon}
        style={
          {
            height: `${storageValue?.iconSize}px`,
            width: `${storageValue?.iconSize}px`,
            transform: `rotate(${storageValue?.iconRotate}deg)`,
          }
        }
         alt="icon" /> :<Icon
            name={storageValue?.icon}
            color={storageValue?.iconColor}
            size={storageValue?.iconSize}
            rotate={storageValue?.iconRotate}
          />}
          
        </div>
      </div>
    </div>
  );
}

export default LogoPreview;
