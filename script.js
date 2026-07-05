/*
TO DO:
Добавить контролер с музыкой. Сделать массив из музыки
!сделать и под мобилки
*/

// MAIN
const scoreCounter = document.getElementById("score");
const button = document.getElementById("button");
const endButton = document.getElementById("end");
const endScreen = document.getElementById("end-screen");
const closeButton = document.getElementById("close-end-screen");
const resetButton = document.getElementById("reset-button");

//MUTABLE (изменяемые)
const finalScore = Number(1);
const coefficient = 2;
const multiplyCoefficient = 1.5;

// UPGRADES
const upgradeHero = document.getElementById("upgrades");
const upgradeMobile = document.getElementById("upgrade-for-mobile");
const removeButton = document.getElementById("remove-upgrades");
const upgrade1 = document.getElementById("upgrade1");
const upgrade2 = document.getElementById("upgrade2");
const upgrade3 = document.getElementById("upgrade3");

// UPGRADES VALUE
const upgradeValue1 = document.getElementById("value1");
const upgradeValue2 = document.getElementById("value2");
const upgradeValue3 = document.getElementById("value3");

//STATISTICS
const stat = document.getElementById("stats");
const clickPowerStat = document.getElementById("click-power");
const autoClickStat = document.getElementById("auto-click");

//AUDIO
const buttonSound = document.getElementById("button-sound");
const upgradeSound = document.getElementById("upgrade-sound");

//MAIN
button.addEventListener("click", clickButton);

let gameState = {
  clicks: 0,
  clickPower: 1,
  autoClicks: 0,
};

let values = {
  upgradeValue1: 10,
  upgradeValue2: 500,
  upgradeValue3: 200,
};

function saveGame() {
  localStorage.setItem("save", JSON.stringify(gameState));
  localStorage.setItem("saveValue", JSON.stringify(values));
}

function loadGame() {
  const savedData = localStorage.getItem("save");
  if (savedData) {
    gameState = JSON.parse(savedData);
  }
  const savedValue = localStorage.getItem("saveValue");
  if (savedValue) {
    values = JSON.parse(savedValue);
  }
  updateUI();
  autoClick();
}

function updateUI() {
  upgradeValue1.textContent = values.upgradeValue1;
  upgradeValue2.textContent = values.upgradeValue2;
  upgradeValue3.textContent = values.upgradeValue3;
}

function clickButton() {
  gameState.clicks += gameState.clickPower;

  clickEffect();
  saveGame();
  refreshScore();
  buttonSound.currentTime = 0;
  buttonSound.volume = 0.3;
  buttonSound.play();
}

function refreshScore() {
  if (gameState.clicks >= 0) {
    scoreCounter.textContent = Math.round(gameState.clicks);
  } else scoreCounter.textContent = 0;

  //STATISTICS
  clickPowerStat.textContent = Math.round(gameState.clickPower);
  autoClickStat.textContent = Math.round(gameState.autoClicks);
}

// UPGRADE
upgrade1.addEventListener("click", plusOneClick);

function plusOneClick() {
  if (gameState.clicks >= values.upgradeValue1) {
    gameState.clickPower += 1;
    gameState.clicks -= values.upgradeValue1;
    values.upgradeValue1 = Math.round(values.upgradeValue1 * coefficient);
    upgradeValue1.textContent = values.upgradeValue1;

    saveGame();
    refreshScore();
  } else {
    alert(
      `You don't have ${values.upgradeValue1 - Math.round(gameState.clicks)} points`,
    );
  }
}

upgrade2.addEventListener("click", multiplyClicks);

function multiplyClicks() {
  if (gameState.clicks >= values.upgradeValue2) {
    gameState.clickPower *= multiplyCoefficient;
    gameState.clicks -= values.upgradeValue2;
    values.upgradeValue2 = Math.round(values.upgradeValue2 * coefficient);
    upgradeValue2.textContent = values.upgradeValue2;

    saveGame();
    refreshScore();
  } else {
    alert(
      `You don't have ${values.upgradeValue2 - Math.round(gameState.clicks)} points`,
    );
  }
}

upgrade3.addEventListener("click", plusOneAutoClick);

function plusOneAutoClick() {
  if (gameState.clicks >= values.upgradeValue3) {
    gameState.autoClicks += 1;
    gameState.clicks -= values.upgradeValue3;
    values.upgradeValue3 = Math.round(values.upgradeValue3 * coefficient);
    upgradeValue3.textContent = values.upgradeValue3;

    saveGame();
    refreshScore();
  } else {
    alert(
      `You don't have ${values.upgradeValue3 - Math.round(gameState.clicks)} points`,
    );
  }
}
let autoClickTimer = null;

function autoClick() {
  if (!autoClickTimer) {
    autoClickTimer = setInterval(() => {
      gameState.clicks += gameState.autoClicks;
      if (gameState.autoClicks > 0) {
        autoClickEffect();
      }

      refreshScore();
      saveGame();
    }, 1000);
  } else {
    console.log("Автоклик не работает");
  }
}

