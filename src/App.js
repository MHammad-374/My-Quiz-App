import React, { useState } from "react";
import "./App.css"
import questions from "./data/data.json"



export default function App() {
  let [startGame, setStartGame] = useState(true)
  let [showResults, setShowResults] = useState(false)
  let [score, setScore] = useState(0)
  let [question, setQuestion] = useState(1)


  const game = () => {
    setStartGame(false)
  }

  const handleOptionSelection = (optionCorrect) => {
    if (optionCorrect == true) {
      setScore(score = score + 1)
      setQuestion(question++)
    }
    else {
      setQuestion(question++)
    }

    if (question <= questions.length) {
      setQuestion(question++)
    }
    else {
      setShowResults(true)
    }
  };

  const restartGame = () => {
    setQuestion(1);
    setScore(0);
    setShowResults(false)
  }

  let res = questions.find(q => {
    return (
      q.id === question
    )
  })


  return (
    <>
      {startGame ?
        (
          <div className="start shadow p-3 mb-5  rounded-4 card bg-body-secondary">
            <h1>Start Quiz</h1>
            <button onClick={() => game()} className="restart" >Start</button>
          </div>
        )
        :
        (
          showResults ?
            (
              <div className="result shadow p-3 mb-5  rounded-4 card bg-body-secondary">
                <h1>Results</h1>
                <h4>Your score : {score}</h4>
                <h4>{score} out of {questions.length} correct. - Percentage: {(score * 100) / questions.length}%</h4>
                <button onClick={() => restartGame()} className="restart" >Restart</button>
              </div>
            )
            :
            (
              <div className="div1 shadow p-3 mb-5 bg-body-tertiary rounded-4 card bg-body-secondary">
                <div>
                  <h1 className="float-start">Guess the animal:</h1>
                  <div className="float-end">
                    <h4>{question} out of {questions.length}</h4>
                    <h4>Score: {score}</h4>
                  </div>
                </div>
                <hr />
                <img className="image rounded-4" src={res.image} />
                {
                  res.options.map(op => {
                    return (
                      <>
                        <button
                          key={op.id}
                          onClick={() => handleOptionSelection(op.isCorrect)}
                          className="options"
                        >
                          {op.text}
                        </button>
                      </>
                    )
                  })
                }
              </div>
            )
        )
      }
    </>
  )


}








