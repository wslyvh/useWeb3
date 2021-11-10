import * as React from "react";
import styles from "./fab.module.scss";
export interface IFabProps {
  className?: string;
}

export default function Fab(
  props: IFabProps &
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
) {
  const { className, ...rest } = props;
  let className_ = `block ${styles.fab}`;
  if (className) className_ += ` ${className}`;

  return (
    <button aria-haspopup="true" className={className_} {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
        className={styles.fabIcon}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  );
}
