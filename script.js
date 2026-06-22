// ==========================================
// TURBOLUMC SİSTEM AYARLARI
// ==========================================
const sunucuIP = "turbolu.mcsh.io";
const bStatsServerUUID = "47f91aad-f190-4f70-b138-a0a6392ef0bc";

// 1. IP KOPYALAMA FONKSİYONU
function kopyalaIP() {
    navigator.clipboard.writeText(sunucuIP).then(() => {
        const btn = document.querySelector('.copy-btn');
        if (btn) {
            btn.innerHTML = '<i class="fa-solid fa-check"></i> Kopyalandı!';
            btn.style.backgroundColor = '#15803d';
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fa-regular fa-copy"></i> Kopyala';
                btn.style.backgroundColor = '#16a34a';
            }, 2000);
        }
    }).catch(err => console.error('IP Kopyalanamadı:', err));
}

// 2. PORT GEREKTİRMEYEN DURUM API FONKSİYONU
function sunucuDurumuGuncelle() {
    const durumYazi = document.getElementById('online-durum');
    const oyuncuYazi = document.getElementById('oyuncu-sayisi');

    fetch(`https://api.mcsrvstat.us/2/${sunucuIP}`)
        .then(response => response.json())
        .then(data => {
            if (data.online === true) {
                if (durumYazi) {
                    durumYazi.innerText = "AÇIK";
                    durumYazi.style.color = "#4ade80";
                }
                if (oyuncuYazi) oyuncuYazi.innerText = `${data.players.online} / ${data.players.max}`;
            } else {
                if (durumYazi) {
                    durumYazi.innerText = "KAPALI";
                    durumYazi.style.color = "#f43f5e";
                }
                if (oyuncuYazi) oyuncuYazi.innerText = "0 / 0";
            }
        })
        .catch(err => {
            console.error("API hatası:", err);
            if (durumYazi) {
                durumYazi.innerText = "HATA";
                durumYazi.style.color = "#eab308";
            }
        });
}

// 3. SİSTEM TETİKLEYİCİLERİ
document.addEventListener('DOMContentLoaded', () => {
    // bStats Konsol Doğrulaması
    console.log("bStats Köprüsü Kuruldu. UUID: " + bStatsServerUUID);

    // İlk açılışta verileri getir
    sunucuDurumuGuncelle();
    
    // Her 30 saniyede bir arkada otomatik yenileme yap
    setInterval(sunucuDurumuGuncelle, 30000);
});
