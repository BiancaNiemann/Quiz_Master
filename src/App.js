import React from "react";
import { nanoid } from 'nanoid'
import Main from './Components/Main.js'
import Start from './Components/Start.js'


export default function App() {

  //SET STATES
  const [newQuiz, setNewQuiz] = React.useState([])
  const [playGame, setPlayGame] = React.useState(false)
  const [showAnswers, setshowAnswers] = React.useState(false)
  const [totalCorrect, setTotalCorrect] = React.useState(0)
  const [getCategories, setGetCategories] = React.useState({})

  //CREATE ADDRESS FROM SELECTION MADE ON START PAGE, GETS INFO FROM GETCATEGORIES STATE OBJECT 
  let address = `https://opentdb.com/api.php?amount=5&category=${getCategories.categoryChoice}&difficulty=${getCategories.levelChoice}&type=multiple`

  //USE-EFFECT FETCHES THE API DATA USING ABOVE ADDRESS CREATED
  React.useEffect(() => {
    fetch(address)
    .then(res => res.json())
    .then(data => {//setGetQuiz()
      setNewQuiz([])
      const questionArray = []
      data.results.map(item => {
        //CREATES SHUFFLED ARRAY OF BOTH CORRECT AND INCORRECT ANSWERS
        let allAnswers = []
          allAnswers.push(item.correct_answer)
           item.incorrect_answers.map(item => {
              allAnswers.push(item)
              allAnswers.sort(() => Math.random() - 0.5)
              return allAnswers
           })
        //CREATES OBJECT FOR EACH ANSWER WITH ID NUMBER FOR CLICK AND ISHELD WITH BOOLEAN TO CHANGE COLOR IF BUTTON CLICKED
        let answerObjects = []
          allAnswers.forEach(item => {
            answerObjects.push({answer: item, id: nanoid(), isHeld:false})
            return answerObjects
          })
        //CREATES FULL OBJECT USING INFO FROM API AND OBJECT CREATED ABOVE
        let quizObj = {
          question: item.question,
          correctAnswer: item.correct_answer,
          incorrectAnswers: item.incorrect_answers,
          answers: answerObjects,
          id: nanoid(),
          isAnswered: false
        }
        questionArray.push(quizObj)
        setNewQuiz(oldQuiz => [...oldQuiz, quizObj])
      })
    })
  }, [getCategories])

  //FETCHES THE CATEGORIES FROM SELECTION MADE ON START PAGE AND THEN SAVE DETAILS IN STATE OBJECT
  function fetchCategories(cats){
    setGetCategories({
      categoryChoice: cats.category,
      levelChoice: cats.difficulty
    })
    setPlayGame(true)
  }

  //CHANGES ISHELD IN NEWQUIZ STATE TO SHOW TRUE SO COLOR CHANGES, IF ANOTHER ANSWER CLICKED WILL MAKE ORIGINAL FALSE AGAIN SO ONLY ONE CAN BE SELECTED 
  function holdAnswer(id, boxId){
    setNewQuiz(oldQuiz => oldQuiz.map(item => {
        return item.id === boxId ? 
          {
          ...item,
          isAnswered: !item.isAnswered,
          answers: item.answers.map(answer => {
          return answer.id === id ?
            {...answer, isHeld: !answer.isHeld}:
            {...answer, isHeld: false}
        })} :
        item
      }))
  }

  //SENDS PROPS FROM NEWQUIZ STATE TO MAIN.JS PAGE AND FUNCTION
  const getQuestionData = newQuiz.map(item => (    
    <Main 
      key = {item.id}
      ques = {item.question}
      answers = {item.answers}
      holdAnswer = {holdAnswer}
      id = {item.id}
      isChecked = {showAnswers}
      correct = {item.correctAnswer}
    />
  ))

  //CHECKS IF ANSWER SELECTED IS CORRECT AND IF IT IS ADDS ONE TO THE TOTAL VARIABLE
  function checkAnswer(){
    let total = 0
    let answer = ''
    let corrAns = ''

    newQuiz.map(item => {  
      
      corrAns = item.correctAnswer
      item.answers.map(item => {
        if (item.isHeld){
          answer = item.answer
        }
      })

      if (answer === corrAns){
        total = total +1
      }
      setshowAnswers(true)
      return setTotalCorrect(total)
      
    })
  }

  //RESETS ALL VALUES BACK TO ORIGINAL STATE
  function playAgain(){
    setTotalCorrect(0)
    setPlayGame(false)
    setshowAnswers(false)
    setNewQuiz([])
  }

  return (
    <div className="app">
      {playGame && getQuestionData}
      {!playGame && <Start fetchCategories={fetchCategories}/>}
      {playGame && !showAnswers && <button onClick={checkAnswer} className="check-btn">Check Answers</button>}
      {showAnswers && <h3 className="total">total is {totalCorrect} / 5</h3>}
      {showAnswers && <button onClick={playAgain} className="playAgain-btn">Play Again</button>}
    </div>
  );
}

