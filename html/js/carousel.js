var w = window.innerWidth;

var mobileEnabled = false;

var autoFreq = 3;
var slideInterval = setInterval(0);

var state = 0;

/**
 * DOM Element Bindings
 */
var carousel = document.getElementsByClassName('carousel')[0];
var slides = document.getElementsByClassName('carousel-slide');
var breadcrumbs = document.getElementsByClassName('carousel-breadcrumbs')[0].children;

var leftHotzone = document.getElementsByClassName('carousel-hotzone-left')[0];
var rightHotzone = document.getElementsByClassName('carousel-hotzone-right')[0];

/**
 * Swipe events
 */

var hammertime = new Hammer(carousel);

hammertime.on('swipeleft', function(ev) {
    increaseState();
    resetAutoToggle();
});

hammertime.on('swiperight', function(ev) {
    decreaseState();
    resetAutoToggle();
});

/**
 * UI Event Bindings
 * DEPRECATED in favour of swipe events
 */

// leftHotzone.addEventListener('touchstart', function(){
//     decreaseState();
//     resetAutoToggle();
// });
//
// rightHotzone.addEventListener('touchstart', function(){
//     increaseState();
//     resetAutoToggle();
// });

/**
 * Error checking
 */
if (slides.length != breadcrumbs.length){
    console.error('Carousel slide and breadcrumb count do not match up. Please check your DOM elements.');
}


if (w < 750) {
    mobileEnabled = true;
    resetAutoToggle();
}

window.onresize = function(event) {
    w = window.innerWidth;
    if (w < 750 && mobileEnabled == false) {
        mobileEnabled = true;
        resetAutoToggle();
    } else if (w >= 750){
        mobileEnabled = false;
        clearInterval(slideInterval);
    }
};

/**
 * Carousel State Functions
 */
function increaseState(){
    state += 1;
    restrictState();
    updateCarousel();
}

function decreaseState(){
    state -= 1;
    restrictState();
    updateCarousel();
}

function restrictState() {
    if (state < 0) {
        state = slides.length - 1;
    } else if (state > slides.length - 1) {
        state = 0;
    }
}

function updateCarousel() {
    for (var i = 0; i < slides.length; i++) {
        slides[i].className = slides[i].className.replace(' active', '');
        breadcrumbs[i].className = breadcrumbs[i].className.replace(' active', '');
    };
    for (var i = 0; i < state + 1; i++) {
        breadcrumbs[i].className += ' active';
    };
    slides[state].className += ' active';
}

/**
 * Auto Slide Toggling
 */

function resetAutoToggle() {
    clearInterval(slideInterval);
    slideInterval = setInterval(increaseState, autoFreq * 1000);
}
