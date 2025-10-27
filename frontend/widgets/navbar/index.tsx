import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/shared/components/theme-switch";
import { SearchIcon } from "@/shared/components/icons";
import { navLinks } from "./constants";

export const Navbar = () => {

  return (
    <div className="p-8 flex justify-center">
      <ThemeSwitch />
    </div>
  );
};
