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

    // CSS Styling & Animasi Bergeser (Slide Right to Left)
    const style = document.createElement('style');
    style.id = "qris-banner-styles";
    style.innerHTML = `
        .qris-banner-box {
            background-color: rgba(6, 78, 59, 0.6) !important;
            border: 1px solid rgba(16, 185, 129, 0.3) !important;
            border-radius: 12px !important;
            padding: 8px 12px !important;
            min-height: 38px !important;
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
            left: 0 !important;
            right: 0 !important;
            padding: 0 12px !important;
            box-sizing: border-box !important;
            transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out !important;
        }

        /* Posisi Saat Tampil di Tengah */
        .qris-slide-active {
            transform: translateX(0) !important;
            opacity: 1 !important;
        }

        /* Posisi Keluar ke Kiri */
        .qris-slide-exit {
            transform: translateX(-100%) !important;
            opacity: 0 !important;
        }

        /* Posisi Siap Masuk dari Kanan */
        .qris-slide-enter {
            transform: translateX(100%) !important;
            opacity: 0 !important;
        }
    `;
    document.head.appendChild(style);

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
        if (!bannerContainer) return;

        const currentSlide = bannerContainer.querySelector('.qris-slide-active');
        const data = runningDonations[currentIndex];

        // 1. Buat elemen teks baru yang siap masuk dari sebelah KANAN
        const newSlide = document.createElement('div');
        newSlide.className = 'qris-slide-item qris-slide-enter';
        newSlide.innerHTML = getBannerHTML(data);
        bannerContainer.appendChild(newSlide);

        // 2. Geser elemen lama ke KIRI, dan geser elemen baru dari KANAN ke TENGAH
        setTimeout(() => {
            if (currentSlide) {
                currentSlide.className = 'qris-slide-item qris-slide-exit';
            }
            newSlide.className = 'qris-slide-item qris-slide-active';
        }, 50);

        // 3. Hapus elemen lama setelah selesai bergeser
        setTimeout(() => {
            if (currentSlide) {
                currentSlide.remove();
            }
        }, 550);

        // Lanjut ke indeks berikutnya
        currentIndex = (currentIndex + 1) % runningDonations.length;
    }

    function initBanner() {
        const bannerBox = document.getElementById('qrisBannerContainer');
        if (!bannerBox) return;

        // Tampilkan data pertama
        updateBannerContent();

        // Geser ke donatur berikutnya setiap 3.5 detik (3500 ms)
        setInterval(updateBannerContent, 3500);
    }

    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        setTimeout(initBanner, 400);
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(initBanner, 400);
        });
    }
})();
