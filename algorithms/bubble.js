

//
// Modern Bubble Sort Implementation
// Uses animation helpers provided by script.js
//

/*
Expected helpers provided from script.js:

highlightCompare(i, j)
unhighlightCompare(i, j)
swapBars(i, j)
setBarHeight(index, value)
sleep(ms)
markSorted(index)
*/

window._bubbleSort = async function (arr, api) {
    const {
        highlightCompare,
        unhighlightCompare,
        swapBars,
        setBarHeight,
        sleep,
        markSorted
    } = api;

    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {

            await highlightCompare(j, j + 1);

            if (arr[j] > arr[j + 1]) {
                // Swap in array
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;

                // Visual swap
                await swapBars(j, j + 1);
            }

            unhighlightCompare(j, j + 1);
        }

        // Mark last element of this pass sorted
        markSorted(n - i - 1);
    }

    // Mark the first element sorted
    markSorted(0);
};