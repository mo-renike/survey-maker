import React from "react";
import { AppContext } from "../../AppContext";
import SurveyForm from "../../components/SurveyForm";

const Home = () => {
  const { steps, setSteps } = React.useContext(AppContext);
  const [showForm, setShowForm] = React.useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // chec if the number of steps is greater than 0
    if (!e.currentTarget.steps.value || e.currentTarget.steps.value < 1) {
      alert("Please enter a number");
    } else {
      setSteps(e.currentTarget.steps.value);
      setShowForm(true);
    }
  };

  return (
    <div>
      <h1>Create Surveys</h1>
      <p>
        This is a form for creating a questionnaire. Enter the number of steps
        below.
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="steps">Number of steps:</label>
        <input type="number" id="steps" name="steps" min="0" max="10" />
        <button type="submit">Submit</button>
      </form>
      <div>
        {showForm && (
          <>
            {" "}
            <h4>You have selected {steps} steps.</h4> <SurveyForm />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
