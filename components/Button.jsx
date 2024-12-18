const Button = ({text = "Next Question"}) => {
    return (
        <button className="bg-orange-900 text-white font-bold py-2 px-4 rounded">{text}</button>
    )
}

export default Button;