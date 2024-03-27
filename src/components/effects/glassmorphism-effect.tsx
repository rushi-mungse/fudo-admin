import { cn } from "@/lib/utils";

export const GlassmorphismEffect = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "p-4 bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl",
        className
      )}
      {...props}
    />
  );
};
