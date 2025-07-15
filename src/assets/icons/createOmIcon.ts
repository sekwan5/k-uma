/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createLucideIcon } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface OmIconProps {
  size?: number;
  viewBox?: string;
  onClick?: () => void;
}

export const createOmIcon = (
  iconName: string,
  iconNode: any[],
): ForwardRefExoticComponent<RefAttributes<any> | OmIconProps> =>
  createLucideIcon(
    iconName,
    iconNode.map((e, i) => [e[0], { ...e[1], key: i }]),
  );
