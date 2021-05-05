import React from "react";

export const Button: React.FC<{ onClick: () => void }> = ({
  onClick,
  children,
}) => {
  return (
    <button
      type="button"
      className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
