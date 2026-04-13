import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["pl", "uk", "en"],
  defaultLocale: "pl",
  localePrefix: "as-needed", // Polish (default) has no /pl/ prefix
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
