document.addEventListener("DOMContentLoaded", function () {
    const authForm = document.getElementById("auth-form");
    const toggleLink = document.getElementById("toggle-link");
    const authTitle = document.getElementById("auth-title");
    const authSubtitle = document.getElementById("auth-subtitle");
    const signupFields = document.getElementById("signup-fields");

    let isSignup = false;

    if (toggleLink) {
        toggleLink.addEventListener("click", function (e) {
            e.preventDefault();
            isSignup = !isSignup;

            if (isSignup) {
                authTitle.textContent = "Create Account";
                authSubtitle.textContent = "Start your emotional journey";
                signupFields.style.display = "block";
                toggleLink.textContent = "Sign In";

                document.querySelector(".btn-primary").textContent = "Sign Up";
            } else {
                authTitle.textContent = "Welcome Back";
                authSubtitle.textContent = "Track your emotional journey";
                signupFields.style.display = "none";
                toggleLink.textContent = "Sign Up";

                document.querySelector(".btn-primary").textContent = "Sign In";
            }
        });
    }

    if (authForm) {
        authForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            if (isSignup) {
                const confirmPassword = document.getElementById("confirm-password").value.trim();

                if (password !== confirmPassword) {
                    alert("Passwords do not match");
                    return;
                }

                alert("Account created successfully!");
                isSignup = false;
                toggleLink.textContent = "Sign Up";
                signupFields.style.display = "none";
                authTitle.textContent = "Welcome Back";
                authSubtitle.textContent = "Track your emotional journey";

                return;
            }

            localStorage.setItem("eflow_user", email);

            window.location.href = "/web_test_desc/analytics.html";
        });
    }

    const userEmail = localStorage.getItem("eflow_user");
    const userEmailBtn = document.getElementById("user-menu-btn");

    if (userEmailBtn && userEmail) {
        userEmailBtn.textContent = userEmail;
    }

    if (document.getElementById("weekly-chart")) {
        generateWeeklyChart();
        loadTodayDetails();
        initializeCalendar();
        initializeCheckInModal();
        initializeDetailsModal();
    }
});

function generateWeeklyChart() {
    const chartContainer = document.getElementById("weekly-chart");
    if (!chartContainer) return;

    const emotions = JSON.parse(localStorage.getItem("eflow_emotions")) || [];

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const intensity = new Array(7).fill(0);

    emotions.forEach(entry => {
        const date = new Date(entry.date);
        const dayIndex = date.getDay() - 1;

        if (dayIndex >= 0 && dayIndex < 7) {
            intensity[dayIndex] += entry.intensity;
        }
    });

    chartContainer.innerHTML = "";
    for (let i = 0; i < 7; i++) {
        const bar = document.createElement("div");
        bar.classList.add("chart-bar");
        bar.style.height = `${intensity[i] * 5}px`;

        const label = document.createElement("span");
        label.classList.add("chart-label");
        label.textContent = days[i];

        const barWrapper = document.createElement("div");
        barWrapper.classList.add("chart-bar-wrapper");
        barWrapper.appendChild(bar);
        barWrapper.appendChild(label);

        chartContainer.appendChild(barWrapper);
    }
}

