"use client";
import { usePathname } from "next/navigation";
import VideoBanner from "./VideoBanner";

//Функція яка дозволяє показувати банер тільки на головній сторінці

export default function ConditionalBanner() {
  const pathname = usePathname();

  if (pathname !== "/") return null;

  return <VideoBanner />;
}
