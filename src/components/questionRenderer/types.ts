import { OptionCardProps } from "../optionCard/types";

export type QuestionType = "single_choice" | "multi_choice" | "number" | "info";

export type Question = {
  id: string;
  type: QuestionType;
  text: string;
  subtitle?: string;
  options?: OptionCardProps[];
  buttons?: { id: string; label: string; action: string }[];
};
