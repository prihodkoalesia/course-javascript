/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');

const generateColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);
const getRandomInt = (min, max) => Math.random() * (max - min) + min;

export function createDiv() {
  const div = document.createElement('div'),
    divW = getRandomInt(10, 250),
    divH = getRandomInt(10, 250);
  div.classList.add('draggable-div');
  div.style.backgroundColor = generateColor();

  div.style.width = divW + 'px';
  div.style.height = divH + 'px';
  div.style.top = getRandomInt(10, document.documentElement.clientHeight - divH) + 'px';
  div.style.left = getRandomInt(10, document.documentElement.clientWidth - divW) + 'px';
  div.draggable = true;
  draggableFunc(div);
  return div;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});

const draggableFunc = (div) => {
  div.onmousedown = (event) => {
    div.style.zIndex = 1000;

    const shiftX = event.clientX - div.offsetLeft;
    const shiftY = event.clientY - div.offsetTop;

    function moveAt(pageX, pageY) {
      div.style.left = pageX - shiftX + 'px';
      div.style.top = pageY - shiftY + 'px';
    }

    moveAt(event.pageX, event.pageY);

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    div.onmouseup = () => {
      document.removeEventListener('mousemove', onMouseMove);
      div.onmouseup = null;
      div.style.zIndex = 0;
    };
  };

  div.ondragstart = () => false;
};
