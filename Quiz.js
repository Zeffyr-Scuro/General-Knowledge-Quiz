import React from "react"
import {nanoid} from "nanoid"

export default function Quiz(props) {
    const [answers, setAnswers] = React.useState(getAnswers)
    
    // get the answers and randomizing the answers order
    function getAnswers() {
        const answer = props.question.map(ans => ans.incorrect_answers.concat(ans.correct_answer))
        answer.map(items => items.sort((a, b) => 0.5 - Math.random()))
        const decode = answer.map(items => items.map(ans => decodeURIComponent(atob(ans))))
        return decode
    }
    
    
    // create quiz question and answers
    const quizItems = props.question.map((item, index) => {
        const correct = decodeURIComponent(atob(item.correct_answer))
        const allAnwser = answers  
        const question = decodeURIComponent(atob(item.question))
        
    return(
        <div key={nanoid()} className="box">
            <h3>{question}</h3>
           
            <input
                type="button"
                name={correct}
                id={index}
                onClick={() => props.chioce(event, index+"1")}
                className={props.styles(event, index+"1")}
                value={allAnwser[index][0]}
                style={props.results ? props.correctAnswer(allAnwser[index][0], correct): {background:""}}
                disabled={props.results}
                />
            <input
                type="button"
                name={correct}
                id={index}
                onClick={() => props.chioce(event, index+"2")}
                className={props.styles(event, index+"2")}
                value={allAnwser[index][1]}
                style={props.results ? props.correctAnswer(allAnwser[index][1], correct): {background:""}}
                disabled={props.results}
                />
            <input
                type="button"
                name={correct}
                id={index}
                onClick={() => props.chioce(event, index+"3")}
                className={props.styles(event, index+"3")}
                value={allAnwser[index][2]}
                style={props.results ? props.correctAnswer(allAnwser[index][2], correct): {background:""}}
                disabled={props.results}
                />
            <input
                type="button"
                name={correct}
                id={index}
                onClick={() => props.chioce(event, index+"4")}
                className={props.styles(event, index+"4")}
                value={allAnwser[index][3]}
                style={props.results ? props.correctAnswer(allAnwser[index][3], correct): {background:""}}
                disabled={props.results}
                />
        </div>
    )})
    return(
        <div>
            {quizItems}
            {!props.results && <input value="Check Answers" onClick={props.check} className="btn btn-status" type="submit" disabled={props.results} />}
        </div>
    )
}