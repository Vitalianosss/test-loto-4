const musicPlayer = document.querySelector('.music-player');

const progress = document.querySelector('.music-player-range');
const controls = document.querySelectorAll('.control-arrow');
const playPause = document.querySelector('.control-play');

const controlLeft = controls[0];
const controlRight = controls[1];

const musicTitle = document.querySelector('.music-title-p');

const musicRepeatBlock = document.querySelector('.music_repeat');
const musicRepeat = document.querySelectorAll('.music_repeat-image');
let musicRepeatOff = musicRepeat[0];
let musicRepeatOn = musicRepeat[1];

const musicPlayerPhoto = document.querySelector('.music-player-photo-img');

const musicPlayerOpen = document.querySelector('.music_player-open');
const musicPlayerOpenIcons = musicPlayerOpen.querySelectorAll('.music_player-open-image');
const musicPlayerOpenPlayer = musicPlayerOpenIcons[0];
const musicPlayerOpenArrow = musicPlayerOpenIcons[1];

const musicPlayerLeft = document.querySelector('.music-player-photo');
const musicPlayerRight = document.querySelector('.music-right-content');

musicPlayer.style.overflow = 'hidden';
musicPlayerLeft.style.transform = 'translate(0, 200px)';
musicPlayerRight.style.transform = 'translate(-100%, 0)';
musicPlayerRight.style.opacity = '0';

const musicPlaylist = [
    {
        name: 'Neffex - GO',
        src: 'audio/music/GO.mp3',
        image: 'images/player/go neffex.jpg'
    },
    {
        name: 'Lil Peep - Just In Case (prod. Cryoutloud)',
        src: 'audio/music/Lil Peep - Just In Case (prod. Cryoutloud).mp3',
        image: 'images/player/just in case.jpg'
    },
    {
        name: 'Lil Peep x Pixies x Bones x SuicideBoyS - WHERE IS MY MIND',
        src: 'audio/music/LiL PEEP - WHERE IS MY MIND.mp3',
        image: 'images/player/where is my mind.jpg'
    }
];

musicPlayerPhoto.setAttribute('src', musicPlaylist[0].image);

let musicRepeatCounter = 0;
musicRepeatOn.style.display = 'none';

musicRepeatBlock.addEventListener('click', () => {
    musicRepeatCounter++;
    if (musicRepeatCounter % 2 !== 0) {
        musicRepeatOff.style.display = 'none';
        musicRepeatOn.style.display = 'block';
    } else if (musicRepeatCounter % 2 == 0) {
        musicRepeatOn.style.display = 'none';
        musicRepeatOff.style.display = 'block';
    }
})

let musicPlaylistCounter = 0;

let song = new Audio();
song.src = musicPlaylist[0].src;
musicTitle.innerHTML = musicPlaylist[0].name;

let playCounter = 0;

function playPauseCommand() {
    if (playCounter % 2 !== 0) {
        song.play();
        playPause.style.backgroundColor = range.style.accentColor;
    } else {
        song.pause();
        playPause.style.backgroundColor = '';
    }
}

controlLeft.addEventListener('click', () => {
    --musicPlaylistCounter;
    musicPlaylistCounterOgr();
    song.src = musicPlaylist[musicPlaylistCounter].src;
    musicPlayerPhoto.setAttribute('src', musicPlaylist[musicPlaylistCounter].image);
    musicTitle.innerHTML = musicPlaylist[musicPlaylistCounter].name;
    nextMusic();
    playPauseCommand();
});
controlRight.addEventListener('click', () => {
    ++musicPlaylistCounter;
    musicPlaylistCounterOgr();
    song.src = musicPlaylist[musicPlaylistCounter].src;
    musicPlayerPhoto.setAttribute('src', musicPlaylist[musicPlaylistCounter].image);
    musicTitle.innerHTML = musicPlaylist[musicPlaylistCounter].name;
    nextMusic();
    playPauseCommand();
});

function musicPlaylistCounterOgr() {
    if (musicPlaylistCounter > musicPlaylist.length - 1) {
        musicPlaylistCounter = 0;
    } else if (musicPlaylistCounter < 0) {
        musicPlaylistCounter = musicPlaylist.length - 1;
    }
}

function nextMusic() {
    if (song.play()) {
        playCounter = 1;
    }
}

