interface TPropType {
  text: string;
}

export const TextBorder = ({ text = "Or" }: TPropType) => {
  return (
    <div className="flex items-center justify-center my-4">
      <hr className="hidden sm:block border border-neutral-600 h-[0.1px] w-[150px]" />
      <span className="px-3 py-1 rounded-full text-dark/80 border border-dark/20 text-sm">
        {text}
      </span>
      <hr className="hidden sm:block border border-neutral-600 sm:h-[0.1px] sm:w-[150px]" />
    </div>
  );
};
