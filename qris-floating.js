(function() {
    // Link Direct Media GitHub langsung ke gambar qris.png Anda
    const qrisImgUrl = "https://media.githubusercontent.com/media/buanamedia/qris/main/qris.png";

    // CSS Styling Tombol Melayang
    const style = document.createElement('style');
    style.innerHTML = `
        .qris-floating-container {
            position: fixed !important;
            bottom: 24px !important;
            left: 24px !important;
            z-index: 99999 !important;
            background: #ffffff !important;
            border-radius: 12px !important;
            padding: 6px 8px !important;
            box-shadow: 0 10px 25px -5px rgba(0,0,0,0.4), 0 8px 10px -6px rgba(0,0,0,0.3) !important;
            cursor: pointer !important;
            transition: all 0.25s ease-in-out !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            border: 1px solid rgba(255, 255, 255, 0.4) !important;
            user-select: none !important;
        }
        .qris-floating-container:hover {
            transform: translateY(-4px) scale(1.06) !important;
            box-shadow: 0 18px 25px -5px rgba(99, 102, 241, 0.5) !important;
        }
        .qris-floating-img {
            width: 38px !important;
            height: 38px !important;
            object-fit: contain !important;
            border-radius: 4px !important;
            display: block !important;
        }
        .qris-floating-text {
            font-size: 10px !important;
            font-weight: 800 !important;
            color: #d97706 !important;
            margin-top: 2px !important;
            letter-spacing: 0.5px !important;
            line-height: 1 !important;
            font-family: sans-serif !important;
        }
    `;
    document.head.appendChild(style);

    const floatingHTML = `
        <div id="qrisFloatingBtn" class="qris-floating-container" title="Buka QRIS Dukungan">
            <img class="qris-floating-img" src="${qrisImgUrl}" alt="QRIS">
            <span class="qris-floating-text">QRIS</span>
        </div>
    `;

    function initFloating() {
        if (document.getElementById('qrisFloatingBtn')) return;
        document.body.insertAdjacentHTML('beforeend', floatingHTML);

        const btn = document.getElementById('qrisFloatingBtn');
        if (btn) {
            btn.addEventListener('click', () => {
                if (typeof window.openQrisModal === 'function') {
                    window.openQrisModal();
                } else {
                    console.error('Script qris-popup.js belum dimuat!');
                }
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFloating);
    } else {
        initFloating();
    }
})();
