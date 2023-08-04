import React from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext, Question } from "../../AppContext";

const QUESTIONS_PER_PAGE = 5;

const SingleSurvey = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const { id } = useParams();
  const { surveys } = React.useContext(AppContext);
  // State to store user responses
  const [userResponses, setUserResponses] = React.useState<Question[]>([]);
  const currentSurvey = surveys.find((item) => item.id === Number(id));

  if (!currentSurvey) {
    return <div>Survey not found.</div>;
  }

  const totalQuestions = currentSurvey.questions.length;
  const totalPages = Math.ceil(totalQuestions / QUESTIONS_PER_PAGE);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * QUESTIONS_PER_PAGE;
  const displayedQuestions = currentSurvey.questions.slice(
    startIndex,
    startIndex + QUESTIONS_PER_PAGE
  );

  // Calculate the current question number based on the currentPage and QUESTIONS_PER_PAGE
  const currentQuestionNumber = (currentPage - 1) * QUESTIONS_PER_PAGE;

  // Function to handle user responses
  const handleResponseChange = (questionId: number, response: any) => {
    setUserResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: response,
    }));
  };

  // Function to handle form submission
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log("User Responses:", userResponses);
  };

  return (
    <div>
      <h1>
        Survey {currentSurvey.id} <small>Number of steps: {totalPages}</small>{" "}
      </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Questions:</h3>
          {displayedQuestions.map((question) => (
            <QuestionComponent
              key={question.id}
              question={question}
              questionNumber={currentQuestionNumber + 1}
              onChange={(response) =>
                handleResponseChange(question.id, response)
              }
              userResponse={userResponses[question.id]}
            />
          ))}
          {/* {totalQuestions > QUESTIONS_PER_PAGE && ( */}
          <div>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous Step
            </button>
            <button
              type="submit"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              {currentPage === totalPages ? "Submit" : "Next Step"}
            </button>
          </div>
          {/* )} */}
        </div>
      </form>
      <h3>
        Step {currentPage} of {totalPages}
      </h3>
      <br />
      <Link to={`/surveys`}>Back to Surveys</Link>
    </div>
  );
};

const QuestionComponent = ({
  question,
  questionNumber,
  onChange,
  userResponse,
}: {
  question: Question;
  questionNumber: number;
  onChange: (response: any) => void;
  userResponse: any;
}) => {
  const { type, text, options } = question;

  const handleChange = (event: {
    target: { value: any; checked: any; type: any };
  }) => {
    const { value, checked, type } = event.target;
    const response = type === "checkbox" ? checked : value;
    onChange(response);
  };

  const renderOptions = () => {
    return (
      <ul>
        {options ? (
          options.map((option, index) => (
            <li key={index}>
              <input
                type={type}
                value={option}
                name={text}
                onChange={handleChange}
                checked={
                  userResponse === option ||
                  (Array.isArray(userResponse) && userResponse.includes(option))
                }
              />
              {option}
            </li>
          ))
        ) : (
          <input
            type={type}
            name={text}
            onChange={handleChange}
            value={userResponse || ""}
          />
        )}
      </ul>
    );
  };

  const renderQuestion = () => (
    <div>
      <h4>
        Question {questionNumber}: {text}
      </h4>
      {renderOptions()}
    </div>
  );

  switch (type) {
    case "radio":
    case "checkbox":
    case "text":
      return renderQuestion();
    default:
      return null;
  }
};

export default SingleSurvey;
