function preloadImages(array) {
    if (!preloadImages.list) {
        preloadImages.list = [];
    }

    var list = preloadImages.list;
    
    for (var i = 0; i < array.length; i++) {
        var img = new Image();
        img.onload = function() {
            var index = list.indexOf(this);
            if (index !== -1) {
                // remove image from the array once it's loaded
                // for memory consumption reasons
                list.splice(index, 1);
            }
        }
        list.push(img);
        img.src = array[i];
    }
}

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
        'assets/animations/frame9.svg'
    ]);

    $('.canvas').addClass('animate');
});
