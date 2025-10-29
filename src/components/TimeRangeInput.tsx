"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input"; // ShadCN UI
import { Label } from "./ui/label";

interface TimeRangeInputProps {
  index: number;
  start: string;
  end: string;
  onChange: (index: number, field: "start" | "end", value: string) => void;
  onRemove: (index: number) => void;
}

export const TimeRangeInput: React.FC<TimeRangeInputProps> = ({
  index,
  start,
  end,
  onChange,
  onRemove,
}) => {
  const [timeStart, setTimeStart] = useState(
    start ? new Date(start).toTimeString().slice(0, 5) : ""
  );
  const [timeEnd, setTimeEnd] = useState(
    end ? new Date(end).toTimeString().slice(0, 5) : ""
  );

  const combineDateTime = (time?: string): string => {
    if (!time) return "";
    const [hours, minutes] = time.split(":").map(Number);
    const fullDate = new Date();
    fullDate.setHours(hours!);
    fullDate.setMinutes(minutes!);
    fullDate.setSeconds(0);
    return fullDate.toISOString();
  };

  useEffect(() => {
    const combinedStart = combineDateTime(timeStart);
    onChange(index, "start", combinedStart);
  }, [timeStart]);

  useEffect(() => {
    const combinedEnd = combineDateTime(timeEnd);
    onChange(index, "end", combinedEnd);
  }, [timeEnd]);

  return (
    <div className="flex items-end space-x-2 mb-2">
      {/* Bloc START */}
      <div className="flex gap-4">
        <div className="flex flex-col gap-3">
          <Label className="px-1">Time</Label>
          <Input
            type="time"
            step="60"
            value={timeStart}
            onChange={(e) => setTimeStart(e.target.value)}
          />
        </div>
      </div>

      <span className="mb-2">→</span>

      {/* Bloc END */}
      <div className="flex gap-4">
        <div className="flex flex-col gap-3">
          <Label className="px-1">Time</Label>
          <Input
            type="time"
            step="60"
            value={timeEnd}
            onChange={(e) => setTimeEnd(e.target.value)}
          />
        </div>
      </div>

      <Button variant="destructive" onClick={() => onRemove(index)}>
        Remove
      </Button>
    </div>
  );
};
