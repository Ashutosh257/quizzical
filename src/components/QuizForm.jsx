
import { useEffect, useState } from 'react'

const QuizForm = ({ toggleDisplay, formData, updateFormData }) => {

    const [category, setCategory] = useState([])

    function handleForm(e){
        e.preventDefault()
        toggleDisplay()
    }

    function handleChange(e){
        const {name, value} = e.target
        updateFormData({
            ...formData,
            [name]: value
        })
    }

    useEffect(() => {
        async function getCategory(){
            const res = await fetch(`https://opentdb.com/api_category.php`)
            const data = await res.json()
            setCategory(data.trivia_categories)
        }

        getCategory()
    }, [])

    const categoryOptions = category.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)
    
    const difficultyLevels = ["Easy", "Medium", "Hard"]
    const difficultyOptions = difficultyLevels.map((level, index) => <option key={index} value={level.toLowerCase()}>{level}</option>)

    return (
        <div className='quiz__container'>
            <form className='quiz__form' onSubmit={handleForm}>
                <div>
                    <label htmlFor="total-questions">
                        Number of questions:
                    </label>
                    <input 
                        type="text" 
                        id='total-questions'
                        name='numberOfQuestions'
                        onChange={handleChange}
                        placeholder='default (5)'
                    />
                </div>

                <div>
                    <label htmlFor="category">
                        Question Category: 
                    </label>
                    <select 
                        id="category"
                        name="category" 
                        onChange={handleChange}
                    >
                        {categoryOptions}
                    </select>
                </div>
                
                <div>
                    <label htmlFor="difficulty">
                        Difficulty Level: 
                    </label>
                    <select 
                        id="difficulty"
                        name="difficulty" 
                        onChange={handleChange}
                    >
                        {difficultyOptions}
                    </select>
                </div>

                <button type='submit'>
                    Start Quiz!
                </button>
            </form>
        </div>
    )
}

export default QuizForm