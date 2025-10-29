"use client";

import { PlusCircle, XCircleIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

function parseNumber(value: string) {
  if (!value) return 0;
  return (
    parseFloat(
      value
        .replace(/\s/g, "") // supprime les espaces
        .replace(/,/g, ".") // remplace les virgules par des points
    ) || 0
  );
}

export default function PartCalculator() {
  const [total, setTotal] = useState("");
  const [values, setValues] = useState(["", ""]); // 2 champs par défaut

  const totalNumber = parseNumber(total);
  const parsedValues = values.map(parseNumber);
  const sumValues = parsedValues.reduce((a, b) => a + b, 0);

  const handleValueChange = (index: number, val: string) => {
    const newValues = [...values];
    newValues[index] = val;
    setValues(newValues);
  };

  const addField = () => setValues([...values, ""]);
  const removeField = (index: number) =>
    setValues(values.filter((_, i) => i !== index));

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2>🧮 Calculateur de parts (%)</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-[15px]">
          <Label htmlFor="somme">Somme totale : </Label>
          <Input
            id="somme"
            type="text"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            placeholder="ex : 4 000 ou 1,156.00"
            className="w-full p-2 mt-1"
          />
        </div>

        <Label className="mb-2">Valeurs individuelles :</Label>
        {values.map((val, i) => (
          <div key={i} className="flex mb-2.5 gap-2">
            <Input
              type="text"
              value={val}
              onChange={(e) => handleValueChange(i, e.target.value)}
              placeholder={`Valeur #${i + 1}`}
              className="flex-1 p-2"
            />
            <Button onClick={() => removeField(i)} variant="destructive">
              <XCircleIcon />
            </Button>
          </div>
        ))}

        <Button onClick={addField} className="mb-3.5">
          <PlusCircle /> Ajouter un champ
        </Button>

        <Label className="mb-2">Résultats :</Label>
        {totalNumber > 0 ? (
          <ul>
            {parsedValues.map((v, i) => {
              const part = (v / totalNumber) * 100 || 0;
              return (
                <li key={i}>
                  Valeur #{i + 1}: {v.toLocaleString()} →{" "}
                  <strong>{part.toFixed(2)}%</strong>
                </li>
              );
            })}
          </ul>
        ) : (
          <Input
            readOnly
            value="Entrez une somme totale pour voir les résultats"
          />
        )}

        {sumValues > 0 && (
          <p style={{ marginTop: "10px", fontStyle: "italic" }}>
            Somme des valeurs individuelles : {sumValues.toLocaleString()}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
