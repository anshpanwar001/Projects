

//
// Modern Quick Sort Implementation
// Uses animation helpers provided by script.js
//

/*
API helpers expected from script.js:

highlightCompare(i, j)
unhighlightCompare(i, j)
swapBars(i, j)
setBarHeight(index, value)
sleep(ms)
markSorted(index)
*/

window._quickSort = async function (arr, api) {
    const {
        highlightCompare,
        unhighlightCompare,
        swapBars,
        setBarHeight,
        sleep,
        markSorted
    } = api;

    async function partition(low, high) {
        let pivot = arr[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {

            await highlightCompare(j, high);

            if (arr[j] < pivot) {
                i++;

                // Swap in array
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;

                // Visual swap
                await swapBars(i, j);
            }

            unhighlightCompare(j, high);
        }

        // Final pivot swap
        let temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;

        await swapBars(i + 1, high);

        return i + 1;
    }

    async function quickSort(low, high) {
        if (low < high) {
            let pi = await partition(low, high);
            await quickSort(low, pi - 1);
            await quickSort(pi + 1, high);
        }
    }

    await quickSort(0, arr.length - 1);

    // Mark all sorted
    for (let i = 0; i < arr.length; i++) {
        markSorted(i);
        await sleep(10);
    }
};