// npm i -g typescript
// npm install
// ts-node './debug/test.ts'
// tsc main.ts

/* newVersion 0.0.2
    * เริ่ม: (23/2/2566)
    * เสร็จ:
                อัปเดตใหม่
    - แก้ไขชื่อ methods และ property ใหม่
    - มี private accessor ที่เก็บค่าข้อมูลและควบคุมการทำงานในแต่ละทุกเงื่อนไขไว้ช่วยเหลือในการคำนวณข้อมูลใน public methods
    - มีการตรวจสอบข้อมูลใน array ทุกครั้งตอนรันสคริปต์ถ้าข้อมูลมัข้อผิดพลาดจะหยุดทำงานโปรแกรม
    - การ return ของ methods ท้งหมดจะ return ได้ 2 ค่าคือ ทศนิยมจริง(ทศนิยมไม่รู้จบ) กับ ทศนิยม 2 ตำแหน่ง(ปัดขึ้นและปัดลง)
    - มีสร้างข้อมูลเป็น object แล้วแปลงไปเป็นไฟล์ json เพื่อนำข้อมูลที่เป็นตัวเลขไปยกตัวอย่างการใช้งาน
    - ปรับ code ในบางส่วน
    - เพิ่มการแสดงข้อมูลในส่วนตาราง
*/

