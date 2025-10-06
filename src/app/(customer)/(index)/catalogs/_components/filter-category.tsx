import React from "react";

export default function FilterCategory() {
  return (
    <div className="flex flex-col gap-[14px]">
      <p className="font-semibold leading-[22px]">Category</p>
      <label className="font-semibold flex items-center gap-3">
        <input
          type="checkbox"
          name="loc"
          className="w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-md checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]"
        />
        <span>Smartphone</span>
      </label>
      <label className="font-semibold flex items-center gap-3">
        <input
          type="checkbox"
          name="loc"
          className="w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-md checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]"
        />
        <span>Laptop</span>
      </label>
      <label className="font-semibold flex items-center gap-3">
        <input
          type="checkbox"
          name="loc"
          className="w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-md checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]"
        />
        <span>Fashion</span>
      </label>
      <label className="font-semibold flex items-center gap-3">
        <input
          type="checkbox"
          name="loc"
          className="w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-md checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]"
        />
        <span>Accessories</span>
      </label>
    </div>
  );
}
