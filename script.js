/* ========================================
   Romantic Gift Website - JavaScript
   Created for Zahra with love
   ======================================== */

// Global Variables
const startDate = new Date('2026-04-01T00:00:00');
let currentPhoto = 0;
let isPlaying = false;
let messageIndex = 0;

// DOM Elements
const loginScreen = document.getElementById('loginScreen');
const mainContent = document.getElementById('mainContent');
const enterButton = document.getElementById('enterButton');
const fallingHearts = document.getElementById('fallingHearts');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const repeatBtn = document.getElementById('repeatBtn');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progress');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const albumRotation = document.getElementById('albumRotation');
const lyricsContainer = document.getElementById('lyricsContainer');
const lyricLines = document.querySelectorAll('.lyric-line');
const typedMessage = document.getElementById('typedMessage');
const loveButton = document.getElementById('loveButton');
const prevPhoto = document.getElementById('prevPhoto');
const nextPhoto = document.getElementById('nextPhoto');
const photoContainer = document.getElementById('photoContainer');
const photoCounter = document.getElementById('photoCounter');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');
const shareBtn = document.getElementById('shareBtn');
const saveBtn = document.getElementById('saveBtn');
const printBtn = document.getElementById('printBtn');
const audioPlayer = document.getElementById('audioPlayer');

// Love Message Text
const loveMessage = `إلى أغلى الناس، إلى حبيبتي أمل 💕

منذ لحظة لقياكِ، عرفتُ أنكِ كل الدنيا بالنسبة لي.
أنتِ نبض قلبي، وأنتِ سر ابتسامتي.
كل لحظة معكِ هي أجمل هدية أتلقاها.
أحبكِ حباً لا ينتهي، وأتمنى أن أكون بجانبكِ إلى الأبد.

مع كل نبضة، أحبكِ أكثر.
أنتِ أجمل ما حدث لي في هذه الحياة.
امولتي... أحبكِ`;

// ========================================
// Initialize Functions
// ========================================

// Create falling hearts
function createHeartElement() {
    const colors = ['#FF1B6B', '#FF6B6B', '#FF1493', '#FFD700', '#FF0080', '#E100FF', '#FF4E50'];
    const col1 = colors[Math.floor(Math.random() * colors.length)];
    const col2 = colors[Math.floor(Math.random() * colors.length)];
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const linearGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    const gid = 'hg' + Math.random().toString(36).slice(2);
    linearGradient.setAttribute('id', gid);
    linearGradient.setAttribute('x1', '0%');
    linearGradient.setAttribute('y1', '0%');
    linearGradient.setAttribute('x2', '100%');
    linearGradient.setAttribute('y2', '100%');
    
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', col1);
    linearGradient.appendChild(stop1);
    
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', col2);
    linearGradient.appendChild(stop2);
    
    defs.appendChild(linearGradient);
    svg.appendChild(defs);
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M50 88.9L16.7 55.6C7.2 46.1 7.2 30.9 16.7 21.4 26.2 11.9 41.4 11.9 50.9 21.4L50 22.3 49.1 21.4C58.6 11.9 73.8 11.9 83.3 21.4 92.8 30.9 92.8 46.1 83.3 55.6L50 88.9z');
    path.setAttribute('fill', 'url(#' + gid + ')');
    svg.appendChild(path);
    
    return svg;
}

function setupHeart(heart, size) {
    heart.className = 'heart';
    heart.style.width = size + 'px';
    heart.style.height = size + 'px';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    heart.style.opacity = Math.random() * 0.4 + 0.2;
}

function createFallingHearts() {
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            const size = Math.random() * 18 + 12;
            setupHeart(heart, size);
            heart.appendChild(createHeartElement());
            fallingHearts.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
                createSingleHeart();
            }, 7000);
        }, i * 200);
    }
}

function createSingleHeart() {
    const heart = document.createElement('div');
    const size = Math.random() * 18 + 12;
    setupHeart(heart, size);
    heart.appendChild(createHeartElement());
    fallingHearts.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
        createSingleHeart();
    }, 7000);
}

