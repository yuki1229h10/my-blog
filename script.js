function generateYear(start, end) {
    let years = '';
    for (let year = start; year <= end; year++) {
        years += "<option value='" + year + "'>" + year + "</option>";
    }
    return years;
}

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById('year');
let selectMonth = document.getElementById('month');

let createYear = generateYear(2020, currentYear);
document.getElementById('year').innerHTML = createYear;

let months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
let days = ['日', '月', '火', '水', '木', '金', '土'];
let calendarTitle = document.getElementById('calendarTitle');

let $dataHead = '<tr>';
for (dHead in days) {
    $dataHead += "<th data-days='" + days[dHead] + "'>" + days[dHead] + "</th>";
}
$dataHead += "</tr>";

document.getElementById('calendarDay').innerHTML = $dataHead;

window.onload = function () {
    showCalendar(currentMonth, currentYear);
}

selectYear.addEventListener('change', (event) => {
    jump();
})

selectMonth.addEventListener('change', (event) => {
    jump();
})

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
    let firstDay = (new Date(year, month)).getDay();
    let lastMonthEndDate = new Date(year, month, 0).getDate();
    let tbl = document.getElementById('calendarDate');
    tbl.innerHTML = '';
    let date = 1;
    calendarTitle.innerHTML = months[currentMonth] + ' ' + currentYear + '年';

    selectYear.value = currentYear;
    selectMonth.value = currentMonth;

    for (let i = 0; i < 6; i++) {
        let row = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement('td');
                let cellText = document.createTextNode(lastMonthEndDate - firstDay + j + 1);
                cell.className = 'calendar__last-date';
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth(month, year)) {
                break;
            } else {
                let cell = document.createElement('td');
                cell.setAttribute('data-date', date);
                cell.setAttribute('data-month', month + 1);
                cell.setAttribute('data-year', year);
                cell.setAttribute('data-month-name', months[month]);
                cell.className = 'date-picker';
                cell.innerHTML = '<span>' + date + '</span>';

                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.className = "date-picker selected";
                }
                row.appendChild(cell);
                date++;
            }
        }
        tbl.appendChild(row);
    }
}

function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}


let todoList = [];

const todoButton = document.getElementById('todoButton');
todoButton.addEventListener('click', (event) => {
    event.preventDefault();
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    if (text !== '') {
        addTodo(text);
        input.value = ''
        input.focus();
    } else {
        alert("何も入力されていません");
    }
})

const todoSendBtn = document.getElementById('todoSendBtn');
todoSendBtn.addEventListener("click", function (event) {
    event.preventDefault();
    funcTest(event);
})

function funcTest(event){
    alert("ok");
    console.log(event)
}

function addTodo(text) {
    const todo = {
        text,
        checked: false,
        id: Date.now()
    };
    todoList.push(todo);
    renderTodo(todo);
}

function renderTodo(todo) {
    let list = document.getElementById('todoList');
    let li = document.createElement('li');
    li.setAttribute('class', 'todo__item');
    li.setAttribute('id', todo.id);
    li.innerHTML += `
    <input class="todo__item-input" type="checkbox" id=${todo.checked}>
    ${todo.text}
    <svg class="todo__icon">
    <use xlink:href="img/sprite.svg#icon-cross"></use>
    </svg>
    `;

    const children = li.children;
    Array.from(children).forEach(function (element) {
        element.addEventListener('click', () => {
            if (element.checked == true) {
                element.setAttribute('id', 'true');
            } else if (element.checked == false) {
                element.setAttribute('id', 'false');
            } else if (element.nodeName == 'svg') {
                element.parentElement.remove();
                const index = todoList.indexOf(todo);
                if (index !== -1) {
                    todoList.splice(index, 1);
                }
            }
        })
    });

    list.appendChild(li);
}