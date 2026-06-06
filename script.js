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

const qrImages = document.querySelectorAll(".qr_code_img");
const qrModal = document.querySelector("#qrModal");
const qrModalImage = document.querySelector("#qrModalImage");
const qrModalClose = document.querySelector(".qr-modal__close");
const qrModalBackdrop = document.querySelector(".qr-modal__backdrop");

function openQrModal(image) {
    if (!qrModal || !qrModalImage) {
        return;
    }

    qrModalImage.src = image.currentSrc || image.src;
    qrModalImage.alt = image.alt;
    qrModal.classList.add("is-open");
    qrModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("qr-modal-open");
    qrModalClose?.focus();
}

function closeQrModal() {
    if (!qrModal || !qrModalImage) {
        return;
    }

    qrModal.classList.remove("is-open");
    qrModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("qr-modal-open");
    qrModalImage.src = "";
    qrModalImage.alt = "";
}

qrImages.forEach((image) => {
    image.addEventListener("click", () => openQrModal(image));
    image.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openQrModal(image);
        }
    });
});

qrModalClose?.addEventListener("click", closeQrModal);
qrModalBackdrop?.addEventListener("click", closeQrModal);

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && qrModal?.classList.contains("is-open")) {
        closeQrModal();
    }
});
