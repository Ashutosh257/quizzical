

import React from 'react'

const Answer = ({ answer, question, setQuestions, question_id, isSubmitted}) => {

    const {selectedAnswer, correct_answer} = question


    function handleSelect(){
        !isSubmitted && (
            setQuestions(prevQuestions => {
                return prevQuestions.map(prevQuestion => (
                    prevQuestion.questionId === question_id ? (
                        {
                            ...prevQuestion,
                            selectedAnswer: answer
                        }
                    ) : prevQuestion                  
                ))
            })
        )
    }

    const selectedClass = selectedAnswer === answer ? "selected" : ""

    
    function checkAnswer(){
        let classToAdd = ""
        
        if(selectedAnswer === correct_answer && selectedAnswer === answer || answer === correct_answer){
            classToAdd += "correct "
        }
        
        if(selectedAnswer !== correct_answer && selectedAnswer === answer){
            classToAdd += "wrong "
        }

        return classToAdd
    }
    
    const addClass = isSubmitted ? checkAnswer() : ""
    
    return (
        <div 
            className={`answer ${selectedClass} ${addClass}`}
            onClick={handleSelect}
        >
            {answer}
        </div>
    )
}

export default Answer