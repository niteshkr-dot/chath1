// =====================================
// 1. LOADING SCREEN
// =====================================

window.addEventListener("load", function () {
    const loader = document.getElementById("loader");

    setTimeout(function () {
        loader.classList.add("fade-out");

        setTimeout(function () {
            loader.classList.add("hidden");
        }, 650);
    }, 900);
});


// =====================================
// 2. WELCOME PAGE TO MAIN WEBSITE
// =====================================

const startBtn = document.getElementById("startBtn");
const introPage = document.getElementById("introPage");
const mainPage = document.getElementById("mainPage");

startBtn.addEventListener("click", function () {
    introPage.classList.add("hidden");
    mainPage.classList.remove("hidden");

    playSound("bell");

    setTimeout(function () {
        playSound("shankh");
    }, 700);

    window.scrollTo(0, 0);
});


// =====================================
// 3. BELL AND SHANKH SOUND
// =====================================

function playSound(id) {
    const audio = document.getElementById(id);

    if (!audio) return;

    audio.currentTime = 0;

    audio.play().catch(function () {
        console.log("Audio file nahi mila ya play nahi ho saka.");
    });
}

document.getElementById("bellBtn").addEventListener("click", function () {
    playSound("bell");
});

document.getElementById("shankhBtn").addEventListener("click", function () {
    playSound("shankh");
});


// =====================================
// 4. BHAJAN PLAYER
// =====================================

// Apni MP3 files assets folder mein rakhein.
// Filhaal ek song diya hai.
// Aur songs add karne ke liye list mein naam badha sakte hain.

const songs = [
    {
        name: "छठ पूजा भक्ति गीत",
        file: "chhath-song.mpeg"
    },
    {
        name: "छठ पूजा गीत 2",
        file: "chhath-song2.mpeg"
    },
    {
        name: "छठ पूजा गीत 3",
        file: "chhath-song3.mpeg"
    }
];

const bhajan = document.getElementById("bhajan");
const musicBtn = document.getElementById("musicBtn");
const songName = document.getElementById("songName");
const musicDisc = document.querySelector(".music-disc");

let currentSong = 0;

function loadSong(index) {
    currentSong = (index + songs.length) % songs.length;

    bhajan.src = songs[currentSong].file;
    songName.textContent = songs[currentSong].name;
    musicBtn.textContent = "▶";
    musicDisc.classList.remove("playing");
}

async function playCurrentSong() {
    try {
        await bhajan.play();
        musicBtn.textContent = "⏸";
        musicDisc.classList.add("playing");
    } catch (error) {
        alert("MP3 file check karein. assets folder mein sahi song rakhein.");
    }
}

musicBtn.addEventListener("click", function () {
    if (bhajan.paused) {
        playCurrentSong();
    } else {
        bhajan.pause();
        musicBtn.textContent = "▶";
        musicDisc.classList.remove("playing");
    }
});

document.getElementById("nextSong").addEventListener("click", function () {
    loadSong(currentSong + 1);
    playCurrentSong();
});

document.getElementById("prevSong").addEventListener("click", function () {
    loadSong(currentSong - 1);
    playCurrentSong();
});

bhajan.addEventListener("ended", function () {
    loadSong(currentSong + 1);
    playCurrentSong();
});

loadSong(0);


// =====================================
// 5. DARK AND LIGHT MODE
// =====================================

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    themeBtn.textContent = isDark ? "☀️" : "🌙";
});


// =====================================
// 6. HINDI AND ENGLISH
// =====================================

let isHindi = true;

document.getElementById("languageBtn").addEventListener("click", function () {
    isHindi = !isHindi;

    document.querySelectorAll("[data-hi]").forEach(function (element) {
        element.textContent = isHindi
            ? element.dataset.hi
            : element.dataset.en;
    });

    this.textContent = isHindi ? "English" : "हिंदी";
});


// =====================================
// 7. COUNTDOWN
// =====================================

// Yahan apne festival ki date aur time set karein.
// Date format: YYYY-MM-DDTHH:MM:SS+05:30

const CHHATH_DATE = "2026-11-13T00:00:00+05:30";

const targetDate = new Date(CHHATH_DATE).getTime();

