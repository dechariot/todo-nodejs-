//Step by Step to make TODO NODEJS 

//1. Read all commands from terminal 
//2. Do something based on the commands (read, add, delete...)
//3. Store those database somewhere 
//4. Funcs to read/write/... the data 


//fs = nodeJS file system module allows you work with the file system on your computer
/*Common use for the File System module:
    * Read files
    * Create files 
    * Update files 
    * Delete files 
    * Rename files */
const fs = require('fs');

const loadData = () => {
    //Read the data of data.json in root directory and assign it to dataBuffer 
    //DataBuffer contains binary number system 0 and 1 from data.json
    //
    const dataBuffer = fs.readFileSync(`data.json`);
    //Convert from binary data to string 
    const dataJSON = dataBuffer.toString();
    //Convert String to Object
    return JSON.parse(dataJSON);
};


const saveData = (newTodo) => {
    //Load the current data 
    let currentData = loadData();
    //make some changes
    currentData.push(newTodo);
    //save data
    fs.writeFileSync(`data.json`, JSON.stringify(currentData));
}

const addTodo = (newTodo) => {
    //When we commands "add" it will create newTodo
    //The  process.argv[3] will be a content of todo item
    //Status is always "incomplete" as default 
    let currentData = loadData();
    //Your current items id gonna + 1 whenever you add to do 
    //The app will tell you whenever you update your todo
    let i = 0;
    console.log(currentData[currentData.length - 1].id);
    console.log(currentData.length)
    for (i = currentData[currentData.length - 1].id; i < currentData.length + 2; i++) {
        let newTodo = {
            "id": currentData[currentData.length - 1].id + 1,
            "content": process.argv[3],
            "status": "incomplete"
        }
        saveData(newTodo);
        console.log(newTodo)
    }
    console.log(`Your to do list updated! \nYou can type "list" or "show list" to see your to-do list.`)
}

const removeToDo = () => {
    //Read CurrentData in file data.json
    const currentData = loadData();

    //Remove Item follow as ID of to-do item
    let indexDelete = currentData.find(({ id }) => id == process.argv[3]);

    currentData.splice(indexDelete.id - 1, 1);

    // Update ID for todo items
    for (i = 0; i < currentData.length; i++) {
        currentData[i].id === i++;
        //Update 
        fs.writeFileSync(`data.json`, JSON.stringify(currentData));
    }
}

//Read and setup for commands
if (process.argv[2] === "add") {
    //Add items into data.json
    //Notice you that your data updated
    addTodo();
} else if (process.argv[2] === "delete") {
    removeToDo();
} else if (process.argv[2] === "show list" || process.argv[2] === "list") {
    const allItems = loadData();
    //Show the data using for of Loop 
    console.log("Your to-do list:")
    for (const { id, content, status } of allItems) {
        console.log(id, content, status);
    }
} else if (process.argv[2] == null) {
    console.log(`Welcome to To-Do App! Let's organize your works! \nHow to use: \nType "add" to add your to do items.\nType "delete" to delete your to do items.\nType "show list" or "list" to show your all to do.`)
} else {
    console.log(`Command not found. Try again! \n================= \nPlease try some available commands here: \nType "add" to add your to do items.\nType "delete" to delete your to do items.\nType "show list" or "list" to show your all to do.`)
};

