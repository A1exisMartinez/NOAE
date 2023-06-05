const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0 
let questionCounter = 0
let availableQuestions = []

let questions = [
   {
   question: 'What is the foucus of the Website about?',
   choice1: "Pizza And Doughnuts",
   choice2: "New York",   
   choice3: "The Toliet",   
   choice4: "Graffiti",
   answer: 4,
   },
{
   question: 'What is another way people describe Art-Work on Walls',
   choice1: "Street Art",
   choice2: "Blank Canvas",   
   choice3: "The Offical Art",   
   choice4: "The Office",
   answer: 1,
    },
{
    question: 'What is another form of art thats shown in the website',
    choice1: "Music",
    choice2: "Food",   
    choice3: "Make-up",   
    choice4: "Going to School",
    answer: 1,
     },
{
    question: 'What city is website based off',
    choice1: "New-York",
    choice2: "New-Jersey",   
    choice3: "California",   
    choice4: "PA",
    answer: 1,
}

]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4 

startGame = () => {
   questionCounter = 0
   score = 0
   availableQuestions = [...questions]
   getNewQuestion()
}

getNewQuestion = () => {
   if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score)

    return window.location.assign('/end.html')
   }

   questionCounter++
   progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
   progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) × 100}%`


   const questionIndex = Math.floor(Math.random() × availableQuestions.length)
   currentQuestion = availableQuestions[questionIndex]
   question.innerText = currentQuestion.question

   choices.forEach(choice => {
      const number = choice.dataset ['number']
      choice.innerText = currentQuestion['choice' + number]


   })

   availableQuestions.splice(questionIndex, 1)

   acceptingAnswers = true

} 

choices.forEach(choice => {
       choice.addEventListener('click', e => {
          if(!acceptingAnswers) return

          acceptingAnswers = false
          const selectedChoice = e.target
          const selectedAnswer = selectedChoice.dataset['number'];

          let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
             'incorrect'

          if (classToApply === 'correct') {
             incrementScore(SCORE_POINTS);
          }

          selectedChoice.parentElement.classList.add(classToApply)

          setTimeout(() => {
             selectedChoice.parentElement.classList.remove(classToApply)
             getNewQuestion()


          }, 1000)

       })
    })

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()