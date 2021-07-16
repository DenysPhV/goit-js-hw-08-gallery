# goit-js-hw-08-gallery

Использование делегирования событий требует 3 шагов:

### Шаг 1. Определить общего родителя элементов для отслеживания событий

В примере ниже &lsaquo; div id="buttons" &rsaquo; является общим родителем для кнопок.

### Шаг 2. Прикрепить к родительскому элементу обработчик событий

document.getElementById('buttons').addEventListener('click', handler) прикрепляет обработчик событий
к родителю кнопок. Этот обработчик также реагирует на нажатия на кнопки, так как события нажатий на
кнопки всплывают по всем элементам-предкам (благодаря распространению событий).

### Шаг 3. Использовать event.target для выбора целевого элемента

Когда кнопка нажата, функция-обработчик вызывается с аргументом: объектом event. Свойство
event.target обращается к элементу, на котором произошло событие (в нашем примере этот элемент –
кнопка):

    //...
    .addEventListener('click', event => { if (event.target.className === 'buttonClass') {console.log('Click!'); } });

Кстати, на элемент к которому прикреплён сработавший обработчик события, указывает
event.currentTarget. В нашем примере event.currentTarget указывает на элемент &lsaquo; div
id="buttons" &rsaquo;.

Теперь вы можете увидеть преимущества шаблона делегирования событий: вместо прикрепления
обработчиков к каждой кнопке, как это было сделано раньше, благодаря делегированию событий, остаётся
потребность только в одном обработчике.

https://habr.com/ru/post/512782/

### API IntersectionObserver и ленивая загрузка изображений

https://habr.com/ru/company/ruvds/blog/453586/

#### Функции — Переиспользуемые блоки кода

https://developer.mozilla.org/ru/docs/Learn/JavaScript/Building_blocks/Functions

В значительном количестве случаев, когда вы пользуетесь структурой JavaScript, в которой есть пара
обычных скобок — () — и при этом, это не является структурой типа цикл for , while, или do...while
цикл, или if...else конструкция, вы используете функцию.
