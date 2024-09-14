import { PencilRuler, Shield, Image } from "lucide-react";
import React from "react";

function SideNav({ selectedIndex }) {
  const menuList = [
    {
      id: 0,
      name: "Icon",
      icon: PencilRuler,
    },
    {
      id: 1, 
      name: "Background",
      icon: Image,
    },
    {
      id: 2, 
      name: "Upgrade",
      icon: Shield,
    },
  ];

  const [activeIndex, setActiveIndex] = React.useState(0); // Start at 0 for consistency

  return (
    <div className="border shadow-sm h-screen">
      <div>
        {menuList.map((menu, index) => (
          <h2
            onClick={() => {
              setActiveIndex(index);
              selectedIndex(index);
            }}
            className={`p-3 text-lg px-7 text-gray-500 my-2 cursor-pointer flex items-center gap-2 hover:bg-primary hover:text-white
            ${activeIndex === index ? "bg-primary text-white" : ""}
          `}
            key={index}
          >
            <menu.icon />
            {menu.name}
          </h2>
        ))}
      </div>
    </div>
  );
}

export default SideNav;