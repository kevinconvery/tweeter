const KEYBOARD_EVENT = 8
const CHARACTER_LIMIT = 140

$(document).ready(function() {
  $('#tweet-text').keydown(function(event) {
    let counter = parseInt($('.counter').text());
    // backspace has been pressed
    if (event.which === KEYBOARD_EVENT) {
      // don't increment it when it's 140 or over
      if (counter < CHARACTER_LIMIT) {
        counter++;
        $('.counter').text(counter);
      }
    } else {
      // here, don't decrement the counter if it's less than 0:
      counter--;
      $('.counter').text(counter);
    }
    
    // we'll toggle the caution here - the caution class will turn on
    // when counter is equal to zero and toggle off otherwise. It just
    // turns the text on to warn the user of the tweet length being at its limit.
    if (counter === 0) {
      $('.counter').addClass('counter-caution');
    } 

    // remove the class only if the class is present
    if (counter > 0 && $('.counter').hasClass('counter-caution')) {
      $('.counter').removeClass('counter-caution');
    }
  });
});

