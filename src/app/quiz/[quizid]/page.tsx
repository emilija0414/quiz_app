"use client";

"use client";
import { useRouter } from "next/navigation";
import { quizzes, QuizId } from "../../../data/quizzes";
import Hero from "@/components/hero";
import Header from "@/components/header";

interface Props {
  params: {
    quizid: QuizId;
  };
}

export default function QuizIntro({ params }: Props) {
  const router = useRouter();
  const quiz = quizzes[params.quizid];

  if (!quiz)
    return (
      <h1 className="flex justify-center items-center p-10 text-3xl font-bold mb-6">
        Under construction. Quiz answers to be added soon.
      </h1>
    );

  const startQuiz = () => {
    try {
      localStorage.removeItem(`quiz-${params.quizid}-answers`);
    } catch {}
    const firstQuestion = quiz.questions[0];
    router.push(`/quiz/${params.quizid}/${firstQuestion.id}`);
  };
  const heroButtons = quiz.intro.buttons.map((btn, index, arr) => {
    const isSingle = arr.length === 1;
    const isLast = index === arr.length - 1;

    const color =
      isSingle || isLast
        ? quiz.intro.primaryColor
        : "secondaryColor" in quiz.intro
          ? quiz.intro.secondaryColor
          : "#999";
    return {
      label: btn.label,
      onClick: startQuiz,
      color,
    };
  });

  return (
    <main className="flex flex-col justify-center items-center mx-auto">
      <Header title={quiz.title} color={quiz.intro?.primaryColor} />
      <Hero
        title={quiz.intro.title}
        image={quiz.intro.image}
        buttons={heroButtons}
      />
    </main>
  );
}
