const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    slidesPerView: 1,
    pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
    },
    navigation: {
        nextEl: '.nextBig',
        prevEl: '.prevBig',
    },
    initialSlide: 1,
    centeredSlides: true,
});

const swiperCounterBochonkov = new Swiper('.counterBochonok', {
    direction: 'vertical',
    slidesPerView: 1,
    mousewheel: {
        sensitivity: 1,
        eventTarget: '.counterBochonok',
    },
    initialSlide: 0,
    nested: true,
})

const swiperCounterSpeed = new Swiper('.counterSpeed', {
    direction: 'vertical',
    slidesPerView: 1,
    mousewheel: {
        sensitivity: 1,
        eventTarget: '.counterBochonok',
    },
    initialSlide: 0,
    nested: true,
})

let namesSettings = document.querySelectorAll('.settings__block-names-p');

setInterval(function() {
    if (swiper.activeIndex == 0) {
        namesSettings[0].style.transform = 'scale(1.5)';
        namesSettings[0].style.filter = 'brightness(1)';
        namesSettings[1].style = '';
    } else if (swiper.activeIndex == 1) {
        namesSettings[0].style = '';
        namesSettings[2].style = '';
        namesSettings[1].style.transform = 'scale(1.5)';
        namesSettings[1].style.filter = 'brightness(1)';
    } else if (swiper.activeIndex == 2) {
        namesSettings[1].style = '';
        namesSettings[2].style.transform = 'scale(1.5)';
        namesSettings[2].style.filter = 'brightness(1)';
    }
}, 100)

let next = document.querySelector('.nextBig');
let prev = document.querySelector('.prevBig');

document.addEventListener('click', (event) => {
    if (event.target == namesSettings[0] && swiper.activeIndex == 1) {
        prev.click();
    } else if (event.target == namesSettings[0] && swiper.activeIndex == 2) {
        prev.click();
        prev.click();
        namesSettings[2].style = '';
    } else if (event.target == namesSettings[1] && swiper.activeIndex == 0) {
        next.click();
    } else if (event.target == namesSettings[1] && swiper.activeIndex == 2) {
        prev.click();
    } else if (event.target == namesSettings[2] && swiper.activeIndex == 1) {
        next.click();
    } else if (event.target == namesSettings[2] && swiper.activeIndex == 0) {
        next.click();
        next.click();
        namesSettings[0].style = '';
    }
})

let counterBochonkov;
let counterSpeed;

setInterval(() => {
    counterBochonkov = swiperCounterBochonkov.realIndex + 2;
    counterSpeed = swiperCounterSpeed.realIndex + 1;
}, 100)