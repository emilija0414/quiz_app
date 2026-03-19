export interface VisibleIfCondition {
  questionId: string;
  equals: any;
}

export interface Question {
  id: string;
  visibleIf?: VisibleIfCondition[];
}

export function isQuestionVisible(
  question: Question,
  answers: Record<string, any>,
): boolean {
  if (!question.visibleIf) return true;
  return question.visibleIf.every(
    (cond) => answers[cond.questionId] === cond.equals,
  );
}
