const wordContainer = document.getElementById('wordContainer');
const gameContainer = document.getElementById('gameContainer');
const message = document.getElementById('message');
const stopwatch = document.createElement('div');
stopwatch.id = 'stopwatch';
document.body.insertBefore(stopwatch, wordContainer);

// 영어 단어와 한글 뜻의 매핑 목록을 30개로 정의합니다.
const wordList = [
    { english: 'wander', korean: '어슬렁거리다, 헤매다' },
    { english: 'wonder', korean: '궁금하다; 놀라움' },
    { english: 'heredity', korean: '유전 (형질)' },
    { english: 'heritage', korean: '유산' },
    { english: 'imitate', korean: '모방하다, 흉내 내다' },
    { english: 'initiate', korean: '시작하다, 창시하다' },
    { english: 'vacation', korean: '휴가' },
    { english: 'vocation', korean: '천직, 직업, 사명감' },
    { english: 'bald', korean: '벗어진, 대머리의' },
    { english: 'bold', korean: '대담한, 용감한' },
    { english: 'through', korean: '~을 통하여, ~을 지나서' },
    { english: 'thorough', korean: '철저한, 빈틈없는' },
    { english: 'marvel', korean: '놀라다; 놀라운 사람[물건]' },
    { english: 'marble', korean: '대리석; 구슬' },
    { english: 'assume', korean: '가정하다; 떠맡다' },
    { english: 'consume', korean: '소비하다, 다 써버리다' },
    { english: 'award', korean: '상, 상품; 수여하다' },
    { english: 'reward', korean: '보상; 보답하다' },
    { english: 'eliminate', korean: '제거하다, 삭제하다' },
    { english: 'illuminate', korean: '조명하다, 밝게 하다' },
    { english: 'statue', korean: '상, 조각상' },
    { english: 'status', korean: '지위, 신분' },
    { english: 'uninterested', korean: '무관심한, 관심 없는' },
    { english: 'disinterested', korean: '이해관계가 없는, 중립적인' },
    { english: 'affect', korean: '~에 영향을 미치다' },
    { english: 'effect', korean: '효력, 효과; ~을 초래하다' },
    { english: 'likewise', korean: '마찬가지로' },
    { english: 'otherwise', korean: '만약 그렇지 않으면' },
    { english: 'expire', korean: '만기가 되다, 만료되다' },
    { english: 'inspire', korean: '격려하다; 불어넣다, 영감을 주다' }
];

let currentWord = {};
let cardCount = 4; // 초기 카드 개수
let rounds = 0; // 진행된 라운드 수
const maxRounds = 20; // 최대 라운드 수
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