// Enter button click handler
enterButton.addEventListener('click', () => {
    loginScreen.classList.add('hidden');
    setTimeout(() => {
        loginScreen.style.display = 'none';
        mainContent.classList.add('visible');
        
        // Start the typing effect after entering
        setTimeout(startTypingEffect, 500);
        
        // Start love duration counter
        updateLoveDuration();
        setInterval(updateLoveDuration, 1000);
        
        // Start auto-sliding photos
        startPhotoSlider();
    }, 800);
});

// ========================================
// Music Player Functions
// ========================================

playBtn.addEventListener('click', togglePlay);

function togglePlay() {
    isPlaying = !isPlaying;
    if (isPlaying) {
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        albumRotation.classList.add('playing');
        
        // Try to play the audio
        const playPromise = audioPlayer.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Audio playback failed:", error);
                alert("تعذر تشغيل الصوت: " + error.message + "\nحاول تفتح الملف باستخدام Live Server بدلاً من الفتح المباشر");
                isPlaying = false;
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
                albumRotation.classList.remove('playing');
            });
        }
        
        // Start lyrics sync
        startLyricsSync();
        
        // Start progress update
        startProgressUpdate();
    } else {
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        albumRotation.classList.remove('playing');
        audioPlayer.pause();
    }
}

let progressInterval;

function startProgressUpdate() {
    clearInterval(progressInterval);
    progressInterval = setInterval(() => {
        if (audioPlayer.duration) {
            const currentTime = audioPlayer.currentTime;
            const duration = audioPlayer.duration;
            const progressPercent = (currentTime / duration) * 100;
            progressFill.style.width = progressPercent + '%';
            
            // Update time display
            const minutes = Math.floor(currentTime / 60);
            const seconds = Math.floor(currentTime % 60);
            currentTimeEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }, 1000);
}

prevBtn.addEventListener('click', () => {
    audioPlayer.currentTime = 0;
    updateProgress();
});

nextBtn.addEventListener('click', () => {
    audioPlayer.currentTime = 0;
    updateProgress();
});

repeatBtn.addEventListener('click', () => {
    repeatBtn.classList.toggle('active');
    audioPlayer.loop = !audioPlayer.loop;
});

function updateProgress() {
    if (audioPlayer.duration) {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;
        const progressPercent = (currentTime / duration) * 100;
        progressFill.style.width = progressPercent + '%';
    }
}

// Progress bar click
progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    audioPlayer.currentTime = clickPosition * audioPlayer.duration;
    updateProgress();
});

// Audio ended event
audioPlayer.addEventListener('ended', () => {
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    albumRotation.classList.remove('playing');
    isPlaying = false;
});

// Audio loaded metadata
audioPlayer.addEventListener('loadedmetadata', () => {
    const duration = audioPlayer.duration;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    durationEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});

// ========================================
// تزامن الكلمات مع الأغنية - Improved Lyrics Sync
// ========================================

// إخفاء كل الكلمات أولاً
lyricLines.forEach(line => {
    line.style.display = 'none';
});

// إضافة رسالة المقدمة الموسيقية
const introMessage = document.createElement('div');
introMessage.className = 'intro-message';
introMessage.innerHTML = '🎵 مقدمة موسيقية... انتظر قليلاً 🎵';
introMessage.style.cssText = 'text-align: center; color: #FFD700; font-size: 18px; margin: 20px 0;';
lyricsContainer.insertBefore(introMessage, lyricLines[0]);

// تحديث الكلمات حسب وقت الأغنية
function startLyricsSync() {
    audioPlayer.addEventListener('timeupdate', function() {
        const currentTime = audioPlayer.currentTime;
        
        // إخفاء رسالة المقدمة بعد 7 ثواني
        if (introMessage && currentTime > 25) {
            introMessage.style.display = 'none';
        }
        
        // إظهار الكلمات من 25 ثانية
        if (currentTime >= 25) {
            lyricLines.forEach(line => {
                const lineTime = parseFloat(line.dataset.time);
                
                // عرض كل كلمة لمدة 3 ثواني (من وقتها حتى وقتها +3)
                if (currentTime >= lineTime && currentTime < lineTime + 3) {
                    line.style.display = 'block';
                    line.style.opacity = '1';
                    line.classList.add('active-lyric');
                } else {
                    line.style.display = 'none';
                    line.classList.remove('active-lyric');
                }
            });
        }
    });
    
    // عند بداية الأغنية
    audioPlayer.addEventListener('play', function() {
        if (audioPlayer.currentTime < 7) {
            introMessage.style.display = 'block';
        }
    });
}

