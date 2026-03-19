"use client";
import { Question, QuestionType } from "./types";

import Button from "../button";
import OptionCard from "../optionCard";
import InputField from "../inputField";
import { useEffect, useState } from "react";

type Props = {
  question: Question;
  value?: number | string | string[];
  onAnswer: (value: any) => void;
  buttonColor?: string;
};

export default function QuestionRenderer({
  question,
  value,
  onAnswer,
  buttonColor,
}: Props) {
  const [multiSelected, setMultiSelected] = useState<string[]>(
    Array.isArray(value) ? value : [],
  );

  useEffect(() => {
    setMultiSelected(Array.isArray(value) ? value : []);
  }, [value]);

  const [inputValue, setInputValue] = useState<number>();

  return (
    <div className="flex flex-col items-center gap-8 p-10">
      <h2 className="text-4xl font-semibold mb-2 text-center">
        {question.text}
      </h2>

      {question.subtitle && (
        <p className="text-gray-500 mb-4 text-center">{question.subtitle}</p>
      )}

      <div className="w-full max-w-md flex flex-col items-center gap-4">
        {question.type === "single_choice" &&
          question.options?.map((opt) => (
            <OptionCard
              key={opt.value}
              {...opt}
              selected={value === opt.value}
              onClick={onAnswer}
              selectedColor={buttonColor}
            />
          ))}

        {question.type === "multi_choice" && (
          <>
            {question.options?.map((opt) => (
              <OptionCard
                key={opt.value}
                {...opt}
                selected={multiSelected.includes(opt.value)}
                onClick={(val) =>
                  setMultiSelected((prev) =>
                    prev.includes(val)
                      ? prev.filter((v) => v !== val)
                      : [...prev, val],
                  )
                }
                selectedColor={buttonColor}
              />
            ))}

            <div className="w-full mt-4 flex justify-end">
              <Button
                label="Next"
                onClick={() => onAnswer(multiSelected)}
                color={buttonColor}
              />
            </div>
          </>
        )}

        {question.type === "number" && (
          <>
            <InputField
              value={inputValue}
              onChange={(val) => setInputValue(val)}
              placeholder={question.placeholder}
            />

            <Button
              label="Next"
              onClick={() => {
                // Convert to number or null if empty
                const num = inputValue === "" ? null : Number(inputValue);
                onAnswer(num);
              }}
              color={buttonColor}
            />
          </>
        )}

        {question.type === "info" && (
          <div className="w-full flex flex-col items-center gap-4">
            {question.image && (
              <img
                src={question.image}
                className="w-full h-auto rounded-md object-contain"
              />
            )}

            {question.description && (
              <p className="text-gray-700 text-center">
                {question.description}
              </p>
            )}
            {question.note && (
              <p className="text-gray-700 text-center">{question.note}</p>
            )}

            {question.buttons && (
              <div className="mt-4 w-full flex flex-col gap-2">
                {question.buttons.map((btn, i) => (
                  <Button
                    key={btn.id ?? btn.label ?? i}
                    label={btn.label}
                    onClick={() => {
                      onAnswer(btn.action ?? btn.label ?? "next");
                    }}
                    color={buttonColor}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