function stopAutoClick() {
  if (autoClickTimer) {
  }
}

//EFFECTS
function clickEffect() {
  const effect = document.createElement("h1");
  effect.classList.add("effects");
  effect.textContent = `+${Math.round(gameState.clickPower)}`;

  effect.style.left = `${button.offsetLeft + Math.random() * button.offsetWidth}px`;
  effect.style.top = `${button.offsetTop + Math.random() * button.offsetHeight}px`;

  document.body.appendChild(effect);

  setTimeout(() => effect.remove(), 2000);
}

function autoClickEffect() {
  const effect = document.createElement("h1");
  effect.classList.add("effects");
  effect.textContent = `+${gameState.autoClicks}`;

  effect.style.left = `${button.offsetLeft + Math.random() * button.offsetWidth}px`;
  effect.style.top = `${button.offsetTop + Math.random() * button.offsetHeight}px`;

  document.body.appendChild(effect);

  setTimeout(() => effect.remove(), 1000);
}

//MUSIC
upgradeHero.addEventListener("click", woodSound);
stat.addEventListener("click", woodSound);
upgradeMobile.addEventListener("click", woodSound);

function woodSound() {
  upgradeSound.currentTime = 0;
  upgradeSound.play();
}

//BOOMBOX

// 1. Массив с музыкой
const playlist = [
  {
    title: "Core",
    src: "/audio/Undertale_-_Core_(SkySound.cc).mp3",
  },
  { title: "First Girl", src: "/audio/barradeen-first-girl-talking-to-me.mp3" },
  {
    title: "Ghost Fight",
    src: "/audio/toby-fox-undertale-soundtrack-10-ghost-fight.mp3",
  },
  { title: "Extenz Life", src: "/audio/extenz-life.mp3" },
  { title: "Asgore", src: "/audio/Undertale_-_Asgore_(SkySound.cc).mp3" },
  {
    title: "Take My Eyes",
    src: "/audio/barradeen-i-cant-take-my-eyes-out-of-you.mp3",
  },
];

let currentTrackIndex = 0;

const audio = new Audio();

const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const volumeSlider = document.getElementById("volume-slider");
const trackInfo = document.getElementById("track-info");

// 2. Функция инициализации трека
function loadTrack(index) {
  const track = playlist[index];
  audio.src = track.src;
  trackInfo.textContent = track.title;
  audio.volume = volumeSlider.value; // Синхронизируем громкость
}

// 3. Логика Воспроизведения / Паузы
function togglePlay() {
  if (audio.paused) {
    // Браузеры требуют клика пользователя перед вызовом .play()
    audio
      .play()
      .then(() => (playBtn.textContent = "⏸"))
      .catch((err) =>
        console.log("Кликните на страницу для запуска аудио:", err),
      );
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
}

// 4. Переключение треков
function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length; // Зацикливание вперед
  loadTrack(currentTrackIndex);
  audio.play().then(() => (playBtn.textContent = "⏸"));
}

function prevTrack() {
  currentTrackIndex =
    (currentTrackIndex - 1 + playlist.length) % playlist.length; // Зацикливание назад
  loadTrack(currentTrackIndex);
  audio.play().then(() => (playBtn.textContent = "⏸"));
}

// 5. Слушатели событий (Event Listeners)
playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);

// Изменение громкости на лету
volumeSlider.addEventListener("input", (e) => {
  audio.volume = e.target.value;
});

// Автоматическое переключение на следующий трек по окончании текущего
audio.addEventListener("ended", nextTrack);

// Загружаем самую первую песню при старте скрипта
loadTrack(currentTrackIndex);

//END
endButton.addEventListener("click", showEndScreen);
endButton.innerHTML = `<h1>The End: ${finalScore}</h1>`;

function showEndScreen() {
  if (gameState.clicks >= finalScore) {
    resetProgress();
    endScreen.style.display = "flex";
  } else {
    alert(`You don't have ${finalScore - Math.round(gameState.clicks)} points`);
  }
}

closeButton.addEventListener("click", closeEndScreen);

function closeEndScreen() {
  endScreen.style.display = "none";
}

//RESET
resetButton.addEventListener("click", resetProgress);

function resetProgress() {
  if (confirm("You want to reset?")) {
    gameState = {
      clicks: 0,
      clickPower: 1,
      autoClicks: 0,
    };
    values = {
      upgradeValue1: 10,
      upgradeValue2: 500,
      upgradeValue3: 200,
    };
    localStorage.clear();
    saveGame();
    refreshScore();
    updateUI();
  }
}

//MOBILE
upgradeMobile.addEventListener("click", () => {
  upgradeHero.classList.add("is-open");
});

removeButton.addEventListener("click", () => {
  upgradeHero.classList.remove("is-open");
});

loadGame();
refreshScore();
