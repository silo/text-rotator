//=======================================//
// Text rotator with animate.css support //
//=======================================//

$.fn.textRotator = function(options) {

  var defaults = {
    separator: ',',
    speed: 2000,
    animationIn: 'bounceIn',
    animationOut: 'bounceOut',
    type: 'random' // or normal
  };

  var settings = $.extend({}, defaults, options);

  return this.each(function() {

    var rotationText = $(this).html();
    var textAsArray = rotationText.split(settings.separator);
    var el = $(this);

    function getMyText() {

      if (settings.type == 'random') {
        randomText = textAsArray[Math.floor(Math.random() * textAsArray.length)];
      }
      if (settings.type == 'normal') {
        var initial = el.html()
        var index = $.inArray(initial, textAsArray)
        if((index + 1) == textAsArray.length) index = -1
        randomText = textAsArray[index + 1];
      }
      // if there is both animation out and in //
      if (settings.animationIn != settings.animationOut) {
        el.html(randomText)
          .removeClass().addClass('animated ' + settings.animationIn)
          .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).delay(settings.speed / 2).queue(function() {
              $(this).removeClass();
              $(this).addClass('animated ' + settings.animationOut);
              $(this).dequeue();
            });
          });
      }

      // if its the same animation //
      if (settings.animationIn == settings.animationOut) {
        el.html(randomText)
        .addClass('animated ' + settings.animationIn)
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
         $(this).delay(settings.speed / 2)
            .queue(function() {
              $(this).removeClass('animated ' + settings.animationIn)
              $(this).dequeue();
            });
        });
      }

    };
    getMyText();
    setInterval(getMyText, settings.speed);

  });

};
