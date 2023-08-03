import React, { useContext, useState } from "react";
import { AppContext, Question } from "../AppContext";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const { questions, addQuestion, addSurvey, steps } = useContext(AppContext);

  const [selectedType, setSelectedType] = useState<Question["type"]>("text");
  const [questionText, setQuestionText] = useState("");
  const [questionOptions, setQuestionOptions] = useState<string[]>([]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value as Question["type"]);
    setQuestionOptions([]);
  };

  const navigate = useNavigate();

  const handleSave = () => {
    if (questions.length < 0) {
      alert("Please add a question");
    } else {
      alert("Survey created successfully");
    }

    addSurvey({
      id: Date.now(),
      questions: questions,
    });

    navigate("/surveys");
  };

  const handleAddQuestion = () => {
    if (questions.length >= steps * 5) {
      return;
    }
    // check if question text is empty
    if (questionText.trim() === "") {
      alert("Please enter a question");
      return;
    }
    const newQuestion: Question = {
      id: questions.length + 1,
      type: selectedType,
      text: questionText,
      options: selectedType === "text" ? undefined : questionOptions,
    };
    addQuestion(newQuestion);
    setQuestionText("");
    setQuestionOptions([]);
  };

  const handleQuestionText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionText(event.target.value);
  };

  const handleOptionChange = (index: number, value: string) => {
    setQuestionOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[index] = value;
      return newOptions;
    });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 5;

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(questions.length / questionsPerPage))
    );
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * questionsPerPage;
  const displayedQuestions = questions.slice(
    startIndex,
    startIndex + questionsPerPage
  );
  const currentStep = Math.ceil(questions.length / questionsPerPage);

  return (
    <div className="w-50">
      <div className="flex">
        <label htmlFor="question">Question Type:</label>
        <select value={selectedType} onChange={handleSelectChange}>
          <option value="text">Text</option>
          <option value="radio">Radio</option>
          <option value="checkbox">Checkbox</option>
        </select>
      </div>

      <div className="flex">
        <label>Question Text:</label>
        <input
          required
          type="text"
          value={questionText}
          onChange={handleQuestionText}
        />
      </div>

      {selectedType === "radio" || selectedType === "checkbox" ? (
        <div>
          <h4>Options:</h4>
          {questionOptions.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            </div>
          ))}
          <button onClick={() => setQuestionOptions([...questionOptions, ""])}>
            Add Option
          </button>
        </div>
      ) : null}

      <button
        onClick={handleAddQuestion}
        disabled={questions.length >= steps * 5}
      >
        Add Question
      </button>

      <h3>Questions</h3>
      {displayedQuestions.map((question, index) => (
        <div key={question.id}>
          <span>{`${startIndex + index + 1}. ${question.text}`}</span>{" "}
          {question.options && (
            <ul>
              {question.options.map((option) => (
                <li key={option}>{option}</li>
              ))}
            </ul>
          )}
        </div>
      ))}

      {questions.length > questionsPerPage && (
        <div>
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous Step
          </button>
          <button
            onClick={handleNextPage}
            disabled={
              currentPage === Math.ceil(questions.length / questionsPerPage)
            }
          >
            Next Step
          </button>
        </div>
      )}

      <button onClick={handleSave}>Submit Questionnaire</button>
      <h3>
        Step {currentStep} of {steps}
      </h3>
    </div>
  );
};

export default Form;
