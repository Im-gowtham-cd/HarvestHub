document.addEventListener('DOMContentLoaded', () => {
    const markets = [
        { id: 1, name: 'Gowtham\'s Fresh Goods', description: 'Fresh produce and local goods', location: 'Karur', contact: '9003538951' },
        { id: 2, name: 'Gowrisankar\'s Fresh Fruits', description: 'Organic vegetables and fruits', location: 'Kadalur', contact: '9344667078' },
        { id: 3, name: 'Harisankar\'s Fresh Dairy', description: 'Dairy products and grains', location: 'Namakkal', contact: '7598192925' },
        { id: 4, name: 'Kowshik \'s Veggie', description: 'Fresh produce and local goods', location: 'Krishnagiri', contact: '8610785540' },
        { id: 5, name: 'Kavyadarshini\'s Fresh Dairy', description: 'Dairy products and grains', location: 'Erode', contact: '9042773980' },
        { id: 6, name: 'Inika \'s Veggie', description: 'Fresh produce and local goods', location: 'Sivagiri', contact: '6379771312' },
    ];

    const marketList = document.getElementById('markets');
    const marketDetails = document.getElementById('market-details');
    const detailsDiv = document.getElementById('details');
    const contactForm = document.getElementById('contact-form');
    const backButton = document.getElementById('back-button');
    const formBackButton = document.getElementById('form-back-button');
    const homeButton = document.getElementById('home-button');
    const form = document.getElementById('form');
    const battery = document.getElementById('battery');
    const time = document.getElementById('time');

    markets.forEach(market => {
        const listItem = document.createElement('li');
        listItem.textContent = market.name;
        listItem.addEventListener('click', () => showMarketDetails(market));
        marketList.appendChild(listItem);
    });

    function showMarketDetails(market) {
        marketList.classList.add('hidden');
        marketDetails.classList.remove('hidden');
        contactForm.classList.add('hidden');
        detailsDiv.innerHTML = `
            <br><h3>${market.name}</h3>
            <br><p>${market.description}</p>
            <br><p><strong>Location:</strong> ${market.location}</p>
            <br><p><strong>Contact:</strong> ${market.contact}</p>
            <br>
        `;
        document.getElementById('contact-button').addEventListener('click', () => {
            marketDetails.classList.add('hidden');
            contactForm.classList.remove('hidden');
        });
    }

    function goHome() {
        marketDetails.classList.add('hidden');
        contactForm.classList.add('hidden');
        marketList.classList.remove('hidden');
    }

    backButton.addEventListener('click', () => {
        marketDetails.classList.add('hidden');
        contactForm.classList.add('hidden');
        marketList.classList.remove('hidden');
    });

    homeButton.addEventListener('click', goHome);

    formBackButton.addEventListener('click', () => {
        contactForm.classList.add('hidden');
        marketDetails.classList.remove('hidden');
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Your message has been sent!');
        form.reset();
        contactForm.classList.add('hidden');
        marketDetails.classList.remove('hidden');
    });

    function updateStatusBar() {
        // Update time
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        time.textContent = `${hours}:${minutes}`;

        // Check if Battery Status API is supported
        if (navigator.getBattery) {
            navigator.getBattery().then(batteryManager => {
                // Update battery percentage
                const batteryPercentage = Math.round(batteryManager.level * 100);
                battery.textContent = `🔋 ${batteryPercentage}%`;
                
                // Update battery status on level change
                batteryManager.addEventListener('levelchange', () => {
                    const updatedBatteryPercentage = Math.round(batteryManager.level * 100);
                    battery.textContent = `🔋 ${updatedBatteryPercentage}%`;
                });
            });
        } else {
            // Fallback if Battery Status API is not supported
            battery.textContent = '🔋 Not supported';
        }
    }

    // Update status bar immediately and every minute
    updateStatusBar();
    setInterval(updateStatusBar, 60000); // Update every 60 seconds
});
