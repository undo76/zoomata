import React, { useState } from "react";
import { MenuNavigation, SidebarMenu } from "./SidebarMenu";
import {
  FolderIcon,
  HomeIcon,
  MenuIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import { Button } from "./Button";
import { LogoIcon } from "./LogoIcon";

const defaultNavigation = [
  { name: "Gallery", href: "/", icon: HomeIcon, current: true },
  { name: "Wolfram", href: "/wolfram", icon: HomeIcon, current: false },
  {
    name: "Self-reproducing",
    href: "/self-reproducing",
    icon: UsersIcon,
    current: false,
  },
  {
    name: "Game of life",
    href: "/game-of-life",
    icon: FolderIcon,
    current: false,
  },
];

interface PageLayoutProps {
  title: React.ReactNode;
  actions?: React.ReactNode;
  navigation?: MenuNavigation[];
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  navigation = defaultNavigation,
  title,
  actions,
  children,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100 ">
      <SidebarMenu
        navigation={navigation}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="flex items-center md:hidden pl-1 py-1 sm:px-3 sm:py-3 bg-gray-800">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <h1 className="flex items-center ml-1 text-3xl text-yellow-300 font-light uppercase">
            <LogoIcon className="h-6 w-6 mr-[2px]" aria-hidden="true" />
            <span aria-hidden>oomata</span>
            <span className="sr-only">Zoomata</span>
          </h1>
        </div>

        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none bg-gradient-to-r from-[#fcd34d] to-[#f97316]">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="flex justify-between">
                <h2 className="text-2xl font-light uppercase text-gray-700">
                  {title}
                </h2>
                <div className="ml-4">{actions}</div>
              </div>
              <div className="py-4">{children}</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
