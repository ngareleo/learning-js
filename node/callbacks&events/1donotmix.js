const fs = require("fs");

// Now that we know what async v sync is. How do we write async and sync code
// Rule no 1: DO NOT mix async and sync code

const cache = new Map();

function inconsistentReadAsync(fln, cb) {
    if (cache.has(fln)) {
        // Here the callback is invoked synchronously
        console.log("[i0] Read from cache");
        cb(cache[fln]);
    } else {
        // Here read the file async
        fs.readFile(fln, "utf-8", (_, data) => {
            cache.set(fln, data);
            cb(data);
        });
    }
}

// now let demo this disaster
/**
 * `createFileReader()` defers execution of the callback we want to pass to readFileAsync
 *  and allows us to register multiple callbacks
 */

function createFileReader(fln) {
    const listeners = [];
    inconsistentReadAsync(fln, (value) => {
        listeners.forEach((l) => l(value));
    });
    return {
        onDataReady: (listener) => listeners.push(listener),
    };
}

/**
 *  You will see that only the first console.log logs something and the second one doesn't
 *  This inconsistent nature is caused by mixing async and sync ops
 *
 *  When we create r1, it hits an async path, `fs.readFile()` pushes the callback to event queue
 *  So when we execute the onDataReady, the callback is executed in another event cycle and data is ready to log
 *
 *  When we create r2, it hits the sync path because its a simple read from the map
 *  Then it returns immediately and the callback is executed immediately.
 *  so when we call `onDataReady()` the event loop has already moved onto other tasks and nothing is printed
 */
(() => {
    const r1 = createFileReader("sample.txt");
    r1.onDataReady((d) => {
        console.log("[l0] Data: ", d);
    });
    r1.onDataReady((d) => {
        console.log("[l1] Data: ", d);

        const r2 = createFileReader("sample.txt");
        r2.onDataReady((d) => {
            console.log("[l3] Data: ", d);
        });
    });
})();

// To fix this unpredictable behavior we need to turn `inconsistentRead()` into a sync or an async op

// Sync
function consistentReadSync(fln, cb) {
    if (cache.has(fln)) {
        return cache[fln];
    }
    const data = fs.readFileSync(fln, "utf-8"); // A call to `readFileSync()` blocks execution of main thread until data is resolved
    cache.set(fln, data);
    return data;
}

// Async
function consistentReadAsync(fln, cb) {
    if (cache.has(fln)) {
        /*  
process.nextTick() inserts the callback to the **top** of the event queue. Ahead of any other operation
We could also use setTimeout(cb, 0) or setImmediate(cb) but they operate differently. I'll explain shortly
        */
        process.nextTick(cb(cache[fln]));
    } else {
        fs.readFile(fln, "utf-8", (err, data) => {
            cache.set(fln, data);
            cb(data);
        });
    }
}
