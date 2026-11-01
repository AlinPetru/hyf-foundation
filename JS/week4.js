import './styles.css'
import Artyom from 'artyom.js'

const artyom = new Artyom()

let userName = ''
let todos = []

function getReply(command) {
  const text = command.trim().replace(/[?!.]+$/, '')
  const lowerText = text.toLowerCase()

  // Remember the user's name
  if (lowerText.startsWith('hello my name is ')) {
    const name = text.slice('hello my name is '.length).trim()

    if (name === '') {
      return 'Please tell me your name.'
    }

    if (userName.toLowerCase() === name.toLowerCase()) {
      return `I already know you, ${userName}!`
    }

    userName = name
    return `Nice to meet you ${userName}`
  }

  // Say the user's name
  if (lowerText === 'what is my name') {
    if (userName === '') {
      return "You haven't told me your name yet :D ."
    }

    return `Your name is ${userName}`
  }

  // Add a todo
  if (lowerText.startsWith('add ') && lowerText.endsWith(' to my todo')) {
    const todo = text.slice('add '.length, -' to my todo'.length).trim()

    if (todo === '') {
      return 'Please tell me what to add.'
    }

    todos.push(todo)
    return `${todo} added to your todo`
  }

  // Remove a todo
  if (lowerText.startsWith('remove ') && lowerText.endsWith(' from my todo')) {
    const todo = text.slice('remove '.length, -' from my todo'.length).trim()

    const index = todos.findIndex(
      (item) => item.toLowerCase() === todo.toLowerCase()
    )

    if (index === -1) {
      return `${todo} is not on your todo list.`
    }

    const removedTodo = todos.splice(index, 1)[0]
    return `Removed ${removedTodo} from your todo`
  }

  // Show all todos
  if (lowerText === 'what is on my todo') {
    if (todos.length === 0) {
      return 'Your todo list is empty.'
    }

    return `You have ${todos.length} ${
      todos.length === 1 ? 'todo' : 'todos'
    } - ${todos.join(' and ')}`
  }

  // Today's date
  if (lowerText === 'what day is it today') {
    const today = new Date()
    const month = today.toLocaleString('en-GB', {
      month: 'long',
    })

    return `${today.getDate()}. of ${month} ${today.getFullYear()}`
  }

  // Simple math: for example, "what is 3 + 3"
  const mathMatch = lowerText.match(
    /^what is (-?\d+(?:\.\d+)?)\s*(plus|minus|times|multiplied by|divided by|[+\-*/×÷])\s*(-?\d+(?:\.\d+)?)$/
  )

  if (mathMatch) {
    const firstNumber = Number(mathMatch[1])
    const operator = mathMatch[2]
    const secondNumber = Number(mathMatch[3])

    switch (operator) {
      case '+':
      case 'plus':
        return String(firstNumber + secondNumber)

      case '-':
      case 'minus':
        return String(firstNumber - secondNumber)

      case '*':
      case '×':
      case 'times':
      case 'multiplied by':
        return String(firstNumber * secondNumber)

      case '/':
      case '÷':
      case 'divided by':
        if (secondNumber === 0) {
          return 'You cannot divide by zero.'
        }

        return String(firstNumber / secondNumber)
    }
  }

  // Set a timer
  const timerMatch = lowerText.match(/^set a timer for (\d+) minutes?$/)

  if (timerMatch) {
    const minutes = Number(timerMatch[1])

    if (minutes < 1 || minutes > 1440) {
      return 'Please choose between 1 and 1440 minutes.'
    }

    setTimeout(
      () => {
        console.log('Timer done')
        artyom.say('Timer done')
      },
      minutes * 60 * 1000
    )

    return `Timer set for ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`
  }

  // Extra command: clear the todo list
  if (lowerText === 'clear my todo') {
    todos = []
    return 'Your todo list has been cleared.'
  }

  // Extra command: current time
  if (lowerText === 'what time is it') {
    const time = new Date().toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    })

    return `The time is ${time}`
  }

  if (lowerText === '') {
    return "I didn't hear anything. Please try again slower."
  }

  return "Sorry, I don't understand that command."
}

// Voice controls
const button = document.querySelector('button')

let command = ''
let isListening = false
let timeoutId
let animationId

const userDictation = artyom.newDictation({
  continuous: false,

  onResult: function (text) {
    if (isListening) {
      command = text
      console.log('Command:', command)
    }
  },

  onStart: function () {
    console.log('Listening started')
  },

  onEnd: function () {
    console.log('Listening stopped')
  },
})

button.addEventListener('click', () => {
  if (isListening) {
    return
  }

  command = ''
  isListening = true
  button.textContent = 'Talk now 🙂'

  animationId = setInterval(() => {
    button.textContent =
      button.textContent === 'Talk now 🙂' ? 'Talk now 😮' : 'Talk now 🙂'
  }, 300)

  try {
    userDictation.start()
  } catch (error) {
    clearInterval(animationId)
    isListening = false
    button.textContent = 'Try again'
    console.error(error)
    return
  }

  timeoutId = setTimeout(() => {
    isListening = false
    clearInterval(animationId)
    userDictation.stop()

    const response = getReply(command)

    console.log('Reply:', response)
    artyom.say(response)

    button.textContent = 'Give a new command'
  }, 5000)
})
