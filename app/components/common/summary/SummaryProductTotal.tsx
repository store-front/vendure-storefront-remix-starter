import React from "react";

interface SummaryTotalProps {
  className?: string;
}

const SummaryTotal: React.FC<SummaryTotalProps> = ({ className }) => {
  return (
    <div
      className={`flex items-center justify-between gap-4${className ? ` ${className}` : ""}`}
    >
      <div>Összesen:</div>
      <div>1 995 000 Ft</div>
    </div>
  );
};

export default SummaryTotal;
