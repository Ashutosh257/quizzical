
import { useState } from 'react'
import './App.css'
import QuizForm from './components/QuizForm'
import Quiz from './components/Quiz'


function App() {

    const [formData, setFormData] = useState({
        numberOfQuestions: 5,
        category : 9,
        difficulty: "easy",
        answerType: "multiple"
    })

    const [startQuiz, setStartQuiz] = useState(false)

    function toggleDisplay(){
        setStartQuiz(prevScreen => !prevScreen)
    }

    function updateFormData(newData){
        setFormData(newData)
    }

    return (
        <div className='quizzical_container'>
            <h1 
                className='quizzical__header'
                onClick={() => {
                    window.location.reload()
                }}
            >
                    Quizzical
            </h1>
            {
                startQuiz ? 
                    <Quiz {...formData} />
                : (
                    <QuizForm 
                        toggleDisplay={toggleDisplay} 
                        formData={formData}
                        updateFormData={updateFormData}
                    />
                )
            }
        </div>
    )
}


export default App

