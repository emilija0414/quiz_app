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

  if (!quiz) return <div>Quiz not found</div>;

  const startQuiz = () => {
    try {
      localStorage.removeItem(`quiz-${params.quizid}-answers`);
    } catch {}
    const firstQuestion = quiz.questions[0];
    router.push(`/quiz/${params.quizid}/${firstQuestion.id}`);
  };
  const heroButtons = quiz.intro.buttons.map((btn) => ({
    label: btn.label,
    onClick: startQuiz,
    color: quiz.intro.primaryColor,
  }));

  return (
    <div className="flex flex-col justify-center items-center mx-auto">
      <Header title={quiz.title} color={quiz.intro?.primaryColor} />
      <Hero
        title={quiz.intro.title}
        image={quiz.intro.image}
        buttons={heroButtons}
        color={quiz.intro.primaryColor}
      />
    </div>
  );
}
