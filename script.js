const images = [
  'images/1.jpeg', 'images/1.jpeg',
  'images/2.jpeg', 'images/2.jpeg',
  'images/3.jpeg', 'images/3.jpeg',
  'images/4.jpeg', 'images/4.jpeg',
  'images/5.jpeg', 'images/5.jpeg',
  'images/6.jpeg', 'images/6.jpeg',
  'images/7.jpeg', 'images/7.jpeg',
  'images/8.jpeg', 'images/8.jpeg', 'images/9.jpeg', 'images/9.jpeg', 'images/10.jpeg', 'images/10.jpeg', 'images/11.jpeg', 'images/11.jpeg'
];

let flippedCards = [];
let matchedCards = 0;
const totalCards = images.length;

function startGame() {
  // Embaralha as imagens
  const shuffledImages = shuffle([...images]);

  // Resetando o tabuleiro e variáveis
  flippedCards = [];
  matchedCards = 0;
  const gameBoard = document.getElementById('gameBoard');
  gameBoard.innerHTML = '';

  // Criando o tabuleiro
  shuffledImages.forEach(imageSrc => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.image = imageSrc;

      const img = document.createElement('img');
      img.src = imageSrc;

      card.appendChild(img);
      card.addEventListener('click', flipCard);

      gameBoard.appendChild(card);
  });
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function flipCard(event) {
  const clickedCard = event.target;

  // Impede de virar a carta se já foi virada ou se há 2 cartas viradas
  if (flippedCards.length === 2 || clickedCard.classList.contains('flipped')) {
      return;
  }

  clickedCard.classList.add('flipped');
  flippedCards.push(clickedCard);

  if (flippedCards.length === 2) {
      checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.image === card2.dataset.image) {
      matchedCards++;
      flippedCards = [];

      if (matchedCards === totalCards / 2) {
          setTimeout(() => {
              alert('Você venceu!');
              startGame();
          }, 500);
      }
  } else {
      setTimeout(() => {
          card1.classList.remove('flipped');
          card2.classList.remove('flipped');
          flippedCards = [];
      }, 1000);
  }
}

// Inicia o jogo
startGame();
