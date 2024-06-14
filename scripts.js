const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const wrapper = $('.wrapper');
const successBlock = $('.success');
const loseBlock = $('.lose');

var numbers = $('.wrapper__numbers');
var numberItem = $$('.wrapper__numbers-item');
let numberItemText = $$('.wrapper__numbers-item-p');

const cards = $('.wrapper__card');
const cardItem = $$('.wrapper__card-block');
let cardItemText = $$('.wrapper__card-block-p');

const button = $('.button');

const audioClick = new Audio();
audioClick.src = 'audio/пустое нажатие.wav';

const audioError = new Audio();
audioError.src = 'audio/ошибка.wav';

const audioSuccess = new Audio();
audioSuccess.src = 'audio/кружочек.mp3';

const audioStartGame = new Audio();
audioStartGame.src = 'audio/кнопка старта.wav';

const audioWin = new Audio();
audioWin.src = 'audio/победа.mp3';

const audioLose = new Audio();
audioLose.src = 'audio/проигрыш.mp3';

const audioBochonok = new Audio();
audioBochonok.src = 'audio/бочонок.wav';

Array.prototype.sample = function(){
    return this[Math.floor(Math.random()*this.length)];
}

function randomize(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randomizeBlock(array, number) {
    randoms(array);
    function randoms(array) {
        let minusCounter = 0;
            array.forEach(item => {
            let random = randomize(-number, number);
            if (random <= 0) {
                item.textContent = '';
            } else {
                item.textContent = random;
            }
        })
        array.forEach(item => {
            if (item.textContent == '') {
                minusCounter++;
            }
        })
        threeCounter(minusCounter);
    }
    function threeCounter(minusCounter) {
        if (minusCounter == 3) randoms(array);
    }
}


function randomizeBlockBig(array, number) {
    randomsBig(array);
    function randomsBig(array) {
        let minusCounter = 0;
        array.forEach(item => {
            let randomArray = [randomize(-number, -number + 10), randomize(number - 10, number)];
            let random = randomArray.sample();
            if (random <= 0) {
                item.textContent = '';
            } else {
                item.textContent = random;
            }
        })
        array.forEach(item => {
            if (item.textContent == '') {
                minusCounter++;
            }
        })

        if (minusCounter == 3) {
            randomsBig(array)
        }
    }
}

randomizeBlock([cardItemText[0], cardItemText[9], cardItemText[18]], 10);
randomizeBlockBig([cardItemText[1], cardItemText[10], cardItemText[19]], 20);
randomizeBlockBig([cardItemText[2], cardItemText[11], cardItemText[20]], 30);
randomizeBlockBig([cardItemText[3], cardItemText[12], cardItemText[21]], 40);
randomizeBlockBig([cardItemText[4], cardItemText[13], cardItemText[22]], 50);
randomizeBlockBig([cardItemText[5], cardItemText[14], cardItemText[23]], 60);
randomizeBlockBig([cardItemText[6], cardItemText[15], cardItemText[24]], 70);
randomizeBlockBig([cardItemText[7], cardItemText[16], cardItemText[25]], 80);
randomizeBlockBig([cardItemText[8], cardItemText[17], cardItemText[26]], 91);

var randomSize = [];
let bollsArray = [];
for (let i = 1; i <= 90; i++) {
    randomSize.push(i);
}

numberItemText = [];

let counterClick = 0;

button.addEventListener('click', () => {
    counterClick++;
    if (counterClick < 2) {
        setInterval(createBoll, counterSpeed * 1000);
    }
    if (checkboxSound.innerHTML !== '') {
        audioStartGame.play();
    }
    button.style.display = 'none';
})

let bollObjects = [];
let newNumberItemText = [];
let bollCounter = 0;

let counterCardItem = 0;
let counterCardItemSuccess = 0;
cardItemText.forEach(item => {
    if (item.textContent.length > 0) {
        counterCardItem++;
    }
})

function createBoll() {
    let boll = randomSize.sample();
    numberItemText.push(boll);
    bollCounter++;

    let div = document.createElement('div');
    let p = document.createElement('p');

    if (bollCounter <= 90) {
        div.classList.add('wrapper__numbers-item');
        p.classList.add('wrapper__numbers-item-p');
        p.innerHTML = boll;
    } else {
        div.classList.style.visibility = 'hidden';
        div.classList.add('wrapper__numbers-item');
        p.classList.add('wrapper__numbers-item-p');
        p.innerHTML = ' ';
    }

    div.appendChild(p);
    numbers.appendChild(div);
    if (checkboxSound.innerHTML !== '') {
        audioBochonok.play();
    }

    if (numbers.children.length > counterBochonkov || bollCounter > 90) {
        numbers.firstElementChild.remove();
    }
    
    if (numberItemText.length > counterBochonkov) { 
        newNumberItemText.push(Number(numberItemText.splice(0, 1).join()));

        cardItemText.forEach(item => {
            newNumberItemText.forEach(i => {
                if (item.textContent == i) {
                    item.style.color = 'red';
                }
            })
        })

        numberItemText.forEach(element => {
            cardItemText.forEach(item => {
                item.addEventListener('click', () => {
                    if (item.textContent == element && item.style.color !== 'red') {
                        const circle = document.createElement('div');
                        circle.classList.add('circle');
                        item.insertAdjacentElement('beforebegin', circle);
                        item.textContent = '';
                        counterCardItemSuccess++;
                        if (checkboxSound.innerHTML !== '') {
                            audioSuccess.play();
                        }
                    }
                })
            })
        })
    } else {
        numberItemText.forEach(element => {
            cardItemText.forEach(item => {
                item.addEventListener('click', () => {
                    if (item.textContent == element) {
                        const circle = document.createElement('div');
                        circle.classList.add('circle');
                        item.insertAdjacentElement('beforebegin', circle);
                        item.textContent = '';
                        counterCardItemSuccess++;
                        if (checkboxSound.innerHTML !== '') {
                            audioSuccess.play();
                        }
                    }
                })  
            })
        })
    }

    let bollIndex;
    bollIndex = randomSize.indexOf(boll);
    randomSize.splice(bollIndex, 1);

    if (bollCounter > 90 + counterBochonkov) {
        clearInterval(setInterval(createBoll, counterSpeed * 1000));
        song.pause();
    }
    if (wrapper.style.filter == 'blur(10px)') {
        clearInterval(setInterval(createBoll, counterSpeed * 1000));
        song.pause();
    }

    if (checkboxLight.innerHTML !== '') {
        numberItemText.forEach(element => {
            cardItemText.forEach(item => {
                if (item.textContent == element && item.style.color !== 'red') {
                    item.style.backgroundColor = rangeLight.style.accentColor;
                }
                if (item.style.color == 'red') {
                    item.style.backgroundColor = '';
                }
            })
        })
    }
}

let counterWin = 0;
let counterLose = 0;

setInterval(function counterCardSuccess() {
    if (counterCardItem == counterCardItemSuccess) {
        wrapper.style.filter = 'blur(10px)';
        successBlock.style.display = 'flex';
        if (checkboxSound.innerHTML !== '' && counterWin == 0) {
            audioWin.play();
            counterWin++;
        }
    }
}, 10)

setInterval(() => {
    if (bollCounter > 90 + counterBochonkov && counterCardItem !== counterCardItemSuccess) {
        wrapper.style.filter = 'blur(10px)';
        loseBlock.style.display = 'flex';
        if (checkboxSound.innerHTML !== '' && counterLose == 0) {
            audioLose.play();
            counterLose++;
        }
    }
}, 10)

setInterval(function errorAnimation() {
    cardItemText.forEach(item => {
        item.addEventListener('click', () => {
            if (item.style.color == 'red') {
                if (checkboxSound.innerHTML !== '') {
                    audioError.play();
                }
                item.style.animation = 'error .4s normal ease-in-out 0s';
            }
        })
    })
    cardItemText.forEach (item => item.style.animation = '');
}, 400)

setInterval(() => {
    cardItemText.forEach(item => {
        item.addEventListener('click', () => {
            if (item.textContent == '') {
                item.style.backgroundColor = '';
            }
        })
    })
}, 100);

const menu = $('.menu');
const menuBlock = $('.menu__block');
const buttonPlay = $('.menu__block-play');
const buttonSettings = $('.menu__block-settings');

buttonPlay.addEventListener('click', () => {
    menu.style.transform = 'translate(0, 1080px)';
    menu.style.opacity = '0';
    menuBlock.style.transform = 'translate(0, -2060px)';
})

const range = $('.theme-color');
const rangeLight = $('.light-color');
rangeLight.value = 0;
range.value = 0;
setInterval(function() {
    if (range.value < 20) {
        range.style.accentColor = '#fe7971';
    } else if (range.value >=20 && range.value < 40) {
        range.style.accentColor = 'rgb(195, 0, 255)';
    } else if (range.value >=40 && range.value < 60) {
        range.style.accentColor = 'rgb(0, 255, 213)';
    } else if (range.value >=60 && range.value < 80) {
        range.style.accentColor = 'rgb(234, 255, 0)';
    } else {
        range.style.accentColor = 'rgb(255, 162, 0)';
    }
    
    document.documentElement.style.setProperty('--swiper-theme-color', range.style.accentColor);
    document.documentElement.style.setProperty('--color-orange-background', range.style.accentColor);

    if (rangeLight.value < 25) {
        rangeLight.style.accentColor = '#fe7971';
    } else if (rangeLight.value >=25 && rangeLight.value < 50) {
        rangeLight.style.accentColor = 'rgb(0, 255, 213)';
    } else if (rangeLight.value >=50 && rangeLight.value < 75) {
        rangeLight.style.accentColor = 'rgb(234, 255, 0)';
    } else {
        rangeLight.style.accentColor = '#ffffff';
    }
}, 10);

const settings = $('.settings');
const settingsBack = $('.settings_back');
settings.style.display = 'none';
settingsBack.style.display = 'none';
settingsBack.addEventListener('click', () => {
    settings.style.display = 'none';
    settingsBack.style.display = 'none';
})

buttonSettings.addEventListener('click', () => {
    settings.style.display = 'flex';
    settingsBack.style.display = 'flex';
})

const checkboxSound = $('.checkbox-emulator-sound');
const checkboxMusic = $('.checkbox-emulator-music');
const checkboxLight = $('.checkbox-emulator-light');

checkboxSound.innerHTML = '';
checkboxMusic.innerHTML = '';
checkboxLight.innerHTML = '';

let checkboxMusicCounter = 0;
let checkboxSoundCounter = 0;
let checkboxLightCounter = 0;

document.addEventListener('click', (event) => {
    if (event.target == checkboxSound) {
        ++checkboxSoundCounter;
        if (checkboxSoundCounter % 2 !== 0) {
            checkboxSound.innerHTML = '✔';
            checkboxSound.style.borderColor = range.style.accentColor;
        } else {
            checkboxSound.innerHTML = '';
            checkboxSound.style.borderColor = '';
        }
    } else if (event.target == checkboxMusic) {
        ++checkboxMusicCounter;
        if (checkboxMusicCounter % 2 !== 0) {
            checkboxMusic.innerHTML = '✔';
            checkboxMusic.style.borderColor = range.style.accentColor;
        } else {
            checkboxMusic.innerHTML = '';
            checkboxMusic.style.borderColor = '';
        }
    } else if (event.target == checkboxLight) {
        ++checkboxLightCounter;
        if (checkboxLightCounter % 2 !== 0) {
            checkboxLight.innerHTML = '✔';
            checkboxLight.style.borderColor = range.style.accentColor;
        } else {
            checkboxLight.innerHTML = '';
            checkboxLight.style.borderColor = '';
        }
    }
})