# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

This is primarily a single-page application which uses AJAX to render existing tweets and add
new tweets to the page, with jQuery for our DOM manipulation.

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## Using Tweeter

1. There are a few existing "dummy" tweets that will render when the page is started. The compose tweet button is at the upper right of the site; click it to write a new tweet.

!["Page when initially loaded."](https://github.com/kevinconvery/tweeter/blob/master/public/docs/initial-site-state.png)

!["Page when compose tweet button clicked to reveal form"](https://github.com/kevinconvery/tweeter/blob/master/public/docs/compose-tweet-shown.png)

2. Tweets have a few constraints; they can't exceed 140 characters in length nor be blank. An error message will alert you if you try and send a tweet in these cases, which can be removed by the button at the bottom of it. There is also a counter that will dynamically show the size of the tweet you're writing. It will give you an idea of whether your tweet would meet the length requirement or not.

!["Page throwing an empty tweet error."](https://github.com/kevinconvery/tweeter/blob/master/public/docs/empty-error-message.png)

!["Highlighted error button"](https://github.com/kevinconvery/tweeter/blob/master/public/docs/empty-error-message-button-highlighted.png)

!["Normal tweet, showing decrease in counter to the right"](https://github.com/kevinconvery/tweeter/blob/master/public/docs/normal-tweet.png)

## Dependencies

- Express
- Node 5.10.x or above
