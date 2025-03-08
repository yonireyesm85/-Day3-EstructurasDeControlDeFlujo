document.addEventListener("DOMContentLoaded", () => {
  const wizardText = document.getElementById("wizard-text");
  const choicesContainer = document.getElementById("choices-container");
  const startButton = document.getElementById("start-game");
  const musicButton = document.getElementById("play-music");
  const backgroundMusic = document.getElementById("background-music");

  let currentStep = 0;
  let userChoices = {};

  const dialogue = [
    {
      question: "¿Quieres aprender programación?",
      choices: ["Sí", "No"],
      responses: [
        "¡Un gran viajero siempre busca conocimiento!",
        "Oh, entonces este no es tu destino... ¡pero siempre puedes cambiar de opinión!",
      ],
      endGame: [false, true],
    },
    {
      question: "¿Quieres seguir en el área de Front-End o Back-End?",
      choices: ["Front-End", "Back-End"],
      responses: [
        "¡El arte de hacer que todo se vea increíble!",
        "¡El poder oculto detrás del sistema!",
      ],
    },
    {
      question: {
        "Front-End": "¿Quieres aprender React o Vue?",
        "Back-End": "¿Quieres aprender C# o Java?",
      },
      choices: {
        "Front-End": ["React", "Vue"],
        "Back-End": ["C#", "Java"],
      },
      responses: {
        "Front-End": [
          "React, el camino del componente reusable...",
          "Vue, la simplicidad de lo elegante...",
        ],
        "Back-End": [
          "C#, el lenguaje de los poderosos hechiceros de Microsoft...",
          "Java, la robustez de un guerrero experimentado...",
        ],
      },
    },
    {
      question:
        "¿Quieres especializarte en tu área elegida o convertirte en Fullstack?",
      choices: ["Especializarme", "Fullstack"],
      responses: [
        "Una elección sabia, el dominio en tu área te llevará lejos...",
        "¡Un camino desafiante, pero con grandes recompensas!",
      ],
    },
    {
      question: "¿En qué tecnología te gustaría especializarte?",
      choices: {
        "Front-End": ["Angular", "Svelte", "TailwindCSS"],
        "Back-End": ["Node.js", "Django", "Spring Boot"],
      },
      responses: {
        "Front-End": [
          "Angular, el framework robusto para aplicaciones empresariales...",
          "Svelte, la nueva era del desarrollo reactivo...",
          "TailwindCSS, la velocidad y eficiencia en el diseño web...",
        ],
        "Back-End": [
          "Node.js, el motor del backend moderno y escalable...",
          "Django, el framework de los desarrolladores ágiles y poderosos...",
          "Spring Boot, la base sólida para aplicaciones empresariales...",
        ],
      },
    },
  ];

  function startGame() {
    currentStep = 0;
    userChoices = {};
    startButton.style.display = "none";
    nextQuestion();
  }

  function nextQuestion() {
    choicesContainer.innerHTML = "";

    if (currentStep >= dialogue.length) {
      showSummary();
      return;
    }

    const step = dialogue[currentStep];
    const question = step.question[userChoices.area] || step.question;
    const choices = step.choices[userChoices.area] || step.choices;
    const responses = step.responses[userChoices.area] || step.responses;

    showQuestion(question, choices, responses, step.endGame);
  }

  function showQuestion(question, choices, responses, endGame = []) {
    typeText(wizardText, question + "..", () => {
      choicesContainer.innerHTML = "";
      choices.forEach((choice, index) => {
        let button = document.createElement("button");
        button.textContent = choice;
        button.onclick = () => handleChoice(index, choice, responses, endGame);
        choicesContainer.appendChild(button);
      });
    });
  }

  function handleChoice(choiceIndex, choice, responses, endGame) {
    choicesContainer.innerHTML = "";
    typeText(wizardText, responses[choiceIndex] + "..", () => {
      if (endGame && endGame[choiceIndex]) {
        startButton.style.display = "block";
        startButton.textContent = "Reiniciar Juego";
      } else {
        if (currentStep === 1) userChoices.area = choice;
        if (currentStep === 2) userChoices.language = choice;
        if (currentStep === 3) userChoices.specialization = choice;
        if (currentStep === 4) userChoices.technology = choice;

        let nextButton = document.createElement("button");
        nextButton.textContent = "Siguiente";
        nextButton.onclick = () => {
          currentStep++;
          nextQuestion();
        };
        choicesContainer.appendChild(nextButton);
      }
    });
  }

  function showSummary() {
    let finalMessage = `Viajero, has elegido sabiamente tu camino... Tu destino es ${userChoices.area}, donde dominaras ${userChoices.language}. 
    Has decidido ${userChoices.specialization} y tambien tener un enfoque en ${userChoices.technology}. 
    ¡Sigue adelante y recuerda que el aprendizaje es un viaje sin final!`;

    typeText(wizardText, finalMessage);

    let restartButton = document.createElement("button");
    restartButton.textContent = "Iniciar Juego";
    restartButton.onclick = startGame;
    choicesContainer.appendChild(restartButton);
  }

  function typeText(element, text, callback) {
    let i = 0;
    element.textContent = "";
    let interval = setInterval(() => {
      if (i < text.length) {
        element.textContent += text[i];
        i++;
      } else {
        clearInterval(interval);
        if (callback) callback();
      }
    }, 50);
  }

  startButton.addEventListener("click", startGame);
  musicButton.addEventListener("click", () => {
    if (backgroundMusic.paused) {
      backgroundMusic.play();
      musicButton.textContent = "Pausar Música";
    } else {
      backgroundMusic.pause();
      musicButton.textContent = "Banda Sonora!";
    }
  });
});