interface subProcess {
    x: number[];
    f: number[];
    xf: CallableFunction;
    cf: number[];
    ci: CallableFunction;
    w: number[];
    wx: CallableFunction;
    sumX: CallableFunction;
    sumF: CallableFunction;
    sumXF: CallableFunction;
    sumW: CallableFunction;
    sumWX: CallableFunction;
    sumMDX: CallableFunction;
    sumMDX2: CallableFunction;
    sumMDXF: CallableFunction;
    sumSDX: CallableFunction;
    sumSDXF: CallableFunction;
    sumSD2: CallableFunction;
    sumFSD: CallableFunction;
    sumFSD2: CallableFunction;
    meanX: CallableFunction;
    meanXF: CallableFunction;
    meanMDX: CallableFunction;
    meanMDXF: CallableFunction;
    meanWX: CallableFunction;
    meanSDX: CallableFunction;
    meanSDXF: CallableFunction;
    arrayMDX: CallableFunction;
    arrayMDX2: CallableFunction;
    arrayMDXF: CallableFunction;
    arraySDX: CallableFunction;
    arraySDX2: CallableFunction;
    arraySDXF: CallableFunction;
    arrayFSD: CallableFunction;
    arrayFSD2: CallableFunction;
    decimalCheck: CallableFunction;
    checkForNegativeNumber: CallableFunction;
    checkForZeronumber: CallableFunction;
    findCumulativeFrequency: CallableFunction;
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
    private haveData: boolean;
    private notHaveData: boolean;
    private haveFrequency: boolean;
    private notHaveFrequency: boolean;
    private haveClassInterval: boolean;
    private notHaveClassInterval: boolean;
    private haveWeight: boolean;
    private notHaveWeight: boolean;
    private completeData: boolean;
    private notCompleteData: boolean;
    private haveANumber: boolean;
    private notHaveANumber: boolean;
    private isEven: boolean;
    private isOdd: boolean;
    private classIntervalIsEven: boolean;
    private classIntervalIsOdd: boolean;
    private dataValidation: Function;
    public constructor(
        /* parameter ที่ต้องรับค่ามาจากผู้ใช้งาน */
        private xi: number[] = [],      // param1 ข้อมูล
        private fi: number[] = [],      // param2 ความถี่
        private ci: number[] = [],      // param3 อัตรภาคชั้น
        private wi: number[] = [],      // param4 หน่วยกิต
        private cf: number[] = [fi[0]], // param5 ความถี่สะสม
    ) {

        /* แบ่งชนิดข้อมูลในแต่ละ property */
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

        /* เงื่อนไขในการควบคุม */
        this.haveData = this.data.length > 0 && this.data.length !== 0;
        this.notHaveData = this.data.length === 0;
        this.haveFrequency = this.frequency.length > 0 && this.frequency.length !== 0;
        this.notHaveFrequency = this.frequency.length === 0;
        this.haveClassInterval = this.classInterval.length > 0 && this.classInterval.length !== 0;
        this.notHaveClassInterval = this.classInterval.length === 0;
        this.completeData = (this.data.length / 2 === this.frequency.length / 2) || (this.w.length / 2 === this.data.length / 2) || (this.frequency.length / 2 === this.classInterval.length / 4);
        this.notCompleteData = !this.completeData;
        this.haveWeight = this.w.length > 0 && this.w.length !== 0;
        this.notHaveWeight = this.w.length === 0;
        this.haveANumber = this.n() > 0;
        this.notHaveANumber = this.n() === 0 || this.n() < 0;
        // เลขคู่เลขคี่
        this.classIntervalIsEven = this.classInterval.length % 2 === 0;
        this.classIntervalIsOdd = this.classInterval.length % 2 !== 0;
        this.isEven = this.data.length % 2 === 0;
        this.isOdd = this.data.length % 2 !== 0;
        this.dataValidation = () => {
            const textError = `โปรมแกรมหยุดทำงาน!\nโปรดใส่ข้อมูลให้ครบถ้วนก่อนรันคำสั่ง`;
            if (arguments[4]) {
                throw new Error(textError.concat('\nError code: @4'));
            }
            if ((xi === undefined || xi.length === 0) && (fi === undefined || fi.length === 0) && (ci === undefined || ci.length === 0) && (wi === undefined || wi.length === 0)) {
                throw new Error(textError.concat('\nError code: @1'));
            }
            if (xi.length !== 0 && fi.length !== 0 && xi.length !== fi.length) {
                throw new Error(textError.concat('\nError code: @6'));
            }
            if ((xi.length === 0 && fi.length > 0 && ci === undefined) || (fi.length > 0 && ci.length === 0 && xi.length === 0) || (xi.length === 0 && fi.length > 0 && ci.length === 0)) {
                throw new Error(textError.concat('\nError code: @2'));
            }
            if ((xi.length !== 0 && fi.length !== 0 && ci.length !== 0) || (xi.length !== 0 && fi.length !== 0 && ci.length !== 0 && (wi.length !== 0 || wi === undefined))) {
                throw new Error(textError.concat('\nError code: @9'));
            }
            if (fi.length !== 0 && ci.length !== 0 && fi.length !== ci.length / 2 || xi.length === 0) {
                throw new Error(textError.concat('\nError code: @5'));
            }
            if ((xi.length !== 0 && ci.length !== 0 && fi.length === 0)) {
                throw new Error(textError.concat('\nError code: @8'));
            }
            if ((wi.length > 0 && xi.length === 0) || (wi.length > 0 && fi.length > 0) || (wi.length > 0 && ci.length > 0) || (wi.length > 0 && fi.length > 0 )) {
                throw new Error(textError.concat('\nError code: @3'));
            }
            if (wi.length !== 0 && xi.length !== 0 && xi.length !== wi.length) {
                throw new Error(textError.concat('\nError code: @7'));
            }
        }

        // ตรวจสอบข้อมูลก่อนนำข้อมูลไปคำนวณ
        this.dataValidation();

        /* แสดงผลข้อมูล */
        this.showData = (oldInformation: string = `ข้อมูลเดิมคือ ${this.data.join(',')}`, newInformation: string = `เรียงข้อมูลชุดใหม่ได้ ${this.sortData.join(',')}`): void => {
            if (this.notHaveData) console.error(new Error('ไม่มีข้อมูล!\nโปรดใส่ข้อมูลก่อนใช้คำสั่งนี้'));
            else console.log(`${oldInformation}\n${newInformation}`);
        }
        this.showFrequency = (oldFrequency: string = `ความถี่ ${this.frequency.join(' ')}`, newFrequency: string = `ความถี่สะสม ${this.cumulativeFrequency.join(' ')}`): void => {
            if (this.haveFrequency) console.log(`${oldFrequency}\n${newFrequency}`);
            else console.error(new Error('ข้อมูลในชุดนี้ไม่มีความถี่!'));
        }
        this.showNumber = (): void => {
            if (this.haveANumber) console.log(`ข้อมูลชุดนี้มีทั้งหมด ${this.n()} จำนวน`);
            else console.error(new Error('ข้อมูลในชุดนี้ไม่มีจำนวนข้อมูล!'));
        }
        this.showWidth = (i: number = this.i): void => {
            if (Number.isNaN(i) || this.classIntervalIsOdd) console.error(new Error('จำนวนข้อมูลในอันตรภาคชั้นไม่สามารถใส่เป็นเลขคี่ได้!'));
            else if (this.haveClassInterval) console.log(`ความกว้างของอันตรภาคชั้นคือ ${i}`);
            else console.error(new Error('ไม่มีข้อมูลของอัรตรภาคชั้น!'));
        };
        this.showWeignt = (): void => {
            if (this.haveWeight) console.log(`ค่าน้ำหนักหรือหน่วยกิต ${this.w.join(' ')}`);
            else console.error(new Error('ข้อมูลในชุดนี้ไม่มีค่าน้ำหนักหรือค่าหน่วยกิต!'));
        }
        this.showMiddle = (): void => {
            if (this.classIntervalIsOdd) console.error(new Error('จำนวนข้อมูลในอันตรภาคชั้นไม่สามารถใส่เป็นเลขคี่ได้!'));
            else if (this.haveClassInterval && this.classIntervalIsEven) console.log(`จุดกึ่งกลางอันตรภาคชั้นคือ ${this.midPoint().join(' ')}`);
            else console.error(new Error('ไม่มีข้อมูลของอัรตรภาคชั้น!'));
        }
        this.showClassInterval = (topEdge: number = 0, bottomEdge: number = 1): void => {
            let table: object[] = [{ classInterval: 'อันตรภาคชั้น' }]
            for (let i: number = 0; i < this.classInterval.length / 2; i++) {
                table.push({ classInterval: `${this.classInterval[topEdge]} - ${this.classInterval[bottomEdge]}` })
                topEdge += 2;
                bottomEdge += 2;
            }
            console.table(table);
        }

        /* property ไว้ใช้งานใน class */
        this.subProcess = {
            // ข้อมูลที่ว้ใช้ในส่วนตาราง
            x: this.data,
            f: this.frequency,
            cf: this.cumulativeFrequency,
            xf: (x: number[] = this.midPoint(), f: number[] = this.frequency): number[] => {
                let array: number[] = [];
                for (let i in x && f) {
                    array.push(x[i] * f[i]);
                }
                return array;
            },
            w: this.w,
            wx: (w: number[] = this.w, x: number[] = this.midPoint()): number[] => {
                let array: number[] = [];
                for (let i: number = 0; w.length > i; i++) {
                    array[i] = w[i] * x[i];
                }
                return array;
            },
            ci: (topEdge: number = 0, bottomEdge: number = 1): string[] => {
                let array: string[] = [];
                if (this.classIntervalIsEven) {
                    for (let i: number = 0; i < this.classInterval.length / 2; i++) {
                        array.push(`${this.classInterval[topEdge]} - ${this.classInterval[bottomEdge]}`)
                        topEdge += 2;
                        bottomEdge += 2;
                    }
                } else if (this.classIntervalIsOdd) {
                    throw new Error('ข้อมูลของอันตรภาคชั้นจำนวนข้อมูลทั้งหมดต้องเป็นเลขคู่');
                }
                return array;
            },
            sumX: (x: number[] = this.midPoint()) => x.reduce((prev: number, curren: number): number => prev + curren),
            sumF: (f: number[] = this.frequency) => f.reduce((prev: number, curren: number): number => prev + curren),
            sumXF: (x: number[] = this.midPoint(), f: number[] = this.frequency): number => {
                let c: number = x.length === f.length ? 0 : -1;
                let sum: number = 0;
                while (c < x.length && c < f.length) {
                    sum += x[c] * f[c];
                    c++;
                }
                return sum;
            },
            sumW: (w: number[] = this.w): number => w.reduce((prev: number, curren: number): number => prev + curren),
            sumWX: (w: number[] = this.w, x: number[] = this.midPoint()): number => {
                let sum: number = 0;
                for (let i in w && x) {
                    sum += w[i] * x[i];
                }
                return sum;
            },
            sumMDX: (x: number[] = this.midPoint(), x̄: number = this.subProcess.meanX()): number => {
                let sum: number = 0;
                for (let xi of x) {
                    sum += Math.abs(xi - x̄);
                }
                return sum;
            },
            sumMDX2: (x: number[] = this.midPoint(), x̄: number = this.subProcess.meanXF()): number => {
                let sum: number = 0;
                for (let xi of x) {
                    sum += Math.abs(xi - x̄);
                }
                return sum;
            },
            sumMDXF: (x: number[] = this.midPoint(), f: number[] = this.frequency, x̄: number = this.subProcess.meanXF()): number => {
                let sum: number = 0;
                for (let i in x) {
                    sum += f[i] * (Math.abs(x[i] - x̄));
                }
                return sum;
            },
            sumSD2: (x: number[] = this.midPoint(), Σx: number = 0): number => {
                Σx = this.subProcess.arraySDX2().reduce((prev: number, curren: number) => prev + curren);
                return Σx;
            },
            sumSDX: (x: number[] = this.midPoint(), Σx: number = 0): number => {
                Σx = this.subProcess.arraySDX().reduce((prev: number, curren: number) => prev + curren);
                return Σx;
            },
            sumFSD: (Σx: number = 0): number => {
                Σx = this.subProcess.arrayFSD().reduce((prev: number, curren: number): number => prev + curren);
                return Σx;
            },
            sumFSD2: (Σx: number = 0): number => {
                Σx = this.subProcess.arrayFSD2().reduce((prev: number, curren: number): number => prev + curren);
                return Σx;
            },
            sumSDXF: (Σx: number = 0): (number | undefined) => {
                if (this.haveData && this.haveFrequency) {
                    Σx = this.subProcess.arraySDXF().reduce((prev: number, curren: number): number => prev + curren);
                    return Σx;
                } else return Σx;
            },
            meanX: (x̄: number = 0, n: number = this.n(), Σx: number = 0): number => {
                Σx = this.subProcess.sumX();
                x̄ = Σx / n;
                return x̄;
            },
            meanXF: (x̄: number = 0, n: number = this.n(), Σxf: number = 0): number => {
                Σxf = this.subProcess.sumXF();
                x̄ = Σxf / n;
                return x̄;
            },
            meanWX: (x̄: number = 0, Σw: number = this.subProcess.sumW(), Σwx: number = 0): number => {
                Σwx = this.subProcess.sumWX();
                x̄ = Σwx / Σw;
                return x̄;
            },
            meanMDX: (MDX: number = 0, n: number = this.n()): number => {
                MDX = this.subProcess.sumMDX() / n;
                return MDX;
            },
            meanMDXF: (MDXF: number = 0, n: number = this.n()): number => {
                MDXF = this.subProcess.sumMDXF() / n;
                return MDXF;
            },
            meanSDX: (SDX: number = 0, n: number = this.n(), Σx: number = 0): number => {
                Σx = this.subProcess.sumSDX();
                SDX = Math.sqrt(Σx / n);
                return SDX;
            },
            meanSDXF: (SDXF: number = 0, n: number = this.n(), Σx: number = 0): number => {
                Σx = this.subProcess.sumSDXF();
                SDXF = Math.sqrt(Σx / n);
                return SDXF;
            },
            arrayMDX: (array: number[] = [], x: number[] = this.midPoint()): number[] => {
                for (let xi of x) {
                    let el: number = Math.abs(xi - this.subProcess.meanX());
                    array.push(el);
                }
                return array;
            },
            arrayMDX2: (array: number[] = [], x: number[] = this.midPoint()): number[] => {
                for (let xi of x) {
                    let el: number = Math.abs(xi - this.subProcess.meanXF());
                    array.push(el);
                }
                return array;
            },
            arrayMDXF: (array: number[] = [], x: number[] = this.midPoint(), f: number[] = this.frequency): number[] => {
                for (let i in x) {
                    array.push(f[i] * Math.abs(x[i] - this.subProcess.meanXF()));
                }
                return array;
            },
            arraySDX2: (array: number[] = [], x: number[] = this.midPoint()): number[] => {
                for (let xi of x) {
                    array.push(xi - this.subProcess.meanX());
                }
                return array;
            },
            arraySDX: (array: number[] = []): number[] => {
                this.subProcess.arraySDX2().map((item: number) => {
                    array.push(Math.pow(item, 2));
                })
                return array;
            },
            arrayFSD: (array: number[] = [], x: number[] = this.midPoint()): number[] => {
                x.map((xi: number) => {
                    array.push(xi - this.subProcess.meanXF());
                })
                return array;
            },
            arrayFSD2: (array: number[] = []): number[] => {
                this.subProcess.arrayFSD().map((item: number) => {
                    array.push(item ** 2);
                })
                return array;
            },
            arraySDXF: (array: number[] = [], f: number[] = this.frequency): number[] => {
                for (let i in f) {
                    array.push(f[i] * this.subProcess.arrayFSD2()[i]);
                }
                return array;
            },

            // เช็คข้อมูลใน methods Qr Dr Pr
            decimalCheck: (num: number): boolean => {
                // code: -1 ไม่มีทศนิยม
                // code: -1 มีทศนิยม
                let status: boolean = true;
                num.toString().indexOf('.') === 1 ? status : status = !status;
                return status;
            },
            checkForNegativeNumber: (num: number): boolean => num < 0,
            checkForZeronumber: (num: number): boolean => num === 0,
            findCumulativeFrequency: (position: number): number[] => this.cumulativeFrequency.filter((item: number) => item < position),
        }

        // ตาราง
        this.showTable = (word: string, classInterval: string[] = [], data: (string | number)[] = [], frequency: (string | number)[] = [], cumulativeFrequency: (string | number)[] = [], midPoint: (string | number)[] = [], xf: (string | number)[] = [], weight: (string | number)[] = [], wx: (string | number)[] = [], MD: (string | number)[] = []
            , fMD: (string | number)[] = [], MD2: (string | number)[] = [], SD: (string | number)[] = [], SD2: (string | number)[] = [], FSD: (string | number)[] = [], FSD2: (string | number)[] = []
            , SDXF: (string | number)[] = []): void => {
            let table: object[] = [];
            let status: boolean = false;
            let summary: string[] = ['\tสรุปข้อมูลในตาราง', `- จำนวนข้อมูลทั้งหมด = ${this.n()} จำนวน`];
            /*
                        รหัสชนิดของตารางที่แสดงผล
                - t1 แสดง -> ข้อมูล , ความถี่ , ข้อมูล x ความถี่
                - t2 แสดง -> ข้อมูล , ความถี่ , ความถึ่สะสม , ข้อมูล x ความถี่
                - t3 แสดง -> อันตรภาคชั้น , จุดกึ่งกลางชั้น , ความถี่ , ความถี่สะสม , ข้อมูล x ความถี่
                - t4 แสดง -> ข้อมูล , ค่าหน่วยกิต , ค่าหน่วยกิต x ข้อมูล
                - t5 แสดง -> อันตรภาคชั้น , จุดกึ่งกลางชั้น , ข้อมูล , ความถี่ , ข้อมูล x ความถี่ , ส่วนเบี่ยงเบนเฉลี่ย
                - t6 แสดง -> อันตรภาคชั้น , จุดกึ่งกลางชั้น , ข้อมูล , ความถี่ , ข้อมูล x ความถี่ , ส่วนเบี่ยงมาตราฐาน
            */
            const tableType = (w: string): (object[] | any) => {

                // กำหนดค่าต่างๆให้ default parameter
                if (this.haveData) data = ['ข้อมูล', ...this.data, `Σx = ${this.subProcess.sumX()}`];
                if (this.haveFrequency) frequency = ['ความถี่', ...this.frequency, `n = ${this.subProcess.sumF()}`];
                if (this.haveWeight) {
                    weight = ['ค่าถ่วงน้ำหนัก', ...this.w, `Σw = ${this.subProcess.sumW()}`];
                    wx = [...this.subProcess.wx(), `Σwx = ${this.subProcess.sumWX()}`];
                    wx.unshift('ข้อมูล x ค่าถ่วงน้ำหนัก');
                }
                cumulativeFrequency = ['ความถี่สะสม', ...this.cumulativeFrequency, ' - '];
                classInterval = ['อันตรภาคชั้น', ...this.subProcess.ci(), 'รวม'];
                midPoint = ['จุดกึ่งกลางชั้น', ...this.midPoint(), `Σx = ${this.subProcess.sumX()}`];
                xf = [...this.subProcess.xf(), `Σxf = ${this.subProcess.sumXF()}`];
                xf.unshift('ข้อมูล x ความถี่');
                MD = ['|ข้อมูล - ค่าเฉลี่ย|', ...this.subProcess.arrayMDX(), `Σ|x - x̄| = ${this.subProcess.sumMDX()}`];
                MD2 = ['|ข้อมูล - ค่าเฉลี่ย|', ...this.subProcess.arrayMDX2(), `Σ|x - x̄| = ${this.subProcess.sumMDX2()}`];
                fMD = ['ความถี่|ข้อมูล - ค่าเฉลี่ย|', ...this.subProcess.arrayMDXF(), `Σf|x - x̄| = ${this.subProcess.sumMDXF()}`];
                SD2 = ['ข้อมูล - ค่าเฉลี่ย', ...this.subProcess.arraySDX2(), `Σ(x - x̄) = ${this.subProcess.sumSD2()}`];
                SD = ['(ข้อมูล - ค่าเฉลี่ย)^2', ...this.subProcess.arraySDX(), `Σ(x - x̄)^2 = ${this.subProcess.sumSDX()}`];
                FSD = ['ข้อมูล - ค่าเฉลี่ย', ...this.subProcess.arrayFSD(), `Σ(x - x̄) = ${this.subProcess.sumFSD()}`];
                FSD2 = ['(ข้อมูล - ค่าเฉลี่ย)^2', ...this.subProcess.arrayFSD2(), `Σ(x - x̄)^2 = ${this.subProcess.sumFSD2()}`];
                SDXF = ['ความถี่(ข้อมูล - ค่าเฉลี่ย)^2', ...this.subProcess.arraySDXF(), `Σf(x - x̄)^2 = ${this.subProcess.sumSDXF()}`];

                if (typeof w === "string") {
                    status = !status;
                    if (w === '') {
                        if (this.haveData && this.notHaveClassInterval) {
                            for (let i: number = 0; i <= this.data.length + 1; i++) {
                                table.push({ x: data[i] });
                            }
                        } else {
                            for (let i: number = 0; i <= (this.classInterval.length / 2) + 1; i++) {
                                table.push({ ci: classInterval[i], x: midPoint[i] });
                            }
                        }
                        summary.push(`- ค่าเฉลี่ยเลขคณิต ≈ ${this.subProcess.meanX()} = ${this.subProcess.meanX().toFixed(2)}`);

                    } else if (w === 't1'.toUpperCase() || w === 't1'.toLowerCase()) {
                        for (let i: number = 0; i <= this.data.length + 1; i++) {
                            table.push({ x: data[i], f: frequency[i], xf: xf[i] });
                        }
                        summary.push(`- ค่าเฉลี่ยเลขคณิต ≈ ${this.subProcess.meanXF()} = ${this.subProcess.meanXF().toFixed(2)}`);

                    } else if (w === 't2'.toUpperCase() || w === 't2'.toLowerCase()) {
                        for (let i: number = 0; i <= this.data.length + 1; i++) {
                            table.push({ x: data[i], f: frequency[i], cf: cumulativeFrequency[i], xf: xf[i] });
                        }
                        summary.push(`- ค่าเฉลี่ยเลขคณิต ≈ ${this.subProcess.meanXF()} = ${this.subProcess.meanXF().toFixed(2)}`);

                    } else if (w === 't3'.toUpperCase() || w === 't3'.toLowerCase()) {
                        for (let i: number = 0; i <= (this.classInterval.length / 2) + 1; i++) {
                            table.push({ ci: classInterval[i], x: midPoint[i], f: frequency[i], cf: cumulativeFrequency[i], xf: xf[i] });
                        }
                        summary.push(`- ค่าเฉลี่ยเลขคณิต ≈ ${this.subProcess.meanXF()} = ${this.subProcess.meanXF().toFixed(2)}`);

                    } else if (w === 't4'.toUpperCase() || w === 't4'.toLowerCase()) {
                        for (let i: number = 0; i <= this.w.length + 1; i++) {
                            table.push({ x: data[i], w: weight[i], wx: wx[i] });
                        }
                        summary.push(`- ค่าเฉลี่ยเลขคณิต ≈ ${this.subProcess.meanWX()} = ${this.subProcess.meanWX().toFixed(2)}`);

                    } else if (w === 't5'.toUpperCase() || w === 't5'.toLowerCase()) {
                        if (this.haveData && this.notHaveFrequency) {
                            for (let i: number = 0; i <= this.data.length + 1; i++) {
                                table.push({ x: data[i], '|x - x̄|': MD[i] });
                            }
                            summary.push(`- ค่าเฉลี่ยเลขคณิต ≈ ${this.subProcess.meanX()} = ${this.subProcess.meanX().toFixed(2)}`
                                , `- ส่วนเบี่ยงเบนเฉลี่ย ≈ ${this.subProcess.meanMDX()} = ${this.subProcess.meanMDX().toFixed(2)}`);

                        } else if (this.notHaveData && this.haveFrequency && this.haveClassInterval) {
                            for (let i: number = 0; i <= (this.classInterval.length / 2) + 1; i++) {
                                table.push({ ci: classInterval[i], x: midPoint[i], f: frequency[i], xf: xf[i], '|x - x̄|': MD2[i], 'f|x - x̄|': fMD[i] });
                            }
                            summary.push(`- ค่าเฉลี่ยเลขคณิต ≈ ${this.subProcess.meanXF()} = ${this.subProcess.meanXF().toFixed(2)}`
                                , `- ส่วนเบี่ยงเบนเฉลี่ย ≈ ${this.subProcess.meanMDXF()} = ${this.subProcess.meanMDXF().toFixed(2)}`);

                        } else {
                            for (let i: number = 0; i <= this.data.length + 1; i++) {
                                table.push({ x: data[i], f: frequency[i], xf: xf[i], '|x - x̄|': MD2[i], 'f|x - x̄|': fMD[i] });
                            }
                            summary.push(`- ค่าเฉลี่ยเลขคณิต ≈ ${this.subProcess.meanXF()} = ${this.subProcess.meanXF().toFixed(2)}`
                                , `- ส่วนเบี่ยงเบนเฉลี่ย ≈ ${this.subProcess.meanMDXF()} = ${this.subProcess.meanMDXF().toFixed(2)}`);
                        }

                    } else if (w === 't6'.toUpperCase() || w === 't6'.toLowerCase()) {
                        if (this.haveData && this.notHaveFrequency) {
                            for (let i: number = 0; i <= this.data.length + 1; i++) {
                                table.push({ x: data[i], 'x - x̄': SD2[i], '(x - x̄)^2': SD[i] });
                            }
                            summary.push(`- ค่าเฉลี่ยเลขคณิต ≈ ${this.subProcess.meanX()} = ${this.subProcess.meanX().toFixed(2)}`
                                , `- ส่วนเบี่ยงมาตราฐาน ≈ ${this.subProcess.meanSDX()} = ${this.subProcess.meanSDX().toFixed(2)}`);
                        } else if (this.haveData && this.haveFrequency) {
                            for (let i: number = 0; i <= this.data.length + 1; i++) {
                                table.push({
                                    x: data[i], f: frequency[i], xf: xf[i], 'x - x̄': FSD2[i], '(x - x̄)^2': FSD[i]
                                    , 'f(x - x̄)^2': SDXF[i]
                                });
                            }
                            summary.push(`- ค่าเฉลี่ยเลขคณิต ≈ ${this.subProcess.meanXF()} = ${this.subProcess.meanXF().toFixed(2)}`
                                , `- ส่วนเบี่ยงเบนเฉลี่ย ≈ ${this.subProcess.meanSDXF()} = ${this.subProcess.meanSDXF().toFixed(2)}`);

                        } else if (this.haveClassInterval && this.haveFrequency && this.notHaveData) {
                            for (let i: number = 0; i <= (this.classInterval.length / 2) + 1; i++) {
                                table.push({
                                    ci: classInterval[i], x: midPoint[i], f: frequency[i], xf: xf[i], 'x - x̄': FSD[i], '(x - x̄)^2': FSD2[i]
                                    , 'f(x - x̄)^2': SDXF[i]
                                });
                            }
                            summary.push(`- ค่าเฉลี่ยเลขคณิต ≈ ${this.subProcess.meanXF()} = ${this.subProcess.meanXF().toFixed(2)}`
                                , `- ส่วนเบี่ยงเบนเฉลี่ย ≈ ${this.subProcess.meanSDXF()} = ${this.subProcess.meanSDXF().toFixed(2)}`);
                        }
                    } else {
                        status = false;
                        const typeT: string[] = ['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8'];
                        const check: string = w;
                        const textError: string = `เกิดข้อผิดพลาดขึ้นโปรดทำตามคำแนะนำหล่านี้!
                        * รหัสชนิดตาราง (${check}) นั้นไม่มีอยู่ในรหัสตารางที่สร้างไว้
                        * รหัสตารางได้แก่ ${typeT.join(' , ')} เป็นต้น
                        - โปรดตรวจสอบข้อมูลให้ถูกต้อง
                        - กรอกข้อมูลใหม่หรือกรอกให้ครบ
                        - กรอกรหัสชนิดตารางให้ถูกต้อง
                        - หากไม่มีข้อมูลบางชนิดให้ใส่เป็น array เปล่า []`;
                        return textError;
                    }
                    return table;
                } else {
                    if (typeof word === 'undefined' || word === undefined) return 'โปรดระบุรหัสชนิดของตาราง!';
                    else return 'โปรดใส่ข้อมูลที่เป็นชนิดข้อความเท่านั้น!';
                }
            }
            try {
                console.table(tableType(word));
            } catch (err: unknown) {
                throw err
            } finally {
                if (status) {
                    summary.forEach((inx: string): void => console.log(inx));
                }
            }
        }
    }

