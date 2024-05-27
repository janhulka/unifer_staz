var elementsToAnimate = [$("#browser-container"), $("#timeline-container"), $("#gallery-container"), $("#quiz-container")];
var elementsAnimated = [];
var initialLoad = false;
var simpleAnimationTime = 1000;

var dividerAnimated = false;
var clientAnimated = false;

$(document).ready(function(){
    if(sessionStorage.getItem("firstload") === null){
        initialLoad = true;
        sessionStorage.setItem("firstload", true);
    }

    if(initialLoad){
        elementsToAnimate.forEach(function(element, i){
            element.css({"opacity":"0%", "padding-top":"100px"});
            element.simpleAnimation(i);
            elementsAnimated.push(false);
        });
        $("#gallery-card-client").css({"opacity": "0%", "margin-left": "70px"});

        $("#browser-logo-unifer").css({"opacity": "0%", "margin-right": "70px"});
        $("#browser-logo-client").css({"opacity": "0%", "margin-left": "70px"});
        $("#browser-logo-unifer").animate({opacity: '100%', marginRight: '0px'}, simpleAnimationTime, 'swing');
        $("#browser-logo-client").animate({opacity: '100%', marginLeft: '0px'}, simpleAnimationTime, 'swing');
    }

    $("#preview-divider").draggable({axis: "x", containment: [172, 0, 1308, 0], drag: function(event, ui) {
        dragPreview();
    }});
});

function dragPreview(){
    var divider = $("#preview-divider").css("left");
    var dividerButton = $("#preview-divider-button").css("width");
    var pos = Number(divider.replace("px", ""));
    var width = Number(dividerButton.replace("px", ""));
    $("#preview-box-new").css({"left":(pos+width/2).toString()+"px"});
    $("#preview-image-new").css({"left":(pos*-1).toString()+"px"});
}

$.fn.isInViewport = function(){
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

$.fn.simpleAnimation = function(i){
    if($(this).isInViewport()) {
        $(this).animate({opacity: '100%', paddingTop: '0px'}, simpleAnimationTime, 'swing');
        elementsAnimated[i] = true;
    }
}

$(window).on('resize scroll', function(){
    if(initialLoad){
        elementsToAnimate.forEach(function(element, i){
            if(!elementsAnimated[i]){
                element.simpleAnimation(i);
            }
        });

        if(!clientAnimated && $('#gallery-animation-target').isInViewport()){
            setTimeout(function(){
                $("#gallery-card-client").animate({opacity: '100%', marginLeft: '0px'}, 1000, 'swing');
            }, 300);
            clientAnimated = true;
        }

        if(!dividerAnimated && $('#preview-divider').isInViewport()){
            setTimeout(function(){
                $("#preview-divider").animate({left: '738px'}, {duration: 1000, progress: function(){
                    dragPreview();
                }});
            }, 800);
            dividerAnimated = true;
        }
    }
});

$(window).on("unload", function(){
    sessionStorage.setItem("firstload", null);
});