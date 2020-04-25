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



if (process.argv[2] === "add") {
    console.log(process.argv[3]);
} else if (process.argv[2] === "delete") {
    console.log(process.argv[3]);
} else if (process.argv[2] === "show list" || process.argv[2] === "list") {
    const allItems = loadData();
    //Show the data using for of Loop 
    for(const items of allItems){
        console.log(items.todo, items.complete);
    }
} else {
    console.log("Command not found. Try again.")
}