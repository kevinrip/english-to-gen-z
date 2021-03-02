

(() => {

    // polyfill
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    // recognition object
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;

    const english = document.querySelector('#english');
    let p = document.createElement('p');
    english.appendChild(p);

    window.translator = {
        translate: (english) => {
            let translation = english;

            // cases lol
            translation = translation.replace('what up', 'biiitch what is uuuuup');
            translation = translation.replace('awesome', 'lit');
            translation = translation.replace('me', 'ya boi');
            translation = translation.replace('okay', 'yeet haw');


            // make computer talk
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(translation));

            // print
            console.log(translation)
            window.translator.lastTranslation = translation;

        },
        lastResult: '',
        lastTranslation: ''
    };

    recognition.addEventListener('result', e => {
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');

        p.textContent = transcript;
        window.translator.lastResult = transcript;

        if (e.results[0].isFinal) {
            p = document.createElement('p');
            english.appendChild(p);
        }

    })



    const startButton = document.querySelector('#start');

    recognition.addEventListener('end', () => {
        window.translator.translate(window.translator.lastResult);
        startButton.disabled = false;

    })



    startButton.addEventListener('click', () => {
        recognition.start();
        startButton.disabled = true;
    })



})();
