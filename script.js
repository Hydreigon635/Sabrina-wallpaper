function updateDate() {
    const now = new Date();

    // Get the full day name (e.g., "Tuesday")
    // 'long' gives the full name, 'en-US' is the locale
    const dayName = now.toLocaleDateString('en-US', { weekday: 'long' });

    // Get the date (number) and month (full name)
    const dateNumber = now.getDate();
    const monthName = now.toLocaleDateString('en-US', { month: 'long' });

    // Format the date as "number month" (e.g., "30 September")
    const formattedDate = `${dateNumber} ${monthName}`;

    // Update the HTML elements
    // The CSS text-transform properties will handle the casing.
    document.getElementById('day-display').textContent = dayName;
    document.getElementById('date-display').textContent = formattedDate;
}

// 1. Initial call to display the date immediately
updateDate();

// 2. Set an interval to update the date every second (real-time)
// We use a second for more responsive real-time updating, though only day/date change once a day.
setInterval(updateDate, 1000);



// script.js (No changes needed, copy from previous response if you don't have it)

const audio = document.getElementById('audioPlayer');
const playPauseButton = document.getElementById('playPauseButton');
const progressBar = document.getElementById('progressBar');

// Function to update the background of the progress bar
function updateProgressBarFill() {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress || 0;

    // Create a linear gradient for the progress bar background
    // This creates the "pink line" effect
    progressBar.style.background = `linear-gradient(to right, hotpink ${progress}%, #ccc ${progress}%)`;
}

// --- 1. Play/Pause Toggle ---
playPauseButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseButton.textContent = '⏸'; // Change to Pause symbol
    } else {
        audio.pause();
        playPauseButton.textContent = '▶'; // Change back to Play symbol
    }
});

// --- 2. Update Progress Bar as Song Plays ---
audio.addEventListener('timeupdate', updateProgressBarFill); // Call our new function

// --- 3. Allow User to Seek (Scrub) ---
progressBar.addEventListener('input', () => {
    const newTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = newTime;
    updateProgressBarFill(); // Also update the fill immediately when seeking
});

// --- 4. Reset Button and Progress when Song Ends ---
audio.addEventListener('ended', () => {
    playPauseButton.textContent = '▶';
    audio.currentTime = 0; // Reset audio to start
    updateProgressBarFill(); // Reset the visual progress bar fill
});

// --- 5. Initial Setup (Set max value after metadata loads) ---
audio.addEventListener('loadedmetadata', () => {
    console.log(`Audio loaded. Duration: ${audio.duration} seconds.`);
    updateProgressBarFill(); // Set initial fill (0%)
});

// Call once on load to ensure the bar is styled correctly even before playback
updateProgressBarFill();