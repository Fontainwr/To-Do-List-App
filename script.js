const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === "") {
        alert("You have to write a task bro!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        li.setAttribute("data-checked", "false"); // Add data-checked attribute
        listContainer.appendChild(li);
        
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        
        inputBox.value = "";
        saveData();
    }
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        let isChecked = e.target.classList.contains("checked");
        e.target.setAttribute("data-checked", isChecked.toString());
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem('data', listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    
    // Restore checked status
    listContainer.querySelectorAll("li").forEach(function (li) {
        let isChecked = li.getAttribute("data-checked") === "true";
        if (isChecked) {
            li.classList.add("checked");
        }
    });
}
