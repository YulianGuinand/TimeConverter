"use client";

import { CopyCheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import TimePicker from "./ui/time-picker";

function timeToFloat(timeStr: string): number {
  const [hours, minutes, seconds] = timeStr.split(":").map(Number);
  return hours! + minutes! / 60 + seconds! / 3600;
}

export const Converter = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [result, setResult] = useState<string>(
    timeToFloat("00:00:00").toFixed(4)
  );

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <section className="w-screen h-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Time Converter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <TimePicker
            onChange={(value: string) =>
              setResult(
                value.length == 8
                  ? timeToFloat(value).toFixed(4)
                  : "Please Complete The Field"
              )
            }
          />

          <div className="space-y-2">
            <Label htmlFor="result">Converted time (HH:MM:SS)</Label>
            <div className="relative">
              <Input
                value={result ? result : "Please Complete The Field"}
                id="result"
                readOnly
              />

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
        </CardContent>
      </Card>
    </section>
  );
};
