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
                <span class="tweet-age">3 days ago</span>
              </div>
              <div class="bottom-right">
                <i class="fa fa-flag"></i>
                <i class="fa fa-retweet"></i>
                <i class="fa fa-heart"></i>
              </div>
            </div>
          </article>`;
}

const renderTweets = function(tweets) {
  for (tweet of tweets) {
    // append returned HTML string:
    $('#tweets-container').append(createTweetElement(tweet));
  }
}

$(document).ready(function() {
  // create-tweet submit event listener
  // adds a new tweet to the tweets.
  $('#create-tweet').submit(function(event) {
    // prevent default handling (in this case, the refresh of the page)
    event.preventDefault();
    if ($(this) === undefined) {
      alert('error');
    } 
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $(this).serialize()
    }).then(function() {
      console.log(response);
    });
  });

  const loadTweets = function() {
    const response = $.ajax({
      url: '/tweets',
      method: 'GET'
    })
    response.done(function(tweets) {
      renderTweets(tweets);
    });
  }

  loadTweets();
});
