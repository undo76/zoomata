import React from "react";
import classNames from "../libs/class-names";

const iconClassName = "sm:-ml-0.5 sm:mr-2 h-4 w-4";

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    icon?: React.FC<JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>>;
  }
> = ({ children, icon, ...props }) => {
  const Icon: any = icon;
  return (
    <button
      type="button"
      className={classNames(
        props.disabled
          ? "inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-400 bg-gray-100"
          : "inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      )}
      {...props}
    >
      {icon && <Icon className={iconClassName} aria-hidden="true" />}
      {children}
    </button>
  );
};
