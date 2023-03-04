// npm i -g typescript
// ts-node main.ts
// tsc main.ts

/* newVersion 0.0.2 
    เริ่ม: (23/2/2566) 
    เสร็จ:    
                อัปเดตใหม่
    - แก้ไขชื่อ methods และ property ใหม่
    - มี private object ที่เก็บค่าข้อมูลไว้ช่วยเหลือในการคำนวณข้อมูลใน public methods นำไปใช้งาน    
    - ปรับ logic code ในบางส่วน
    - การ return ของ methods ท้งหมดจะ return ได้ 2 ค่าคือ ทศนิยมจริง(ทศนิยมไม่รู้จบ) กับ ทศนิยม 2 ตำแหน่ง(ปัดขึ้นและปัดลง)
    - เพิ่มการแสดงข้อมูลในส่วนตารางโดยต้องมีการรับค่าค่า parameter จากผู้ใช้งาน
*/

interface subProcess {
    x:number[];
    f:number[];
    xf:CallableFunction;
    cf:number[];
    ci:CallableFunction;
    w:number[];
    wx:CallableFunction;
    sumX:CallableFunction;
    sumF:CallableFunction;
    sumXF:CallableFunction;
    sumW:CallableFunction;
    sumWX:CallableFunction;
    meanX:CallableFunction;
    meanXF:CallableFunction;

}
class Statistics {
    public classInterval: number[];
    public midPoint: Function;
    public data: number[];
    public sortData: number[];
    public frequency: number[];
    public cumulative: Function;
    public cumulativeFrequency: number[];
    public n: Function;
    public i: number;
    public w: number[];
    private subProcess: subProcess;
    public showClassInterval: Function;
    public showMiddle: Function;
    public showData: Function;
    public showFrequency: Function;
    public showNumber: Function;
    public showWeignt: Function;
    public showWidth: Function;
    public showTable: Function;
    public constructor(
        xi: number[] = [], // parameter1 ข้อมูล
        fi: number[] = [], // parameter2 ความถี่
        ci: number[] = [], // parameter3 อัตรภาคชั้น
        wi: number[] = [], // parameter4 หน่วยกิต 
        cf: number[] = [fi[0]], // parameter5 ความถี่สะสม
    ) {
        this.classInterval = ci;
        this.data = xi;
        this.sortData = [...this.data].sort((x: number, y: number) => x - y);
        this.frequency = fi;
        this.midPoint = (middle: number[] = []): number[] => {
            if (xi.length === 0) {
                for (let i: number = 0; i < ci.length / 2; i++) {
                    let j: number = i;
                    if (i == 0) middle[i] = (ci[i] + ci[i + 1]) / 2;
                    else {
                        middle[i] = (ci[i + j] + ci[i + j + 1]) / 2;
                    }
                }
            } else middle = this.data;
            return middle;
        }
        this.n = (number: number = 0): number => {
            if (this.frequency.length == 0) {
                number = this.data.length;
            } else if (this.frequency.length != 0) {
                this.frequency.map((i: number) => number += i);
            }
            return number;
        }
<<<<<<< HEAD
        this.cumulative = (f: number[] = [fi[0]]): number[] => {
            for (let c: number = 1; c < fi.length; c++) {
                f[c] = fi[c] += fi[c - 1];
                cf.push(f[c]);
            }
            for (let oldValue: number = fi.length - 1; oldValue > 0; oldValue--) {
                fi[oldValue] = fi[oldValue] - cf[oldValue - 1];
            }
            return cf;
        }
        this.cumulativeFrequency = this.cumulative();
        this.w = wi;
        this.i = ci[1] - ci[0] + 1;
        this.showData = (oldInformation: string = `ข้อมูลเดิมคือ ${this.data.join(',')}`, newInformation: string = `เรียงข้อมูลชุดใหม่ได้ ${this.sortData.join(',')}`): string => {
            if (this.data.length == 0) throw new Error('ไม่มีข้อมูล');
            return `${oldInformation}\n${newInformation}`;
        }
        this.showFrequency = (oldFrequency: string = `ความถี่ ${this.frequency.join(' ')}`, newFrequency: string = `ความถี่สะสม ${this.cumulativeFrequency.join(' ')}`): (string | undefined) => {
            if (fi.length !== 0) return `${oldFrequency}\n${newFrequency}`;
            else return 'ข้อมูลในชุดนี้ไม่มีความถี่';
        }
        this.showNumber = (): string => `ข้อมูลชุดนี้มีทั้งหมด ${this.n()} จำนวน`;
        this.showWidth = (): string => `ความกว้างของอันตรภาคชั้นคือ ${this.i}`;
        this.showWeignt = (): string => `ค่าน้ำหนักหรือหน่วยกิต ${this.w.join(' ')}`;
        this.showMiddle = (): string => `จุดกึ่งกลางอันตรภาคชั้นคือ ${this.midPoint().join(' ')}`;
        this.showClassInterval = (topEdge: number = 0, bottomEdge: number = 1): void => {
            // แสดงข้อมูลให้ใช้เป็น console.table()
            let render: object[] = [{ classInterval: 'อันตรภาคชั้น' }]
            for (let c: number = 0; c < this.classInterval.length / 2; c++) {
                render.push({ classInterval: `${this.classInterval[topEdge]} - ${this.classInterval[bottomEdge]}` })
                topEdge += 2;
                bottomEdge += 2;
            }
            console.table(render);
        }
        this.subProcess = {
            x: this.data,
            f: this.frequency,
            cf: this.cumulativeFrequency,
            xf: (x:number[] = this.midPoint() , f:number[] = this.frequency):number[] => {
                let array:number[] = [];
                for(let i in x && f){
                    array.push(x[i] * f[i]);
                }
                return array;
            },
            w: this.w,
            wx: (w:number[] = this.w , x:number[] = this.midPoint()):number[] => {
                let array:number[] = [];
                for(let i:number = 0; w.length > i; i++){
                    array[i] = w[i] * x[i];
                }
                return array;
            },
            ci: (topEdge: number = 0 , bottomEdge:number = 1):string[] => {
                const isEven:boolean = this.classInterval.length % 2 === 0;
                const isOdd:boolean = this.classInterval.length % 2 !== 0;
                let array:string[] = [];
                if (isEven){
                    for (let i: number = 0; i < this.classInterval.length / 2; i++) {                 
                        array.push(`${this.classInterval[topEdge]} - ${this.classInterval[bottomEdge]}`)
                        topEdge += 2;
                        bottomEdge += 2;
                    }
                } else if(isOdd){
                    throw new Error('ข้อมูลของอันตรภาคชั้นจำนวนข้อมูลทั้งหมดต้องเป็นเลขคู่');
                }
                return array;
            },
            sumX: (x:number[] = this.midPoint()) => x.reduce((prev:number , curren:number):number => prev + curren),
            sumF: (f:number[] = this.frequency) => f.reduce((prev:number , curren:number):number => prev + curren),
            sumXF: (x:number[] = this.midPoint() , f:number[] = this.frequency):number => {
                let c:number =  x.length === f.length  ? 0 : -1;
                let sum:number = 0;
                while(c < x.length && c < f.length){
                    sum += x[c] * f[c];
                    c++;
                }
                return sum;
            },
            sumW: (w:number[] = this.w):number => w.reduce((prev:number , curren:number) => prev + curren),
            sumWX: (w:number[] = this.w , x:number[] = this.midPoint()):number => {
                let sum:number = 0;
                for(let i in w && x){
                    sum += w[i] * x[i];
                }
                return sum;
            },
            meanX: (x̄:number = 0 , n:number = this.n() , Σx:number = 0):number => {
                Σx = this.subProcess.sumX();
                x̄ = Σx / n;
                return x̄;
            },
            meanXF: (x̄:number = 0 ,  n:number = this.n() , Σxf:number = 0):number => {
                Σxf = this.subProcess.sumXF();
                x̄ = Σxf / n;
                return x̄;
            },
        }
        this.showTable = (word: string = '', classInterval: string[] = [], data: (string|number)[] = [], frequency: (string|number)[] = [], cumulativeFrequency: (string|number)[] = [], midPoint: (string|number)[] = [], xf: (string|number)[] = [] , weight: (string|number)[] = [] , wx: (string|number)[] = [] , MD: (string|number)[] = []
        ): void => {
            let table: object[] = [];
            let status:boolean = false;
            let summary:string[] = ['\tสรุปข้อมูลในตาราง' , `- จำนวนข้อมูลทั้งหมด = ${this.n()} จำนวน`];
                /*
                    - t1 มี ข้อมูล ความถี่ xf
                    - t2 มี ข้อมูล ความถี่  ความถึ่สะสม xf
                    - t3 มี อันตรภาคชั้น จุดกึ่งกลางชั้น ความถี่ ความถี่สะสม xf
                    - t4 มี ข้อมูล ค่าหน่วยกิต wx
                    - d1 มี ข้อมูล ส่วนเบี่ยงเบนเฉลี่ย
                */             
            const tableType = (w: string):(object[]|any)=> {
                if(this.data.length > 0 && this.data.length !== 0) data = ['ข้อมูล(x)', ...this.data, `Σx = ${this.subProcess.sumX()}`];    
                if(this.frequency.length > 0 && this.frequency.length) frequency = ['ความถี่(f)', ...this.frequency, `n = ${this.subProcess.sumF()}`];
                if(this.w.length > 0 && this.w.length){
                    weight = ['ค่าถ่วงน้ำหนัก(w)' , ...this.w , `Σw = ${this.subProcess.sumW()}`];
                    wx = [...this.subProcess.wx() , `Σwx = ${this.subProcess.sumWX()}`];
                    wx.unshift('ข้อมูล x ค่าถ่วงน้ำหนัก(wx)');   
                }
                cumulativeFrequency = ['ความถี่สะสม(cf)', ...this.cumulativeFrequency, ' - '];
                classInterval = ['อันตรภาคชั้น(c)' , ...this.subProcess.ci() , 'รวม'];
                midPoint = ['จุดกึ่งกลางชั้น(x)', ...this.midPoint(), `Σx = ${this.subProcess.sumX()}`];
                xf = [...this.subProcess.xf() , `Σxf = ${this.subProcess.sumXF()}`];
                xf.unshift('ข้อมูล x ความถี่(xf)');
                
                if(typeof w === "string"){
                    status = !status; 
                    if (w === ''){
                        if(this.data.length > 0 ){
                            for (let a = 0; a <= this.data.length + 1; a++) {
                                table.push({ data: data[a]}); 
                            }
                        } else {
                            for (let a = 0; a <= this.frequency.length + 1; a++) {
                                table.push({ classInterval: classInterval[a] , midPoint: midPoint[a]})
                            }
                        }
                        summary.push(`- ค่าเฉลี่ยเลขคณิต ≈ ${this.subProcess.meanX()} = ${this.subProcess.meanX().toFixed(2)}`)
                    } else if(w === 't1'.toUpperCase() || w === 't1'.toLowerCase()){
                        for (let b = 0; b <= this.data.length + 1; b++) {
                            table.push({ data: data[b], frequency: frequency[b], xf:xf[b] })
                        }
                        summary.push(`- ค่าเฉลี่ยลขคณิต ≈ ${this.subProcess.meanXF()} = ${this.subProcess.meanXF().toFixed(2)}`)
                    } else if(w === 't2'.toUpperCase() || w === 't2'.toLowerCase()){
                        for (let c = 0; c <= this.data.length + 1; c++) {
                            table.push({ data: data[c], frequency: frequency[c], cumulativeFrequency:cumulativeFrequency[c] , xf:xf[c] })
                        }
                    } else if(w === 't3'.toUpperCase() || w === 't3'.toLowerCase()){
                        for (let d = 0; d <= (this.classInterval.length / 2) + 1; d++) {
                            table.push({ classInterval: classInterval[d], midPoint: midPoint[d], frequency: frequency[d], cumulativeFrequency: cumulativeFrequency[d] , xf: xf[d]})
                        }
                    } else if(w === 't4'.toUpperCase() || w === 't4'.toLowerCase()){
                        for (let e = 0; e <= this.w.length  + 1; e++) {
                            table.push({  data: data[e] , weight: weight[e] , wx: wx[e] })
                        }
                    } else if(w === 'd1'.toUpperCase() || w === 'd1'.toLowerCase()){
    
                    } else if(w === 'd2'.toUpperCase() || w === 'd2'.toLowerCase()){
    
                    } else if(w === 'd3'.toUpperCase() || w === 'd3'.toLowerCase()){
    
                    }
                    else {
                        status = false;
                        const typeT:string[] = ['t1' , 't2' , 't3' , 't4' , 'd1' , 'd2' , 'd3' , 'd4'];
                        const check:string = w;
                        const textError:string = `เกิดข้อผิดพลาดขึ้นโปรดทำตามคำแนะนำหล่านี้!
                        * รหัสชนิดตาราง (${check}) นั้นไม่มีอยู่ในรหัสตารางที่สร้างไว้
                        * รหัสตารางได้แก่ ${typeT.join(' , ')} เป็นต้น
                        - โปรดตรวจสอบข้อมูลให้ถูกต้อง
                        - กรอกข้อมูลใหม่หรือกรอกให้ครบ
                        - กรอกรหัสชนิดตารางให้ถูกต้อง
                        - หากไม่มีข้อมูลบางชนิดให้ใส่เป็น array เปล่า []`;
                        return textError;
                    }
                    return table;
=======

        public Median = (Med:number = 0 , n:number = this.n() , l:number = 0 , i:number = this.I , x:number[] = this.sortdata , f:number[] = this.frequency , Σfl:number = 0 , fm:number = 0 , positionMed:number = 0):string => {
            if(x.length > 0 && f.length === 0){
                n % 2 !== 0 ? Med = this.sortdata[Math.floor(n / 2)] : Med = (this.sortdata[Math.floor((n - 1) / 2)] + this.sortdata[Math.floor((n + 1) / 2)]) / 2;
                let positionMed:string = `${this.sortdata[Math.floor((n - 1) / 2)]} ระหว่าง ${this.sortdata[Math.floor((n + 1) / 2)]}`
                    return `ตำแหน่งมัธยฐาน = ${positionMed}\nมัธยฐาน Me = ${Med.toFixed(2)}`; 
            } else {
                    positionMed = n / 2;         
                if(this.classinterval.length === 0){
                    let search:number[] = this.cumulative_frequency.filter(item => item < positionMed);
                        Med = x[search.length];
>>>>>>> a3c91b8a3a31c1c6838156bae10fc3cebbdde9ef
                } else {
                return 'โปรดใส่ข้อมูลที่เป็นชนิดข้อความเท่านั้น'
            }
<<<<<<< HEAD
        } 
            try {
                console.table(tableType(word));
            } catch(err:unknown){
                throw err;
            } finally {
                if(status) {
                    summary.forEach((inx:string) => console.log(inx))
                }
            }
        }
    }


    public mean = (x̄: number = 0, x: number[] = this.sortData, Σxi: number = 0, n: number = this.n(), f: number[] = this.frequency, Σxifi: number = 0, w: number[] = this.w, Σwixi: number = 0, Σwi: number = 0): string => {
        if (this.data.length === 0) x = this.midPoint();
        if (x.length > 0 && f.length === 0 && w.length === 0) {
            for (let i: number = 0; n > i; i++) {
                Σxi += x[i];
            }
            x̄ = Σxi / n;
        } else if (f.length !== 0 && w.length === 0) {
            for (let k in x) {
                Σxifi += x[k] * f[k];
            }
            x̄ = Σxifi / n;
        } else if (w.length !== 0) {
            x = this.data;
            for (let u in w) {
                Σwixi += w[u] * x[u];
                Σwi += w[u];
            }
            x̄ = Σwixi / Σwi;
        }
        return `ค่าเฉลี่ยเลขคณิต x̄ = ${x̄} \nปัดเป็นทศนิยม 2 ตำแหน่ง = ${x̄.toFixed(2)}`;
    }

    public median = (Med: number = 0, n: number = this.n(), l: number = 0, i: number = this.i, x: number[] = this.sortData, f: number[] = this.frequency, Σfl: number = 0, fm: number = 0, positionMed: any = 0): (string | Error) => {
        if (this.data.length == 0) return new Error('คุณยังไม่ได้ใส่ข้อมูล!');
        if (x.length > 0 && f.length === 0) {
            console.log(this.showData());
            n % 2 !== 0 ? Med = this.sortData[Math.floor(n / 2)] : Med = (this.sortData[Math.floor((n - 1) / 2)] + this.sortData[Math.floor((n + 1) / 2)]) / 2;
            if (n % 2 !== 0) positionMed = Math.ceil(n / 2);
            else positionMed = `${this.sortData[Math.floor((n - 1) / 2)]} ระหว่าง ${this.sortData[Math.floor((n + 1) / 2)]}`
        } else {
            let search: number[] = this.cumulativeFrequency.filter(item => item < positionMed);
            positionMed = n / 2;
            if (this.classInterval.length === 0) {
                Med = x[search.length];
            } else {
                if (this.classInterval.length === 0) l = x[search.length * 2] - 0.5;
                else l = this.classInterval[search.length * 2] - 0.5;
                Σfl = this.cumulativeFrequency[search.length - 1];
                fm = this.frequency[search.length];
                Med = l + i * ((positionMed - Σfl) / fm);
            }
        }
        return `ตำแหน่งมัธยฐาน = ${positionMed} \nมัธยฐาน Me = ${Med} \nปัดเป็นทศนิยม 2 ตำแหน่ง = ${Med.toFixed(2)}`;
    }

    public mode = (Mode: number = 0, count: any = {}, max: number = 0, x: number[] = this.sortData, f: number[] = this.frequency, n: number = this.n(), d1: number = 0, d2: number = 0, l: number = 0, i: number = this.i): any => {
        if (x.length > 0 && f.length === 0) {
            let Mo: string[] = [];
            for (let i in this.sortData) {
                count[this.sortData[i]] = (count[this.sortData[i]] || 0) + 1;
                if (count[this.sortData[i]] > max) max = count[this.sortData[i]];
            }
            for (let j in count) {
                if (count[j] == max) Mo.push(j);
            }
            if (Mo.length >= 3) return `ไม่มีค่าฐานนิยมของข้อมูลชุดนี้`;
            else return `ฐานนิยม Mo = ${Mo.join(' และ ')}`;
        } else if (f.length !== 0) {
            if (this.classInterval.length === 0) {
                let Maximum_frequency: number = Math.max(...f);
                Mode = x[f.indexOf(Maximum_frequency)];
            } else {
                let Maximum_frequency: number = Math.max(...f);
                l = this.classInterval[f.indexOf(Maximum_frequency) * 2] - 0.5;
                d1 = f[f.indexOf(Maximum_frequency)] - f[f.indexOf(Maximum_frequency) - 1];
                d2 = f[f.indexOf(Maximum_frequency)] - f[f.indexOf(Maximum_frequency) + 1];
                Mode = l + i * (d1 / (d1 + d2));
            }
            return `ฐานนิยม Mo = ${Mode.toFixed(2)}`;
        }
    }

    public midRange = (range: number = 0, x: number[] = this.sortData, n: number = this.sortData.length, Xmax: number = 0, Xmin: number = 0): string => {
        Xmax = x[n - 1];
        Xmin = x[n - n];
        range = (Xmax + Xmin) / 2;
        return `ค่ากึ่งกลางพิสัย = ${Math.trunc(range)}`;
    }

    public range = (R: number = 0, Xmax = 0, Xmin = 0, x: number[] = this.sortData, f: number[] = this.frequency, c: number[] = this.classInterval): string => {
        if (x.length > 0 && f.length === 0) {
            Xmax = x[this.data.length - 1];
            Xmin = x[0];
        } else if (f.length !== 0 && c.length !== 0) {
            Xmax = (Math.max(...c) + 0.5);
            Xmin = (Math.min(...c) - 0.5);
        }
        R = Xmax - Xmin;
        return `พิสัย = ${R}`;
    }

    public geometricMean = (GM: number = 0, x: number[] = this.data, n: number = this.data.length, Σx: number = 1): string => {
        for (let i in x) {
            Σx *= x[i];
        }
        GM = Σx ** (1 / n);
        return `ค่าเฉลี่ยเรขาคณิต G.M. = ${GM.toFixed(2)}`;
    }

    public harmonicMean = (HM: number = 0, x: number[] = this.data, n: number = this.n(), Σx: number = 0, f: number[] = this.frequency, Σx2: number = 0): string => {
        if (f.length === 0) {
            for (let k: number = 0; k < n; k++) {
                Σx += 1 / x[k];
            }
            HM = n / Σx;
        } else if (f.length !== 0) {
            if (this.data.length === 0) x = this.midPoint();
            for (let g in x) {
                Σx2 += Number((f[g] / x[g]).toFixed(2));
            }
            HM = n / Σx2;
        }
        return `ค่าเฉลี่ยฮาร์โมนิค H.M. = ${HM.toFixed(2)}`;
    }

    public Qr = (r: number = 0, Qr: number = 0, position_Qr: number = 0, x: number[] = this.sortData, n: number = this.n(), f: number[] = this.frequency, l: number = 0, i: number = this.i, Σfl: number = 0, fq: number = 0): any => {
        // parameter (r) จะต้องให้ผู้ใช้ส่งข้อมูลมาเพื่อนำไปใช้งานต่อไป
        if (r > 4) return `${new Error(`ไม่สามารถหาค่าควอร์ไทล์ Q${r} ของข้อมูลชุดนี้ได้\nเลขควอร์ไทล์จะต้องเป็นเลข 1 ถึง 4 เท่านั้น`)}`;
        else {
            if (x.length > 0 && this.classInterval.length === 0) {
                position_Qr = r * (n + 1) / 4;
                if (x.length > 0 && Number.isInteger(position_Qr) && f.length === 0) {
                    if (x[Math.trunc(position_Qr)] === undefined || x[Math.trunc(position_Qr)] === null || Number.isNaN(x[Math.trunc(position_Qr)])) return `${new Error(`ไม่สามารถหาค่าควอร์ไทล์ Q${r} ได้ตำแหน่งควอร์ไทล์ที่ ${position_Qr} นั้นไม่มีอยู่จริงในข้อมูลชุดนี้เพราะข้อมูลชุดนี้มีแค่ ${n} จำนวน`)}`;
                    else return `ตำแหน่งควอร์ไทล์ Q${r} = ${position_Qr} \nค่าของควอร์ไทล์ Q${r} = ${x[position_Qr - 1]}`;
                } else if (x.length > 0 && f.length !== 0 && this.classInterval.length === 0) {
                    let search: number[] = this.cumulativeFrequency.filter(item => item < position_Qr);
                    let nearby = this.cumulativeFrequency[Math.sqrt(Math.trunc(position_Qr)) - 1];
                    if (nearby < position_Qr && position_Qr < nearby + 1) {
                        let position1: number = x[search.length - 1]
                        let position2: number = x[search.length]
                        let difference: any = (position_Qr - Math.trunc(position_Qr)).toFixed(2);
                        Qr = position1 + difference * (Math.abs(position2 - position1));
                        return `ตำแหน่งควอร์ไทล์ Q${r} = ${position_Qr} \nค่าของควอร์ไทล์ Q${r} = ${Qr}`;
                    } else {
                        if (x[search.length] === undefined || x[search.length] === null || Number.isNaN(x[search.length])) return `${new Error(`ไม่สามารถหาค่าควอร์ไทล์ Q${r} ได้ตำแหน่งควอร์ไทล์ที่ ${position_Qr} นั้นไม่มีอยู่จริงในข้อมูลชุดนี้เพราะข้อมูลชุดนี้มีแค่ ${n} จำนวน`)}`;
                        Qr = x[search.length];
                        return `ตำแหน่งควอร์ไทล์ Q${r} = ${position_Qr} \nค่าของควอร์ไทล์ Q${r} = ${Qr}`;
                    }
                } else {
                    if (x[Math.floor(position_Qr)] === undefined || x[Math.floor(position_Qr)] === null || Number.isNaN(x[Math.floor(position_Qr)])) return `${new Error(`ไม่สามารถหาค่าควอร์ไทล์ Q${r} ได้ตำแหน่งควอร์ไทล์ที่ ${position_Qr} นั้นไม่มีอยู่จริงในข้อมูลชุดนี้เพราะข้อมูลชุดนี้มีแค่ ${n} จำนวน`)}`;
                    let position1: number = x[Math.floor(position_Qr) - 1];
                    let position2: number = x[Math.floor(position_Qr)];
                    let difference: any = (position_Qr - Math.trunc(position_Qr)).toFixed(2);
                    Qr = position1 + difference * (Math.abs(position2 - position1));
                    return `ตำแหน่งควอร์ไทล์ Q${r} = ${position_Qr} \nค่าของควอร์ไทล์ Q${r} = ${Qr}`;
                }
            } else {
                position_Qr = (r * n) / 4;
                let search: number[] = this.cumulativeFrequency.filter(item => item < position_Qr);
                l = this.classInterval[search.length * 2] - 0.5;
                Σfl = this.cumulativeFrequency[search.length - 1];
                fq = this.frequency[search.length];
                Qr = l + i * ((position_Qr - Σfl) / fq);
                return `ตำแหน่งควอร์ไทล์ Q${r} = ${position_Qr} \nค่าของควอร์ไทล์ Q${r} = ${Qr.toFixed(2)}`;
            }
        }
    }

    public Dr = (r: number = 0, Dr: number = 0, position_Dr: number = 0, x: number[] = this.sortData, n: number = this.n(), f: number[] = this.frequency, l: number = 0, i: number = this.i, Σfl: number = 0, fd: number = 0): any => {
        // parameter (r) จะต้องให้ผู้ใช้ส่งข้อมูลมาเพื่อนำไปใช้งานต่อไป
        if (r > 10) return `${new Error(`ไม่สามารถหาค่าเดไซล์ D${r} ของข้อมูลชุดนี้ได้\nเลขเดไซล์จะต้องเป็นเลข 1 ถึง 10 เท่านั้น`)}`;
        else {
            if (x.length > 0 && this.classInterval.length === 0) {
                position_Dr = r * (n + 1) / 10;
                if (x.length > 0 && Number.isInteger(position_Dr) && f.length !== 0) {
                    if (x[Math.trunc(position_Dr)] === undefined || x[Math.trunc(position_Dr)] === null || Number.isNaN(x[Math.trunc(position_Dr)])) return `${new Error(`ไม่สามารถหาค่าเดไซล์ D${r} ได้ตำแหน่งเดไซล์ที่ ${position_Dr} นั้นไม่มีอยู่จริงในข้อมูลชุดนี้เพราะข้อมูลชุดนี้มีแค่ ${n} จำนวน`)}`;
                    else return `ตำแหน่งเดไซล์ D${r} = ${position_Dr} \nค่าของเดไซล์ D${r} = ${x[position_Dr - 1]}`;
                } else if (x.length !== 0 && f.length !== 0 && this.classInterval.length === 0) {
                    let search: number[] = this.cumulativeFrequency.filter(item => item < position_Dr);
                    let nearby = this.cumulativeFrequency[Math.sqrt(Math.trunc(position_Dr)) - 1];
                    if (nearby < position_Dr && position_Dr < nearby + 1) {
                        let position1: number = x[search.length - 1]
                        let position2: number = x[search.length]
                        let difference: any = (position_Dr - Math.trunc(position_Dr)).toFixed(2);
                        Dr = position1 + difference * (Math.abs(position2 - position1));
                        return `ตำแหน่งเดไซล์ D${r} = ${position_Dr} \nค่าของเดไซล์ D${r} = ${Dr}`;
                    } else {
                        if (x[search.length] === undefined || x[search.length] === null || Number.isNaN(x[search.length])) return `${new Error(`ไม่สามารถหาค่าเดไซล์ D${r} ได้ตำแหน่งเดไซล์ที่ ${position_Dr} นั้นไม่มีอยู่จริงในข้อมูลชุดนี้เพราะข้อมูลชุดนี้มีแค่ ${n} จำนวน`)}`;
                        Dr = x[search.length];
                        return `ตำแหน่งเดไซล์ D${r} = ${position_Dr} \nค่าของเดไซล์ D${r} = ${Dr}`;
                    }
                } else {
                    if (x[Math.floor(position_Dr)] === undefined || x[Math.floor(position_Dr)] === null || Number.isNaN(x[Math.floor(position_Dr)])) return `${new Error(`ไม่สามารถหาค่าเดไซล์ D${r} ได้ตำแหน่งเดไซล์ที่ ${position_Dr} นั้นไม่มีอยู่จริงในข้อมูลชุดนี้เพราะข้อมูลชุดนี้มีแค่ ${n} จำนวน`)}`;
                    let position1: number = x[Math.floor(position_Dr) - 1];
                    let position2: number = x[Math.floor(position_Dr)];
                    let difference: any = (position_Dr - Math.trunc(position_Dr)).toFixed(2);
                    Dr = position1 + difference * (Math.abs(position2 - position1));
                    return `ตำแหน่งเดไซล์ D${r} = ${position_Dr} \nค่าของเดไซล์ D${r} = ${Dr}`;
                }
            } else {
                position_Dr = (r * n) / 10;
                let search: number[] = this.cumulativeFrequency.filter(item => item < position_Dr);
                l = this.classInterval[search.length * 2] - 0.5;
                Σfl = this.cumulativeFrequency[search.length - 1];
                fd = this.frequency[search.length];
                Dr = l + i * ((position_Dr - Σfl) / fd);
                return `ตำแหน่งเดไซล์ D${r} = ${position_Dr} \nค่าของเดไซล์ D${r} = ${Dr.toFixed(2)}`;
            }
        }
    }

    public Pr = (r: number = 0, Pr: number = 0, position_Pr: number = 0, x: number[] = this.sortData, n: number = this.n(), f: number[] = this.frequency, l: number = 0, i: number = this.i, Σfl: number = 0, fp: number = 0): any => {
        // parameter (r) จะต้องให้ผู้ใช้ส่งข้อมูลมาเพื่อนำไปใช้งานต่อไป
        if (r > 100) return `${new Error(`ไม่สามารถหาค่าเปอร์เซนต์ไทล์ P${r} ของข้อมูลชุดนี้ได้\nเลขเปอร์เซนต์ไทล์จะต้องเป็นเลข 1 ถึง 100 เท่านั้น`)}`;
        else {
            if (x.length > 0 && this.classInterval.length === 0) {
                position_Pr = r * (n + 1) / 100;
                if (x.length > 0 && Number.isInteger(position_Pr) && f.length !== 0) {
                    if (x[Math.trunc(position_Pr)] === undefined || x[Math.trunc(position_Pr)] === null || Number.isNaN(x[Math.trunc(position_Pr)])) return `${new Error(`ไม่สามารถหาค่าเปอร์เซนต์ไทล์ P${r} ได้ตำแหน่งเปอร์เซนต์ไทล์ที่ ${position_Pr} นั้นไม่มีอยู่จริงในข้อมูลชุดนี้เพราะข้อมูลชุดนี้มีแค่ ${n} จำนวน`)}`;
                    else return `ตำแหน่งเปอร์เซนต์ไทล์ P${r} = ${position_Pr} \nค่าของเปอร์เซนต์ไทล์ P${r} = ${x[position_Pr - 1]}`;
                } else if (x.length !== 0 && f.length !== 0 && this.classInterval.length === 0) {
                    let search: number[] = this.cumulativeFrequency.filter(item => item < position_Pr);
                    let nearby = this.cumulativeFrequency[Math.sqrt(Math.trunc(position_Pr)) - 1];
                    if (nearby < position_Pr && position_Pr < nearby + 1) {
                        let position1: number = x[search.length - 1]
                        let position2: number = x[search.length]
                        let difference: any = (position_Pr - Math.trunc(position_Pr)).toFixed(2);
                        Pr = position1 + difference * (Math.abs(position2 - position1));
                        return `ตำแหน่งเปอร์เซนต์ไทล์ P${r} = ${position_Pr} \nค่าของเปอร์เซนต์ไทล์ P${r} = ${Pr.toFixed(2)}`;
                    } else {
                        if (x[search.length] === undefined || x[search.length] === null || Number.isNaN(x[search.length])) return `${new Error(`ไม่สามารถหาค่าเปอร์เซนต์ไทล์ P${r} ได้ตำแหน่งเปอร์เซนต์ไทล์ที่ ${position_Pr} นั้นไม่มีอยู่จริงในข้อมูลชุดนี้เพราะข้อมูลชุดนี้มีแค่ ${n} จำนวน`)}`;
                        Pr = x[search.length];
                        return `ตำแหน่งเปอร์เซนต์ไทล์ P${r} = ${position_Pr} \nค่าของเปอร์เซนต์ไทล์ P${r} = ${Pr.toFixed(2)}`;
                    }

                } else {
                    if (x[Math.floor(position_Pr)] === undefined || x[Math.floor(position_Pr)] === null || Number.isNaN(x[Math.floor(position_Pr)])) return `${new Error(`ไม่สามารถหาค่าเปอร์เซนต์ไทล์ P${r} ได้ตำแหน่งเปอร์เซนต์ไทล์ที่ ${position_Pr} นั้นไม่มีอยู่จริงในข้อมูลชุดนี้เพราะข้อมูลชุดนี้มีแค่ ${n} จำนวน`)}`;
                    let position1: number = x[Math.floor(position_Pr) - 1];
                    let position2: number = x[Math.floor(position_Pr)];
                    let difference: any = (position_Pr - Math.trunc(position_Pr)).toFixed(2);
                    Pr = position1 + difference * (Math.abs(position2 - position1));
                    return `ตำแหน่งเปอร์เซนต์ไทล์ P${r} = ${position_Pr} \nค่าของเปอร์เซนต์ไทล์ P${r} = ${Pr.toFixed(2)}`;
                }
            } else {
                position_Pr = (r * n) / 100;
                let search: number[] = this.cumulativeFrequency.filter(item => item < position_Pr);
                l = this.classInterval[search.length * 2] - 0.5;
                Σfl = this.cumulativeFrequency[search.length - 1];
                fp = this.frequency[search.length];
                Pr = l + i * ((position_Pr - Σfl) / fp);
                return `ตำแหน่งเปอร์เซนต์ไทล์ P${r} = ${position_Pr} \nค่าของเปอร์เซนต์ไทล์ P${r} = ${Pr.toFixed(2)}`;
            }
        }
    }

    public quartileDeviation = (QD: number = 0, Q1: any = 1, Q3: any = 3, n: number = this.n(), position_Qr: number[] = this.sortData, f: number[] = this.frequency, l1: number = 0, i1: number = this.i, Σfl1: number = 0, fq1: number = 0, l3: number = 0, i3: number = this.i, Σfl3: number = 0, fq3: number = 0, x: number[] = this.sortData): string => {
        if (f.length === 0) {
            Q1 = (1 * (n + 1)) / 4;
            Q3 = (3 * (n + 1)) / 4;
            type QObject = {
                Q1: { r: number, decimal: number, difference: number, value: number, sendValue: Function };
                Q3: { r: number, decimal: number, difference: number, value: number, sendValue: Function };
            }
            let Q_value: QObject = {
                Q1: {
                    r: 1,
                    decimal: 0,
                    difference: 0,
                    value: 0,
                    sendValue(): number {
                        this.decimal = Math.abs(Q1 - Math.trunc(Q1));
                        this.difference = Math.abs(position_Qr[Math.trunc(Q1) - 1] - position_Qr[Math.trunc(Q1)]);
                        this.value = position_Qr[Math.trunc(Q1) - 1] + (this.decimal * this.difference);
                        return this.value;
                    }
                },
                Q3: {
                    r: 3,
                    decimal: 0,
                    difference: 0,
                    value: 0,
                    sendValue(): number {
                        this.decimal = Math.abs(Q3 - Math.trunc(Q3));
                        this.difference = Math.abs(position_Qr[Math.trunc(Q3) - 1] - position_Qr[Math.trunc(Q3)]);
                        this.value = position_Qr[Math.trunc(Q3) - 1] + (this.decimal * this.difference);
                        return this.value;
                    }
                }
            }
            if (Number.isInteger(Q1) && Number.isInteger(Q3)) {
                QD = (position_Qr[Q3 - 1] - position_Qr[Q1 - 1]) / 2;
            } else if ((Q1 && Q3).toFixed()) {
                QD = (Q_value.Q3.sendValue() - Q_value.Q1.sendValue()) / 2;
            } else if ((Q1 || Q3).toFixed()) {
                if (Number.isInteger(Q1)) {
                    QD = (Q_value.Q3.sendValue() - Q1) / 2;
                } else if (Number.isInteger(Q3)) {
                    QD = (Q3 - Q_value.Q1.sendValue()) / 2;
                }
            }
        } else if (f.length !== 0 && this.classInterval.length === 0) {
            let position: { Q1: number, Q3: number } = {
                Q1: (1 * (n + 1)) / 4,
                Q3: (3 * (n + 1)) / 4
            }
            let search: { Q1: number[], Q3: number[] } = {
                Q1: this.cumulativeFrequency.filter(item => item < position.Q1),
                Q3: this.cumulativeFrequency.filter(item => item < position.Q3),
            }
            Q1 = x[search.Q1.length];
            Q3 = x[search.Q3.length];
            if (this.cumulativeFrequency[this.cumulativeFrequency.indexOf(Math.trunc(position.Q1))] === Math.trunc(position.Q1) || this.cumulativeFrequency[this.cumulativeFrequency.indexOf(Math.trunc(position.Q3))] === Math.trunc(position.Q3)) {
                if (this.cumulativeFrequency[this.cumulativeFrequency.indexOf(Math.trunc(position.Q1))] === Math.trunc(position.Q1)) {
                    Q1 = x[search.Q1.length - 1] + (Math.abs(position.Q1 - Math.trunc(position.Q1)) * Math.abs(x[search.Q1.length - 1] - x[search.Q1.length]));
                } else if (this.cumulativeFrequency[this.cumulativeFrequency.indexOf(Math.trunc(position.Q3))] === Math.trunc(position.Q3)) {
                    Q3 = x[search.Q3.length - 1] + (Math.abs(position.Q3 - Math.trunc(position.Q3)) * Math.abs(x[search.Q3.length - 1] - x[search.Q3.length]));
                }
            }
        } else {
            let position: { Q1: number, Q3: number } = {
                Q1: (1 * n) / 4,
                Q3: (3 * n) / 4,
            }
            let search: { Q1: number[], Q3: number[] } = {
                Q1: this.cumulativeFrequency.filter(item => item < position.Q1),
                Q3: this.cumulativeFrequency.filter(item => item < position.Q3),
            }
            l1 = this.classInterval[search.Q1.length * 2] - 0.5;
            l3 = this.classInterval[search.Q3.length * 2] - 0.5;
            Σfl1 = this.cumulativeFrequency[search.Q1.length - 1];
            Σfl3 = this.cumulativeFrequency[search.Q3.length - 1];
            if (l1 === undefined || Number.isNaN(l1)) l1 = 0;
            if (l3 === undefined || Number.isNaN(l3)) l3 = 0;
            if (Σfl1 === undefined || Number.isNaN(Σfl1)) Σfl1 = 0;
            if (Σfl3 === undefined || Number.isNaN(Σfl3)) Σfl3 = 0;
            fq1 = this.frequency[search.Q1.length];
            fq3 = this.frequency[search.Q3.length];
            Q1 = (l1 + i1 * ((position.Q1 - Σfl1) / fq1)).toFixed(2);
            Q3 = (l3 + i3 * ((position.Q3 - Σfl3) / fq3)).toFixed(2);
        }
        QD = (Q3 - Q1) / 2;
        return `ส่วนเบี่ยงเบนควอร์ไทล์ Q.D. = ${QD.toFixed(2)}`;
    }

    public meanDeviation = (MD: number = 0, x̄: number = 0, Σx: number = 0, n: number = this.n(), x: number[] = this.sortData, Σx2: number = 0, f: number[] = this.frequency, Σxf: number = 0): string => {
        if (x.length > 0 && f.length === 0) {
            for (let p in x) {
                Σx += x[p];
            }
            x̄ = Σx / n;
            for (let k in x) {
                Σx2 += Math.abs(x[k] - x̄);
            }
        } else if (f.length !== 0) {
            if (this.data.length === 0) x = this.midPoint();
            for (let y in x) {
                Σxf += (x[y] * f[y]);
            }
            x̄ = Σxf / n;
            for (let a in x) {
                Σx2 += f[a] * (Math.abs(x[a] - x̄));
            }
        }
        MD = Σx2 / n;
        return `ส่วนเบี่ยงเบนเฉลี่ย M.D. = ${MD.toFixed(2)}`;
    }

    public standardDeviation = (SD: number = 0, x̄: number = 0, Σx: number = 0, n: number = this.n(), f: number[] = this.frequency, x: number[] = this.sortData, Σx2: number = 0, Σxf: number = 0, Σxf2: number = 0): string => {
        if (x.length > 0 && f.length === 0) {
            for (let i in x) {
                Σx += x[i];
            }
            x̄ = Σx / n;
            try {
                for (let j in x) {
                    Σx2 += Math.pow(x[j], 2);
                }
                SD = Math.sqrt((Σx2 / n) - Math.pow(x̄, 2));
            } catch (err) {
                console.error(err);
                for (let j in x) {
                    Σx2 += Math.pow((x[j] - x̄), 2);
                }
                SD = Math.sqrt(Σx2 / n);
            }
        } else if (f.length !== 0) {
            if (this.data.length === 0) x = this.midPoint();
            for (let k in x) {
                Σxf += f[k] * x[k];
            }
            x̄ = Σxf / n;
            try {
                for (let o in x) {
                    Σxf2 += f[o] * Math.pow(x[o], 2);
                }
                SD = Math.sqrt((Σxf2 / n) - Math.pow(x̄, 2));
            } catch (err) {
                console.error(err);
                for (let z in x) {
                    Σxf2 += f[z] * Math.pow((x[z] - x̄), 2);
                }
                SD = Math.sqrt(Σxf2 / n);
            }
        }
        return `ส่วนเบี่ยงเบนเฉลี่ยมาตราฐาน S.D. = ${SD.toFixed(2)}`;
    }

    public variance = (S: number = 0, x̄: number = 0, Σx: number = 0, n: number = this.n(), f: number[] = this.frequency, x: number[] = this.sortData, Σx2: number = 0, Σxf: number = 0, Σxf2: number = 0): string => {
        if (x.length > 0 && f.length === 0) {
            for (let q in x) {
                Σx += x[q];
            }
            x̄ = Σx / n;
            try {
                for (let d in x) {
                    Σx2 += Math.pow((x[d] - x̄), 2);
                }
                S = Σx2 / n;
            } catch (err) {
                console.error(err);
                for (let p in x) {
                    Σx2 += Math.pow(x[p], 2);
                }
                S = (Σx2 / n) - Math.pow(x̄, 2);
            }
        } else if (f.length !== 0) {
            if (this.data.length === 0) x = this.midPoint();
            for (let b in x) {
                Σxf += f[b] * x[b]
            }
            x̄ = Σxf / n;
            try {
                for (let t in x) {
                    Σxf2 += f[t] * Math.pow(x[t], 2)
                }
                S = (Σxf2 / n) - Math.pow(x̄, 2);
            } catch (err) {
                console.error(err);
                for (let e in x) {
                    Σxf2 += f[e] * Math.pow((x[e] - x̄), 2);
                }
                S = Σxf2 / n;
            }
        }
        return `ความแปรปรวนของข้อมูล S2 = ${S.toFixed(2)}`;
    }

    public coefficientOfRange = (CR: number = 0, Xmax = 0, Xmin = 0, x: number[] = this.sortData, f: number[] = this.frequency, c: number[] = this.classInterval): string => {
        if (x.length > 0 && f.length === 0) {
            Xmax = x[this.data.length - 1];
            Xmin = x[0];
        } else if (x.length !== 0 && f.length !== 0) {
            Xmax = x[this.data.length - 1];
            Xmin = x[0];
        } else if (x.length === 0 && f.length !== 0 || f.length !== 0 && c.length !== 0) {
            Xmax = (Math.max(...c) + 0.5);
            Xmin = (Math.min(...c) - 0.5);
        }
        CR = (Xmax - Xmin) / (Xmax + Xmin);
        return `สัมประสิทธิ์ของพิสัย C.R = ${CR.toFixed(3)}`;
    }

    public coefficientOfQuartileDeviation = (CQD: number = 0, Q1: number = 0, Q3: number = 0, x: number[] = this.sortData, n: number = this.n(), f: number[] = this.frequency, l1: number = 0, i1: number = this.i, Σfl1: number = 0, fq1: number = 0, l3: number = 0, i3: number = this.i, Σfl3: number = 0, fq3: number = 0): string => {
        if (x.length > 0 && f.length === 0) {
            let position_Q1 = 1 * (n + 1) / 4;
            if (Number.isInteger(position_Q1)) Q1 = x[position_Q1 - 1];
            else {
                let position1: number = x[Math.floor(position_Q1) - 1];
                let position2: number = x[Math.floor(position_Q1)];
                let difference: any = (position_Q1 - Math.trunc(position_Q1)).toFixed(2);
                Q1 = position1 + difference * (Math.abs(position2 - position1));
            }
            let position_Q3 = 3 * (n + 1) / 4;
            if (Number.isInteger(position_Q3)) Q3 = x[position_Q3 - 1];
            else {
                let position1: number = x[Math.floor(position_Q3) - 1];
                let position2: number = x[Math.floor(position_Q3)];
                let difference: any = (position_Q3 - Math.trunc(position_Q3)).toFixed(2);
                Q3 = position1 + difference * (Math.abs(position2 - position1));
            }
        } else if (x.length > 0 && f.length > 0 && this.classInterval.length === 0) {
            let position_Q1 = 1 * (n + 1) / 4;
            let position_Q3 = 3 * (n + 1) / 4;
            let search: { Q1: number[], Q3: number[] } = {
                Q1: this.cumulativeFrequency.filter(item => item < position_Q1),
                Q3: this.cumulativeFrequency.filter(item => item < position_Q3),
            }
            Q1 = x[search.Q1.length];
            Q3 = x[search.Q3.length];
        }
        else if (x.length === 0 && f.length !== 0 && this.classInterval.length !== 0) {
            let position: { Q1: number, Q3: number } = {
                Q1: 1 * (n) / 4,
                Q3: 3 * (n) / 4,
            }
            let search: { Q1: number[], Q3: number[] } = {
                Q1: this.cumulativeFrequency.filter(item => item < position.Q1),
                Q3: this.cumulativeFrequency.filter(item => item < position.Q3),
            }
            l1 = this.classInterval[search.Q1.length * 2] - 0.5;
            Σfl1 = this.cumulativeFrequency[search.Q1.length - 1];
            fq1 = f[search.Q1.length];
            Q1 = l1 + i1 * ((position.Q1 - Σfl1) / fq1);
            l3 = this.classInterval[search.Q3.length * 2] - 0.5;
            Σfl3 = this.cumulativeFrequency[search.Q3.length - 1];
            fq3 = f[search.Q3.length];
            Q3 = l3 + i3 * ((position.Q3 - Σfl3) / fq3);
        }
        CQD = (Q3 - Q1) / (Q3 + Q1);
        return `สัมประสิทธิ์องส่วนเบี่ยงเบนควอร์ไทล์ C.QD = ${CQD.toFixed(4)}`;
    }

    public coefficientOfMeanDeviation = (CMD: number = 0, MD: number = 0, x: number[] = this.sortData, n: number = this.n(), f: number[] = this.frequency, x̄: number = 0, Σx: number = 0, Σxf: number = 0, Σx2: number = 0, Σxf2: number = 0): string => {
        if (x.length > 0 && f.length === 0) {
            for (let t in x) {
                Σx += x[t];
            }
            x̄ = Σx / n;
            for (let u in x) {
                Σx2 += Math.abs(x[u] - x̄);
            }
            MD = Σx2 / n;
        } else if (f.length !== 0) {
            if (this.data.length === 0) x = this.midPoint();
            for (let w in x) {
                Σxf += (x[w] * f[w]);
            }
            x̄ = Σxf / n;
            for (let r in x) {
                Σxf2 += f[r] * (Math.abs(x[r] - x̄));
            }
            MD = Σxf2 / n;
        }
        CMD = MD / x̄;
        return `สัมประสิทธิ์ของส่วนเบี่ยงเบนเฉลี่ย C.MD = ${CMD.toFixed(3)}`;
    }

    public coefficientOfDeviation = (CSD: number = 0, SD: number = 0, x: number[] = this.sortData, n: number = this.n(), f: number[] = this.frequency, x̄: number = 0, Σx: number = 0, Σxf: number = 0, Σx2: number = 0, Σxf2: number = 0): string => {
        if (x.length > 0 && f.length === 0) {
            for (let i in x) {
                Σx += x[i];
            }
            x̄ = Σx / n;
            try {
                for (let j in x) {
                    Σx2 += Math.pow(x[j], 2);
                }
                SD = Math.sqrt((Σx2 / n) - Math.pow(x̄, 2));
            } catch {
                for (let j in x) {
                    Σx2 += Math.pow((x[j] - x̄), 2);
                }
                SD = Math.sqrt(Σx2 / n);
            }
        } else if (f.length !== 0) {
            if (this.data.length === 0) x = this.midPoint();
            for (let k in x) {
                Σxf += f[k] * x[k];
            }
            x̄ = Σxf / n;
            try {
                for (let o in x) {
                    Σxf2 += f[o] * Math.pow(x[o], 2)
                }
                SD = Math.sqrt((Σxf2 / n) - Math.pow(x̄, 2));
            } catch (err) {
                console.error(err);
                for (let z in x) {
                    Σxf2 += f[z] * Math.pow((x[z] - x̄), 2);
                }
                SD = Math.sqrt(Σxf2 / n);
            }
        }
        CSD = SD / x̄;
        return `สัมประสิทธิ์ของการแปรผัน C.SD = ${CSD.toFixed(3)}`;
    }

    public standardScores = (score: any = null, name: string[] = [], Z: number = 0, x: number[] = this.sortData, x̄: number = 0, Σx: number = 0, n: number = this.n(), S: number = 0, Σx2: number = 0): (string | Error) => {
        // parameter (score) จะต้องให้ผู้ใช้ส่งข้อมูลมาเพื่อนำไปใช้งานต่อไป
        x.map((index: number) => {
            Σx += index;
        });
        x̄ = Σx / n;
        for (let xi of x) {
            Σx2 += Math.pow(xi - x̄, 2);
        }
        S = Math.sqrt(Σx2 / n);

        let compose: string[] = [];
        if (typeof score === 'object' && name.length > 0 && name.length === n) {
            for (let i in x) {
                Z = (score[i] - x̄) / S;
                compose.push(`คะแนนของ ${name[i]} มีค่ามาตราฐาน = ${Z}`);
            }
            return `${compose.map((c) => `\n${c}`)}`;
        }

        if (typeof score === 'object' && name.length === 0) {
            let count: number = 1;
            for (let j in x) {
                Z = (score[j] - x̄) / S;
                compose.push(`คะแนนชุดที่ ${count++} มีค่ามาตราฐาน = ${Z}`);
            }
            return `${compose.map((c) => `\n${c}`)}`;
        }

        if (typeof score === 'number' && name.length === 0) {
            Z = (score - x̄) / S;
            return `ค่ามาตราฐาน Z = ${Z}`;
        } else {
            throw new Error(`เกิดข้อผิดพลาดขึ้น!\nการส่ง argument ให้ parameter นั้นต้องส่งเป็นตัวเลขเท่านั้น`);
        }
    }
}

const Stat: Statistics = new Statistics();
export { Stat, Statistics };
=======
            return `ตำแหน่งมัธยฐาน = ${positionMed}\nมัธยฐาน Me = ${Med.toFixed(2)}`;
        }

        public Mode = (Mode:number = 0 , count:any = {} , max:number = 0 , x:number[] = this.sortdata , f:number[] = this.frequency , n:number = this.n() , d1:number = 0 , d2:number = 0  , l:number = 0 , i:number  = this.I):any => {
            if(x.length > 0 && f.length === 0){
                    let Mo:string[] = []; 
                    for(let i in this.sortdata){ 
                    count[this.sortdata[i]] = (count[this.sortdata[i]] || 0) + 1;
                if(count[this.sortdata[i]] > max) max = count[this.sortdata[i]];
            }
                for(let j in count){ 
                    if(count[j] == max) Mo.push(j);
            }
                if(Mo.length >= 3) return `ไม่มีค่าฐานนิยมของข้อมูลชุดนี้`;
                    else return `ฐานนิยม Mo = ${Mo.join(' และ ')}`;
            } else if(f.length !== 0){
                if(this.classinterval.length === 0){
                    let Maximum_frequency:number = Math.max(...f);
                    Mode = x[f.indexOf(Maximum_frequency)];
                } else {
                    let Maximum_frequency:number = Math.max(...f);
                    l = this.classinterval[f.indexOf(Maximum_frequency) * 2] - 0.5;
                    d1 = f[f.indexOf(Maximum_frequency)] - f[f.indexOf(Maximum_frequency) - 1];
                    d2 = f[f.indexOf(Maximum_frequency)] - f[f.indexOf(Maximum_frequency) + 1]; 
                    Mode = l + i * (d1 / (d1 + d2));          
                }
                return `ฐานนิยม Mo = ${Mode.toFixed(2)}`;
            }
        }

        public Mid_range = (range:number = 0 , x:number[] = this.sortdata , n:number = this.sortdata.length , Xmax:number = 0, Xmin:number = 0):string => {
            Xmax = x[n - 1];
            Xmin = x[n - n];
                range = (Xmax + Xmin) / 2; 
            return `ค่ากึ่งกลางพิสัย = ${Math.trunc(range)}`;
        }

        public Range = (R:number = 0 , Xmax = 0 , Xmin = 0 , x:number[] = this.sortdata , f:number[] = this.frequency , c:number[] = this.classinterval):string => {
            if(x.length > 0 && f.length === 0){
                Xmax = x[this.data.length - 1];
                Xmin = x[0];
            } else if(f.length !== 0 && c.length !== 0){
                Xmax = (Math.max(...c) + 0.5);
                Xmin = (Math.min(...c) - 0.5);
            }
                R = Xmax - Xmin;
            return `พิสัย = ${R}`;
        }

        public Geometric_mean = (GM:number = 0 , x:number[] = this.data , n:number = this.data.length , Σx:number = 1):string => {
            for(let i in x){
                Σx *= x[i];
            }
                GM = Σx ** (1 / n);
            return `ค่าเฉลี่ยเรขาคณิต G.M. = ${GM.toFixed(2)}`;
        }

        public Harmonic_mean = (HM:number = 0 , x:number[] = this.data , n:number = this.n() , Σx:number = 0 , f:number[] = this.frequency , Σx2:number = 0):string => {
            if(f.length === 0){
                for(let k:number = 0; k < n; k++){
                    Σx += 1 / x[k];
                }
                    HM = n / Σx ;                
            } else if(f.length !== 0) {
                if(this.data.length === 0) x = this.mid_point();
                for(let g in x){
                    Σx2 += Number((f[g] / x[g]).toFixed(2));
                }
                    HM = n / Σx2;
            }
            return `ค่าเฉลี่ยฮาร์โมนิค H.M. = ${HM.toFixed(2)}`;
        }        

        public Qr = (r:number = 0 , Qr:number = 0 , position_Qr:number = 0 , x:number[] = this.sortdata , n:number = this.n() , f:number[] = this.frequency , l:number = 0 , i:number  = this.I , Σfl:number = 0 , fq:number = 0):any => {
            // parameter (r) จะต้องให้ผู้ใช้ส่งข้อมูลมาเพื่อนำไปใช้งานต่อไป
            if(r > 4) return `${new Error(`ไม่สามารถหาค่าควอร์ไทล์ Q${r} ของข้อมูลชุดนี้ได้\nเลขควอร์ไทล์จะต้องเป็นเลข 1 ถึง 4 เท่านั้น`)}`;
            else { 
                if(x.length > 0 && this.classinterval.length === 0){
                    position_Qr = r *(n + 1) / 4;
                    if(x.length > 0 && Number.isInteger(position_Qr) && f.length === 0 ){
                        if(x[Math.trunc(position_Qr)] === undefined || x[Math.trunc(position_Qr)] === null || Number.isNaN(x[Math.trunc(position_Qr)])) return `${new Error(`ไม่สามารถหาค่าควอร์ไทล์ Q${r} ได้ตำแหน่งควอร์ไทล์ที่ ${position_Qr} นั้นไม่มีอยู่จริงในข้อมูลชุดนี้เพราะข้อมูลชุดนี้มีแค่ ${n} จำนวน`)}`;
                        else return `ตำแหน่งควอร์ไทล์ Q${r} = ${position_Qr} \nค่าของควอร์ไทล์ Q${r} = ${x[position_Qr - 1]}`;
                    } else if(x.length > 0 && f.length !== 0 && this.classinterval.length === 0){
                            let search:number[] = this.cumulative_frequency.filter(item => item < position_Qr);
                            let nearby = this.cumulative_frequency[Math.sqrt(Math.trunc(position_Qr)) - 1];
                            if(nearby < position_Qr && position_Qr < nearby + 1){
                                    let position1:number = x[search.length - 1]
                                    let position2:number =  x[search.length]
                                    let difference:any = (position_Qr - Math.trunc(position_Qr)).toFixed(2);
                                        Qr = position1 + difference * (Math.abs(position2 - position1));
                                return `ตำแหน่งควอร์ไทล์ Q${r} = ${position_Qr} \nค่าของควอร์ไทล์ Q${r} = ${Qr}`;
                          } else {
                                if(x[search.length] === undefined || x[search.length] === null || Number.isNaN(x[search.length])) return `${new Error(`ไม่สามารถหาค่าควอร์ไทล์ Q${r} ได้ตำแหน่งควอร์ไทล์ที่ ${position_Qr} นั้นไม่มีอยู่จริงในข้อมูลชุดนี้เพราะข้อมูลชุดนี้มีแค่ ${n} จำนวน`)}`;
                                    Qr = x[search.length];
                                return `ตำแหน่งควอร์ไทล์ Q${r} = ${position_Qr} \nค่าของควอร์ไทล์ Q${r} = ${Qr}`;
                          }
                    } else {
                            if(x[Math.floor(position_Qr)] === undefined || x[Math.floor(position_Qr)] === null || Number.isNaN(x[Math.floor(position_Qr)])) return `${new Error(`ไม่สามารถหาค่าควอร์ไทล์ Q${r} ได้ตำแหน่งควอร์ไทล์ที่ ${position_Qr} นั้นไม่มีอยู่จริงในข้อมูลชุดนี้เพราะข้อมูลชุดนี้มีแค่ ${n} จำนวน`)}`;
                            let position1:number = x[Math.floor(position_Qr) - 1];
                            let position2:number = x[Math.floor(position_Qr)];
                            let difference:any = (position_Qr - Math.trunc(position_Qr)).toFixed(2);
                            Qr = position1 + difference * (Math.abs(position2 - position1));
                        return `ตำแหน่งควอร์ไทล์ Q${r} = ${position_Qr} \nค่าของควอร์ไทล์ Q${r} = ${Qr}`;
                    } 
                } else {
                        position_Qr = (r * n) / 4;
                        let search:number[] = this.cumulative_frequency.filter(item => item < position_Qr);
                        l = this.classinterval[search.length * 2] - 0.5;
                        Σfl = this.cumulative_frequency[search.length - 1];
                        fq = this.frequency[search.length];
                        Qr = l + i * ((position_Qr - Σfl)  / fq);
                    return `ตำแหน่งควอร์ไทล์ Q${r} = ${position_Qr} \nค่าของควอร์ไทล์ Q${r} = ${Qr.toFixed(2)}`;
                }
            }
        }
        public Dr = (r:number = 0 , Dr:number = 0 , position_Dr:number = 0 , x:number[] = this.sortdata , n:number = this.n() , f:number[] = this.frequency , l:number = 0 , i:number  = this.I , Σfl:number = 0 , fd:number = 0):any => {
                    // parameter (r) จะต้องให้ผู้ใช้ส่งข้อมูลมาเพื่อนำไปใช้งานต่อไป
                    if(r > 10) return `${new Error(`ไม่สามารถหาค่าเดไซล์ D${r} ของข้อมูลชุดนี้ได้\nเลขเดไซล์จะต้องเป็นเลข 1 ถึง 10 เท่านั้น`)}`;
                    else { 
                        if(x.length > 0 && this.classinterval.length === 0){
                            position_Dr = r *(n + 1) / 10;
                            if(x.length > 0 && Number.isInteger(position_Dr) && f.length !== 0 ){
                                if(x[Math.trunc(position_Dr)] === undefined || x[Math.trunc(position_Dr)] === null || Number.isNaN(x[Math.trunc(position_Dr)])) return `${new Error(`ไม่สามารถหาค่าเดไซล์ D${r} ได้ตำแหน่งเดไซล์ที่ ${position_Dr} นั้นไม่มีอยู่จริงในข้อมูลชุดนี้เพราะข้อมูลชุดนี้มีแค่ ${n} จำนวน`)}`;
                                else return `ตำแหน่งเดไซล์ D${r} = ${position_Dr} \nค่าของเดไซล์ D${r} = ${x[position_Dr - 1]}`;
                            } else if(x.length !== 0 && f.length !== 0 && this.classinterval.length === 0){
                                    let search:number[] = this.cumulative_frequency.filter(item => item < position_Dr);
                                    let nearby = this.cumulative_frequency[Math.sqrt(Math.trunc(position_Dr)) - 1];
                                        if(nearby < position_Dr && position_Dr < nearby + 1){
                                                let position1:number = x[search.length - 1]
                                                let position2:number =  x[search.length]
                                                let difference:any = (position_Dr - Math.trunc(position_Dr)).toFixed(2);
                                                Dr = position1 + difference * (Math.abs(position2 - position1));
                                            return `ตำแหน่งเดไซล์ D${r} = ${position_Dr} \nค่าของเดไซล์ D${r} = ${Dr}`;
                                        } else {
                                            if(x[search.length] === undefined || x[search.length] === null || Number.isNaN(x[search.length])) return `${new Error(`ไม่สามารถหาค่าเดไซล์ D${r} ได้ตำแหน่งเดไซล์ที่ ${position_Dr} นั้นไม่มีอยู่จริงในข้อมูลชุดนี้เพราะข้อมูลชุดนี้มีแค่ ${n} จำนวน`)}`;
                                            Dr = x[search.length];
                                        return `ตำแหน่งเดไซล์ D${r} = ${position_Dr} \nค่าของเดไซล์ D${r} = ${Dr}`;
                                  }
                            } else {
                                    if(x[Math.floor(position_Dr)] === undefined || x[Math.floor(position_Dr)] === null || Number.isNaN(x[Math.floor(position_Dr)])) return `${new Error(`ไม่สามารถหาค่าเดไซล์ D${r} ได้ตำแหน่งเดไซล์ที่ ${position_Dr} นั้นไม่มีอยู่จริงในข้อมูลชุดนี้เพราะข้อมูลชุดนี้มีแค่ ${n} จำนวน`)}`;
                                    let position1:number = x[Math.floor(position_Dr) - 1];
                                    let position2:number = x[Math.floor(position_Dr)];
                                    let difference:any = (position_Dr - Math.trunc(position_Dr)).toFixed(2);
                                    Dr = position1 + difference * (Math.abs(position2 - position1));
                                return `ตำแหน่งเดไซล์ D${r} = ${position_Dr} \nค่าของเดไซล์ D${r} = ${Dr}`;
                            }
                        } else {
                                position_Dr = (r * n) / 10;
                                let search:number[] = this.cumulative_frequency.filter(item => item < position_Dr);
                                l = this.classinterval[search.length * 2] - 0.5;
                                Σfl = this.cumulative_frequency[search.length - 1];
                                fd = this.frequency[search.length];
                                Dr = l + i * ((position_Dr - Σfl)  / fd);                    
                            return `ตำแหน่งเดไซล์ D${r} = ${position_Dr} \nค่าของเดไซล์ D${r} = ${Dr.toFixed(2)}`;
                    }                    
                }
            }
        
                public Pr = (r:number = 0 , Pr:number = 0 , position_Pr:number = 0 , x:number[] = this.sortdata , n:number = this.n() , f:number[] = this.frequency , l:number = 0 , i:number  = this.I , Σfl:number = 0 , fp:number = 0):any => {
                    // parameter (r) จะต้องให้ผู้ใช้ส่งข้อมูลมาเพื่อนำไปใช้งานต่อไป
                    if(r > 100) return `${new Error(`ไม่สามารถหาค่าเปอร์เซนต์ไทล์ P${r} ของข้อมูลชุดนี้ได้\nเลขเปอร์เซนต์ไทล์จะต้องเป็นเลข 1 ถึง 100 เท่านั้น`)}`;
                    else {
                        if(x.length > 0 && this.classinterval.length === 0){
                            position_Pr = r *(n + 1) / 100;
                            if(x.length > 0 && Number.isInteger(position_Pr) && f.length !== 0 ) {
                                if(x[Math.trunc(position_Pr)] === undefined || x[Math.trunc(position_Pr)] === null || Number.isNaN(x[Math.trunc(position_Pr)])) return `${new Error(`ไม่สามารถหาค่าเปอร์เซนต์ไทล์ P${r} ได้ตำแหน่งเปอร์เซนต์ไทล์ที่ ${position_Pr} นั้นไม่มีอยู่จริงในข้อมูลชุดนี้เพราะข้อมูลชุดนี้มีแค่ ${n} จำนวน`)}`;
                                else return `ตำแหน่งเปอร์เซนต์ไทล์ P${r} = ${position_Pr} \nค่าของเปอร์เซนต์ไทล์ P${r} = ${x[position_Pr - 1]}`;
                            } else if(x.length !== 0 && f.length !== 0 && this.classinterval.length === 0){
                                    let search:number[] = this.cumulative_frequency.filter(item => item < position_Pr);
                                    let nearby = this.cumulative_frequency[Math.sqrt(Math.trunc(position_Pr)) - 1];
                                        if(nearby < position_Pr && position_Pr < nearby + 1){
                                            let position1:number = x[search.length - 1]
                                            let position2:number =  x[search.length]
                                            let difference:any = (position_Pr - Math.trunc(position_Pr)).toFixed(2);
                                                Pr = position1 + difference * (Math.abs(position2 - position1));
                                        return `ตำแหน่งเปอร์เซนต์ไทล์ P${r} = ${position_Pr} \nค่าของเปอร์เซนต์ไทล์ P${r} = ${Pr.toFixed(2)}`;
                                  } else {
                                        if(x[search.length] === undefined || x[search.length] === null || Number.isNaN(x[search.length])) return `${new Error(`ไม่สามารถหาค่าเปอร์เซนต์ไทล์ P${r} ได้ตำแหน่งเปอร์เซนต์ไทล์ที่ ${position_Pr} นั้นไม่มีอยู่จริงในข้อมูลชุดนี้เพราะข้อมูลชุดนี้มีแค่ ${n} จำนวน`)}`;
                                        Pr = x[search.length];
                                    return `ตำแหน่งเปอร์เซนต์ไทล์ P${r} = ${position_Pr} \nค่าของเปอร์เซนต์ไทล์ P${r} = ${Pr.toFixed(2)}`;
                                  }
        
                            } else {
                                    if(x[Math.floor(position_Pr) ] === undefined || x[Math.floor(position_Pr) ] === null || Number.isNaN(x[Math.floor(position_Pr) ])) return `${new Error(`ไม่สามารถหาค่าเปอร์เซนต์ไทล์ P${r} ได้ตำแหน่งเปอร์เซนต์ไทล์ที่ ${position_Pr} นั้นไม่มีอยู่จริงในข้อมูลชุดนี้เพราะข้อมูลชุดนี้มีแค่ ${n} จำนวน`)}`;
                                    let position1:number = x[Math.floor(position_Pr) - 1];
                                    let position2:number = x[Math.floor(position_Pr)];
                                    let difference:any = (position_Pr - Math.trunc(position_Pr)).toFixed(2);
                                    Pr = position1 + difference * (Math.abs(position2 - position1));
                                return `ตำแหน่งเปอร์เซนต์ไทล์ P${r} = ${position_Pr} \nค่าของเปอร์เซนต์ไทล์ P${r} = ${Pr.toFixed(2)}`;
                            }
                        } else {
                                position_Pr = (r * n) / 100;
                                let search:number[] = this.cumulative_frequency.filter(item => item < position_Pr);
                                l = this.classinterval[search.length * 2] - 0.5;
                                Σfl = this.cumulative_frequency[search.length - 1];
                                fp = this.frequency[search.length];
                                Pr = l + i * ((position_Pr - Σfl)  / fp);
                            return `ตำแหน่งเปอร์เซนต์ไทล์ P${r} = ${position_Pr} \nค่าของเปอร์เซนต์ไทล์ P${r} = ${Pr.toFixed(2)}`;
                        }                    
                }
            }
        
                public Quartile_deviation = (QD:number = 0 , Q1:any = 1 , Q3:any = 3  ,  n:number = this.n() , position_Qr:number[] = this.sortdata , f:number[] = this.frequency , l1:number = 0 , i1:number  = this.I , Σfl1:number = 0 , fq1:number = 0 , l3:number = 0 , i3:number  = this.I , Σfl3:number = 0 , fq3:number = 0 , x:number[] = this.sortdata):string => {
                    if(f.length === 0){
                        Q1 = (1 * (n + 1)) / 4;
                        Q3 = (3 * (n + 1)) / 4;
                        type Q_Obj =  {
                            Q1:{ r:number , decimal:number , difference:number , value:number , send_value:Function };
                            Q3:{ r:number , decimal:number , difference:number , value:number , send_value:Function };
                        }
                        let Q_value:Q_Obj = {
                            Q1:{ r: 1, 
                                decimal: 0, 
                                difference: 0, 
                                value: 0, 
                                send_value():number {
                                    this.decimal = Math.abs(Q1 - Math.trunc(Q1)); 
                                    this.difference = Math.abs(position_Qr[Math.trunc(Q1) - 1] - position_Qr[Math.trunc(Q1)]); 
                                    this.value = position_Qr[Math.trunc(Q1) - 1] + (this.decimal * this.difference);  
                                        return this.value;
                        }},
                            Q3:{ r: 3, 
                                decimal: 0, 
                                difference: 0, 
                                value: 0,
                                send_value():number {
                                    this.decimal = Math.abs(Q3 - Math.trunc(Q3)); 
                                    this.difference = Math.abs(position_Qr[Math.trunc(Q3) - 1] - position_Qr[Math.trunc(Q3)]); 
                                    this.value = position_Qr[Math.trunc(Q3) - 1] + (this.decimal * this.difference);  
                                        return this.value;
                            }}
                        }
                            if(Number.isInteger(Q1) && Number.isInteger(Q3)){
                                QD = (position_Qr[Q3 - 1] - position_Qr[Q1 - 1]) / 2;
                            } else if((Q1 && Q3).toFixed()){                    
                                QD = (Q_value.Q3.send_value() - Q_value.Q1.send_value()) / 2;
                            } else if((Q1 || Q3).toFixed()){
                                if(Number.isInteger(Q1)){  
                                    QD = (Q_value.Q3.send_value() - Q1) / 2;
                                } else if(Number.isInteger(Q3)){
                                    QD = (Q3 - Q_value.Q1.send_value()) / 2;
                                }
                            }
                    } else if(f.length !== 0 && this.classinterval.length === 0) {
                        let Position:{ Q1:number , Q3:number } = {
                            Q1: (1 * (n + 1)) / 4,
                            Q3: (3 * (n + 1)) / 4
                        }
                        let Search:{ Q1:number[] , Q3:number[] } = {
                            Q1: this.cumulative_frequency.filter(item => item < Position.Q1),
                            Q3: this.cumulative_frequency.filter(item => item < Position.Q3),
                        }
                            Q1 = x[Search.Q1.length];
                            Q3 = x[Search.Q3.length];
                        if(this.cumulative_frequency[this.cumulative_frequency.indexOf(Math.trunc(Position.Q1))]  === Math.trunc(Position.Q1) || this.cumulative_frequency[this.cumulative_frequency.indexOf(Math.trunc(Position.Q3))]  === Math.trunc(Position.Q3)){
                            if(this.cumulative_frequency[this.cumulative_frequency.indexOf(Math.trunc(Position.Q1))] === Math.trunc(Position.Q1)){
                                Q1 = x[Search.Q1.length - 1] + (Math.abs(Position.Q1 - Math.trunc(Position.Q1)) * Math.abs(x[Search.Q1.length - 1] - x[Search.Q1.length]));
                            } else if(this.cumulative_frequency[this.cumulative_frequency.indexOf(Math.trunc(Position.Q3))]  === Math.trunc(Position.Q3)){
                                Q3 = x[Search.Q3.length - 1] + (Math.abs(Position.Q3 - Math.trunc(Position.Q3)) * Math.abs(x[Search.Q3.length - 1] - x[Search.Q3.length]));                            
                            }            
                        } 
                    } else {
                            let Position:{ Q1:number , Q3:number } = {
                                Q1: (1 * n) / 4,
                                Q3: (3 * n) / 4,
                            }
                            let Search:{ Q1:number[] , Q3:number[] } = {
                                Q1: this.cumulative_frequency.filter(item => item < Position.Q1),
                                Q3: this.cumulative_frequency.filter(item => item < Position.Q3),
                            }
                                l1 = this.classinterval[Search.Q1.length * 2] - 0.5;
                                l3 = this.classinterval[Search.Q3.length * 2] - 0.5;   
                                Σfl1 = this.cumulative_frequency[Search.Q1.length - 1];
                                Σfl3 = this.cumulative_frequency[Search.Q3.length - 1];
                            if(l1 === undefined || Number.isNaN(l1)) l1 = 0;
                            if(l3 === undefined || Number.isNaN(l3)) l3 = 0;      
                            if(Σfl1  === undefined || Number.isNaN(Σfl1)) Σfl1 = 0;
                            if(Σfl3  === undefined || Number.isNaN(Σfl3)) Σfl3 = 0;                    
                                fq1 = this.frequency[Search.Q1.length];
                                fq3 = this.frequency[Search.Q3.length];                
                                Q1 = (l1 + i1 * ((Position.Q1 - Σfl1)  / fq1)).toFixed(2);
                                Q3 = (l3 + i3 * ((Position.Q3 - Σfl3)  / fq3)).toFixed(2);
                    }
                        QD = (Q3 - Q1) / 2;
                    return `ส่วนเบี่ยงเบนควอร์ไทล์ Q.D. = ${QD.toFixed(2)}`;
                }
        
                public Mean_deviation = (MD:number = 0 , x̄:number = 0 , Σx:number = 0 , n:number = this.n() , x:number[] = this.sortdata , Σx2:number = 0 , f:number[] = this.frequency , Σxf:number = 0):string => {
                    if(x.length > 0  && f.length === 0){
                        for(let p in x){
                            Σx += x[p];
                        }
                            x̄ = Σx / n;
                        for(let k in x){
                            Σx2 += Math.abs(x[k] - x̄); 
                        }
                    } else if (f.length !== 0){
                            if(this.data.length === 0) x = this.mid_point();
                        for(let y in x){
                            Σxf += (x[y] * f[y]);
                        }
                            x̄ = Σxf / n;
                        for(let a in x){
                            Σx2 += f[a] * (Math.abs(x[a] - x̄)); 
                        }
                    } 
                        MD = Σx2 / n;
                    return `ส่วนเบี่ยงเบนเฉลี่ย M.D. = ${MD.toFixed(2)}`;
                }
        
                public Standard_deviation = (SD:number = 0 , x̄:number = 0 , Σx:number = 0 , n:number = this.n(), f:number[] = this.frequency , x:number[] = this.sortdata , Σx2:number = 0 , Σxf:number = 0 , Σxf2:number = 0):string => {
                    if(x.length > 0 && f.length === 0){
                        for(let i in x){
                            Σx += x[i];
                        }
                            x̄ = Σx / n;
                        try {
                            for(let j in x){
                                Σx2 += Math.pow(x[j] , 2); 
                            }
                                SD = Math.sqrt((Σx2 / n) - Math.pow(x̄ , 2));
                        } catch {
                            for(let j in x){
                                Σx2 += Math.pow((x[j] - x̄) , 2);
                            }
                                SD = Math.sqrt(Σx2  / n);
                        }
                    } else if(f.length !== 0){
                        if(this.data.length === 0) x = this.mid_point();
                        for(let k in x){
                                Σxf += f[k] * x[k];
                            }
                                x̄ = Σxf / n;
                        try {
                            for(let o in x){
                                Σxf2 +=  f[o] * Math.pow(x[o] , 2);
                            }
                                SD = Math.sqrt((Σxf2 / n) - Math.pow(x̄ , 2));
                        } catch {
                            for(let z in x){
                                Σxf2 += f[z] * Math.pow((x[z] - x̄) , 2);
                            }
                                SD = Math.sqrt(Σxf2  / n);
                        }
                    }
                    return `ส่วนเบี่ยงเบนเฉลี่ยมาตราฐาน S.D. = ${SD.toFixed(2)}`;
                }
        
                public Variance = (S:number = 0 , x̄:number = 0 , Σx:number = 0 , n:number = this.n() , f:number[] = this.frequency , x:number[] = this.sortdata , Σx2:number = 0 , Σxf:number = 0 , Σxf2:number = 0):string => {
                    if(x.length > 0 && f.length === 0){
                        for(let q in x){
                            Σx += x[q];
                        }
                            x̄ = Σx / n;
                        try {
                            for(let d in x){
                                Σx2 += Math.pow((x[d] - x̄) , 2);
                            }
                                S = Σx2  / n;
                        } catch {
                            for(let p in x){
                                Σx2 += Math.pow(x[p] , 2); 
                            }
                                S = (Σx2 / n) - Math.pow(x̄ , 2);
                        }
                    } else if(f.length !== 0){
                            if(this.data.length === 0) x = this.mid_point();
                        for(let b in x){
                                Σxf += f[b] * x[b]
                            }
                                x̄ = Σxf / n;
                        try {
                            for(let t in x){
                                Σxf2 +=  f[t] * Math.pow(x[t] , 2)
                            }
                                S = (Σxf2 / n) - Math.pow(x̄ , 2);
                        } catch {
                            for(let e in x){
                                Σxf2 += f[e] * Math.pow((x[e] - x̄) , 2);
                            }
                                S = Σxf2  / n;
                        }
                    }
                    return `ความแปรปรวนของข้อมูล S2 = ${S.toFixed(2)}`;
                }
        
                public Coefficient_of_range = (CR:number = 0 , Xmax = 0 , Xmin = 0 , x:number[] = this.sortdata , f:number[] = this.frequency , c:number[] = this.classinterval):string => {
                    if(x.length > 0 && f.length === 0){
                        Xmax = x[this.data.length - 1];
                        Xmin = x[0];
                    } else if(x.length !== 0 && f.length !== 0){
                        Xmax = x[this.data.length - 1];
                        Xmin = x[0];
                    } else if(x.length === 0 && f.length !== 0 || f.length !== 0 && c.length !== 0){
                        Xmax = (Math.max(...c) + 0.5);
                        Xmin = (Math.min(...c) - 0.5);
                    }
                        CR = (Xmax - Xmin) / (Xmax + Xmin);
                    return `สัมประสิทธิ์ของพิสัย C.R = ${CR.toFixed(3)}`;
                }
        
                public Coefficient_of_quartile_deviation = (CQD:number = 0 , Q1:number = 0 , Q3:number = 0 , x:number[] = this.sortdata , n:number = this.n() , f:number[] = this.frequency , l1:number = 0 , i1:number  = this.I , Σfl1:number = 0 , fq1:number = 0 , l3:number = 0 , i3:number  = this.I , Σfl3:number = 0 , fq3:number = 0):string => {
                    if(x.length > 0 && f.length === 0){
                        let position_Q1 = 1 *(n + 1) / 4;
                            if(Number.isInteger(position_Q1)) Q1 = x[position_Q1 - 1];
                                else {
                                    let position1:number = x[Math.floor(position_Q1) - 1];
                                    let position2:number = x[Math.floor(position_Q1)];
                                    let difference:any = (position_Q1 - Math.trunc(position_Q1)).toFixed(2);
                                        Q1 = position1 + difference * (Math.abs(position2 - position1));
                                } 
                        let position_Q3 = 3 *(n + 1) / 4;
                            if(Number.isInteger(position_Q3)) Q3 = x[position_Q3 - 1];
                                else {
                                    let position1:number = x[Math.floor(position_Q3) - 1];
                                    let position2:number = x[Math.floor(position_Q3)];
                                    let difference:any = (position_Q3 - Math.trunc(position_Q3)).toFixed(2);
                                        Q3 = position1 + difference * (Math.abs(position2 - position1));
                                } 
                    } else if(x.length > 0 && f.length > 0 && this.classinterval.length === 0){
                        let position_Q1 = 1 *(n + 1) / 4;
                        let position_Q3 = 3 *(n + 1) / 4;                
                        let Search:{ Q1:number[] , Q3:number[] } = {
                            Q1: this.cumulative_frequency.filter(item => item < position_Q1),
                            Q3: this.cumulative_frequency.filter(item => item < position_Q3),
                        }
                            Q1 =  x[Search.Q1.length];
                            Q3 =  x[Search.Q3.length];
                    }
                     else if(x.length === 0 && f.length !== 0 && this.classinterval.length !== 0){
                        let Position:{ Q1:number , Q3:number } = {
                            Q1: 1 *(n) / 4,
                            Q3: 3 *(n) / 4,
                        }
                        let Search:{ Q1:number[] , Q3:number[] } = {
                            Q1: this.cumulative_frequency.filter(item => item < Position.Q1),
                            Q3: this.cumulative_frequency.filter(item => item < Position.Q3),
                        }
                            l1 = this.classinterval[Search.Q1.length * 2] - 0.5;
                            Σfl1 = this.cumulative_frequency[Search.Q1.length - 1];
                            fq1 = f[Search.Q1.length];
                            Q1 = l1 + i1 * ((Position.Q1 - Σfl1)  / fq1);
                            l3 = this.classinterval[Search.Q3.length * 2] - 0.5;
                            Σfl3 = this.cumulative_frequency[Search.Q3.length - 1];
                            fq3 = f[Search.Q3.length];
                            Q3 = l3 + i3 * ((Position.Q3 - Σfl3)  / fq3);
                    }
                        CQD = (Q3 - Q1) / (Q3 + Q1);
                    return `สัมประสิทธิ์องส่วนเบี่ยงเบนควอร์ไทล์ C.QD = ${CQD.toFixed(4)}`;
                }
        
                public Coefficient_of_mean_deviation = (CMD:number = 0 , MD:number = 0 , x:number[] = this.sortdata , n:number = this.n() , f:number[] = this.frequency , x̄:number = 0 , Σx:number = 0 , Σxf:number = 0 , Σx2:number = 0 , Σxf2:number = 0):string => {
                    if(x.length > 0 && f.length === 0){
                        for(let t in x){
                            Σx += x[t];
                        }
                            x̄ = Σx / n;
                        for(let u in x){
                            Σx2 += Math.abs(x[u] - x̄);
                        }
                            MD = Σx2 / n;
                    }  else if(f.length !== 0){
                            if(this.data.length === 0) x = this.mid_point();
                        for(let w in x){
                            Σxf += (x[w] * f[w]);
                        }
                            x̄ = Σxf / n;
                        for(let r in x){
                            Σxf2 += f[r] * (Math.abs(x[r] - x̄)); 
                        }
                            MD = Σxf2 / n;
                    }
                        CMD = MD / x̄;
                    return `สัมประสิทธิ์ของส่วนเบี่ยงเบนเฉลี่ย C.MD = ${CMD.toFixed(3)}`;
                }
        
                public Coefficient_of_deviation = (CSD:number = 0 , SD:number = 0 , x:number[] = this.sortdata , n:number = this.n() , f:number[] = this.frequency , x̄:number = 0 , Σx:number = 0 , Σxf:number = 0 , Σx2:number = 0 , Σxf2:number = 0):string => {
                    if(x.length > 0 && f.length === 0){
                        for(let i in x){
                            Σx += x[i];
                        }
                            x̄ = Σx / n;
                        try {
                            for(let j in x){
                                Σx2 += Math.pow(x[j] , 2); 
                            }
                                SD = Math.sqrt((Σx2 / n) - Math.pow(x̄ , 2));
                        } catch {
                            for(let j in x){
                                Σx2 += Math.pow((x[j] - x̄) , 2);
                            }
                                SD = Math.sqrt(Σx2  / n);
                        }
                    } else if(f.length !== 0){
                            if(this.data.length === 0) x = this.mid_point();
                        for(let k in x){
                                Σxf += f[k] * x[k];
                            }
                                x̄ = Σxf / n;
                        try {
                            for(let o in x){
                                Σxf2 +=  f[o] * Math.pow(x[o] , 2)
                            }
                                SD = Math.sqrt((Σxf2 / n) - Math.pow(x̄ , 2));
                        } catch {
                            for(let z in x){
                                Σxf2 += f[z] * Math.pow((x[z] - x̄) , 2);
                            }
                                SD = Math.sqrt(Σxf2  / n);
                        }
                    }
                        CSD = SD / x̄;
                    return `สัมประสิทธิ์ของการแปรผัน C.SD = ${CSD.toFixed(3)}`;
                }
        
                public Standard_scores = (score:any = null , name:string[] = [] , Z:number = 0 , x:number[] = this.sortdata , x̄:number = 0 , Σx:number = 0 , n:number = this.n() , S:number = 0 , Σx2:number = 0):(string|Error) => {
                    // parameter (score) จะต้องให้ผู้ใช้ส่งข้อมูลมาเพื่อนำไปใช้งานต่อไป
                    x.map((index:number) => {
                        Σx += index;
                    });
                        x̄ = Σx / n;
                    for(let xi of x){
                        Σx2 +=  Math.pow(xi - x̄ , 2);
                    }
                        S = Math.sqrt(Σx2 / n);
                        let compose:string[] = [];
                    if(typeof score === 'object' && name.length > 0 && name.length === n){
                            for(let i in x){
                                    Z = (score[i] - x̄) / S;
                                compose.push(`คะแนนของ ${name[i]} มีค่ามาตราฐาน = ${Z}`);
                            }
                        return `${compose.map((c) => `\n${c}`)}`;
                    } 
        
                    if(typeof score === 'object' && name.length === 0) {
                        let count:number = 1;
                        for(let j in x){
                                    Z = (score[j] - x̄) / S;
                                compose.push(`คะแนนชุดที่ ${count++} มีค่ามาตราฐาน = ${Z}`);
                            }
                        return `${compose.map((c) => `\n${c}`)}`;
                    }
        
                    if(typeof score === 'number' && name.length === 0){
                            Z = (score - x̄) / S;
                        return `ค่ามาตราฐาน Z = ${Z}`;
                    } else {
                        return new Error(`เกิดข้อผิดพลาดขึ้น!\nการส่งค่า argument นั้นต้องส่งเป็นตัวเลขเท่านั้น`);
                    } 
                }
        }
    
const Stat:Statistics = new Statistics();
export { Stat , Statistics };
>>>>>>> a3c91b8a3a31c1c6838156bae10fc3cebbdde9ef
