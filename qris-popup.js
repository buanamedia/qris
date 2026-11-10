(function() {
    const qrisImgUrl = "https://raw.githubusercontent.com/buanamedia/qris/main/qris.png";

    // 1. Inject Style CSS dengan !important agar tidak tertutup CSS bawaan template
    const style = document.createElement('style');
    style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600&display=swap');
        .qris-cursive-text { font-family: 'Caveat', cursive !important; }
        
        #qrisModalOverlay {
            position: fixed !important;
            inset: 0 !important;
            background-color: rgba(2, 6, 23, 0.85) !important;
            backdrop-filter: blur(4px) !important;
            z-index: 999999 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            padding: 16px !important;
        }
        #qrisModalOverlay.qris-hidden {
            display: none !important;
        }
    `;
    document.head.appendChild(style);

    // 2. Elemen Modal
    const modalHTML = `
        <div id="qrisModalOverlay" class="qris-hidden">
            <div class="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl relative text-left" style="background-color: #0f172a; border-color: #1e293b; color: #f8fafc;">
                
                <!-- Header -->
                <div class="flex items-center justify-between border-b border-slate-800 pb-3" style="border-color: #1e293b;">
                    <h3 class="text-sm font-bold flex items-center gap-2" style="color: #fbbf24;">
                        <span class="w-2 h-2 rounded-full animate-pulse" style="background-color: #fbbf24;"></span>
                        <span>Dukungan</span>
                    </h3>
                    <button id="closeQrisBtn" class="text-slate-400 hover:text-white p-1 rounded-lg transition-colors" style="background-color: #1e293b; border: none; cursor: pointer;">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px; stroke: #94a3b8;"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                </div>
                
                <!-- Title -->
                <div class="text-center">
                    <p class="font-semibold text-2xl tracking-wide qris-cursive-text" style="color: #fcd34d;">
                        Uang Kopi Seikhlasnya
                    </p>
                </div>

                <!-- Image -->
                <div class="bg-white p-2 rounded-xl shadow-inner flex items-center justify-center" style="background-color: #ffffff;">
                    <img 
                        src="${qrisImgUrl}" 
                        alt="QRIS Merchant" 
                        style="width: 100%; height: auto; max-height: 380px; object-fit: contain; border-radius: 8px; display: block;"
                    >
                </div>

                <!-- Footer Banner -->
                <div class="border rounded-xl px-3 py-2 flex items-center justify-between text-xs" style="background-color: rgba(6, 78, 59, 0.6); border-color: rgba(16, 185, 129, 0.3);">
                    <span class="font-semibold truncate" style="color: #34d399;">
                        Terima Kasih, Dari Hamba Allah <span class="font-bold" style="color: #fcd34d;">Rp 100.000</span>
                    </span>
                    <span class="font-bold flex items-center gap-1 flex-shrink-0 ml-2" style="color: #fbbf24;">
                        ☕ 1
                    </span>
                </div>

            </div>
        </div>
    `;

    function initModal() {
        if (!document.getElementById('qrisModalOverlay')) {
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }

        const overlay = document.getElementById('qrisModalOverlay');
        const closeBtn = document.getElementById('closeQrisBtn');

        window.openQrisModal = function() {
            if (overlay) {
                overlay.classList.remove('qris-hidden');
            }
        };

        window.closeQrisModal = function() {
            if (overlay) {
                overlay.classList.add('qris-hidden');
            }
        };

        if (closeBtn) closeBtn.onclick = window.closeQrisModal;
        if (overlay) {
            overlay.onclick = function(e) {
                if (e.target.id === 'qrisModalOverlay') window.closeQrisModal();
            };
        }

        // Tampilkan otomatis dari awal
        window.openQrisModal();
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initModal();
    } else {
        document.addEventListener('DOMContentLoaded', initModal);
    }
})();
