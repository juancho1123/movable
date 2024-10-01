import { Badge as FlowbiteBadge } from "flowbite-react";
import React from "react";

const badgeVariants = {
  info: {
    color: "gray",
    size: "sm",
    className: "w-fit text-gray-500 font-normal",
  },
  tag: {
    color: "gray",
    size: "sm",
    className: "w-fit text-gray-700",
  },
};

interface BadgeProps extends React.HTMLAttributes<HTMLElement> {
  href?: string;
  variant?: "info" | "tag";
  children: React.ReactNode;
}

const Badge = ({ href, variant = "info", children, ...props }: BadgeProps) => {
  const { color, size, className } =
    badgeVariants[variant] || badgeVariants["info"];

  return (
    <FlowbiteBadge
      color={color}
      size={size}
      href={href || undefined}
      className={className}
      {...props}
    >
      {children}
    </FlowbiteBadge>
  );
};

export default Badge;
