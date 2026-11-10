(function() {
    // 1. Gambar QRIS diubah ke format Base64 / Raw URL Publik GitHub Pages
    // Opsional: Anda bisa mengganti URL di bawah ke link GitHub Pages Anda jika aktif (misal: https://username.github.io/repo/qris.png)
    const qrisImgUrl = "https://raw.githubusercontent.com/buanamedia/qris/main/qris.png";

    // 2. Inject CSS Font & Style Modal
    const style = document.createElement('style');
    style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600&display=swap');
        .qris-cursive-text { font-family: 'Caveat', cursive; }
        .qris-img-container img {
            width: 100% !important;
            height: auto !important;
            max-height: 380px !important;
            object-fit: contain !important;
            display: block !important;
        }
    `;
    document.head.appendChild(style);

    // 3. Elemen Modal HTML
    const modalHTML = `
        <div id="qrisModal" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" style="display:none;">
            <div class="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl relative text-left">
                
                <!-- Header -->
                <div class="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 class="text-sm font-bold text-amber-400 flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                        <span>Dukungan</span>
                    </h3>
                    <button id="closeQrisBtn" class="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                </div>
                
                <!-- Title -->
                <div class="text-center">
                    <p class="text-amber-300 font-semibold text-2xl tracking-wide qris-cursive-text">
                        Uang Kopi Seikhlasnya
                    </p>
                </div>

                <!-- Gambar QRIS -->
                <div class="bg-white p-2 rounded-xl shadow-inner flex items-center justify-center min-h-[220px] qris-img-container">
                    <img 
                        id="qrisMainImage"
                        src="${qrisImgUrl}" 
                        alt="QRIS Merchant"
                    >
                </div>

                <!-- Footer Banner -->
                <div class="bg-emerald-950/60 border border-emerald-500/30 rounded-xl px-3 py-2 flex items-center justify-between text-xs">
                    <span class="text-emerald-400 font-semibold truncate">
                        Terima Kasih, Dari Hamba Allah <span class="text-amber-300 font-bold">Rp 100.000</span>
                    </span>
                    <span class="text-amber-400 font-bold flex items-center gap-1 flex-shrink-0 ml-2">
                        ☕ 1
                    </span>
                </div>

            </div>
        </div>
    `;

    // 4. Inisialisasi Event & Handler
    function initModal() {
        if (document.getElementById('qrisModal')) return;
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const modal = document.getElementById('qrisModal');
        const closeBtn = document.getElementById('closeQrisBtn');
        const img = document.getElementById('qrisMainImage');

        // Fallback jika gambar raw github gagal load
        if (img) {
            img.onerror = function() {
                this.src = "./qris.png"; // Mencoba path lokal relatif
            };
        }

        window.openQrisModal = function() {
            if (modal) {
                modal.style.display = 'flex';
                modal.classList.remove('hidden');
            }
        };

        window.closeQrisModal = function() {
            if (modal) {
                modal.style.display = 'none';
                modal.classList.add('hidden');
            }
        };

        if (closeBtn) closeBtn.addEventListener('click', window.closeQrisModal);
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target.id === 'qrisModal') window.closeQrisModal();
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initModal);
    } else {
        initModal();
    }
})();
