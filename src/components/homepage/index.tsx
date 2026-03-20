"use client";
import { quizzes, type QuizId } from "@/data/quizzes";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const quizIds = Object.keys(quizzes) as QuizId[];

  const goToQuiz = (id: QuizId) => {
    router.push(`/quiz/${id}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
      <h1 className="text-3xl font-bold mb-6">Choose a Quiz</h1>
      <p className="text-lg text-gray-600 mb-6">
        This page was made for the convenience of the tester, so you can easily
        access all the quizzes
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        {quizIds.map((id) => (
          <button
            key={id}
            onClick={() => goToQuiz(id)}
            className="px-6 py-3 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            {quizzes[id].title}
          </button>
        ))}
      </div>
    </div>
  );
}
