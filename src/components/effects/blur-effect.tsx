import { cn } from "@/lib/utils";

export const BlurEffect = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "absolute md:top-[50%] md:left-[50%] -translate-x-1/2 -translate-y-1/2 bg-active size-[200px] blur-[200px]",
        className
      )}
      {...props}
    />
  );
};
BlurEffect.displayName = "BlurEffect";