    public mean = (x̄: number = 0, x: number[] = this.sortData, Σxi: number = 0, n: number = this.n(), f: number[] = this.frequency, Σxifi: number = 0, w: number[] = this.w, Σwixi: number = 0, Σwi: number = 0): string => {
        if (this.notHaveData) x = this.midPoint();
        if (this.haveData && this.notHaveFrequency && this.notHaveWeight) {
            for (let i: number = 0; n > i; i++) {
                Σxi += x[i];
            }
            x̄ = Σxi / n;
        } else if (this.haveFrequency && this.notHaveWeight) {
            for (let j in x) {
                Σxifi += x[j] * f[j];
            }
            x̄ = Σxifi / n;
        } else if (this.haveWeight) {
            x = this.data;
            for (let k in w) {
                Σwixi += w[k] * x[k];
                Σwi += w[k];
            }
            x̄ = Σwixi / Σwi;
        } else {
            throw new Error('เกิดข้อผิดพลาดขึ้นโปรดลองใส่ข้อมูลใหม่')
        }
        return `ค่าเฉลี่ยเลขคณิต x̄ = ${x̄} \nปัดเป็นทศนิยม 2 ตำแหน่ง = ${x̄.toFixed(2)}`;
    }

    public median = (Med: number = 0, n: number = this.n(), l: number = 0, i: number = this.i, x: number[] = this.sortData, f: number[] = this.frequency, Σfl: number = 0, fm: number = 0, positionMed: any = 0): (string | Error) => {
        if (this.notHaveData) throw new Error('คุณยังไม่ได้ใส่ข้อมูล!');
        if (this.haveData && this.notHaveFrequency) {
            console.log(this.showData());
            n % 2 !== 0 ? Med = this.sortData[Math.floor(n / 2)] : Med = (this.sortData[Math.floor((n - 1) / 2)] + this.sortData[Math.floor((n + 1) / 2)]) / 2;
            if (n % 2 !== 0) positionMed = Math.ceil(n / 2);
            else positionMed = `${this.sortData[Math.floor((n - 1) / 2)]} ระหว่าง ${this.sortData[Math.floor((n + 1) / 2)]}`
        } else {
            let search: number[] = this.cumulativeFrequency.filter((item: number) => item < positionMed);
            positionMed = n / 2;
            if (this.notHaveClassInterval) {
                Med = x[search.length];
            } else {
                if (this.notHaveClassInterval) l = x[search.length * 2] - 0.5;
                else l = this.classInterval[search.length * 2] - 0.5;
                Σfl = this.cumulativeFrequency[search.length - 1];
                fm = this.frequency[search.length];
                Med = l + i * ((positionMed - Σfl) / fm);
            }
        }
        return `ตำแหน่งมัธยฐาน = ${positionMed} \nมัธยฐาน Me = ${Med} `;
    }

