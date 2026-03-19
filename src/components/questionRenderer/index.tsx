"use client";
import { Question, QuestionType } from "./types";

import Button from "../button";
import OptionCard from "../optionCard";
import InputField from "../inputField";

type Props = {
  question: Question;
  value?: string | string[];
  onAnswer: (value: any) => void;
  buttonColor?: string;
};

export default function QuestionRenderer({
  question,
  value,
  onAnswer,
  buttonColor,
}: Props) {
  return (
    <div className="flex flex-col items-center gap-8">
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

        {question.type === "multi_choice" &&
          question.options?.map((opt) => {
            const selectedArray = Array.isArray(value) ? value : [];
            return (
              <OptionCard
                key={opt.value}
                {...opt}
                selected={selectedArray.includes(opt.value)}
                onClick={(val) => {
                  let updated = [...selectedArray];
                  if (updated.includes(val))
                    updated = updated.filter((v) => v !== val);
                  else updated.push(val);
                  onAnswer(updated);
                }}
                selectedColor={buttonColor}
              />
            );
          })}

        {question.type === "number" && (
          <InputField value={value as string} onChange={onAnswer} />
        )}

        {question.type === "info" && question.buttons && (
          <div className="mt-4 flex flex-col gap-2">
            {question.buttons.map((btn) => (
              <Button
                key={btn.id}
                label={btn.label}
                onClick={() => onAnswer("next")}
                color={buttonColor}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
