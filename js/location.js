// Location Dropdown Funktionalität
document.addEventListener('DOMContentLoaded', function() {
    const locationBtn = document.querySelector('.locationDropdownBtn');
    const locationOptions = document.querySelectorAll('.locationDropdownContent a');

    if (locationBtn && !locationBtn.textContent.trim()) {
        locationBtn.textContent = 'Berlin';
    }
    locationOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const selectedLocation = this.textContent;
            locationBtn.textContent = selectedLocation;
            console.log('Standort gewechselt zu:', selectedLocation);
            const dropdown = this.closest('.location');
            dropdown.style.pointerEvents = 'none';
            setTimeout(() => {
                dropdown.style.pointerEvents = 'auto';
            }, 100);
        });
    });
});