    public mode = (Mode: number = 0, count: any = {}, max: number = 0, x: number[] = this.sortData, f: number[] = this.frequency, d1: number = 0, d2: number = 0, l: number = 0, i: number = this.i): any => {
        if (this.haveData && this.notHaveFrequency) {
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
        } else if (this.haveFrequency) {
            let maximumFrequency: number = Math.max(...f);
            if (this.notHaveClassInterval) Mode = x[f.indexOf(maximumFrequency)];
            else {
                l = this.classInterval[f.indexOf(maximumFrequency) * 2] - 0.5;
                d1 = f[f.indexOf(maximumFrequency)] - f[f.indexOf(maximumFrequency) - 1];
                d2 = f[f.indexOf(maximumFrequency)] - f[f.indexOf(maximumFrequency) + 1];
                Mode = l + i * (d1 / (d1 + d2));
            }
            return `ฐานนิยม Mo = ${Mode}\nปัดเป็นทศนิยม 2 ตำแหน่ง = ${Mode.toFixed(2)}`;
        }
    }

    public midRange = (range: number = 0, x: number[] = this.sortData, n: number = this.sortData.length, xmax: number = 0, xmin: number = 0): string => {
        if (this.haveData) {
            xmax = x[n - 1];
            xmin = x[n - n];
            range = (xmax + xmin) / 2;
        } else {
            throw new Error('โปรดใส่ข้อมูลก่อน!');
        }
        return `ค่ากึ่งกลางพิสัย = ${range}`;
    }

