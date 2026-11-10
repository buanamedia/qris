(function() {
    // Data daftar donatur / ucapan terima kasih
    const runningDonations = [
        { name: "Dari Hamba Allah", amount: "Rp 100.000", coffee: 1 },
        { name: "Budi Santoso", amount: "Rp 50.000", coffee: 1 },
        { name: "Siti Rahma", amount: "Rp 200.000", coffee: 2 },
        { name: "Kreator Anonim", amount: "Rp 25.000", coffee: 1 },
        { name: "Sahabat Buanamedia", amount: "Rp 500.000", coffee: 5 }
    ];

    let currentIndex = 0;

    // CSS Styling dengan Efek Berkedip (Blink/Fade)
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
            transition: opacity 0.25s ease-in-out !important;
            opacity: 1 !important;
        }

        /* Kelas untuk efek berkedip menghilang */
        .qris-blink-hide {
            opacity: 0 !important;
        }
    `;
    document.head.appendChild(style);

    function updateBannerContent() {
        const bannerContainer = document.getElementById('qrisBannerContainer');
        if (!bannerContainer) return;

        // 1. Berkedip padam (Fade Out cepat)
        bannerContainer.classList.add('qris-blink-hide');

        setTimeout(() => {
            // 2. Ganti teks saat dalam keadaan padam
            const data = runningDonations[currentIndex];
            bannerContainer.innerHTML = `
                <span style="color: #34d399; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                    Terima Kasih, ${data.name} <span style="color: #fcd34d; font-weight: 700;">${data.amount}</span>
                </span>
                <span style="color: #fbbf24; font-weight: 700; display: flex; align-items: center; gap: 4px; margin-left: 8px; flex-shrink: 0;">
                    ☕ ${data.coffee}
                </span>
            `;

            // 3. Berkedip menyala kembali (Fade In)
            bannerContainer.classList.remove('qris-blink-hide');

            // Lanjut ke index berikutnya
            currentIndex = (currentIndex + 1) % runningDonations.length;
        }, 250); // Jeda kedipan (250 ms)
    }

    function initBanner() {
        const bannerBox = document.getElementById('qrisBannerContainer');
        if (!bannerBox) return;

        // Tampilkan data pertama
        updateBannerContent();

        // Ganti data donatur dan berkedip setiap 3 detik (3000 ms)
        setInterval(updateBannerContent, 3000);
    }

    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        setTimeout(initBanner, 400);
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(initBanner, 400);
        });
    }
})();