// ========================================
// Typing Effect for Love Message
// ========================================

function startTypingEffect() {
    if (messageIndex < loveMessage.length) {
        typedMessage.textContent += loveMessage.charAt(messageIndex);
        messageIndex++;
        setTimeout(startTypingEffect, 80);
    }
}

// Love button click handler (now handled in Page Navigation below)

closePopup.addEventListener('click', () => {
    popup.classList.remove('visible');
});

popup.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.classList.remove('visible');
    }
});

// ========================================
// Photo Slider Functions
// ========================================

function updatePhotoSlider() {
    photoContainer.style.transform = `translateX(-${currentPhoto * 100}%)`;
    photoCounter.textContent = `${currentPhoto + 1} / 5`;
}

prevPhoto.addEventListener('click', () => {
    currentPhoto--;
    if (currentPhoto < 0) {
        currentPhoto = 4;
    }
    updatePhotoSlider();
});

nextPhoto.addEventListener('click', () => {
    currentPhoto++;
    if (currentPhoto > 4) {
        currentPhoto = 0;
    }
    updatePhotoSlider();
});

function startPhotoSlider() {
    setInterval(() => {
        currentPhoto++;
        if (currentPhoto > 4) {
            currentPhoto = 0;
        }
        updatePhotoSlider();
    }, 5000);
}

// ========================================
// Love Duration Counter
// ========================================

function updateLoveDuration() {
    const now = new Date();
    const diff = now - startDate;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

// ========================================
// Action Buttons
// ========================================

shareBtn.addEventListener('click', () => {
    if (navigator.share) {
        navigator.share({
            title: 'هدية حب لـ أمل',
            text: 'صنع بكل حب لـ أمل 💕',
            url: window.location.href
        });
    } else {
        alert('تم نسخ الرابط! شاركه مع من تحب');
    }
});

saveBtn.addEventListener('click', () => {
    alert('لحفظ الصفحة: Ctrl+S أو Command+S');
});

printBtn.addEventListener('click', () => {
    window.print();
});

// ========================================
// Page Navigation System
// ========================================

let currentPage = 1;
const totalPages = 8;
const pages = document.querySelectorAll('.page');
const pageDots = document.getElementById('pageDots');

// Build page dots
for (let i = 1; i <= totalPages; i++) {
    const dot = document.createElement('div');
    dot.className = 'page-dot' + (i === 1 ? ' active' : '');
    dot.dataset.page = i;
    dot.addEventListener('click', () => goToPage(i));
    pageDots.appendChild(dot);
}

function goToPage(num) {
    if (num < 1 || num > totalPages) return;
    currentPage = num;
    pages.forEach(p => p.classList.remove('active'));
    document.querySelector(`.page[data-page="${num}"]`).classList.add('active');
    document.querySelectorAll('.page-dot').forEach(d => {
        d.classList.toggle('active', parseInt(d.dataset.page) === num);
    });
    document.querySelector('.page-content').scrollTop = 0;
}

// Next/Prev buttons
document.querySelectorAll('.next-page').forEach(btn => {
    btn.addEventListener('click', () => goToPage(currentPage + 1));
});

document.querySelectorAll('.prev-page').forEach(btn => {
    btn.addEventListener('click', () => goToPage(currentPage - 1));
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') goToPage(currentPage - 1);
    if (e.key === 'ArrowLeft') goToPage(currentPage + 1);
});

// Love button: show popup then go to next page
loveButton.addEventListener('click', () => {
    popup.classList.add('visible');
    closePopup.addEventListener('click', () => {
        popup.classList.remove('visible');
        setTimeout(() => goToPage(currentPage + 1), 300);
    }, { once: true });
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.remove('visible');
            setTimeout(() => goToPage(currentPage + 1), 300);
        }
    }, { once: true });
});

