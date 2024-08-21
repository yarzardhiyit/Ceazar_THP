// Function to initialize each tab with its respective CSV file
function initTabs() {
  const tabs = document.querySelectorAll('.nav-link');
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const carrier = this.textContent.trim();
      fetchAndParseCSV(carrier);
    });
  });
}

// Global object to store max weights by carrier and country
var maxWeightsByCarrier = {};

// Function to fetch and parse the CSV file based on the carrier
function fetchAndParseCSV(carrier) {
  const csvFile = `MaxWgt_${carrier}.csv`;
  fetch(csvFile)
    .then(response => response.text())
    .then(csvData => {
      Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
        complete: function(results) {
          maxWeightsByCarrier[carrier] = {}; // Initialize carrier object
          const selectElement = document.getElementById(`country-${carrier}`);
          selectElement.innerHTML = ''; // Clear existing options
          results.data.forEach(row => {
            // Store max weight for each destination
            maxWeightsByCarrier[carrier][row.Destinations] = parseFloat(row['Maximum weight (kilogram)']);
            const option = document.createElement('option');
            option.value = row.Destinations;
            option.textContent = row.Destinations;
            selectElement.appendChild(option);
          });
        }
      });
    })
    .catch(error => console.error(`Error fetching the CSV file for ${carrier}:`, error));
}

