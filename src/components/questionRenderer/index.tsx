"use client";
import { Question, QuestionType } from "./types";

import Button from "../button";
import OptionCard from "../optionCard";
import InputField from "../inputField";

type Props = {
  question: Question;
  value?: string | string[];
  onAnswer: (value: any) => void;
};

export default function QuestionRenderer({ question, value, onAnswer }: Props) {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-2">{question.text}</h2>
      {question.subtitle && (
        <p className="text-gray-500 mb-4">{question.subtitle}</p>
      )}

      {question.type === "single_choice" &&
        question.options?.map((opt) => (
          <OptionCard
            key={opt.value}
            {...opt}
            selected={value === opt.value}
            onClick={onAnswer}
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
            />
          );
        })}

      {question.type === "number" && (
        <InputField
          value={value as string}
          onChange={onAnswer}
          placeholder="Enter value"
        />
      )}

      {question.type === "info" && question.buttons && (
        <div className="mt-4">
          {question.buttons.map((btn) => (
            <Button
              key={btn.id}
              label={btn.label}
              onClick={() => onAnswer("next")}
            />
          ))}
        </div>
      )}
    </div>
  );
}
