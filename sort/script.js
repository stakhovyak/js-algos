const container = document.createElement('div');
container.style.display = 'flex';
container.style.alignItems = 'flex-end';
container.style.height = '920px';
container.style.width = '100%';
document.body.appendChild(container);

const algorithms = {
    hybridQuickInsertionSort: function(arr, k = 10) {
        let operations = 0;

        function quickSort(arr, low, high) {
            if (low < high) {
                if (high - low < k) {
                    insertionSort(arr, low, high);
                } else {
                    let pi = partition(arr, low, high);
                    quickSort(arr, low, pi - 1);
                    quickSort(arr, pi + 1, high);
                }
            }
        }

        function partition(arr, low, high) {
            let pivot = arr[high];
            let i = low - 1;
            for (let j = low; j < high; j++) {
                operations++;
                if (arr[j] < pivot) {
                    i++;
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                }
            }
            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
            return i + 1;
        }

        function insertionSort(arr, low, high) {
            for (let i = low + 1; i <= high; i++) {
                let key = arr[i];
                let j = i - 1;
                while (j >= low && arr[j] > key) {
                    operations++;
                    arr[j + 1] = arr[j];
                    j--;
                }
                arr[j + 1] = key;
            }
        }

        quickSort(arr, 0, arr.length - 1);
        return { sortedArray: arr, operations };
    },
    hybridMergeInsertionSort: function(arr, k = 10) {
        let operations = 0;

        function mergeSort(arr, left, right) {
            if (right - left <= k) {
                insertionSort(arr, left, right);
            } else {
                const mid = Math.floor((left + right) / 2);
                mergeSort(arr, left, mid);
                mergeSort(arr, mid + 1, right);
                merge(arr, left, mid, right);
            }
        }

        function merge(arr, left, mid, right) {
            const n1 = mid - left + 1;
            const n2 = right - mid;
            const leftArr = new Array(n1);
            const rightArr = new Array(n2);

            for (let i = 0; i < n1; i++) leftArr[i] = arr[left + i];
            for (let i = 0; i < n2; i++) rightArr[i] = arr[mid + 1 + i];

            let i = 0, j = 0, k = left;
            while (i < n1 && j < n2) {
                operations++;
                if (leftArr[i] <= rightArr[j]) {
                    arr[k] = leftArr[i];
                    i++;
                } else {
                    arr[k] = rightArr[j];
                    j++;
                }
                k++;
            }

            while (i < n1) {
                arr[k] = leftArr[i];
                i++;
                k++;
            }

            while (j < n2) {
                arr[k] = rightArr[j];
                j++;
                k++;
            }
        }

        function insertionSort(arr, left, right) {
            for (let i = left + 1; i <= right; i++) {
                let key = arr[i];
                let j = i - 1;
                while (j >= left && arr[j] > key) {
                    operations++;
                    arr[j + 1] = arr[j];
                    j--;
                }
                arr[j + 1] = key;
            }
        }

        mergeSort(arr, 0, arr.length - 1);
        return { sortedArray: arr, operations };
    },
    quickSortRandomPivot: function(arr) {
        let operations = 0;

        function quickSort(arr, low, high) {
            if (low < high) {
                let pi = partition(arr, low, high);
                quickSort(arr, low, pi - 1);
                quickSort(arr, pi + 1, high);
            }
        }

        function partition(arr, low, high) {
            let randomIndex = low + Math.floor(Math.random() * (high - low + 1));
            [arr[randomIndex], arr[high]] = [arr[high], arr[randomIndex]];
            let pivot = arr[high];
            let i = low - 1;
            for (let j = low; j < high; j++) {
                operations++;
                if (arr[j] < pivot) {
                    i++;
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                }
            }
            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
            return i + 1;
        }

        quickSort(arr, 0, arr.length - 1);
        return { sortedArray: arr, operations };
    },
    quickSortMedianOfThree: function(arr) {
        let operations = 0;

        function quickSort(arr, low, high) {
            if (low < high) {
                let pi = partition(arr, low, high);
                quickSort(arr, low, pi - 1);
                quickSort(arr, pi + 1, high);
            }
        }

        function partition(arr, low, high) {
            let mid = Math.floor((low + high) / 2);
            let pivotIndex = medianOfThree(arr, low, mid, high);
            [arr[pivotIndex], arr[high]] = [arr[high], arr[pivotIndex]];
            let pivot = arr[high];
            let i = low - 1;
            for (let j = low; j < high; j++) {
                operations++;
                if (arr[j] < pivot) {
                    i++;
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                }
            }
            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
            return i + 1;
        }

        function medianOfThree(arr, low, mid, high) {
            let a = arr[low], b = arr[mid], c = arr[high];
            if ((a > b) !== (a > c)) return low;
            else if ((b > a) !== (b > c)) return mid;
            else return high;
        }

        quickSort(arr, 0, arr.length - 1);
        return { sortedArray: arr, operations };
    }
};

const arraySize = 1000;
function generateRandomArray(size) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
}
const randomArray = generateRandomArray(arraySize);
const results = Object.keys(algorithms).map(name => ({
    algorithm_name: name,
    time: measurePerformance(algorithms[name], randomArray)
}));

const arrayInfo = document.createElement('div');
arrayInfo.style.marginTop = '20px';
arrayInfo.innerText = `Array Size: ${arraySize}\nArray: [${randomArray.join(', ')}]`;
container.appendChild(arrayInfo);

const scaleFactor = 0.01;
results.forEach(result => {
    const { sortedArray, operations } = algorithms[result.algorithm_name](randomArray);
    const bar = document.createElement('div');
    bar.style.height = `${operations * scaleFactor}px`;
    bar.style.width = '100px';
    bar.style.margin = '0 10px';
    bar.style.background = `linear-gradient(to top, lightgray, ${getRandomColor()})`;
    bar.style.textAlign = 'center';
    bar.style.color = 'white';
    bar.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.76)';
    bar.innerText = `${result.algorithm_name}\n${operations} ops \n in ${result.time.toFixed(2)} ms`;
    container.appendChild(bar);
});

function measurePerformance(algorithm, array) {
    const start = performance.now();
    algorithm([...array]);
    const end = performance.now();
    return end - start;
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
