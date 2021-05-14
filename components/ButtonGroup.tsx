import React from "react";
import classNames from "../libs/class-names";

export const ButtonGroup: React.FC<{}> = ({ children }) => {
  return (
    <span className="inline-flex">
      {React.Children.map(children, (button, idx) => {
        if (React.isValidElement(button)) {
          return React.cloneElement(button, {
            className: classNames(
              "inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium",
              idx === 0 && "rounded-l",
              idx === React.Children.count(children) - 1 && "rounded-r",
              idx !== 0 && "-ml-px",
              button.props.disabled
                ? "text-gray-400 bg-gray-100"
                : "text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            ),
          });
        }
      })}
    </span>
  );
};
