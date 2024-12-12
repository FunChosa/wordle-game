# Wordle game

A classic Wordle game built with React and Vite, challenging players to guess a hidden five-letter word in six attempts or less.

## Project Setup

1. **Clone the repository:** `git clone https://github.com/FunChosa/wordle-game.git`
2. **Navigate to the project directory:** `cd wordle-game`
3. **Install dependencies:** `npm install`
4. **Start the development server:** `npm run dev`

## Features

* Classic Wordle Gameplay: Guess the five-letter word within six attempts.
* Feedback System:  Letters are color-coded to indicate correctness:
    * Green: Correct letter and position.
    * Yellow: Correct letter, incorrect position.
    * Gray: Incorrect letter.

## Technology Stack

* React: ^18.3.1
* Vite: ^5.4.10

## State Management

The application's state is managed using the `useState` hook.

## Data Storage

The game words are currently stored in a local .txt file.

## Deployment

The application is deployed on Netlify: https://funchosa-wordle-game.netlify.app

## Known Issues

* Duplicate Letter Highlighting: Currently, duplicate correctly guessed letters are all highlighted (yellow or green), even if only one instance is correctly placed.  For example, if the word is "alarm" and the player guesses "hello", both "l"s will be highlighted, but only one should be. This will be addressed in a future update.

## Future Enhancements

* Replace the local .txt data with an external API for fetching words.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
