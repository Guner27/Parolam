document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("create-form");
    const createBtn = document.getElementById("create-btn");
    const editButtons = document.querySelector(".edit-buttons");
    const saveBtn = document.getElementById("save-btn");
    const deleteBtn = document.getElementById("delete-btn");
    const emailContainer = document.getElementById("email-container");
    const darkModeToggle = document.getElementById("dark-mode-toggle");

    // Şifreleme anahtarı
    const encryptionKey = "mySecretKey123";

    // Dark Mode Kontrolü
    function toggleDarkMode() {
        const isDarkMode = document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
        darkModeToggle.textContent = isDarkMode ? "☀️" : "🌙";
    }

    // Sayfa yüklendiğinde dark mode durumunu kontrol et
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
        darkModeToggle.textContent = "☀️";
    } else {
        darkModeToggle.textContent = "🌙";
    }

    darkModeToggle.addEventListener("click", toggleDarkMode);

    // Şifreyi şifreleme fonksiyonu
    function encryptPassword(password) {
        return CryptoJS.AES.encrypt(password, encryptionKey).toString();
    }

    // Şifreyi çözme fonksiyonu
    function decryptPassword(encryptedPassword) {
        const bytes = CryptoJS.AES.decrypt(encryptedPassword, encryptionKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    // Toast bildirimi gösterme fonksiyonu
    function showToast(message) {
        const toast = document.createElement("div");
        toast.className = "toast";
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    // Yeni e-posta satırı ekleme (ikonlu)
    function addEmailRow(value = "") {
        const emailRow = document.createElement("div");
        emailRow.className = "email-row";
        emailRow.innerHTML = `
            <i class="fas fa-at input-icon"></i>
            <input type="email" class="email-input" placeholder="E-posta" value="${value}">
            <button type="button" class="remove-email">-</button>
        `;
        emailContainer.appendChild(emailRow);

        emailRow.querySelector(".remove-email").addEventListener("click", () => {
            emailRow.remove();
            updateAddButtonVisibility();
        });
    }

    // E-posta ekleme butonunun görünürlüğünü güncelle
    function updateAddButtonVisibility() {
        const addEmailBtn = emailContainer.querySelector(".add-email");
        if (emailContainer.children.length === 1) {
            addEmailBtn.style.display = "block";
        }
    }

    const addEmailBtn = emailContainer.querySelector(".add-email");
    addEmailBtn.addEventListener("click", () => {
        addEmailRow();
    });

    let currentPasswords = JSON.parse(localStorage.getItem("currentPasswords")) || JSON.parse(JSON.stringify(passwords));

    const urlParams = new URLSearchParams(window.location.search);
    const editIndex = urlParams.get("edit");

    if (editIndex !== null) {
        createBtn.style.display = "none";
        editButtons.style.display = "flex";

        const item = currentPasswords[parseInt(editIndex)];
        document.getElementById("title").value = item.title;
        document.getElementById("username").value = item.username || "";
        document.getElementById("password").value = decryptPassword(item.password);
        document.getElementById("note").value = item.note || "";
        document.getElementById("website").value = item.website || "";
        document.getElementById("category").value = item.category;
        document.getElementById("type").value = item.type;

        emailContainer.innerHTML = "";
        if (item.emails && item.emails.length > 0 && item.emails.some(email => email !== "")) {
            item.emails.forEach((email, index) => {
                if (index === 0) {
                    emailContainer.innerHTML = `
                        <div class="email-row">
                            <i class="fas fa-at input-icon"></i>
                            <input type="email" class="email-input" placeholder="E-posta" value="${email}">
                            <button type="button" class="add-email">+</button>
                        </div>`;
                    emailContainer.querySelector(".add-email").addEventListener("click", () => {
                        addEmailRow();
                    });
                } else {
                    addEmailRow(email);
                }
            });
        } else {
            emailContainer.innerHTML = `
                <div class="email-row">
                    <i class="fas fa-at input-icon"></i>
                    <input type="email" class="email-input" placeholder="E-posta">
                    <button type="button" class="add-email">+</button>
                </div>`;
            emailContainer.querySelector(".add-email").addEventListener("click", () => {
                addEmailRow();
            });
        }
        updateAddButtonVisibility();

        saveBtn.addEventListener("click", () => {
            const emailInputs = emailContainer.querySelectorAll(".email-input");
            const emails = Array.from(emailInputs).map(input => input.value).filter(email => email !== "");
            currentPasswords[parseInt(editIndex)] = {
                title: document.getElementById("title").value,
                emails: emails.length > 0 ? emails : [""],
                username: document.getElementById("username").value || "",
                password: encryptPassword(document.getElementById("password").value),
                note: document.getElementById("note").value || "",
                website: document.getElementById("website").value || "",
                category: document.getElementById("category").value,
                type: document.getElementById("type").value
            };
            localStorage.setItem("currentPasswords", JSON.stringify(currentPasswords));
            showToast("Değişiklikler kaydedildi!");
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);
        });

        deleteBtn.addEventListener("click", () => {
            currentPasswords.splice(parseInt(editIndex), 1);
            localStorage.setItem("currentPasswords", JSON.stringify(currentPasswords));
            showToast("Şifre silindi!");
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);
        });
    } else {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const emailInputs = emailContainer.querySelectorAll(".email-input");
            const emails = Array.from(emailInputs).map(input => input.value).filter(email => email !== "");
            const newPassword = {
                title: document.getElementById("title").value,
                emails: emails.length > 0 ? emails : [""],
                username: document.getElementById("username").value || "",
                password: encryptPassword(document.getElementById("password").value),
                note: document.getElementById("note").value || "",
                website: document.getElementById("website").value || "",
                category: document.getElementById("category").value,
                type: document.getElementById("type").value
            };
            currentPasswords.push(newPassword);
            localStorage.setItem("currentPasswords", JSON.stringify(currentPasswords));
            showToast("Parola eklendi!");
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);
        });
    }

    updateAddButtonVisibility();
});

document.getElementById("password").addEventListener("input", (e) => {
    const password = e.target.value;
    const strength = password.length > 12 ? "Güçlü" : password.length > 8 ? "Orta" : "Zayıf";
    console.log(`Şifre Gücü: ${strength}`); // Şimdilik konsola yazdırır, UI eklenebilir
});