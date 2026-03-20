"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { quizzes, QuizId } from "../../../../data/quizzes";
import QuestionRenderer from "@/components/questionRenderer";
import { Question } from "@/components/questionRenderer/types";
import Header from "@/components/header";
import { getPrevQuestion } from "@/helpers/getPrevQuestion";
import { getNextQuestion } from "@/helpers/getNextQuestion";
import { isQuestionVisible } from "@/helpers/isQuestionVisible";

interface QuestionPageProps {
  params: {
    quizid: QuizId;
    questionId: string;
  };
}

export default function QuestionPage({ params }: QuestionPageProps) {
  const router = useRouter();
  const quizKey = params.quizid.toLowerCase() as QuizId;
  const quiz = quizzes[quizKey];

  const questionIndex = quiz?.questions.findIndex(
    (q) => q.id === params.questionId,
  );
  const question = quiz?.questions?.[questionIndex ?? -1];

  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [answersLoaded, setAnswersLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(`quiz-${quizKey}-answers`);
    if (stored) setAnswers(JSON.parse(stored));
    setAnswersLoaded(true);
  }, [quizKey]);

  if (!quiz || questionIndex === undefined || questionIndex === -1 || !question)
    return <div>Quiz or question not found</div>;

  const prevQuestion = getPrevQuestion(quiz.questions, questionIndex, answers);
  const nextQuestion = getNextQuestion(quiz.questions, question.id, answers);

  const isVisible = isQuestionVisible(question, answers);
  const shouldSkip = question.visibleIf && answersLoaded && !isVisible;

  useEffect(() => {
    if (!shouldSkip) return;
    const next = getNextQuestion(quiz.questions, question.id, answers);
    if (next) {
      router.replace(`/quiz/${quizKey}/${next.id}`);
    } else {
      router.replace(`/quiz/${quizKey}/loading`);
    }
  }, [shouldSkip, quizKey, question?.id, answers, router, quiz?.questions]);

  useEffect(() => {
    if (shouldSkip) return;
    if (!window.dataLayer) window.dataLayer = [];
    window.dataLayer.push({
      event: "quiz_view",
      quizId: quizKey,
      questionId: question.id,
    });
  }, [quizKey, question?.id, shouldSkip]);

  const handleAnswer = (value: any) => {
    const updated = { ...answers, [question.id]: value };
    setAnswers(updated);
    localStorage.setItem(`quiz-${quizKey}-answers`, JSON.stringify(updated));

    if (!window.dataLayer) window.dataLayer = [];
    window.dataLayer.push({
      event: "quiz_answer",
      quizId: quizKey,
      questionId: question.id,
      answer: value,
    });

    const next = getNextQuestion(quiz.questions, question.id, updated);
    if (next) {
      router.push(`/quiz/${quizKey}/${next.id}`);
    } else {
      router.push(`/quiz/${quizKey}/loading`);
      window.dataLayer.push({
        event: "quiz_submit",
        quizId: quizKey,
        answers: updated,
      });
    }
  };

  const currentAnswer = answers[question.id];

  const isAnswered =
    currentAnswer != null &&
    !(typeof currentAnswer === "string" && currentAnswer.trim() === "") &&
    !(Array.isArray(currentAnswer) && currentAnswer.length === 0);

  return (
    <main className="flex flex-col justify-center items-center mx-auto">
      <Header
        title={quiz.title}
        backUrl={
          prevQuestion
            ? `/quiz/${quizKey}/${prevQuestion.id}`
            : `/quiz/${quizKey}`
        }
        nextUrl={
          nextQuestion ? `/quiz/${quizKey}/${nextQuestion.id}` : undefined
        }
        color={quiz.intro?.primaryColor}
        nextDisabled={!isAnswered}
      />

      {shouldSkip ? (
        <div className="py-8 text-center text-gray-600">Skipping question…</div>
      ) : (
        <QuestionRenderer
          question={question as Question}
          value={answers[question.id]}
          onAnswer={handleAnswer}
          buttonColor={quiz.intro?.primaryColor}
        />
      )}
    </main>
  );
}