function updateCountdown() {
    const now = Date.now();
    const difference = targetDate - now;

    if (Number.isNaN(targetDate) || difference <= 0) {
        ["days", "hours", "minutes", "seconds"].forEach(function (id) {
            document.getElementById(id).textContent = "00";
        });
        return;
    }

    const days = Math.floor(difference / 86400000);
    const hours = Math.floor((difference % 86400000) / 3600000);
    const minutes = Math.floor((difference % 3600000) / 60000);
    const seconds = Math.floor((difference % 60000) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);


// =====================================
// 8. PUJA CHECKLIST
// =====================================

const checklist = document.querySelectorAll(
    "#pujaChecklist input[type='checkbox']"
);

const checkProgress = document.getElementById("checkProgress");

function updateChecklist() {
    const completed = document.querySelectorAll(
        "#pujaChecklist input:checked"
    ).length;

    checkProgress.textContent =
        completed + " / " + checklist.length + " सामान तैयार";
}

checklist.forEach(function (item) {
    item.addEventListener("change", updateChecklist);
});

updateChecklist();


// =====================================
// 9. FLOATING FLOWERS AND DIYAS
// =====================================

const flowersContainer = document.getElementById("flowers");

const flowerSymbols = ["🌸", "🌼", "🌺", "🪷", "🪔"];

function createFlower() {
    const flower = document.createElement("span");

    flower.className = "flower";
    flower.textContent =
        flowerSymbols[Math.floor(Math.random() * flowerSymbols.length)];

    flower.style.left = Math.random() * 100 + "vw";
    flower.style.fontSize = (16 + Math.random() * 16) + "px";
    flower.style.animationDuration = (6 + Math.random() * 5) + "s";

    flowersContainer.appendChild(flower);

    setTimeout(function () {
        flower.remove();
    }, 12000);
}

setInterval(createFlower, 1000);


// =====================================
// 10. FULL SCREEN PHOTO GALLERY
// =====================================

const galleryImages = Array.from(
    document.querySelectorAll(".gallery-img")
);

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");

let currentImage = 0;

function showImage(index) {
    currentImage =
        (index + galleryImages.length) % galleryImages.length;

    lightboxImage.src = galleryImages[currentImage].src;
    lightboxImage.alt = galleryImages[currentImage].alt;
    lightbox.classList.remove("hidden");
}

galleryImages.forEach(function (image, index) {
    image.addEventListener("click", function () {
        showImage(index);
    });
});

document.getElementById("closeLightbox").addEventListener("click", function () {
    lightbox.classList.add("hidden");
});

document.getElementById("nextImage").addEventListener("click", function () {
    showImage(currentImage + 1);
});

document.getElementById("prevImage").addEventListener("click", function () {
    showImage(currentImage - 1);
});

lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
        lightbox.classList.add("hidden");
    }
});

document.addEventListener("keydown", function (event) {
    if (lightbox.classList.contains("hidden")) return;

    if (event.key === "Escape") {
        lightbox.classList.add("hidden");
    }

    if (event.key === "ArrowRight") {
        showImage(currentImage + 1);
    }

    if (event.key === "ArrowLeft") {
        showImage(currentImage - 1);
    }
});


// =====================================
// 11. DAILY CHHATH MESSAGE
// =====================================

const messages = [
    "छठी मैया आपके जीवन में सुख, शांति और समृद्धि लाएँ। 🙏",
    "सूर्य देव की कृपा आप सभी पर बनी रहे। 🌞",
    "आपके घर में खुशियों और प्रेम का प्रकाश फैले। 🪔",
    "छठी मैया आपकी सभी शुभ मनोकामनाएँ पूर्ण करें। 🌸",
    "श्रद्धा, विश्वास और पवित्रता से आपका जीवन रोशन हो।"
];

const dailyMessage = document.getElementById("dailyMessage");

function showRandomMessage() {
    const randomIndex = Math.floor(Math.random() * messages.length);
    dailyMessage.textContent = messages[randomIndex];
}

showRandomMessage();

document.getElementById("newMessageBtn").addEventListener("click", function () {
    showRandomMessage();
});


// =====================================
// 12. GREETING CARD GENERATOR
// =====================================

const userName = document.getElementById("userName");
const makeCardBtn = document.getElementById("makeCardBtn");
const cardPreview = document.getElementById("cardPreview");
const cardName = document.getElementById("cardName");
const downloadCardBtn = document.getElementById("downloadCardBtn");

makeCardBtn.addEventListener("click", function () {
    const name = userName.value.trim();

    if (!name) {
        alert("कृपया अपना नाम लिखें।");
        userName.focus();
        return;
    }

    cardName.textContent = "शुभकामनाएँ: " + name;
    cardPreview.classList.remove("hidden");
    downloadCardBtn.classList.remove("hidden");
});

