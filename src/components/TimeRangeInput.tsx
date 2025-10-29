"use client";

import { ChevronDownIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input"; // ShadCN UI
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

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
  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);

  // États séparés pour la date et l'heure
  const [dateStart, setDateStart] = useState<Date | undefined>(
    start ? new Date(start) : undefined
  );
  const [dateEnd, setDateEnd] = useState<Date | undefined>(
    end ? new Date(end) : undefined
  );

  const [timeStart, setTimeStart] = useState(
    start ? new Date(start).toTimeString().slice(0, 5) : ""
  );
  const [timeEnd, setTimeEnd] = useState(
    end ? new Date(end).toTimeString().slice(0, 5) : ""
  );

  const combineDateTime = (date?: Date, time?: string): string => {
    if (!date || !time) return "";
    const [hours, minutes] = time.split(":").map(Number);
    const fullDate = new Date(date);
    fullDate.setHours(hours!);
    fullDate.setMinutes(minutes!);
    fullDate.setSeconds(0);
    return fullDate.toISOString();
  };

  useEffect(() => {
    const combinedStart = combineDateTime(dateStart, timeStart);
    onChange(index, "start", combinedStart);
  }, [dateStart, timeStart]);

  useEffect(() => {
    const combinedEnd = combineDateTime(dateEnd, timeEnd);
    onChange(index, "end", combinedEnd);
  }, [dateEnd, timeEnd]);

  return (
    <div className="flex items-end space-x-2 mb-2">
      {/* Bloc START */}
      <div className="flex gap-4">
        <div className="flex flex-col gap-3">
          <Label className="px-1">Date</Label>
          <Popover open={openStart} onOpenChange={setOpenStart}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-32 justify-between font-normal"
              >
                {dateStart ? dateStart.toLocaleDateString() : "Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={dateStart}
                captionLayout="dropdown"
                onSelect={(date) => {
                  setDateStart(date);
                  setOpenStart(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
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
          <Label className="px-1">Date</Label>
          <Popover open={openEnd} onOpenChange={setOpenEnd}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-32 justify-between font-normal"
              >
                {dateEnd ? dateEnd.toLocaleDateString() : "Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={dateEnd}
                captionLayout="dropdown"
                onSelect={(date) => {
                  setDateEnd(date);
                  setOpenEnd(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
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
