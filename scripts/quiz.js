const quizLength = 4;
var quizRight = 0;

var currentSlide = 1;
var slideWidth = 286;
var wrapperGap = 16;
var wrapper = $(".quiz-swiper-wrapper");

$(document).ready(function(){
    $("#congratulation-container").hide();
    $("#congratulation-ilustration").hide();
    $("#congratulation-textblock").hide();

    $("#cta-container").hide();
    $("#cta-ilustration").hide();
    $("#cta-textblock").hide();

    wrapper.children(":nth-child(1)").activateSlide();

    var wrapperWidth = (slideWidth * (quizLength + 1));
    wrapper.css({"width": wrapperWidth.toString()});

    $(".button-primary").click(function(){
        if($(this).hasClass("button-primary-active")){
            wrapper.transitionSlide();
            quizRight++;
        }
    });

    $(".button-secondary").click(function(){
        if($(this).hasClass("button-secondary-active")){
            wrapper.transitionSlide();
        }
    });
});

$.fn.activateSlide = function(){
    $(this).addClass("quiz-slide-active");
    $(".quiz-slide-active .button-primary").addClass("button-primary-active");
    $(".quiz-slide-active .button-secondary").addClass("button-secondary-active");
    $(".quiz-slide-active .button-primary").toggleClass("button-primary-disabled");
    $(".quiz-slide-active .button-secondary").toggleClass("button-secondary-disabled");
}

$.fn.transitionSlide = function(){
    var activeSlide = $(this).children(":nth-child("+currentSlide+")");

    activeSlide.animate({"opacity":"0%"}, 500, function(){
        activeSlide.animate({"margin-left":(-slideWidth-wrapperGap).toString()+"px"});
    });

    currentSlide++;
    if(currentSlide == quizLength+1) showResultQuiz();
    else $(this).children(":nth-child("+currentSlide+")").activateSlide();
}

function showResultQuiz(){
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