const taskInput = document.getElementById("taskInput");
const priorityInput = document.getElementById("priority");
const todoList = document.getElementById("todoList");
const doneList = document.getElementById("doneList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// TIME
function updateTime(){
  const now = new Date();
  document.getElementById("time").innerText =
    now.toLocaleDateString("id-ID",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
}
updateTime();

// ADD TASK
function addTask(){
  if(!taskInput.value) return alert("Task tidak boleh kosong");

  tasks.push({
    id: Date.now(),
    text: taskInput.value,
    priority: priorityInput.value,
    done: false,
    date: new Date().toLocaleDateString("id-ID")
  });

  taskInput.value="";
  save();
}

// RENDER
function render(){
  todoList.innerHTML="";
  doneList.innerHTML="";

  tasks.forEach(task=>{
    const li=document.createElement("li");
    li.classList.add(task.priority.toLowerCase());

    li.innerHTML=`
      <span>${task.text} (${task.priority})</span>
      <div>
        <input type="checkbox" ${task.done?"checked":""}>
        <button onclick="removeTask(${task.id})">×</button>
      </div>
    `;

    li.querySelector("input").onchange=()=>{
      task.done=!task.done;
      save();
    };

    task.done ? doneList.appendChild(li) : todoList.appendChild(li);
  });
}

// DELETE
function removeTask(id){
  tasks=tasks.filter(t=>t.id!==id);
  save();
}

function deleteAll(){
  if(confirm("Hapus semua task?")){
    tasks=[];
    save();
  }
}

function save(){
  localStorage.setItem("tasks",JSON.stringify(tasks));
  render();
}

render();
