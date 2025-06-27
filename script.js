const games = [
  {
    name: "Lava Escape",
    image: "assets/lava.png",
    path: "games/lava-escape/index.html"
  },
  {
    name: "Inferno Ascent",
    image: "assets/inferno.png",
    path: "games/inferno-ascent/index.html"
  }
];

const gamesSection = document.getElementById("games");

games.forEach(game => {
  const card = document.createElement("div");
  card.className = "game-card";

  const img = document.createElement("img");
  img.src = game.image;
  img.alt = game.name;

  const title = document.createElement("h2");
  title.textContent = game.name;

  const playBtn = document.createElement("button");
  playBtn.textContent = "Play";
  playBtn.onclick = () => window.open(game.path, "_blank");

  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(playBtn);

  gamesSection.appendChild(card);
});
