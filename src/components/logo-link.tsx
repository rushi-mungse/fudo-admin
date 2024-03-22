import Link from "next/link";
import { LogoIcon } from "@/icons/logo";
import { cn } from "@/lib/utils";

interface LogoLinkProps {
  className?: string;
}

export const LogoLink = ({ className }: LogoLinkProps) => {
  return (
    <Link href="/" className={cn("flex items-center space-x-1", className)}>
      <LogoIcon className="size-12 text-active" />
    </Link>
  );
};
