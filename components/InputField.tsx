import React, { ReactElement } from "react";

export const defaultLabelClassName = "block text-sm font-medium text-gray-700";
export const defaultInputWrapperClassName = "mt-1";
export const defaultInputClassName =
  "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md";

export const InputField: React.FC<{
  label: string;
  name: string;
  id?: string;
  labelClassName?: string;
  inputClassName?: string;
  inputWrapperClassName?: string;
  children: ReactElement;
}> = ({
  label,
  name,
  id = name,
  labelClassName = defaultLabelClassName,
  inputWrapperClassName = defaultInputWrapperClassName,
  children,
}) => {
  const child = React.Children.only(children);
  return (
    <div>
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
      <div className={inputWrapperClassName}>
        {React.cloneElement(child, {
          id,
          name,
          className: child.props.className || defaultInputClassName,
        })}
      </div>
    </div>
  );
};
