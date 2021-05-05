import React from "react";

export const InputField: React.FC<{ label: string; id: string }> = ({
  label,
  id = label,
  children,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 w-20">{children}</div>
    </div>
  );
};
