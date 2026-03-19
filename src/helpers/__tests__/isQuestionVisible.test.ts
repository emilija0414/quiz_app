import { isQuestionVisible } from "../isQuestionVisible";

describe("isQuestionVisible", () => {
  it("returns true if question has no visibleIf condition", () => {
    const question = { id: "q0" };
    const answers = {};
    expect(isQuestionVisible(question, answers)).toBe(true);
  });

  it("returns true if all conditions are met", () => {
    const question = {
      id: "q1",
      visibleIf: [
        { questionId: "q1", equals: "yes" },
        { questionId: "q2", equals: 42 },
      ],
    };
    const answers = {
      q1: "yes",
      q2: 42,
    };
    expect(isQuestionVisible(question, answers)).toBe(true);
  });

  it("returns false if any condition is not met", () => {
    const question = {
      id: "q2",
      visibleIf: [
        { questionId: "q1", equals: "yes" },
        { questionId: "q2", equals: 42 },
      ],
    };
    const answers = {
      q1: "no",
      q2: 42,
    };
    expect(isQuestionVisible(question, answers)).toBe(false);
  });

  it("returns false if answers are missing for condition", () => {
    const question = {
      id: "q3",
      visibleIf: [{ questionId: "q1", equals: "yes" }],
    };
    const answers = {};
    expect(isQuestionVisible(question, answers)).toBe(false);
  });
});
