
const getTranslation = (cn_character) => {

// Imports the Google Cloud client library
    const {Translate} = require('@google-cloud/translate').v2;

    // Creates a client
    const translate = new Translate();

    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
    // const text = 'The text to translate, e.g. Hello, world!';
    // const target = 'The target language, e.g. ru';
    // const model = 'The model to use, e.g. nmt';

    async function translateTextWithModel() {
        const options = {
            // The target language, e.g. "ru"
            to: "en",
            // Make sure your project is on the allow list.
            // Possible values are "base" and "nmt"
            model: "base",
        };

        // Translates the text into the target language. "text" can be a string for
        // translating a single piece of text, or an array of strings for translating
        // multiple texts.
        let [translations] = await translate.translate(cn_character, options);
        translations = Array.isArray(translations) ? translations : [translations];
        console.log('Translations:');
        translations.forEach((translation, i) => {
            console.log(`${text[i]} => (${target}) ${translation}`);
        });
        return translations;
    }
    return translateTextWithModel();

}

export default getTranslation;
