const wordContainer = document.getElementById('wordContainer');
const gameContainer = document.getElementById('gameContainer');
const message = document.getElementById('message');
const stopwatch = document.createElement('div');
stopwatch.id = 'stopwatch';
document.body.insertBefore(stopwatch, wordContainer);

// 영어 단어와 한글 뜻의 매핑 목록을 20개로 정의합니다.
const wordList = [
    { english: 'apple', korean: '사과' },
    { english: 'banana', korean: '바나나' },
    { english: 'cherry', korean: '체리' },
    { english: 'date', korean: '대추' },
    { english: 'elderberry', korean: '엘더베리' },
    { english: 'fig', korean: '무화과' },
    { english: 'grape', korean: '포도' },
    { english: 'honeydew', korean: '허니듀' },
    { english: 'kiwi', korean: '키위' },
    { english: 'lemon', korean: '레몬' },
    { english: 'mango', korean: '망고' },
    { english: 'nectarine', korean: '천도복숭아' },
    { english: 'orange', korean: '오렌지' },
    { english: 'papaya', korean: '파파야' },
    { english: 'quince', korean: '모과' },
    { english: 'raspberry', korean: '산딸기' },
    { english: 'strawberry', korean: '딸기' },
    { english: 'tangerine', korean: '귤' },
    { english: 'ugli fruit', korean: '우글리프루트' },
    { english: 'watermelon', korean: '수박' }
];

let currentWord = {};
let cardCount = 4; // 초기 카드 개수
let rounds = 0; // 진행된 라운드 수
const maxRounds = 5; // 최대 라운드 수
let timerInterval; // 스톱워치 인터벌
let totalTime = 0; // 총 경과 시간 (초 단위)

function startGame() {
    if (rounds >= maxRounds) {
        endGame();
        return;
    }

    gameContainer.innerHTML = '';
    message.innerText = '';
    
    // 랜덤 단어 선택
    currentWord = wordList[Math.floor(Math.random() * wordList.length)];
    wordContainer.innerText = currentWord.korean;

    // 랜덤 위치에 정답을 포함하여 카드 생성
    const shuffledWords = shuffleArray([...wordList.map(word => word.english)]);
    const correctIndex = Math.floor(Math.random() * cardCount);
    shuffledWords[correctIndex] = currentWord.english;

    // 카드 생성 및 추가
    for (let i = 0; i < cardCount; i++) {
        const word = shuffledWords[i % shuffledWords.length]; // 카드 개수가 단어 개수보다 많을 경우 순환 사용
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerText = word;
        card.addEventListener('click', () => checkGuess(word));
        gameContainer.appendChild(card);
    }

    // 카드 컨테이너의 grid template 설정 (가로와 세로가 같도록)
    const gridSize = Math.ceil(Math.sqrt(cardCount));
    gameContainer.style.gridTemplateColumns = `repeat(${gridSize}, 100px)`;
    gameContainer.style.gridTemplateRows = `repeat(${gridSize}, 50px)`;

    // 스톱워치 시작
    startStopwatch();
}

function checkGuess(word) {
    if (word === currentWord.english) {
        message.innerText = '정답입니다!';
        cardCount++; // 정답을 맞출 때마다 카드 개수 증가
        rounds++; // 라운드 수 증가
        setTimeout(startGame, 0); // 0초 후 새로운 게임 시작
    } else {
        message.innerText = '오답입니다. 패널티 +5초!';
        totalTime += 5; // 틀릴 때마다 5초 증가
    }
}

function endGame() {
    clearInterval(timerInterval);
    message.innerText = `Game over! You completed ${maxRounds} rounds in ${totalTime} seconds.`;
    wordContainer.innerText = '';
    gameContainer.innerHTML = '';
    const restartButton = document.createElement('button');
    restartButton.innerText = 'Restart Game';
    restartButton.onclick = restartGame;
    document.body.appendChild(restartButton);
}

function restartGame() {
    cardCount = 4; // 카드 개수 초기화
    rounds = 0; // 라운드 수 초기화
    totalTime = 0; // 총 시간 초기화
    message.innerText = '';
    document.querySelector('button').remove(); // 재시작 버튼 제거
    startGame();
}

function startStopwatch() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        totalTime++;
        stopwatch.innerText = `Time: ${totalTime} seconds`;
    }, 1000);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 게임 시작 시 새로운 게임 설정
startGame();
