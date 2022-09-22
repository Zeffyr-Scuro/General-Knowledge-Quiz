import React from "react"
import Home from "./Home"
import Quiz from "./Quiz"


export default function App() {
    const [start, setStart] = React.useState(true)
    const [score, setScore] = React.useState([])
    const [question, setQuestion] = React.useState([])
    const [results, setResults] = React.useState(false)
    const [url, setUll] = React.useState("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple&encode=base64")
    const [isActiveZero, setIsActiveZero] = React.useState({
        activeObjId: null,
        activeAnswer: null,
        correctAnswer: null
    })
    const [isActiveOne, setIsActiveOne] = React.useState({
        activeObjId: null,
        activeAnswer: null,
        correctAnswer: null
    })
    const [isActiveTwo, setIsActiveTwo] = React.useState({
        activeObjId: null,
        activeAnswer: null,
        correctAnswer: null
    })
    const [isActiveThree, setIsActiveThree] = React.useState({
        activeObjId: null,
        activeAnswer: null,
        correctAnswer: null
    })
    const [isActiveFour, setIsActiveFour] = React.useState({
        activeObjId: null,
        activeAnswer: null,
        correctAnswer: null
    })
    
    
    
    React.useEffect(() =>{
        fetch(url)
            .then(response => response.json())
            .then(data => setQuestion(data.results))
            .catch(error => console.log("error"))
    }, [])
    
    const startQuiz = () => {
        setStart(!start)
    }
    
    // store the id, value and correct value 
    const toggleChioce = (event, index) => {
        if (event.target.id === "0"){
        setIsActiveZero({ ...isActiveZero, activeObjId: index, activeAnswer: event.target.value, correctAnswer: event.target.name })
        }
        if (event.target.id === "1"){
        setIsActiveOne({ ...isActiveOne, activeObjId: index, activeAnswer: event.target.value, correctAnswer: event.target.name })
        }
        if (event.target.id === "2"){
        setIsActiveTwo({ ...isActiveTwo, activeObjId: index, activeAnswer: event.target.value, correctAnswer: event.target.name })
        }
        if (event.target.id === "3"){
        setIsActiveThree({ ...isActiveThree, activeObjId: index, activeAnswer: event.target.value, correctAnswer: event.target.name })
        }
        if (event.target.id === "4"){
        setIsActiveFour({ ...isActiveFour, activeObjId: index, activeAnswer: event.target.value, correctAnswer: event.target.name })
        }
    }
    
    // check how many questions are correct
    const isCorrect = (obj) => {
       return obj.activeAnswer === obj.correctAnswer ? "btn correct" :"btn incorrect"
    }
    
    // show which answers are correct
    const correctAnswer = (value, name) =>{
        return (value === name ? {background: " #94D7A2"} : {background:""})
    }
    
    // check how many answers the player got correct
    const getScore = () => {
        let count = 0
        if (isActiveZero.activeAnswer !== null && isActiveZero.activeAnswer === isActiveZero.correctAnswer){
            count += 1
        }
        if (isActiveOne.activeAnswer !== null && isActiveOne.activeAnswer === isActiveOne.correctAnswer){
            count += 1
        }
        if (isActiveTwo.activeAnswer !== null && isActiveTwo.activeAnswer === isActiveTwo.correctAnswer){
            count += 1
        }
        if (isActiveThree.activeAnswer !== null && isActiveThree.activeAnswer === isActiveThree.correctAnswer){
            count += 1
        }
        if (isActiveFour.activeAnswer !== null && isActiveFour.activeAnswer === isActiveFour.correctAnswer){
            count += 1
        }
        return count
    }
    
    // hightlights the last answer clicked
    const toggleStyle = (e, index) => {
        if (index === isActiveZero.activeObjId){
            return results ? isCorrect(isActiveZero) : "btn active"
        }
        else if (index === isActiveOne.activeObjId){
            return results ? isCorrect(isActiveOne) : "btn active"
        }
        else if (index === isActiveTwo.activeObjId){
            return results ? isCorrect(isActiveTwo) : "btn active"
        }
        else if (index === isActiveThree.activeObjId){
            return results ? isCorrect(isActiveThree) : "btn active"
        }
        else if (index === isActiveFour.activeObjId){
            return results ? isCorrect(isActiveFour) : "btn active"
        }else{
            return "btn inactive"
        }
    }
    
    const checkAnswers = () => {
        setScore(getScore())
        setResults(!results)
    }
    
    //reloads the webpage to start the quiz again
    const restartQuiz = () => {
        window.location.reload()
    }
    
    return(
        <main className="container">
            {start && <Home startQuiz={startQuiz} />}
            {!start && <Quiz correctAnswer={correctAnswer} results={results} question={question} chioce={toggleChioce} styles={toggleStyle}
            check={checkAnswers}/>}
            {results && 
            <div id="socre-container">
                <p>You scored {score}/5 correct answers</p>
                <button className="btn btn-status" onClick={restartQuiz}>Try again</button>
            </div>}
        </main>
    )
}