'use strict';

const score0Element = document.getElementById("score--0");
const score1Element = document.getElementById("score--1");
const diceElement = document.querySelector(".dice");
const buttonNew = document.querySelector(".btn--new");
const buttonRoll = document.querySelector(".btn--roll");
const buttonHold = document.querySelector(".btn--hold");
const currentScorePlayer0Element = document.getElementById("current--0");
const currentScorePlayer1Element = document.getElementById("current--1");
const player0Element = document.querySelector(".player--0");
const player1Element = document.querySelector(".player--1");

//Starting conditions
// score0Element.textContent = 0;
// score1Element.textContent = 0;
// diceElement.classList.add("hidden");

// const scores = [0, 0];
// let currentScore = 0;
// let activePlayer = 0;
// let playing = true;

//////// COURSE SOLUTION

let scores, currentScore, activePlayer, playing;
const init = () => {
   scores = [0, 0];
   currentScore = 0;
   activePlayer = 0;
   playing = true;

   score0Element.textContent = 0;
   score1Element.textContent = 0;
   currentScorePlayer0Element.textContent = 0;
   currentScorePlayer1Element.textContent = 0;

   diceElement.classList.add("hidden");
   player0Element.classList.remove("player--winner");
   player1Element.classList.remove("player--winner");
   player0Element.classList.add("player--active");
   player1Element.classList.remove("player--active");
   // document.querySelector(".btn--hold").disabled = false;
}
init();

const switchPlayer = () => {
   document.getElementById(`current--${activePlayer}`).textContent = 0;
   currentScore = 0;
   activePlayer = activePlayer === 0 ? 1 : 0;
   player0Element.classList.toggle("player--active");
   player1Element.classList.toggle("player--active");
};

// Rolling the dice

buttonRoll.addEventListener("click", function () {
   if (playing) {
      // Generate a random dice roll
      const dice = Math.floor(Math.random() * 6) + 1

      // Display dice
      diceElement.classList.remove("hidden");
      diceElement.src = `dice-${dice}.png`
      console.log(activePlayer);

      // Check if rolled 1: if true switch player
      if (dice !== 1) {
         currentScore += dice
         document.getElementById(`current--${activePlayer}`).textContent = currentScore;

      } else {
         switchPlayer();
      }
   }
})

buttonHold.addEventListener("click", function () {
   if (playing) {
      scores[activePlayer] += currentScore;
      // Add current score to active player's score
      document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
   }
   // Check of score is >= 50
   if (scores[activePlayer] >= 50) {
      playing = false;
      diceElement.classList.add("hidden");
      document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
      document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
      // document.querySelector(".btn--hold").disabled = true;
   } else {
      switchPlayer();
   }
})

buttonNew.addEventListener("click", init)