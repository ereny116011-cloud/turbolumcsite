// ==========================================
// TURBOLUMC ENTEGRASYON AYARLARI
// ==========================================
const sunucuIP = "turbolular.mcsh.io";
const bStatsServerUUID = "47f91aad-f190-4f70-b138-a0a6392ef0bc"; // Paneldeki gerçek kodun

// 1. IP ADRESİNİ KOPYALAMA FONKSİYONU
function kopyalaIP() {
    navigator.clipboard.writeText(sunucuIP).then(() => {
        const btn = document.querySelector('.copy-btn');
        if (btn) {
            btn.innerHTML = '<i class="fa-solid fa-check"></i> Kopyalandı!';
            btn.style.backgroundColor = '#2d7d32';
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fa-regular fa-copy"></i> Kopyala';
                btn.style.backgroundColor = '#43a047';
            }, 2000);
        }
    }).catch(err => console.error('IP Kopyalanamadı:', err));
}

// 2. SUNUCU DURUMUNU SIFIR PORTLA ÇEKME (mcsrvstat.us API)
function sunucuDurumuGuncelle() {
    const durumYazi = document.getElementById('online-durum');
    const oyuncuYazi = document.getElementById('oyuncu-sayisi');
    const surumYazi = document.getElementById('sunucu-surum');

    fetch(`https://api.mcsrvstat.us/2/${sunucuIP}`)
        .then(response => response.json())
        .then(data => {
            if (data.online === true) {
                if (durumYazi) durumYazi.innerHTML = '<span style="color: #2ecc71; font-weight: bold;"><i class="fa-solid fa-circle"></i> Çevrimiçi</span>';
                if (oyuncuYazi) oyuncuYazi.innerText = `${data.players.online} / ${data.players.max}`;
                if (surumYazi) surumYazi.innerText = data.version || "1.21.1";
            } else {
                if (durumYazi) durumYazi.innerHTML = '<span style="color: #e74c3c; font-weight: bold;"><i class="fa-solid fa-circle"></i> Çevrimdışı</span>';
                if (oyuncuYazi) oyuncuYazi.innerText = "0 / 0";
                if (surumYazi) surumYazi.innerText = "Kapalı";
            }
        })
        .catch(err => {
            console.error("API Hatası:", err);
            if (durumYazi) durumYazi.innerHTML = '<span style="color: #f1c40f;"><i class="fa-solid fa-circle-exclamation"></i> Bağlantı Sorunu</span>';
        });
}

// 3. SİSTEM BAŞLATICI VE DÖNGÜLER
document.addEventListener('DOMContentLoaded', () => {
    // bStats UUID Doğrulaması (Konsol Takibi)
    console.log("bStats Köprüsü Aktif. Sistem UUID: " + bStatsServerUUID);

    // İlk açılışta verileri çek
    sunucuDurumuGuncelle();
    
    // Her 30 saniyede bir sunucu durumunu arkada otomatik yenile
    setInterval(sunucuDurumuGuncelle, 30000);
});
