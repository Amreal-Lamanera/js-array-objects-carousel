// Ho cambiato le immagini perché le altre non mi piacevano :D
// const slides = [
//     "./img/01.jpg",
//     "./img/02.jpg",
//     "./img/03.jpg",
//     "./img/04.jpg",
//     "./img/05.jpg",
//     "./img/06.jpg",
//     "./img/07.jpg",
//     "./img/08.png",
//     "./img/09.jpg"
// ];
const slides = [
    {
        url: 'http://www.viaggiareonline.it/wp-content/uploads/2014/11/sweden_148857365.jpg',
        title: 'Svezia',
        description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.',
    },

    {
        url: 'https://static1.evcdn.net/images/reduction/1513757_w-1920_h-1080_q-70_m-crop.jpg',
        title: 'Perù',
        description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.',
    },

    {
        url: 'https://img.itinari.com/pages/images/original/0d3ed180-d22d-48e8-84df-19c4d888b41f-62-crop.jpg?ch=DPR&dpr=2.625&w=1600&s=7ebd4b5a9e045f41b4e0c7c75d298d6c',
        title: 'Chile',
        description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.',
    },
    {
        url: 'https://static1.evcdn.net/images/reduction/1583177_w-1920_h-1080_q-70_m-crop.jpg',
        title: 'Argentina',
        description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.',
    },
    {
        url: 'https://cdn.sanity.io/images/24oxpx4s/prod/ed09eff0362396772ad50ec3bfb728d332eb1c30-3200x2125.jpg?w=1600&h=1063&fit=crop',
        title: 'Colombia',
        description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.',
    },
];


const slideElements = [];
let indexAct = 0;

const wrapperElement = document.querySelector('.slides-wrapper');

// eventi di stop/restart dello scorrimento automatico
wrapperElement.addEventListener('mouseenter', stopInterval);
wrapperElement.addEventListener('mouseleave', restartInterval);

// creazione scorrimento nel tempo
let myInterval = setInterval(nextFun, 3000);

// generare il contenuto dello slider
for (let i = 0; i < slides.length; i++) {

    /****************************************************
        PRIMA PARTE: (circa uguale alla vecchia versione)
        creo la img con l'url dell'oggetto e la appendo a li
    ****************************************************/

    // creo elemento li
    const li = document.createElement('li');
    // aggiungo classe slide a li
    li.className = 'slide';

    // assegno la classe active al primo elemento
    if (i === indexAct) {
        li.classList.add('active');
    }

    const src = slides[i].url;
    // console.log(src);
    // creo elemento img
    const img = document.createElement('img');
    // assegno alla proprietà src di img il valore src
    img.src = src;
    // console.log(img);
    // inserisco img in li
    li.append(img);
    // console.log(li);

    /****************************************************
        SECONDA PARTE: (nuova)
        creo h3 e p, contenenti title e description
        contenuti negli oggetti dell'array e li appendo
        ad un div con la classe "slide__content"
    ****************************************************/

    //DIV
    const slideContent = document.createElement('div');
    slideContent.className = 'slide__content';

    // TITLE
    const title = slides[i].title;
    // creo elemento ih3
    const h3 = document.createElement('h3');
    // aggiungo classe
    h3.className = 'slide__title';
    // aggiungo contenuto
    h3.innerHTML = title;
    // inserisco h3 in slideContent
    slideContent.append(h3);

    //DESCRIPTION
    const description = slides[i].description;
    // creo elemento p
    const p = document.createElement('p');
    // aggiungo classe
    p.className = 'slide__description';
    // // aggiungo contenuto
    p.innerHTML = description;
    // inserisco p in slideContent
    slideContent.append(p);

    // inserisco slideContent in li
    li.append(slideContent);

    // inserisco li nello slides-wrapper
    wrapperElement.append(li);

    // mi salvo tutte le slide in un array
    slideElements.push(li);
}
console.log(slideElements);

// implementare i pointer
const pointersWrapperElement = document.querySelector('.pointers-wrapper');
const pointersContainer = [];

for (let i = 0; i < slideElements.length; i++) {
    let pointer;
    pointer = document.createElement('li');
    pointer.className = 'pointer';
    pointer.id = 'i';

    if (i === indexAct) {
        pointer.classList.add('active');
    }

    pointer.addEventListener('click', goTo.bind(pointer, i));

    pointersWrapperElement.append(pointer);
    pointersContainer.push(pointer);
};

// implementare freccia right
const nextElement = document.querySelector('.arrow-next');

nextElement.addEventListener('click', nextFun);

// implementare freccia left
const prevElement = document.querySelector('.arrow-prev');

prevElement.addEventListener('click', prevFun);

function goTo(i) {
    // se muovo slider resetto timer e lo faccio ripartire
    // resetInterval();

    // togliere active dal pointer attivo
    pointersContainer[indexAct].classList.remove('active');
    // togliere active dalla slide attiva
    slideElements[indexAct].classList.remove('active');

    // aggiungere la classe active al pointer selezionato
    indexAct = i;
    pointersContainer[indexAct].classList.add('active');


    // aggiungere la classe active alla slide corrispondente al pointer clickato
    slideElements[indexAct].classList.add('active');
}

function nextFun() {
    if (indexAct === slideElements.length - 1) {
        goTo(0);
    } else {
        goTo(indexAct + 1);
    }
};

function prevFun() {
    if (indexAct === 0) {
        goTo(slideElements.length - 1)
    } else {
        goTo(indexAct - 1)
    }
}

function resetInterval() {
    clearInterval(myInterval);
    myInterval = setInterval(nextFun, 3000);
}

function stopInterval() {
    clearInterval(myInterval);
}

function restartInterval() {
    myInterval = setInterval(nextFun, 3000);
}