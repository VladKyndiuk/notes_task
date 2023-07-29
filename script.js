import { tasks } from "./data.js";
import { archived } from "./data.js";
import { calculate } from "./calculate.js";

const tableBody = document.querySelector('#main_table_body');
const pivotTableBody = document.querySelector('#pivot_table_body');
const addTaskModal = document.querySelector('#add_task_modal');
const addTaskModalContent = document.querySelector('#add_task_modal_content');
const updateTaskModal = document.querySelector('#update_task_modal');
const updateTaskModalContent = document.querySelector('#update_task_modal_content');

// BUTTONS
const modalOpenBtn = document.querySelector('#modal_open_btn');
const addTaskBtn = document.querySelector('#add_task_btn');
const updateTaskBtn = document.querySelector('#update_task_btn');


// INPUTS
const addTaskNameInput = document.querySelector('#add_task_name');
const addTaskCategoryInput = document.querySelector('#add_task_category');
const addTaskContentTextarea = document.querySelector('#add_task_content');

const updateTaskNameInput = document.querySelector('#update_task_name');
const updateTaskCategoryInput = document.querySelector('#update_task_category');
const updateTaskContentTextarea = document.querySelector('#update_task_content');

let updateIndex;

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];




// DISPLAY FUNC 
function displayTasks(main_tasks,body) {
    tableBody.innerHTML = "";
    main_tasks.map((x,index) => {
        const newItem = document.createElement('tr')
        newItem.id = index;
        newItem.innerHTML = `
        <td> 
            <div class="icon__container">
                <img class="icon__image" src="/images/categories/${x.category}.png" alt="${x.category}">
            </div>   
        </td>
        <td> ${x.name} </td>
        <td> ${x.created}</td>
        <td> ${x.category} </td>
        <td> ${x.content} </td>
        <td>${x.dates}</td>
        <td> 
            <button class="row__button"><img class="button__image" src="/images/pencil.png" alt="update" id="update_btn_${index}"></button>
            <button class="row__button"><img class="button__image" src="/images/archive.png" alt="" id="archive_btn_${index}"></button>
            <button class="row__button"><img class="button__image" src="/images/delete.png" alt="delete" id="delete_btn_${index}"></button>
        </td>
        `;
        
        body.appendChild(newItem)
        document.querySelector(`#update_btn_${index}`).addEventListener('click', () => {updateFields(index)});

        document.querySelector(`#delete_btn_${index}`).addEventListener('click', () => {deleteTask(index)});
        
    })
}

function displayPivotTable(main_tasks,archived_tasks,body){
    let mainTaskNum = calculate('task',main_tasks);
    let mainThoughtNum = calculate('thought',main_tasks);
    let mainIdeaNum = calculate('idea',main_tasks);

    let archivedTaskNum = calculate('task',archived_tasks);
    let archivedThoughtNum = calculate('thought',archived_tasks);
    let archivedIdeaNum = calculate('idea',archived_tasks);

    body.innerHTML = `<tr>
    <td> 
        <div class="icon__container">
            <img class="icon__image" src="/images/categories/task.png" alt="task">
        </div>   
    </td>
    <td> Task </td>
    <td> ${mainTaskNum} </td>
    <td> ${archivedTaskNum} </td>
</tr>
<tr>
    <td> 
        <div class="icon__container">
            <img class="icon__image" src="/images/categories/thought.png" alt="thought ">
        </div> 
    </td>   
    <td> Random Thought </td>
    <td> ${mainThoughtNum} </td>
    <td> ${archivedThoughtNum} </td>
    
</tr>
<tr>
    <td> 
        <div class="icon__container">
            <img class="icon__image" src="/images/categories/idea.png" alt="idea">
        </div> 
    </td>   
    <td> Idea </td>
    <td> ${mainIdeaNum} </td>
    <td> ${archivedIdeaNum} </td>
</tr>`;


}


// ADD TASK FUNC 

function addTask(name,category,content){
    if(name=="" || category=="" || content==""){
        alert("Поля введені невірно")
        return 0;
    }
    const formatter = new Intl.DateTimeFormat('en', { month:'long',day:'numeric',year:'numeric' });
    let d= Date.now();
    // formatter.format(d);
    
    
    // tasks = [...tasks,{name: name,
    //     category: category}];
    tasks.push({name: name,created:formatter.format(d),
        category: category,content:content});
}


// UPDATE TASK FUNC
function updateFields(index){
    updateIndex = index;
    updateTaskNameInput.value = tasks[index].name;
    updateTaskCategoryInput.value = tasks[index].category;
    updateTaskContentTextarea.value = tasks[index].content;
    updateTaskModal.classList.add('visible');
    
}
function updateTask(index, name,category,content){
    tasks[index].name = name;
    tasks[index].category = category;
    tasks[index].content = content;
}


// DELETE TASK FUNC 

function deleteTask(index){
    let newTasks = tasks.filter(el => tasks.indexOf(el) != index);
    tasks.splice(tasks, tasks.length)
    console.log(tasks);
    tasks.push(...newTasks);
    console.log(tasks);
    displayTasks(tasks,tableBody);
    displayPivotTable(tasks,archived,pivotTableBody);
}








// MODALS
modalOpenBtn.addEventListener("click",() => 
    addTaskModal.classList.add('visible')
);




addTaskModal.addEventListener("click",() =>
    addTaskModal.classList.remove('visible')
);
addTaskModalContent.addEventListener("click",(e) => e.stopPropagation());

updateTaskModal.addEventListener("click",() =>
    updateTaskModal.classList.remove('visible')
);
updateTaskModalContent.addEventListener("click",(e) => e.stopPropagation());



addTaskBtn.addEventListener("click",(e) =>{e.preventDefault(),
     addTask(addTaskNameInput.value, 
        addTaskCategoryInput.options[addTaskCategoryInput.selectedIndex].value,
        addTaskContentTextarea.value),
     displayTasks(tasks,tableBody);
     displayPivotTable(tasks,archived,pivotTableBody);
    });

updateTaskBtn.addEventListener("click",(e) =>{e.preventDefault(),
    updateTask(updateIndex,updateTaskNameInput.value, 
        updateTaskCategoryInput.options[updateTaskCategoryInput.selectedIndex].value,
        updateTaskContentTextarea.value),
    displayTasks(tasks,tableBody);
    displayPivotTable(tasks,archived,pivotTableBody);
    });



displayTasks(tasks,tableBody);
displayPivotTable(tasks,archived,pivotTableBody);



