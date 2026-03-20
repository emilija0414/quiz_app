import { OptionCardProps } from "../optionCard/types";

export type QuestionType = "single_choice" | "multi_choice" | "number" | "info";

export type Question = {
  id: string;
  type: QuestionType;
  text: string;
  subtitle?: string;
  description?: string;
  note?: string;
  image?: string;
  options?: OptionCardProps[];
  placeholder?: string;
  buttons?: { id: string; label: string; action: string }[];
};

export type QuestionRendererProps = {
  question: Question;
  value?: number | string | string[];
  onAnswer: (value: any) => void;
  buttonColor?: string;
};
