
const quizLength = 3
var quizAnswered = 0
var quizRight = 0

var elementsToAnimate = [$("#browser-container"), $("#timeline-container"), $("#gallery-container"), $("#quiz-container")];
var initialLoad = false
var simpleAnimationTime = 1000

var quizSwiper = new Swiper(".quiz-swiper", {
    slidesPerView: quizLength,
    spaceBetween: 16,
    allowTouchMove: false,
    keyboard: {
        enabled: false,
    },
});

$(document).ready(function(){
    if(sessionStorage.getItem("firstload") === null){
        initialLoad = true
        sessionStorage.setItem("firstload", true);
    }
    if(initialLoad){
        elementsToAnimate.forEach(function(element){
            element.css({"opacity":"0%","margin-top":"100px"});
            element.simpleAnimation();
        });
        $("#gallery-card-client").css({"opacity": "0%", "margin-left": "70px"});

        $("#browser-logo-unifer").css({"opacity": "0%", "margin-right": "70px"});
        $("#browser-logo-client").css({"opacity": "0%", "margin-left": "70px"});
        $("#browser-logo-unifer").animate({opacity: '100%', marginRight: '0px'}, simpleAnimationTime, 'swing');
        $("#browser-logo-client").animate({opacity: '100%', marginLeft: '0px'}, simpleAnimationTime, 'swing');
    }

    $("#preview-divider").draggable({axis: "x", containment: [365, 0, 1500, 0], drag: function(event, ui) {
        dragPreview();
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

function dragPreview(){
    var divider = $("#preview-divider").css("left");
    var dividerButton = $("#preview-divider-button").css("width");
    var pos = Number(divider.replace("px", ""));
    var width = Number(dividerButton.replace("px", ""));
    $("#preview-box-new").css({"left":(pos+width/2).toString()+"px"});
    $("#preview-image-new").css({"left":(pos*-1).toString()+"px"});
}

$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

$.fn.simpleAnimation = function(){
    if ($(this).isInViewport()) {
        $(this).animate({opacity: '100%', marginTop: '0px'}, simpleAnimationTime, 'swing');
    }
}

$(window).on('resize scroll', function() {
    if(initialLoad){
        elementsToAnimate.forEach(function(element){
            element.simpleAnimation();
        });

        if ($('#gallery-animation-target').isInViewport()) {
            setTimeout(function() {
                $("#gallery-card-client").animate({opacity: '100%', marginLeft: '0px'}, 1000, 'swing');
            }, 300);
        }
        if ($('#gallery-animation-target').isInViewport()) {
            $("#browser-logo-client").animate({left: "-=100"}, simpleAnimationTime, 1000, 'swing');
        }
    }
});

$(window).on("unload", function() {
    sessionStorage.setItem("firstload", null);
});