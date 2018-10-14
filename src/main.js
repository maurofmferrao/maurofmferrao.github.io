// Variables
const animateStopCond = 'webkitAnimationEnd oanimationend msAnimationEnd animationend';
const pages = {
    index: {
        selected: false
    },
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

const numAnimHide = 4;

// MAIN
$(document).ready(function() {

    // Preload Images before start
    preloadAssets();

    // Start page content
    start();
});

// Functions
window.goTo = function (pageToGo) {
    for(const key in pages) {
        if(pages.hasOwnProperty(key)) {

            if(key === pageToGo && !pages[key].selected) {
                console.log('Select: ' + key);
                
                pageTransition(key, true);
                pages[key].selected = true;
            } else if(key != pageToGo && pages[key].selected) {

                console.log('De: ' + key);

                pageTransition(key, false);
                pages[key].selected = false;
            }
        }
    }
};

function pageTransition(page, show) {

    if(show) {
        $('.content-' + page).removeClass('hide');
    } else {
        $('.content-' + page).addClass('hide');
    }

    $('#nav-' + page).toggleClass('active', show);
}

function start() {
    
    // Get URL
    const url = new URL(window.location.href);

    // TODO: Skip intro ( temporary )
    if(url.searchParams.get("skipIntro") === 'true') {
        $('.main-content').removeClass('hide');

        goTo('index');

        $('.navbar').addClass('show');
    } else {
        if(isMobile.any() != null) {
            $('.intro-logo').addClass('mobile');
        }

        $('.intro-anim-container').addClass('show');

        $('.intro-logo').addClass('animate').one(animateStopCond, function(event) {
            $(this).removeClass('animate');
            $(this).hide();

            $('.intro-anim-container').removeClass('show');

            $('.main-content').removeClass('hide');

            // TODO: Show menu ( temporary )
            if(url.searchParams.get("showMenu") === 'true') {
                goTo('index');

                $('.navbar').addClass('show');
            }
        });
    }
}

function preloadAssets() {
    let imageArray = [];

    const imageNames = require.context('../assets/images/', true, /\.(png|svg|jpg|gif)$/).keys();

    imageNames.forEach(element => {
        imageArray.push('dist/' + element.split('./')[1]);
    });

    preloadImages(imageArray);
}

function preloadImages(imageArray) {

    if(!preloadImages.list) {
        preloadImages.list = [];
    }

    var list = preloadImages.list;

    for(var i = 0;i < imageArray.length;i++) {
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
        img.src = imageArray[i];
    }
}

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};