// ========================================
// Initialize on Page Load
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    createFallingHearts();
});

// ========================================
// Secret Locked Message (#9) - Custom Date Picker
// ========================================

const SECRET_DATE = '2026-04-01';
const CURRENT_YEAR = new Date().getFullYear();

const monthsData = [
    { name: 'يناير', icon: '❄️', num: 1 },
    { name: 'فبراير', icon: '💨', num: 2 },
    { name: 'مارس', icon: '🌸', num: 3 },
    { name: 'أبريل', icon: '🌷', num: 4 },
    { name: 'مايو', icon: '🌺', num: 5 },
    { name: 'يونيو', icon: '☀️', num: 6 },
    { name: 'يوليو', icon: '🔥', num: 7 },
    { name: 'أغسطس', icon: '🏖️', num: 8 },
    { name: 'سبتمبر', icon: '🍂', num: 9 },
    { name: 'أكتوبر', icon: '🎃', num: 10 },
    { name: 'نوفمبر', icon: '🍁', num: 11 },
    { name: 'ديسمبر', icon: '❄️', num: 12 }
];

let selectedYear = null;
let selectedMonth = null;
let selectedDay = null;

const lockIcon = document.getElementById('lockIcon');
const secretHint = document.getElementById('secretHint');
const stepYear = document.getElementById('stepYear');
const stepMonth = document.getElementById('stepMonth');
const stepDay = document.getElementById('stepDay');
const yearsGrid = document.getElementById('yearsGrid');
const monthsGrid = document.getElementById('monthsGrid');
const daysGrid = document.getElementById('daysGrid');
const selectedDateDisplay = document.getElementById('selectedDateDisplay');
const selectedDateValue = document.getElementById('selectedDateValue');
const secretUnlockBtn = document.getElementById('secretUnlockBtn');
const secretError = document.getElementById('secretError');
const secretMessage = document.getElementById('secretMessage');
const secretResetBtn = document.getElementById('secretResetBtn');

// Build Year Grid
function buildYearsGrid() {
    yearsGrid.innerHTML = '';
    for (let year = 1950; year <= CURRENT_YEAR; year++) {
        const btn = document.createElement('button');
        btn.className = 'year-btn';
        btn.textContent = year;
        btn.dataset.year = year;
        btn.addEventListener('click', () => selectYear(year));
        yearsGrid.appendChild(btn);
    }
    // Auto-scroll to recent years
    yearsGrid.scrollTop = yearsGrid.scrollHeight;
}

// Build Month Grid
function buildMonthsGrid() {
    monthsGrid.innerHTML = '';
    monthsData.forEach(m => {
        const btn = document.createElement('button');
        btn.className = 'month-btn';
        btn.innerHTML = `<span class="month-icon">${m.icon}</span>${m.name}`;
        btn.dataset.month = m.num;
        btn.addEventListener('click', () => selectMonth(m.num));
        monthsGrid.appendChild(btn);
    });
}

// Build Day Grid
function buildDaysGrid() {
    daysGrid.innerHTML = '';
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    const firstDay = new Date(selectedYear, selectedMonth - 1, 1).getDay(); // 0=Sun
    
    // Empty cells for alignment
    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement('button');
        empty.className = 'day-btn empty';
        empty.disabled = true;
        daysGrid.appendChild(empty);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
        const btn = document.createElement('button');
        btn.className = 'day-btn';
        btn.textContent = day;
        btn.dataset.day = day;
        btn.addEventListener('click', () => selectDay(day));
        daysGrid.appendChild(btn);
    }
}

function selectYear(year) {
    selectedYear = year;
    document.querySelectorAll('.year-btn').forEach(b => b.classList.remove('selected'));
    document.querySelector(`.year-btn[data-year="${year}"]`).classList.add('selected');
    
    stepYear.style.display = 'none';
    stepMonth.style.display = 'block';
    secretHint.textContent = `السنة: ${year} - اختر الشهر`;
}

