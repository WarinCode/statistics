
import Statistics from "../main";
import data from "../src/exportData";

let test = new Statistics([12,18,20,19,15,16]) 
test.showTable('')
console.log(test.mean());


console.log(new Statistics(data.example1.set2.data).mean());

