

(() => {

    // polyfill
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    // recognition object
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;

    const english = document.querySelector('#english');
    const genZ = document.querySelector('#gen-z');
    let p = document.createElement('p');
    let p2 = document.createElement('p');

    english.appendChild(p);
    genZ.appendChild(p2);

    window.translator = {
        cases: [
            ['what up', 'biiitch what is uuuuup'],
            ['what\'s up', 'biiitch what is uuuuup'],
            ['awesome', 'lit'],
            ['me', 'ya boi'],
            ['my', 'ya bois'],
            ['i', 'ya boi'],
            ['okay', 'yeet haw'],
            ['is it', 'it be'],
            ['are you', 'yall'],
            ['are', 'be'],
            ['it is', 'it be'],
            ['it\'s', 'it be'],
            ['you', 'you 🥺'],
            ['working', 'tiktok dancing'],
            ['challenge', 'tiktok challenge'],
            ['what\'s', 'what be'],
            ['an lit', 'a lit'],
            ['i\'m', 'ya boi is'],
            ['hey', 'howdy'],


        ],
        translate: (english) => {
            let translation = ` ${english.toLowerCase()} `;

            // cases lol
            for (c of window.translator.cases) {
                translation = translation.replace(` ${c[0]} `, ` ${c[1]} `);
            }



            // make computer talk
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(translation));

            // print
            p2.textContent = translation;


            console.log(translation)

            heap.track('translate', {
                original: english,
                translation
            })
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

        // if (e.results[0].isFinal) {
        //     p = document.createElement('p');
        //     english.appendChild(p);
        // }

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
