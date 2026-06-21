// Sunucu IP Adresi
const sunucuIP = "turbolumc.aternos.me";

// IP Kopyalama Fonksiyonu
function kopyalaIP() {
    navigator.clipboard.writeText(sunucuIP).then(() => {
        const btn = document.querySelector('.copy-btn');
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Kopyalandı!';
        btn.style.backgroundColor = '#27ae60';
        
        // 2 saniye sonra butonu eski haline getir
        setTimeout(() => {
            btn.innerHTML = '<i class="fa-regular fa-copy"></i> Kopyala';
            btn.style.backgroundColor = '#2ecc71';
        }, 2000);
    }).catch(err => {
        console.error('Kopyalama başarısız: ', err);
    });
}

// Aternos Sunucu Durumunu API ile Çekme
function sunucuDurumuGuncelle() {
    const durumYazi = document.getElementById('online-durum');
    const oyuncuYazi = document.getElementById('oyuncu-sayisi');
    const surumYazi = document.getElementById('sunucu-surum');

    // Ücretsiz Minecraft API'sini kullanarak sunucu bilgilerini alıyoruz
    fetch(`https://api.mcsrvstat.us/2/${sunucuIP}`)
        .then(response => response.json())
        .then(data => {
            if (data.online === true) {
                durumYazi.innerHTML = '<i class="fa-solid fa-circle" style="color: #2ecc71;"></i> Çevrimiçi (Açık)';
                oyuncuYazi.innerText = `${data.players.online} / ${data.players.max}`;
                surumYazi.innerText = data.version || "Bilinmiyor";
            } else {
                durumYazi.innerHTML = '<i class="fa-solid fa-circle" style="color: #e74c3c;"></i> Çevrimdışı (Kapalı)';
                oyuncuYazi.innerText = "0 / 0";
                surumYazi.innerText = "Sunucu kapalı";
            }
        })
        .catch(error => {
            console.error("API Hatası:", error);
            durumYazi.innerHTML = '<i class="fa-solid fa-triangle-exclamation" style="color: #f1c40f;"></i> Hata oluştu';
        });
}

// Sayfa açıldığında durumu kontrol et
document.addEventListener('DOMContentLoaded', () => {
    sunucuDurumuGuncelle();
    // Her 30 saniyede bir sunucu durumunu otomatik yenile
    setInterval(sunucuDurumuGuncelle, 30000);
});