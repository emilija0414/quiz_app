import { useState, useEffect } from "react";

export function useQuizAnswers(quizId: string) {
  const storageKey = `quiz-${quizId}-answers`;
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) setAnswers(JSON.parse(stored));
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(answers));
  }, [answers, storageKey]);

  const updateAnswer = (questionId: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  return { answers, updateAnswer };
}