function loadTodayDetails() {
    const list = document.getElementById("details-list");
    if (!list) return;

    const emotions = JSON.parse(localStorage.getItem("eflow_emotions")) || [];
    const today = new Date().toISOString().split("T")[0];

    const todayItems = emotions.filter(e => e.date === today);

    list.innerHTML = "";

    if (todayItems.length === 0) {
        list.innerHTML = `<p class="empty-msg">No entries for today yet.</p>`;
        return;
    }

    todayItems.forEach(entry => {
        const item = document.createElement("div");
        item.classList.add("detail-item");

        item.innerHTML = `
            <div class="detail-emotion">
                <span class="emotion-color" style="background:${entry.color}"></span>
                ${entry.emotion}
            </div>
            <span class="detail-intensity">Intensity: ${entry.intensity}</span>
        `;

        item.addEventListener("click", () => openDetailsModal(entry.date));

        list.appendChild(item);
    });
}
function initializeCalendar() {
    const grid = document.getElementById("calendar-grid");
    const monthLabel = document.getElementById("current-month");

    if (!grid || !monthLabel) return;

    let currentDate = new Date();
    currentDate.setDate(1);

    function renderCalendar() {
        grid.innerHTML = "";

        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDayIndex = new Date(year, month, 1).getDay();
        const lastDay = new Date(year, month + 1, 0).getDate();

        const monthName = currentDate.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
        });

        monthLabel.textContent = monthName;

        const startIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

        for (let i = 0; i < startIndex; i++) {
            const empty = document.createElement("div");
            empty.classList.add("calendar-day-empty");
            grid.appendChild(empty);
        }

        const emotions = JSON.parse(localStorage.getItem("eflow_emotions")) || [];

        for (let day = 1; day <= lastDay; day++) {
            const cell = document.createElement("div");
            cell.classList.add("calendar-day");

            const dayText = document.createElement("span");
            dayText.textContent = day;
            cell.appendChild(dayText);

            const fullDate = new Date(year, month, day)
                .toISOString()
                .split("T")[0];

            const dayEntries = emotions.filter(e => e.date === fullDate);

            if (dayEntries.length > 0) {
                const dotsWrapper = document.createElement("div");
                dotsWrapper.classList.add("emotion-dots");

                dayEntries.forEach((entry, index) => {
                    if (index < 4) {
                        const dot = document.createElement("span");
                        dot.classList.add("emotion-dot");
                        dot.style.background = entry.color;
                        dotsWrapper.appendChild(dot);
                    }
                });

                cell.appendChild(dotsWrapper);
                cell.classList.add("has-entry");

                cell.addEventListener("click", () => openDetailsModal(fullDate));
            }

            grid.appendChild(cell);
        }
    }

    document.getElementById("prev-month").addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    document.getElementById("next-month").addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();
}
function initializeCheckInModal() {
    const openBtn = document.getElementById("open-checkin");
    const modal = document.getElementById("checkin-modal");
    const closeBtn = document.getElementById("close-checkin");

    const step1 = document.getElementById("step-1");
    const step2 = document.getElementById("step-2");
    const step3 = document.getElementById("step-3");

    const modalNext = document.getElementById("modal-next");
    const modalBack = document.getElementById("modal-back");

    const intensityInput = document.getElementById("intensity");
    const intensityValue = document.getElementById("intensity-value");

    let currentStep = 1;
    let selectedEmotion = null;
    let selectedColor = null;

    const emotionsList = [
        { name: "Joy", color: "#facc15" },
        { name: "Sadness", color: "#60a5fa" },
        { name: "Anger", color: "#ef4444" },
        { name: "Calm", color: "#34d399" },
        { name: "Anxiety", color: "#c084fc" },
        { name: "Neutral", color: "#d5c7b4" },
    ];

    function renderEmotions() {
        const grid = document.getElementById("emotion-grid");
        grid.innerHTML = "";

        emotionsList.forEach(em => {
            const card = document.createElement("div");
            card.classList.add("emotion-card");

            card.innerHTML = `
                <span class="emotion-color" style="background:${em.color}"></span>
                ${em.name}
            `;

            card.addEventListener("click", () => {
                document.querySelectorAll(".emotion-card").forEach(c => c.classList.remove("selected"));
                card.classList.add("selected");

                selectedEmotion = em.name;
                selectedColor = em.color;
            });

            grid.appendChild(card);
        });
    }

    renderEmotions();

    function updateStepView() {
        step1.style.display = currentStep === 1 ? "block" : "none";
        step2.style.display = currentStep === 2 ? "block" : "none";
        step3.style.display = currentStep === 3 ? "block" : "none";

        document.getElementById("current-step").textContent = currentStep;
        document.getElementById("progress-fill").style.width = `${(currentStep / 3) * 100}%`;

        modalBack.style.display = currentStep === 1 ? "none" : "inline-block";
        modalNext.textContent = currentStep === 3 ? "Finish" : "Next";
    }

    // Открыть модалку
    openBtn.addEventListener("click", () => {
        modal.classList.add("active");
        currentStep = 1;
        updateStepView();
    });

    // Закрыть модалку
    closeBtn.addEventListener("click", () => modal.classList.remove("active"));
    modal.querySelector(".modal-overlay").addEventListener("click", () => modal.classList.remove("active"));

    // Назад
    modalBack.addEventListener("click", () => {
        if (currentStep > 1) {
            currentStep--;
            updateStepView();
        }
    });

    // Вперёд / Finish
    modalNext.addEventListener("click", () => {
        if (currentStep === 1 && !selectedEmotion) {
            alert("Please select an emotion");
            return;
        }

        if (currentStep < 3) {
            currentStep++;
            updateStepView();
        } else {
            saveEmotionEntry(selectedEmotion, selectedColor);
            modal.classList.remove("active");
        }
    });

    intensityInput.addEventListener("input", () => {
        intensityValue.textContent = intensityInput.value;
    });
}

