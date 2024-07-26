
import { useState, useEffect, useRef } from "react"
import Question from "./Question"
import he from 'he'
import { nanoid } from 'nanoid'

const Quiz = ({numberOfQuestions, category, difficulty, answerType}) => {

    const [questions, setQuestions] = useState([])
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [score, setScore] = useState(0)

    const URL = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}&type=${answerType}`

    function getShuffledAnswers(allAnswers){
        let temp = allAnswers.map(ans => he.decode(ans))
        for(let i = allAnswers.length - 1; i > 0 ; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [temp[i], temp[j]] = [temp[j], temp[i]]
        }
        return temp
    }

    function getUpdatedQuestionsWithShuffledAnswers(allQuestions){
        return allQuestions.map(question => (
            {
                ...question,
                questionId: nanoid(),
                question: he.decode(question.question),
                correct_answer: he.decode(question.correct_answer),
                shuffledAnswers: getShuffledAnswers([question.correct_answer, ...question.incorrect_answers]),
                selectedAnswer: ""
            }
        ))
    }

    const getQuestions = async () => {
        let questionsFromAPI = await fetch(URL)
        questionsFromAPI = await questionsFromAPI.json()
        const questionsWithShuffledAnswers = getUpdatedQuestionsWithShuffledAnswers(questionsFromAPI.results)
        setQuestions(questionsWithShuffledAnswers)
    }

    useEffect(() => {
        getQuestions()
    }, [])

    function calculateScore(){
        let s = 0;
        for (let q of questions){
            if(q.selectedAnswer === q.correct_answer){
                s++;
            }
        }
        return s
    }

    function handleSubmit(e){
        let text = e.target.textContent.toLowerCase()
        if(text.includes("play")){
            getQuestions()
            setIsSubmitted(false)
            setScore(0)
        }else{
            setIsSubmitted(true)
            setScore(calculateScore())
        }
    }

    const allQuestions = questions.map(question => (
        <Question 
            key={question.questionId} 
            question={question} 
            questions={questions} 
            setQuestions={setQuestions} 
            question_id={question.questionId}
            isSubmitted={isSubmitted}
        />
    ))

    const isSubmitDisabled = () => {
        let checkValues = []

        for (let question of questions){
            let val = question.selectedAnswer === "" 
            checkValues.push(val)
        }

        const isDisabled = checkValues.reduce((prev, curr) => prev || curr, 0)
        return isDisabled
    }

    return (
        <div className="questions__container">
            {allQuestions}

            <div className="submission__container">
                {
                    isSubmitted ? (
                        <h2>
                            Your score is {score}/{numberOfQuestions}
                        </h2>
                    ) : ""
                }
                <button 
                    className={`quiz__submit__btn ${isSubmitDisabled() && "disable__btn"}`}
                    onClick={handleSubmit}
                    disabled={isSubmitDisabled()}
                >
                    {
                        !isSubmitted ? "Check Answers!" : "Play Again!"
                    }
                </button>
            </div>
        </div>
    )
}

export default Quiz



