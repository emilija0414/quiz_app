export default function Home() {
  return (
    <main className="p-8 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Quick Quiz</h1>
      <a
        href="/quiz/q1"
        className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Start the Quiz
      </a>
    </main>
  );
}
