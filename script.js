// =======================================================
// URL PARAMS HELPER
// =======================================================
function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
}


// =======================================================
// LOGIN PAGE LOGIC (index.html)
// =======================================================
if (window.location.pathname.includes("index.html") ||
    window.location.pathname.endsWith("/web_test_desc/")) 
{
    const btn = document.getElementById("login-btn");

    if (btn) {
        btn.addEventListener("click", () => {
            const email = document.getElementById("email-input").value.trim();
            const password = document.getElementById("password-input").value.trim();

            if (email === "" || password === "") {
                alert("Fill both fields");
                return;
            }

            // Save emotion data array (stub example)
            const exampleEmotionData = [
                { day: "Mon", value: 3 },
                { day: "Tue", value: 5 },
                { day: "Wed", value: 4 },
                { day: "Thu", value: 6 },
                { day: "Fri", value: 2 },
                { day: "Sat", value: 5 },
                { day: "Sun", value: 4 }
            ];

            localStorage.setItem("EFLOW_WEEK", JSON.stringify(exampleEmotionData));

            window.location.href = "analytics.html?email=" + encodeURIComponent(email);
        });
    }
}


// =======================================================
// ANALYTICS PAGE LOGIC
// =======================================================
if (window.location.pathname.includes("analytics.html")) {

    // set email
    const email = getParam("email");
    const emailBtn = document.getElementById("user-email-display");
    if (emailBtn && email) {
        emailBtn.textContent = email;
    }

    // retrieve stored weekly data
    let weekly = JSON.parse(localStorage.getItem("EFLOW_WEEK") || "[]");

    // draw chart
    const chartCanvas = document.getElementById("weeklyChart");
    if (chartCanvas && weekly.length > 0) {
        const ctx = chartCanvas.getContext("2d");

        ctx.clearRect(0, 0, chartCanvas.width, chartCanvas.height);

        weekly.forEach((item, i) => {
            const barHeight = item.value * 20;
            ctx.fillStyle = "#6C63FF";
            ctx.fillRect(50 + i * 70, 250 - barHeight, 40, barHeight);

            ctx.font = "16px Arial";
            ctx.fillStyle = "#000";
            ctx.fillText(item.day, 55 + i * 70, 270);
        });
    }

    // Today emotions (simple placeholder)
    const todayBox = document.getElementById("today-list");
    if (todayBox) {
        todayBox.innerHTML = `
            <div class="emotion-card">😊 Joy (Intensity: 7)</div>
            <div class="emotion-card">😌 Calm (Intensity: 5)</div>
        `;
    }
}
