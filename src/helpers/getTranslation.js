
const getTranslation = (cn_character) => {
    let fromLang = 'cn'; // from Chinese
    let toLang = 'en'; // translate to English
    let text = cn_character;
    console.log("character to be tranlate is"+ cn_character)

    const API_KEY = ["AIzaSyDAh5E59SyjmGb1MVMcruOnwlBmr-D9F-o"];

    let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
    url += '&q=' + encodeURI(text);
    url += `&source=${fromLang}`;
    url += `&target=${toLang}`;

    fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    })
        .then(res => res.json())
        .then((response) => {
            console.log("response from google: ", response);
            return response;
        })
        .catch(error => {
            console.log("There was an error with the translation request: ", error);
        });

}

export default getTranslation;
