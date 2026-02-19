'use strict';

const categoryTags = document.querySelectorAll('.category-tag');
const productSections = document.querySelectorAll('.product-section');

categoryTags.forEach(tag => {
    tag.addEventListener('click', () => {
        // aktív
        categoryTags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');

        const selected = tag.dataset.category;

        productSections.forEach(section => {
            if (selected === 'osszes' || section.dataset.category === selected) {
                section.style.display = '';
            } else {
                section.style.display = 'none';
            }
        });
    });
});

const form = document.getElementById('calculatorForm');
const dialogOverlay = document.getElementById('dialogOverlay');
const dialogClose = document.getElementById('dialogClose');
const dialogContent = document.getElementById('dialogContent');

const inputs = {
    hosszusag: document.getElementById('hosszusag'),
    szelesseg: document.getElementById('szelesseg'),
    magassag: document.getElementById('magassag'),
};


const errors = {
    hosszusag: document.getElementById('error-hosszusag'),
    szelesseg: document.getElementById('error-szelesseg'),
    magassag: document.getElementById('error-magassag'),
};

function validateField(name) {
    const input = inputs[name];
    const errorEl = errors[name];
    const value = input.value.trim();

    if (value === '') {
        errorEl.textContent = 'Ez a mező kötelező!';
        return false;
    }

    const num = Number(value);

    if (isNaN(num) || !Number.isInteger(num)) {
        errorEl.textContent = 'Csak számot adhat meg!';
        return false;
    }

    if (num <= 0) {
        errorEl.textContent = 'A szám nem lehet nulla vagy negatív!';
        return false;
    }

    errorEl.textContent = '';
    return true;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const validH = validateField('hosszusag');
    const validSz = validateField('szelesseg');
    const validM = validateField('magassag');

    if (!validH || !validM || !validSz) {
        return;
    }

    const hossz = parseFloat(inputs.hosszusag.value);
    const szeless = parseFloat(inputs.szelesseg.value);
    const magass = parseFloat(inputs.magassag.value);

    const terfogat = hossz * szeless * magass;
    const liter = (terfogat / 1000).toFixed(2);

    dialogContent.innerHTML = `
        <p><strong>Doboz méretei:</strong></p>
        <p>Hosszúság: ${hossz} cm</p>
        <p>Szélesség: ${szeless} cm</p>
        <p>Magasság: ${magass} cm</p>
        <hr styler="margin: 0.75rem 0; border-color: var(--sotetkek);">
        <p><strong>Szükséges térkitöltő</strong></p>
        <p>Térfogat: ${terfogat.toFixed(0)} cm³</p>
        <p>Hozzátevőlegesen: <strong>${liter} liter</strong> térkitöltő anyag szükséges.</p>
    `;

    dialogOverlay.classList.remove('hidden');

    inputs.hosszusag.value = '';
    inputs.szelesseg.value = '';
    inputs.magassag.value = '';
});

dialogClose.addEventListener('click', () => {
    dialogOverlay.classList.add('hidden');
});

dialogClose.addEventListener('click', (e) => {
    if (e.target === dialogOverlay) {
        dialogOverlay.classList.add('hidden');
    }
});