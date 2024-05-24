
const quizLength = 3
var quizAnswered = 0
var quizRight = 0

var quizSwiper = new Swiper(".quiz-swiper", {
    slidesPerView: quizLength,
    spaceBetween: 16,
    allowTouchMove: false,
    keyboard: {
        enabled: false,
    },
});

$(document).ready(function(){
    $("#preview-divider").draggable({axis: "x", containment: [385, 0, 1503, 0], drag: function(event, ui) {
        var divider = $("#preview-divider").css("left");
        var pos = Number(divider.replace("px", ""));
        $("#preview-box-new").css({"left":(pos+8).toString()+"px"});
        $("#preview-image-new").css({"left":(pos*-1).toString()+"px"});
    }});

    $('#congratulation-container').hide();
    $('#congratulation-ilustration').hide();
    $('#congratulation-textblock').hide();

    $('#cta-container').hide();
    $('#cta-ilustration').hide();
    $('#cta-textblock').hide();

    quizSwiper.on('slideChange', function () {
        try{
            var buttonYes = $(".swiper-slide-next .button-primary");
            var buttonNo = $(".swiper-slide-next .button-secondary");
    
            buttonYes[0].classList.add("button-primary-active");
            buttonNo[0].classList.add("button-secondary-active");
    
            buttonYes[0].classList.remove("button-primary-disabled");
            buttonNo[0].classList.remove("button-secondary-disabled");
        }
        catch(exeption){
            transitionQuiz();
        }
    });
});

function confirmationYes(button) {
    if(button.classList.contains("button-primary-active")) {
        quizSwiper.slideNext();
        quizRight++;
    }
}
function confirmationNo(button) {
    if(button.classList.contains("button-secondary-active")) {
        quizSwiper.slideNext();
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

$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

$(window).on('resize scroll', function() {
    if ($('#gallery-animation-target').isInViewport()) {
        setTimeout(function() {
            $("#gallery-card-client").animate({opacity: '100%', marginLeft: '0px'}, 1000, 'swing');
        }, 500);
    }
});