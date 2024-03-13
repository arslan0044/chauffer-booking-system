import SidebarComp, { SidebarItem } from "./SidebarComp";
import React from "react";
import {
  LayoutDashboard,
  Home,
  StickyNote,
  Layers,
  Flag,
  Calendar,
  LifeBuoy,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  
  const data = [
    {
      text: "Visit Website",
      icon: <Home size={20} />,
      link: "/",
    },
    {
      text: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      link: "/dashboard",
    },
    {
      text: "Our Fleet",
      icon: <StickyNote size={20} />,
      link: "/dashboard/fleet",
    },
    {
      text: "Calendar",
      icon: <Calendar size={20} />,
      link: "/",
    },
    {
      text: "Tasks",
      icon: <Layers size={20} />,
      link: "/",
    },
    {
      text: "Reporting",
      icon: <Flag size={20} />,
      link: "/",
    },
  ];
  return (
    <div className=" col-span-3">
      <SidebarComp>
        {data.map((i) => (
          <SidebarItem key={i.text} icon={i.icon} text={i.text} link={i.link} />
        ))}
        <hr className="my-3" />
        <SidebarItem icon={<Settings size={20} />} text="Settings" />
        <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
      </SidebarComp>
    </div>
  );
}
