document.addEventListener('DOMContentLoaded', () => {
    // Game state
    let currentRow = 0;
    let currentTile = 0;
    let gameOver = false;
    let currentWord = "";
    let currentWordObj = null;
    let guessedWords = [];
    
    // Statistics
    let statistics = loadStatistics();
    
    // Initialize the game
    initializeGame();
    
    function initializeGame() {
        // Clear any existing game state that might be causing issues
        resetGameBoard();
        
        // Check if the game has already been played today
        checkDailyGame();
        
        // Create the game board
        createBoard();
        
        // Add event listeners for keyboard input
        addKeyboardListeners();
        
        // Add event listeners for on-screen keyboard
        addVirtualKeyboardListeners();
        
        // Add event listeners for modal
        addModalListeners();
        
        // Add event listeners for statistics modal
        addStatisticsModalListeners();
        
        // Add event listener for statistics button
        const statsButton = document.getElementById('statistics-button');
        if (statsButton) {
            statsButton.addEventListener('click', showStatistics);
        }
        
        // Show a message when the word list is loaded
        window.addEventListener('wordlist-loaded', function(e) {
            if (e.detail && e.detail.count) {
                showMessage(`Loaded ${e.detail.count} words for validation`);
            }
        });
    }
    
    function resetGameBoard() {
        // Clear any existing board content
        const board = document.getElementById('board');
        if (board) {
            board.innerHTML = '';
        }
        
        // Reset keyboard styling
        const keys = document.querySelectorAll('.keyboard-row button');
        keys.forEach(key => {
            key.className = '';
            if (key.getAttribute('data-key') === 'enter' || key.getAttribute('data-key') === 'del') {
                key.classList.add('wide-button');
            }
        });
    }
    
    function checkDailyGame() {
        const today = new Date().toLocaleDateString();
        const lastPlayed = localStorage.getItem('lastPlayed');
        const completedToday = localStorage.getItem('completedToday');
        
        // Get today's word based on the date
        currentWordObj = getWordForToday();
        currentWord = currentWordObj.word;
        
        // Check if there's a saved game state
        const savedState = JSON.parse(localStorage.getItem('gameState') || '{}');
        
        // If there's a saved state for today's word, restore it
        if (savedState.currentWord === currentWord && savedState.guesses && savedState.guesses.length > 0) {
            // Will restore the game state after board creation
            setTimeout(() => {
                restoreGameState(savedState);
            }, 100);
        } else if (lastPlayed === today && completedToday === 'true') {
            // If the game was completed today but we don't have a matching saved state,
            // this might be a different device or browser. Just show the statistics.
            setTimeout(() => {
                showStatistics();
            }, 500);
        }
    }
    
    function getWordForToday() {
        // Get a word based on the date (same word for everyone on the same day)
        const today = new Date();
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        const wordIndex = dayOfYear % WORDS.length;
        return WORDS[wordIndex];
    }
    
    function createBoard() {
        const board = document.getElementById('board');
        
        // Create 6 rows (attempts)
        for (let i = 0; i < 6; i++) {
            const row = document.createElement('div');
            row.classList.add('row');
            
            // Create 5 tiles per row
            for (let j = 0; j < 5; j++) {
                const tile = document.createElement('div');
                tile.classList.add('tile');
                tile.setAttribute('data-row', i);
                tile.setAttribute('data-col', j);
                row.appendChild(tile);
            }
            
            board.appendChild(row);
        }
    }
    
    function addKeyboardListeners() {
        document.addEventListener('keydown', handleKeyPress);
    }
    
    function addVirtualKeyboardListeners() {
        const keys = document.querySelectorAll('.keyboard-row button');
        keys.forEach(key => {
            key.addEventListener('click', () => {
                const keyValue = key.getAttribute('data-key');
                handleVirtualKeyPress(keyValue);
            });
        });
    }
    
    function addModalListeners() {
        const modal = document.getElementById('modal');
        const closeButton = document.querySelector('.close-button');
        const playAgainButton = document.getElementById('play-again');
        const statsButton = document.getElementById('show-stats');
        
        closeButton.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
        
        playAgainButton.addEventListener('click', () => {
            modal.classList.add('hidden');
            // We don't reset the game - it stays completed until tomorrow
        });
        
        if (statsButton) {
            statsButton.addEventListener('click', () => {
                modal.classList.add('hidden');
                showStatistics();
            });
        }
        
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.classList.add('hidden');
            }
        });
    }
    
    function addStatisticsModalListeners() {
        const statsModal = document.getElementById('statistics-modal');
        if (!statsModal) return;
        
        const closeStatsButton = document.querySelector('#statistics-modal .close-button');
        const shareButton = document.getElementById('share-button');
        
        if (closeStatsButton) {
            closeStatsButton.addEventListener('click', () => {
                statsModal.classList.add('hidden');
            });
        }
        
        if (shareButton) {
            shareButton.addEventListener('click', () => {
                shareResults();
            });
        }
        
        window.addEventListener('click', (event) => {
            if (event.target === statsModal) {
                statsModal.classList.add('hidden');
            }
        });
    }
    
    function handleKeyPress(e) {
        if (gameOver) return;
        
        const key = e.key.toLowerCase();
        
        if (key === 'enter') {
            submitWord();
        } else if (key === 'backspace') {
            deleteLetter();
        } else if (/^[a-z]$/.test(key)) {
            addLetter(key);
        }
    }
    
    function handleVirtualKeyPress(key) {
        if (gameOver) return;
        
        if (key === 'enter') {
            submitWord();
        } else if (key === 'del') {
            deleteLetter();
        } else {
            addLetter(key);
        }
    }
    
    function addLetter(letter) {
        if (currentTile < 5 && currentRow < 6) {
            const tile = document.querySelector(`[data-row="${currentRow}"][data-col="${currentTile}"]`);
            tile.textContent = letter.toUpperCase();
            tile.setAttribute('data-letter', letter.toUpperCase());
            guessedWords[currentRow] = (guessedWords[currentRow] || '') + letter.toUpperCase();
            currentTile++;
            
            // Save game state after adding a letter
            saveGameState();
        }
    }
    
    function deleteLetter() {
        if (currentTile > 0) {
            currentTile--;
            const tile = document.querySelector(`[data-row="${currentRow}"][data-col="${currentTile}"]`);
            tile.textContent = '';
            tile.removeAttribute('data-letter');
            guessedWords[currentRow] = guessedWords[currentRow].slice(0, -1);
            
            // Save game state after deleting a letter
            saveGameState();
        }
    }
    
    function isValidEnglishWord(word) {
        // Check if word is 5 letters
        if (word.length !== 5) {
            return false;
        }
        
        // Check if it's in our Islamic word list
        if (isValidWord(word)) {
            return true;
        }
        
        // Check if it's in our English dictionary
        if (DICTIONARY[word.toLowerCase()]) {
            return true;
        }
        
        // Check if it's in our comprehensive word list
        if (typeof isInWordList === 'function' && isInWordList(word)) {
            return true;
        }
        
        // Not a valid word
        return false;
    }
    
    function submitWord() {
        if (currentTile !== 5) {
            showMessage("Word must be 5 letters");
            shakeRow();
            return;
        }
        
        const guess = guessedWords[currentRow];
        
        // Check if the word is valid (in dictionary or Islamic word list)
        if (!isValidEnglishWord(guess)) {
            showMessage("Not a valid word");
            shakeRow();
            return;
        }
        
        // Check the word
        checkWord(guess);
        
        // Move to next row
        currentRow++;
        currentTile = 0;
        
        // Save the current game state
        saveGameState();
        
        // Check if game is over
        if (guess === currentWord) {
            gameOver = true;
            markGameCompleted();
            // Show a brief message
            showMessage("Correct! Well done!");
        } else if (currentRow === 6) {
            gameOver = true;
            markGameCompleted();
            // Show a brief message
            showMessage(`The word was ${currentWord}`);
        }
    }
    
    function checkWord(guess) {
        const row = document.querySelectorAll(`[data-row="${currentRow}"]`);
        
        // Apply animations to reveal the colors
        applyWordColorsWithAnimation(guess, currentRow);
    }
    
    // Function to apply colors with animation
    function applyWordColorsWithAnimation(guess, rowIndex) {
        const row = document.querySelectorAll(`[data-row="${rowIndex}"]`);
        const letterCounts = {};
        
        // Count letters in the current word
        for (const letter of currentWord) {
            letterCounts[letter] = (letterCounts[letter] || 0) + 1;
        }
        
        // First pass: Mark correct letters
        for (let i = 0; i < 5; i++) {
            const tile = row[i];
            const letter = tile.getAttribute('data-letter');
            
            if (letter === currentWord[i]) {
                setTimeout(() => {
                    tile.classList.add('flip');
                    setTimeout(() => {
                        tile.classList.add('correct');
                        updateKeyboard(letter, 'correct');
                    }, 250);
                }, i * 100);
                
                letterCounts[letter]--;
            }
        }
        
        // Second pass: Mark present or absent letters
        for (let i = 0; i < 5; i++) {
            const tile = row[i];
            const letter = tile.getAttribute('data-letter');
            
            // Skip already marked correct letters
            if (letter === currentWord[i]) continue;
            
            setTimeout(() => {
                tile.classList.add('flip');
                setTimeout(() => {
                    if (currentWord.includes(letter) && letterCounts[letter] > 0) {
                        tile.classList.add('present');
                        updateKeyboard(letter, 'present');
                        letterCounts[letter]--;
                    } else {
                        tile.classList.add('absent');
                        updateKeyboard(letter, 'absent');
                    }
                }, 250);
            }, i * 100);
        }
    }
    
    function updateKeyboard(letter, status) {
        const key = document.querySelector(`[data-key="${letter.toLowerCase()}"]`);
        
        if (!key) return;
        
        // Only update if the new status is more important
        // correct > present > absent
        if (status === 'correct') {
            key.className = ''; // Remove all classes
            key.classList.add('correct');
        } else if (status === 'present' && !key.classList.contains('correct')) {
            key.className = ''; // Remove all classes
            key.classList.add('present');
        } else if (status === 'absent' && !key.classList.contains('correct') && !key.classList.contains('present')) {
            key.className = ''; // Remove all classes
            key.classList.add('absent');
        }
    }
    
    function showMessage(message) {
        const messageContainer = document.getElementById('message-container');
        messageContainer.textContent = message;
        
        setTimeout(() => {
            messageContainer.textContent = '';
        }, 2000);
    }
    
    function shakeRow() {
        const row = document.querySelector(`[data-row="${currentRow}"]`);
        row.classList.add('shake');
        
        setTimeout(() => {
            row.classList.remove('shake');
        }, 500);
    }
    
    function showModal(title, message, isWin) {
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modal-title');
        const modalMessage = document.getElementById('modal-message');
        const wordDefinition = document.getElementById('word-definition');
        const playAgainButton = document.getElementById('play-again');
        
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        wordDefinition.textContent = `${currentWord}: ${getWordDefinition(currentWord)}`;
        
        // Change the play again button text since it's a daily game
        playAgainButton.textContent = "Close";
        
        // Add a button to show statistics
        const statsButton = document.createElement('button');
        statsButton.id = 'show-stats';
        statsButton.textContent = 'Show Statistics';
        statsButton.addEventListener('click', () => {
            modal.classList.add('hidden');
            showStatistics();
        });
        
        // Add the stats button after the play again button
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'buttons-container';
        buttonsContainer.appendChild(playAgainButton);
        buttonsContainer.appendChild(statsButton);
        
        // Replace the play again button with the buttons container
        const oldPlayAgainButton = document.getElementById('play-again');
        if (oldPlayAgainButton) {
            oldPlayAgainButton.parentNode.replaceChild(buttonsContainer, oldPlayAgainButton);
        }
        
        modal.classList.remove('hidden');
    }
    
    function markGameCompleted() {
        // Mark the game as completed for today
        localStorage.setItem('lastPlayed', new Date().toLocaleDateString());
        localStorage.setItem('completedToday', 'true');
        
        // Update statistics
        if (gameOver) {
            updateStatistics();
            
            // Show statistics automatically after a short delay
            setTimeout(() => {
                showStatistics();
            }, 1500); // Wait for the tile animations to complete
        }
        
        saveGameState();
    }
    
    function saveGameState() {
        // Save the current game state
        const gameState = {
            currentRow,
            currentTile,
            gameOver,
            currentWord,
            guesses: guessedWords,
            keyboardState: getKeyboardState()
        };
        
        localStorage.setItem('gameState', JSON.stringify(gameState));
    }
    
    function getKeyboardState() {
        const keyboardState = {};
        const keys = document.querySelectorAll('.keyboard-row button');
        
        keys.forEach(key => {
            const letter = key.getAttribute('data-key');
            if (key.classList.contains('correct')) {
                keyboardState[letter] = 'correct';
            } else if (key.classList.contains('present')) {
                keyboardState[letter] = 'present';
            } else if (key.classList.contains('absent')) {
                keyboardState[letter] = 'absent';
            }
        });
        
        return keyboardState;
    }
    
    function restoreGameState(savedState) {
        // Restore the game state from localStorage
        currentRow = savedState.currentRow || 0;
        currentTile = savedState.currentTile || 0;
        gameOver = savedState.gameOver || false;
        
        // Restore the guesses
        if (savedState.guesses && savedState.guesses.length > 0) {
            guessedWords = savedState.guesses;
            
            // Restore the board
            for (let i = 0; i < savedState.guesses.length; i++) {
                const guess = savedState.guesses[i];
                if (!guess) continue;
                
                // Fill in the letters
                for (let j = 0; j < guess.length; j++) {
                    const tile = document.querySelector(`[data-row="${i}"][data-col="${j}"]`);
                    if (tile) {
                        tile.textContent = guess[j];
                        tile.setAttribute('data-letter', guess[j]);
                    }
                }
                
                // Check the word to apply colors
                if (guess.length === 5) {
                    applyWordColors(guess, i);
                }
            }
        }
        
        // Restore keyboard state
        if (savedState.keyboardState) {
            Object.entries(savedState.keyboardState).forEach(([letter, status]) => {
                const key = document.querySelector(`[data-key="${letter}"]`);
                if (key) {
                    key.className = '';
                    if (letter === 'enter' || letter === 'del') {
                        key.classList.add('wide-button');
                    }
                    if (status) {
                        key.classList.add(status);
                    }
                }
            });
        }
        
        // If the game was over, show a brief message
        if (gameOver) {
            const lastGuess = guessedWords[guessedWords.length - 1];
            const won = lastGuess === currentWord;
            
            setTimeout(() => {
                if (won) {
                    showMessage("You won this game!");
                } else {
                    showMessage(`The word was ${currentWord}`);
                }
                
                // Show statistics after a short delay
                setTimeout(() => {
                    showStatistics();
                }, 1500);
            }, 1000);
        }
    }
    
    // New function to apply colors to a word without animations
    function applyWordColors(guess, rowIndex) {
        const row = document.querySelectorAll(`[data-row="${rowIndex}"]`);
        const letterCounts = {};
        
        // Count letters in the current word
        for (const letter of currentWord) {
            letterCounts[letter] = (letterCounts[letter] || 0) + 1;
        }
        
        // First pass: Mark correct letters
        for (let i = 0; i < 5; i++) {
            const tile = row[i];
            const letter = tile.getAttribute('data-letter');
            
            if (letter === currentWord[i]) {
                tile.classList.add('correct');
                updateKeyboard(letter, 'correct');
                letterCounts[letter]--;
            }
        }
        
        // Second pass: Mark present or absent letters
        for (let i = 0; i < 5; i++) {
            const tile = row[i];
            const letter = tile.getAttribute('data-letter');
            
            // Skip already marked correct letters
            if (letter === currentWord[i]) continue;
            
            if (currentWord.includes(letter) && letterCounts[letter] > 0) {
                tile.classList.add('present');
                updateKeyboard(letter, 'present');
                letterCounts[letter]--;
            } else {
                tile.classList.add('absent');
                updateKeyboard(letter, 'absent');
            }
        }
    }
    
    // Statistics functions
    function loadStatistics() {
        const stats = JSON.parse(localStorage.getItem('statistics') || '{"played":0,"wins":0,"currentStreak":0,"maxStreak":0,"guesses":{}}');
        
        // Initialize guesses if not present
        if (!stats.guesses) {
            stats.guesses = {
                "1": 0,
                "2": 0,
                "3": 0,
                "4": 0,
                "5": 0,
                "6": 0
            };
        }
        
        return stats;
    }
    
    function updateStatistics() {
        // Increment games played
        statistics.played++;
        
        const lastGuess = guessedWords[guessedWords.length - 1];
        const won = lastGuess === currentWord;
        
        if (won) {
            // Increment wins
            statistics.wins++;
            
            // Increment current streak
            statistics.currentStreak++;
            
            // Update max streak
            if (statistics.currentStreak > statistics.maxStreak) {
                statistics.maxStreak = statistics.currentStreak;
            }
            
            // Update guess distribution
            const numGuesses = guessedWords.length.toString();
            statistics.guesses[numGuesses] = (statistics.guesses[numGuesses] || 0) + 1;
        } else {
            // Reset current streak
            statistics.currentStreak = 0;
        }
        
        // Save statistics
        localStorage.setItem('statistics', JSON.stringify(statistics));
    }
    
    function showStatistics() {
        // Create or get the statistics modal
        let statsModal = document.getElementById('statistics-modal');
        
        if (!statsModal) {
            // Create the modal if it doesn't exist
            statsModal = document.createElement('div');
            statsModal.id = 'statistics-modal';
            statsModal.className = 'modal';
            
            document.body.appendChild(statsModal);
        }
        
        // Calculate win percentage
        const winPercentage = statistics.played > 0 ? Math.round((statistics.wins / statistics.played) * 100) : 0;
        
        // Find the maximum value in the guess distribution
        const maxGuesses = Math.max(...Object.values(statistics.guesses));
        
        // Calculate time until next word
        const nextWordTime = getTimeUntilNextWord();
        
        // Create the modal content
        statsModal.innerHTML = `
            <div class="modal-content statistics-content">
                <span class="close-button">&times;</span>
                
                ${gameOver ? `
                <div class="word-info">
                    <h2 class="word-title">${currentWord}</h2>
                    <p class="word-meaning">${getWordDefinition(currentWord)}</p>
                </div>
                <div class="divider"></div>
                ` : ''}
                
                <h2>STATISTICS</h2>
                <div class="statistics-container">
                    <div class="statistic">
                        <div class="statistic-value">${statistics.played}</div>
                        <div class="statistic-label">Played</div>
                    </div>
                    <div class="statistic">
                        <div class="statistic-value">${winPercentage}</div>
                        <div class="statistic-label">Win %</div>
                    </div>
                    <div class="statistic">
                        <div class="statistic-value">${statistics.currentStreak}</div>
                        <div class="statistic-label">Current Streak</div>
                    </div>
                    <div class="statistic">
                        <div class="statistic-value">${statistics.maxStreak}</div>
                        <div class="statistic-label">Max Streak</div>
                    </div>
                </div>
                
                <h2>GUESS DISTRIBUTION</h2>
                <div class="guess-distribution">
                    ${Object.entries(statistics.guesses).map(([guess, count]) => {
                        const percentage = maxGuesses > 0 ? (count / maxGuesses) * 100 : 0;
                        const isCurrentGame = gameOver && guessedWords.length.toString() === guess && guessedWords[guessedWords.length - 1] === currentWord;
                        return `
                            <div class="guess-row">
                                <div class="guess-number">${guess}</div>
                                <div class="guess-bar-container">
                                    <div class="guess-bar ${isCurrentGame ? 'current-game' : ''}" style="width: ${percentage}%">
                                        <span>${count}</span>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
                
                <div class="next-game-container">
                    <h2>NEXT WORDLE</h2>
                    <div class="countdown" id="countdown">${nextWordTime}</div>
                </div>
                
                ${gameOver ? `
                    <div class="share-container">
                        <button id="share-button" class="share-button">
                            SHARE <i class="fas fa-share-alt"></i>
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
        
        // Show the modal
        statsModal.classList.remove('hidden');
        
        // Add event listeners
        addStatisticsModalListeners();
        
        // Start countdown timer
        if (gameOver) {
            startCountdown();
        }
    }
    
    function getTimeUntilNextWord() {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        
        const diffMs = tomorrow - now;
        const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const diffSecs = Math.floor((diffMs % (1000 * 60)) / 1000);
        
        return `${String(diffHrs).padStart(2, '0')}:${String(diffMins).padStart(2, '0')}:${String(diffSecs).padStart(2, '0')}`;
    }
    
    function startCountdown() {
        // Update the countdown every second
        const countdownInterval = setInterval(() => {
            const countdownElement = document.getElementById('countdown');
            if (countdownElement) {
                countdownElement.textContent = getTimeUntilNextWord();
            } else {
                clearInterval(countdownInterval);
            }
        }, 1000);
    }
    
    function shareResults() {
        if (!gameOver) return;
        
        // Get the share button
        const shareButton = document.getElementById('share-button');
        const originalText = shareButton.innerHTML;
        
        // Create emoji grid representation of the game
        let emojiGrid = `Ramadan Wordle ${new Date().toLocaleDateString()}\n`;
        
        // Add number of guesses
        const numGuesses = guessedWords.length;
        const won = guessedWords[numGuesses - 1] === currentWord;
        
        if (won) {
            emojiGrid += `Solved in ${numGuesses}/6 attempts\n\n`;
        } else {
            emojiGrid += `Failed to solve\n\n`;
        }
        
        // Add emoji grid
        for (let i = 0; i < numGuesses; i++) {
            const guess = guessedWords[i];
            const letterCounts = {};
            
            // Count letters in the current word
            for (const letter of currentWord) {
                letterCounts[letter] = (letterCounts[letter] || 0) + 1;
            }
            
            // First pass: Mark correct letters
            const rowEmojis = [];
            for (let j = 0; j < 5; j++) {
                const letter = guess[j];
                
                if (letter === currentWord[j]) {
                    rowEmojis.push('🟩'); // Green for correct position
                    letterCounts[letter]--;
                } else if (currentWord.includes(letter) && letterCounts[letter] > 0) {
                    rowEmojis.push('🟨'); // Yellow for correct letter, wrong position
                    letterCounts[letter]--;
                } else {
                    rowEmojis.push('⬛'); // Black for incorrect letter
                }
            }
            
            emojiGrid += rowEmojis.join('') + '\n';
        }
        
        // Add URL to the game
        emojiGrid += '\nPlay at: https://ramadan-wordle.vercel.app/';
        
        // Change button text to show copying in progress
        shareButton.innerHTML = 'Copying...';
        
        // Copy to clipboard
        navigator.clipboard.writeText(emojiGrid).then(() => {
            // Show success message on the button
            shareButton.innerHTML = 'COPIED! ✓';
            shareButton.classList.add('copied');
            
            // Reset button text after 2 seconds
            setTimeout(() => {
                shareButton.innerHTML = originalText;
                shareButton.classList.remove('copied');
            }, 2000);
        }).catch(err => {
            console.error('Could not copy text: ', err);
            
            // Fallback: show the text in a modal
            const shareTextArea = document.createElement('textarea');
            shareTextArea.value = emojiGrid;
            shareTextArea.setAttribute('readonly', '');
            shareTextArea.style.position = 'absolute';
            shareTextArea.style.left = '-9999px';
            
            document.body.appendChild(shareTextArea);
            shareTextArea.select();
            document.execCommand('copy');
            document.body.removeChild(shareTextArea);
            
            // Show success message on the button
            shareButton.innerHTML = 'COPIED! ✓';
            shareButton.classList.add('copied');
            
            // Reset button text after 2 seconds
            setTimeout(() => {
                shareButton.innerHTML = originalText;
                shareButton.classList.remove('copied');
            }, 2000);
        });
    }
    
    // Add CSS for shake animation
    const style = document.createElement('style');
    style.textContent = `
        .shake {
            animation: shake 0.5s;
        }
        
        @keyframes shake {
            0% { transform: translateX(0); }
            10% { transform: translateX(-5px); }
            20% { transform: translateX(5px); }
            30% { transform: translateX(-5px); }
            40% { transform: translateX(5px); }
            50% { transform: translateX(-5px); }
            60% { transform: translateX(5px); }
            70% { transform: translateX(-5px); }
            80% { transform: translateX(5px); }
            90% { transform: translateX(-5px); }
            100% { transform: translateX(0); }
        }
    `;
    document.head.appendChild(style);
});