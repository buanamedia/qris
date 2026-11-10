(function() {
    // Data list donatur / ucapan terima kasih yang akan tampil berputar (carousel)
    const runningDonations = [
        { name: "Dari Hamba Allah", amount: "Rp 100.000", coffee: 1 },
        { name: "Budi Santoso", amount: "Rp 50.000", coffee: 1 },
        { name: "Siti Rahma", amount: "Rp 200.000", coffee: 2 },
        { name: "Kreator Anonim", amount: "Rp 25.000", coffee: 1 },
        { name: "Sahabat Buanamedia", amount: "Rp 500.000", coffee: 5 }
    ];

    let currentIndex = 0;

    // Style khusus untuk efek animasi fade & transition banner
    const style = document.createElement('style');
    style.id = "qris-banner-styles";
    style.innerHTML = `
        .qris-banner-box {
            background-color: rgba(6, 78, 59, 0.6) !important;
            border: 1px solid rgba(16, 185, 129, 0.3) !important;
            border-radius: 12px !important;
            padding: 8px 12px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            font-size: 12px !important;
            min-height: 38px !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
            transition: opacity 0.4s ease-in-out !important;
        }
        .qris-banner-fade-out {
            opacity: 0 !important;
        }
    `;
    document.head.appendChild(style);

    function updateBannerContent() {
        const bannerContainer = document.getElementById('qrisBannerContainer');
        if (!bannerContainer) return;

        const data = runningDonations[currentIndex];

        // Efek animasi transisi halus (fade out -> ganti teks -> fade in)
        bannerContainer.classList.add('qris-banner-fade-out');

        setTimeout(() => {
            bannerContainer.innerHTML = `
                <span style="color: #34d399; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                    Terima Kasih, ${data.name} <span style="color: #fcd34d; font-weight: 700;">${data.amount}</span>
                </span>
                <span style="color: #fbbf24; font-weight: 700; display: flex; align-items: center; gap: 4px; margin-left: 8px; flex-shrink: 0;">
                    ☕ ${data.coffee}
                </span>
            `;
            bannerContainer.classList.remove('qris-banner-fade-out');
        }, 400);

        // Lanjut ke item berikutnya (looping balik ke index 0)
        currentIndex = (currentIndex + 1) % runningDonations.length;
    }

    function initBanner() {
        // Cari container banner di modal QRIS
        const modalContainer = document.querySelector('#qrisModalWrapper > div');
        if (!modalContainer) return;

        // Cek apakah elemen banner sudah dibuat atau belum
        let bannerBox = document.getElementById('qrisBannerContainer');
        if (!bannerBox) {
            bannerBox = document.createElement('div');
            bannerBox.id = 'qrisBannerContainer';
            bannerBox.className = 'qris-banner-box';
            modalContainer.appendChild(bannerBox);
        }

        // Tampilkan data awal
        updateBannerContent();

        // Ganti data donatur secara otomatis setiap 3.5 detik (3500 ms)
        setInterval(updateBannerContent, 3500);
    }

    // Jalankan skrip saat modal/DOM siap
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        setTimeout(initBanner, 500);
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(initBanner, 500);
        });
    }
})();
