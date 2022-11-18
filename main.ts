// npm install
// ts-node main.ts
// tsc main.ts

/* The class Statistics has a constructor that takes an array of numbers as an argument, and then it
has a bunch of methods that calculate various statistics on that array. */
class Statistics {
/* Declaring the properties of the class. */
    public data:number[];
    public sortdata:number[];
    public Showdata:Function;
    public n:Function;
        /**
         * The constructor function takes an array of numbers as an argument, and then assigns the
         * array to the data property, sorts the array and assigns it to the sortdata property, and
         * then creates a function that takes two strings as arguments and returns a string that
         * concatenates the two strings.
         * 
         * The constructor function also creates a function that takes a number as an argument and
         * returns a string that concatenates the number with a string.
         * 
         * The constructor function also creates a function that takes no arguments and returns a
         * string that concatenates the data array with a string, and then concatenates the sortdata
         * array with a string.
         * 
         * The constructor function also creates a function that takes no arguments and returns a
         * string that concatenates the length of the sortdata array with a string.
         * 
         * The constructor function also creates a function that takes no arguments and returns a
         * string that concatenates the length of the sortdata
         * @param {number[]} xi - number[] = [11,15,22,36,11,18,22,22,16,28]
         */
        constructor(xi:number[] = [11,15,22,36,11,18,22,22,16,28]){
            this.data = xi;
            /* Creating a new array that is a copy of the data array, and then it is
            sorting the new array. */
            this.sortdata = [...this.data].sort((x:number , y:number) => x - y);
            this.Showdata = (Oi:string = `ข้อมูลเดิมคือ ${this.data.join(' ')}`, Ni:string = `เรียงข้อมูลชุดใหม่ได้ ${this.sortdata.join(' ')}`):string => `${Oi}\n${Ni}`;
            this.n = (n = this.sortdata.length):string => `ข้อมูลชุดนี้มีทั้งหมด ${n} จำนวน`;
        }

        /* A function that takes a number as an argument and returns a string that concatenates the
        number with a string. */
        public Mean = (x̄:number = 0 , x:number[] = this.sortdata , Σx:number = 0 , n:number = this.sortdata.length):string => {
            for(let i:number = 0; n > i; i++){
                Σx += x[i];
            }
                x̄ = Σx / n;
                return `ค่าเฉลี่ยเลขคณิต x̄ = ${x̄.toFixed(2)}`;    
        }

        /* A function that takes a number as an argument and returns a string that concatenates
        the number with a string. */
        public Median = (Med:number = 0 , n:number = this.sortdata.length):string => {
            n % 2 !== 0 ? Med = this.sortdata[Math.floor(n / 2)] : Med = (this.sortdata[Math.floor((n - 1) / 2)] + this.sortdata[Math.floor((n + 1) / 2)]) / 2;
            return `มัธยฐาน Me = ${Med}`;
        }

            
        /* Counting the number of times each number appears in the array, and then it is finding
        the number that appears the most times. */
        public Mode = (Mode:string[] = [] , count:any = {} , max:number = 0 ):string => {
            for(let i in this.sortdata){ 
                count[this.sortdata[i]] = (count[this.sortdata[i]] || 0) + 1;
                if(count[this.sortdata[i]] > max) max = count[this.sortdata[i]];
            }
            for(let j in count){ 
                if(count[j] == max) Mode.push(j);
            }
            if(Mode.length >= 3) return `ไม่มีค่าฐานนิยมของข้อมูลชุดนี้`;
                else return `ฐานนิยม Mo = ${Mode.join(' และ ')}`;
        }

        /* Finding the mid-range of the array. */
        public Mid_range = (range:number = 0 , x:number[] = this.sortdata , n:number = this.sortdata.length , Xmax:number = 0, Xmin:number = 0 , sum:number = 0):string => {
            Xmax = x[n - 1];
            Xmin = x[n - n];
            sum = Xmax + Xmin;
            range = sum / 2; 
            return `ค่ากึ่งกลางพิสัย = ${Math.trunc(range)}`;
        }

        /* Finding the geometric mean of the array. */
        public Geometric_Mean = (GM:number = 0 , x:number[] = this.data , n:number = this.data.length , Σx:number = 1):string => {
            for(let i in x){
                Σx *= x[i];
            }
                GM = Σx ** (1 / n);
            return `ค่าเฉลี่ยเรขาคณิต G.M. = ${Math.round(GM)}`;
        }

        /* Finding the harmonic mean of the array. */
        public Harmonic_Mean = (HM:number = 0 , divide:number = 0 ,  x:number[] = this.data , n:number = this.data.length , Σx:number = 0 ):string => {
            for(let k:number = 0; k < n; k++){
                Σx += 1 / x[k];
            }
                divide = n / Σx ;
                HM = divide;
            return `ค่าเฉลี่ยฮาร์โมนิค H.M. = ${HM.toFixed(2)}`;
        }        
}

/* Creating a new instance of the Statistics class. */
const Stat:Statistics = new Statistics();

/* Calling the functions that are in the Statistics class. */
console.log(Stat.Showdata());
console.log(Stat.n());
console.log(Stat.Mean());
console.log(Stat.Median());
console.log(Stat.Mode());
console.log(Stat.Mid_range());
console.log(Stat.Geometric_Mean());
console.log(Stat.Harmonic_Mean());
