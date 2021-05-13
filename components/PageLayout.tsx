import React, { useState } from "react";
import { MenuNavigation, SidebarMenu } from "./SidebarMenu";
import {
  FolderIcon,
  HomeIcon,
  MenuIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import { LogoIcon } from "./LogoIcon";

const defaultNavigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon, current: true },
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
  title: string;
  navigation?: MenuNavigation[];
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  navigation = defaultNavigation,
  title,
  children,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <SidebarMenu
        navigation={navigation}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="py-4">{children}</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
