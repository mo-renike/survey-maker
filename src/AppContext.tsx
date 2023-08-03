import React, { createContext, useState } from "react";

export interface Question {
  id: number;
  type: "text" | "radio" | "checkbox";
  text: string;
  options?: string[];
}

export interface Survey {
  id: number;
  questions: Question[];
}

type AppContextData = {
  addQuestion: (question: Question) => void;
  addSurvey: (survey: Survey) => void;
  questions: Question[];
  steps: number;
  setSteps: (steps: number) => void;
  surveys: Survey[];
};

export const AppContext = createContext<AppContextData>({} as AppContextData);

type Props = {
  children: React.ReactNode;
};

const AppProvider: React.FC<Props> = ({ children }) => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [steps, setSteps] = useState<number>(1);

  // addQuestion to the list of questions
  const addQuestion = (question: Question) => {
    setCurrentQuestions((prevQuestions) => [...prevQuestions, question]);
  };

  // add survey
  const addSurvey = (survey: Survey) => {
    setSurveys((prevSurveys) => [...prevSurveys, survey]);
  };

  return (
    <AppContext.Provider
      value={{
        addQuestion,
        addSurvey,
        questions: currentQuestions,
        steps: steps,
        setSteps: setSteps,
        surveys,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider };
