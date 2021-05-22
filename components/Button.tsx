import React, { useEffect } from "react";
import classNames from "../libs/class-names";
import { useAnimated } from "../libs/use-animated";

const iconClassName = "sm:-ml-0.5 sm:mr-2 h-4 w-4";

const buttonClassName =
  "inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded ";
const disabledClassName = `text-gray-400 bg-gray-100`;
const enabledClassName =
  "text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    onClick: () => void;
    icon?: React.FC<JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>>;
    repeatDelay?: number;
  }
> = ({ children, icon, onClick, repeatDelay = 200, ...props }) => {
  const Icon = icon!;
  const [, setRepeating] = useAnimated(onClick, repeatDelay, false);
  useEffect(() => {
    if (props.disabled) setRepeating(false);
  }, [props.disabled]);

  return (
    <button
      type="button"
      className={classNames(
        buttonClassName,
        props.disabled ? disabledClassName : enabledClassName
      )}
      onClick={onClick}
      onMouseDown={() => setRepeating(true)}
      onMouseUp={() => setRepeating(false)}
      onMouseLeave={() => setRepeating(false)}
      {...props}
    >
      {icon && <Icon className={iconClassName} aria-hidden="true" />}
      {children}
    </button>
  );
};
