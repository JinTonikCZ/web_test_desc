const EMOTIONS = {
    joy: { name: 'Joy', color: '#facc15', icon: '😊' },
    sadness: { name: 'Sadness', color: '#60a5fa', icon: '😢' },
    anger: { name: 'Anger', color: '#ef4444', icon: '😠' },
    calm: { name: 'Calm', color: '#34d399', icon: '😌' },
    anxiety: { name: 'Anxiety', color: '#c084fc', icon: '😰' },
    neutral: { name: 'Neutral', color: '#d5c7b4', icon: '😐' }
};

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];

let currentDate = new Date();
let checkInData = {
    emotion: null,
    intensity: 5,
    note: ''
};
let currentStep = 1;


// ------- LOCAL STORAGE -----------------------------------------------------

function getEmotionEntries() {
    const stored = localStorage.getItem('emotionEntries');
    if (stored) return JSON.parse(stored);
    
    const defaultEntries = [
        { date: new Date().toISOString(), emotion: 'joy', intensity: 7, note: 'Had a great morning walk!', time: '09:15 AM' },
        { date: new Date(Date.now() - 86400000 * 1).toISOString(), emotion: 'calm', intensity: 6, note: 'Relaxing evening', time: '07:30 PM' },
        { date: new Date(Date.now() - 86400000 * 2).toISOString(), emotion: 'anxiety', intensity: 8, note: 'Big presentation coming up', time: '02:15 PM' },
    ];
    
    localStorage.setItem('emotionEntries', JSON.stringify(defaultEntries));
    return defaultEntries;
}

function saveEmotionEntry(entry) {
    const entries = getEmotionEntries();
    entries.unshift(entry);
    localStorage.setItem('emotionEntries', JSON.stringify(entries));
}

function formatTime(date) {
    return new Date(date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}


// --------------------------------------------------------------
//   LOGIN / SIGNUP LOGIC (index.html)
// --------------------------------------------------------------

if (window.location.pathname.endsWith('index.html') || 
    window.location.pathname.endsWith('/') ||
    window.location.pathname.includes('web_test_desc')) {

    const authForm = document.getElementById('auth-form');
    const toggleLink = document.getElementById('toggle-link');
    const authTitle = document.getElementById('auth-title');
    const authSubtitle = document.getElementById('auth-subtitle');
    const signupFields = document.getElementById('signup-fields');
    const submitBtn = authForm.querySelector('button[type="submit"]');
    let isSignup = false;

    // Toggle between sign in / sign up
    toggleLink.addEventListener('click', (e) => {
        e.preventDefault();
        isSignup = !isSignup;
        
        if (isSignup) {
            authTitle.textContent = 'Create Account';
            authSubtitle.textContent = 'Start tracking your emotions today';
            signupFields.style.display = 'block';
            submitBtn.textContent = 'Sign Up';
            document.getElementById('auth-toggle').innerHTML = 
                'Already have an account? <a href="#" id="toggle-link">Sign In</a>';
        } else {
            authTitle.textContent = 'Welcome Back';
            authSubtitle.textContent = 'Track your emotional journey';
            signupFields.style.display = 'none';
            submitBtn.textContent = 'Sign In';
            document.getElementById('auth-toggle').innerHTML = 
                'Don\'t have an account? <a href="#" id="toggle-link">Sign Up</a>';
        }
        
        document.getElementById('toggle-link').addEventListener('click', arguments.callee);
    });

    // Submit login/signup
    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (isSignup) {
            const confirmPassword = document.getElementById('confirm-password').value;
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
        }
        
        localStorage.setItem('userEmail', email);

        // 🔥 MAIN FIX FOR GITHUB PAGES:
        window.location.href = './analytics.html';
    });
}


// --------------------------------------------------------------
//          ANALYTICS PAGE LOGIC (analytics.html)
// --------------------------------------------------------------

