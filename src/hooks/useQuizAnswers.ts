import { useState, useEffect } from "react";

export function useQuizAnswers(quizKey: string) {
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(`quiz-${quizKey}-answers`);
    if (stored) setAnswers(JSON.parse(stored));
    setLoaded(true);
  }, [quizKey]);

  const saveAnswer = (questionId: string, value: any) => {
    const updated = { ...answers, [questionId]: value };
    setAnswers(updated);
    localStorage.setItem(`quiz-${quizKey}-answers`, JSON.stringify(updated));
    return updated;
  };

  return { answers, loaded, saveAnswer };
}