// Carrier zones mapping
const carrierZones = {
  'ThaiPost': {
    'Argentina': 17,
    'Australia*': 9,
    'Austria': 5,
    'Bahrain': 7,
    'Bangladesh': 6,
    'Belarus': 8,
    'Belgium': 12,
    'Bhutan': 6,
    'Brazil': 14,
    'Brunei': 3,
    'Bulgaria': 7,
    'Cambodia': 1,
    'Canada': 5,
    'China': 10,
    'Cote dIvoire': 3,
    'Croatia': 7,
    'Cyprus': 8,
    'Czech (Rep)': 4,
    'Denmark*': 4,
    'Djibouti': 13,
    'Egypt': 4,
    'Estonia': 4,
    'Ethiopia': 13,
    'Finland': 4,
    'France*': 4,
    'Germany': 3,
    'Ghana': 8,
    'Greece': 12,
    'Hong Kong': 19,
    'Hungary': 8,
    'India': 3,
    'Indonesia': 2,
    'Iran (Islamic Rep)': 3,
    'Ireland': 13,
    'Israel': 4,
    'Italy*': 4,
    'Japan': 11,
    'Kenya': 13,
    'South Korea': 2,
    'Kuwait': 11,
    'Laos': 1,
    'Lebanon': 11,
    'Luxembourg': 7,
    'Macau': 19,
    'Macedonia': 4,
    'Madagascar': 13,
    'Malaysia': 2,
    'Maldives': 3,
    'Mauritius': 3,
    'Morocco': 5,
    'Myanmar': 1,
    'Nepal': 2,
    'Netherlands': 4,
    'New Zealand*': 14,
    'Nigeria': 5,
    'Norway': 13,
    'Oman': 3,
    'Pakistan': 3,
    'Philippines': 2,
    'Poland': 4,
    'Portugal*': 8,
    'Qatar': 12,
    'Romania': 7,
    'Russia': 18,
    'Saudi Arabia': 8,
    'Senegal': 3,
    'Serbia': 7,
    'Singapore': 1,
    'Slovakia': 16,
    'Slovenia': 7,
    'South Africa': 7,
    'Spain*': 8,
    'Sri Lanka': 4,
    'Sweden': 13,
    'Switzerland': 15,
    'Taiwan': 1,
    'Tanzania': 8,
    'Tunisia': 4,
    'Turkey': 12,
    'Ukraine': 8,
    'United Arab Emirates': 3,
    'United Kingdom*': 3,
    'United States of  America*': 17,
    'Vietnam': 1
    // ... (your ThaiPost zones object here)
  },
  'FedEx': {
    'Afghanistan': '4',
    'Albania': 7,
    'Algeria': 8,
    'American Samoa': 8,
    'Andorra': 7,
    'Angola': 8,
    'Anguilla': 8,
    'Antigua & Barbuda': 8,
    'Argentina': 8,
    'Armenia': 7,
    'Aruba': 8,
    'Australia': 21,
    'Austria': 7,
    'Azerbaijan': 7,
    'Bahama': 8,
    'Bahrain': 4,
    'Bangladesh': 4,
    'Barbados': 8,
    'Belarus': 7,
    'Belgium': 6,
    'Belize': 8,
    'Benin': 8,
    'Bermuda': 8,
    'Bhutan': 4,
    'Bolivia': 8,
    'Bonaire': 8,
    'Bosnia-Herzegovina': 7,
    'Botswana': 8,
    'Brazil': 8,
    'British Virgin Islands': 8,
    'Brunei': 3,
    'Bulgaria': 7,
    'Burkina Faso': 8,
    'Burundi': 8,
    'Cambodia': 3,
    'Cameroon': 8,
    'Canada': 5,
    'Cape Verde': 8,
    'Cayman Islands': 8,
    'Chad': 8,
    'Chile': 8,
    'China': 23,
    'China (South)': 11,
    'Colombia': 8,
    'Congo': 8,
    'Cook Islands': 8,
    'Costa Rica': 8,
    'Croatia': 7,
    'Curacao': 8,
    'Cyprus': 7,
    'Czech Republic': 7,
    "Côte D'ivoire (Ivory Coast)": 8,
    'Democratic Republic of the Congo': 8,
    'Denmark': 7,
    'Djibouti': 8,
    'Dominica': 8,
    'Dominican Republic': 8,
    'East Timor': 8,
    'Ecuador': 8,
    'Egypt': 4,
    'El Salvador': 8,
    'Eritrea': 8,
    'Estonia': 7,
    'Ethiopia': 8,
    'Faeroe Islands': 7,
    'Fiji': 8,
    'Finland': 7,
    'France': 6,
    'French Guiana': 8,
    'French Polynesia': 8,
    'Gabon': 8,
    'Gambia': 8,
    'Georgia': 7,
    'Germany': 6,
    'Ghana': 8,
    'Gibraltar': 7,
    'Greece': 7,
    'Greenland': 7,
    'Grenada': 8,
    'Guadeloupe': 8,
    'Guam': 8,
    'Guatemala': 8,
    'Guinea': 8,
    'Guyana': 8,
    'Haiti': 8,
    'Honduras': 8,
    "Hong Kong SAR, China": 22,
    'Hungary': 7,
    'Iceland': 7,
    'India': 15,
    'Indonesia': 20,
    'Iraq': 4,
    'Ireland': 7,
    'Israel': 7,
    'Italy': 6,
    'Jamaica': 8,
    'Japan': 16,
    'Jordan': 4,
    'Kazakhstan': 7,
    'Kenya': 8,
    'Kuwait': 4,
    'Kyrgyzstan': 7,
    'Laos': 3,
    'Latvia': 7,
    'Lebanon': 4,
    'Lesotho': 8,
    'Liberia': 8,
    'Libya': 8,
    'Liechtenstein': 7,
    'Lithuania': 7,
    'Luxembourg': 7,
    "Macau SAR, China": 1,
    'Macedonia': 7,
    'Madagascar': 8,
    'Malawi': 8,
    'Malaysia': 17,
    'Maldives': 4,
    'Mali': 8,
    'Malta': 7,
    "Marshall Islands": 8,
    'Martinique': 8,
    'Mauritania': 8,
    'Mauritius': 8,
    'Mexico': 5,
    'Micronesia': 8,
    'Monaco': 7,
    'Mongolia': 3,
    'Monserrat': 8,
    'Montenegro': 7,
    'Morocco': 8,
    'Mozambique': 8,
    'Namibia': 8,
    'Nepal': 4,
    'Netherlands': 6,
    "Netherlands Antilles": 8,
    "New Caledonia": 8,
    "New Zealand": 2,
    'Nicaragua': 8,
    'Niger': 8,
    'Nigeria': 8,
    "Northern Mariana Islands": 8,
    'Norway': 7,
    'Oman': 4,
    'Pakistan': 4,
    'Palau': 8,
    "Palestine Autonomous": 4,
    'Panama': 8,
    "Papua New Guinea": 8,
    'Paraguay': 8,
    'Peru': 8,
    'Phillipines': 19,
    'Poland': 7,
    'Portugal': 7,
    'Qatar': 4,
    "Republic of Moldova": 7,
    'Romania': 7,
    "Russian Federation": 7,
    'Rwanda': 8,
    'Réunion': 8,
    "Saint Lucia": 8,
    'Samoa': 8,
    "Saudi Arabia": 4,
    'Senegal': 8,
    'Serbia': 7,
    'Seychelles': 8,
    'Singapore': 25,
    'Slovakia': 7,
    'Slovenia': 7,
    "South Africa": 4,
    "South Korea": 26,
    'Spain': 6,
    "Sri Lanka": 4,
    "St. Kitts and Nevis": 8,
    "St. Maarten": 8,
    "St. Martin": 8,
    "St. Vincent & the Grenadines": 8,
    'Suriname': 8,
    'Swaziland': 8,
    'Sweden': 7,
    'Switzerland': 7,
    "Syrian Arab Republic": 4,
    'Taiwan': 24,
    'Togo': 8,
    'Tonga': 8,
    "Trinidad & Tobago": 8,
    'Tunisia': 8,
    'Turkey': 7,
    "Turks & Caicos Islands": 8,
    "U.S.A.": '5',
    "U.S. Virgin Islands": 8,
    'Uganda': 8,
    'Ukraine': 7,
    "United Arab Emirates": 4,
    "United Kingdom (Great Britain)": 6,
    "United Republic of Tanzania": 8,
    'Uruguay': 8,
    'Uzbekistan': 7,
    'Vanuatu': 8,
    'Venezuela': 8,
    'Vietnam': 14,
    "Wallis & Futuna": 8,
    'Yemen': 4,
    'Zambia': 8,
    'Zimbabwe': 8  
    // ... (your FedEx zones object here)
  },
  'UPS': {
    // ... (your UPS zones object here)
  },
  'DHL': {
    // ... (your DHL zones object here)
  }
  // Add more carriers as needed
};

