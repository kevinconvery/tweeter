// determineScrollDirection()
// Determines the direction of the scroll, used in the scroll event.
// This prevents a triggering of the scroll event from the scroll-up
// button since we're only really listening on down direction scrolls.
const determineScrollDirection = () => (window.pageYOffset > 0 ? 'down' : 'up')

// renderDateString(date)
// Creates the date string for the bottom-left div in each tweet
// Could do a lot more than just calculating the days -- this would
// be extended with successive modulo calls and finding a smaller
// and smaller remainder.
const renderDateString = date => {
  const DAY_SIZE = 1000 * 3600 * 24
  const daysDifference = Math.floor((Date.now() - date) / DAY_SIZE);
  switch(daysDifference) {
    case 0:
      return 'Today'
    case 1:
      return 'Yesterday'
    default:
      return `${daysDifference} days ago`
  }
}

// Creates the tweet as HTML to be appended. This is done through a template
// string which makes returning the string a lot cleaner.
const createTweetElement = function(tweetElement) {
  // destructure the individual components in the element
  const { user, content, created_at } = tweetElement
  const { handle, avatars, name } = user
  const { text } = content
  return `<article class="tweet">
            <div class="top-row">
              <div class="top-left">
                <img src="${avatars}" alt="">
                <span class="display-name">${name}</span>
              </div>
              <div class="top-right">
                <span class="user-name">${handle}</span>
              </div>
            </div>
            <div class="tweet-body">
              <span class="tweet-text">${text}</span>
            </div>
            <div class="bottom-row">
              <div class="bottom-left">
                <span class="tweet-age">${renderDateString(created_at)}</span>
              </div>
              <div class="bottom-right">
                <i class="fa fa-flag"></i>
                <i class="fa fa-retweet"></i>
                <i class="fa fa-heart"></i>
              </div>
            </div>
          </article>`;
}

// Adds an individual tweet.
const addTweet = tweet => {
  $('#tweets-container').prepend(createTweetElement(tweet));
}

// Adds a collection of tweets from a source.
const renderTweets = tweets => {
  for (tweet of tweets) {
    addTweet(tweet);
  }
}

$(document).ready(() => {
  // create-tweet submit event listener
  // adds a new tweet to the tweets.
  $('#create-tweet').submit(event => {
    event.preventDefault();
    // prevent default handling (in this case, the refresh of the page)
    if ($('#tweet-text').val() === "") {
      // create the error HTML
      const errorHTML = 
        `<div class="error-message">
          <h1>Error</h1>
          <p>Tweets cannot be empty</p>
          <div class="error-message-remove">Remove Message</div>
         </div>`;
      $('.container').prepend(errorHTML);
      // create the listener for the error message
      $('.error-message-remove').click(function() {
        $('div').remove('.error-message');
      });
    } else if ($('#tweet-text').val().length > 140) {
      const errorHTML = 
        `<div class="error-message">
          <h1>Error</h1>
          <p>Tweets are limited to a length of 140 characters.</p>
          <div class="error-message-remove">Remove Message</div>
         </div>`;
      $('.container').prepend(errorHTML);
      $('.error-message-remove').click(function() {
        $('div').remove('.error-message');
      });
    } else {
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $('#tweet-text').serialize()
      }).then(function(response) {
        // reset our tweet text and counter
        $('#tweet-text').val('');
        $('.counter').text('140');
        addTweet(response);
      });
    }
  });

  // this will toggle the state, then give the text area the focus
  $('#compose-tweet').click(function() {
    $('.new-tweet').slideToggle();
    $('#tweet-text').focus();
  });
  
  // show and hide header from nav as well
  $('#show-profile').click(() => {
    $('header').slideToggle()
  })

  $(window).scroll(function(event) {
    // only fade the scroll-up button on down direction triggers
    if (determineScrollDirection() === 'down') {
      $('.scroll-up').fadeIn(800);
    }
  });

  
  $('.scroll-up').click(function(event) {
    // scroll to the top and fade out our button
    $('html').scrollTop(0);
    $('.scroll-up').fadeOut(400);
    // rather than a slideToggle call this should always be down
    // so slideDown is used.
    $('.new-tweet').slideDown();
    // give the tweet-text component focus
    $('#tweet-text').focus();
  });

  // ensure that our DOM is ready before doing this:
  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET'
    }).then(function(tweets) {
      renderTweets(tweets);
    });
  }
  
  const loadPage = function() {
    // hide the profile section and new tweet forms by default
    $('header').slideUp();
    $('.new-tweet').slideUp();
    // hide the scroll-up button
    $('.scroll-up').fadeOut(0);
    // load our tweets here
    loadTweets();
  }

  // load the page
  loadPage();
});
