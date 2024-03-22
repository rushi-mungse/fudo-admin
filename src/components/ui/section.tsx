import { cn } from "@/lib/utils";

type SectionProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const Section = ({ className, children }: SectionProps) => {
  return (
    <div className={cn("relative py-5 md:py-10 lg:py-16 xl:py-20", className)}>
      {children}
    </div>
  );
};