function saveEmotionEntry(emotion, color) {
    const intensity = parseInt(document.getElementById("intensity").value);
    const note = document.getElementById("trigger-note").value.trim();

    const date = new Date().toISOString().split("T")[0];

    const entry = {
        emotion,
        color,
        intensity,
        note,
        date
    };

    const data = JSON.parse(localStorage.getItem("eflow_emotions")) || [];
    data.push(entry);

    localStorage.setItem("eflow_emotions", JSON.stringify(data));

    generateWeeklyChart();
    loadTodayDetails();
    initializeCalendar();
}
function initializeDetailsModal() {
    const modal = document.getElementById("details-modal");
    const closeBtn = document.getElementById("close-details");

    if (!modal) return;

    // Закрытие по кнопке
    closeBtn.addEventListener("click", () => modal.classList.remove("active"));

    // Закрытие по фону
    modal.querySelector(".modal-overlay").addEventListener("click", () => {
        modal.classList.remove("active");
    });
}

function openDetailsModal(date) {
    const modal = document.getElementById("details-modal");
    const container = document.getElementById("detail-entries");

    modal.classList.add("active");

    const emotions = JSON.parse(localStorage.getItem("eflow_emotions")) || [];

    const dayEntries = emotions.filter(e => e.date === date);

    if (dayEntries.length === 0) {
        container.innerHTML = `<p class="empty-msg">No entries for this day.</p>`;
        return;
    }

    container.innerHTML = "";

    dayEntries.forEach(entry => {
        const item = document.createElement("div");
        item.classList.add("detail-entry");

        item.innerHTML = `
            <div class="detail-entry-header">
                <span class="emotion-color" style="background:${entry.color}"></span>
                <span class="entry-emotion">${entry.emotion}</span>
                <span class="entry-intensity">Intensity: ${entry.intensity}</span>
            </div>

            ${
                entry.note
                    ? `<p class="entry-note"><strong>Note:</strong> ${entry.note}</p>`
                    : ""
            }
        `;

        container.appendChild(item);
    });
}
/* ================================
      USER MENU (PROFILE BUTTON)
================================ */

function initializeUserMenu() {
    const userBtn = document.getElementById("user-menu-btn");
    const storedEmail = localStorage.getItem("eflow_user");

    if (userBtn && storedEmail) {
        userBtn.textContent = storedEmail;
    }

    if (userBtn) {
        userBtn.addEventListener("click", () => {
            const menu = document.createElement("div");
            menu.classList.add("user-menu-popup");

            menu.innerHTML = `
                <p class="user-menu-email">${storedEmail || "Unknown"}</p>
                <button id="logout-btn" class="btn-logout">Log out</button>
            `;

            // удаляем старые меню если есть
            const oldPopup = document.querySelector(".user-menu-popup");
            if (oldPopup) oldPopup.remove();

            document.body.appendChild(menu);

            const rect = userBtn.getBoundingClientRect();
            menu.style.top = `${rect.bottom + 10}px`;
            menu.style.left = `${rect.left - 40}px`;

            // закрытие по клику вне popup
            setTimeout(() => {
                document.addEventListener(
                    "click",
                    (e) => {
                        if (!menu.contains(e.target) && e.target !== userBtn) {
                            menu.remove();
                        }
                    },
                    { once: true }
                );
            }, 10);

            // кнопка выхода
            document.getElementById("logout-btn").addEventListener("click", () => {
                localStorage.removeItem("eflow_user");
                window.location.href = "/web_test_desc/index.html";
            });
        });
    }
}