song.onloadedmetadata = function() {
    progress.max = song.duration;
    progress.value = song.currentTime;
    musicVolumeRange.max = 100;
    musicVolumeRange.value = song.volume * 100;
}

playPause.addEventListener('click', () => {
    ++playCounter;
    playPauseCommand();
})

if (song.play()) {
    setInterval(() => {
        progress.value = song.currentTime;
    }, 500)
}

progress.onchange = function() {
    song.play();
    song.currentTime = progress.value;
    playPauseCommand();
}

buttonPlay.addEventListener('click', () => {
    if (checkboxMusic.innerHTML == '') {
        musicPlayer.style.display = 'none';
        musicPlayerOpen.style.display = 'none';
    } else if (checkboxMusic.innerHTML !== '') {
        musicPlayer.style.display = 'flex';
        musicPlayerOpen.style.display = 'flex';
    }
})

const musicVolume = document.querySelector('.music_volume');
const musicVolumeRange = document.querySelector('.music_volume-range');
const musicVolumeImage = document.querySelectorAll('.music_volume-img');

musicVolume.addEventListener('mouseenter', () => {
    musicVolumeRange.classList.add('music_volume-range-active');
})

musicVolume.addEventListener('mouseleave', (event) => {
    if (event.target == musicVolume || event.target == musicVolumeRange) {
        musicVolumeRange.classList.remove('music_volume-range-active');
    }
})

setInterval(() => {
    song.volume = musicVolumeRange.value / 100;
    if (song.volume == 0) {
        musicVolumeImage[0].style.display = 'none';
        musicVolumeImage[1].style.display = 'block';
    } else {
        musicVolumeImage[1].style.display = 'none';
        musicVolumeImage[0].style.display = 'block';
    }
    if (song.currentTime == progress.max) {
        playCounter++;
        playPauseCommand();
    }
}, 100);

let musicVolumeCounter = 0;
var musicVolumeRangeValue;
musicVolumeImage.forEach(item => {
    item.addEventListener('click', () => {
        musicVolumeCounter++;
        if (musicVolumeCounter % 2 !== 0) {
            musicVolumeRangeValue = musicVolumeRange.value;
            musicVolumeRange.value = 0; 
        } else if (musicVolumeCounter % 2 == 0) {
            musicVolumeRange.value = musicVolumeRangeValue;
        }
    })
})

setInterval(() => {
    if (musicRepeatCounter % 2 !== 0) {
        if (song.currentTime == progress.max) {
            progress.value = 0;
            musicPlaylistCounterOgr();
            playPauseCommand();
        }
    } else {
        if (song.currentTime == progress.max) {
            ++musicPlaylistCounter;
            musicPlaylistCounterOgr();
            song.src = musicPlaylist[musicPlaylistCounter].src;
            musicPlayerPhoto.setAttribute('src', musicPlaylist[musicPlaylistCounter].image);
            musicTitle.innerHTML = musicPlaylist[musicPlaylistCounter].name;
            nextMusic();
            playPauseCommand();
        }
    }
}, 100);


let musicPlayerOpenCounter = 0;
musicPlayerOpen.addEventListener('click', () => {
    if (musicPlayerOpenCounter == 0) {
        musicPlayerLeft.style.transform = '';
        musicPlayerOpen.style.transform = 'translate(650px, 0)';
        musicPlayerOpenPlayer.style.display = 'none';
        musicPlayerOpenArrow.style.rotate = '-90deg';
        setTimeout(() => {
            musicPlayerRight.style.opacity = '1';
            musicPlayerRight.style.transform = '';
            musicPlayerLeft.style.borderRadius = '50%';
            setTimeout(() => {
                musicPlayer.style.overflow = '';
            }, 500)
        }, 500)
        musicPlayerOpenCounter++;
    } else {
        musicPlayer.style.overflow = 'hidden';
        musicPlayerRight.style.opacity = '0';
        musicPlayerRight.style.transform = 'translate(-100%, 0)';
        musicPlayerLeft.style.borderRadius = '';
        setTimeout(() => {
            musicPlayerLeft.style.transform = 'translate(0, 200px)';
            musicPlayerOpen.style.transform = '';
            musicPlayerOpenArrow.style.rotate = '';
            setTimeout(() => {
                musicPlayerOpenPlayer.style.display = '';
            }, 200);
        }, 500)
        musicPlayerOpenCounter--;
    }
});

