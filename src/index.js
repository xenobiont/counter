import { BehaviorSubject, take } from 'rxjs';

// Implement the counter
let counter = 0;

// Create a subject to emit the counter values
const counter$ = new BehaviorSubject(counter);

// Function to increment the counter and emit the updated value
function incrementCounter() {
	counter = counter + 1;
	counter$.next(counter);
}

// Start the counter by invoking the incrementCounter function every second
const counterInterval = setInterval(incrementCounter, 1000);

// Subscribe to the counter subject to receive the updated values
counter$.subscribe((value) => {
	console.log('Counter sub1:', value);
});

counter$.pipe(take(3)).subscribe((value) => {
	// by using take we log only 3 counter values here, but it will continur to tick in firs subscription
	console.log('Counter sub2:', value);
});

setTimeout(() => clearInterval(counterInterval), 5000); // this will stop counter ticking in both subscriptions, but we'll be able to resume it later

setTimeout(() => counter$.complete(), 5000); // if we complete the subject, we won;t be able to emit new values anymore
setTimeout(() => setInterval(incrementCounter, 1000), 7000);
