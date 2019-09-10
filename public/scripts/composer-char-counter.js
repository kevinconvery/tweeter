$(document).ready(function() {
  $('#tweet-text').keydown(function(event) {
    let counter = parseInt($('.counter').text());
    // backspace has been pressed
    if (event.which === 8) {
      // don't increment it when it's 140 or over
      if (counter < 140) {
        counter++;
        $('.counter').text(counter);
      }
    } else {
      // here, don't decrement the counter if it's less than 0:
      if (counter > 0) {
        counter--;
        $('.counter').text(counter);
      }

    }
    
    // we'll toggle the caution here - the caution class will turn on
    // when counter is equal to zero and toggle off otherwise. It just
    // turns the text on to warn the user of the tweet length being at its limit.
    if (counter === 0) {
      $('.counter').addClass('counter-caution');
    } else {
      $('.counter').removeClass('counter-caution');
    }
  });
  
  $('#tweet-submit').click(function() {
    console.log(this);
  });
});