if (window.location.pathname.endsWith('analytics.html')) {
    const openCheckinBtn = document.getElementById('open-checkin');
    const checkinModal = document.getElementById('checkin-modal');
    const closeCheckinBtn = document.getElementById('close-checkin');
    const modalNextBtn = document.getElementById('modal-next');
    const modalBackBtn = document.getElementById('modal-back');
    const detailsModal = document.getElementById('details-modal');
    const closeDetailsBtn = document.getElementById('close-details');
    const viewAllDetailsBtn = document.getElementById('view-all-details');
    const intensitySlider = document.getElementById('intensity');
    const intensityValue = document.getElementById('intensity-value');
    
    openCheckinBtn.addEventListener('click', () => {
        checkinModal.classList.add('active');
        resetCheckIn();
    });

    closeCheckinBtn.addEventListener('click', () => {
        checkinModal.classList.remove('active');
    });

    closeDetailsBtn.addEventListener('click', () => {
        detailsModal.classList.remove('active');
    });

    viewAllDetailsBtn.addEventListener('click', () => {
        detailsModal.classList.add('active');
        renderAllDetails();
    });

    checkinModal.querySelector('.modal-overlay').addEventListener('click', () => {
        checkinModal.classList.remove('active');
    });

    detailsModal.querySelector('.modal-overlay').addEventListener('click', () => {
        detailsModal.classList.remove('active');
    });

    intensitySlider.addEventListener('input', (e) => {
        intensityValue.textContent = e.target.value;
        checkInData.intensity = parseInt(e.target.value);
    });

    document.querySelectorAll('input[name="emotion"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            checkInData.emotion = e.target.value;
        });
    });

    document.getElementById('trigger-note').addEventListener('input', (e) => {
        checkInData.note = e.target.value;
    });

    modalNextBtn.addEventListener('click', () => {
        if (currentStep === 1) {
            if (!checkInData.emotion) {
                alert('Please select an emotion');
                return;
            }
            goToStep(2);
        } else if (currentStep === 2) {
            goToStep(3);
        } else if (currentStep === 3) {
            saveCheckIn();
        }
    });

    modalBackBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            goToStep(currentStep - 1);
        }
    });

    function resetCheckIn() {
        currentStep = 1;
        checkInData = { emotion: null, intensity: 5, note: '' };
        document.querySelectorAll('input[name="emotion"]').forEach(r => r.checked = false);
        intensitySlider.value = 5;
        intensityValue.textContent = '5';
        document.getElementById('trigger-note').value = '';
        goToStep(1);
    }

    function goToStep(step) {
        currentStep = step;
        
        document.querySelectorAll('.step-content').forEach(s => s.style.display = 'none');
        document.getElementById(`step-${step}`).style.display = 'block';
        
        document.getElementById('current-step').textContent = step;
        document.getElementById('progress-fill').style.width = `${(step / 3) * 100}%`;
        
        if (step === 1) {
            modalBackBtn.style.display = 'none';
            modalNextBtn.textContent = 'Next';
        } else if (step === 2) {
            modalBackBtn.style.display = 'block';
            modalNextBtn.textContent = 'Next';
        } else {
            modalBackBtn.style.display = 'block';
            modalNextBtn.textContent = 'Save Check-in';
        }
    }

    function saveCheckIn() {
        const now = new Date();
        const entry = {
            date: now.toISOString(),
            emotion: checkInData.emotion,
            intensity: checkInData.intensity,
            note: checkInData.note,
            time: formatTime(now)
        };
        
        saveEmotionEntry(entry);
        checkinModal.classList.remove('active');
        renderCalendar();
        renderWeeklyChart();
        renderTodayDetails();
        
        alert('Check-in saved successfully!');
    }

    function renderCalendar() {
        const grid = document.getElementById('calendar-grid');
        grid.innerHTML = '';
        
        const monthLabel = document.getElementById('current-month');
        monthLabel.textContent = `${MONTH_NAMES[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
        
        const dayHeaders = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        dayHeaders.forEach(day => {
            const header = document.createElement('div');
            header.className = 'calendar-day-header';
            header.textContent = day;
            grid.appendChild(header);
        });
        
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const startingDayOfWeek = firstDay.getDay();
        
        const entries = getEmotionEntries();
        
        for (let i = 0; i < startingDayOfWeek; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            grid.appendChild(emptyDay);
        }
        
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            
            const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const dayEntries = entries.filter(e => {
                const entryDate = new Date(e.date);
                return entryDate.getDate() === day && 
                       entryDate.getMonth() === currentDate.getMonth() &&
                       entryDate.getFullYear() === currentDate.getFullYear();
            });
            
            if (dayEntries.length > 0) {
                const mostRecentEmotion = dayEntries[0].emotion;
                const emotionColor = EMOTIONS[mostRecentEmotion].color;
                dayElement.style.background = emotionColor;
                dayElement.classList.add('has-emotion');
            }
            
            dayElement.addEventListener('click', () => {
                if (dayEntries.length > 0) {
                    showDayDetails(dayEntries);
                }
            });
            
            grid.appendChild(dayElement);
        }
    }

    function showDayDetails(entries) {
        const detailEntriesDiv = document.getElementById('detail-entries');
        detailEntriesDiv.innerHTML = entries.map(entry => `
            <div class="detail-entry ${entry.emotion}">
                <div class="detail-header">
                    <span class="detail-emotion">${EMOTIONS[entry.emotion].icon} ${EMOTIONS[entry.emotion].name}</span>
                    <span class="detail-time">${entry.time}</span>
                </div>
                <div class="detail-description">${entry.note || 'No note provided'}</div>
            </div>
        `).join('');
        
        detailsModal.classList.add('active');
    }

    function renderAllDetails() {
        const entries = getEmotionEntries().slice(0, 10);
        showDayDetails(entries);
    }

    function renderWeeklyChart() {
        const chartContainer = document.getElementById('weekly-chart');
        chartContainer.innerHTML = '';
        
        const entries = getEmotionEntries();
        const today = new Date();
        
        const weekData = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            
            const dayEntries = entries.filter(e => {
                const entryDate = new Date(e.date);
                return entryDate.toDateString() === date.toDateString();
            });
            
            const emotionCounts = {};
            dayEntries.forEach(entry => {
                emotionCounts[entry.emotion] = (emotionCounts[entry.emotion] || 0) + 1;
            });
            
            weekData.push({
                day: WEEK_DAYS[date.getDay()],
                emotions: emotionCounts,
                total: dayEntries.length
            });
        }
        
        const maxCount = Math.max(...weekData.map(d => d.total), 1);
        
        weekData.forEach(dayData => {
            const barDiv = document.createElement('div');
            barDiv.className = 'chart-bar';
            
            const barContainer = document.createElement('div');
            barContainer.className = 'bar-container';
            
            if (dayData.total > 0) {
                const emotionKeys = Object.keys(dayData.emotions);
                emotionKeys.forEach(emotion => {
                    const segment = document.createElement('div');
                    segment.className = 'bar-segment';
                    const height = (dayData.emotions[emotion] / maxCount) * 100;
                    segment.style.height = `${height}%`;
                    segment.style.background = EMOTIONS[emotion].color;
                    segment.title = `${EMOTIONS[emotion].name}: ${dayData.emotions[emotion]}`;
                    barContainer.appendChild(segment);
                });
            } else {
                const emptySegment = document.createElement('div');
                emptySegment.className = 'bar-segment';
                emptySegment.style.height = '10px';
                emptySegment.style.background = '#e5e7eb';
                barContainer.appendChild(emptySegment);
            }
            
            const label = document.createElement('div');
            label.className = 'chart-label';
            label.textContent = dayData.day;
            
            barDiv.appendChild(barContainer);
            barDiv.appendChild(label);
            chartContainer.appendChild(barDiv);
        });
    }

    function renderTodayDetails() {
        const detailsList = document.getElementById('details-list');
        const entries = getEmotionEntries();
        const today = new Date();
        
        const todayEntries = entries.filter(e => {
            const entryDate = new Date(e.date);
            return entryDate.toDateString() === today.toDateString();
        }).slice(0, 3);
        
        if (todayEntries.length === 0) {
            detailsList.innerHTML = '<p style="color: #6b7280; text-align: center; padding: 20px;">No entries for today yet. Click "Daily Check-in" to add one!</p>';
            return;
        }
        
        detailsList.innerHTML = todayEntries.map(entry => `
            <div class="detail-entry ${entry.emotion}">
                <div class="detail-header">
                    <span class="detail-emotion">${EMOTIONS[entry.emotion].icon} ${EMOTIONS[entry.emotion].name}</span>
                    <span class="detail-time">${entry.time}</span>
                </div>
                <div class="detail-description">${entry.note || 'No note provided'}</div>
            </div>
        `).join('');
    }

    document.getElementById('prev-month').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    document.getElementById('next-month').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();
    renderWeeklyChart();
    renderTodayDetails();
}
