document.addEventListener('DOMContentLoaded', () => {

    // card Options
    //TODO: create this looping the images folder
    const cardArray = [
        {
            name: 'cheeseburger',
            img: '../media/images/cheeseburger.png'
        },
        {
            name: 'cheeseburger',
            img: '../media/images/cheeseburger.png'
        },
        {
            name: 'fries',
            img: '../media/images/fries.png'
        },
        {
            name: 'fries',
            img: '../media/images/fries.png'
        },
        {
            name: 'hotdog',
            img: '../media/images/hotdog.png'
        },
        {
            name: 'hotdog',
            img: '../media/images/hotdog.png'
        },
        {
            name: 'ice-cream',
            img: '../media/images/ice-cream.png'
        },
        {
            name: 'ice-cream',
            img: '../media/images/ice-cream.png'
        },
        {
            name: 'milkshake',
            img: '../media/images/milkshake.png'
        },
        {
            name: 'milkshake',
            img: '../media/images/milkshake.png'
        },
        {
            name: 'pizza',
            img: '../media/images/pizza.png'
        },
        {
            name: 'pizza',
            img: '../media/images/pizza.png'
        },
    ];

    cardArray.sort( () => 0.5 - Math.random())

    const grid = document.querySelector('.grid');
    const resultDisplay = document.querySelector('#result');
    cardsChosen = []
    cardsChosenId = []
    cardsWon = []

    function createBoard() {
        for(let i = 0; i < cardArray.length; i++) {
            let card = document.createElement('img');
            card.setAttribute('src', '../media/images/blank.png');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        };
    }

    function checkForMatch() {
        let cards = document.querySelectorAll('img');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];
        // deep equal
        if(cardsChosen[0] === cardsChosen[1]) {
            alert('You found a match');
            cards[optionOneId].setAttribute('src', '../media/images/white.png');
            cards[optionTwoId].setAttribute('src', '../media/images/white.png');
            // disable event listeners
            cards[optionOneId].removeEventListener('click', flipCard);
            cards[optionTwoId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
        }
        else {
            cards[optionOneId].setAttribute('src', '../media/images/blank.png');
            cards[optionTwoId].setAttribute('src', '../media/images/blank.png');
            cards[optionOneId].addEventListener('click', flipCard);
            cards[optionTwoId].addEventListener('click', flipCard);
            alert('Sorry, try again');
        }
        cardsChosen = [];
        cardsChosenId = [];
        resultDisplay.textContent = cardsWon.length
        if (cardsWon.length === cardArray.length/2) {
            resultDisplay.textContent = 'Congratulations! You catch \'em all!'
        }
    }

    function flipCard() {
        let cardId = this.getAttribute('data-id');
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute('src', cardArray[cardId].img);
        // disable to prevent the user from click twice on the same card
        this.removeEventListener('click', flipCard);
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500); // 500 ms
        }
    }

    createBoard();
});
