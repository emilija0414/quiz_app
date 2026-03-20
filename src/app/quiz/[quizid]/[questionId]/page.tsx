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
import { pushEvent } from "@/utils/analytics";
import { useSkipQuestion } from "@/hooks/useSkipQuestion";
import { useQuizAnswers } from "@/hooks/useQuizAnswers";

interface QuestionPageProps {
  params: {
    quizid: string;
    questionId: string;
  };
}

type QuizKey = keyof typeof quizzes;

export default function QuestionPage({ params }: QuestionPageProps) {
  const router = useRouter();
  const quizKey = params.quizid.toLowerCase() as QuizKey;
  const quiz = quizzes[quizKey];

  const questionIndex = quiz?.questions.findIndex(
    (q) => q.id === params.questionId,
  );
  const question = quiz?.questions?.[questionIndex ?? -1];

  const {
    answers,
    loaded: answersLoaded,
    saveAnswer,
  } = useQuizAnswers(quizKey);

  if (!quiz || questionIndex === undefined || questionIndex === -1 || !question)
    return <div>Quiz or question not found</div>;

  const prevQuestion = getPrevQuestion(quiz.questions, questionIndex, answers);
  const nextQuestion = getNextQuestion(quiz.questions, question.id, answers);

  const isVisible = isQuestionVisible(question, answers);
  const shouldSkip = question.visibleIf && answersLoaded && !isVisible;

  useSkipQuestion(
    quizKey,
    question.id,
    answers,
    quiz.questions,
    router,
    shouldSkip,
  );

  useEffect(() => {
    if (shouldSkip) return;
    pushEvent({ event: "quiz_view", quizId: quizKey, questionId: question.id });
  }, [quizKey, question.id, shouldSkip]);

  const handleAnswer = (value: any) => {
    const updated = saveAnswer(question.id, value);

    pushEvent({
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
      pushEvent({ event: "quiz_submit", quizId: quizKey, answers: updated });
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
          value={currentAnswer}
          onAnswer={handleAnswer}
          buttonColor={quiz.intro?.primaryColor}
        />
      )}
    </main>
  );
}
