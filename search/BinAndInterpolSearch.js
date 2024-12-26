// Function to generate sorted array of random integers
function generateSortedArray(N, M) {
    const arr = Array(N).fill(0)
        .map(() => Math.floor(Math.random() * (M + 1)))
        .sort((a, b) => a - b);
    return arr;
}

// Binary Search implementation with operation counter
function binarySearch(arr, x) {
    let comparisons = 0;
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        comparisons++;
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === x) {
            return { found: true, comparisons };
        }
        
        if (arr[mid] < x) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return { found: false, comparisons };
}

// Interpolation Search implementation with operation counter
function interpolationSearch(arr, x) {
    let comparisons = 0;
    let left = 0;
    let right = arr.length - 1;

    while (left <= right && x >= arr[left] && x <= arr[right]) {
        comparisons++;
        
        // Interpolation formula
        const pos = left + Math.floor(
            ((right - left) * (x - arr[left])) / 
            (arr[right] - arr[left])
        );

        if (arr[pos] === x) {
            return { found: true, comparisons };
        }

        if (arr[pos] < x) {
            left = pos + 1;
        } else {
            right = pos - 1;
        }
    }
    return { found: false, comparisons };
}

// Test the algorithms
const N = 100;  // Array size
const M = 1000000; // Maximum value
const arr = generateSortedArray(N, M);
const searchValue = arr[Math.floor(Math.random() * N)]; // Random value from array

console.log(`Array size: ${N}, Maximum value: ${M}`);
console.log(`Searching for value: ${searchValue}`);

const binaryResult = binarySearch(arr, searchValue);
const interpolationResult = interpolationSearch(arr, searchValue);

console.log(`Binary Search: ${binaryResult.comparisons} comparisons`);
console.log(`Interpolation Search: ${interpolationResult.comparisons} comparisons`);