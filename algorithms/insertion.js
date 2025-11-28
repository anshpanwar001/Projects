

//
// Modern Insertion Sort Implementation
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

window._insertionSort = async function (arr, api) {
    const {
        highlightCompare,
        unhighlightCompare,
        setBarHeight,
        swapBars,
        sleep,
        markSorted
    } = api;

    let n = arr.length;

    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;

        // Highlight the current key bar
        await highlightCompare(i, j);

        while (j >= 0 && arr[j] > key) {

            await highlightCompare(j, j + 1);

            // Move element visually and logically
            arr[j + 1] = arr[j];
            setBarHeight(j + 1, arr[j]);

            await sleep(speed);

            unhighlightCompare(j, j + 1);
            j--;
        }

        // Insert key into correct position
        arr[j + 1] = key;
        setBarHeight(j + 1, key);

        unhighlightCompare(i, j + 1);
    }

    // Mark all sorted at the end
    for (let i = 0; i < n; i++) {
        markSorted(i);
        await sleep(10);
    }
};