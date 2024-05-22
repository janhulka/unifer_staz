
const quizLength = 3
var quizAnswered = 0
var quizRight = 0

$('#congratulation-container').hide();
$('#congratulation-ilustration').hide();
$('#congratulation-textblock').hide();

$('#cta-container').hide();
$('#cta-ilustration').hide();
$('#cta-textblock').hide();

var swiper = new Swiper(".quizSwiper", {
    slidesPerView: quizLength,
    spaceBetween: 16,
    allowTouchMove: false,
    keyboard: {
        enabled: false,
    },
});

swiper.on('slideChange', function () {
    var swiperWrapper = document.getElementById("quiz-swiper-wrapper");
    var activeSlide = swiperWrapper.getElementsByClassName("swiper-slide-next");

    try{
        var buttonYes = activeSlide[0].getElementsByClassName("button-primary");
        var buttonNo = activeSlide[0].getElementsByClassName("button-secondary");

        buttonYes[0].classList.add("button-primary-active");
        buttonNo[0].classList.add("button-secondary-active");

        buttonYes[0].classList.remove("button-primary-disabled");
        buttonNo[0].classList.remove("button-secondary-disabled");
    }
    catch(exeption){
        transitionQuiz();
    }
});

function confirmationYes(button) {
    if(button.classList.contains("button-primary-active")) {
        swiper.slideNext();
        quizRight++;
    }
}
function confirmationNo(button) {
    if(button.classList.contains("button-secondary-active")) {
        swiper.slideNext();
    }
}

function transitionQuiz(){
    $("#quiz-wrapper").fadeOut("slow", function() {
        if(quizRight == quizLength) {
            $("#quiz-ilustration").animate({'padding-left': '738'}, "slow", function(){
                $("#congratulation-container").show();
                $("#quiz-container").hide();
                $('#congratulation-ilustration').show();
                $('#congratulation-textblock').fadeIn("slow");
            }); 
        } 
        else {
            $("#quiz-ilustration").animate({'padding-left': '738'}, "slow", function(){
                $("#cta-container").show();
                $("#quiz-container").hide();
                $('#cta-ilustration').show();
                $('#cta-textblock').fadeIn("slow");
            });
        }
    });
}
