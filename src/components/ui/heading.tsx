import React from "react";
import { cn } from "@/lib/utils";

type HeadingProps = {
  title?: string;
  text?: string;
  tag?: string;
  underline?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const Heading = ({
  className,
  title,
  text,
  underline,
}: HeadingProps) => {
  return (
    <div
      className={cn(
        "max-w-[50rem] mx-auto mb-12 lg:mb-20 md:text-center",
        className
      )}
    >
      {title && (
        <h2
          className={cn(
            underline &&
              "pb-2 border-b-2 border-active w-fit md:pb-0 md:border-none md:w-full",
            "h2"
          )}
        >
          {title}
        </h2>
      )}
      {text && <p className="body-2 mt-4 text-n-4">{text}</p>}
    </div>
  );
};
