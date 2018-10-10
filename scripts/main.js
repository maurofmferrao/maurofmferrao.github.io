// Variables
const animateStopCond = 'webkitAnimationEnd oanimationend msAnimationEnd animationend';
const pages = {
    work: {
        selected: false
    },
    projects: {
        selected: false
    },
    about: {
        selected: false
    }
};


// Functions
function goTo(pageToGo) {

    console.log('goTo');
    
    for(const key in pages) {
        if(pages.hasOwnProperty(key)) {
            const page = pages[key];
            pageTransition(key, (key === pageToGo));
        }
    }
}

function pageTransition(page, transition) {

    console.log('pageTransition');
    console.log('pageTransition: Animate ' + page + ' -> ' + transition);
    $('.content-' + page).toggleClass('show', transition);
    $('#nav-' + page).toggleClass('active', transition);
    

}

function preloadImages(array) {
    if(!preloadImages.list) {
        preloadImages.list = [];
    }

    var list = preloadImages.list;

    for(var i = 0;i < array.length;i++) {
        var img = new Image();
        img.onload = function() {
            var index = list.indexOf(this);
            if(index !== -1) {
                // remove image from the array once it's loaded
                // for memory consumption reasons
                list.splice(index, 1);
            }
        }
        list.push(img);
        img.src = array[i];
    }
}

function start(runIntro) {

    if(runIntro) {
        $('.intro-anim-container').addClass('show');

        $('.intro-logo').addClass('animate').one(animateStopCond, function(event) {
            $(this).removeClass('animate');
            $(this).hide();

            $('.intro-anim-container').removeClass('show').one(animateStopCond, function(event) {
                $(this).hide();
            });

            //goTo('work');

            //$('.navbar').addClass('show');
        });
    } else {
        goTo('work');

        $('.navbar').addClass('show');
    }
}


// Main
$(document).ready(function() {

    preloadImages([
        'assets/animations/frame1.svg',
        'assets/animations/frame2.svg',
        'assets/animations/frame3.svg',
        'assets/animations/frame4.svg',
        'assets/animations/frame5.svg',
        'assets/animations/frame6.svg',
        'assets/animations/frame7.svg',
        'assets/animations/frame8.svg',
        'assets/animations/frame9.svg',
        'assets/animations/frame10.svg',
        'assets/animations/frame11.svg'
    ]);

    start(true);
});
