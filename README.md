## About the application

Multi-Brand Quiz App
A simple, multi-brand quiz platform built with Next.js (App Router), TypeScript, and TailwindCSS.
The app supports multiple branded quizzes, dynamic routing per question, and persistent answers across navigation.

## Implemented features

- Multi-brand support: Quizzes for diabeat, msclr, fitmom, and heycys.
- Routing & Navigation:
  -- Each quiz has its own URL /quiz/[quizId].
  -- Each quiz question has its own URL /quiz/[quizId]/[questionId].
  -- Back/Forward browser buttons work correctly between questions.
- Loading screen (/loading) after quiz submission.
- Homepage (/) lists all quizzes with buttons leading to the quiz intro page made purely for the purpose of easier testing at this time.
- Quiz data loaded from local JSON files (mock API).
- Flexible schema allows easy addition of new quizzes or question types.
- Conditional questions support based on previous answers (visibleIf).
- User answers stored in React state and localStorage.
- Navigating back and forth preserves previously selected answers.
- Analytics events using window.dataLayer.push() for quiz views, answers, and submissions.

## Tech stack

Next.js (App Router) – for server & client routing
TypeScript – type-safe development
TailwindCSS – quick and responsive styling

## Getting Started

## Install dependencies

npm install

# or

yarn install

## Run the development server

npm run dev

# or

yarn dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Run tests

npx jest

## Key Technical Decisions

Client-side navigation: Used useRouter from next/navigation in client components for App Router routing.
Homepage as a client component: Dynamically lists all quizzes and routes to the quiz intro page.
State persistence: Answers stored in React state + localStorage for durability across navigation.
Flexible schema: Quiz JSON designed to allow easy addition of new questions, types, or brands.

## What Could Be Added Next

- Progress Bar / Step Indicator to show quiz progress (e.g., Question 3 of 10)
- Quiz Results Page. After submission, show results, scoring, or feedback per question.
- Reset Quiz. A “Restart Quiz” button that clears localStorage and state.
- Responsive Design Tweaks. Ensure layouts work perfectly on mobile, tablet, and desktop.
- Accessibility Improvements. Keyboard navigation, ARIA labels, high contrast support for better inclusivity.
- Integrate more tests: eg. Test navigation between questions and state persistence.
- Mock API / Remote Data. Replace local JSON with a small mock API endpoint to simulate real fetching.
- TypeScript Enhancements. Stronger typing for quiz JSON, questions, and answers for safer scaling.
