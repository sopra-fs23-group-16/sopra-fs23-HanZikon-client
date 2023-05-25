<p align="center">
  <img alt="hanzikon logo" src="https://github.com/sopra-fs23-group-16/sopra-fs23-HanZikon-server/blob/main/src/main/resources/Images/welcome.png" /><br/>
</p>

## Introduction

Hanzi (Chinese pinyin) means Chinese character. HanZikon is a Chinese character learning and writing APP.

It has three game modes, Riddle of Oracle Script, Hanzi Imitation and Bit of Both. All the three game modes have 5 difficulty levels (1-5 from easy to hard). Players are free to choose the mode and level they prefer.
1. In Riddle of Oracle Script mode, player needs to choose the right chinese character of current age based on the oracle bone script dated back to 1500BC.
2. In Hanzi Imitation mode, player would draw or paint the Chinese Character with short-term memory. Generally, there would be 20-40 seconds for players to learn the shape and structure of the Chinese character, then 10-18 seconds for players to reproduce it. 
3. In Bit of Both mode, there will have questions consisted of those two modes.

The aim of this application is getting to know Chinese characters in an interesting way. Or one can just simply take it as a game to practice your memory or painting skills with fun.

## Technologies

- [Node.js](https://nodejs.org/en/docs) - JavaScript runtime environment
- [React](https://react.dev/learn) - JavaScript library for building user interfaces
- [Google Cloud](https://cloud.google.com/appengine/docs/flexible) - Deployment
- [RESTful](https://restfulapi.net/) - Web services for user control
- [Websocket](https://spring.io/guides/gs/messaging-stomp-websocket/) -  Real-time bidirectional communication between client and server
- [Google Translation API](https://cloud.google.com/translate) - Provide multi-linguial support
- [Hanzi Writer API](https://hanziwriter.org/docs.html) - Demonstrate the strokes of Chinese characters

## High-level Components

### Hanzi Learning Page

The [Hanzi Learning](https://github.com/sopra-fs23-group-16/sopra-fs23-HanZikon-client/blob/main/src/components/views/ImitationInspect.js) page gives players 20-40 seconds (according to the difficulty level of the game) to learn the shape and structure, the history, and the meaning of a Chinese character. It serves as the first page of a Hanzi imitation question.

### Hanzi Imitation Page

The [Hanzi Imitation](https://github.com/sopra-fs23-group-16/sopra-fs23-HanZikon-client/blob/main/src/components/views/ImitationGame.js) page comes after the [Hanzi Learning](https://github.com/sopra-fs23-group-16/sopra-fs23-HanZikon-client/blob/main/src/components/views/ImitationInspect.js) page in a Hanzi imitation question. It gives players 10-18 seconds (according to the difficulty level of the game) to reproduce the Chinese character they learned in the [Hanzi Learning](https://github.com/sopra-fs23-group-16/sopra-fs23-HanZikon-client/blob/main/src/components/views/ImitationInspect.js) page.

### Imitation Voting Page

The [Imitation Voting](https://github.com/sopra-fs23-group-16/sopra-fs23-HanZikon-client/blob/main/src/components/views/ImitationVote.js) page is the last page of a Hanzi imitation question. It gives players 10 seconds to evaluate others' works in the [Hanzi Imitation](https://github.com/sopra-fs23-group-16/sopra-fs23-HanZikon-client/blob/main/src/components/views/ImitationGame.js) page. One player could vote the one he or she likes the most.

### Multiple Choice Page

The [Multiple Choice](https://github.com/sopra-fs23-group-16/sopra-fs23-HanZikon-client/blob/main/src/components/views/ChoiceGame.js) page allows players to choose the chinese character of current age, which they think is the most similar one to the oracle bone script shown on that page.

### Game Result Page

The [Game Result](https://github.com/sopra-fs23-group-16/sopra-fs23-HanZikon-client/blob/main/src/components/views/GameResult.js) page shows the ranking and accumulated scores that all the players got in the finished turns. If the last question they finished was a Hanzi Imitation question, the time that they were voted would also be shown on this page.

## Prerequisites and Installation
For your local development environment, you will need Node.js. You can download it [here](https://nodejs.org). All other dependencies, including React, get installed with:

```npm install```

Run this command before you start your application for the first time. Next, you can start the app with:

```npm run dev```

Now you can open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Notice that the page will reload if you make any edits. You will also see any lint errors in the console (use Google Chrome).

### Testing
Testing is optional, and you can run the tests with `npm run test`.
This launches the test runner in an interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

> For macOS user running into a 'fsevents' error: https://github.com/jest-community/vscode-jest/issues/423

### Build
Finally, `npm run build` builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance: the build is minified, and the filenames include hashes.<br>

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Illustrations

### Game Rule
<p align="center">
  <img alt="hanzikon logo" src="https://github.com/sopra-fs23-group-16/sopra-fs23-HanZikon-client/blob/main/src/image/gamerule.png" /><br/>
</p>

### User Profile
<p align="center">
  <img alt="hanzikon logo" src="https://github.com/sopra-fs23-group-16/sopra-fs23-HanZikon-client/blob/main/src/image/profile.png" /><br/>
</p>

### Game Setting
<p align="center">
  <img alt="hanzikon logo" src="https://github.com/sopra-fs23-group-16/sopra-fs23-HanZikon-client/blob/main/src/image/gamesetting.png" /><br/>
</p>
In the Game Settings feature, users can customize various aspects of the game, including the number of players, question types, difficulty levels, and number of rounds. The number of players refers to the maximum limit of participants in a game room.

### Participant Waiting Room
<p align="center">
  <img alt="hanzikon logo" src="https://github.com/sopra-fs23-group-16/sopra-fs23-HanZikon-client/blob/main/src/image/normalwaitingroom.png" /><br/>
</p>

### Owner Waiting Room
<p align="center">
  <img alt="hanzikon logo" src="https://github.com/sopra-fs23-group-16/sopra-fs23-HanZikon-client/blob/main/src/image/ownerwaitingroom.png" /><br/>
</p>

### Imitation Learning
<p align="center">
  <img alt="hanzikon logo" src="https://github.com/sopra-fs23-group-16/sopra-fs23-HanZikon-client/blob/main/src/image/imitationlearning.png" /><br/>
</p>

### Imitation Writing
<p align="center">
  <img alt="hanzikon logo" src="https://github.com/sopra-fs23-group-16/sopra-fs23-HanZikon-client/blob/main/src/image/imitationwriting.png" /><br/>
</p>

### Imitation Voting
<p align="center">
  <img alt="hanzikon logo" src="https://github.com/sopra-fs23-group-16/sopra-fs23-HanZikon-client/blob/main/src/image/imitationvoting.png" /><br/>
</p>

### Multiple Choice
<p align="center">
  <img alt="hanzikon logo" src="https://github.com/sopra-fs23-group-16/sopra-fs23-HanZikon-client/blob/main/src/image/choice.png" /><br/>
</p>

### Result
<p align="center">
  <img alt="hanzikon logo" src="https://github.com/sopra-fs23-group-16/sopra-fs23-HanZikon-client/blob/main/src/image/result.png" /><br/>
</p>

## Roadmap

### Tourist Mode

Our application currently only supports registered users. However, the separation of Player class and User allows further introducing a guest mode. By implementing a guest mode, users who haven't registered or logged in can still access and enjoy certain features of the application.

### Single-player Mode

Single-player mode can be designed as a limited feature to registered users by offering graded difficulty levels that allow them to progress through different stages and unlock new challenges. Additionally, the system can provide a way for guests to track and improve their performance by refreshing their records.

### Game History

For registered users, they can have access to advanced features that allow them to record both single-player game progress and multiplayer game records.

### Mobile Adaptability

Our application currently only caters to PC and tablet devices, and there is room for improvement in terms of the layout and scaling of the UI for mobile devices.

## Contribution

Please read [CONTRIBUTIONS.md](https://github.com/sopra-fs23-group-16/sopra-fs23-HanZikon-server/blob/main/contributions.md) for details on our code of conduct.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details

## Acknowledgments

If you want to say **thank you** or/and support active development of `HanziKon`:

- Add a [GitHub Star](https://github.com/sopra-fs23-group-16) to the project.
- Contact us [Contributors](https://github.com/sopra-fs23-group-16/sopra-fs23-HanZikon-server/graphs/contributors).

Together, we can make this project **better** every day! 😘
