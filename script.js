var todoList;
var input = document.getElementById('input');
var form = document.querySelector('#todoform');
if (localStorage.getItem('todos') == null) {
  localStorage.setItem('todos', JSON.stringify(todoList))
  todoList = []
}
else {
  todoList = Array.from(JSON.parse(localStorage.getItem('todos')))
}
function complete(id) {
  if (document.getElementById(String(id)).checked==true) {
     todoList[id].complete=true;
    localStorage.setItem('todos', JSON.stringify(todoList));
    document.querySelector(`#textOf${String(id)}`).classList.add('line-through')
  }
  else{
    todoList[id].complete=false;
    document.querySelector(`#textOf${String(id)}`).classList.remove('line-through')
    localStorage.setItem('todos', JSON.stringify(todoList));
  }

}
function deleteThisin(id) {
  todoList.splice(id, 1);
  localStorage.setItem('todos', JSON.stringify(todoList));
  document.querySelector(`.task${id}`).style.display='none'
}
todos = document.querySelector('.todos')
for (let i = 0; i < todoList.length; i++) {
  todos.innerHTML += `<div class="task${i} task w-full h-16 px-5 box-border flex justify-between items-center border-b-2 border-gray-200">
<div class="text flex gap-4" >
<input type="checkbox" name="" id="${i}" onclick="complete(${i})">
<p id="textOf${i}" class="tasktext text-sm md:text-base text-gray-700 ${todoList[i].complete?"line-through":""} ">${todoList[i].task}</p>
</div>
<img src="./images/icon-cross.svg" class="cross" alt="" onclick="deleteThisin(${i})">
</div>`
}
form.addEventListener('submit', (event) => {
  event.preventDefault();
  var d = new Date();
  var n = d.toLocaleTimeString();
  todoList.push({task: input.value, complete: false, time: n});
  localStorage.setItem('todos', JSON.stringify(todoList));
  todos = document.querySelector('.todos')
  todos.innerHTML += `<div class="task${todoList.length - 1} task w-full h-16 px-5 box-border flex justify-between items-center  border-b-2 border-gray-200">
<div class="text flex gap-4" >
<input type="checkbox" name="" id="${todoList.length -1}"  onclick="complete(${todoList.length -1})">
<p id="textOf${todoList.length -1}" class="tasktext text-sm md:text-base text-gray-700 ${todoList[todoList.length -1].complete?"line-through":""} ">${input.value}</p>
</div>
<img src="./images/icon-cross.svg" class="cross" alt="" onclick="deleteThisin(${todoList.length -1})">
</div>`


})
function theme() {
  element=Array.from(document.querySelectorAll('.boxes'))
  task=Array.from(document.querySelectorAll('.task'))
  cross=Array.from(document.querySelectorAll('.cross'))
  tasktext=Array.from(document.querySelectorAll('.tasktext'))
  element.forEach(i => {
    i.classList.toggle('bg-black')
    i.classList.toggle('text-slate-100')
  });
  task.forEach(i => {
    i.classList.toggle('bg-[#25273c]')
    i.classList.toggle('text-slate-100')
  });
  tasktext.forEach(i => {
    i.classList.toggle('text-slate-100')
  });
  document.getElementById('headerimg').classList.toggle('darkBg')
}