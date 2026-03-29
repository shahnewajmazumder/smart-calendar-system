
        // Global variables
        let events = [];
        let userEvents = [];
        let currentDate = new Date();
        let selectedDate = "";
        let editingEventId = null;
        let isLoggedIn = false;
        let currentUser = null;

        // Indian Festivals and Events Data
       const indianFestivals = [];

let id = 1;

// Generate combined Indian and World festivals for 2024-2050
for (let year = 2024; year <= 2050; year++) {
    // Fixed date festivals array - COMBINED INDIAN & WORLD
    const allFestivals = [
        // ========== INDIAN NATIONAL HOLIDAYS ==========
        { title: "Republic Day", date: `${year}-01-26`, category: "national", priority: "high", description: "Celebration of the Constitution of India. Grand parade at Kartavya Path, New Delhi.", location: "Nationwide, main event in New Delhi", photo: "https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=500&h=300&fit=crop" },
        { title: "Independence Day", date: `${year}-08-15`, category: "national", priority: "high", description: "Celebration of India's independence from British rule.", location: "Nationwide, main event in New Delhi", photo: "https://images.unsplash.com/photo-1592678120596-8ce0e81a3d2a?w=500&h=300&fit=crop" },
        { title: "Gandhi Jayanti", date: `${year}-10-02`, category: "national", priority: "high", description: "Birth anniversary of Mahatma Gandhi, Father of the Nation.", location: "Nationwide", photo: "https://images.unsplash.com/photo-1603889330166-5b1547ccf8c3?w=500&h=300&fit=crop" },
        
        // ========== INDIAN RELIGIOUS FESTIVALS ==========
        { title: "Makar Sankranti", date: `${year}-01-14`, category: "religious", priority: "medium", description: "Harvest festival celebrating sun's northward journey", location: "Nationwide", photo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop" },
        { title: "Vasant Panchami", date: `${year}-01-29`, category: "religious", priority: "medium", description: "Festival dedicated to Goddess Saraswati", location: "Nationwide", photo: "https://images.unsplash.com/photo-1580476265270-9d4a1905d2b4?w=500&h=300&fit=crop" },
        { title: "Maha Shivratri", date: `${year}-03-08`, category: "religious", priority: "medium", description: "Great night of Lord Shiva", location: "Nationwide", photo: "https://images.unsplash.com/photo-1580476265270-9d4a1905d2b2?w=500&h=300&fit=crop" },
        { title: "Ram Navami", date: `${year}-04-17`, category: "religious", priority: "medium", description: "Birth anniversary of Lord Rama", location: "Nationwide", photo: "https://images.unsplash.com/photo-1631661455545-6ccda71bf56a?w=500&h=300&fit=crop" },
        { title: "Raksha Bandhan", date: `${year}-08-19`, category: "religious", priority: "medium", description: "Celebrating bond between brothers and sisters", location: "Nationwide", photo: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=500&h=300&fit=crop" },
        { title: "Janmashtami", date: `${year}-08-26`, category: "religious", priority: "high", description: "Birth anniversary of Lord Krishna", location: "Nationwide", photo: "https://images.unsplash.com/photo-1596464716127-f2a82984de31?w=500&h=300&fit=crop" },
        { title: "Ganesh Chaturthi", date: `${year}-09-07`, category: "religious", priority: "high", description: "Celebration of Lord Ganesha's birth", location: "Nationwide", photo: "https://images.unsplash.com/photo-1596464716127-f2a82984de32?w=500&h=300&fit=crop" },
        { title: "Guru Nanak Jayanti", date: `${year}-11-15`, category: "religious", priority: "medium", description: "Birth anniversary of Guru Nanak Dev Ji", location: "Nationwide", photo: "https://images.unsplash.com/photo-1573459310597-7efd8c7687c2?w=500&h=300&fit=crop" },
        
        // ========== INDIAN CULTURAL EVENTS ==========
        { title: "Republic Day Parade", date: `${year}-01-26`, category: "cultural", priority: "high", description: "Grand military and cultural parade in New Delhi", location: "New Delhi", photo: "https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=500&h=300&fit=crop" },
        { title: "Beating Retreat Ceremony", date: `${year}-01-29`, category: "cultural", priority: "medium", description: "Ceremony marking the end of Republic Day celebrations", location: "New Delhi", photo: "https://images.unsplash.com/photo-1579546929662-711aa81148c0?w=500&h=300&fit=crop" },
        { title: "Teacher's Day", date: `${year}-09-05`, category: "cultural", priority: "low", description: "Honoring teachers and their contributions", location: "India", photo: "https://images.unsplash.com/photo-1584697964358-3e14ca57658b?w=500&h=300&fit=crop" },
        { title: "Children's Day", date: `${year}-11-14`, category: "cultural", priority: "low", description: "Celebrating childhood and children", location: "India", photo: "https://images.unsplash.com/photo-1516627145497-ae69578cfc06?w=500&h=300&fit=crop" },
        
        // ========== INTERNATIONAL HOLIDAYS ==========
        { title: "New Year's Day", date: `${year}-01-01`, category: "international", priority: "high", description: "Celebration of the new year", location: "Worldwide", photo: "https://images.unsplash.com/photo-1572883454114-5c0033c8c394?w=500&h=300&fit=crop" },
        { title: "Valentine's Day", date: `${year}-02-14`, category: "cultural", priority: "medium", description: "Celebration of love and romance", location: "Worldwide", photo: "https://images.unsplash.com/photo-1513395939060-97ed68adc03f?w=500&h=300&fit=crop" },
        { title: "International Women's Day", date: `${year}-03-08`, category: "international", priority: "medium", description: "Celebrating women's achievements and rights", location: "Worldwide", photo: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?w=500&h=300&fit=crop" },
        { title: "April Fools' Day", date: `${year}-04-01`, category: "cultural", priority: "low", description: "Day for playing practical jokes", location: "Worldwide", photo: "https://images.unsplash.com/photo-1612170153139-6f881ff067b0?w=500&h=300&fit=crop" },
        { title: "Labour Day", date: `${year}-05-01`, category: "international", priority: "medium", description: "Celebrating workers' rights and achievements", location: "Worldwide", photo: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=500&h=300&fit=crop" },
        { title: "Halloween", date: `${year}-10-31`, category: "cultural", priority: "medium", description: "Celebration with costumes and trick-or-treating", location: "Worldwide", photo: "https://images.unsplash.com/photo-1508361001413-7a9dca21d08a?w=500&h=300&fit=crop" },
        { title: "Christmas Day", date: `${year}-12-25`, category: "international", priority: "high", description: "Celebration of the birth of Jesus Christ", location: "Worldwide", photo: "https://images.unsplash.com/photo-1543616991-3b7c5528d0ac?w=500&h=300&fit=crop" },
        { title: "Boxing Day", date: `${year}-12-26`, category: "international", priority: "medium", description: "Traditional gift-giving day after Christmas", location: "Commonwealth countries", photo: "https://images.unsplash.com/photo-1574359411659-619d6d7702d1?w=500&h=300&fit=crop" },
        
        // ========== USA HOLIDAYS ==========
        { title: "Martin Luther King Jr. Day", date: `${year}-01-15`, category: "national", priority: "medium", description: "Honoring civil rights leader Martin Luther King Jr.", location: "United States", photo: "https://images.unsplash.com/photo-1611264329912-8a5aeb6b7a94?w=500&h=300&fit=crop" },
        { title: "President's Day", date: `${year}-02-19`, category: "national", priority: "medium", description: "Honoring all US presidents", location: "United States", photo: "https://images.unsplash.com/photo-1580130775567-2498f16ed4d1?w=500&h=300&fit=crop" },
        { title: "Memorial Day", date: `${year}-05-27`, category: "national", priority: "high", description: "Honoring military personnel who died in service", location: "United States", photo: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=500&h=300&fit=crop" },
        { title: "Independence Day (USA)", date: `${year}-07-04`, category: "national", priority: "high", description: "Celebration of American independence", location: "United States", photo: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=500&h=300&fit=crop" },
        { title: "Labor Day (USA)", date: `${year}-09-02`, category: "national", priority: "medium", description: "Celebrating American workers", location: "United States", photo: "https://images.unsplash.com/photo-1551135040-4b1f3b5b5b0a?w=500&h=300&fit=crop" },
        { title: "Thanksgiving", date: `${year}-11-28`, category: "national", priority: "high", description: "Harvest festival and family gathering", location: "United States, Canada", photo: "https://images.unsplash.com/photo-1606914469664-4d13d9bd8a6a?w=500&h=300&fit=crop" },
        { title: "Veterans Day", date: `${year}-11-11`, category: "national", priority: "medium", description: "Honoring military veterans", location: "United States", photo: "https://images.unsplash.com/photo-1541829070764-84a7d5b5c5c5?w=500&h=300&fit=crop" },
        
        // ========== EUROPEAN HOLIDAYS ==========
        { title: "Bastille Day", date: `${year}-07-14`, category: "national", priority: "high", description: "French National Day celebrating the French Revolution", location: "France", photo: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=500&h=300&fit=crop" },
        { title: "Canada Day", date: `${year}-07-01`, category: "national", priority: "high", description: "Celebration of Canadian Confederation", location: "Canada", photo: "https://images.unsplash.com/photo-1519832979-6fa011b87667?w=500&h=300&fit=crop" },
        { title: "Australia Day", date: `${year}-01-26`, category: "national", priority: "high", description: "National day of Australia", location: "Australia", photo: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop" },
        { title: "ANZAC Day", date: `${year}-04-25`, category: "national", priority: "high", description: "Remembering military personnel from Australia and New Zealand", location: "Australia, New Zealand", photo: "https://images.unsplash.com/photo-1546260359-22a7b53d43d8?w=500&h=300&fit=crop" },
        
        // ========== ASIAN HOLIDAYS ==========
        { title: "Chinese New Year", date: `${year}-01-25`, category: "cultural", priority: "high", description: "Lunar New Year celebration", location: "China, Worldwide", photo: "https://images.unsplash.com/photo-1547592188-83508c2d5e16?w=500&h=300&fit=crop" },
        { title: "National Day (China)", date: `${year}-10-01`, category: "national", priority: "high", description: "Celebrating the founding of People's Republic of China", location: "China", photo: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=500&h=300&fit=crop" },
        { title: "Chuseok", date: `${year}-09-15`, category: "cultural", priority: "high", description: "Korean harvest festival", location: "South Korea", photo: "https://images.unsplash.com/photo-1565348883025-4f96d7f169b1?w=500&h=300&fit=crop" },
        
        // ========== MIDDLE EASTERN HOLIDAYS ==========
        { title: "Nowruz", date: `${year}-03-21`, category: "cultural", priority: "high", description: "Persian New Year celebrating spring", location: "Iran, Central Asia", photo: "https://images.unsplash.com/photo-1643318378425-8560b7c6d0e9?w=500&h=300&fit=crop" },
        
        // ========== UN INTERNATIONAL DAYS ==========
        { title: "World Health Day", date: `${year}-04-07`, category: "international", priority: "low", description: "Global health awareness day", location: "Worldwide", photo: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop" },
        { title: "Earth Day", date: `${year}-04-22`, category: "international", priority: "medium", description: "Support for environmental protection", location: "Worldwide", photo: "https://images.unsplash.com/photo-1569163139394-de44cb2c8cb8?w=500&h=300&fit=crop" },
        { title: "International Yoga Day", date: `${year}-06-21`, category: "international", priority: "medium", description: "Celebration of yoga and its benefits", location: "Worldwide", photo: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=300&fit=crop" },
        { title: "International Peace Day", date: `${year}-09-21`, category: "international", priority: "medium", description: "Devoted to strengthening peace ideals", location: "Worldwide", photo: "https://images.unsplash.com/photo-1507838153414-b4b71375a4b5?w=500&h=300&fit=crop" },
        { title: "Human Rights Day", date: `${year}-12-10`, category: "international", priority: "medium", description: "Commemorating the Universal Declaration of Human Rights", location: "Worldwide", photo: "https://images.unsplash.com/photo-1580130775567-2498f16ed4d2?w=500&h=300&fit=crop" }
    ];

    // Add fixed date festivals
    allFestivals.forEach(festival => {
        indianFestivals.push({
            id: id++,
            title: festival.title,
            date: festival.date,
            endDate: festival.date,
            category: festival.category,
            priority: festival.priority,
            description: festival.description,
            location: festival.location,
            photo: festival.photo
        });
    });

    // ========== MOVING FESTIVALS CALCULATION ==========
    // Indian moving festivals
    const holiDate = new Date(year, 2, 25 - ((year - 2024) % 3));
    const diwaliDate = new Date(year, 9, 23 + ((year - 2024) % 15));
    const dussehraDate = new Date(diwaliDate);
    dussehraDate.setDate(diwaliDate.getDate() - 20);

    // International moving festivals
    const easterDate = new Date(year, 2, 31 - ((year - 2024) % 7));
    const goodFridayDate = new Date(easterDate);
    goodFridayDate.setDate(easterDate.getDate() - 2);
    
    const ramadanStart = new Date(year, 2, 22 + ((year - 2024) % 11));
    const eidFitrDate = new Date(ramadanStart);
    eidFitrDate.setDate(ramadanStart.getDate() + 29);
    
    const eidAdhaDate = new Date(eidFitrDate);
    eidAdhaDate.setDate(eidFitrDate.getDate() + 70);

    const movingFestivals = [
        // Indian moving festivals
        { title: "Holi", date: holiDate, category: "religious", priority: "high", description: "Festival of colors celebrating victory of good over evil", location: "Nationwide", photo: "https://images.unsplash.com/photo-1548869207-216df6c2dcc4?w=500&h=300&fit=crop" },
        { title: "Diwali", date: diwaliDate, category: "religious", priority: "high", description: "Festival of lights celebrating victory of light over darkness", location: "Nationwide", photo: "https://images.unsplash.com/photo-1604608944430-952bdc0d4ce5?w=500&h=300&fit=crop" },
        { title: "Dussehra", date: dussehraDate, category: "religious", priority: "high", description: "Victory of Lord Rama over Ravana", location: "Nationwide", photo: "https://images.unsplash.com/photo-1601992688411-1dc47113e275?w=500&h=300&fit=crop" },
        
        // International moving festivals
        { title: "Good Friday", date: goodFridayDate, category: "religious", priority: "high", description: "Commemoration of crucifixion of Jesus Christ", location: "Christian countries", photo: "https://images.unsplash.com/photo-1511300636408-a63a89df3482?w=500&h=300&fit=crop" },
        { title: "Easter Sunday", date: easterDate, category: "religious", priority: "high", description: "Celebration of resurrection of Jesus Christ", location: "Christian countries", photo: "https://images.unsplash.com/photo-1551276521-072b0b9b399f?w=500&h=300&fit=crop" },
        { title: "Ramadan Starts", date: ramadanStart, category: "religious", priority: "high", description: "Beginning of Islamic holy month of fasting", location: "Muslim countries", photo: "https://images.unsplash.com/photo-1584820927493-c4c3464ec0c3?w=500&h=300&fit=crop" },
        { title: "Eid al-Fitr", date: eidFitrDate, category: "religious", priority: "high", description: "Celebration marking the end of Ramadan", location: "Muslim countries", photo: "https://images.unsplash.com/photo-1584820927493-c4c3464ec0c1?w=500&h=300&fit=crop" },
        { title: "Eid al-Adha", date: eidAdhaDate, category: "religious", priority: "high", description: "Festival of sacrifice", location: "Muslim countries", photo: "https://images.unsplash.com/photo-1584820927493-c4c3464ec0c2?w=500&h=300&fit=crop" }
    ];

    // Add moving festivals
    movingFestivals.forEach(festival => {
        const dateStr = festival.date.toISOString().split('T')[0];
        indianFestivals.push({
            id: id++,
            title: festival.title,
            date: dateStr,
            endDate: dateStr,
            category: festival.category,
            priority: festival.priority,
            description: festival.description,
            location: festival.location,
            photo: festival.photo
        });
    });

    // ========== MULTI-DAY FESTIVALS ==========
    const multiDayFestivals = [
        // Indian multi-day festivals
        { title: "Durga Puja", startDate: new Date(year, 9, 1 + (year - 2024) % 7), days: 5, category: "religious", location: "West Bengal, Nationwide", photo: "https://images.unsplash.com/photo-1601992688411-1dc47113e276?w=500&h=300&fit=crop" },
        { title: "Navratri", startDate: new Date(year, 9, 1 + (year - 2024) % 7), days: 9, category: "religious", location: "Nationwide", photo: "https://images.unsplash.com/photo-1601992688411-1dc47113e277?w=500&h=300&fit=crop" },
        { title: "Pongal", startDate: new Date(year, 0, 14), days: 4, category: "religious", location: "Tamil Nadu", photo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8c?w=500&h=300&fit=crop" },
        
        // International multi-day festivals
        { title: "Oktoberfest", startDate: new Date(year, 8, 16), days: 18, category: "cultural", location: "Munich, Germany", photo: "https://images.unsplash.com/photo-1534787238916-9ba6764fd3c6?w=500&h=300&fit=crop" },
        { title: "Rio Carnival", startDate: new Date(year, 1, 25), days: 5, category: "cultural", location: "Rio de Janeiro, Brazil", photo: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&h=300&fit=crop" }
    ];

    multiDayFestivals.forEach(festival => {
        const startDate = festival.startDate.toISOString().split('T')[0];
        const endDate = new Date(festival.startDate);
        endDate.setDate(endDate.getDate() + festival.days - 1);
        
        indianFestivals.push({
            id: id++,
            title: festival.title,
            date: startDate,
            endDate: endDate.toISOString().split('T')[0],
            category: festival.category,
            priority: "medium",
            description: `${festival.title} celebration`,
            location: festival.location,
            photo: festival.photo
        });
    });

    // ========== MAJOR SPORTS EVENTS (Every 4 years) ==========
    if (year % 4 === 0) {
        const olympicsDate = `${year}-07-15`;
        const worldCupDate = `${year}-06-14`;
        
        const quadrennialEvents = [
            { title: "Summer Olympics", date: olympicsDate, category: "sports", priority: "high", description: "International multi-sport event", location: "Various host cities", photo: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=300&fit=crop" },
            { title: "FIFA World Cup", date: worldCupDate, category: "sports", priority: "high", description: "International football championship", location: "Various host countries", photo: "https://images.unsplash.com/photo-1599669454699-248893623440?w=500&h=300&fit=crop" }
        ];
        
        quadrennialEvents.forEach(event => {
            indianFestivals.push({
                id: id++,
                title: event.title,
                date: event.date,
                endDate: `${year}-08-15`,
                category: event.category,
                priority: event.priority,
                description: event.description,
                location: event.location,
                photo: event.photo
            });
        });
    }
}

// ========== SPECIAL MAJOR EVENTS ==========
// Kumbh Mela (every 12 years)
const kumbhYears = [2025, 2037, 2049];
kumbhYears.forEach(year => {
    indianFestivals.push({
        id: id++,
        title: "Kumbh Mela",
        date: `${year}-01-15`,
        endDate: `${year}-03-15`,
        category: "religious",
        priority: "high",
        description: "Major Hindu pilgrimage and festival, one of the largest religious gatherings in the world",
        location: "Prayagraj, Haridwar, Nashik, Ujjain",
        photo: "https://images.unsplash.com/photo-1581693530355-195793b0bee3?w=500&h=300&fit=crop"
    });
});

// Cricket World Cup (every 4 years)
const cricketWorldCupYears = [2027, 2031, 2035, 2039, 2043, 2047];
cricketWorldCupYears.forEach(year => {
    indianFestivals.push({
        id: id++,
        title: "Cricket World Cup",
        date: `${year}-10-01`,
        endDate: `${year}-11-15`,
        category: "sports",
        priority: "high",
        description: "International cricket championship",
        location: "Various host countries",
        photo: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500&h=300&fit=crop"
    });
});

console.log(`Total festivals generated: ${indianFestivals.length}`);
console.log(`Covering years: 2024-2050`);
console.log(`Indian & World events combined successfully!`);

        // DOM Elements
        const calendarGrid = document.getElementById("calendarGrid");
        const currentMonthElement = document.getElementById("currentMonth");
        const eventModal = document.getElementById("eventModal");
        const detailsModal = document.getElementById("detailsModal");
        const userEventsList = document.getElementById("userEventsList");
        const upcomingEventsList = document.getElementById("upcomingEventsList");

        // Initialize application
        document.addEventListener("DOMContentLoaded", function () {
            renderCalendar();
            setupEventListeners();
            setupNavigation();
            checkLoginStatus();
            loadEventsFromStorage();
            updateDashboard();
            
            // Auto-login for demo
            autoLogin();
        });

        function autoLogin() {
            // Auto login for demo purposes
            const user = {
                id: 1,
                firstName: "Sujan Chandra",
                lastName: "Ray",
                email: "kdfgkjq11@gmail.com",
                phone: "+91 98765 43210",
                bio: "Event enthusiast and calendar organizer"
            };
            
            isLoggedIn = true;
            currentUser = user;
            
            // Update UI
            document.getElementById("userName").textContent = `${user.firstName} ${user.lastName}`;
            document.getElementById("userMenu").style.display = "flex";
            document.getElementById("loginBtn").style.display = "none";
            document.getElementById("registerBtn").style.display = "none";
            
            // Update profile
            document.getElementById("profileName").textContent = `${user.firstName} ${user.lastName}`;
            document.getElementById("profileEmail").textContent = user.email;
            
            showNotification("Welcome back, Sujan!", "success");
        }

        function setupEventListeners() {
            // Calendar navigation
            document.getElementById("prevMonth").addEventListener("click", () => {
                currentDate.setMonth(currentDate.getMonth() - 1);
                renderCalendar();
            });

            document.getElementById("nextMonth").addEventListener("click", () => {
                currentDate.setMonth(currentDate.getMonth() + 1);
                renderCalendar();
            });

            document.getElementById("todayBtn").addEventListener("click", () => {
                currentDate = new Date();
                renderCalendar();
            });

            // View options
            document.querySelectorAll(".view-btn").forEach(btn => {
                btn.addEventListener("click", function() {
                    document.querySelectorAll(".view-btn").forEach(b => b.classList.remove("active"));
                    this.classList.add("active");
                    switchView(this.getAttribute("data-view"));
                });
            });

            // Modal controls
            document.getElementById("closeModal").addEventListener("click", closeEventModal);
            document.getElementById("cancelBtn").addEventListener("click", closeEventModal);
            document.getElementById("modalCancelBtn").addEventListener("click", closeEventModal);

            // User authentication
            document.getElementById("loginBtn").addEventListener("click", showLoginPage);
            document.getElementById("registerBtn").addEventListener("click", showRegisterPage);
            document.getElementById("profileBtn").addEventListener("click", showProfilePage);
            document.getElementById("logoutBtn").addEventListener("click", logout);
            document.getElementById("backFromLogin").addEventListener("click", showDashboard);
            document.getElementById("backFromRegister").addEventListener("click", showDashboard);
            document.getElementById("goToRegister").addEventListener("click", showRegisterPage);
            document.getElementById("goToLogin").addEventListener("click", showLoginPage);

            // Forms
            document.getElementById("eventForm").addEventListener("submit", saveEvent);
            document.getElementById("modalEventForm").addEventListener("submit", saveModalEvent);
            document.getElementById("loginForm").addEventListener("submit", handleLogin);
            document.getElementById("registerForm").addEventListener("submit", handleRegister);
            document.getElementById("profileForm").addEventListener("submit", saveProfile);
            document.getElementById("photoForm").addEventListener("submit", saveProfilePhoto);
            document.getElementById("preferencesForm").addEventListener("submit", savePreferences);

            // Profile menu
            document.querySelectorAll(".profile-menu-link").forEach(link => {
                link.addEventListener("click", function(e) {
                    e.preventDefault();
                    const section = this.getAttribute("data-section");
                    showProfileSection(section);
                });
            });

            // AI Assistant
            document.getElementById("aiToggle").addEventListener("click", toggleAIChat);
            document.querySelector(".close-ai").addEventListener("click", toggleAIChat);
            document.getElementById("aiSendBtn").addEventListener("click", sendAIMessage);
            document.getElementById("aiChatInput").addEventListener("keypress", function(e) {
                if (e.key === "Enter") {
                    sendAIMessage();
                }
            });
        }

        function setupNavigation() {
            document.querySelectorAll(".nav-link").forEach(link => {
                link.addEventListener("click", function(e) {
                    e.preventDefault();
                    const page = this.getAttribute("data-page");
                    showPage(page);
                });
            });
        }

        function showPage(page) {
            // Hide all pages
            document.querySelectorAll(".page-content").forEach(p => {
                p.classList.remove("active");
            });

            // Remove active class from all nav links
            document.querySelectorAll(".nav-link").forEach(link => {
                link.classList.remove("active");
            });

            // Show selected page and set active nav link
            document.getElementById(`${page}-page`).classList.add("active");
            document.querySelector(`.nav-link[data-page="${page}"]`).classList.add("active");

            // Special handling for specific pages
            if (page === "calendar") {
                renderCalendar();
            } else if (page === "my-events") {
                loadUserEvents();
            }
        }

        function showDashboard() {
            showPage("dashboard");
        }

        function showLoginPage() {
            document.querySelectorAll(".page-content").forEach(p => {
                p.classList.remove("active");
            });
            document.getElementById("login-page").classList.add("active");
        }

        function showRegisterPage() {
            document.querySelectorAll(".page-content").forEach(p => {
                p.classList.remove("active");
            });
            document.getElementById("register-page").classList.add("active");
        }

        function showProfilePage() {
            showPage("profile");
            loadUserProfile();
        }

        function showProfileSection(section) {
            // Hide all profile sections
            document.querySelectorAll(".profile-section").forEach(s => {
                s.classList.remove("active");
            });

            // Remove active class from all profile menu links
            document.querySelectorAll(".profile-menu-link").forEach(link => {
                link.classList.remove("active");
            });

            // Show selected section and set active menu link
            document.getElementById(`${section}-section`).classList.add("active");
            document.querySelector(`.profile-menu-link[data-section="${section}"]`).classList.add("active");

            // Special handling for my events section
            if (section === "my-events") {
                loadProfileEvents();
            }
        }

        function renderCalendar() {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();

            // Update current month display
            currentMonthElement.textContent = `${currentDate.toLocaleString("default", { month: "long" })} ${year}`;

            // Clear previous calendar
            calendarGrid.innerHTML = "";

            // Get first day of month and number of days
            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            // Create empty cells for days before the first day of the month
            for (let i = 0; i < firstDay; i++) {
                const emptyDay = document.createElement("div");
                emptyDay.classList.add("calendar-day");
                calendarGrid.appendChild(emptyDay);
            }

            // Create cells for each day of the month
            const today = new Date();
            for (let day = 1; day <= daysInMonth; day++) {
                const dayElement = document.createElement("div");
                dayElement.classList.add("calendar-day");

                // Format date for this day
                const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

                // Check if this day is today
                if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                    dayElement.classList.add("today");
                }

                // Day header with number and add button
                const dayHeader = document.createElement("div");
                dayHeader.classList.add("day-header");

                const dayNumber = document.createElement("span");
                dayNumber.classList.add("day-number");
                dayNumber.textContent = day;

                const addButton = document.createElement("button");
                addButton.classList.add("add-event-btn");
                addButton.innerHTML = "<i class='fas fa-plus'></i>";
                addButton.addEventListener("click", (e) => {
                    e.stopPropagation();
                    if (isLoggedIn) {
                        openAddEventModal(dateStr);
                    } else {
                        showNotification("Please login to add events", "warning");
                        showLoginPage();
                    }
                });

                dayHeader.appendChild(dayNumber);
                dayHeader.appendChild(addButton);
                dayElement.appendChild(dayHeader);

                // Add events for this day
                const dayEvents = getEventsForDate(dateStr);

                // Show event count badge if there are events
                if (dayEvents.length > 0) {
                    const eventCount = document.createElement("div");
                    eventCount.classList.add("event-count");
                    eventCount.textContent = dayEvents.length;
                    dayElement.appendChild(eventCount);
                }

                // Check if this date has festivals
                const festivals = dayEvents.filter(event => 
                    event.category === "festival" || event.category === "national"
                );

                if (festivals.length > 0) {
                    const festivalBadge = document.createElement("div");
                    festivalBadge.classList.add("festival-badge");
                    festivalBadge.textContent = "🎉";
                    dayElement.appendChild(festivalBadge);
                }

                // Events container
                const eventsContainer = document.createElement("div");
                eventsContainer.classList.add("events-container");

                if (dayEvents.length === 0) {
                    const emptyState = document.createElement("div");
                    emptyState.classList.add("empty-state");
                    emptyState.textContent = "No events";
                    eventsContainer.appendChild(emptyState);
                } else {
                    dayEvents.forEach(event => {
                        const eventElement = document.createElement("div");
                        eventElement.classList.add("event", `event-${event.category}`);

                        const eventTitle = document.createElement("span");
                        eventTitle.textContent = event.title;

                        eventElement.appendChild(eventTitle);

                        // Add click event to view details
                        eventElement.addEventListener("click", (e) => {
                            e.stopPropagation();
                            openEventDetails(event);
                        });

                        eventsContainer.appendChild(eventElement);
                    });
                }

                dayElement.appendChild(eventsContainer);
                calendarGrid.appendChild(dayElement);
            }
        }

        function getEventsForDate(dateStr) {
            return events.filter(event => {
                const eventDate = new Date(event.date);
                const eventEndDate = new Date(event.endDate);
                const currentDate = new Date(dateStr);

                return currentDate >= eventDate && currentDate <= eventEndDate;
            });
        }

        function openAddEventModal(dateStr) {
            selectedDate = dateStr;
            document.getElementById("modalSelectedDate").value = dateStr;
            document.getElementById("modalEventId").value = "";
            document.getElementById("modalTitle").textContent = "Add New Event";
            editingEventId = null;

            // Reset form
            document.getElementById("modalEventForm").reset();
            document.getElementById("modalStartDate").value = dateStr;
            document.getElementById("modalEndDate").value = dateStr;

            eventModal.style.display = "flex";
        }

        function openEventDetails(event) {
            document.getElementById("detailsTitle").textContent = event.title;
            document.getElementById("detailsDate").textContent = formatEventDate(event);
            document.getElementById("detailsCategory").textContent = event.category.charAt(0).toUpperCase() + event.category.slice(1);
            document.getElementById("detailsLocation").textContent = event.location || "Not specified";
            document.getElementById("detailsPriority").textContent = event.priority.charAt(0).toUpperCase() + event.priority.slice(1);
            document.getElementById("detailsDescription").textContent = event.description || "No description available.";

            const detailsImage = document.getElementById("detailsImage");
            if (event.photo) {
                detailsImage.src = event.photo;
                detailsImage.style.display = "block";
            } else {
                detailsImage.style.display = "none";
            }

            detailsModal.style.display = "flex";
        }

        function closeEventModal() {
            eventModal.style.display = "none";
            editingEventId = null;
        }

        function closeDetailsModal() {
            detailsModal.style.display = "none";
        }

        function previewPhoto(event) {
            const file = event.target.files[0];
            const preview = document.getElementById("photoPreview");

            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    preview.src = e.target.result;
                    preview.style.display = "block";
                };
                reader.readAsDataURL(file);
            }
        }

        function previewModalPhoto(event) {
            const file = event.target.files[0];
            const preview = document.getElementById("modalPhotoPreview");

            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    preview.src = e.target.result;
                    preview.style.display = "block";
                };
                reader.readAsDataURL(file);
            }
        }

        function previewProfilePhoto(event) {
            const file = event.target.files[0];
            const preview = document.getElementById("profilePhotoPreview");

            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    preview.src = e.target.result;
                    preview.style.display = "block";
                };
                reader.readAsDataURL(file);
            }
        }

        function saveEvent(e) {
            e.preventDefault();
            console.log("Save event form submitted");

            const eventData = {
                id: Date.now(),
                title: document.getElementById("eventTitle").value,
                date: document.getElementById("startDate").value,
                endDate: document.getElementById("endDate").value,
                category: document.getElementById("eventCategory").value,
                priority: document.getElementById("eventPriority").value,
                description: document.getElementById("eventDescription").value,
                location: document.getElementById("eventLocation").value,
                userId: currentUser ? currentUser.id : 1
            };

            console.log("Event data to save:", eventData);

            // Handle photo upload
            const photoFile = document.getElementById("eventPhoto").files[0];
            if (photoFile) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    eventData.photo = e.target.result;
                    completeSave(eventData);
                };
                reader.readAsDataURL(photoFile);
            } else {
                completeSave(eventData);
            }
        }

        function saveModalEvent(e) {
            e.preventDefault();
            console.log("Save modal event form submitted");

            const eventData = {
                id: document.getElementById("modalEventId").value || Date.now(),
                title: document.getElementById("modalEventTitle").value,
                date: document.getElementById("modalStartDate").value,
                endDate: document.getElementById("modalEndDate").value,
                category: document.getElementById("modalEventCategory").value,
                priority: document.getElementById("modalEventPriority").value,
                description: document.getElementById("modalEventDescription").value,
                location: document.getElementById("modalEventLocation").value,
                userId: currentUser ? currentUser.id : 1
            };

            console.log("Modal event data to save:", eventData);

            // Handle photo upload for modal
            const photoFile = document.getElementById("modalEventPhoto").files[0];
            if (photoFile) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    eventData.photo = e.target.result;
                    completeSave(eventData);
                };
                reader.readAsDataURL(photoFile);
            } else {
                completeSave(eventData);
            }
        }

        function completeSave(eventData) {
            // Add to user events
            const existingIndex = userEvents.findIndex(e => e.id == eventData.id);
            if (existingIndex >= 0) {
                userEvents[existingIndex] = eventData;
            } else {
                userEvents.push(eventData);
            }

            // Update events array
            events = [...indianFestivals, ...userEvents];

            // Save to localStorage
            saveEventsToStorage();

            // Update UI
            renderCalendar();
            updateDashboard();
            closeEventModal();

            showNotification("Event saved successfully!", "success");

            // In a real application, you would send this to your server
            console.log("Event data ready for server:", eventData);
        }

        function switchView(view) {
            // For this example, we only have month view
            showNotification(`Switching to ${view} view - This would show a specialized view for ${view}`, "info");
        }

        function formatEventDate(event) {
            const startDate = new Date(event.date);
            const endDate = new Date(event.endDate);

            if (event.date === event.endDate) {
                return startDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                });
            } else {
                return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
            }
        }

        // User Authentication Functions
        function handleLogin(e) {
            e.preventDefault();
            
            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;
            
            // Simple validation
            if (!email || !password) {
                showNotification("Please fill in all fields", "error");
                return;
            }
            
            // In a real app, this would be an API call
            const user = {
                id: 1,
                firstName: "Sujan Chandra",
                lastName: "Ray",
                email: email,
                phone: "+91 98765 43210",
                bio: "Event enthusiast and calendar organizer"
            };
            
            // Set login state
            isLoggedIn = true;
            currentUser = user;
            
            // Update UI - Hide login/register buttons, show user menu
            document.getElementById("userName").textContent = `${user.firstName} ${user.lastName}`;
            document.getElementById("userMenu").style.display = "flex";
            document.getElementById("loginBtn").style.display = "none";
            document.getElementById("registerBtn").style.display = "none";
            
            // Update profile
            document.getElementById("profileName").textContent = `${user.firstName} ${user.lastName}`;
            document.getElementById("profileEmail").textContent = user.email;
            
            // Show dashboard
            showDashboard();
            
            showNotification("Login successful!", "success");
        }

        function handleRegister(e) {
            e.preventDefault();
            
            const firstName = document.getElementById("firstName").value;
            const lastName = document.getElementById("lastName").value;
            const email = document.getElementById("registerEmail").value;
            const password = document.getElementById("registerPassword").value;
            const confirmPassword = document.getElementById("confirmPassword").value;
            const agreeTerms = document.getElementById("agreeTerms").checked;
            
            // Validation
            if (!firstName || !lastName || !email || !password || !confirmPassword) {
                showNotification("Please fill in all fields", "error");
                return;
            }
            
            if (password !== confirmPassword) {
                showNotification("Passwords do not match", "error");
                return;
            }
            
            if (!agreeTerms) {
                showNotification("Please agree to the terms and conditions", "error");
                return;
            }
            
            // In a real app, this would be an API call
            const user = {
                id: 1,
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: "",
                bio: ""
            };
            
            // Set login state
            isLoggedIn = true;
            currentUser = user;
            
            // Update UI - Hide login/register buttons, show user menu
            document.getElementById("userName").textContent = `${user.firstName} ${user.lastName}`;
            document.getElementById("userMenu").style.display = "flex";
            document.getElementById("loginBtn").style.display = "none";
            document.getElementById("registerBtn").style.display = "none";
            
            // Update profile
            document.getElementById("profileName").textContent = `${user.firstName} ${user.lastName}`;
            document.getElementById("profileEmail").textContent = user.email;
            
            // Show dashboard
            showDashboard();
            
            showNotification("Registration successful!", "success");
        }

        function logout() {
            isLoggedIn = false;
            currentUser = null;
            
            // Update UI - Show login/register buttons, hide user menu
            document.getElementById("userMenu").style.display = "none";
            document.getElementById("loginBtn").style.display = "inline-block";
            document.getElementById("registerBtn").style.display = "inline-block";
            
            // Show login page after logout
            showLoginPage();
            
            showNotification("You have been logged out", "info");
        }

        function checkLoginStatus() {
            // In a real app, this would check for a stored token
            // For demo purposes, we'll just show the login/register buttons
            document.getElementById("userMenu").style.display = "none";
            document.getElementById("loginBtn").style.display = "inline-block";
            document.getElementById("registerBtn").style.display = "inline-block";
        }

        function loadUserProfile() {
            if (currentUser) {
                document.getElementById("profileName").textContent = `${currentUser.firstName} ${currentUser.lastName}`;
                document.getElementById("profileEmail").textContent = currentUser.email;
                document.getElementById("profileFirstName").value = currentUser.firstName;
                document.getElementById("profileLastName").value = currentUser.lastName;
                document.getElementById("profileEmailInput").value = currentUser.email;
                document.getElementById("profilePhone").value = currentUser.phone || "";
                document.getElementById("profileBio").value = currentUser.bio || "";
            }
        }

        function saveProfile(e) {
            e.preventDefault();
            
            if (currentUser) {
                currentUser.firstName = document.getElementById("profileFirstName").value;
                currentUser.lastName = document.getElementById("profileLastName").value;
                currentUser.email = document.getElementById("profileEmailInput").value;
                currentUser.phone = document.getElementById("profilePhone").value;
                currentUser.bio = document.getElementById("profileBio").value;
                
                document.getElementById("profileName").textContent = `${currentUser.firstName} ${currentUser.lastName}`;
                document.getElementById("profileEmail").textContent = currentUser.email;
                
                showNotification("Profile updated successfully!", "success");
            }
        }

        function saveProfilePhoto(e) {
            e.preventDefault();
            const file = document.getElementById("profilePhotoUpload").files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById("profileAvatar").src = e.target.result;
                    showNotification("Profile photo updated successfully!", "success");
                };
                reader.readAsDataURL(file);
            } else {
                showNotification("Please select a photo to upload", "error");
            }
        }

        function loadUserEvents() {
            userEventsList.innerHTML = "";
            
            if (userEvents.length === 0) {
                userEventsList.innerHTML = '<div class="empty-state">You haven\'t created any events yet</div>';
                return;
            }
            
            userEvents.forEach(event => {
                const eventElement = document.createElement("div");
                eventElement.classList.add("event-item");
                
                const eventDate = new Date(event.date);
                const formattedDate = eventDate.toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                });
                
                eventElement.innerHTML = `
                    <div class="event-date">
                        <div class="day">${eventDate.getDate()}</div>
                        <div class="month">${eventDate.toLocaleString('default', { month: 'short' })}</div>
                    </div>
                    <div class="event-details">
                        <h4>${event.title}</h4>
                        <p>${formattedDate} • ${event.location || 'No location specified'}</p>
                    </div>
                    <div class="event-category">${event.category}</div>
                `;
                
                userEventsList.appendChild(eventElement);
            });
        }

        function loadProfileEvents() {
            const profileEventsList = document.getElementById("profileEventsList");
            profileEventsList.innerHTML = "";
            
            if (userEvents.length === 0) {
                profileEventsList.innerHTML = '<div class="empty-state">You haven\'t created any events yet</div>';
                return;
            }
            
            userEvents.forEach(event => {
                const eventElement = document.createElement("div");
                eventElement.classList.add("event-item");
                
                const eventDate = new Date(event.date);
                const formattedDate = eventDate.toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                });
                
                eventElement.innerHTML = `
                    <div class="event-date">
                        <div class="day">${eventDate.getDate()}</div>
                        <div class="month">${eventDate.toLocaleString('default', { month: 'short' })}</div>
                    </div>
                    <div class="event-details">
                        <h4>${event.title}</h4>
                        <p>${formattedDate} • ${event.location || 'No location specified'}</p>
                    </div>
                    <div class="event-category">${event.category}</div>
                `;
                
                profileEventsList.appendChild(eventElement);
            });
        }

        function savePreferences(e) {
            e.preventDefault();
            
            const notificationPref = document.getElementById("notificationPref").value;
            const timezonePref = document.getElementById("timezonePref").value;
            const languagePref = document.getElementById("languagePref").value;
            const emailUpdates = document.getElementById("emailUpdates").checked;
            
            showNotification("Preferences saved successfully!", "success");
        }

        // Storage functions
        function saveEventsToStorage() {
            localStorage.setItem('userEvents', JSON.stringify(userEvents));
        }

        function loadEventsFromStorage() {
            const storedEvents = JSON.parse(localStorage.getItem('userEvents') || '[]');
            userEvents = storedEvents;
            events = [...indianFestivals, ...userEvents];
        }

        function updateDashboard() {
            // Update stats
            document.getElementById("totalEvents").textContent = events.length;
            document.getElementById("upcomingEvents").textContent = getUpcomingEvents().length;
            document.getElementById("festivalsCount").textContent = getThisMonthFestivals().length;

            // Update upcoming events list
            updateUpcomingEventsList();
        }

        function getUpcomingEvents() {
            const today = new Date();
            return events.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate >= today;
            }).slice(0, 5); // Only next 5 events
        }

        function getThisMonthFestivals() {
            const currentMonth = currentDate.getMonth();
            const currentYear = currentDate.getFullYear();
            
            return events.filter(event => {
                const eventDate = new Date(event.date);
                return (event.category === "festival" || event.category === "national") &&
                       eventDate.getMonth() === currentMonth &&
                       eventDate.getFullYear() === currentYear;
            });
        }

        function updateUpcomingEventsList() {
            upcomingEventsList.innerHTML = "";
            const upcomingEvents = getUpcomingEvents();
            
            if (upcomingEvents.length === 0) {
                upcomingEventsList.innerHTML = '<div class="empty-state">No upcoming events</div>';
                return;
            }
            
            upcomingEvents.forEach(event => {
                const eventElement = document.createElement("div");
                eventElement.classList.add("event-item");
                
                const eventDate = new Date(event.date);
                const formattedDate = eventDate.toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                });
                
                eventElement.innerHTML = `
                    <div class="event-date">
                        <div class="day">${eventDate.getDate()}</div>
                        <div class="month">${eventDate.toLocaleString('default', { month: 'short' })}</div>
                    </div>
                    <div class="event-details">
                        <h4>${event.title}</h4>
                        <p>${formattedDate} • ${event.location || 'No location specified'}</p>
                    </div>
                    <div class="event-category">${event.category}</div>
                `;
                
                upcomingEventsList.appendChild(eventElement);
            });
        }

        // AI Assistant Functions
        function toggleAIChat() {
            const chatContainer = document.getElementById("aiChatContainer");
            chatContainer.classList.toggle("active");
        }

        function sendAIMessage() {
            const input = document.getElementById("aiChatInput");
            const message = input.value.trim();
            
            if (message === "") return;
            
            // Add user message
            addAIMessage(message, "user");
            input.value = "";
            
            // Simulate AI response
            setTimeout(() => {
                const responses = [
                    "I can help you schedule events and manage your calendar. What specific event would you like to add?",
                    "That's a great event idea! Would you like me to help you set reminders for it?",
                    "I notice you have several events coming up. Would you like me to help you organize them?",
                    "For optimal event planning, consider adding photos and detailed descriptions to make your events more memorable!",
                    "I can help you categorize your events as festivals, national holidays, religious events, or personal occasions."
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addAIMessage(randomResponse, "bot");
            }, 1000);
        }

        function addAIMessage(message, sender) {
            const messagesContainer = document.getElementById("aiChatMessages");
            const messageElement = document.createElement("div");
            messageElement.classList.add("ai-message", `ai-message-${sender}`);
            
            const messageText = document.createElement("p");
            messageText.textContent = message;
            messageElement.appendChild(messageText);
            
            messagesContainer.appendChild(messageElement);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        // Notification function
        function showNotification(message, type = 'info') {
            // Remove existing notifications
            const existingNotifications = document.querySelectorAll('.notification');
            existingNotifications.forEach(notification => {
                notification.remove();
            });

            const notification = document.createElement('div');
            notification.classList.add('notification', type);
            notification.textContent = message;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease-in';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 3000);
        }