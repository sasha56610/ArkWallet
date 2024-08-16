const cards = document.querySelectorAll('.card');    //поиск во всем документе всех классов DOM элемен
const overlay = document.querySelector('.overlay');
const topButton = document.querySelector('.main__button');
const bottomButton = document.querySelector('.privacy__button');
const form = document.querySelector('.form');
// поиск DOM элемента по селектору
console.log(cards);


// ===============ФУНКЦИИ=================
// Передает данные из карточки в модальное окно
function handleClick(card){
    const title = card.querySelector('.card__title');
    const button = card.querySelector('.card__btn');
    const modalTitle = overlay.querySelector('.card__title');
    const modalButton = overlay.querySelector('.card__btn');
    modalTitle.textContent = title.textContent;        // text content - одно из содержимых NodeLista`a
    modalButton.textContent = button.textContent;
    overlay.classList.remove('hidden')        //используем класс hidden чтобы "remove"
}

function scrollWindow (selector){
    const finish = document.querySelector(selector).offsetTop
    window.scroll({
        top: finish - 50, behavior: 'smooth'
    })
}

function handleSubmit(event){
    event.preventDefault()     // Сброс настроек формы
    const form = event.target
    const {name, contact, message} = form.elements
    const obj = {
        name : name.value,
        contact : contact.value,
        message : message.value
    }
    console.log(obj);
}

function validation(input, button, inputs){
    const errorMessage = input.nextElementSibling
    if(input.validity.tooLong || input.validity.tooShort){
         errorMessage.textContent = errorMessage.getAttribute('data-error-length')
    }
    else if (input.validity.valueMissing){
        errorMessage.textContent = 'Это обязательное поле'
    }
    else {
        errorMessage.textContent = ''
    }


    button.disabled = ![...inputs].every(inp => inp.validity.valid)
}

function enableValidation(buttonSelector, inputSelector){
    const inputs = document.querySelectorAll(inputSelector)
    const button = document.querySelector(buttonSelector)
    inputs.forEach( (input) => input.addEventListener('input', () => validation(input, button, inputs)))
}

enableValidation('.form__submit','.form__input')


// card.addEventListener('click', handleClick )
cards.forEach((card, index) => {
    if (index !== cards.length - 1) {
        card.addEventListener('click', () => handleClick(card))
    }
});

form.addEventListener('submit', handleSubmit)

overlay.addEventListener('click', () => overlay.classList.add('hidden'));
// добавляем ивентЛисенер (ожидает от пользователя "клик", после чего запускает коллбэк к "overlay", добавляя "hidden"
topButton.addEventListener('click', () => scrollWindow('.cards'));
bottomButton.addEventListener('click', () => scrollWindow('.askQuestion'));
