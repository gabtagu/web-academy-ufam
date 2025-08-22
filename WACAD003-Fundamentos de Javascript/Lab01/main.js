const customName = document.getElementById("customname");
const randomize = document.querySelector(".randomize");
const story = document.querySelector(".story");

function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

const storyText =
  "Estava 94 fahrenheit do lado de fora, então :insertx: foi dar uma volta. Quando chegou na :inserty:, tomou um baita susto, então :insertz:. Bob viu tudo, mas não ficou surpreso, então no fim do dia perceberam que era tudo um sonho e a história acabou sendo contada toda em inglês — :insertx: weighs 300 pounds, and it was a hot day.";

const insertX = ["Hatsune Miku", "Taylor Swift", "Leonardo DiCaprio"];
const insertY = ["Academia", "Irlanda", "Casa da Mariah Carey"];
const insertZ = [
  "mordeu a língua e morreu",
  "borrou as calças",
  "pediu pra votar no Bolsonaro",
];

randomize.addEventListener("click", result);

function result() {
  let newStory = storyText;
  const xItem = randomValueFromArray(insertX);
  const yItem = randomValueFromArray(insertY);
  const zItem = randomValueFromArray(insertZ);

  newStory = newStory.replace(/:insertx:/g, xItem);
  newStory = newStory.replace(/:inserty:/g, yItem);
  newStory = newStory.replace(/:insertz:/g, zItem);

  if (customName.value !== "") {
    const name = customName.value;
    newStory = newStory.replace("Bob", name);
  }

  if (document.getElementById("uk").checked) {
    const weight = Math.round(300 / 14.5833) + " stone";
    const temperature = Math.round(94 - 32) + " centigrade";

    newStory = newStory.replace("94 fahrenheit", temperature);
    newStory = newStory.replace("300 pounds", weight);
  }

  story.textContent = newStory;
  story.style.visibility = "visible";
}
