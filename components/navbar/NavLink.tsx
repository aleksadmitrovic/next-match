"use client";
import React from "react";
import NextLink from "../NextLink";
import { NavbarItem } from "@heroui/navbar";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  label: string;
};

export default function NavLink({ href, label }: Props) {
  const pathName = usePathname();
  return (
    <NavbarItem isActive={pathName === href} as={NextLink} href={href}>
      {label}
    </NavbarItem>
  );
}
