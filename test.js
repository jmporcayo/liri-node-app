// var processArray = process.argv;

// // console.log(processArray);

// function getSearchString(array){
//     // let searchString = array.slice(3).join(" ");

//     // console.log(array.slice(3).join(" "));

//     return array.slice(3).join(" ");
// }

// getSearchString(processArray)


function switchStatements(arg){
    switch(arg){
        case "left":
        console.log("go left");
        break;

        case "right":
        console.log("go right");
        break;

        case "up":
        console.log("go up");
        break;

        default:
        console.log("go down");
        break;
    }
}

ifElseIf(process.argv[2]);


function ifElseIf(arg){

    if(arg === "left"){
        console.log("go left");
    }else if(arg === "right"){
        console.log("go right");
    }else if (arg === "up"){
        console.log("go up");
    }else {
        console.log("go down");
    }
}