    public range = (r: number = 0, xmax = 0, xmin = 0, x: number[] = this.sortData, c: number[] = this.classInterval): string => {
        if (this.haveData && this.notHaveFrequency) {
            xmax = x[this.data.length - 1];
            xmin = x[0];
        } else if (this.haveFrequency && this.haveClassInterval) {
            xmax = (Math.max(...c) + 0.5);
            xmin = (Math.min(...c) - 0.5);
        } else {
            throw new Error('เกิดข้อผิดพลาดขี้นโปรดใส่ข้อมูลใหม่อีกครั้ง!');
        }
        r = xmax - xmin;
        return `พิสัย = ${r}`;
    }

    public geometricMean = (GM: number = 0, x: number[] = this.data, n: number = this.n(), Σlogxi: number = 1): string => {
        if (this.notHaveData) throw new Error('โปรดใส่ข้อมูลก่อน!');
        for (let i in x) {
            Σlogxi *= x[i];
        }
        GM = Σlogxi ** (1 / n);
        return `ค่าเฉลี่ยเรขาคณิต G.M. = ${GM}\nปัดเป็นทศนิยม 2 ตำแหน่ง = ${GM.toFixed(2)}`;
    }

    public harmonicMean = (HM: number = 0, x: number[] = this.data, n: number = this.n(), Σ1_xi: number = 0, f: number[] = this.frequency, Σfi_xi: number = 0): string => {
        if (this.haveData && this.notHaveFrequency) {
            for (let i: number = 0; i < n; i++) {
                Σ1_xi += 1 / x[i];
            }
            HM = n / Σ1_xi;
        } else if (this.haveFrequency) {
            if (this.notHaveData) x = this.midPoint();
            for (let j in x) {
                Σfi_xi += Number((f[j] / x[j]));
            }
            HM = n / Σfi_xi;
        } else {
            throw new Error('เกิดข้อผิดพลาดขี้นโปรดใส่ข้อมูลใหม่อีกครั้ง!');
        }
        return `ค่าเฉลี่ยฮาร์โมนิค H.M. = ${HM}\nปัดเป็นทศนิยม 2 ตำแหน่ง = ${HM.toFixed(2)}`;
    }

    public Qr = (r: any, Qr: number = 0, positionQr: number = 0, x: number[] = this.sortData, n: number = this.n(), l: number = 0, i: number = this.i, Σfl: number = 0, fq: number = 0): any => {
        // parameter (r) จะต้องให้ผู้ใช้ส่งข้อมูลมาเพื่อนำมาใช้งาน
        if (Qr || Qr && positionQr) throw new Error(`ส่งข้อมูลได้แค่ค่าเดียว!`);
        if (this.subProcess.checkForNegativeNumber(r)) throw new Error(`ตำแหน่งควอร์ไทล์ที่ ${r} ไม่สามารถหาค่าควอร์ไทล์ได้เพราะตำแหน่งควอร์ไทล์ของข้อมูลชุดนี้ติดลบ!`);
        else if (this.subProcess.checkForZeronumber(r)) throw new Error(`ตำแหน่งควอร์ไทล์ไม่สามารถเป็นเลข 0 ได้!`);
        else if (this.subProcess.decimalCheck(r)) throw new Error(`ตำแหน่งควอร์ไทล์ ${r} ไม่สามารถหาที่เป็นเลขทศนิยได้!`);
        else if (r > 4) throw new Error(`ไม่สามารถหาค่าควอร์ไทล์ Q${r} ของข้อมูลชุดนี้ได้\nเลขควอร์ไทล์จะต้องเป็นเลข 1 ถึง 4 เท่านั้น!`);
        else if (typeof r !== 'number') throw new Error(`โปรดใส่ข้อมูลที่เป็นชนิดตัวเลขเท่านั้น!`);
        else if (typeof r === 'undefined' || r === undefined) throw new Error(`โปรดใส่ข้อมูลตำแหน่งของ r ที่ต้องการหา!`);
        else { // ตรวจสอบข้อมูลเรียบร้อย
            if (this.haveData && this.notHaveClassInterval) { // แบบไม่แจกแจงความถี่
                positionQr = r * (n + 1) / 4;
                let search: number[] = this.subProcess.findCumulativeFrequency(positionQr);
                if (this.haveData && Number.isInteger(positionQr) && this.notHaveFrequency) {
                    if (x[Math.trunc(positionQr)] === undefined || Number.isNaN(x[Math.trunc(positionQr)])) {
                        throw `${new Error(`ไม่สามารถหาค่าควอร์ไทล์ Q${r} ได้ตำแหน่งควอร์ไทล์ที่ ${positionQr} นั้นไม่มีอยู่จริงในข้อมูลชุดนี้เพราะข้อมูลชุดนี้มีแค่ ${n} จำนวน`)}`;
                    }
                    else {
                        return `ตำแหน่งควอร์ไทล์ Q${r} = ${positionQr}\nค่าของควอร์ไทล์ Q${r} = ${x[positionQr - 1]}`;
                    }
                } else if (this.haveData && this.haveFrequency && this.notHaveClassInterval) {
                    let nearby: number = this.cumulativeFrequency[Math.sqrt(Math.trunc(positionQr)) - 1];
                    if (nearby < positionQr && positionQr < nearby + 1) {
                        let position1: number = x[search.length - 1];
                        let position2: number = x[search.length];
                        let difference: any = (positionQr - Math.trunc(positionQr)).toFixed(2);
                        Qr = position1 + difference * (Math.abs(position2 - position1));
                    } else {
                        if (x[search.length] === undefined || Number.isNaN(x[search.length])) {
                            throw `${new Error(`ไม่สามารถหาค่าควอร์ไทล์ Q${r} ได้ตำแหน่งควอร์ไทล์ที่ ${positionQr} นั้นไม่มีอยู่จริงในข้อมูลชุดนี้เพราะข้อมูลชุดนี้มีแค่ ${n} จำนวน`)}`;
                        }
                        Qr = x[search.length];
                    }
                } else {
                    if (x[Math.floor(positionQr)] === undefined || Number.isNaN(x[Math.floor(positionQr)])) {
                        throw `${new Error(`ไม่สามารถหาค่าควอร์ไทล์ Q${r} ได้ตำแหน่งควอร์ไทล์ที่ ${positionQr} นั้นไม่มีอยู่จริงในข้อมูลชุดนี้เพราะข้อมูลชุดนี้มีแค่ ${n} จำนวน`)}`;
                    }
                    let position1: number = x[Math.floor(positionQr) - 1];
                    let position2: number = x[Math.floor(positionQr)];
                    let difference: any = (positionQr - Math.trunc(positionQr)).toFixed(2);
                    Qr = position1 + difference * (Math.abs(position2 - position1));
                }
            } else { // แบบแจกแจงความถี่
                positionQr = (r * n) / 4;
                let search = this.subProcess.findCumulativeFrequency(positionQr);
                l = this.classInterval[search.length * 2] - 0.5;
                Σfl = this.cumulativeFrequency[search.length - 1];
                fq = this.frequency[search.length];
                Qr = l + i * ((positionQr - Σfl) / fq)
            }
            return `ตำแหน่งควอร์ไทล์ Q${r} = ${positionQr}\nค่าของควอร์ไทล์ Q${r} = ${Qr}\nปัดเป็นทศนิยม 2 ตำแหน่ง = ${Qr.toFixed(2)}`;
        }
    }

