import { QuizId, quizzes } from "../data/quizzes";

export function getNextQuestion(
  questions: (typeof quizzes)[QuizId]["questions"],
  currentId: string,
  answers: Record<string, any>,
) {
  const currentIndex = questions.findIndex((q) => q.id === currentId);
  for (let i = currentIndex + 1; i < questions.length; i++) {
    const q = questions[i];
    if (!q.visibleIf) return q;
    const visible = q.visibleIf.every(
      (cond) => answers[cond.questionId] === cond.equals,
    );
    if (visible) return q;
  }
  return null;
}