downloadCardBtn.addEventListener("click", function () {
    const canvas = document.getElementById("cardCanvas");
    const ctx = canvas.getContext("2d");

    const name = userName.value.trim();

    // Card Background
    const gradient = ctx.createLinearGradient(0, 0, 1000, 700);
    gradient.addColorStop(0, "#702600");
    gradient.addColorStop(0.5, "#bd4d0b");
    gradient.addColorStop(1, "#ffbd54");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1000, 700);

    // Border
    ctx.strokeStyle = "#ffdf91";
    ctx.lineWidth = 12;
    ctx.strokeRect(25, 25, 950, 650);

    // Decorative Sun
    ctx.fillStyle = "#ffd36b";
    ctx.beginPath();
    ctx.arc(500, 155, 65, 0, Math.PI * 2);
    ctx.fill();

    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";

    ctx.font = "bold 60px sans-serif";
    ctx.fillText("जय छठी मैया", 500, 310);

    ctx.font = "32px sans-serif";
    ctx.fillText("आपको और आपके परिवार को", 500, 385);

    ctx.font = "bold 38px sans-serif";
    ctx.fillText("छठ महापर्व की हार्दिक शुभकामनाएँ", 500, 455);

    ctx.font = "30px sans-serif";
    ctx.fillText("शुभकामनाएँ: " + name, 500, 535);

    ctx.font = "55px sans-serif";
    ctx.fillText("🌸 🪔 🌼", 500, 610);

    const downloadLink = document.createElement("a");
    downloadLink.download = "Chhath-Puja-Greeting.png";
    downloadLink.href = canvas.toDataURL("image/png");
    downloadLink.click();
});


// =====================================
// 13. WHATSAPP SHARE
// =====================================

document.getElementById("shareBtn").addEventListener("click", function () {
    const message =
        "🌞 जय छठी मैया 🌞\n\n" +
        "आपको और आपके परिवार को छठ महापर्व की हार्दिक शुभकामनाएँ।\n" +
        "छठी मैया सभी के जीवन में सुख, शांति और समृद्धि लाएँ। 🙏";

    const url =
        "https://wa.me/?text=" + encodeURIComponent(message);

    window.open(url, "_blank");
});


// =====================================
// 14. FIREWORKS ANIMATION
// =====================================

const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];

function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.55;

    for (let i = 0; i < 45; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 4;

        particles.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 70,
            color: `hsl(${Math.random() * 360}, 100%, 65%)`
        });
    }
}

function animateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(function (particle) {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.025;
        particle.life--;

        ctx.globalAlpha = Math.max(0, particle.life / 70);
        ctx.fillStyle = particle.color;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
        ctx.fill();
    });

    ctx.globalAlpha = 1;

    particles = particles.filter(function (particle) {
        return particle.life > 0;
    });

    requestAnimationFrame(animateFireworks);
}

animateFireworks();

document.getElementById("fireworksBtn").addEventListener("click", function () {
    for (let i = 0; i < 5; i++) {
        setTimeout(createFirework, i * 350);
    }
});


// =====================================
// 15. SCROLL REVEAL ANIMATION
// =====================================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    revealElements.forEach(function (element) {
        observer.observe(element);
    });
} else {
    revealElements.forEach(function (element) {
        element.classList.add("visible");
    });
}

console.log("जय छठी मैया! वेबसाइट तैयार है।");
function showGhat(type) {
    const scene = document.getElementById("ghatScene");
    const title = document.getElementById("ghatTitle");
    const description = document.getElementById("ghatDescription");

    const eveningBtn = document.getElementById("eveningBtn");
    const morningBtn = document.getElementById("morningBtn");

    if (type === "evening") {
        scene.className = "ghat-scene evening-scene";

        title.innerText = "🌇 संध्या अर्घ्य";
        description.innerText =
            "छठ पूजा के तीसरे दिन शाम को डूबते सूर्य को अर्घ्य अर्पित किया जाता है।";

        eveningBtn.classList.add("active");
        morningBtn.classList.remove("active");

    } else {
        scene.className = "ghat-scene morning-scene";

        title.innerText = "🌅 उषा अर्घ्य";
        description.innerText =
            "छठ पूजा के चौथे दिन अगली सुबह उगते सूर्य को अर्घ्य अर्पित किया जाता है।";

        morningBtn.classList.add("active");
        eveningBtn.classList.remove("active");
    }
}
$("photoInput").addEventListener("change", e => {
    [...e.target.files].forEach(file => {
        if (!file.type.startsWith("image/")) return;
        const url = URL.createObjectURL(file);
        const img = document.createElement("img");
        img.src = url; img.alt = "अपलोड की गई छठ पूजा फोटो";
        $("uploadedPhotos").prepend(img);
    });
});
