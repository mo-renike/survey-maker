import React from "react";
import { AppContext } from "../../AppContext";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Surveys = () => {
  const { survey } = React.useContext(AppContext);

  return (
    <div>
      <h1>Surveys</h1>
      {survey.length === 0 ? (
        <p>You have not created any surveys yet.</p>
      ) : (
        <p>Here are the surveys you have created.</p>
      )}
      <div>
        {survey.map((survey) => (
          <div key={survey.id}>
            <Link to={`/survey/${survey.id}`}>
              <h3>Survey {survey.id}</h3>
            </Link>
          </div>
        ))}
      </div>
      <br />
      {survey.length === 0 ? (
        <Link to={`/`}>Add a new survey</Link>
      ) : (
        <Link to={`/`}>Back to Home</Link>
      )}
    </div>
  );
};

export default Surveys;
