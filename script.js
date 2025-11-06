// Jugadores posibles
const jugadoresTotales = [
  "Cristiano Ronaldo", "Wayne Rooney", "Juan Sebastián Verón", "Luis Suárez", "Marco van Basten", "Gianluigi Buffon", "Xavi", "Andrés Iniesta", 
  "Didier Drogba", "Eden Hazard", "Carlos Tévez", "Bastian Schweinsteiger", "Steven Gerrard", "Alessandro Del Piero", "Neymar Jr", 
  "Diego Forlán", "Mesut Özil", "Michael Ballack", "Robin van Persie", "David Beckham", "Ryan Giggs", "Paul Scholes", "Zinedine Zidane", 
  "Lionel Messi", "Gareth Bale", "Pavel Nedvěd", "Paolo Maldini", "Sergio Agüero", "Raúl González", "Iker Casillas", "Edinson Cavani", 
  "Karim Benzema", "Mario Mandžukić", "Mario Balotelli", "Zlatan Ibrahimović", "Lothar Matthäus", "Andriy Shevchenko", "Eric Cantona", 
  "Ronaldinho", "Ronaldo Nazário", "Romário", "Rivaldo", "Robinho", "Kaká", "Radamel Falcao", "Franck Ribéry", "Andrea Pirlo", "Tim Cahill", 
  "Vincent Kompany", "Ferenc Puskás", "Eusébio", "Franz Beckenbauer", "Michel Platini", "George Best", "Bobby Charlton", "Johan Cruyff", 
  "Roberto Baggio", "Diego Armando Maradona", "Pelé", "Fabio Cannavaro", "Javier 'Chicharito' Hernández", "Alexis Sánchez", "Hulk", 
  "Alexi Lalas", "Jack Wilshere", "Keisuke Honda", "Sergio Busquets", "Thierry Henry", "Luka Modrić", "Arturo Vidal", "Park Ji-sung", 
  "Landon Donovan", "Samuel Eto'o", "Gianluca Zambrotta", "Gennaro Gattuso", "Hernán Crespo", "Cafú", "Gerard Piqué", "Dani Alves", 
  "Rafael Márquez", "Miroslav Klose", "Cesc Fàbregas", "Eric Abidal", "James Rodríguez", "Zico", "Thiago Silva", "David Luiz", 
  "Lukas Podolski", "Jordi Alba", "Gary Medel", "Waldo Ponce", "Tim Howard", "Clint Dempsey", "Adriano", "Carles Puyol", "Samuel Umtiti", 
  "Ferland Mendy", "Blaise Matuidi", "Kylian Mbappé", "Ousmane Dembélé", "N'Golo Kanté", "Presnel Kimpembe", "Antoine Griezmann", "Paul Pogba", 
  "Corentin Tolisso", "Lucas Hernández", "Theo Hernández", "Raphaël Varane", "Thomas Lemar", "Alphonse Areola", "Luis Díaz", "Juanfer Quintero", 
  "Juan Román Riquelme", "Sergio Ramos", "Lamine Yamal", "Marc Cucurella", "Erling Haaland", "Pepe", "Fábio Coentrão", "Nacho Fernández", 
  "Jesé Rodríguez", "Isco", "Marcelo", "Dani Carvajal", "Casemiro", "Álvaro Morata", "Ángel Di María", "Xabi Alonso", "Carlo Ancelotti", 
  "Roberto Carlos", "Marc Bartra", "Arjen Robben", "Jérôme Boateng", "Manuel Neuer", "Diego Godín", "Jan Oblak"
];

// Variables de juego
let ronda = 1;
let jugadorActual = 1;
let totalJugadores = 7;
let impostores = 1;
let usados = []; // jugadores usados en todas las rondas

// Elementos del DOM
const card = document.getElementById("card");
const cardInner = document.getElementById("card-inner");
const cardBack = document.getElementById("card-back");
const revelarBtn = document.getElementById("revelar");
const siguienteBtn = document.getElementById("siguiente");
const nuevaRondaBtn = document.getElementById("nueva-ronda");
const menuBtn = document.getElementById("menu");
const infoJugador = document.getElementById("jugador-numero");
const infoRonda = document.getElementById("ronda-numero");
const infoImpostores = document.getElementById("impostores-numero");

function actualizarInfo() {
  infoJugador.textContent = `JUGADOR ${jugadorActual}/${totalJugadores}`;
  infoRonda.textContent = `RONDA ${ronda}`;
  infoImpostores.textContent = `IMPOSTORES: ${impostores}`;
}

function seleccionarJugadorAleatorio() {
  let disponibles = jugadoresTotales.filter(j => !usados.includes(j));
  if (disponibles.length === 0) {
    alert("Se han usado todos los jugadores, reiniciando lista.");
    usados = [];
    disponibles = [...jugadoresTotales];
  }
  const elegido = disponibles[Math.floor(Math.random() * disponibles.length)];
  usados.push(elegido);
  return elegido;
}

function revelarCarta() {
  card.classList.add("flipped");

  const esImpostor = Math.random() < impostores / totalJugadores;
  const texto = esImpostor ? "IMPOSTOR 🕵️‍♂️" : seleccionarJugadorAleatorio();
  cardBack.textContent = texto;
  cardBack.style.color = esImpostor ? "red" : "#ffcc00";

  revelarBtn.style.display = "none";
  siguienteBtn.style.display = "inline-block";
}

function siguienteJugador() {
  card.classList.remove("flipped");
  cardBack.textContent = "";
  revelarBtn.style.display = "inline-block";
  siguienteBtn.style.display = "none";

  jugadorActual++;
  if (jugadorActual > totalJugadores) {
    nuevaRondaBtn.style.display = "inline-block";
    menuBtn.style.display = "inline-block";
    revelarBtn.style.display = "none";
    siguienteBtn.style.display = "none";
  }
  actualizarInfo();
}

function nuevaRonda() {
  ronda++;
  jugadorActual = 1;
  nuevaRondaBtn.style.display = "none";
  menuBtn.style.display = "none";
  revelarBtn.style.display = "inline-block";
  actualizarInfo();
}

function reiniciarJuego() {
  ronda = 1;
  jugadorActual = 1;
  usados = [];
  nuevaRondaBtn.style.display = "none";
  menuBtn.style.display = "none";
  revelarBtn.style.display = "inline-block";
  actualizarInfo();
}

// Eventos
revelarBtn.addEventListener("click", revelarCarta);
siguienteBtn.addEventListener("click", siguienteJugador);
nuevaRondaBtn.addEventListener("click", nuevaRonda);
menuBtn.addEventListener("click", reiniciarJuego);

// Inicialización
actualizarInfo();
