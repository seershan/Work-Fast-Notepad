document.addEventListener("DOMContentLoaded", function() {
    const note = document.getElementById('note');
    const downloadBtn = document.getElementById('downloadBtn');
    const wordCount = document.getElementById('wordCount');
    const letterCount = document.getElementById('letterCount');
    const dateInput = document.getElementById('date');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Load saved note from localStorage
    if (localStorage.getItem('note')) {
        note.value = localStorage.getItem('note');
        updateCounts();
    }

    // Load dark mode preference from localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
    }

    // Save note to localStorage
    const saveNote = function() {
        localStorage.setItem('note', note.value);
        alert('Note saved!');
    };

    // Download note as text file
    downloadBtn.addEventListener('click', function() {
        const blob = new Blob([note.value], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `note_${dateInput.value}.txt`;
        link.click();
    });

    // Update word and letter counts
    note.addEventListener('input', updateCounts);

    function updateCounts() {
        const text = note.value;
        wordCount.textContent = 'Words: ' + (text.trim() ? text.trim().split(/\s+/).length : 0);
        letterCount.textContent = 'Letters: ' + text.replace(/\s/g, '').length;
    }

    // Toggle dark mode
    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        // Save dark mode preference to localStorage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.removeItem('darkMode');
        }
    });

    // Share note via email
    const shareBtn = document.getElementById('shareBtn');
    shareBtn.addEventListener('click', function() {
        const noteContent = note.value;
        const subject = "Check out this note!";
        const body = noteContent;
        const mailToLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailToLink;
    });

    // Copy note to clipboard
    const copyBtn = document.getElementById('copyBtn');
    copyBtn.addEventListener('click', function() {
        note.select();
        document.execCommand('copy');
        alert('Note copied to clipboard!');
    });

    // Bold, Italic, Underline functionality
    const boldBtn = document.getElementById('boldBtn');
    const italicBtn = document.getElementById('italicBtn');
    const underlineBtn = document.getElementById('underlineBtn');

    boldBtn.addEventListener('click', function() {
        note.style.fontWeight = note.style.fontWeight === 'bold' ? 'normal' : 'bold';
    });

    italicBtn.addEventListener('click', function() {
        note.style.fontStyle = note.style.fontStyle === 'italic' ? 'normal' : 'italic';
    });

    underlineBtn.addEventListener('click', function() {
        note.style.textDecoration = note.style.textDecoration === 'underline' ? 'none' : 'underline';
    });

    // Handle saving note when user navigates away from the page
    window.addEventListener('beforeunload', function() {
        saveNote();
    });
});


// Format note for email
const formatMailBtn = document.getElementById('formatMailBtn');
formatMailBtn.addEventListener('click', function() {
    const noteContent = note.value;
    const formattedNote = `Dear XXXX,\n\n${noteContent}\n\nRegards, YYYY`;
    note.value = formattedNote;
});


const undoBtn = document.getElementById('undoBtn');
const redoBtn = document.getElementById('redoBtn');
const note = document.getElementById('note');

let history = [];
let currentIndex = -1;

note.addEventListener('input', function() {
    // Push the current state to history
    if (currentIndex !== history.length - 1) {
        history = history.slice(0, currentIndex + 1);
    }
    history.push(note.value);
    currentIndex = history.length - 1;

    // Enable or disable undo and redo buttons
    undoBtn.disabled = currentIndex === 0;
    redoBtn.disabled = currentIndex === history.length - 1;
});

undoBtn.addEventListener('click', function() {
    if (currentIndex > 0) {
        currentIndex--;
        note.value = history[currentIndex];
        redoBtn.disabled = false;
    }
    undoBtn.disabled = currentIndex === 0;
});

redoBtn.addEventListener('click', function() {
    if (currentIndex < history.length - 1) {
        currentIndex++;
        note.value = history[currentIndex];
        undoBtn.disabled = false;
    }
    redoBtn.disabled = currentIndex === history.length - 1;
});
