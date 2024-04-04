import React from "react";

interface ServeCardPorps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const ServeCard = ({ icon, title, description }: ServeCardPorps) => {
  return (
    <div className="flex items-center justify-center w-full flex-col border border-n-4 rounded-lg py-6 px-5 h-full">
      {icon}
      <h3 className="h5 text-n-9 py-2">{title}</h3>
      <p className="text-n-4 text-center">{description}</p>
    </div>
  );
};