function selectMonth(month) {
    selectedMonth = month;
    document.querySelectorAll('.month-btn').forEach(b => b.classList.remove('selected'));
    document.querySelector(`.month-btn[data-month="${month}"]`).classList.add('selected');
    
    stepMonth.style.display = 'none';
    buildDaysGrid();
    stepDay.style.display = 'block';
    const m = monthsData.find(m => m.num === month);
    secretHint.textContent = `${selectedYear} / ${m.name} - اختر اليوم`;
}

function selectDay(day) {
    selectedDay = day;
    document.querySelectorAll('.day-btn').forEach(b => b.classList.remove('selected'));
    document.querySelector(`.day-btn[data-day="${day}"]`).classList.add('selected');
    
    const m = monthsData.find(m => m.num === selectedMonth);
    const dateStr = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    selectedDateValue.textContent = `${selectedYear} / ${m.name} / ${day}`;
    selectedDateDisplay.style.display = 'flex';
    
    stepDay.style.display = 'none';
    secretUnlockBtn.style.display = 'inline-block';
    secretHint.textContent = `📅 ${selectedYear} / ${m.name} / ${day}`;
}

secretUnlockBtn.addEventListener('click', () => {
    const dateStr = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
    
    if (dateStr === SECRET_DATE) {
        secretError.style.display = 'none';
        secretMessage.style.display = 'block';
        lockIcon.textContent = '🔓';
        secretUnlockBtn.style.display = 'none';
        selectedDateDisplay.style.display = 'none';
        secretHint.textContent = '✅ تم فتح الرسالة السرية';
        secretResetBtn.style.display = 'inline-block';
        document.querySelectorAll('.date-picker-step').forEach(s => s.style.display = 'none');
    } else {
        secretError.style.display = 'block';
        setTimeout(() => {
            secretError.style.display = 'none';
        }, 2500);
    }
});

secretResetBtn.addEventListener('click', resetDatePicker);

function resetDatePicker() {
    selectedYear = null;
    selectedMonth = null;
    selectedDay = null;
    
    lockIcon.textContent = '🔒';
    secretHint.textContent = 'اختر تاريخ بداية حبنا';
    secretError.style.display = 'none';
    secretMessage.style.display = 'none';
    secretUnlockBtn.style.display = 'none';
    secretResetBtn.style.display = 'none';
    selectedDateDisplay.style.display = 'none';
    
    document.querySelectorAll('.date-picker-step').forEach(s => s.style.display = 'none');
    stepYear.style.display = 'block';
    
    document.querySelectorAll('.year-btn, .month-btn, .day-btn').forEach(b => b.classList.remove('selected'));
}

// Initialize
buildYearsGrid();
buildMonthsGrid();

// ========================================
// Romantic Candle (#3)
// ========================================

const candleFlame = document.getElementById('candleFlame');
const candleGlow = document.getElementById('candleGlow');
let candleLit = true;

candleFlame.addEventListener('click', toggleCandle);

function toggleCandle() {
    candleLit = !candleLit;
    if (candleLit) {
        candleFlame.style.display = 'block';
        candleGlow.style.display = 'block';
    } else {
        candleFlame.style.display = 'none';
        candleGlow.style.display = 'none';
    }
}

// ========================================
// Quiz Game (#7)
// ========================================

const quizData = [
    {
        question: 'ما هو لوني المفضل؟',
        options: ['أحمر', 'أزرق', 'أسود', 'أخضر'],
        answer: 0
    },
    {
        question: 'ما هي هديتي المفضلة؟',
        options: ['ورود', 'ساعة', 'كتاب', 'عطر'],
        answer: 0
    },
    {
        question: 'أي وقت في اليوم أحبه أكثر؟',
        options: ['الصباح الباكر', 'الغروب', 'منتصف الليل', 'بعد الظهر'],
        answer: 1
    },
    {
        question: 'ما هو طعامي المفضل؟',
        options: ['بيتزا', 'سمك', 'معكرونة', 'شاورما'],
        answer: 2
    },
    {
        question: 'أي شيء يخطر ببالي عندما أقول "حب"؟',
        options: ['أنتِ', 'السفر', 'الموسيقى', 'العائلة'],
        answer: 0
    }
];