// Function to check the weight against the max weight of the selected country
function checkWeight(carrier) {
  const selectedCountry = document.getElementById(`country-${carrier}`).value;
  const inputWeight = parseFloat(document.getElementById(`weight-${carrier}`).value);
  const maxWeight = maxWeightsByCarrier[carrier][selectedCountry];
  const redAlert = document.getElementById(`red-alert-${carrier}`);
  const alertContainer = document.getElementById(`alert-container-${carrier}`);

  // Check if the input weight exceeds the maximum weight
  if (inputWeight && maxWeight && inputWeight > maxWeight) {
    redAlert.textContent = `Warning: The inputted weight of ${inputWeight} kg exceeds the maximum weight of ${maxWeight} kg for ${selectedCountry}.`;
    alertContainer.style.border = '0.5px solid rgb(191,18,19)';
  } else {
    redAlert.textContent = '';
    alertContainer.style.border = 'none';
  }
}

// Function to calculate and display the shipping cost for the selected carrier
function calculateCost(carrier) {
  const selectedCountryElement = document.getElementById(`country-${carrier}`);
  const weightInputElement = document.getElementById(`weight-${carrier}`);
  if (!selectedCountryElement || !weightInputElement) {
    console.error('One or more elements could not be found.');
    return;
  }
  const selectedCountry = selectedCountryElement.value;
  const inputWeight = parseFloat(weightInputElement.value);
  const zone = carrierZones[carrier][selectedCountry];
  const pricingCSV = `Pricing_${carrier}.csv`;

  fetch(pricingCSV)
    .then(response => response.text())
    .then(csvData => {
      Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
        complete: function(results) {
          let price;
          // Check if the carrier uses weight index or exact weight for pricing
          if (carrier === 'FedEx') {
            const weightIndex = Math.ceil(inputWeight); // Assuming weight is rounded up to the nearest integer
            results.data.forEach(row => {
              if (row['Weight (Kilogram)'] === weightIndex.toString()) {
                price = row[`Zone ${zone}`];
              }
            });
          } else { // For ThaiPost and other carriers that use exact weight
            results.data.forEach(row => {
              if (Math.abs(parseFloat(row['Weight (kilogram)']) - inputWeight) < 0.01) {
                price = row[`Zone ${zone}`];
              }
            });
          }

          if (price) {
            document.getElementById('shipping-cost').textContent = price + " THB";
          } else {
            document.getElementById(`red-alert-${carrier}`).textContent = 'Invalid weight or zone.';
          }
        }
      });
    })
    .catch(error => console.error(`Error fetching the pricing CSV file for ${carrier}:`, error));
}

document.addEventListener('DOMContentLoaded', function() {
  initTabs();
  fetchAndParseCSV('ThaiPost'); // Initialize the first tab by default
});

document.getElementById('country-ThaiPost').addEventListener('change', function() {
    checkWeight('ThaiPost');
  });
  document.getElementById('weight-ThaiPost').addEventListener('input', function() {
    checkWeight('ThaiPost');
  });
  document.getElementById('country-FedEx').addEventListener('change', function() {
    checkWeight('FedEx');
  });
  document.getElementById('weight-FedEx').addEventListener('input', function() {
    checkWeight('FedEx');
  });

  
  // Add similar event listeners for FedEx and other carriers
  
