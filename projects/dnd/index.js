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

document.addEventListener('mousemove', (e) => {});

const generateColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);
const getRandomInt = (max) => Math.floor(Math.random() * max);

export function createDiv() {
  const div = document.createElement('div');
  const divW = getRandomInt(250);
  const divH = getRandomInt(250);
  div.classList.add('draggable-div');
  div.style.backgroundColor = generateColor();

  div.style.width = divW + 'px';
  div.style.height = divH + 'px';
  div.style.top = getRandomInt(document.documentElement.clientHeight - divH) + 'px';
  div.style.left = getRandomInt(document.documentElement.clientWidth - divW) + 'px';
  div.draggable = true;
  return div;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});

let layerY, dragged, layerX;
homeworkContainer.addEventListener('dragstart', (event) => {
  dragged = event.target;
  layerX = event.layerX;
  layerY = event.layerY;
});

homeworkContainer.addEventListener('dragend', (event) => {
  dragged.style.top = event.clientY - layerY + 'px';
  dragged.style.left = event.clientX - layerX + 'px';
});