initializeUserMenu();
/* =====================================
            UTILITY FUNCTIONS
===================================== */

// форматирование даты в YYYY-MM-DD
function formatDate(date) {
    if (!(date instanceof Date)) return null;
    return date.toISOString().split("T")[0];
}

// получение текущей даты
function getToday() {
    return new Date().toISOString().split("T")[0];
}

// безопасное чтение из localStorage
function loadEmotions() {
    try {
        return JSON.parse(localStorage.getItem("eflow_emotions")) || [];
    } catch (e) {
        console.error("LocalStorage error:", e);
        return [];
    }
}

// безопасная запись в localStorage
function saveEmotions(data) {
    try {
        localStorage.setItem("eflow_emotions", JSON.stringify(data));
    } catch (e) {
        console.error("LocalStorage write error:", e);
    }
}

// сортировка по дате
function sortByDate(entries) {
    return entries.sort((a, b) => new Date(a.date) - new Date(b.date));
}

// получить эмоции по конкретной дате
function getEntriesByDate(date) {
    const all = loadEmotions();
    return all.filter(e => e.date === date);
}

// подсчет средней интенсивности за неделю
function getWeeklyIntensity() {
    const emotions = loadEmotions();

    const week = new Array(7).fill(0);

    emotions.forEach(entry => {
        const d = new Date(entry.date);
        let day = d.getDay(); // 0 = Sunday

        if (day === 0) day = 7; // переносим воскресенье в конец
        week[day - 1] += entry.intensity;
    });

    return week;
}

// получить цвет эмоции по названию
function getEmotionColor(name) {
    const map = {
        Joy: "#facc15",
        Sadness: "#60a5fa",
        Anger: "#ef4444",
        Calm: "#34d399",
        Anxiety: "#c084fc",
        Neutral: "#d5c7b4",
    };
    return map[name] || "#888";
}

// безопасное добавление записи
function addEmotionEntry(entry) {
    const data = loadEmotions();
    data.push(entry);
    saveEmotions(data);
}

// проверка: есть ли запись за сегодня?
function hasTodayEntry() {
    const today = getToday();
    const entries = loadEmotions();
    return entries.some(e => e.date === today);
}

// обновление всех UI-компонентов одним вызовом
function refreshAll() {
    generateWeeklyChart();
    loadTodayDetails();
    initializeCalendar();
}
/* =====================================
            FINAL EVENT BINDINGS
===================================== */

// кнопка "View All" — открывает модалку с сегодняшними эмоциями
const viewAllBtn = document.getElementById("view-all-details");
if (viewAllBtn) {
    viewAllBtn.addEventListener("click", () => {
        const today = getToday();
        openDetailsModal(today);
    });
}

// если сегодня нет записей — визуально сигнализируем
if (document.getElementById("open-checkin") && hasTodayEntry()) {
    document.getElementById("open-checkin").textContent = "Add another entry";
}

// обработка ошибок, чтобы сайт не падал
window.onerror = function (msg, src, line, col, err) {
    console.warn("Non-blocking JS error:", msg, "at", line, col);
    return true; // предотвращает красные ошибки на GitHub Pages
};

/* =====================================
      AUTO INITIALIZATION AFTER LOAD
===================================== */

// если мы на странице аналитики — обновляем весь UI
if (window.location.pathname.includes("analytics.html")) {
    try {
        refreshAll();
    } catch (e) {
        console.error("Analytics init error:", e);
    }
}

// если мы на странице логина — ничего не делаем, всё уже инициализировано в DOMContentLoaded

console.log("%cEmotional Flow loaded successfully", "color:#6d28d9; font-size:14px;");