    public Dr = (r: any, Dr: number = 0, positionDr: number = 0, x: number[] = this.sortData, n: number = this.n(), l: number = 0, i: number = this.i, Σfl: number = 0, fd: number = 0): any => {
        // parameter (r) จะต้องให้ผู้ใช้ส่งข้อมูลมาเพื่อนำไปใช้งานต่อไป
        if (Dr || Dr && positionDr) throw new Error(`ส่งข้อมูลได้แค่ค่าเดียว!`);
        if (this.subProcess.checkForNegativeNumber(r)) throw new Error(`ตำแหน่งเดไซล์ที่ ${r} ไม่สามารถหาค่าเดไซล์ได้เพราะตำแหน่งเดไซล์ของข้อมูลชุดนี้ติดลบ!`);
        else if (this.subProcess.checkForZeronumber(r)) throw new Error(`ตำแหน่งเดไซล์ไม่สามารถเป็นเลข 0 ได้!`);
        else if (this.subProcess.decimalCheck(r)) throw new Error(`ตำแหน่งเดไซล์ ${r} ไม่สามารถหาที่เป็นเลขทศนิยได้!`);
        else if (r > 10) throw new Error(`ไม่สามารถหาค่าเดไซล์ D${r} ของข้อมูลชุดนี้ได้\nเลขเดไซล์จะต้องเป็นเลข 1 ถึง 10 เท่านั้น`);
        else if (typeof r !== 'number') throw new Error(`โปรดใส่ข้อมูลที่เป็นชนิดตัวเลขเท่านั้น!`);
        else if (typeof r === 'undefined' || r === undefined) throw new Error(`โปรดใส่ข้อมูลตำแหน่งของ r ที่ต้องการหา!`);
        else { // ตรวจสอบข้อมูลเรียบร้อย
            if (this.haveData && this.notHaveClassInterval) { // แบบไม่แจกแจงความถี่
                positionDr = r * (n + 1) / 10;
                let search: number[] = this.subProcess.findCumulativeFrequency(positionDr);
                if (this.haveData && Number.isInteger(positionDr) && this.notHaveFrequency) {
                    if (x[Math.trunc(positionDr)] === undefined || Number.isNaN(x[Math.trunc(positionDr)])) {
                        throw `${new Error(`ไม่สามารถหาค่าเดไซล์ D${r} ได้ตำแหน่งเดไซล์ที่ ${positionDr} นั้นไม่มีอยู่จริงในข้อมูลชุดนี้เพราะข้อมูลชุดนี้มีแค่ ${n} จำนวน`)}`;
                    }
                    else {
                        return `ตำแหน่งเดไซล์ D${r} = ${positionDr}\nค่าของเดไซล์ D${r} = ${x[positionDr - 1]}`;
                    }
                } else if (this.haveData && this.haveFrequency && this.notHaveClassInterval) {
                    let nearby = this.cumulativeFrequency[Math.sqrt(Math.trunc(positionDr)) - 1];
                    if (nearby < positionDr && positionDr < nearby + 1) {
                        let position1: number = x[search.length - 1];
                        let position2: number = x[search.length];
                        let difference: any = (positionDr - Math.trunc(positionDr)).toFixed(2);
                        Dr = position1 + difference * (Math.abs(position2 - position1));
                    } else {
                        if (x[search.length] === undefined || Number.isNaN(x[search.length])) {
                            throw `${new Error(`ไม่สามารถหาค่าเดไซล์ D${r} ได้ตำแหน่งเดไซล์ที่ ${positionDr} นั้นไม่มีอยู่จริงในข้อมูลชุดนี้เพราะข้อมูลชุดนี้มีแค่ ${n} จำนวน`)}`;
                        }
                        Dr = x[search.length];
                    }
                } else {
                    if (x[Math.floor(positionDr)] === undefined || Number.isNaN(x[Math.floor(positionDr)])) {
                        throw `${new Error(`ไม่สามารถหาค่าเดไซล์ D${r} ได้ตำแหน่งเดไซล์ที่ ${positionDr} นั้นไม่มีอยู่จริงในข้อมูลชุดนี้เพราะข้อมูลชุดนี้มีแค่ ${n} จำนวน`)}`;
                    }
                    let position1: number = x[Math.floor(positionDr) - 1];
                    let position2: number = x[Math.floor(positionDr)];
                    let difference: any = (positionDr - Math.trunc(positionDr)).toFixed(2);
                    Dr = position1 + difference * (Math.abs(position2 - position1));
                }
            } else { // แบบแจกแจงความถี่
                positionDr = (r * n) / 10;
                let search: number[] = this.subProcess.findCumulativeFrequency(positionDr);
                l = this.classInterval[search.length * 2] - 0.5;
                Σfl = this.cumulativeFrequency[search.length - 1];
                fd = this.frequency[search.length];
                Dr = l + i * ((positionDr - Σfl) / fd);
            }
            return `ตำแหน่งเดไซล์ D${r} = ${positionDr}\nค่าของเดไซล์ D${r} = ${Dr}\nปัดเป็นทศนิยม 2 ตำแหน่ง = ${Dr.toFixed(2)}`;
        }
    }

