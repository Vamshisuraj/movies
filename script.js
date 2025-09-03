const movies = [
  {
    title: "Mirai",
    img: "images/mirai.jpg",
    price: 180,
    description: "Fantasy action‑adventure releasing Sept 12, 2025"
  },
  {
    title: "Daaku Maharaaj",
    img: "images/daaku_maharaaj.jpg",
    price: 150,
    description: "Period action drama released Jan 12, 2025"
  },
  {
    title: "Sarangapani Jathakam",
    img: "images/sarangapani_jathakam.jpg",
    price: 140,
    description: "Crime comedy drama released Apr 25, 2025"
  },
  {
    title: "Dilruba",
    img: "images/dilruba.jpg",
    price: 130,
    description: "Romantic action drama released Mar 14, 2025"
  }
];

const movieListEl = document.getElementById("movie-list");
const bookingArea = document.getElementById("booking-area");
const selectedTitle = document.getElementById("selected-movie-title");
const seatMapEl = document.getElementById("seat-map");
const countEl = document.getElementById("selected-count");
const totalEl = document.getElementById("selected-total");
const confirmBtn = document.getElementById("confirm-btn");

let selectedMovie = null;
let pricePerSeat = 0;
let selectedSeats = new Set();

movies.forEach((movie, idx) => {
  const card = document.createElement("div");
  card.className = "movie-card";
  card.innerHTML = `<img src="${movie.img}" alt="${movie.title}" />
                    <h3>${movie.title}</h3>
                    <p>${movie.description}</p>`;
  card.onclick = () => startBooking(idx);
  movieListEl.appendChild(card);
});

function startBooking(idx) {
  selectedMovie = movies[idx];
  pricePerSeat = selectedMovie.price;
  selectedSeats.clear();
  bookingArea.classList.remove("hidden");
  selectedTitle.textContent = selectedMovie.title;
  renderSeats();
  updateSummary();
}

function renderSeats() {
  seatMapEl.innerHTML = "";
  for (let i = 1; i <= 40; i++) {
    const seat = document.createElement("div");
    seat.className = "seat";
    if (Math.random() < 0.2) seat.classList.add("unavailable");
    seat.textContent = i;
    seat.onclick = () => toggleSeat(i, seat);
    seatMapEl.appendChild(seat);
  }
}

function toggleSeat(num, el) {
  if (el.classList.contains("unavailable")) return;
  if (selectedSeats.has(num)) {
    selectedSeats.delete(num);
    el.classList.remove("selected");
  } else {
    selectedSeats.add(num);
    el.classList.add("selected");
  }
  updateSummary();
}

function updateSummary() {
  countEl.textContent = selectedSeats.size;
  totalEl.textContent = selectedSeats.size * pricePerSeat;
}

confirmBtn.onclick = () => {
  alert(`Booked ${selectedSeats.size} seats for "${selectedMovie.title}"\nTotal: ₹${selectedSeats.size * pricePerSeat}`);
};
