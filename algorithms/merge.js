

//
// Modern Merge Sort Implementation
// Uses animation helpers provided by script.js
//

/*
API helpers expected from script.js:

highlightCompare(i, j)
unhighlightCompare(i, j)
setBarHeight(index, value)
swapBars(i, j)
sleep(ms)
markSorted(index)
*/

window._mergeSort = async function (arr, api) {
    const {
        highlightCompare,
        unhighlightCompare,
        setBarHeight,
        sleep,
        markSorted
    } = api;

    // Helper: merge two halves
    async function merge(left, mid, right) {
        let n1 = mid - left + 1;
        let n2 = right - mid;

        let L = [];
        let R = [];

        for (let i = 0; i < n1; i++) L.push(arr[left + i]);
        for (let j = 0; j < n2; j++) R.push(arr[mid + 1 + j]);

        let i = 0, j = 0, k = left;

        while (i < n1 && j < n2) {
            await highlightCompare(left + i, mid + 1 + j);

            await sleep(speed);

            if (L[i] <= R[j]) {
                arr[k] = L[i];
                setBarHeight(k, L[i]);
                i++;
            } else {
                arr[k] = R[j];
                setBarHeight(k, R[j]);
                j++;
            }

            unhighlightCompare(left + i - 1, mid + j);
            k++;
        }

        while (i < n1) {
            arr[k] = L[i];
            setBarHeight(k, L[i]);
            i++;
            k++;
            await sleep(speed / 2);
        }

        while (j < n2) {
            arr[k] = R[j];
            setBarHeight(k, R[j]);
            j++;
            k++;
            await sleep(speed / 2);
        }
    }

    // Recursive merge sort
    async function mergeSort(left, right) {
        if (left >= right) return;

        let mid = Math.floor((left + right) / 2);

        await mergeSort(left, mid);
        await mergeSort(mid + 1, right);

        await merge(left, mid, right);
    }

    await mergeSort(0, arr.length - 1);

    // Mark all sorted at end
    for (let i = 0; i < arr.length; i++) {
        markSorted(i);
        await sleep(10);
    }
};