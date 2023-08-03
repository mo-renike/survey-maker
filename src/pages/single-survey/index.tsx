import React from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext, Question } from "../../AppContext";

const QUESTIONS_PER_PAGE = 5;

const SingleSurvey = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const { id } = useParams();
  const { surveys } = React.useContext(AppContext);

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

  return (
    <div>
      <h1>
        Survey {currentSurvey.id} <small>Number of steps: {totalPages}</small>{" "}
      </h1>
      <div>
        <h3>Questions:</h3>
        {displayedQuestions.map((question: Question, index: number) => (
          <QuestionComponent
            key={question.id}
            question={question}
            questionNumber={currentQuestionNumber + index + 1}
          />
        ))}
        {totalQuestions > QUESTIONS_PER_PAGE && (
          <div>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous Step
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next Step
            </button>
          </div>
        )}
      </div>
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
}: {
  question: Question;
  questionNumber: number;
}) => {
  const { type, text, options } = question;

  if (type === "radio") {
    return (
      <div>
        <h4>
          Question {questionNumber}: {text}
        </h4>
        {options && (
          <ul>
            {options.map((option, index) => (
              <li key={index}>
                <input type="radio" value={option} name={text} />
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  } else if (type === "text") {
    return (
      <div>
        <h4>
          Question {questionNumber}: {text}
        </h4>
        <input type="text" />
      </div>
    );
  } else if (type === "checkbox") {
    return (
      <div>
        <h4>
          Question {questionNumber}: {text}
        </h4>
        {options && (
          <ul>
            {options.map((option, index) => (
              <li key={index}>
                <input type="checkbox" value={option} name={text} />
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return null;
};

export default SingleSurvey;
