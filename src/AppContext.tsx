import React, { createContext, useState } from "react";

export interface Question {
  id: number;
  type: "text" | "radio" | "checkbox";
  text: string;
  options?: string[];
}

export interface Survey {
  id: number;
  addQuestion: (question: Question) => void;
  questions: Question[];
  addSurvey: (survey: Survey) => void;
  steps: number;
  setSteps: (steps: number) => void;
  survey: Survey[];
}

type Props = {
  children: React.ReactNode;
};

const AppContext = createContext<Survey>({} as Survey);

const AppProvider: React.FC<Props> = ({ children }) => {
  const [survey, setSurvey] = useState<Survey[]>([]);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [steps, setSteps] = useState<number>(1);
  // addQuestion to the lst of questions
  const addQuestion = (question: Question) => {
    setCurrentQuestions((prevQuestions) => [...prevQuestions, question]);
  };

  // add survey
  const addSurvey = (survey: Survey) => {
    setSurvey((prevSurvey) => [...prevSurvey, survey]);
  };

  return (
    <AppContext.Provider
      value={{
        addQuestion,
        addSurvey,
        questions: currentQuestions,
        id: 1,
        steps: steps,
        setSteps: setSteps,
        survey,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