    public Pr = (r: any, Pr: number = 0, positionPr: number = 0, x: number[] = this.sortData, n: number = this.n(), f: number[] = this.frequency, l: number = 0, i: number = this.i, Σfl: number = 0, fp: number = 0): any => {
        // parameter (r) จะต้องให้ผู้ใช้ส่งข้อมูลมาเพื่อนำไปใช้งานต่อไป
        if (Pr || Pr && positionPr) throw new Error(`ส่งข้อมูลได้แค่ค่าเดียว!`);
        if (this.subProcess.checkForNegativeNumber(r)) throw new Error(`ตำแหน่งเปอร์เซนต์ไทล์ที่ ${r} ไม่สามารถหาค่าเปอร์เซนต์ไทล์ได้เพราะตำแหน่งเดไซล์ของข้อมูลชุดนี้ติดลบ!`);
        else if (this.subProcess.checkForZeronumber(r)) throw new Error(`ตำแหน่งเปอร์เซนต์ไทล์ไม่สามารถเป็นเลข 0 ได้!`);
        else if (this.subProcess.decimalCheck(r)) throw new Error(`ตำแหน่งเปอร์เซนต์ไทล์ ${r} ไม่สามารถหาที่เป็นเลขทศนิยได้!`);
        else if (r > 100) throw new Error(`ไม่สามารถหาค่าเปอร์เซนต์ไทล์ P${r} ของข้อมูลชุดนี้ได้\nเลขเปอร์เซนต์ไทล์จะต้องเป็นเลข 1 ถึง 100 เท่านั้น`);
        else if (typeof r !== 'number') throw new Error(`โปรดใส่ข้อมูลที่เป็นชนิดตัวเลขเท่านั้น!`);
        else if (typeof r === 'undefined' || r === undefined) throw new Error(`โปรดใส่ข้อมูลตำแหน่งของ r ที่ต้องการหา!`);
        else { // แบบไม่แจกแจงความถี่
            if (this.haveData && this.notHaveClassInterval) {
                positionPr = r * (n + 1) / 100;
                let search: number[] = this.subProcess.findCumulativeFrequency(positionPr);
                if (this.haveData && Number.isInteger(positionPr) && this.notHaveFrequency) {
                    if (x[Math.trunc(positionPr)] === undefined || Number.isNaN(x[Math.trunc(positionPr)])) {
                        throw `${new Error(`ไม่สามารถหาค่าเปอร์เซนต์ไทล์ P${r} ได้ตำแหน่งเปอร์เซนต์ไทล์ที่ ${positionPr} นั้นไม่มีอยู่จริงในข้อมูลชุดนี้เพราะข้อมูลชุดนี้มีแค่ ${n} จำนวน`)}`;
                    }
                    else {
                        return `ตำแหน่งเปอร์เซนต์ไทล์ P${r} = ${positionPr} \nค่าของเปอร์เซนต์ไทล์ P${r} = ${x[positionPr - 1]}`;
                    }
                } else if (this.haveData && this.haveFrequency && this.notHaveClassInterval) {
                    let nearby = this.cumulativeFrequency[Math.sqrt(Math.trunc(positionPr)) - 1];
                    if (nearby < positionPr && positionPr < nearby + 1) {
                        let position1: number = x[search.length - 1]
                        let position2: number = x[search.length]
                        let difference: any = (positionPr - Math.trunc(positionPr)).toFixed(2);
                        Pr = position1 + difference * (Math.abs(position2 - position1));
                    } else {
                        if (x[search.length] === undefined || x[search.length] === null || Number.isNaN(x[search.length])) return `${new Error(`ไม่สามารถหาค่าเปอร์เซนต์ไทล์ P${r} ได้ตำแหน่งเปอร์เซนต์ไทล์ที่ ${positionPr} นั้นไม่มีอยู่จริงในข้อมูลชุดนี้เพราะข้อมูลชุดนี้มีแค่ ${n} จำนวน`)}`;
                        Pr = x[search.length];
                    }
                } else {
                    if (x[Math.floor(positionPr)] === undefined || Number.isNaN(x[Math.floor(positionPr)])) return `${new Error(`ไม่สามารถหาค่าเปอร์เซนต์ไทล์ P${r} ได้ตำแหน่งเปอร์เซนต์ไทล์ที่ ${positionPr} นั้นไม่มีอยู่จริงในข้อมูลชุดนี้เพราะข้อมูลชุดนี้มีแค่ ${n} จำนวน`)}`;
                    let position1: number = x[Math.floor(positionPr) - 1];
                    let position2: number = x[Math.floor(positionPr)];
                    let difference: any = (positionPr - Math.trunc(positionPr)).toFixed(2);
                    Pr = position1 + difference * (Math.abs(position2 - position1));
                }
            } else { // แบบแจกแจงความถี่
                positionPr = (r * n) / 100;
                let search: number[] = this.subProcess.findCumulativeFrequency(positionPr);
                l = this.classInterval[search.length * 2] - 0.5;
                Σfl = this.cumulativeFrequency[search.length - 1];
                fp = this.frequency[search.length];
                Pr = l + i * ((positionPr - Σfl) / fp);
            }
            return `ตำแหน่งเปอร์เซนต์ไทล์ P${r} = ${positionPr}\nค่าของเปอร์เซนต์ไทล์ P${r} = ${Pr}\nปัดเป็นทศนิยม 2 ตำแหน่ง = ${Pr.toFixed(2)}`;
        }
    }

