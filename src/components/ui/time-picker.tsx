"use client";

import { Clock8Icon } from "lucide-react";
import { useState } from "react";
import { Input } from "./input";
import { Label } from "./label";

const TimePicker = ({ onChange }: { onChange: (value: string) => void }) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    val = val.replace(/\D/g, "");

    let hours = "";
    let minutes = "";
    let seconds = "";

    if (val.length <= 2) {
      hours = val;
    } else if (val.length <= 4) {
      hours = val.slice(0, 2);
      minutes = val.slice(2);
    } else {
      hours = val.slice(0, 2);
      minutes = val.slice(2, 4);
      seconds = val.slice(4, 6);
    }

    if (minutes.length === 2) {
      minutes = Math.min(parseInt(minutes, 10), 59).toString().padStart(2, "0");
    }
    if (seconds.length === 2) {
      seconds = Math.min(parseInt(seconds, 10), 59).toString().padStart(2, "0");
    }

    let formatted = hours;
    if (minutes) formatted += ":" + minutes;
    if (seconds) formatted += ":" + seconds;

    setValue(formatted);
    onChange(formatted);
  };

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="timepicker">Pick your time (HH:MM:SS)</Label>
      <div className="relative">
        <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
          <Clock8Icon className="size-4" />
          <span className="sr-only">User</span>
        </div>
        <Input
          type="text"
          id="timepicker"
          value={value}
          onChange={handleChange}
          placeholder="HH:MM:SS"
          className="peer bg-background appearance-none pl-9 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  );
};

export default TimePicker;
