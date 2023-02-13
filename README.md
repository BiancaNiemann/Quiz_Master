# Scrimba Quizzical Solo Project

The final solo project of the Scrimba Frontend Career path, for this we had to practice everything we have learnt over the whole course which includes:
- Html
- CSS
- JavaScript
- React
- Api's

## Project features

- The Quiz starts with a Home page asking user to select category type and difficulty level they would like
- Then on start button click it opens the next page which is the quiz, showing 5 questions each with 4 answers to select from, the chosen answer is highlighted
- Once check answers is clicked takes you to the next page which shows the same questions and your highlighted answers plus the correct answers are also highlighted, at the bottom of the screen is the score

##  What I used to create the App

- Components for the start and Main pages which include the html to render to the screen
- Fetch the data from the API and used React.useEffect hook to put the data received in state to be used in functions
- Conditional rendering is used so functions know what needs to display on the screen
- imported nanoid so that each question has its on unique id

## Stretch goals added

- The option to select a category and difficulty level was not part of the original project but I wanted to try and stretch myself a bit and see if these could be added
- The design is not exactly per the Figma file as I wanted to personalise it a bit
- The confetti that falls if the user gets all questions correct
