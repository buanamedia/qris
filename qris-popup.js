(function() {
    const qrisImgUrl = "https://raw.githubusercontent.com/buanamedia/qris/main/qris.png";

    // Inject Style khusus modal dengan Z-Index paling tinggi & paksa tampil jika aktif
    const style = document.createElement('style');
    style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600&display=swap');
        .qris-cursive-text { font-family: 'Caveat', cursive !important; }
        
        #qrisModalWrapper {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            background-color: rgba(2, 6, 23, 0.85) !important;
            backdrop-filter: blur(4px) !important;
            z-index: 9999999 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            padding: 16px !important;
            box-sizing: border-box !important;
        }
        #qrisModalWrapper.qris-close-modal {
            display: none !important;
        }
    `;
    document.head.appendChild(style);

    // Elemen HTML Modal
    const modalHTML = `
        <div id="qrisModalWrapper">
            <div style="background-color: #0f172a; border: 1px solid #1e293b; border-radius: 16px; max-width: 384px; width: 100%; padding: 24px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); position: relative; text-align: left; box-sizing: border-box;">
                
                <!-- Header -->
                <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #1e293b; padding-bottom: 12px; margin-bottom: 16px;">
                    <h3 style="font-size: 14px; font-weight: 700; color: #fbbf24; margin: 0; display: flex; align-items: center; gap: 8px;">
                        <span style="width: 8px; height: 8px; border-radius: 9999px; background-color: #fbbf24;"></span>
                        <span>Dukungan</span>
                    </h3>
                    <button id="closeQrisBtn" style="color: #94a3b8; background-color: #1e293b; border: none; padding: 6px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                </div>
                
                <!-- Title -->
                <div style="text-align: center; margin-bottom: 16px;">
                    <p class="qris-cursive-text" style="color: #fcd34d; font-weight: 600; font-size: 24px; margin: 0;">
                        Uang Kopi Seikhlasnya
                    </p>
                </div>

                <!-- Gambar QRIS -->
                <div style="background-color: #ffffff; padding: 8px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                    <img 
                        src="${qrisImgUrl}" 
                        alt="QRIS Merchant" 
                        style="width: 100%; height: auto; max-height: 380px; object-fit: contain; border-radius: 8px; display: block;"
                    >
                </div>

                <!-- Footer Banner -->
                <div style="background-color: rgba(6, 78, 59, 0.6); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 8px 12px; display: flex; align-items: center; justify-content: space-between; font-size: 12px;">
                    <span style="color: #34d399; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                        Terima Kasih, Dari Hamba Allah <span style="color: #fcd34d; font-weight: 700;">Rp 100.000</span>
                    </span>
                    <span style="color: #fbbf24; font-weight: 700; display: flex; align-items: center; gap: 4px; margin-left: 8px; flex-shrink: 0;">
                        ☕ 1
                    </span>
                </div>

            </div>
        </div>
    `;

    function renderAndOpenModal() {
        if (!document.getElementById('qrisModalWrapper')) {
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }

        const modalWrapper = document.getElementById('qrisModalWrapper');
        const closeBtn = document.getElementById('closeQrisBtn');

        // Fungsi Global Pembuka Modal
        window.openQrisModal = function() {
            if (modalWrapper) {
                modalWrapper.classList.remove('qris-close-modal');
            }
        };

        // Fungsi Global Penutup Modal
        window.closeQrisModal = function() {
            if (modalWrapper) {
                modalWrapper.classList.add('qris-close-modal');
            }
        };

        if (closeBtn) {
            closeBtn.onclick = function(e) {
                e.stopPropagation();
                window.closeQrisModal();
            };
        }

        if (modalWrapper) {
            modalWrapper.onclick = function(e) {
                if (e.target.id === 'qrisModalWrapper') {
                    window.closeQrisModal();
                }
            };
        }

        // PAKSA MUNCULKAN MODAL DARI AWAL
        window.openQrisModal();
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        renderAndOpenModal();
    } else {
        document.addEventListener('DOMContentLoaded', renderAndOpenModal);
    }
})();
