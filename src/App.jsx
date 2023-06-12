import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [questions, setQuestions] = useState([]);
  const [randomQuestion, setRandomQuestion] = useState({});
  const [answer, setAnswer] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [classNameQ, setClassNameQ] = useState("");

  // fetch data from backend
  useEffect(() => {
    const getData = async () => {
      const response = await fetch("https://quiztime-7x8j.onrender.com/quiz");
      const data = await response.json();
      setQuestions(data.data);
      setDataLoaded(!dataLoaded);
      console.log(data);
    };
    getData();
  }, []);
  console.log(questions);

  useEffect(() => {
    toggleRandomQuestion();
  }, [dataLoaded]);

  //select random question
  const toggleRandomQuestion = () => {
    setRandomQuestion(questions[Math.floor(Math.random() * questions.length)]);
    setClassNameQ("");
  };

  console.log(randomQuestion);

  //create array with all answers for question
  const answerArray = randomQuestion?.incorrect_answers;
  const answerTrue = randomQuestion?.correct_answer;

  answerArray.push(answerTrue);
  console.log(answerArray);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  shuffleArray(answerArray);

  const trueAnswer = "true";
  const wrongAnswer = "wrong";

  const checkAnswer = (answer) => {
    if (answer === randomQuestion.correct_answer) {
      setClassNameQ("true");
    } else {
      setClassNameQ("wrong");
    }
  };

  return (
    <>
      <div className="logo">
        <img src="./assets/logo.png" alt="quiz logo" />
      </div>
      <div className="container">
        <h1>{randomQuestion.question}</h1>
        <h2 style={{ color: "white" }}>{classNameQ} </h2>
        {answerArray.map((answer, index) => (
          <div
            key={index}
            className="answer"
            onClick={() => checkAnswer(answer)}
          >
            <span>{index + 1}</span>
            <p>{answer}</p>
          </div>
        ))}
        <button onClick={toggleRandomQuestion}>next question</button>
        <div className="dark_mode">reagan mod</div>
      </div>
    </>
  );
}

export default App;
