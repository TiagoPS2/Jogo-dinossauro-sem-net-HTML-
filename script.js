const dino = document.querySelector('.dino')
const background = document.querySelector('.background')
let isJumping = false
let position = 0
const score = document.querySelector('#pontuacao')
var somPoint = document.getElementById('somPoint')
var somEnd = document.getElementById('somEnd')
function keyUp() {
  switch (event.keyCode) {
    case 32: //Espaco
      if (!isJumping) {
        jump()
      }
      break
    default:
      break
  }
}

function jump() {
  isJumping = true

  let upInterval = setInterval(() => {
    if (position >= 150) {
      // Descendo
      clearInterval(upInterval)
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval)
          isJumping = false
        } else {
          position -= 20
          dino.style.bottom = position + 'px'
        }
      }, 20)
    } else {
      // Subindo
      position += 20
      dino.style.bottom = position + 'px'
    }
  }, 20)
}
function creatCactus() {
  const cactus = document.createElement('div')
  let cactusPosition = 1000
  let randomTime = Math.random() * 6500
  cactus.classList.add('cactus')
  cactus.style.left = 1000 + 'px'
  background.appendChild(cactus)

  let leftInterval = setInterval(() => {
    if (cactusPosition < -60) {
      scorePoint()
      clearInterval(leftInterval)
      background.removeChild(cactus)
    }
    if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      //Game over
      clearInterval(leftInterval)
      gameOver()
    } else {
      cactusPosition -= 10
      cactus.style.left = cactusPosition + 'px'
    }
  }, 25)

  setTimeout(creatCactus, randomTime)
}
creatCactus()
document.addEventListener('keyup', keyUp)
let ponto = 1

function scorePoint() {
  score.innerHTML = `PONTOS: ${ponto}`
  somPoint.play()
  ponto++
}
function gameOver() {
  document.body.innerHTML = '<h1 class="game-over" >Fim de jogo</h1>'
  document.body.innerHTML +=
    '<button class="start-button" onclick="playGame()">PLAY</button>'
}
function playGame() {
  window.location.reload()
}
