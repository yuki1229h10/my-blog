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

const todoForm = document.getElementById('todoForm');
todoForm.addEventListener('submit', event => {
    event.preventDefault();
})

const todoButton = document.getElementById('todoButton');
todoButton.addEventListener('click', () => {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    if (text !== '') {
        addTodo(text);
        input.value = ''
        input.focus();
    }
})

function addTodo(text) {
    const todo = {
        text,
        checked: false,
        id: Date.now()
    };
    todoList.push(todo);
    renderTodo(todo);
    generateBtn();
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
                    generateBtn();
                }
                console.log(todoList);
            }
        })
    });

    list.appendChild(li);
    testFn(list);
}

function generateBtn() {
    let wrapper = document.createElement("div");
    let btn = document.createElement("button");

    wrapper.className = "todo__btn-wrapper";
    btn.className = "todo__btn btn";

    // リストの中身が変化するケース、todoを追加したとき、todoを減らしたとき。
    // リストの中身が三つ以上の場合、送信ボタンを一つだけ表示する。
    // リストの中身が三つ未満の場合、不可ボタンを一つだけ表示し、クリック不可にする。
}

// function testFn(list) {
//     let wrapper = document.createElement("div");
//     let btn = document.createElement("button");
//     btn.textContent = "送信";
//     wrapper.className = "todo__btn-wrapper";
//     btn.className = "todo__button";
//     wrapper.appendChild(btn);

//     buildBtn(wrapper, list);
//     removeBtn(wrapper, list);
// if (todoList.length >= 3) {
//     count++;
//     buildBtn(count, list, wrapper);
// } else {
//     count--;
//     releaseBtn(count, list, wrapper);
// }
// }

// function buildBtn(wrapper, list) {
//     if (todoList.length >= 3) {
//         list.appendChild(wrapper);
//     }
// }

// function removeBtn(wrapper, list) {
//     if (todoList.length < 3) {
//         wrapper.remove();
//     }
// }

// function buildBtn(count, list, wrapper) {
//     let executed = false;
//     return function () {
//         if (!executed && count == 1) {
//             executed = true;
//             list.appendChild(wrapper);
//         }
//     }
// }

// function buildBtn = (count, list, wrapper) => {
//     let executed = false;
//     return function () {
//         if (!executed && count) {
//             executed = true;
//             list.appendChild(wrapper);
//         }
//     }
// }

// function buildBtn(count, list, wrapper) {

// }

function releaseBtn(count, list, wrapper) {

}

// function buildBtn(count, list) {
//     let wrapper = document.createElement("div");
//     let btn = document.createElement("button");
//     wrapper.innerHTML = btn;
//     wrapper.className = "todo__btn-wrapper";
//     btn.className = "todo__btn";
//     if (count != 0) {
//         list.appendChild(wrapper);
//     }
// }

// 1.アイテムが3つ以上の時にのみ、ボタンを出現させる。

// リストを監視できる状態を作る。

// function judgeFn(){
//     const index = todoList.length;
//     if(index >= 3){
//     }
// }

// function countItem(list) {
//     let build;
//     let wrapper = document.createElement('div');
//     wrapper.className = 'todo__btn-wrapper';
//     wrapper.innerHTML = '<button class="todo__btn btn">送信</button>';
//     if (build !== true) {
//         list.appendChild(wrapper);
//     }
//     build = true;
//     console.log(build);
// if (todoList.length >= 3 && count) {
//     wrapper.setAttribute('class', 'todo__btn-wrapper');
//     wrapper.innerHTML = '<button class="todo__btn btn">送信</button>';
//     list.appendChild(wrapper);
//     console.log(count);
// } else {
//     count = false;
//     console.log(count);
// }
// }

// Object.observe(todoList, function (changes) {
//     changes.forEach(function (change) {
//         console.log(change.type, change.name, change.oldValue);
//     });
// });

// const target = {
//     message1: 'hello',
//     message2: 'everyone'
// };

// const handler1 = {};

// const proxy1 = new Proxy(target, handler1);
// console.log(proxy1.message1);
// console.log(proxy1.message2);


// const ary = [];
// const q = new Proxy(ary, {
//     get: (target, name) => {
//         console.log(`(get)target : ${JSON.stringify(target)},name : ${name}`);
//         return target[name];
//     },
//     set: (target,name,value)=> {
//         console.log(`(set)target : ${JSON.stringify(target)},name : ${name}`);
//         target[name] = value;
//     }
// });

// q.push('a');
// q.push('b');
// q.push('c');

// console.log(q[0]);