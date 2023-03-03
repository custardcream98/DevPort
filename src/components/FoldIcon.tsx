import type { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"svg"> & {
  stroke: string;
  title?: string;
  lineWidth?: number;
};

const FoldIcon = ({ stroke, title, lineWidth, ...props }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke={stroke}
      {...props}
    >
      {title && <title>{title}</title>}
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width={lineWidth ?? 2}
        d="M5 15l7-7 7 7"
      ></path>
    </svg>
  );
};

export default FoldIcon;
