// Calculating just 
const calculateDays = function(date) {
  const timeDifference = Date.now() - date;
  const formattedDate = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  if (formattedDate === 0) {
    return `Today`;
  } else {
    return `${formattedDate} days ago`;
  }
}

const createTweetElement = function(tweetElement) {
  // Returning a large template string is a lot cleaner.
  return `<article class="tweet">
            <div class="top-row">
              <div class="top-left">
                <img src="${tweetElement.user.avatars}" alt="">
                <span class="display-name">${tweetElement.user.name}</span>
              </div>
              <div class="top-right">
                <span class="user-name">${tweetElement.user.handle}</span>
              </div>
            </div>
            <div class="tweet-body">
              <span class="tweet-text">${tweetElement.content.text}</span>
            </div>
            <div class="bottom-row">
              <div class="bottom-left">
                <span class="tweet-age">${calculateDays(tweetElement.created_at)}</span>
              </div>
              <div class="bottom-right">
                <i class="fa fa-flag"></i>
                <i class="fa fa-retweet"></i>
                <i class="fa fa-heart"></i>
              </div>
            </div>
          </article>`;
}

const appendTweet = function(tweet) {
  $('#tweets-container').append(createTweetElement(tweet));
}

const renderTweets = function(tweets) {
  for (tweet of tweets) {
    // append returned HTML string:
    appendTweet(tweet);
  }
}

$(document).ready(() => {
  // create-tweet submit event listener
  // adds a new tweet to the tweets.
  $('#create-tweet').submit(function(event) {
    event.preventDefault();
    // prevent default handling (in this case, the refresh of the page)
    if ($('#tweet-text').val() === "") {
      // create the error 
      const errorHTML = 
        `<div class="error-message">
          <h1>Error</h1>
          <p>Tweets cannot be empty</p>
          <button class="error-kill-button">Kill Me</button>
         </div>`;
      $('.container').prepend(errorHTML);
      $('.error-kill-button').click(function(event) {
        $('div').remove('.error-message');
      });
    } else if ($('#tweet-text').val().length > 140) {
      const errorHTML = 
        `<div class="error-message">
          <h1>Error</h1>
          <p>Tweets are limited to a length of 140 characters.</p>
         </div>`;
      $('.container').prepend(errorHTML);
      $('.error-kill-button').click(function(event) {
        $('div').remove('.error-message');
      });
    } else {
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $(this).serialize()
      }).then(function(response) {
        $('#tweet-text').val('');
        $('.counter').text('140');
        appendTweet(response);
      });
    }
  });
  // hide the new tweet form by default
  $('.new-tweet').slideUp();

  // this will toggle the state
  $('#compose-tweet').click(function(event) {
    $('.new-tweet').slideToggle();
  });
  
  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET'
    }).then(function(tweets) {
      renderTweets(tweets);
    });
  }
  
  loadTweets();
});
