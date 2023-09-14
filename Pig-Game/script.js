'use strict';

// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.new-game');
const btnRoll = document.querySelector('.roll-dice');
const btnhold = document.querySelector('.hold');

// Initiate the game
let scores, activePlayer, currentScore, playing;
const init = function () {
  playing = true;
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--active', 'player--winner');
};
init();

const switchPlayer = function () {
  // Reset current score
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  // Switch to the other player
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  activePlayer = activePlayer ? 0 : 1;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  // or
  // player0El.classList.toggle('player--active');
  // player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    // Get random dice number
    const dice = Math.trunc(Math.random() * 6 + 1);
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');

    if (dice === 1) switchPlayer();
    // Add dice number to current score
    else {
      currentScore += dice;
      // instead of checking for who is active player first
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

btnhold.addEventListener('click', function () {
  if (playing) {
    // Add the new score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check for if he wins
    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      playing = false;
      diceEl.classList.add('hidden');
    } else switchPlayer();
  }
});

btnNew.addEventListener('click', init);
