/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#app');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

const cookies = () => {
  return document.cookie.split('; ').reduce((prev, current) => {
    const [name, value] = current.split('=');
    prev[name] = value;
    return prev;
  }, {});
};

const deleteCookies = (name) => {
  document.cookie = `${name}=${''}; max-age=-1`;
};

const checkForFilter = (value) => {
  if (!value) return true;
  const filterValue = filterNameInput.value.toLowerCase();
  return value.toLowerCase().includes(filterValue);
};

const addToTable = (name, value) => {
  const row = document.createElement('tr');
  row.setAttribute('data-name', name);

  let td = document.createElement('td');
  td.textContent = name;
  row.appendChild(td);

  td = document.createElement('td');
  td.textContent = value;
  row.appendChild(td);

  td = document.createElement('td');
  const button = document.createElement('button');
  button.textContent = 'Delete';
  td = td.appendChild(button);
  row.appendChild(td);

  listTable.appendChild(row);
};

const updateRowInTable = (name, value) => {
  const row = document.querySelector('tr[data-name="' + name + '"]');
  if (row) {
    const td = row.querySelector('td:nth-child(2)');
    td.textContent = value;
  }
};

const removeRowInTable = (name) => {
  const row = document.querySelector('tr[data-name="' + name + '"]');
  if (row) {
    row.remove();
  }
};

const renderTable = () => {
  const cookiesObj = cookies();
  const filterValue = filterNameInput.value.toLowerCase();
  document.querySelector('tbody').innerHTML = '';
  for (const name in cookiesObj) {
    if (!name) continue;
    if (filterValue !== '' && !checkForFilter(name) && !checkForFilter(cookiesObj[name]))
      continue;
    addToTable(name, cookiesObj[name]);
  }
};
renderTable();

filterNameInput.addEventListener('input', function () {
  renderTable();
});

addButton.addEventListener('click', () => {
  const cookiesObj = cookies();
  const name = addNameInput.value;
  const value = addValueInput.value;

  if (!cookiesObj[name]) {
    if (checkForFilter(name) || checkForFilter(value)) {
      addToTable(name, value);
    }
  } else {
    updateRowInTable(name, value);
    if (!checkForFilter(name) && !checkForFilter(value)) {
      removeRowInTable(name);
    }
  }

  document.cookie = `${name}=${value}`;

  addNameInput.value = '';
  addValueInput.value = '';
});

listTable.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const name = e.target.closest('tr').getAttribute('data-name');
    deleteCookies(name);
    e.target.closest('tr').remove();
  }
});
