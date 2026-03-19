"use client";
import { useRouter } from "next/navigation";
import { quizzes, QuizId } from "../../../data/quizzes";

export default function QuizIntro({ params }: { params: { quizid: QuizId } }) {
  const router = useRouter();
  const quiz = quizzes[params.quizid];

  if (!quiz) return <div>Quiz not found</div>;

  const startQuiz = () => {
    const firstQuestion = quiz.questions[0];
    router.push(`/quiz/${params.quizid}/${firstQuestion.id}`);
  };

  return (
    <main className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">{quiz.intro.title}</h1>
      {quiz.intro.image && (
        <img src={quiz.intro.image} alt="" className="mx-auto mb-6" />
      )}
      {quiz.intro.buttons.map((btn, i) => (
        <button
          key={i}
          onClick={startQuiz}
          className="px-6 py-3 bg-black text-white rounded"
        >
          {btn.label}
        </button>
      ))}
    </main>
  );
}
