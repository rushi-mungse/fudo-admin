import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";

export const SiteHeader = () => {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-screen border-b border-n-90 backdrop-blur">
      <MainNav />
      <MobileNav />
    </header>
  );
};
