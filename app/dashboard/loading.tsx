import React from "react";
import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-1 items-center justify-center gap-2 text-xs font-semibold">
      <Loader className="animate-spin" />
      در حال بارگزاری
    </div>
  );
};

export default Loading;
