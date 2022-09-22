import React from "react"


export default function Home(props) {
    return(
        <div id="home-container">
            <h1>Quizzical</h1>
            <h3>General Knowledge</h3>
            <button id="start-quiz" className="btn" onClick={props.startQuiz}>Start Quiz</button>
        </div>
    )
}