import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Smile } from "lucide-react";
import { iconList } from "./constants/icons";
import { icons } from "lucide-react";
import axios from "axios";

const BASE_URL = "https://logoexpress.tubeguruji.com";

function IconList({ selectedIcon }) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [pngIconList, setPngIconList] = useState([]);
  const storageValue = JSON.parse(localStorage.getItem("value")) || {};
  const [icon, setIcon] = useState(storageValue ? storageValue.icon : "Smile");

  useEffect(() => {
    getPngIcons();
  }, []);
  const Icon = ({ name, color, size, rotate }) => {
    const LucidIcon = icons[name];
    if (!LucidIcon) {
      return null;
    }
    return <LucidIcon color={color} size={size} />;
  };

  const getPngIcons = () => {
    axios.get(BASE_URL+'/getIcons.php').then((response) => {
      console.log(response.data);
      setPngIconList(response.data);
    });
  };
  return (
    <div>
      <div>
        <label>Icon</label>
        <div
          onClick={() => setOpenDialog(true)}
          className="p-3 cursor-pointer bg-gray-200 rounded-md w-[50px] h-[50px] my-2 flex items-center justify-center"
        >
        {icon?.includes('.png') ? <img src={BASE_URL+'/png/'+icon} alt="icon" /> :
          <Icon name={icon} color={"#000"} size={20} />}
        </div>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pick Your Favourite Icon</DialogTitle>
            <DialogDescription>
              <Tabs defaultValue="account" className="w-[400px]">
                <TabsList>
                  <TabsTrigger value="icon">Icons</TabsTrigger>
                  <TabsTrigger value="color-icon">Color Icons</TabsTrigger>
                </TabsList>
                <TabsContent value="icon">
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-auto h-[400px] p-6">
                    {iconList.map((icon, index) => (
                      <div
                        className="p-3 cursor-pointer bg-gray-200 rounded-md w-[50px] h-[50px] my-2 flex items-center justify-center"
                        key={index}
                        onClick={() => {
                          selectedIcon(icon);
                          setIcon(icon);
                          setOpenDialog(false);
                        }}
                      >
                        <Icon name={icon} color={"#000"} size={20} />
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="color-icon">
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-auto h-[400px] p-6">
                    {pngIconList.map((icon, index) => (
                      <div
                        className="p-3 cursor-pointer bg-gray-200 rounded-md w-[50px] h-[50px] my-2 flex items-center justify-center"
                        key={index}
                        onClick={() => {
                          selectedIcon(icon);
                          setIcon(icon);
                          setOpenDialog(false);
                        }}
                      >
                        <img src={BASE_URL+"/png/"+icon} />
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default IconList;