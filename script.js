const weddingDate = new Date("2026-08-15T15:00:00+08:00").getTime();
const countdownValues = document.querySelectorAll(".countdown-value");

function padNumber(value, length = 2) {
    return String(value).padStart(length, "0");
}

function updateCountdown() {
    const now = Date.now();
    const remaining = Math.max(weddingDate - now, 0);
    const totalSeconds = Math.floor(remaining / 1000);
    const values = {
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60
    };

    countdownValues.forEach((element) => {
        const unit = element.dataset.unit;
        const nextValue = unit === "days" ? padNumber(values[unit], 3) : padNumber(values[unit]);

        if (element.textContent !== nextValue) {
            element.textContent = nextValue;
            element.classList.remove("is-updating");
            void element.offsetWidth;
            element.classList.add("is-updating");
        }
    });
}

updateCountdown();
setInterval(updateCountdown, 1000);

const siteNav = document.querySelector(".site-nav");
const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelectorAll(".nav-links a");
const menuIcon = menuButton?.querySelector(".material-symbols-outlined");

function setMenuOpen(isOpen) {
    siteNav?.classList.toggle("is-open", isOpen);
    menuButton?.setAttribute("aria-expanded", String(isOpen));
    menuButton?.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");

    if (menuIcon) {
        menuIcon.textContent = isOpen ? "close" : "menu";
    }
}

if (siteNav && menuButton) {
    menuButton.addEventListener("click", () => {
        setMenuOpen(!siteNav.classList.contains("is-open"));
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => setMenuOpen(false));
    });
}

const videoPreview = document.querySelector(".video-preview");
const preWeddingVideo = document.querySelector(".pre-wedding-video");
const playButton = document.querySelector(".play-button");

if (videoPreview && preWeddingVideo && playButton) {
    playButton.addEventListener("click", () => {
        videoPreview.classList.add("is-playing");

        const videoUrl = new URL(preWeddingVideo.src);
        videoUrl.searchParams.set("autoplay", "1");
        preWeddingVideo.src = videoUrl.toString();

        playButton.setAttribute("aria-label", "Pre-wedding film is playing");
    });
}
