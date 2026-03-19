import diabeat from "./diabeat.json";
import msclr from "./msclr.json";
import fitmom from "./fitmom.json";
import heycys from "./fitmom.json";

export const quizzes = {
  diabeat,
  msclr,
  fitmom,
  heycys,
} as const;

export type QuizId = keyof typeof quizzes;
