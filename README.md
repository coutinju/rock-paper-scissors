# rock-paper-scissors

I was asked to code a web application allowing to play Rock Paper Scissors within 2-5 hours... I took advantage of this opportunity to practice and used as much time as I needed to produce a fine MVP. Not only with a good looking UI but also with a good code quality.

## Design

Before starting a task, one needs to know the requirements. This part will explain the design thinking.

### User stories
 
#### User Story Front

Title: Waste an Hour Having Fun

As a frequent games player, I'd like to play rock, paper, scissors 
So that I can spend an hour of my day having fun

Acceptance Criteria
- Can I play Player vs Computer?
- Can I play Computer vs Computer?
- Can I play a different game each time?

#### User Story Back

Technical Constraints

- Doesn't necessarily need a flashy GUI (can be simple)
- Use Javascript or Scala
- Libs / external modules should only be used for tests
- Using best in industry agile engineering practices

### Specfications (self-made)

As there were no clear directives for the frontend, I decided to realize my own mock-ups: [link to the mock-ups](https://www.figma.com/file/WWkUYpdVaHEW9xc5OM0Yja/rock-paper-scissors?node-id=0%3A1).
I took inspiration from Counter-Strike: Global-Offensive's 'Buy Menu' for the shape selector and decided to use IntelliJ IDEA's developper friendly colors for the icons (dark theme).

Some changes were made during the development, such as adding an overlay with a 'spinner' icon when requests are taking too long switching to a 'bug' icon when the call finally timed out. Also the help menu as not been implemented yet.

Once the plan was set I could start to think about the implementation.

### Domain Driven Design (DDD)

Following the user stories were explained the criteria to judge the project. One of them was referencing to DDD, as I never worked on project using this design pattern I decided to give it a try (and to be rescued from Anemic Domain Model /s).

I came up with those simple [diagrams](https://www.dropbox.com/s/1rgfcrfauiu51au/rock-paper-scissors.png?dl=0) (as the project itself is quite simple).

I used those contexts to organize my code backend side (given that it is really small it was not difficult), but also for the frontend. 

Now the big picture is clear, we can get into the technicalities.

## Implementation

### Tech Stack

As I never developed using Scala and not so much using NodeJS, I was recommended to develop using technologies I am familiar with. That's why I decided to build this application from scratch using Spring-Boot 2.2.2 for the backend and Angular 8 for the frontend.

### Deploy Locally

Because I plan to deploy my project on Heroku (WIP dev branch), I decided to change the Maven configuration to deploy a '.war' in order to group frontend and backend.

Thus, to deploy the project, execute the following command: 

```shell
rock-paper-scissors> mvn clean install
```

The previous command resolves dependencies, run unit tests (backend), compile the sources and copy the frontend application into the backend project to finally generate a war.

Now, to deploy the application to 'http://localhost:8080', execute:

```shell
rock-paper-scissors-rest> mvn spring-boot:run
```

You can now have waste an hour having fun, either by playing or watching some robots play!

### Tests

To test the backend application you can run the following command:

```shell
rock-paper-scissors-rest> mvn test
```

To execute frontend tests you have to execute the following commands:

```shell
rock-paper-scissors-webapp> npm test
```

End-to-end tests exist in the project but require the backend to be started.

```shell
rock-paper-scissors> mvn clean install
rock-paper-scissors-rest> mvn spring-boot:run
```

```shell
rock-paper-scissors-webapp> npm run e2e
```

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## Acknowledgments

This application is using icons from [Font Awesome Free License](https://fontawesome.com/license/free).