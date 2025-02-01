import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import image2 from "./assets/quizzl2.jpeg";

const App = () => {
    const [question, setQuestion] = useState([]);
    const [count, setCount] = useState(0);
    const [correct, setCorrect] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null); 
    const [isAnswering, setIsAnswering] = useState(false); 
    const [quizFinished, setQuizFinished] = useState(false); 
    const [userResponses, setUserResponses] = useState([]); 

    const startQuiz = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/questions');
            setQuestion(response.data.questions); 
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    // Function to check if the selected option is correct
    const handleAnswerClick = (option) => {
        if (isAnswering) return; 

        setSelectedOption(option); 
        setIsAnswering(true); 

 
        const response = {
            question: question[count],
            selectedOption: option,
            isCorrect: option.is_correct
        };
        setUserResponses([...userResponses, response]);

        if (option.is_correct) {
            setCorrect(correct + 1); 
        }

       
        setTimeout(() => {
            if (count < 9) { 
                setCount(count + 1); 
            } else {
                setQuizFinished(true); 
            }
            setSelectedOption(null); 
            setIsAnswering(false); 
        }, 1000); 
    };

    useEffect(() => {
        if (count >= 10) {
            setQuizFinished(true);
        }
    }, [count]);

    return (
        <div className="container">
            <h1>QUIZZ?</h1>
            <br /><br /><br />

            {quizFinished ? (
                
                <div className="quiz-finished">
                <br></br><br></br>
                   <h1>Finished!!</h1>
                    <h2>Your score: {correct} / 10</h2>
                    <p>Summary of your answers:</p>
                    <div className="summary">
                    <ul>
                        {userResponses.map((response, index) => (
                            <li key={index}>
                                <strong>Question {index + 1}: </strong>{response.question.description}
                                <br />
                                <strong>Your answer: </strong>{response.selectedOption.description}
                                <br />
                                <strong>{response.isCorrect ? "Correct" : "Incorrect"}</strong>
                            </li>
                        ))}
                    </ul>
                    </div>
                  
                     <button onClick={() => { setCount(0); setCorrect(0); setQuestion([]); setUserResponses([]); setQuizFinished(false); }}>Restart Quiz</button> 
                </div>
            ) : (
                question.length === 0 ? (
                    
                    <div className="quiz">
                        <img src={image2} alt="logo" />
                        <br /><br /><br />
                        <button onClick={startQuiz}>Start Quiz</button>
                    </div>
                ) : (
                   
                    <div className="question-container">
                           <p>{count + 1} out of 10</p>
                        <h2>{question[count]?.description}</h2>

                        <ul>
                            {question[count]?.options.map((option, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleAnswerClick(option)}
                                    className={`
                                        option 
                                        ${selectedOption === option && option.is_correct ? "correct" : ""}
                                        ${selectedOption === option && !option.is_correct ? "incorrect" : ""}
                                    `}
                                >
                                    {option.description}
                                </li>
                            ))}
                        </ul>

                     
                        <p className='score'>Score: {correct}</p>
                    </div>
                )
            )}
        </div>
    );
};

export default App;
