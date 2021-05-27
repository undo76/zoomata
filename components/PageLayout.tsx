import React, { useState } from "react";
import { MenuNavigation, SidebarMenu } from "./SidebarMenu";
import { MenuIcon } from "@heroicons/react/outline";
import { LogoIcon } from "./LogoIcon";
import Head from "next/head";
import classNames from "../libs/class-names";

const defaultNavigation = [
  { name: "Gallery", href: "/" },
  { name: "Wolfram", href: "/wolfram" },
  {
    name: "Self-replicating",
    href: "/self-replicating",
  },
  {
    name: "Game of life",
    href: "/game-of-life",
  },
  {
    name: "Langton's ant",
    href: "/langton-ant",
  },
];

interface PageLayoutProps {
  title: React.ReactNode;
  actions?: React.ReactNode;
  navigation?: MenuNavigation[];
  mainBackgroundClassName?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  navigation = defaultNavigation,
  title,
  actions,
  mainBackgroundClassName = "bg-gradient-to-b from-gray-200 to-gray-300",
  children,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Zoomata :: {title}</title>
      </Head>
      <div className="h-screen flex overflow-hidden">
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
            <h1 className="flex items-center ml-1 ">
              <LogoIcon className="h-6 w-6 mr-[2px]" aria-hidden="true" />
              <span
                aria-hidden
                className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-purple-500 font-light uppercase"
              >
                oomata
              </span>
              <span className="sr-only">Zoomata</span>
            </h1>
          </div>

          <main
            className={classNames(
              "flex-1 relative z-0 overflow-y-auto focus:outline-none transition-colors duration-1000",
              mainBackgroundClassName
            )}
          >
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
    </>
  );
};
