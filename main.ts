// npm install
// ts-node main.ts
// tsc main.ts

class /* A class that is used to calculate the mean, median, and mode of a set of numbers. */
Statistics {
    public data:number[];
    public sortdata:number[];
    public showdata:Function;
    public n:Function;
        constructor(xi:number[] = [65,71,32,69,78,81,45]){
            this.data = xi;
            /* A spread operator that is used to copy the array data to the array sortdata. */
            this.sortdata = [...this.data].sort((x:number , y:number) => x - y);
            this.showdata = (Oi:string = `ข้อมูลเดิมคือ ${this.data.join(' ')}`, Ni:string = `เรียงข้อมูลชุดใหม่ได้ ${this.sortdata.join(' ')}`):string => `${Oi}\n${Ni}`;
            this.n = (n = this.sortdata.length):string => `ข้อมูลชุดนี้มีทั้งหมด ${n} จำนวน`;
        }

        public Mean = (x̄:number = 0 , Σx:number = 0 , n:number = this.sortdata.length):string => {
            for(let i:number = 0; n > i; i++){
                Σx += this.sortdata[i];
            }
                x̄ = Σx / n;
                return `x̄ = ${x̄.toFixed(2)}`;    
        }

        /* Calculating the median of a set of numbers. */
        public Median = (Med:unknown = undefined , n:number = this.sortdata.length):string => {
            /* A ternary operator that is used to calculate the median of a set of numbers. */
            n % 2 !== 0 ? Med = this.sortdata[Math.floor(n / 2)] : Med = (this.sortdata[Math.floor((n - 1) / 2)] + this.sortdata[Math.floor((n + 1) / 2)]) / 2;
            return `M_e = ${Med}`;
        }

        /* Calculating the mode of a set of numbers. */
        public Mode = (Mode:string[] = [] ,count:any = {} , max:number = 0 ):string => {
            for(let i in this.sortdata){ 
                count[this.sortdata[i]] = (count[this.sortdata[i]] || 0) + 1;
                if(count[this.sortdata[i]] > max) max = count[this.sortdata[i]];
            }
            for(let j in count){ 
                if(count[j] == max) Mode.push(j);
            }
            if(Mode.length >= 3) return `M_o = ไม่มีค่าฐานนิยมของข้อมูลชุดนี้`;
                else return `M_o = ${Mode.join(' และ ')}`;
        }

        public Mid_range = (data:number[] = this.sortdata , n:number = this.sortdata.length , range:number = 0 , Xmax:number = 0, Xmin:number = 0 , Sum:number = 0):string => {
            Xmax = data[n - 1];
            Xmin = data[n - n];
            Sum = Xmax + Xmin;
            range = Sum / 2; 
            return `ค่ากึ่งกลางพิสัยคือ = ${Math.trunc(range)}`;
        }
}
/* Creating a new instance of the class Statistics. */
const Stat:Statistics = new Statistics();
console.log(Stat.showdata());
console.log(Stat.n());
console.log(Stat.Mean());
console.log(Stat.Median());
console.log(Stat.Mode());
console.log(Stat.Mid_range());
