const sunucuIP = "turbolu.mcsh.io";
// Render'daki botunun url adresini buraya yapıştır (Sonunda / işareti olsun)
const renderBotURL = "https://miybitim.onrender.com/"; 

function kopyalaIP() {
    navigator.clipboard.writeText(sunucuIP).then(() => {
        const btn = document.querySelector('.copy-btn');
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Kopyalandı!';
        btn.style.backgroundColor = '#27ae60';
        
        setTimeout(() => {
            btn.innerHTML = '<i class="fa-regular fa-copy"></i> Kopyala';
            btn.style.backgroundColor = '#2ecc71';
        }, 2000);
    }).catch(err => console.error('Hata:', err));
}

function sunucuDurumuGuncelle() {
    const durumYazi = document.getElementById('online-durum');
    const oyuncuYazi = document.getElementById('oyuncu-sayisi');
    const surumYazi = document.getElementById('sunucu-surum');

    fetch(`https://api.mcsrvstat.us/2/${sunucuIP}`)
        .then(response => response.json())
        .then(data => {
            if (data.online === true) {
                durumYazi.innerHTML = '<i class="fa-solid fa-circle" style="color: #2ecc71;"></i> Çevrimiçi (Açık)';
                oyuncuYazi.innerText = `${data.players.online} / ${data.players.max}`;
                surumYazi.innerText = data.version || "1.21.1";
            } else {
                durumYazi.innerHTML = '<i class="fa-solid fa-circle" style="color: #e74c3c;"></i> Çevrimdışı (Kapalı)';
                oyuncuYazi.innerText = "0 / 0";
                surumYazi.innerText = "Sunucu kapalı";
            }
        })
        .catch(err => {
            durumYazi.innerHTML = '<i class="fa-solid fa-triangle-exclamation" style="color: #f1c40f;"></i> Hata oluştu';
        });
}

function canliPerformansGetir() {
    fetch(renderBotURL)
        .then(response => response.json())
        .then(sparkData => {
            document.getElementById('spark-tps').innerText = sparkData.tps;
            document.getElementById('spark-ram').innerText = sparkData.ram;
            
            // Eğer veriler yüklenmişse sarı rengi normale çekmek için class temizliği
            document.getElementById('spark-tps').classList.remove('loading-text');
            document.getElementById('spark-ram').classList.remove('loading-text');
        })
        .catch(err => {
            document.getElementById('spark-tps').innerText = "Veri alınamıyor";
            document.getElementById('spark-ram').innerText = "Veri alınamıyor";
        });
}

document.addEventListener('DOMContentLoaded', () => {
    sunucuDurumuGuncelle();
    canliPerformansGetir();
    
    setInterval(sunucuDurumuGuncelle, 30000);
    setInterval(canliPerformansGetir, 10000); // 10 saniyede bir bottan performansı tazeler
});
