const process = require("process");

// Synchronous vs Asynchronous Javascript

// Sync JS always blocks the main thread
function add(a, b, cb) {
    cb(a + b);
}

function addAsync(a, b, cb) {
    process.nextTick(() => cb(a + b), 0);
}

function demoSyncExample() {
    // This is synchronous code
    // Each line is executed after the other
    // If a line blocks, we wait until a value is returned.
    console.log("Before sync op");
    add(23, 44, (v) => console.log(`23 + 44 = ${v}`));
    console.log("After sync op");
}

/**
 * This is an async alternative
 * If you notice the order of execution, it's not as expected
 *
 * In the async function, we use setTimeout which executes asynchronously.
 * `setTimeout` returns immediately and then pushes the callback to the event queue after n time
 * In our case, we use 0. Which is immediately but not too immediately
 * `setTimeout` is at the bottom of the "priority chain" for deferred execution along with
 *  `setImmediate` and `process.nexTick()` in that order going up. More on that later
 *
 * Back to our function, the moment `demoAsync()` calls `addAsync()` `setTimeout()` returns immediately and
 * control goes back to `demoAsync()` then after it returns the next instructions are popped from the event queue
 * then the callback issued to `setTimeout()` is executed.
 */
function demoAsyncExample() {
    console.log("Before async op");
    addAsync(10, 20, (v) => console.log(`10 + 20 = ${v}`));
    console.log("After async op");
}

demoSyncExample();
console.log("\n");
demoAsyncExample();

// Node uses callback mechanism to allow concurrency in a different manner
// In our example, if we waited longer, that wouldn't block the main thread, and other things would proceed.
// By making ops async, we basically allow for the thread to continue execution instead of waiting for some external
// data like a file read, database read or api call. Then do something after the data is available
// So waiting is off-loaded to another background thread

// Now that we know what async v sync is. How do we write async and sync code
