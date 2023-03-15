import Statistics from "../main";
class extension extends Statistics{
    public generateCumulativeFrequency = (initialValue:number , distance:number , quantity?:number):number[] => {
        let topEdge:number = 0;
        let bottomEdge:number = initialValue;
        let array:number[] = [];
        let count:number = 5;
        if(quantity) count = quantity;
        for(let i = 0; i < count; i++){
            if (i === 0) topEdge += initialValue + distance;
            array.push(bottomEdge , topEdge);
            bottomEdge += distance + 1; 
            topEdge += distance + 1;
        }
        return array;
    }
}

const Extension: extension = new extension([0]);
export { Extension };
console.log(Extension.generateCumulativeFrequency(5,4,10));
