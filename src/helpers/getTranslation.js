const getTranslationURL = (cn_character) => {
    let fromLang = 'zh'; // from Chinese
    let toLang = 'en'; // translate to English
    let text = cn_character;
    console.log("character to be translated is " + cn_character);

    const API_KEY = "AIzaSyDAh5E59SyjmGb1MVMcruOnwlBmr-D9F-o";

    let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
    url += '&q=' + encodeURI(text);
    url += `&source=${fromLang}`;
    url += `&target=${toLang}`;

    return url;
}

export default getTranslationURL;
