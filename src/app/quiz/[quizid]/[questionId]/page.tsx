"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { quizzes, QuizId } from "../../../../data/quizzes";
import QuestionRenderer from "@/components/questionRenderer";
import { Question } from "@/components/questionRenderer/types";

interface Props {
  params: {
    quizid: QuizId;
    questionId: string;
  };
}

export default function QuestionPage({ params }: Props) {
  const router = useRouter();
  const quizKey = params.quizid.toLowerCase() as QuizId;
  const quiz = quizzes[quizKey];

  const question = quiz?.questions.find((q) => q.id === params.questionId);

  const [answers, setAnswers] = useState<Record<string, any>>({});

  useEffect(() => {
    const stored = localStorage.getItem(`quiz-${quizKey}-answers`);
    if (stored) setAnswers(JSON.parse(stored));
  }, [quizKey]);

  if (!quiz || !question) return <div>Quiz or question not found</div>;

  if (question.visibleIf) {
    const visible = question.visibleIf.every(
      (cond) => answers[cond.questionId] === cond.equals,
    );
    if (!visible) {
      const nextQuestion = getNextQuestion(
        quiz.questions,
        question.id,
        answers,
      );
      if (nextQuestion) router.push(`/quiz/${quizKey}/${nextQuestion.id}`);
      else router.push("/results");
      return null;
    }
  }

  const handleAnswer = (value: any) => {
    const updated = { ...answers, [question.id]: value };
    setAnswers(updated);
    localStorage.setItem(`quiz-${quizKey}-answers`, JSON.stringify(updated));

    const nextQuestion = getNextQuestion(quiz.questions, question.id, updated);
    if (nextQuestion) router.push(`/quiz/${quizKey}/${nextQuestion.id}`);
    else router.push("/results");
  };

  return (
    <main className="p-8">
      <QuestionRenderer
        question={question as Question}
        value={answers[question.id]}
        onAnswer={handleAnswer}
      />
    </main>
  );
}

function getNextQuestion(
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
