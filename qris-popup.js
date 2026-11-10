(function() {
    // 1. Inject Style CSS untuk Font & Elemen Melayang
    const style = document.createElement('style');
    style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600&display=swap');
        .qris-cursive-text { font-family: 'Caveat', cursive; }
        
        .qris-floating-btn {
            position: fixed;
            bottom: 24px;
            left: 24px;
            z-index: 40;
            background: #ffffff;
            border-radius: 14px;
            padding: 6px;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5);
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .qris-floating-btn:hover {
            transform: translateY(-4px) scale(1.05);
            box-shadow: 0 20px 30px -10px rgba(99, 102, 241, 0.4);
        }
        .qris-floating-btn img {
            width: 42px;
            height: 42px;
            object-fit: contain;
            border-radius: 6px;
        }
        .qris-floating-btn span {
            font-size: 10px;
            font-weight: 800;
            color: #d97706;
            margin-top: 2px;
            letter-spacing: 0.5px;
        }
    `;
    document.head.appendChild(style);

    // 2. Buat Elemen Floating Button + Modal HTML
    const qrisWidgetHTML = `
        <!-- Tombol QRIS Melayang (Kiri Bawah) -->
        <div id="qrisFloatingBtn" class="qris-floating-btn" title="Buka QRIS Dukungan">
            <img src="https://cdn-dw-qris-registration.oss-ap-southeast-5.aliyuncs.com/dw-qris-merchant-bo/registration/ID1026546594643_A01.png?Expires=1794301538&OSSAccessKeyId=LTAI5tFFm75bG1DoYMJDk1Aq&Signature=l5bENdte0p1slWDc8jCqIAu7WOg%3D" alt="QRIS Mini">
            <span>QRIS</span>
        </div>

        <!-- Modal Popup QRIS -->
        <div id="qrisModal" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 hidden">
            <div class="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl relative">
                
                <!-- Modal Header -->
                <div class="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 class="text-sm font-bold text-amber-400 flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                        <span>Dukungan</span>
                    </h3>
                    <button id="closeQrisBtn" class="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                </div>
                
                <!-- Title Text -->
                <div class="text-center">
                    <p class="text-amber-300 font-semibold text-2xl tracking-wide qris-cursive-text">
                        Uang Kopi Seikhlasnya
                    </p>
                </div>

                <!-- Image Container -->
                <div class="bg-white p-2 rounded-xl shadow-inner flex items-center justify-center">
                    <img 
                        src="https://cdn-dw-qris-registration.oss-ap-southeast-5.aliyuncs.com/dw-qris-merchant-bo/registration/ID1026546594643_A01.png?Expires=1794301538&OSSAccessKeyId=LTAI5tFFm75bG1DoYMJDk1Aq&Signature=l5bENdte0p1slWDc8jCqIAu7WOg%3D" 
                        alt="QRIS Merchant" 
                        class="w-full h-auto max-h-[380px] object-contain rounded-lg"
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

    // 3. Masukkan ke DOM & Atur Event Handlers
    document.addEventListener('DOMContentLoaded', () => {
        document.body.insertAdjacentHTML('beforeend', qrisWidgetHTML);

        const modal = document.getElementById('qrisModal');
        const closeBtn = document.getElementById('closeQrisBtn');
        const floatingBtn = document.getElementById('qrisFloatingBtn');

        // Fungsi Global Pembuka & Penutup Modal
        window.openQrisModal = function() {
            if (modal) modal.classList.remove('hidden');
        };

        window.closeQrisModal = function() {
            if (modal) modal.classList.add('hidden');
        };

        // Event Klik Tombol Melayang
        if (floatingBtn) floatingBtn.addEventListener('click', window.openQrisModal);

        // Event Klik Close Modal & Out-of-bounds Click
        if (closeBtn) closeBtn.addEventListener('click', window.closeQrisModal);
        
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target.id === 'qrisModal') {
                    window.closeQrisModal();
                }
            });
        }

        // Tampilkan Modal Popup Secara Otomatis saat halaman pertama dimuat
        window.openQrisModal();
    });
})();
