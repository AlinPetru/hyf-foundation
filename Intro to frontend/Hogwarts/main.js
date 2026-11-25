const houses = ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin']

const houseDescriptions = {
  Gryffindor: 'Bravery, courage and determination.',
  Hufflepuff: 'Loyalty, patience and hard work.',
  Ravenclaw: 'Intelligence, wisdom and creativity.',
  Slytherin: 'Ambition, determination and resourcefulness.',
}

const nameInput = document.querySelector('#nameInput')
const assignButton = document.querySelector('#assignButton')
const result = document.querySelector('#result')
const tryAgainButton = document.querySelector('#tryAgainButton')
const sortingSound = document.querySelector('#sortingSound')

function getRandomHouse() {
  const randomIndex = Math.floor(Math.random() * houses.length)
  return houses[randomIndex]
}

// assign a house after audio
function assignHouse() {
  const name = nameInput.value

  if (name.trim() === '') {
    result.textContent = 'Please enter your name!'
    return
  }

  result.textContent = 'The Sorting Hat is thinking...'

  const house = getRandomHouse()
  const description = houseDescriptions[house]

  sortingSound.currentTime = 0
  sortingSound.play()

  sortingSound.onended = function () {
    result.textContent = `${name} belongs in ${house}! ${description}`
  }
}

// Button events
assignButton.addEventListener('click', assignHouse)
tryAgainButton.addEventListener('click', assignHouse)
// Sparkles
const canvas = document.querySelector('#sparkleCanvas')
const ctx = canvas.getContext('2d')

let sparks = []

// canvas size
function resizeCanvas() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

resizeCanvas()

window.addEventListener('resize', resizeCanvas)

// cursor sparkles
function createSparks(x, y) {
  for (let i = 0; i < 4; i++) {
    const angle = Math.random() * Math.PI * 2
    const speed = Math.random() * 3 + 1

    sparks.push({
      x: x,
      y: y,
      px: x,
      py: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      size: Math.random() * 2 + 1,
      gravity: 0.04,
    })
  }
}

// mouse movement
document.addEventListener('mousemove', function (event) {
  createSparks(event.clientX, event.clientY)
})

// sparks
function animateSparks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  sparks.forEach(function (spark) {
    spark.px = spark.x
    spark.py = spark.y

    spark.x += spark.vx
    spark.y += spark.vy

    spark.vy += spark.gravity
    spark.vx *= 0.99

    spark.life -= 0.025

    ctx.beginPath()
    ctx.moveTo(spark.px, spark.py)
    ctx.lineTo(spark.x, spark.y)

    ctx.strokeStyle = `rgba(255, 190, 60, ${spark.life})`
    ctx.lineWidth = spark.size
    ctx.shadowBlur = 12
    ctx.shadowColor = '#ffae00'
    ctx.stroke()
  })

  // Remove sparks
  sparks = sparks.filter(function (spark) {
    return spark.life > 0
  })

  requestAnimationFrame(animateSparks)
}

// Start
animateSparks()
