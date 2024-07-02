const fs = require('fs');
const path = require('path');

const locales = {};

const loadLocales = () => {
    const localesPath = path.join(__dirname, 'locales');
    const files = fs.readdirSync(localesPath);
    files.forEach(file => {
        const language = path.basename(file, '.json');
        const content = fs.readFileSync(path.join(localesPath, file), 'utf-8');
        locales[language] = JSON.parse(content);
    });
};

loadLocales();

const t = (key, lang = 'en') => {
    return locales[lang] && locales[lang][key] ? locales[lang][key] : key;
};

module.exports = { t };