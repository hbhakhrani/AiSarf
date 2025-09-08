document.addEventListener('DOMContentLoaded', () => {
    // --- DATA & CONFIG ---
    const PRONOUNS = [
        { en: 'He', ar: 'هو', past_suffix: 'َ', present_prefix: 'يَ', present_suffix: 'ُ' },
        { en: 'They (dual, m)', ar: 'هما (م)', past_suffix: 'َا', present_prefix: 'يَ', present_suffix: 'َانِ' },
        { en: 'They (m. pl)', ar: 'هم', past_suffix: 'ُوا', present_prefix: 'يَ', present_suffix: 'ُونَ' },
        { en: 'She', ar: 'هي', past_suffix: 'َتْ', present_prefix: 'تَ', present_suffix: 'ُ' },
        { en: 'They (dual, f)', ar: 'هما (مؤ)', past_suffix: 'َتَا', present_prefix: 'تَ', present_suffix: 'َانِ' },
        { en: 'They (f. pl)', ar: 'هنّ', past_suffix: 'ْنَ', present_prefix: 'يَ', present_suffix: 'ْنَ' },
        { en: 'You (m)', ar: 'أنتَ', past_suffix: 'ْتَ', present_prefix: 'تَ', present_suffix: 'ُ' },
        { en: 'You (dual, m)', ar: 'أنتما', past_suffix: 'ْتُمَا', present_prefix: 'تَ', present_suffix: 'َانِ' },
        { en: 'You (m. pl)', ar: 'أنتم', past_suffix: 'ْتُمْ', present_prefix: 'تَ', present_suffix: 'ُونَ' },
        { en: 'You (f)', ar: 'أنتِ', past_suffix: 'ْتِ', present_prefix: 'تَ', present_suffix: 'ِينَ' },
        { en: 'You (dual, f)', ar: 'أنتما', past_suffix: 'ْتُمَا', present_prefix: 'تَ', present_suffix: 'َانِ' },
        { en: 'You (f. pl)', ar: 'أنتنّ', past_suffix: 'ْتُنَّ', present_prefix: 'تَ', present_suffix: 'ْنَ' },
        { en: 'I', ar: 'أنا', past_suffix: 'ْتُ', present_prefix: 'أَ', present_suffix: 'ُ' },
        { en: 'We', ar: 'نحن', past_suffix: 'ْنَا', present_prefix: 'نَ', present_suffix: 'ُ' }
    ];

    const irregularData = {
        'hollow': {
            root: ['ق', 'و', 'ل'],
            rule: "Hollow Verb (e.g. قال): The middle weak letter (و) is dropped when it connects to a pronoun with a vowel (like the تاء of the subject) to prevent two silent letters from meeting.",
            conjugations: [
                { en: 'He', verb: 'قَالَ' }, { en: 'They (dual, m)', verb: 'قَالَا' }, { en: 'They (m. pl)', verb: 'قَالُوا' },
                { en: 'She', verb: 'قَالَتْ' }, { en: 'They (dual, f)', verb: 'قَالَتَا' }, { en: 'They (f. pl)', verb: 'قُلْنَ' },
                { en: 'You (m)', verb: 'قُلْتَ' }, { en: 'You (dual, m)', verb: 'قُلْتُمَا' }, { en: 'You (m. pl)', verb: 'قُلْتُمْ' },
                { en: 'You (f)', verb: 'قُلْتِ' }, { en: 'You (dual, f)', verb: 'قُلْتُمَا' }, { en: 'You (f. pl)', verb: 'قُلْتُنَّ' },
                { en: 'I', verb: 'قُلْتُ' }, { en: 'We', verb: 'قُلْنَا' }
            ]
        },
        'weak-final': {
            root: ['د', 'ع', 'و'],
            rule: "Weak-Final Verb (e.g. دعا): The weak letter (و) returns to its origin when attached to the plural 'waw' and is then dropped, with a fatha placed on the preceding letter.",
            conjugations: [
                { en: 'He', verb: 'دَعَا' }, { en: 'They (dual, m)', verb: 'دَعَوَا' }, { en: 'They (m. pl)', verb: 'دَعَوْا' },
                { en: 'She', verb: 'دَعَتْ' }, { en: 'They (dual, f)', verb: 'دَعَتَا' }, { en: 'They (f. pl)', verb: 'دَعَوْنَ' },
                { en: 'You (m)', verb: 'دَعَوْتَ' }, { en: 'You (dual, m)', verb: 'دَعَوْتُمَا' }, { en: 'You (m. pl)', verb: 'دَعَوْتُمْ' },
                { en: 'You (f)', verb: 'دَعَوْتِ' }, { en: 'You (dual, f)', verb: 'دَعَوْتُمَا' }, { en: 'You (f. pl)', verb: 'دَعَوْتُنَّ' },
                { en: 'I', verb: 'دَعَوْتُ' }, { en: 'We', verb: 'دَعَوْنَا' }
            ]
        },
        'weak-initial': {
            root: ['و', 'ق', 'ف'],
            rule: "Weak-Initial Verb (e.g. وقف): There is no significant change in the past tense conjugation; it behaves like a regular, sound verb.",
            conjugations: [
                { en: 'He', verb: 'وَقَفَ' }, { en: 'They (dual, m)', verb: 'وَقَفَا' }, { en: 'They (m. pl)', verb: 'وَقَفُوا' },
                { en: 'She', verb: 'وَقَفَتْ' }, { en: 'They (dual, f)', verb: 'وَقَفَتَا' }, { en: 'They (f. pl)', verb: 'وَقَفْنَ' },
                { en: 'You (m)', verb: 'وَقَفْتَ' }, { en: 'You (dual, m)', verb: 'وَقَفْتُمَا' }, { en: 'You (m. pl)', verb: 'وَقَفْتُمْ' },
                { en: 'You (f)', verb: 'وَقَفْتِ' }, { en: 'You (dual, f)', verb: 'وَقَفْتُمَا' }, { en: 'You (f. pl)', verb: 'وَقَفْتُنَّ' },
                { en: 'I', verb: 'وَقَفْتُ' }, { en: 'We', verb: 'وَقَفْنَا' }
            ]
        },
        'doubled': {
            root: ['م', 'د', 'د'],
            rule: "Doubled Verb (e.g. مدّ): The doubled letter is separated when the verb is attached to pronouns of a moving subject (like تاء الفاعل, نا الفاعلين, نون النسوة).",
            conjugations: [
                { en: 'He', verb: 'مَدَّ' }, { en: 'They (dual, m)', verb: 'مَدَّا' }, { en: 'They (m. pl)', verb: 'مَدُّوا' },
                { en: 'She', verb: 'مَدَّتْ' }, { en: 'They (dual, f)', verb: 'مَدَّتَا' }, { en: 'They (f. pl)', verb: 'مَدَدْنَ' },
                { en: 'You (m)', verb: 'مَدَدْتَ' }, { en: 'You (dual, m)', verb: 'مَدَدْتُمَا' }, { en: 'You (m. pl)', verb: 'مَدَدْتُمْ' },
                { en: 'You (f)', verb: 'مَدَدْتِ' }, { en: 'You (dual, f)', verb: 'مَدَدْتُمَا' }, { en: 'You (f. pl)', verb: 'مَدَدْتُنَّ' },
                { en: 'I', verb: 'مَدَدْتُ' }, { en: 'We', verb: 'مَدَدْنَا' }
            ]
        }
    };

    // --- HELPER FUNCTIONS ---
    const createTableHTML = (conjugations) => {
        let html = '<table class="w-full text-center border-collapse"><thead><tr class="border-b-2 border-gray-200"><th class="p-2 font-semibold">Pronoun</th><th class="p-2 font-semibold">Verb</th></tr></thead><tbody>';
        conjugations.forEach(c => {
            html += `<tr class="border-b border-gray-100"><td class="p-2">${c.pronoun}</td><td class="p-2 font-semibold text-lg text-[#A0522D] arabic-text" dir="rtl">${c.verb}</td></tr>`;
        });
        html += '</tbody></table>';
        return html;
    };

    const formatJSON = (obj) => JSON.stringify(obj, null, 2);

    // --- SETUP FUNCTIONS ---
    const setupTabs = (tabs, contents) => {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => {
                    t.classList.remove('tab-active');
                    t.classList.add('tab-inactive');
                });
                tab.classList.add('tab-active');
                tab.classList.remove('tab-inactive');

                contents.forEach(content => {
                    content.classList.add('hidden');
                });
                document.getElementById(tab.dataset.tab).classList.remove('hidden');
            });
        });
    };

    const setupPhase1 = (elements) => {
        const { r1, r2, r3, btn, outputTable, requestJsonEl, responseJsonEl } = elements;
        const conjugate = () => {
            const root = [r1.value, r2.value, r3.value];
            if (root.some(l => !l)) {
                alert('Please enter all three root letters.');
                return;
            }

            const conjugations = PRONOUNS.map(p => {
                const base = root[0] + 'َ' + root[1] + 'ْ';
                let verb = base + root[2] + p.past_suffix;
                if (p.en === 'He' || p.en === 'She' || p.en.startsWith('They (dual') || p.en === 'They (m. pl)') {
                    verb = root[0] + 'َ' + root[1] + 'َ' + root[2] + p.past_suffix;
                }
                return { pronoun: p.en, verb };
            });

            const responseConjugations = PRONOUNS.map(p => {
                const base = root[0] + 'َ' + root[1] + 'ْ';
                let verb = base + root[2] + p.past_suffix;
                if (p.en === 'He' || p.en === 'She' || p.en.startsWith('They (dual') || p.en === 'They (m. pl)') {
                    verb = root[0] + 'َ' + root[1] + 'َ' + root[2] + p.past_suffix;
                }
                return { pronoun: p.ar, verb };
            });

            outputTable.innerHTML = createTableHTML(conjugations);
            const request = { root };
            const response = { root, tense: "past", conjugations: responseConjugations };
            requestJsonEl.textContent = formatJSON(request);
            responseJsonEl.textContent = formatJSON(response);
        };

        btn.addEventListener('click', conjugate);
        [r1, r2, r3].forEach(input => input.addEventListener('input', () => {
            requestJsonEl.textContent = formatJSON({ root: [r1.value, r2.value, r3.value] });
            responseJsonEl.textContent = '';
        }));
        conjugate();
    };

    const setupPhase2 = (elements) => {
        const { r1, r2, r3, btn, outputTable, requestJsonEl, responseJsonEl } = elements;
        const conjugate = () => {
            const root = [r1.value, r2.value, r3.value];
            if (root.some(l => !l)) {
                alert('Please enter all three root letters.');
                return;
            }

            const conjugations = PRONOUNS.map(p => {
                const verb = p.present_prefix + root[0] + 'ْ' + root[1] + 'َ' + root[2] + p.present_suffix;
                return { pronoun: p.en, verb };
            });

            const responseConjugations = PRONOUNS.map(p => {
                const verb = p.present_prefix + root[0] + 'ْ' + root[1] + 'َ' + root[2] + p.present_suffix;
                return { pronoun: p.ar, verb };
            });

            outputTable.innerHTML = createTableHTML(conjugations);
            const request = { root };
            const response = { root, tense: "present", conjugations: responseConjugations };
            requestJsonEl.textContent = formatJSON(request);
            responseJsonEl.textContent = formatJSON(response);
        };

        btn.addEventListener('click', conjugate);
        [r1, r2, r3].forEach(input => input.addEventListener('input', () => {
            requestJsonEl.textContent = formatJSON({ root: [r1.value, r2.value, r3.value] });
            responseJsonEl.textContent = '';
        }));
    };

    const setupPhase3 = (elements) => {
        const { select, rootDisplay, ruleDisplay, outputTable } = elements;
        const updateDisplay = () => {
            const type = select.value;
            const data = irregularData[type];
            rootDisplay.textContent = `[ ${data.root.join(', ')} ]`;
            ruleDisplay.textContent = data.rule;
            const tableData = data.conjugations.map(c => ({ pronoun: c.en, verb: c.verb }));
            outputTable.innerHTML = createTableHTML(tableData);
        };

        select.addEventListener('change', updateDisplay);
        updateDisplay();
    };

    // --- INITIALIZATION ---
    const initializeApp = () => {
        const domElements = {
            tabs: document.querySelectorAll('.tab-btn'),
            contents: document.querySelectorAll('.tab-content'),
            phase1: {
                r1: document.getElementById('p1-r1'),
                r2: document.getElementById('p1-r2'),
                r3: document.getElementById('p1-r3'),
                btn: document.getElementById('p1-conjugate-btn'),
                outputTable: document.getElementById('p1-output-table'),
                requestJsonEl: document.getElementById('p1-request-json'),
                responseJsonEl: document.getElementById('p1-response-json'),
            },
            phase2: {
                r1: document.getElementById('p2-r1'),
                r2: document.getElementById('p2-r2'),
                r3: document.getElementById('p2-r3'),
                btn: document.getElementById('p2-conjugate-btn'),
                outputTable: document.getElementById('p2-output-table'),
                requestJsonEl: document.getElementById('p2-request-json'),
                responseJsonEl: document.getElementById('p2-response-json'),
            },
            phase3: {
                select: document.getElementById('p3-verb-type'),
                rootDisplay: document.getElementById('p3-root-display'),
                ruleDisplay: document.getElementById('p3-rule-display'),
                outputTable: document.getElementById('p3-output-table'),
            }
        };

        setupTabs(domElements.tabs, domElements.contents);
        setupPhase1(domElements.phase1);
        setupPhase2(domElements.phase2);
        setupPhase3(domElements.phase3);
    };

    initializeApp();
});
