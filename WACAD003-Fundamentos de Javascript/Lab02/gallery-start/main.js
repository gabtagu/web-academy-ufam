const displayedImage = document.querySelector(".displayed-img");
const thumbBar = document.querySelector(".thumb-bar");

const btn = document.querySelector("button");
const overlay = document.querySelector(".overlay");

/* Declaring the array of image filenames */
const imageFilenames = [
  "pic1.jpeg",
  "pic2.jpg",
  "pic3.jpg",
  "pic4.jpg",
  "pic5.jpg",
];

/* Declaring the alternative text for each image file */
const altText = {
  "pic1.jpeg": "Hatsune Miku",
  "pic2.jpg": "Frieren",
  "pic3.jpg": "Faustão",
  "pic4.jpg": "Wandinha",
  "pic5.jpg": "Ryan Gosling",
};

/* Looping through images */
imageFilenames.forEach((filename) => {
  const img =
    document.createElement("img"); /* Cria um elemento img dentro do HTML */
  img.src = `images/${filename}`; /* Busca o src das imagens */
  img.alt = altText[filename]; /* Define os textos alternativos */
  img.onclick = () => {
    displayedImage.src = img.src;
    displayedImage.alt = img.alt;
  }; /* Evento de click para mudar a imagem ao clicar nela */
  thumbBar.appendChild(img); /* Adiciona a imagem na barra */
});

/* Wiring up the Darken/Lighten button */
btn.addEventListener("click", () => {
  btn.classList.toggle("dark"); /* Alterna a classe entre dark e light */
  btn.classList.toggle("light");
  /* Muda o texto do botão e a cor do overlay conforme a classe */
  if (btn.classList.contains("light")) {
    btn.textContent = "Lighten";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  } else {
    btn.textContent = "Darken";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0)";
  }
});
