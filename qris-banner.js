import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Database URL Firebase Asia-Southeast Anda
const firebaseConfig = {
    databaseURL: "https://qris-donasi-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let runningDonations = [
    { name: "Dari Hamba Allah", amount: "Rp 100.000", coffee: 1 }
];
let currentIndex = 0;

// CSS Keyframes Animasi Slide (Right to Left)
const style = document.createElement('style');
style.id = "qris-banner-styles";
style.innerHTML = `
    @keyframes slideInFromRight {
        0% { transform: translateX(100%); opacity: 0; }
        100% { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutToLeft {
        0% { transform: translateX(0); opacity: 1; }
        100% { transform: translateX(-100%); opacity: 0; }
    }
    .qris-banner-box {
        background-color: rgba(6, 78, 59, 0.6) !important;
        border: 1px solid rgba(16, 185, 129, 0.3) !important;
        border-radius: 12px !important;
        padding: 8px 12px !important;
        min-height: 40px !important;
        box-sizing: border-box !important;
        overflow: hidden !important;
        position: relative !important;
        display: flex !important;
        align-items: center !important;
    }
    .qris-slide-item {
        width: 100% !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        font-size: 12px !important;
        position: absolute !important;
        left: 0 !important; top: 0 !important; bottom: 0 !important;
        padding: 0 12px !important;
        box-sizing: border-box !important;
    }
    .qris-animate-in { animation: slideInFromRight 0.6s forwards ease-in-out !important; }
    .qris-animate-out { animation: slideOutToLeft 0.6s forwards ease-in-out !important; }
`;
document.head.appendChild(style);

// Menerima Update Realtime dari Firebase
onValue(ref(db, 'donations'), (snapshot) => {
    const data = snapshot.val();
    if (data) {
        const list = Object.values(data);
        if (list.length > 0) {
            runningDonations = list.reverse(); // Data terbaru tampil pertama
        }
    }
});

function getBannerHTML(data) {
    return `
        <span style="color: #34d399; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
            Terima Kasih, ${data.name} <span style="color: #fcd34d; font-weight: 700;">${data.amount}</span>
        </span>
        <span style="color: #fbbf24; font-weight: 700; display: flex; align-items: center; gap: 4px; margin-left: 8px; flex-shrink: 0;">
            ☕ ${data.coffee}
        </span>
    `;
}

function updateBannerContent() {
    const bannerContainer = document.getElementById('qrisBannerContainer');
    if (!bannerContainer || runningDonations.length === 0) return;

    const currentSlide = bannerContainer.querySelector('.qris-slide-item:not(.qris-animate-out)');
    const data = runningDonations[currentIndex % runningDonations.length];

    const newSlide = document.createElement('div');
    newSlide.className = 'qris-slide-item qris-animate-in';
    newSlide.innerHTML = getBannerHTML(data);
    bannerContainer.appendChild(newSlide);

    if (currentSlide) {
        currentSlide.classList.remove('qris-animate-in');
        currentSlide.classList.add('qris-animate-out');
        setTimeout(() => { currentSlide.remove(); }, 600);
    }

    currentIndex = (currentIndex + 1) % runningDonations.length;
}

function initBanner() {
    const bannerBox = document.getElementById('qrisBannerContainer');
    if (!bannerBox) return;

    updateBannerContent();
    setInterval(updateBannerContent, 3500);
}

if (document.readyState === 'interactive' || document.readyState === 'complete') {
    setTimeout(initBanner, 400);
} else {
    document.addEventListener('DOMContentLoaded', () => { setTimeout(initBanner, 400); });
}
