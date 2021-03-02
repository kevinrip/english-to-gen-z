

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
        cases: [
            ['what up', 'biiitch what is uuuuup'],
            ['awesome', 'lit'],
            ['me', 'ya boi'],
            ['okay', 'yeet haw'],
            ['is it', 'it be'],
            ['are you', 'yall'],
            ['are', 'be'],

        ],
        translate: (english) => {
            let translation = english;

            // cases lol
            for (c of window.translator.cases) {
                translation = translation.replace(c[0], c[1]);
            }



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
