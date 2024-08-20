import React from "react";

type CardProps = {
    title : string,
    amount : number,
    icon : (() => JSX.Element)
}

export default function Card({title, amount, icon}: CardProps) {
  return (
    <div className="w-[330px] flex flex-row justify-between gap-x-[1px] pl-[10px] pr-[12px] items-center min-h-[56px] bg-[#f9f9f9] dark:bg-[#1c1c25] rounded-xl">
      <div className="p-3 space-y-2">
        <div className="text-sm">{title}</div>
        <div className="font-bold text-2xl">${amount}</div>
      </div>

      <div className="-mt-8">
       {icon()}
      </div>
    </div>
  );
}
