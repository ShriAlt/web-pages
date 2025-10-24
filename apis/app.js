const stateSelect = document.getElementById('state-select');
const districtSelect = document.getElementById('district-select');

// Replace with your actual API key from https://countrystatecity.in
const API_KEY = "ZUw3bjcxOEQzRmV5c0tGZUFOUWdEQmM0ckFsSTlKUWhwVGtwcFhESQ==";
const BASE_URL = 'https://api.countrystatecity.in/v1';

// Fetch all Indian states
async function fetchStates() {
    try {
        const response = await fetch(`${BASE_URL}/countries/IN/states`, {
            headers: {
                'X-CSCAPI-KEY': API_KEY
            }
        });
        const states = await response.json();

        states.forEach(state => {
            const option = document.createElement('option');
            option.value = state.iso2;
            option.textContent = state.name;
            stateSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching states:', error);
    }
}

// Fetch districts for selected state
async function fetchDistricts(stateCode) {
    try {
        const response = await fetch(`${BASE_URL}/countries/IN/states/${stateCode}/cities`, {
            headers: {
                'X-CSCAPI-KEY': API_KEY
            }
        });
        const districts = await response.json();

        // Clear previous options
        districtSelect.innerHTML = '<option value="">-- Please select --</option>';
        districtSelect.disabled = false;

        districts.forEach(district => {
            const option = document.createElement('option');
            option.value = district.name;
            option.textContent = district.name;
            districtSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching districts:', error);
    }
}

// Event listener for state selection
stateSelect.addEventListener('change', () => {
    const selectedState = stateSelect.value;
    if (selectedState) {
        fetchDistricts(selectedState);
    } else {
        districtSelect.innerHTML = '<option value="">-- Please select a state first --</option>';
        districtSelect.disabled = true;
    }
});

// Initialize
fetchStates();