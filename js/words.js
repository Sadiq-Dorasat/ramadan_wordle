// List of 5-letter Islamic/Ramadan-themed words
const WORDS = [
    {
        word: "QURAN",
        definition: "The holy book of Islam, revealed to Prophet Muhammad."
    },
    {
        word: "SALAT",
        definition: "The ritual prayer performed five times daily by Muslims."
    },
    {
        word: "SUHUR",
        definition: "The pre-dawn meal consumed before fasting during Ramadan."
    },
    {
        word: "IFTAR",
        definition: "The meal eaten at sunset to break the fast during Ramadan."
    },
    {
        word: "HALAL",
        definition: "Permissible according to Islamic law."
    },
    {
        word: "HARAM",
        definition: "Forbidden according to Islamic law."
    },
    {
        word: "IMAAN",
        definition: "Faith or belief in Islamic principles."
    },
    {
        word: "HAJJI",
        definition: "A person who has completed the pilgrimage to Mecca."
    },
    {
        word: "UMRAH",
        definition: "A pilgrimage to Mecca performed by Muslims that can be undertaken at any time of the year."
    },
    {
        word: "ZAKAT",
        definition: "Obligatory charity given by Muslims to those in need."
    },
    {
        word: "DUNYA",
        definition: "The temporal world or earthly existence in Islamic theology."
    },
    {
        word: "FAJIR",
        definition: "The dawn prayer, one of the five daily prayers in Islam."
    },
    {
        word: "DHIKR",
        definition: "The remembrance of Allah through devotional acts."
    },
    {
        word: "SADQA",
        definition: "Voluntary charity given by Muslims."
    },
    {
        word: "ALLAH",
        definition: "The Arabic word for God in Islam."
    },
    {
        word: "SURAH",
        definition: "A chapter of the Quran."
    },
    {
        word: "AYAAT",
        definition: "Verses of the Quran (plural of Ayah)."
    },
    {
        word: "JANNA",
        definition: "Paradise or heaven in Islamic belief."
    },
    {
        word: "QADAR",
        definition: "Divine predestination or fate in Islamic belief."
    },
    {
        word: "SABR",
        definition: "Patience and perseverance in Islam."
    },
    {
        word: "NIYAT",
        definition: "Intention before performing an act of worship in Islam."
    },
    {
        word: "DEEN",
        definition: "The Islamic way of life."
    },
    {
        word: "IMAN",
        definition: "Faith in Allah and Islamic principles."
    },
    {
        word: "DUAA",
        definition: "Supplication or prayer to Allah asking for help or guidance."
    },
    {
        word: "HIJAB",
        definition: "Modest dress worn by Muslim women."
    },
    {
        word: "QIBLA",
        definition: "The direction Muslims face during prayer (towards the Kaaba)."
    },
    {
        word: "SALAM",
        definition: "Peace; the Islamic greeting meaning 'peace be upon you'."
    },
    {
        word: "FATWA",
        definition: "A legal opinion or ruling issued by an Islamic scholar."
    },
    {
        word: "HAJJ",
        definition: "The annual Islamic pilgrimage to Mecca."
    },
    {
        word: "SAWM",
        definition: "Fasting, particularly during the month of Ramadan."
    },
    {
        word: "TAQWA",
        definition: "God-consciousness or piety in Islam."
    },
    {
        word: "ADHAN",
        definition: "The Islamic call to prayer."
    },
    {
        word: "AMEEN",
        definition: "A word said at the end of a prayer or supplication meaning 'O Allah, respond'."
    },
    {
        word: "BADR",
        definition: "The site of the first major battle between Muslims and Meccans."
    },
    {
        word: "FIQH",
        definition: "Islamic jurisprudence or understanding of Islamic law."
    }
];

// Function to get a random word from the list
function getRandomWord() {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
}

// Function to check if a word is in the list
function isValidWord(word) {
    return WORDS.some(item => item.word === word.toUpperCase());
}

// Function to get the definition of a word
function getWordDefinition(word) {
    const wordObj = WORDS.find(item => item.word === word.toUpperCase());
    return wordObj ? wordObj.definition : "";
}

// Export the functions for use in game.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WORDS, getRandomWord, isValidWord, getWordDefinition };
} 