let currentQuestion = 0;
let quizScore = 0;
let answered = false;

const quizIntro = document.getElementById('quizIntro');
const quizGame = document.getElementById('quizGame');
const quizResult = document.getElementById('quizResult');
const quizQuestion = document.getElementById('quizQuestion');
const quizOptions = document.getElementById('quizOptions');
const quizProgress = document.getElementById('quizProgress');
const quizScoreEl = document.getElementById('quizScore');
const resultNumber = document.getElementById('resultNumber');
const resultTitle = document.getElementById('resultTitle');
const resultMessage = document.getElementById('resultMessage');
const resultIcon = document.getElementById('resultIcon');

document.getElementById('quizStartBtn').addEventListener('click', startQuiz);
document.getElementById('quizRetryBtn').addEventListener('click', resetQuiz);

function startQuiz() {
    quizIntro.style.display = 'none';
    quizGame.style.display = 'block';
    quizResult.style.display = 'none';
    currentQuestion = 0;
    quizScore = 0;
    showQuestion();
}

function showQuestion() {
    answered = false;
    const q = quizData[currentQuestion];
    quizQuestion.textContent = q.question;
    quizProgress.textContent = `${currentQuestion + 1} / ${quizData.length}`;
    quizScoreEl.textContent = `✅ ${quizScore}`;
    
    quizOptions.innerHTML = '';
    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.textContent = option;
        btn.addEventListener('click', () => selectAnswer(index));
        quizOptions.appendChild(btn);
    });
}

function selectAnswer(index) {
    if (answered) return;
    answered = true;
    
    const q = quizData[currentQuestion];
    const options = document.querySelectorAll('.quiz-option');
    
    options.forEach((opt, i) => {
        opt.disabled = true;
        if (i === q.answer) opt.classList.add('correct');
        if (i === index && index !== q.answer) opt.classList.add('wrong');
    });
    
    if (index === q.answer) quizScore++;
    
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1200);
}

function showResult() {
    quizGame.style.display = 'none';
    quizResult.style.display = 'block';
    
    const percentage = Math.round((quizScore / quizData.length) * 100);
    resultNumber.textContent = `${percentage}%`;
    
    if (percentage === 100) {
        resultTitle.textContent = '💯 حب حقيقي!';
        resultMessage.textContent = 'تعرفني تماماً! أنتِ نصفي الثاني بكل معنى الكلمة. حبنا مكتوب بالنجوم 💫';
        resultIcon.textContent = '👑';
    } else if (percentage >= 80) {
        resultTitle.textContent = '💖 مذهلة!';
        resultMessage.textContent = 'تعرفيني بشكل رائع! لا يزال هناك المزيد لتكتشفيه معًا 💕';
        resultIcon.textContent = '🏆';
    } else if (percentage >= 60) {
        resultTitle.textContent = '💗 جيد جداً!';
        resultMessage.textContent = 'تعرفيني نوعاً ما، لكن رحلة حبنا ما زالت طويلة لنملأها بالذكريات 🌹';
        resultIcon.textContent = '🌟';
    } else if (percentage >= 40) {
        resultTitle.textContent = '💛 بداية جميلة';
        resultMessage.textContent = 'لا زلنا في بداية المشوار، كل يوم سنعرف أكثر عن بعضنا 💑';
        resultIcon.textContent = '🌱';
    } else {
        resultTitle.textContent = '💔 بداية الطريق';
        resultMessage.textContent = 'لا تقلقي، أجمل ما في الحب أننا نتعلم بعضنا كل يوم. دعينا نبدأ الرحلة معاً 💞';
        resultIcon.textContent = '🌈';
    }
}

function resetQuiz() {
    quizIntro.style.display = 'block';
    quizGame.style.display = 'none';
    quizResult.style.display = 'none';
    currentQuestion = 0;
    quizScore = 0;
}
