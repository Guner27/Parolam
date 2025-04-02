// Sayfa tamamen yüklendiğinde çalışacak kod bloğu
document.addEventListener("DOMContentLoaded", () => {
    // DOM elemanlarını seçme
    const searchInput = document.getElementById("search"); // Arama inputu
    const passwordList = document.getElementById("password-list"); // Şifre listesi container'ı
    const typeFilterButtons = document.querySelectorAll(".type-filters .filter-btn"); // Tür filtre butonları
    const categoryFilterButtons = document.querySelectorAll(".category-filters .filter-btn"); // Kategori filtre butonları
    const downloadBtn = document.getElementById("download-btn"); // Güncel veriyi indirme butonu
    const darkModeToggle = document.getElementById("dark-mode-toggle"); // Dark mode değiştirme butonu
    const itemSum = document.querySelector(".item-sum"); // Toplam öğe sayısını gösterecek element

    // Sabit şifreleme anahtarı
    const encryptionKey = "mySecretKey123";
    // Orijinal şifre verisinin kopyası (değişiklik kontrolü için)
    const originalPasswords = JSON.parse(JSON.stringify(passwords));
    // Güncel şifreler (localStorage'dan alınır, yoksa varsayılan veri kullanılır)
    let currentPasswords = JSON.parse(localStorage.getItem("currentPasswords")) || JSON.parse(JSON.stringify(passwords));

    // Aktif filtreler (varsayılan olarak "Hepsi")
    let activeTypeFilter = "Hepsi";
    let activeCategoryFilter = "Hepsi";

    // Dark mode açma/kapama fonksiyonu
    function toggleDarkMode() {
        const isDarkMode = document.body.classList.toggle("dark-mode"); // Dark mode class'ını ekler/kaldırır
        localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled"); // Seçimi localStorage'a kaydeder
        darkModeToggle.textContent = isDarkMode ? "☀️" : "🌙"; // Simgeyi günceller (dark: ☀️, light: 🌙)
        setTimeout(() => updateCategoryButtonColors(), 0); // Buton renklerini mikro görev olarak güncelle (senkronizasyon için)
    }

    // Sayfa yüklendiğinde dark mode durumunu kontrol etme
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode"); // Dark mode class'ını ekler
        darkModeToggle.textContent = "☀️"; // Dark mode aktifse güneş simgesi
    } else {
        darkModeToggle.textContent = "🌙"; // Light mode aktifse ay simgesi
    }

    // Dark mode butonuna tıklama olayı ekleme
    darkModeToggle.addEventListener("click", toggleDarkMode);

    // Şifreyi şifreleme fonksiyonu
    function encryptPassword(password) {
        return CryptoJS.AES.encrypt(password, encryptionKey).toString(); // Şifreyi AES ile şifreler
    }

    // Şifreyi çözme fonksiyonu
    function decryptPassword(encryptedPassword) {
        const bytes = CryptoJS.AES.decrypt(encryptedPassword, encryptionKey); // Şifreyi çözer
        return bytes.toString(CryptoJS.enc.Utf8); // Çözülen metni UTF-8 formatında döndürür
    }

    // Toplam öğe sayısını güncelleme fonksiyonu
    function updateItemCount(count) {
        itemSum.textContent = `Toplam: ${count}`; // Toplam öğe sayısını DOM'a yazar
    }

    // Şifreleri ekranda listeleme fonksiyonu
    function renderPasswords(typeFilter = "Hepsi", categoryFilter = "Hepsi", search = "") {
        passwordList.innerHTML = ""; // Liste alanını temizler
        const filteredPasswords = currentPasswords.filter(p => 
            (typeFilter === "Hepsi" || p.type === typeFilter) &&
            (categoryFilter === "Hepsi" || p.category === categoryFilter) &&
            (p.title.toLowerCase().includes(search.toLowerCase()) ||
             p.username.toLowerCase().includes(search.toLowerCase()) ||
             (p.note && p.note.toLowerCase().includes(search.toLowerCase())))
        );

        filteredPasswords.forEach((item, filteredIndex) => {
            const realIndex = currentPasswords.indexOf(item); // Gerçek indeksi bul
            const card = document.createElement("div"); // Yeni kart oluşturur
            card.classList.add("card"); // Kart class'ını ekler
            card.setAttribute("data-index", realIndex); // Gerçek indeksi sakla
            card.style.borderTopColor = getCategoryColor(item.category); // Kartın üst kenar rengini kategoriye göre ayarlar
            let cardContent = `<h3>${item.title}</h3>`; // Kart içeriği başlıkla başlar

            // E-postaları alt alta listeleme
            if (item.emails.length > 0 && item.emails.some(email => email !== "")) {
                const validEmails = item.emails.filter(email => email !== ""); // Boş olmayan e-postaları alır
                validEmails.forEach((email) => {
                    cardContent += `
                        <p><span class="icon"><i class="fas fa-at"></i></span> ${email} 
                            <span class="icons"><span class="copy" onclick="copyText('${email}')"><i class="fas fa-copy"></i></span></span></p>`;
                });
            }

            // Kullanıcı adını ekleme (boş değilse)
            if (item.username && item.username !== "") {
                cardContent += `
                    <p><span class="icon"><i class="fas fa-user"></i></span> ${item.username} 
                        <span class="icons"><span class="copy" onclick="copyText('${item.username}')"><i class="fas fa-copy"></i></span></span></p>`;
            }

            // Şifreyi ekleme (gizli olarak)
            cardContent += `
                <p><span class="icon"><i class="fas fa-key"></i></span> <span class="password">******</span> 
                    <span class="icons"> <span class="show" onclick="togglePassword(this, ${realIndex})"><i class="fas fa-eye"></i></span><span class="copy" onclick="copyText('${decryptPassword(item.password)}')"><i class="fas fa-copy"></i></span> 
                    </span></p>`;

            // Notu ekleme (boş değilse)
            if (item.note && item.note !== "") {
                cardContent += `<p><span class="icon"><i class="fas fa-note-sticky"></i></span> ${item.note}</p>`;
            }

            // Web sitesini ekleme (boş değilse)
            if (item.website && item.website !== "") {
                cardContent += `<p><span class="icon"><i class="fas fa-globe"></i></span> <a href="${item.website}" target="_blank">${item.website}</a></p>`;
            }

            // Tür bilgisini ekleme
            cardContent += `<p>Tür: ${item.type}</p>`;

            // Düzenle ve Sil butonlarını ekleme
            cardContent += `
                <div class="button-container">
                    <button class="edit-btn" onclick="editPassword(${realIndex})">Düzenle</button>
                    <button class="delete-btn" onclick="confirmDelete(${realIndex})">Sil</button>
                </div>`;

            card.innerHTML = cardContent; // Kart içeriğini ayarlar
            passwordList.appendChild(card); // Kartı listeye ekler
        });

        // Toplam öğe sayısını güncelle
        updateItemCount(filteredPasswords.length);

        checkForChanges(); // Değişiklikleri kontrol eder
    }

    // Kategori renklerini döndüren fonksiyon
    function getCategoryColor(category) {
        const colors = {
            "Temel": "#553725", "Sosyal": "#81B433", "Eğitim": "#D7263D",
            "Alışveriş": "#F9CC16", "Oyun ve Eğlence": "#8B2FC9", "İş": "#0496FF",
            "İş Arama": "#9DD9D2", "Diğer": "#ADB5BD"
        };
        return colors[category] || "#ADB5BD"; // Varsayılan renk gri
    }

    // Kategori butonlarının renklerini güncelleyen fonksiyon
    function updateCategoryButtonColors() {
        const isDarkMode = document.body.classList.contains("dark-mode"); // Dark mode durumunu kontrol et
        categoryFilterButtons.forEach(btn => {
            if (btn.classList.contains("active")) { // Aktif buton kontrolü
                const category = btn.dataset.category;
                btn.style.backgroundColor = category === "Hepsi" ? "#81B433" : getCategoryColor(category); // Hepsi için yeşil, diğerleri kategori rengi
            } else {
                btn.style.backgroundColor = isDarkMode ? "#6F4A30" : "#FFFFFF"; // Dark mode'da kahverengi, light mode'da beyaz
            }
        });
    }

    // Arama inputuna yazıldıkça filtreleme
    searchInput.addEventListener("input", (e) => {
        renderPasswords(activeTypeFilter, activeCategoryFilter, e.target.value);
    });

    // Tür filtre butonlarına tıklama olayı
    typeFilterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            typeFilterButtons.forEach(b => b.classList.remove("active")); // Tüm aktif class'larını kaldır
            btn.classList.add("active"); // Tıklanan butona aktif class ekle
            activeTypeFilter = btn.dataset.type; // Aktif türü güncelle
            renderPasswords(activeTypeFilter, activeCategoryFilter, searchInput.value); // Şifreleri yenile
        });
    });

    // Kategori filtre butonlarına tıklama olayı
    categoryFilterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            categoryFilterButtons.forEach(b => b.classList.remove("active")); // Tüm aktif class'larını kaldır
            btn.classList.add("active"); // Tıklanan butona aktif class ekle
            activeCategoryFilter = btn.dataset.category; // Aktif kategoriyi güncelle
            renderPasswords(activeTypeFilter, activeCategoryFilter, searchInput.value); // Şifreleri yenile
            updateCategoryButtonColors(); // Buton renklerini güncelle
        });
    });

    // Şifreyi göster/gizle fonksiyonu
    window.togglePassword = (element, index) => {
        const passField = element.parentElement.previousElementSibling; // Şifre alanını seç
        const realIndex = parseInt(element.closest(".card").getAttribute("data-index")); // Gerçek indeksi al
        if (passField.textContent === "******") { // Gizliyse
            passField.textContent = decryptPassword(currentPasswords[realIndex].password); // Şifreyi göster
            passField.classList.add("visible"); // Görünür class ekle
            element.innerHTML = '<i class="fas fa-eye-slash"></i>'; // İkonu değiştir
        } else { // Görünüyorsa
            passField.textContent = "******"; // Şifreyi gizle
            passField.classList.remove("visible"); // Görünür class'ı kaldır
            element.innerHTML = '<i class="fas fa-eye"></i>'; // İkonu geri al
        }
    };

    // Metni panoya kopyalama fonksiyonu
    window.copyText = (text) => {
        navigator.clipboard.writeText(text); // Metni panoya kopyalar
        showToast(`Kopyalandı: ${text}`); // Bildirim gösterir
    };

    // Toast bildirimi gösterme fonksiyonu
    function showToast(message) {
        const toast = document.createElement("div"); // Yeni toast elementi
        toast.className = "toast"; // Toast class'ı
        toast.textContent = message; // Mesaj içeriği
        document.body.appendChild(toast); // Sayfaya ekler
        setTimeout(() => {
            toast.remove(); // 3 saniye sonra kaldırır
        }, 3000);
    };

    // Silme işlemini onaylama fonksiyonu
    window.confirmDelete = (index) => {
        if (window.confirm("Bu şifreyi silmek istediğinizden emin misiniz?")) { // Onay sorusu
            deletePassword(index); // Onay verilirse silme işlemini yap
            showToast("Şifre silindi!"); // Silme sonrası bildirim
        }
    };

    // Şifreyi silme fonksiyonu
    window.deletePassword = (index) => {
        currentPasswords.splice(index, 1); // Şifreyi listeden çıkarır
        localStorage.setItem("currentPasswords", JSON.stringify(currentPasswords)); // Güncel veriyi kaydeder
        renderPasswords(activeTypeFilter, activeCategoryFilter, searchInput.value); // Listeyi yeniler
    };

    // Şifreyi düzenleme fonksiyonu
    window.editPassword = (index) => {
        window.location.href = `create.html?edit=${index}`; // Düzenleme sayfasına yönlendirir
    };

    // Değişiklik kontrol fonksiyonu (indirme butonunu gösterir/gizler)
    function checkForChanges() {
        const originalStr = JSON.stringify(originalPasswords);
        const currentStr = JSON.stringify(currentPasswords);
        if (originalStr !== currentStr) { // Değişiklik varsa
            downloadBtn.style.display = "inline-block"; // İndirme butonunu göster
        } else {
            downloadBtn.style.display = "none"; // Yoksa gizle
        }
    }

    // Güncel veriyi indirme olayı
    downloadBtn.addEventListener("click", () => {
        const fileContent = `const passwords = ${JSON.stringify(currentPasswords, null, 2)};`; // Veri dosya içeriği
        const blob = new Blob([fileContent], { type: "application/javascript" }); // Blob oluşturur
        const link = document.createElement("a"); // İndirme bağlantısı
        link.href = URL.createObjectURL(blob); // Blob URL'si
        link.download = "data.js"; // Dosya adı
        link.click(); // İndirmeyi başlatır
        showToast("Güncel veri indirildi!"); // Bildirim gösterir
    });

    // Sayfa yüklendiğinde şifreleri listele
    renderPasswords();
    // İlk yüklemede kategori butonlarının renklerini güncelle
    updateCategoryButtonColors();
});