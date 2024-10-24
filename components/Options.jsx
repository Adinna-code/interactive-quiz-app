const Options = ({ answers, isSubmitted }) => {
    return (
        <ul>
            {answers.map((answer, index) => (
                <li key={index}>
                    <label>
                        <input 
                        type="radio"
                        name="answer"
                        value={answer}
                        disabled={isSubmitted} 
                        />
                        {answer}
                    </label>
                </li>
            ))}
        </ul>
    )
}

export default Options;