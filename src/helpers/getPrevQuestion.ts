import { QuizId, quizzes } from "../data/quizzes";

export function getPrevQuestion(
  questions: (typeof quizzes)[QuizId]["questions"],
  currentIndex: number,
  answers: Record<string, any>,
) {
  for (let i = currentIndex - 1; i >= 0; i--) {
    const q = questions[i];
    if (!q.visibleIf) return q;
    const visible = q.visibleIf.every(
      (cond) => answers[cond.questionId] === cond.equals,
    );
    if (visible) return q;
  }
  return null;
}
