
var swiper = new Swiper(".quizSwiper", {
    slidesPerView: 3,
    spaceBetween: 16,
    allowTouchMove: false,
    keyboard: {
        enabled: false,
    },
});

swiper.on('slideChange', function () {
    var swiperWrapper = document.getElementById("quiz-swiper-wrapper");
    var activeSlide = swiperWrapper.getElementsByClassName("swiper-slide-next");
    var buttonYes = activeSlide[0].getElementsByClassName("button-primary");
    var buttonNo = activeSlide[0].getElementsByClassName("button-secondary");

    buttonYes[0].classList.add("button-primary-active");
    buttonNo[0].classList.add("button-secondary-active");

    buttonYes[0].classList.remove("button-primary-disabled");
    buttonNo[0].classList.remove("button-secondary-disabled");
});

function confirmationYes(button) {
    if(button.classList.contains("button-primary-active")) swiper.slideNext();
}
function confirmationNo(button) {
    if(button.classList.contains("button-secondary-active")) swiper.slideNext();
}
