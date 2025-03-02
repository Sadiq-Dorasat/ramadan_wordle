// This file loads the comprehensive word list from wordle-words.txt
let WORD_LIST = {};

// Function to show the loading indicator
function showLoadingIndicator() {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'block';
    }
}

// Function to hide the loading indicator
function hideLoadingIndicator() {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
    }
}

// Function to update the word count
function updateWordCount(count) {
    const wordCount = document.getElementById('word-count');
    if (wordCount) {
        wordCount.textContent = count;
    }
}

// Function to load the word list from the text file
async function loadWordList() {
    showLoadingIndicator();
    
    try {
        const response = await fetch('../wordle-words.txt');
        if (!response.ok) {
            throw new Error('Failed to load word list');
        }
        
        const text = await response.text();
        const words = text.split('\n').filter(word => word.trim().length === 5);
        
        // Convert to dictionary format for faster lookups
        words.forEach(word => {
            WORD_LIST[word.toLowerCase().trim()] = true;
        });
        
        const wordCount = Object.keys(WORD_LIST).length;
        updateWordCount(wordCount);
        console.log(`Loaded ${wordCount} words from word list`);
        
        // Dispatch an event to notify that the word list is loaded
        window.dispatchEvent(new CustomEvent('wordlist-loaded', { 
            detail: { count: wordCount } 
        }));
        
        // Hide loading indicator after a short delay
        setTimeout(hideLoadingIndicator, 1000);
    } catch (error) {
        console.error('Error loading word list:', error);
        // Fallback: Try loading from the same directory
        try {
            const fallbackResponse = await fetch('./wordle-words.txt');
            if (!fallbackResponse.ok) {
                throw new Error('Failed to load word list from fallback location');
            }
            
            const fallbackText = await fallbackResponse.text();
            const fallbackWords = fallbackText.split('\n').filter(word => word.trim().length === 5);
            
            // Convert to dictionary format for faster lookups
            fallbackWords.forEach(word => {
                WORD_LIST[word.toLowerCase().trim()] = true;
            });
            
            const wordCount = Object.keys(WORD_LIST).length;
            updateWordCount(wordCount);
            console.log(`Loaded ${wordCount} words from fallback word list`);
            
            // Dispatch an event to notify that the word list is loaded
            window.dispatchEvent(new CustomEvent('wordlist-loaded', { 
                detail: { count: wordCount } 
            }));
            
            // Hide loading indicator after a short delay
            setTimeout(hideLoadingIndicator, 1000);
        } catch (fallbackError) {
            console.error('Error loading fallback word list:', fallbackError);
            hideLoadingIndicator();
        }
    }
}

// Load the word list when the script is loaded
document.addEventListener('DOMContentLoaded', loadWordList);

// Function to check if a word is in the comprehensive word list
function isInWordList(word) {
    return WORD_LIST[word.toLowerCase()] === true;
} 