const musicTitleBlock = document.querySelector('.music-title');
let musicTitleWidth;
const musicTitleWidthBig = musicTitleBlock.clientWidth;
let musicTitleTime;
const musicTitleTimeBig = musicTitleWidthBig / 15;

//var resetTimer;
var animationCounter = 0;

function resetTitle() {
    musicTitle.style.transition = ``;
    animationCounter = 0;
    musicTitle.style.transform = ``;
    musicTitleWidth = musicTitle.clientWidth;
    musicTitleTime = musicTitleWidth / 15;
    setTimeout(() => {
        titleAnimationFirst();
    }, 1000);
}

//var timer;

musicPlayerOpen.addEventListener('click', resetTitle);
controlLeft.addEventListener('click', resetTitle);
controlRight.addEventListener('click', resetTitle);

//var firstTimer;
//var secondTimer;
//var thirdTimer;

/*function titleAnimation() {
    if (animationCounter == 0) {
        animationCounter = 1;
        musicTitle.style.transition = `all ${musicTitleTime}s linear 0s`;
        musicTitle.style.transform = `translate(-${musicTitleWidth}px, 0)`;
        console.log('первый заход')
        setTimeout(() => {
            musicTitle.style.transition = ``;
            musicTitle.style.transform = `translate(${musicTitleWidthBig}px, 0)`;
            console.log('после первого захода')
            setTimeout(() => {
                musicTitle.style.transition = `all ${musicTitleTimeBig + musicTitleTime}s linear 0s`;
                musicTitle.style.transform = `translate(-${musicTitleWidth}px, 0)`;
                console.log('второй заход')
                setTimeout(() => {
                    titleAnimationTwo();
                }, (musicTitleTimeBig + musicTitleTime) * 1000);
            }, 100)
        }, musicTitleTime * 1000);
    } else if (animationCounter > 0) {
        musicTitle.style.transition = ``;
        musicTitle.style.transform = `translate(${musicTitleWidthBig}px, 0)`;
        console.log('после второго захода')
        setTimeout(() => {
            musicTitle.style.transition = `all ${musicTitleTimeBig + musicTitleTime}s linear 0s`;
            musicTitle.style.transform = `translate(-${musicTitleWidth}px, 0)`;
            console.log('заход второй функции')
            setTimeout(() => {
                titleAnimationTwo();
            }, (musicTitleTimeBig + musicTitleTime) * 1000);
        }, 100)
    }
}

function titleAnimationTwo() {
    console.log('тайтл анимэйшн')
    titleAnimation();
}*/

    function titleAnimationFirst() {
        musicTitle.style.transition = `all ${musicTitleTime}s linear 0s`;
        musicTitle.style.transform = `translate(-${musicTitleWidth}px, 0)`;
        setTimeout(() => {
            titleAnimationSecond();
        }, musicTitleTime * 1000);
    }
    
    function titleAnimationSecond() {
        musicTitle.style.transition = ``;
        musicTitle.style.transform = `translate(${musicTitleWidthBig}px, 0)`;
        setTimeout(() => {
            titleAnimationThird()
        }, 100)
    }
    
    function titleAnimationThird() {
        musicTitle.style.transition = `all ${musicTitleTimeBig + musicTitleTime}s linear 0s`;
        musicTitle.style.transform = `translate(-${musicTitleWidth}px, 0)`;
        setTimeout(() => {
            titleAnimationSecond();
        }, (musicTitleTimeBig + musicTitleTime) * 1000);
    }

/*controlLeft.addEventListener('click', () => {
    resetTitle();
    setTimeout(() => {
        clearTimeout(resetTimer)
    }, 1000)
    clearTimeout(firstTimer);
    clearTimeout(timer);
    clearTimeout(secondTimer);
    clearTimeout(thirdTimer);
});
controlRight.addEventListener('click', () => {
    resetTitle();
    setTimeout(() => {
        clearTimeout(resetTimer)
    }, 1000)
    clearTimeout(firstTimer);
    clearTimeout(timer);
    clearTimeout(secondTimer);
    clearTimeout(thirdTimer);
});*/