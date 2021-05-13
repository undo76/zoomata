import React, { ReactElement } from "react";

export const InputField: React.FC<{
  label: string;
  name: string;
  id?: string;
  children: ReactElement;
}> = ({ label, name, id = name, children }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 w-20">
        {React.Children.map(children, (child: ReactElement) =>
          React.cloneElement(child, {
            id,
            name: id,
            className:
              "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md",
          })
        )}
      </div>
    </div>
  );
};
