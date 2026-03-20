import { useEffect } from "react";
import { Question } from "../helpers/isQuestionVisible";
import { getNextQuestion } from "../helpers/getNextQuestion";

export function useSkipQuestion(
  quizKey: string,
  questionId: string,
  answers: Record<string, any>,
  questions: Question[],
  router: any,
  shouldSkip?: boolean,
) {
  useEffect(() => {
    if (!shouldSkip) return;
    const next = getNextQuestion(questions, questionId, answers);
    if (next) router.replace(`/quiz/${quizKey}/${next.id}`);
    else router.replace(`/quiz/${quizKey}/loading`);
  }, [shouldSkip, quizKey, questionId, answers, questions, router]);
}