    public quartileDeviation = (QD: number = 0, Q1: any = 1, Q3: any = 3, n: number = this.n(), position_Qr: number[] = this.sortData, f: number[] = this.frequency, l1: number = 0, i1: number = this.i, Σfl1: number = 0, fq1: number = 0, l3: number = 0, i3: number = this.i, Σfl3: number = 0, fq3: number = 0, x: number[] = this.sortData): string => {
        let position: { Q1: number, Q3: number } = {
            Q1: 0,
            Q3: 0
        }
        let search: { Q1: number[], Q3: number[] } = {
            Q1: this.subProcess.findCumulativeFrequency(position.Q1),
            Q3: this.subProcess.findCumulativeFrequency(position.Q3),
        }
        // แบบไม่แจกแจงความถี่
        if (this.haveData && this.notHaveFrequency) {
            // ตำแหน่ง Q3 และ Q1
            Q1 = (1 * (n + 1)) / 4;
            Q3 = (3 * (n + 1)) / 4;
            type QObject = {
                Q1: { r: number, decimal: number, difference: number, value: number, sendValue: Function };
                Q3: { r: number, decimal: number, difference: number, value: number, sendValue: Function };
            }
            let QValue: QObject = {
                Q1: { // ค่า Q1
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
                Q3: { // ค่า Q3
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
            if (Number.isInteger(Q1) && Number.isInteger(Q3)) { // แบบไม่แจกแจงความถี่
                QD = (position_Qr[Q3 - 1] - position_Qr[Q1 - 1]) / 2;
            } else if (this.subProcess.decimalCheck(Q1) && this.subProcess.decimalCheck(Q3)) {
                QD = (QValue.Q3.sendValue() - QValue.Q1.sendValue()) / 2;
            } else if (this.subProcess.decimalCheck(Q1) || this.subProcess.decimalCheck(Q3)) {
                if (Number.isInteger(Q1)) {
                    QD = (QValue.Q3.sendValue() - Q1) / 2;
                } else if (Number.isInteger(Q3)) {
                    QD = (Q3 - QValue.Q1.sendValue()) / 2;
                }
            }
        } else if (this.haveData && this.haveFrequency && this.notHaveClassInterval) {
            // let position: { Q1: number, Q3: number } = {
            //     Q1: (1 * (n + 1)) / 4,
            //     Q3: (3 * (n + 1)) / 4
            // }
            // let search: { Q1: number[], Q3: number[] } = {
            //     Q1: this.subProcess.findCumulativeFrequency(position.Q1),
            //     Q3: this.subProcess.findCumulativeFrequency(position.Q3),
            // }
            position.Q1 = (1 * (n + 1)) / 4;
            position.Q3 = (3 * (n + 1)) / 4;
            Q1 = x[search.Q1.length];
            Q3 = x[search.Q3.length];
            if (this.cumulativeFrequency[this.cumulativeFrequency.indexOf(Math.trunc(position.Q1))] === Math.trunc(position.Q1) || this.cumulativeFrequency[this.cumulativeFrequency.indexOf(Math.trunc(position.Q3))] === Math.trunc(position.Q3)) {
                if (this.cumulativeFrequency[this.cumulativeFrequency.indexOf(Math.trunc(position.Q1))] === Math.trunc(position.Q1)) {
                    Q1 = x[search.Q1.length - 1] + (Math.abs(position.Q1 - Math.trunc(position.Q1)) * Math.abs(x[search.Q1.length - 1] - x[search.Q1.length]));
                } else if (this.cumulativeFrequency[this.cumulativeFrequency.indexOf(Math.trunc(position.Q3))] === Math.trunc(position.Q3)) {
                    Q3 = x[search.Q3.length - 1] + (Math.abs(position.Q3 - Math.trunc(position.Q3)) * Math.abs(x[search.Q3.length - 1] - x[search.Q3.length]));
                }
            }
            QD = (Q3 - Q1) / 2;
        } else if (this.notHaveData && this.haveFrequency && this.haveClassInterval) { // แบบแจกแจงความถี่
            position.Q1 = (1 * n) / 4;
            position.Q3 = (1 * n) / 4;
            // let position: { Q1: number, Q3: number } = {
            //     Q1: (1 * n) / 4,
            //     Q3: (1 * n) / 4,
            // }
            // let search: { Q1: number[], Q3: number[] } = {
            //     Q1: this.cumulativeFrequency.filter((item:number) => item < position.Q1),
            //     Q3: this.cumulativeFrequency.filter((item:number) => item < position.Q3),
            // }
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
            QD = (Q3 - Q1) / 2;
        } else {
            throw new Error(`เกิดข้อผิดพลาดขึ้นโปรดลองใส่ข้อมูลใหม่อีกครั้ง!`);
        }
        return `ส่วนเบี่ยงเบนควอร์ไทล์ Q.D. = ${QD}\nปัดเป็นทศนิยม 2 ตำแหน่ง = ${QD.toFixed(2)}`;
    }

    public meanDeviation = (MD: number = 0, x̄: number = 0, Σx: number = 0, n: number = this.n(), x: number[] = this.sortData, Σlfixi_x̄l: number = 0, Σlxi_x̄l: number = 0, f: number[] = this.frequency, Σxf: number = 0): string => {
        if (this.haveData && this.notHaveFrequency) { // แบบไม่แจกแจงความถี่
            for (let i in x) {
                Σx += x[i];
            }
            x̄ = Σx / n;
            for (let j in x) {
                Σlxi_x̄l += Math.abs(x[j] - x̄);
            }
            MD = Σlxi_x̄l / n;
        } else if (this.haveFrequency) {  // แบบแจกแจงความถี่
            if (this.notHaveData) x = this.midPoint();
            for (let i in x) {
                Σxf += (x[i] * f[i]);
            }
            x̄ = Σxf / n;
            for (let j in x) {
                Σlfixi_x̄l += f[j] * (Math.abs(x[j] - x̄));
            }
        } else {
            throw new Error(`เกิดข้อผิดพลาดขึ้นโปรดลองใส่ข้อมูลใหม่อีกครั้ง!`);
        }
        MD = Σlfixi_x̄l / n;
        return `ส่วนเบี่ยงเบนเฉลี่ย M.D. = ${MD}\nปัดเป็นทศนิยม 2 ตำแหน่ง = ${MD.toFixed(2)}`;
    }

    public standardDeviation = (SD: number = 0, x̄: number = 0, Σx: number = 0, Σxi_x̄2: number = 0, Σxi2_x̄2: number = 0, n: number = this.n(), f: number[] = this.frequency, x: number[] = this.sortData, Σxf: number = 0, Σfixi_x̄2: number = 0, Σfixi2_x̄2: number = 0): string => {
        if (this.haveData && this.notHaveFrequency) { // แบบไม่แจกแจงความถี่
            for (let i in x) {
                Σx += x[i];
            }
            x̄ = Σx / n;
            try {
                for (let j in x) {
                    Σxi_x̄2 += Math.pow(x[j], 2);
                }
                SD = Math.sqrt((Σxi_x̄2 / n) - Math.pow(x̄, 2));
            } catch (err) {
                console.error(err);
                for (let k in x) {
                    Σxi2_x̄2 += Math.pow((x[k] - x̄), 2);
                }
                SD = Math.sqrt(Σxi2_x̄2 / n);
            }
        } else if (this.haveFrequency) { // แบบแจกแจงความถี่
            if (this.notHaveData) x = this.midPoint();
            for (let i in x) {
                Σxf += f[i] * x[i];
            }
            x̄ = Σxf / n;
            try {
                for (let j in x) {
                    Σfixi_x̄2 += f[j] * Math.pow(x[j], 2);
                }
                SD = Math.sqrt((Σfixi_x̄2 / n) - Math.pow(x̄, 2));
            } catch (err) {
                console.error(err);
                for (let k in x) {
                    Σfixi2_x̄2 += f[k] * Math.pow((x[k] - x̄), 2);
                }
                SD = Math.sqrt(Σfixi2_x̄2 / n);
            }
        } else if (this.notCompleteData) {
            throw new Error(`เกิดข้อผิดพลาดขึ้นโปรดลองใส่ข้อมูลใหม่อีกครั้ง!`);
        } else {
            throw new Error(`เกิดข้อผิดพลาดขึ้นโปรดลองใส่ข้อมูลใหม่อีกครั้ง!`);
        }
        return `ส่วนเบี่ยงเบนเฉลี่ยมาตราฐาน S.D. = ${SD}\nปัดเป็นทศนิยม 2 ตำแหน่ง = ${SD.toFixed(2)}`;
    }

    public variance = (S2: number = 0, x̄: number = 0, Σxi: number = 0, Σxi_x̄2: number = 0, Σxi2_x̄2: number = 0, n: number = this.n(), f: number[] = this.frequency, x: number[] = this.sortData, Σxifi: number = 0, Σfixi_x̄2: number = 0, Σfixi2_x̄2: number = 0): string => {
        if (this.haveData && this.notHaveFrequency) { // แบบไม่แจกแจงความถี่
            for (let i in x) {
                Σxi += x[i];
            }
            x̄ = Σxi / n;
            try {
                for (let j in x) {
                    Σxi_x̄2 += Math.pow((x[j] - x̄), 2);
                }
                S2 = Σxi_x̄2 / n;
            } catch (err: unknown) {
                console.error(err);
                for (let k in x) {
                    Σxi2_x̄2 += Math.pow(x[k], 2);
                }
                S2 = (Σxi2_x̄2 / n) - Math.pow(x̄, 2);
            }
        } else if (this.haveFrequency) { // แบบแจกแจงความถี่
            if (this.notHaveData) x = this.midPoint();
            for (let i in x) {
                Σxifi += f[i] * x[i]
            }
            x̄ = Σxifi / n;
            try {
                for (let j in x) {
                    Σfixi_x̄2 += f[j] * Math.pow(x[j], 2)
                }
                S2 = (Σfixi_x̄2 / n) - Math.pow(x̄, 2);
            } catch (err: unknown) {
                console.error(err);
                for (let k in x) {
                    Σfixi2_x̄2 += f[k] * Math.pow((x[k] - x̄), 2);
                }
                S2 = Σfixi2_x̄2 / n;
            }
        } else {
            throw new Error(`เกิดข้อผิดพลาดขึ้นโปรดลองใส่ข้อมูลใหม่อีกครั้ง!`);
        }
        return `ความแปรปรวนของข้อมูล S2 = ${S2}\nปัดเป็นทศนิยม 2 ตำแหน่ง = ${S2.toFixed(2)}`;
    }

    public coefficientOfRange = (CR: number = 0, xmax = 0, xmin = 0, x: number[] = this.sortData, c: number[] = this.classInterval): string => {
        if (this.haveData && this.notHaveFrequency || this.haveData && this.haveFrequency) {
            xmax = x[this.data.length - 1];
            xmin = x[0];
        } else if (this.notHaveData && this.haveFrequency && this.haveClassInterval) {
            xmax = (Math.max(...c) + 0.5);
            xmin = (Math.min(...c) - 0.5);
        } else {
            throw new Error(`เกิดข้อผิดพลาดขึ้นโปรดลองใส่ข้อมูลใหม่อีกครั้ง!`);
        }
        CR = (xmax - xmin) / (xmax + xmin);
        return `สัมประสิทธิ์ของพิสัย C.R = ${CR}\nปัดเป็นทศนิยม 3 ตำแหน่ง = ${CR.toFixed(3)}`;
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
                Q1: this.subProcess.findCumulativeFrequency(position.Q1),
                Q3: this.subProcess.findCumulativeFrequency(position.Q3),
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

    public standardScores = (score: any, name: string[] = [], Z: number = 0, x: number[] = this.sortData, x̄: number = 0, Σx: number = 0, n: number = this.n(), S: number = 0, Σx2: number = 0): (string | Error) => {
        // parameter (score) จะต้องให้ผู้ใช้ส่งข้อมูลมาเพื่อนำไปใช้งานต่อไป
        x.map((index: number) => {
            Σx += index;
        });
        x̄ = Σx / n;
        for (let xi of x) {
            Σx2 += Math.pow(xi - x̄, 2);
        }
        S = Math.sqrt(Σx2 / n);

        let list: string[] = [];
        if (typeof score === 'object' && name.length > 0 && name.length === n) {
            for (let i in x) {
                Z = (score[i] - x̄) / S;
                list.push(`คะแนนของ ${name[i]} มีค่ามาตราฐาน = ${Z}`);
            }
            return `${list.map((c: string) => `\n${c}`)}`;
        }

        if (typeof score === 'object' && name.length === 0) {
            let count: number = 1;
            for (let j in x) {
                Z = (score[j] - x̄) / S;
                list.push(`คะแนนชุดที่ ${count++} มีค่ามาตราฐาน = ${Z}`);
            }
            return `${list.map((c: string) => `\n${c}`)}`;
        }

        if (typeof score === 'number' && name.length === 0) {
            Z = (score - x̄) / S;
            return `ค่ามาตราฐาน Z = ${Z}`;
        } else {
            throw new Error(`เกิดข้อผิดพลาดขึ้น!\nการส่ง argument ไปให้ parameter นั้นต้องส่งเป็นตัวเลขเท่านั้น`);
        }

    }
}
export default Statistics;
