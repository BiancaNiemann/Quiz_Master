import React from "react";

//LOOPS THROUGH PROPS RECEIVED FROM PARENT AND CREATES ELEMENST BASED ON WETHER TRUE OR FALSE
export default function Main(props){
    const propAnswer = props.answers.map(item => {
        if (props.isChecked === true){
            if (item.answer === props.correct) {
                const styles = { backgroundColor: item.answer ? "#f5dd90" : "rgb(186, 247, 244)"}
                return <button className="answer" key={item.id} onClick={() => props.holdAnswer(item.id, props.id)} style={styles} dangerouslySetInnerHTML={{__html: item.answer}} disabled></button>
            }
        } 
        
        if(!props.checker){
            const styles = { backgroundColor: item.isHeld ? "#586ba4" : "rgb(186, 247, 244)"}
            return <button className="answer" key={item.id} onClick={() => props.holdAnswer(item.id, props.id)} style={styles} dangerouslySetInnerHTML={{__html: item.answer}}></button>
        } else if (props.checker){
            const styles = { backgroundColor: item.isHeld ? "lightpink" : "rgb(186, 247, 244)"}
            return <button className="answer" key={item.id} onClick={() => props.holdAnswer(item.id, props.id)} style={styles} dangerouslySetInnerHTML={{__html: item.answer}} disabled></button>}
    })
    return (
        <div className="container">
            <h2 className="question" dangerouslySetInnerHTML={{__html: props.ques}}></h2>
            <div className="answer-box">
                {propAnswer}
            </div>
        </div>
    )
}

//DANGEROUSLY SET FIXES THE ERROR WITH THE HTML CODE PULLING THROUGH AND MAKING THE QUESTION LOOK FUNNY, IE: &039 OR &QUOT