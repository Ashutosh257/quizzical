
import React from 'react'
import Answer from './Answer'

const Question = ({question, questions, setQuestions, question_id, isSubmitted}) => {

    return (
        <div className='question__card'>
            <h2>{question.question}</h2>
            <div className="answers">
                {
                    question.shuffledAnswers.map((ans, index) => (
                        <Answer 
                            key={index} 
                            answer={ans} 
                            question={question} 
                            questions={questions} 
                            setQuestions={setQuestions} 
                            question_id={question_id} 
                            isSubmitted={isSubmitted}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Question