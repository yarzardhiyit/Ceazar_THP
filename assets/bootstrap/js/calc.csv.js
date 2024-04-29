        // Function to fetch and parse the CSV file
        function fetchAndParseCSV() {
            fetch('Dest_Zone_MaxWgt_Apr2024.csv')
                .then(response => response.text())
                .then(csvData => {
                    Papa.parse(csvData, {
                        header: true,
                        skipEmptyLines: true,
                        complete: function (results) {
                            const maxWeights = {};
                            results.data.forEach(row => {
                                maxWeights[row.Destinations] = parseFloat(row['Maximum weight (kilogram)']);
                                const option = document.createElement('option');
                                option.value = row.Destinations;
                                option.textContent = row.Destinations;
                                document.getElementById('country').appendChild(option);
                            });
                            document.getElementById('weight').addEventListener('input', function() {
                                checkWeight(maxWeights);
                            });
                        }
                    });
                })
                .catch(error => console.error('Error fetching the CSV file:', error));
        }

        window.onload = function() {
            var redAlert = document.getElementById('red-alert');
            var alertContainer = document.getElementById('alert-container');
            // Check if red-alert exists and has content
            if (redAlert && redAlert.textContent.trim() !== '') {
                alertContainer.style.border = '0.5px solid rgb(191,18,19)';
            } else {
                // Hide the border if red-alert is empty
                alertContainer.style.border = 'none';
            }
        };
        
        // Function to check the weight against the max weight of the selected country
        function checkWeight(maxWeights) {
            const selectedCountry = document.getElementById('country').value;
            const inputWeight = parseFloat(document.getElementById('weight').value);
            const maxWeight = maxWeights[selectedCountry];
            const redAlert = document.getElementById('red-alert');
            const alertContainer = document.getElementById('alert-container');
        
            if (inputWeight && inputWeight > maxWeight) {
                redAlert.textContent = 'Warning: The inputted weight of ' + inputWeight + ' kg exceeds the maximum weight of ' + maxWeight + ' kg for ' + selectedCountry + '.';
                alertContainer.style.border = '0.5px solid rgb(191,18,19)';
            } else {
                redAlert.textContent = '';
                // Hide the border if the warning is not needed
                alertContainer.style.border = 'none';
            }
        }
        
        
        // Function to calculate and display the shipping cost
        function calculateCost() {
            const selectedCountry = document.getElementById('country').value;
            const inputWeight = parseFloat(document.getElementById('weight').value);
            const zones = {
                'Argentina': 17, 'Australia*': 9,'Austria': 5,'Bahrain': 7,'Bangladesh': 6,'Belarus': 8,'Belgium': 12,'Bhutan': 6,'Brazil': 14,'Brunei': 3,'Bulgaria': 7,'Cambodia': 1,'Canada': 5,'China': 10,'Cote dIvoire': 3,'Croatia': 7,'Cyprus': 8,'Czech (Rep': 4,'Denmark*': 4,'Djibouti': 13,'Egypt': 4,'Estonia': 4,'Ethiopia': 13,'Finland': 4,'France*': 4,'Germany': 3,'Ghana': 8,'Greece': 12,'Hong Kong': 19,'Hungary': 8,'India': 3,'Indonesia': 2,'Iran (Islamic Rep': 3,'Ireland': 13,'Israel': 4,'Italy': 4,'Japan': 11,'Kenya': 13,'Korea (Rep': 2,'Kuwait': 11,'Laos': 1,'Lebanon': 11,'Luxembourg': 7,'Macau': 19,'Macedonia': 4,'Madagascar': 13,'Malaysia': 2,'Maldives': 3,'Mauritius': 3,'Morocco': 5,'Myanmar': 1,'Nepal': 2,'Netherlands': 4,'New Zealand*': 14,'Nigeria': 5,'Norway': 13,'Oman': 3,'Pakistan': 3,'Philippines': 2,'Poland': 4,'Portugal*': 8,'Qatar': 12,'Romania': 7,'Russia': 18,'Saudi Arabia': 8,'Senegal': 3,'Serbia': 7,'Singapore': 1,'Slovakia': 16,'Slovenia': 7,'South Africa': 7,'Spain*': 8,'Sri Lanka': 4,'Sweden': 13,'Switzerland': 15,'Taiwan': 1,'Tanzania': 8,'Tunisia': 4,'Turkey': 12,'Ukraine': 8,'United Arab Emirates': 3,'United Kingdom*': 3,'United States of  America*': 17,'Vietnam': 1
                // ... (your zones object here)
            };
            const zoneNumber = zones[selectedCountry];
        
            fetch('Weight_Zone_Pricing_Apr2024.csv')
                .then(response => response.text())
                .then(csvData => {
                    Papa.parse(csvData, {
                        header: true,
                        skipEmptyLines: true,
                        complete: function (results) {
                            let price;
                            results.data.forEach(row => {
                                // Use a tolerance for floating-point comparison
                                if (Math.abs(parseFloat(row['Weight (kilogram)']) - inputWeight) < 0.01) {
                                    price = row[`Zone ${zoneNumber}`];
                                }
                            });
        
                            if (price) {
                                document.getElementById('shipping-cost').textContent = price + " THB";
                                // alert(`The shipping cost for ${inputWeight}kg to ${selectedCountry} (Zone ${zoneNumber}) is ${price}`);
                            } else {
                                document.getElementById('red-alert').textContent = 'Invalid weight or zone.';
                                //alert('Invalid weight or zone.');
                            }
                        }
                    });
                })
                .catch(error => console.error('Error fetching the CSV file:', error));
        }
        
        document.addEventListener('DOMContentLoaded', fetchAndParseCSV);