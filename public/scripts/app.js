/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

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

renderTweets(data);
