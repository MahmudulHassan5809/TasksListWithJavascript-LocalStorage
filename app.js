//Define Ui Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load All Event Listener
loadEventListeners();

//Load All Event Listener
function loadEventListeners () {
	//Dom Load Event
	document.addEventListener('DOMContentLoaded',getTasks);
	//Add Task Event
	form.addEventListener('submit',addTask);
	//Remove Task Event
	taskList.addEventListener('click',removeTask);
	//Clear All Tasks Event
	clearBtn.addEventListener('click',clearTasks);
	//Filter Tasks Event
	filter.addEventListener('keyup',filterTask);
}

//getTasks
function getTasks () {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	}else{
		
		tasks = JSON.parse(localStorage.getItem('tasks'));
		
	}
	tasks.forEach(function(task){
        //Create Li Element
		const li = document.createElement('li');
        //Add Class
		li.className = 'collection-item';
		//Add Content
		li.appendChild(document.createTextNode(task));

		//Create Link
		const link = document.createElement('a');
		//Add Class
		link.className = 'delete-item secondary-content';
		//Add Content
		link.innerHTML = '<i class="fa fa-remove"></i>';
		//Append the link to li as child
		li.appendChild(link);
        //Append Li To ul
		taskList.appendChild(li);
	});
}

//Add Task
function addTask (e) {
	if (taskInput.value === '') {
		alert('Add The Task');
	}else{
		//Create Li Element
		const li = document.createElement('li');
        //Add Class
		li.className = 'collection-item';
		//Add Content
		li.appendChild(document.createTextNode(taskInput.value));

		//Create Link
		const link = document.createElement('a');
		//Add Class
		link.className = 'delete-item secondary-content';
		//Add Content
		link.innerHTML = '<i class="fa fa-remove"></i>';
		//Append the link to li as child
		li.appendChild(link);
        //Append Li To ul
		taskList.appendChild(li);

		//Store in LS
		storeTaskInLocalStorage(taskInput.value);
       
		//Clear Input
		taskInput.value = '';
    }
	e.preventDefault(); 
}

//Store task
function storeTaskInLocalStorage (task) {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	}else{
		
		tasks = JSON.parse(localStorage.getItem('tasks'));
		
	}
	tasks.push(task)
    localStorage.setItem('tasks',JSON.stringify(tasks));
	console.log(123);
    alert('Task Saved'); 
}

//Remove Task
function removeTask (e) {
	if (e.target.parentElement.classList.contains('delete-item')) {
		if (confirm('Are You Sure')) {
			e.target.parentElement.parentElement.remove();

		//Remove From Ls
		removeTaskFromLocalStorage(e.target.parentElement.parentElement);
		}
	}
}

//removeTaskFromLocalStorage
function removeTaskFromLocalStorage (taskItem) {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	}else{
		
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.forEach(function(task,index){
       if (taskItem.textContent === task) {
          	 tasks.splice(index,1);
          }   
	});
	localStorage.setItem('tasks',JSON.stringify(tasks));
}

//Clear Tasks
function clearTasks (e) {
	//taskList.innerHTML = ''; 

	//Faster
	while (taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
		//Clear tasks from Ls
		clearTasksFromLocalStorage();
	}

}

//clearTasksFromLocalStorage()
function clearTasksFromLocalStorage () {
	localStorage.clear();
}

//Filter Task
function filterTask (e) {
	const text = e.target.value.toLowerCase();
	lists = document.querySelectorAll('.collection-item');
	lists.forEach(function(list){
	   console.log(list.firstChild.textContent);	
       const item = list.firstChild.textContent;
       if (item.toLowerCase().indexOf(text) != -1) {
       	   list.style.display = 'block';
       }else{
           list.style.display = 'none'
       }
	});

}