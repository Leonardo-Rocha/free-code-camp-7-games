const square = document.querySelectorAll('.square');
const mole = document.querySelectorAll('.mole');
const speedUp = document.querySelector('#speed-up')
let score = document.querySelector('#score');
let timeLeft = document.querySelector('#time-left');
let highestScore = document.querySelector('#highest-score');

highestScore.textContent = localStorage['highestScore'] || '0'

let result = 0;
let currentTime = timeLeft.textContent

let moleSound = new Audio("mole_sound.mp3");
let hitSound = new Audio("punch.mp3")
moleSound.volume = .7;
hitSound.volume = .5;
let spawnInterval = 800;

let spawnTimerId = setInterval(randomSquare, spawnInterval);

let timerId = setInterval(countDown, 1000);

function randomSquare() {

    if(currentTime === 0)
        return;

    // clear moles
    square.forEach(className => {
        className.classList.remove('mole');
    })
    // add a random mole
    const randomIndex = Math.floor(Math.random() * 9);
    let randomPosition = square[randomIndex];
    randomPosition.classList.add('mole');
    moleSound.pause();
    moleSound.play();

    if (currentTime === 30) {
        speedUp.textContent = 'Time to speed up!!';
        spawnInterval = 650;
        spawnTimerId = setInterval(randomSquare, spawnInterval);
    }

    hitPosition = randomPosition.id
}

square.forEach(id => {
    id.addEventListener('mouseup', () => {
        if(id.id === hitPosition) {
            hitSound.pause();
            hitSound.play();
            result = result + 1;
            score.textContent = result;
        }
    })
})

function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;

    if(currentTime === 0) {
        clearInterval(timerId);
        let newHighScoreText = '';
        if(result > Number(highestScore.textContent)) {
            localStorage['highestScore'] = result.toString();
            newHighScoreText = 'It\'s a new highscore!';
        }
        alert(`TIME UP! Final Score: ${result}\n ${newHighScoreText}\nRefresh to play again!`);
    }
}
