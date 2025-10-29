"use client";

import dayjs from "dayjs";
import { CopyCheckIcon, CopyIcon } from "lucide-react";
import React, { useState } from "react";
import { TimeRangeInput } from "./TimeRangeInput";
import { Button } from "./ui/button"; // ShadCN UI
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface TimeRange {
  start: string;
  end: string;
}

export const TimeCalculator: React.FC = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [ranges, setRanges] = useState<TimeRange[]>([{ start: "", end: "" }]);

  const handleChange = (
    index: number,
    field: "start" | "end",
    value: string
  ) => {
    setRanges((prev) => {
      const newRanges = [...prev];

      if (newRanges[index]) {
        newRanges[index][field] = value;
      }

      return newRanges;
    });
  };

  const handleAddRange = () => {
    setRanges([...ranges, { start: "", end: "" }]);
  };

  const handleRemoveRange = (index: number) => {
    setRanges(ranges.filter((_, i) => i !== index));
  };

  const calculateTotalHours = () => {
    let total = 0;
    ranges.forEach(({ start, end }) => {
      if (start && end) {
        const diff = dayjs(end).diff(dayjs(start), "minute");
        total += diff / 60;
      }
    });
    return total.toFixed(1);
  };

  const handleCopy = () => {
    if (calculateTotalHours()) {
      navigator.clipboard.writeText(calculateTotalHours());
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <Card className="p-4 max-w-5xl mx-auto">
      {ranges.map((range, index) => (
        <TimeRangeInput
          key={index}
          index={index}
          start={range.start}
          end={range.end}
          onChange={handleChange}
          onRemove={handleRemoveRange}
        />
      ))}

      <Button className="my-2" onClick={handleAddRange}>
        Add a time slot
      </Button>

      <div className="mt-4 space-y-2">
        <Label htmlFor="total">Total hours :</Label>
        <div className="relative">
          <Input readOnly id="total" value={calculateTotalHours()} />
          {isCopied ? (
            <CopyCheckIcon className="absolute inset-y-0 top-1/2 -translate-y-1/2 right-3 size-3 flex items-center" />
          ) : (
            <CopyIcon
              onClick={handleCopy}
              className="absolute inset-y-0 top-1/2 -translate-y-1/2 right-3 size-3 flex items-center cursor-pointer"
            />
          )}
        </div>
      </div>
    </Card>
  );
};
