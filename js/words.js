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
    },
    {
        word: "JIHAD",
        definition: "A struggle or effort in the path of Allah."
    },
    {
        word: "IHRAM",
        definition: "The sacred state a Muslim enters for pilgrimage."
    },
    {
        word: "IJMAA",
        definition: "Consensus of Islamic scholars on a religious matter."
    },
    {
        word: "IHSAN",
        definition: "Excellence or perfection in faith and worship."
    },
    {
        word: "KAFIR",
        definition: "A non-believer or someone who rejects faith in Islam."
    },
    {
        word: "NAFIL",
        definition: "Optional or voluntary prayers."
    },
    {
        word: "HUDUD",
        definition: "Fixed punishments prescribed in Islamic law."
    },
    {
        word: "SIYAM",
        definition: "Fasting, especially during Ramadan."
    },
    {
        word: "FITRA",
        definition: "The natural state of purity and belief."
    },
    {
        word: "FARAJ",
        definition: "Relief or ease granted by Allah after hardship."
    },
    {
        word: "HOURI",
        definition: "The beautiful companions promised in Jannah."
    },
    {
        word: "QISAS",
        definition: "The Islamic law of retribution."
    },
    {
        word: "TAWAF",
        definition: "The act of circling the Kaaba during pilgrimage."
    },
    {
        word: "BARAK",
        definition: "Related to Barakah, meaning divine blessings."
    },
    {
        word: "DAWAH",
        definition: "The act of inviting others to Islam."
    },
    {
        word: "FADHL",
        definition: "Divine favor or virtue in Islamic context."
    },
    {
        word: "ILHAM",
        definition: "Divine inspiration or guidance from Allah."
    },
    {
        word: "RIDHA",
        definition: "Contentment and acceptance of Allah's will."
    },
    {
        word: "WADUD",
        definition: "One of Allah's names, meaning 'The Most Loving'."
    },
    {
        word: "ZAHRA",
        definition: "Meaning bright or radiant."
    },
    {
        word: "SAJDA",
        definition: "Prostration in prayer, an act of submission to Allah."
    },
    {
        word: "AHKAM",
        definition: "Islamic rulings or legal judgments."
    },
    {
        word: "ARAFA",
        definition: "Refers to the Day of Arafah during Hajj pilgrimage."
    },
    {
        word: "ASWAD",
        definition: "Meaning 'black', often referring to the Black Stone at the Kaaba."
    },
    {
        word: "ATHAN",
        definition: "Alternative spelling of Adhan, the Islamic call to prayer."
    },
    {
        word: "BAYAH",
        definition: "An oath of allegiance in Islamic governance."
    },
    {
        word: "BATIN",
        definition: "One of Allah's names, meaning 'The Hidden'."
    },
    {
        word: "DHAAL",
        definition: "Refers to someone who has gone astray or is misguided."
    },
    {
        word: "DINAR",
        definition: "A gold currency used in early Islamic history."
    },
    {
        word: "FURQN",
        definition: "A title of the Quran, meaning 'criterion'."
    },
    {
        word: "HAKAM",
        definition: "One of Allah's names, meaning 'The Judge'."
    },
    {
        word: "HASIB",
        definition: "One of Allah's names, meaning 'The Reckoner'."
    },
    {
        word: "HAYAT",
        definition: "Life in an Islamic context and understanding."
    },
    {
        word: "IKRAM",
        definition: "Honor or generosity in Islamic context."
    },
    {
        word: "ILAHI",
        definition: "Divine or belonging to Allah."
    },
    {
        word: "KAMIL",
        definition: "Perfect or complete in Islamic context."
    },
    {
        word: "LISAN",
        definition: "Tongue or language, as mentioned in the Quran."
    },
    {
        word: "SHIFA",
        definition: "Healing or cure, often referring to divine healing."
    },
    {
        word: "SALAH",
        definition: "Alternative spelling for prayer in Islam."
    },
    {
        word: "ULAMA",
        definition: "Islamic scholars or learned individuals."
    },
    {
        word: "SABAR",
        definition: "Alternative spelling of Sabr, meaning patience in Islam."
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