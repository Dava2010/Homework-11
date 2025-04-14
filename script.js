//ждет пока html файл загрузится
document.addEventListener("DOMContentLoaded", () => {
    //добавляет новые карточки
    const gameContainer = document.querySelector(".game-container");
    const emojis = ["😊", "😂", "😍", "😎", "😇", "😜", "🥳", "😌"];
    let flippedCards = [];
    let matchedCards = [];
    let lockBoard = false;

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function createCards() {
        const pairs = shuffle([...emojis, ...emojis]);

        pairs.forEach(smiley => {
            const card = document.createElement("div");
            card.classList.add("card");

            const front = document.createElement("div");
            front.classList.add("card-front");

            const back = document.createElement("div");
            back.classList.add("card-back");
            back.textContent = smiley;

            card.appendChild(front);
            card.appendChild(back);

            gameContainer.appendChild(card);

            card.addEventListener("click", () => flipCard(card));
        });
    }
//помогает контролировать карточки во время переворачивания
    function flipCard(card) {
        if (lockBoard || card.classList.contains("flipped")) return;

        card.classList.add("flipped");
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            lockBoard = true;
            checkMatch();
        }
    }

//проверяет обратные стороны карточек
    function checkMatch() {
        const [card1, card2] = flippedCards;
        const emoji1 = card1.querySelector(".card-back").textContent;
        const emoji2 = card2.querySelector(".card-back").textContent;

        if (emoji1 === emoji2) {
            matchedCards.push(card1, card2);
            resetTurn();
        } else {
            setTimeout(() => {
                card1.classList.remove("flipped");
                card2.classList.remove("flipped");
                resetTurn();
            }, 1000);
        }
    }

    function resetTurn() {
        flippedCards = [];
        lockBoard = false;

        if (matchedCards.length === 20) {
            setTimeout(() => alert("🎉 Поздравляем! Вы нашли все пары!"), 500);
        }
    }

    createCards();
});

const timerElement = document.querySelector(".timer");
let seconds = 0;
let timerInterval;

function startTimer() {
  timerInterval = setInterval(() => {
    seconds++;
    timerElement.textContent = `Время: ${seconds} сек`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}startTimer();

