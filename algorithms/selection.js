

//
// Modern Selection Sort Implementation
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

window._selectionSort = async function (arr, api) {
    const {
        highlightCompare,
        unhighlightCompare,
        swapBars,
        setBarHeight,
        sleep,
        markSorted
    } = api;

    let n = arr.length;

    for (let i = 0; i < n; i++) {
        let minIndex = i;

        for (let j = i + 1; j < n; j++) {

            await highlightCompare(minIndex, j);

            if (arr[j] < arr[minIndex]) {
                unhighlightCompare(minIndex, j);
                minIndex = j;
                await highlightCompare(i, minIndex);
            }

            await sleep(speed / 1.5);
            unhighlightCompare(minIndex, j);
        }

        // Swap the found minimum element with the element at index i
        if (minIndex !== i) {
            let temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;

            await swapBars(i, minIndex);
        }

        // Mark this position as sorted
        markSorted(i);
    }
};