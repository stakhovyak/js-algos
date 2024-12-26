# Analysis of Hybrid Algorithms

## 1. Hybrid QuickSort with InsertionSort

```js

hybridQuickSort: function(arr, k = 10) {
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
}

```

- Average Case: (O(n \log n))
- Worst Case: (O(n^2)) (when the pivot selection is poor)
- Best Case: (O(n \log n))

### Worst Case

The worst case occurs when the pivot selection is poor, leading to unbalanced partitions. For example, if the pivot is always the smallest or largest element, the algorithm degrades to (O(n^2)).

### Best Case

The best case occurs when the pivot divides the array into two equal halves, leading to (O(n \log n)) performance.

## 2. Hybrid Merge-Insertion Sort

```js

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
}

```

- Average Case: (O(n \log n))
- Worst Case: (O(n \log n))
- Best Case: (O(n \log n))

### Worst Case

MergeSort always performs (O(n \log n)) operations regardless of the input. It requires additional space for the temporary arrays used during merging.

### Best Case

MergeSort also performs (O(n \log n)) operations in the best case.

## 3. QuickSort with Random Pivot

```js

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
}

```

- Average Case: (O(n \log n))
- Worst Case: (O(n^2)) (when the pivot selection is poor)
- Best Case: (O(n \log n))

### Worst Case

The worst case occurs when the pivot selection is poor, leading to unbalanced partitions. For example, if the pivot is always the smallest or largest element, the algorithm degrades to (O(n^2)).

### Best Case

The best case occurs when the pivot divides the array into two equal halves, leading to (O(n \log n)) performance.

## 4. QuickSort with Median of Three Pivot

```js

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

```

- Average Case: (O(n \log n))
- Worst Case: (O(n^2)) (when the pivot selection is poor)
- Best Case: (O(n \log n))

### Worst Case

The worst case occurs when the pivot selection is poor, leading to unbalanced partitions. For example, if the pivot is always the smallest or largest element, the algorithm degrades to (O(n^2)).

### Best Case

The best case occurs when the pivot divides the array into two equal halves, leading to (O(n \log n)) performance.

## Russian

в таком случае, Роль k (это порог для insertion sort)
При малых значениях k больше подпоследовательностей сортируются с использованием InsertionSort, что значительно снижает общее число операций на практическом уровне, поскольку InsertionSort эффективен на малых массивах.
При больших значениях k QuickSort будет доминировать, что увеличит число операций, особенно в худшем случае.
a mergesort всегда работает с гарантированной сложностью n*log(n) но на практике может быть медленнее quicksort изза того что нужно выделять временные массивы
random pivot уменьшает вероятность худшего случая но можнт внести лишние операции а версия с медианой уменьшает число разбиений особенно если массив изначально немного отсортирован, и получается более стабильно но выше вероятность худшего случая. Я так понял по крайней мере исходя из наблюдений