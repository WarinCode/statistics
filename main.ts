// npm install
// ts-node main.ts
// tsc main.ts

class Statistics {
    public data:number[];
    public sortdata:number[];
    public showdata:Function;
    public n:Function;
        constructor(xi:number[] = [9,1,3,8,2,7,4,6,5,9,9,3,2,2]){
            this.data = xi;
            this.sortdata = [...this.data].sort();
            this.showdata = ():string => `เรียงข้อมูล ${this.sortdata.join(' ')}`;
            this.n = (n = this.sortdata.length):string => `ข้อมูลชุดนี้มีทั้งหมด ${n} จำนวน`;
        }
        public Mean = (x̄:number = 0 , Σx:number = 0 , n:number = this.sortdata.length):string => {
            for(let i:number = 0; n > i; i++){
                Σx += this.sortdata[i];
            }
                x̄ = Σx / n;
                return `x̄ = ${x̄}`;    
        }

        public Median = (Med:unknown = undefined , n:number = this.sortdata.length):string => {
            n % 2 !== 0 ? Med = this.sortdata[Math.floor(n / 2)] : Med = (this.sortdata[Math.floor((n - 1) / 2)] + this.sortdata[Math.floor((n + 1) / 2)]) / 2;
            return `M_e = ${Med}`;
        }

        public Mode = (Mode:string[] = [] ,count:any = {} , max:number = 0 ):string => {
            for(let i in this.sortdata){ // Ref: Stackoverflow
                count[this.sortdata[i]] = (count[this.sortdata[i]] || 0) + 1;
                if(count[this.sortdata[i]] > max) max = count[this.sortdata[i]];
            }
            for(let j in count){ 
                if(count[j] == max) Mode.push(j);
            }
            if(Mode.length >= 3) return `M_o = ไม่มีค่าฐานนิยมของข้อมูลชุดนี้`;
                else return `M_o = ${Mode.join(' และ ')}`;
        }
}
const Stat:Statistics = new Statistics();
console.log(Stat.showdata());
console.log(Stat.n());
console.log(Stat.Mean());
console.log(Stat.Median());
console.log(Stat.Mode());