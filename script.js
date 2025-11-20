// Массив случайных котят
const catSources = [
    "https://placekitten.com/400/500",
    "https://placekitten.com/420/520",
    "https://placekitten.com/410/550",
    "https://placekitten.com/430/530",
    "https://placekitten.com/440/540"
];

const card = document.getElementById("cat-card");
const img = document.getElementById("cat-img");

function loadNewCat() {
    img.src = catSources[Math.floor(Math.random() * catSources.length)];
}
loadNewCat();

// --- ПК лайки ---
document.getElementById("likeBtn").addEventListener("click", () => swipe("right"));
document.getElementById("dislikeBtn").addEventListener("click", () => swipe("left"));

// --- Телефонные свайпы ---
let startX = 0;

card.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

card.addEventListener("touchmove", (e) => {
    const dx = e.touches[0].clientX - startX;
    card.style.transform = `translateX(${dx}px) rotate(${dx / 15}deg)`;
});

card.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - startX;

    if (dx > 120) swipe("right");
    else if (dx < -120) swipe("left");
    else {
        card.style.transform = "translateX(0) rotate(0)";
    }
});

// --- Анимация свайпа ---
function swipe(direction) {
    if (direction === "right") {
        card.style.transform = "translateX(200px) rotate(25deg)";
    } else {
        card.style.transform = "translateX(-200px) rotate(-25deg)";
    }

    card.style.opacity = "0";

    setTimeout(() => {
        card.style.transition = "none";
        card.style.transform = "translateX(0) rotate(0)";
        card.style.opacity = "1";
        loadNewCat();

        // вернуть анимацию
        setTimeout(() => {
            card.style.transition = "transform 0.3s ease-out, opacity 0.3s ease-out";
        }, 50);
    }, 250);
               }
