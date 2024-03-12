function calculateDistance() {
    var word1 = document.getElementById('word1').value;
    var word2 = document.getElementById('word2').value;
    
    // Calculate Levenshtein distance
    var matrix = levenshteinDistanceMatrix(word1, word2);
    var distance = matrix[word1.length][word2.length];
    
    // Output the results
    document.getElementById('result').textContent = "Levenshtein Distance: " + distance;
    fillTable(matrix);

}

// Function to calculate Levenshtein distance
function levenshteinDistanceMatrix(word1, word2) {
    
    // Initialize the matrix with dimensions (word1.length + 1) × (word2.length + 1)
    var arr = [];
    for (let i = 0; i <= word1.length; i++) {
        arr[i] = [i];
    }
    for (let j = 0; j <= word2.length; j++) {
        arr[0][j] = j;
    }

    // Populate the matrix using dynamic programming approach
    for (let i = 1; i <= word1.length; i++) {
        for (let j = 1; j <= word2.length; j++) {
            if (word1[i - 1] !== word2[j - 1]) {
                arr[i][j] = 1 + Math.min(arr[i - 1][j], arr[i][j - 1], arr[i - 1][j - 1]);
            } else {
                arr[i][j] = Math.min(arr[i - 1][j] + 1, arr[i][j - 1] + 1, arr[i - 1][j - 1]);
            }
        }
    }

    // Return the Levenshtein distance (located at the bottom-right corner of the matrix)
    return arr;
}

function fillTable(matrix) {
    var table = document.getElementById('matrix');
    var rows = matrix.length;
    var cols = matrix[0].length;

    // Clear existing table rows
    table.innerHTML = '';

    // Create table rows and cells
    for (var i = 0; i < rows; i++) {
        var row = table.insertRow();
        for (var j = 0; j < cols; j++) {
            var cell = row.insertCell();
            cell.textContent = matrix[i][j];
        }
    }
}

function clearFields() {
    document.getElementById('word1').value = '';
    document.getElementById('word2').value = '';
    document.getElementById('result').textContent = '';
    document.getElementById('matrix').innerHTML = '';
}
