/*
                    คำสั่งในโปรแกรม
    npm install -g typescript   ติดตั้งไลบรารี่ typecript
    npm install                 ติดตั้งไลบรารี่ในโปรเจคนี้
    npm run start               ทดสอบโปรแกรม
    tsc main.ts                 compile ไปเป็นไฟล์ javascript -> main.js
    tsc                         compile ทุกไฟล์เป็น javascript เก็บไว้ในโฟล์เดอร์ dist
*/

/*      newVersion 0.0.22
    * เริ่ม: (7/6/2566)
    * เสร็จ: (28/6/2566)
        ? อัปเดตใหม่
    - แก้ไขชื่อ type และ interface ใหม่
    - เพิ่ม class Setting เพื่ออ่านการตั้งค่าจาก obj ที่ส่งเข้ามาใน method constructor แล้วให้
    class Statistics สืบทอด method จาก class Setting ที่ไว้เขียนการแสดงผลการคำนวณตัวเลขออกมา  
    - สมารถตั้งค่าการใช้งาน class Setting โดยไปแก้ไข object ในไฟล์ setting
    - ไม่สามารถใช้ class Extension ใน version 0.0.25 นี้ได้
    - ปรับระดับการเข้าถึงข้อมูล (Access Modifiers) property และ method ใหม่
    - method ที่มีชื่อนำหน้าว่า show จะไม่อ่านการตั้งค่า class Setting
    (ไม่ใช้ method ของ class Setting มันมีหน้าที่แสดงผลข้อมูลที่รับค่ามาใน array อย่างเดียว)

    ! version นี้เป็น version สุดท้ายจะไม่มีการแก้ไขบัค และ เพิ่มฟีเจอร์ใหม่ๆอีกต่อไป
*/

import { setting } from "./setting";

// สร้าง interface ขึ้นมาใช้งานเพื่อเป็น type ของ parameter ใน class Setting
interface ConfigDefault {
    displayText?: boolean | undefined;
    readonly usingConsole: boolean;
    readonly decimal: boolean;
}

export type Config = ConfigDefault | undefined; // ส่ง type ไปใช้งานใน module setting.ts แล้วนำเข้ามาใช้เพื่ออ่านค่า property ข้างใน
type Param1 = string | [string | number, string];
type Param2 = number | [number, number];
type Arg1 = Param1;
type Arg2 = Param2;

class Setting {
    private readConfig: Config;
        protected constructor(private CONFIG?: Config) {
            if (CONFIG === undefined || typeof CONFIG === "undefined") {
                this.CONFIG = {
                    displayText: true,      // ถ้า true จะแสดงข้อความ ถ้า fasle จะไม่แสดง แสดงแค่ตัวเลข
                    usingConsole: false,    // ถ้า true ต้องใช้คำสั่ง เพื่อแสดข้อมูลออกมา ถ้า false ไม่ต้องใช้คำสั่งข้อมูลจะถูกแสดงออกมาเมื่อมีการเรียกใช้ methods
                    decimal: true,          // ถ้า true ผลลัพธ์การคำนวณจะเป็นเลขทศนิยม(2,3,4) ตำแหน่ง ถ้า false จะแสดงเป็นเลขจำนวนเต็ม
                };
            }
            (typeof CONFIG === "object") && !("displayText" in CONFIG) && (typeof CONFIG !== "undefined") ? 
            (CONFIG.displayText = true) : 
            -1;
            this.readConfig = this.CONFIG;
        }

    /* method นี้จะไว้เขียนเนื้อหาที่จะแสดงผลลัพธ์การคำนวณออกไปโดยอ่านการตั้งค่าจาก argument ที่ส่งเข้ามาใน class แม่ */
    protected Write = <Type1 , Type2 extends Param2 , Type3 extends number | undefined>(str: Type1, n: Type2, decimal?: Type3): string => {
        // parameter: n และ str ถ้าเป็น Tuple ค่าในสมาชิกข้างในจะมีตามลำดับดังนี้ : [ตำแหน่ง(0) , ค่า(1)]
        let result: number | string;
        let compose: string = ``;

        if (this.readConfig?.decimal === true) {
            let isUndefineds:boolean = decimal === undefined;
            typeof n === "number" ? 
                (result = n.toFixed(isUndefineds ? 0 : decimal)) : 
                (result = n[1].toFixed(isUndefineds ? 0 : decimal));
        } else {
            Array.isArray(n) ? (result = Math.trunc(n[1])) : (result = Math.trunc(n));
        }

        if (this.readConfig?.displayText === true) {
            Array.isArray(str) && Array.isArray(n) ? 
            (compose = `${str[0]} ${n[0]} ${str[1]} ${result}`) : 
            (compose = `${str} ${result}`);
        } else compose = result.toString();
        
        if (!this.readConfig?.usingConsole) {
            console.log(compose);
            compose = "";
        }
        return compose;
    };

    protected ErrorMsg = <Type = string>(str: Type | string): Type | string => {
        if (!this.readConfig?.usingConsole) {
            console.log(str);
            str = "";
        }
        return str;
    };

    protected List = <Type1 extends string[] , Type2 extends number[] , Type3 , Type4 = undefined>(list: Type1 , arrayNumber: Type2 , t:Type3 , name?: Type4) => {
        let compose: string[] = [];
        let newArrayNumber: number[]= arrayNumber;
        let composeDN: number[] = arrayNumber.map((n: number) => Math.trunc(n));

        if (!this.readConfig?.displayText) newArrayNumber = arrayNumber;
        if (!this.readConfig?.decimal) newArrayNumber = arrayNumber.map((number: number) => Math.trunc(number));
        
        if (!this.readConfig?.usingConsole) {
            if (this.readConfig?.displayText) {
                if (!this.readConfig?.decimal) {
                    if (Array.isArray(name) && t === "l1" && typeof name !== undefined) {
                        for (let i in list) {
                            compose[i] = `คะแนนของ ${name[i]} มีค่ามาตราฐาน = ${composeDN[i]}`;
                        }
                    } else if (t === "l2") {
                        for (let i in list) {
                            compose[i] = `คะแนนชุดที่ ${i + 1} มีค่ามาตราฐาน = ${composeDN[i]}`;
                        }
                    }
                    compose.map((s: string) => console.log(s));
                } else {
                    list.map((s: string) => console.log(s));
                }
            } else if (!this.readConfig?.displayText) {
                this.readConfig?.decimal ? 
                newArrayNumber.map((n: number) => console.log(n)) :
                composeDN.map((n: number) => console.log(n));
            }
            return "";
        } else {
            if (this.readConfig?.displayText) {
                if (!this.readConfig?.decimal) {
                    if (Array.isArray(name) && t === "l1" && typeof name !== undefined && typeof name === "object") {
                        for (let i in list) {
                            compose[i] = `คะแนนของ ${name[i]} มีค่ามาตราฐาน = ${composeDN[i]}`;
                        }
                    } else if (t === "l2") {
                        for (let i in list) {
                            compose[i] = `คะแนนชุดที่ ${i + 1} มีค่ามาตราฐาน = ${composeDN[i]}`;
                        }
                    }
                    return `${compose.map((s: string) => `\n${s}`)}`;
                } else return `${list.map((s: string) => `\n${s}`)}`;
            } else {
                if (this.readConfig?.decimal) {
                    return `${newArrayNumber.map((n: number) => `\n${n}`)}`;
                } else {
                    return `${composeDN.map((n: number) => `\n${n}`)}`;
                }
            }
        }
    }
}

interface SubProcess {
    // ข้อมูลทั่วไป
    x: number[];
    f: number[];
    xf: CallableFunction;
    cf: number[];
    ci: CallableFunction;
    w: number[];
    wx: CallableFunction;
    // แบบแจกแจงความถี่
    frequencyDistribution: {
        range: {
            Xmax: CallableFunction;
            Xmin: CallableFunction;
        };
        sum: {
            XF: CallableFunction;
            MDXF: CallableFunction;
            SDXF: CallableFunction;
            FSD: CallableFunction;
            FSD2: CallableFunction;
        };
        mean: {
            XF: CallableFunction;
            MDXF: CallableFunction;
            SDXF: CallableFunction;
        };
        array: {
            MDXF: CallableFunction;
            SDXF: CallableFunction;
            FSD: CallableFunction;
            FSD2: CallableFunction;
        };
    };
    // แบบไม่แจกแจงความถี่
    noneFrequencyDistribution: {
        quartile: {
            poition: {
                Q1: CallableFunction;
                Q3: CallableFunction;
            };
            value: {
                Q1: CallableFunction;
                Q3: CallableFunction;
            };
        };
        range: {
            Xmax: CallableFunction;
            Xmin: CallableFunction;
        };
        sum: {
            X: CallableFunction;
            F: CallableFunction;
            W: CallableFunction;
            WX: CallableFunction;
            MDX: CallableFunction;
            MDX2: CallableFunction;
            SD2: CallableFunction;
            SDX: CallableFunction;
        };
        mean: {
            X: CallableFunction;
            MDX: CallableFunction;
            WX: CallableFunction;
            SDX: CallableFunction;
        };
        array: {
            MDX: CallableFunction;
            MDX2: CallableFunction;
            SDX: CallableFunction;
            SDX2: CallableFunction;
        };
    };
    // ตรวจสอบข้อมูล
    validation: {
        decimalCheck: CallableFunction;
        checkForNegativeNumber: CallableFunction;
        checkForZeronumber: CallableFunction;
    };
    findCumulativeFrequency: CallableFunction;
}

export default class Statistics extends Setting {
    public classInterval: number[];
    private midPoint: Function;
    public data: number[];
    private sortData: number[];
    public frequency: number[];
    private cumulative: Function;
    private cumulativeFrequency: number[];
    public n: Function;
    private i: number;
    private w: number[];
    private subProcess: SubProcess;
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
        /** @parameters ที่ต้องรับค่ามาจากผู้ใช้งาน */
        private xi: number[] = [] /** @param1 ข้อมูล */,
        private fi: number[] = [] /** @param2 ความถี่ */,
        private ci: number[] = [] /** @param3 อัตรภาคชั้น */,
        private wi: number[] = [] /** @param4 หน่วยกิต */,
        private cf: number[] = [fi[0]] /** @param5 ความถี่สะสม */
    ) {
        /* ส่ง argument ให้ class แม่เพื่ออ่านการตั้งค่า */
        super(setting);
        /* แบ่งชนิดข้อมูลในแต่ละ property */
        this.classInterval = this.ci;
        this.data = this.xi;
        this.sortData = [...this.data].sort((x: number, y: number) => x - y);
        this.frequency = this.fi;
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
        };
        this.n = (number: number = 0): number => {
            if (this.frequency.length == 0) {
                number = this.data.length;
            } else if (this.frequency.length != 0) {
                this.frequency.map((i: number) => (number += i));
            }
            return number;
        };
        this.cumulative = (f: number[] = [this.fi[0]]): number[] => {
            for (let i: number = 1; i < this.fi.length; i++) {
                f[i] = this.fi[i] += this.fi[i - 1];
                this.cf.push(f[i]);
            }
            for (let oldValue: number = this.fi.length - 1; oldValue > 0; oldValue--) {
                this.fi[oldValue] = this.fi[oldValue] - this.cf[oldValue - 1];
            }
            return this.cf;
        };
        this.cumulativeFrequency = this.cumulative();
        this.w = this.wi;
        this.i = this.ci[1] - this.ci[0] + 1;
        Number.isNaN(this.i) ? this.i = 0 : -1;

        /* เงื่อนไขในการควบคุม */
        this.haveData = this.data.length > 0 && this.data.length !== 0;
        this.notHaveData = this.data.length === 0 || this.data === undefined;
        this.haveFrequency =
        this.frequency.length > 0 && this.frequency.length !== 0;
        this.notHaveFrequency =
        this.frequency.length === 0 || this.frequency === undefined;
        this.haveClassInterval =
        this.classInterval.length > 0 && this.classInterval.length !== 0;
        this.notHaveClassInterval =
        this.classInterval.length === 0 || this.classInterval === undefined;
        this.completeData =
        this.data.length / 2 === this.frequency.length / 2 ||
        this.w.length / 2 === this.data.length / 2 ||
        this.frequency.length / 2 === this.classInterval.length / 4;
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

        // ไมได้ใส่ข้อมูลมา
        this.dataValidation = (stop?: boolean) => {
            const textError = `โปรมแกรมหยุดทำงานโปรดใส่ข้อมูลให้ครบถ้วนหรือระบุคำสั่งก่อนรันคำสั่ง`;
            if (this.classIntervalIsOdd) throw new Error("การใส่อันตรภาคชั้นจะต้องใส่จำนวนข้อมูลทั้งหมดเป็นเลขคู่!");
            if (stop === false) return 0;
            else if (stop === true || stop === undefined) {
                if (arguments[4]) {
                    throw new Error(textError.concat("\nError code: @4"));
                } else if ((xi === undefined || xi.length === 0) && (fi === undefined || fi.length === 0) && (ci === undefined || ci.length === 0) && (wi === undefined || wi.length === 0)){
                    throw new Error(textError.concat("\nError code: @1"));
                } else if ((xi.length !== 0) && (fi.length !== 0 )&& (xi.length !== fi.length)) {
                    throw new Error(textError.concat("\nError code: @6"));
                } else if ((xi.length === 0 && fi.length > 0 && ci === undefined) || (fi.length > 0 && ci.length === 0 && xi.length === 0) || (xi.length === 0 && fi.length > 0 && ci.length === 0)) {
                    throw new Error(textError.concat("\nError code: @2"));
                } else if ((xi.length !== 0 && fi.length !== 0 && ci.length !== 0) || (xi.length !== 0 && fi.length !== 0 && ci.length !== 0 && (wi.length !== 0 || wi === undefined))) {
                    throw new Error(textError.concat("\nError code: @9"));
                } else if ((fi.length !== 0) && (ci.length !== 0) && (fi.length !== ci.length / 2)) {
                    throw new Error(textError.concat("\nError code: @5"));
                } else if ((xi.length !== 0) && (ci.length !== 0) && (fi.length === 0)) {
                    throw new Error(textError.concat("\nError code: @8"));
                } else if ((wi.length > 0 && xi.length === 0) || (wi.length > 0 && fi.length > 0) || (wi.length > 0 && ci.length > 0) || (wi.length > 0 && fi.length > 0)) {
                    throw new Error(textError.concat("\nError code: @3"));
                } else if ((wi.length !== 0) && (xi.length !== 0 )&& (xi.length !== wi.length)) {
                    throw new Error(textError.concat("\nError code: @7"));
                }
            }
        }
        // ตรวจสอบข้อมูลก่อนนำข้อมูลไปคำนวณ
        this.dataValidation();

        /* แสดงผลข้อมูล */
        this.showData = (oldInformation: string = `ข้อมูลเดิมคือ ${this.data.join(" , ")}`, newInformation: string = `เรียงข้อมูลชุดใหม่ได้ ${this.sortData.join(" , ")}`): void => {
            if (this.notHaveData) console.error(new Error("ไม่มีข้อมูล!\nโปรดใส่ข้อมูลก่อนใช้คำสั่งนี้"));
            else console.log(`${oldInformation}\n${newInformation}`);
        };
        this.showFrequency = (oldFrequency: string = `ความถี่ ${this.frequency.join(" , ")}`, newFrequency: string = `ความถี่สะสม ${this.cumulativeFrequency.join(" , ")}`): void => {
            if (this.haveFrequency) console.log(`${oldFrequency}\n${newFrequency}`);
            else console.error(new Error("ข้อมูลในชุดนี้ไม่มีความถี่!"));
        };
        this.showNumber = (): void => {
            if (this.haveANumber) console.log(`ข้อมูลชุดนี้มีทั้งหมด ${this.n()} จำนวน`);
            else console.error(new Error("ข้อมูลในชุดนี้ไม่มีจำนวนข้อมูล!"));
        };
        this.showWidth = (i: number = this.i): void => {
            if (Number.isNaN(i) || this.classIntervalIsOdd) console.error(new Error("จำนวนข้อมูลในอันตรภาคชั้นไม่สามารถใส่เป็นเลขคี่ได้!"));
            else if (this.haveClassInterval) console.log(`ความกว้างของอันตรภาคชั้นคือ ${i}`);
            else console.error(new Error("ไม่มีข้อมูลของอัรตรภาคชั้น!"));
        };
        this.showWeignt = (): void => {
            if (this.haveWeight) console.log(`ค่าน้ำหนักหรือหน่วยกิต ${this.w.join(" , ")}`);
            else console.error(new Error("ข้อมูลในชุดนี้ไม่มีค่าน้ำหนักหรือค่าหน่วยกิต!"));
        };
        this.showMiddle = (): void => {
            if (this.classIntervalIsOdd) console.error(new Error("จำนวนข้อมูลในอันตรภาคชั้นไม่สามารถใส่เป็นเลขคี่ได้!"));
            else if (this.haveClassInterval && this.classIntervalIsEven) console.log(`จุดกึ่งกลางอันตรภาคชั้นคือ ${this.midPoint().join(" ")}`);
            else console.error(new Error("ไม่มีข้อมูลของอัรตรภาคชั้น!"));
        };
        this.showClassInterval = (topEdge: number = 0, bottomEdge: number = 1): void => {
            if (this.haveClassInterval) {
                let table: object[] = [{ classInterval: "อันตรภาคชั้น" }];
                for (let i: number = 0; i < this.classInterval.length / 2; i++) {
                    table.push({ classInterval: `${this.classInterval[topEdge]} - ${this.classInterval[bottomEdge]}`});
                    topEdge += 2;
                    bottomEdge += 2;
                }
                console.table(table);
            } else throw new Error("ไม่มีอันตรภาคชั้น!");
        };

        /* property ไว้ใช้งานใน class */
        this.subProcess = {
            // ข้อมูลที่ใช้ในส่วนตาราง
            x: this.data,
            f: this.frequency,
            cf: this.cumulativeFrequency,
            xf: (x: number[] = this.midPoint() , f: number[] = this.frequency): number[] => {
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
                        array.push(`${this.classInterval[topEdge]} - ${this.classInterval[bottomEdge]}`);
                        topEdge += 2;
                        bottomEdge += 2;
                    }
                } else if (this.classIntervalIsOdd) {
                    throw new Error("ข้อมูลของอันตรภาคชั้นจำนวนข้อมูลทั้งหมดต้องเป็นเลขคู่");
                }
                return array;
            },

            frequencyDistribution: {
                range: {
                    Xmax: (x: number[] = this.classInterval): number =>Math.max(...x) + 0.5,
                    Xmin: (x: number[] = this.classInterval): number =>Math.min(...x) - 0.5,
                },
                sum: {
                    XF: (x: number[] = this.midPoint(),f: number[] = this.frequency): number => {
                        let c: number = x.length === f.length ? 0 : -1;
                        let sum: number = 0;
                        while (c < x.length && c < f.length) {
                            sum += x[c] * f[c];
                            c++;
                        }
                        return sum;
                    },
                    MDXF: (x: number[] = this.midPoint(),f: number[] = this.frequency,x̄: number = this.subProcess.frequencyDistribution.mean.XF()): number => {
                        let sum: number = 0;
                        for (let i in x) {
                            sum += f[i] * Math.abs(x[i] - x̄);
                        }
                        return sum;
                    },
                    FSD: (Σx: number = 0): number => {
                        Σx = this.subProcess.frequencyDistribution.array.FSD().reduce((prev: number, curren: number): number => prev + curren);
                        return Σx;
                    },
                    FSD2: (Σx: number = 0): number => {
                        Σx = this.subProcess.frequencyDistribution.array.FSD2().reduce((prev: number, curren: number): number => prev + curren);
                        return Σx;
                    },
                    SDXF: (Σx: number = 0): number => {
                        if (this.subProcess.frequencyDistribution.array.SDXF().length === 0) {
                            return 0;
                        } else {
                            Σx = this.subProcess.frequencyDistribution.array.SDXF().reduce((prev: number, curren: number): number => prev + curren);
                        }
                        return Σx;
                    },
                },
                mean: {
                    XF: (x̄: number = 0, n: number = this.n(),Σxf: number = 0): number => {
                        Σxf = this.subProcess.frequencyDistribution.sum.XF();
                        x̄ = Σxf / n;
                        return x̄;
                    },
                    MDXF: (MDXF: number = 0, n: number = this.n()): number => {
                        MDXF = this.subProcess.frequencyDistribution.sum.MDXF() / n;
                        return MDXF;
                    },
                    SDXF: (SDXF: number = 0,n: number = this.n(),Σx: number = 0): number => {
                        Σx = this.subProcess.frequencyDistribution.sum.SDXF();
                        SDXF = Math.sqrt(Σx / n);
                        return SDXF;
                    },
                },
                array: {
                    MDXF: (array: number[] = [],x: number[] = this.midPoint(),f: number[] = this.frequency): number[] => {
                        for (let i in x) {
                            array.push(f[i] *Math.abs(x[i] - this.subProcess.frequencyDistribution.mean.XF()));
                        }
                        return array;
                    },
                    FSD: (array: number[] = [],x: number[] = this.midPoint()): number[] => {
                        x.map((xi: number) => {array.push(xi - this.subProcess.frequencyDistribution.mean.XF());});
                        return array;
                    },
                    FSD2: (array: number[] = []): number[] => {
                        this.subProcess.frequencyDistribution.array.FSD().map((item: number) => {array.push(item ** 2)});
                        return array;
                    },
                    SDXF: (array: number[] = [],f: number[] = this.frequency): number[] => {
                        for (let i in f) {
                            array.push(f[i] * this.subProcess.frequencyDistribution.array.FSD2()[i]);
                        }
                        return array;
                    },
                },
            },

            noneFrequencyDistribution: {
                quartile: {
                    poition: {
                        Q1: (x: number[] = this.sortData): number => (1 * (x.length + 1)) / 4,
                        Q3: (x: number[] = this.sortData): number => (3 * (x.length + 1)) / 4,
                    },
                    value: {
                        Q1: (p: number = this.subProcess.noneFrequencyDistribution.quartile.poition.Q1(),x: number[] = this.sortData): number => {
                            let result: number = 0;
                            if (Number.isInteger(p)) {
                                result = x[p - 1];
                            } else {
                                let d: number = Math.abs(p - Math.trunc(p));
                                let dif: number = Math.abs(
                                    x[Math.ceil(p) - 1] - x[Math.floor(p) - 1]
                                );
                                result = x[Math.floor(p) - 1] + dif * d;
                            }
                            return result;
                        },
                        Q3: (p: number = this.subProcess.noneFrequencyDistribution.quartile.poition.Q3(),x: number[] = this.sortData): number => {
                            let result: number = 0;
                            if (Number.isInteger(p)) {
                                result = x[p - 1];
                            } else {
                                let d: number = Math.abs(p - Math.trunc(p));
                                let dif: number = Math.abs(x[Math.ceil(p) - 1] - x[Math.floor(p) - 1]);
                                result = x[Math.floor(p) - 1] + dif * d;
                            }
                            return result;
                        },
                    },
                },
                range: {Xmax: (x: number[] = this.sortData): number => Math.max(...x),Xmin: (x: number[] = this.sortData): number => Math.min(...x),},
                sum: {
                    X: (x: number[] = this.midPoint()) => x.reduce((prev: number, curren: number): number => prev + curren),
                    F: (f: number[] = this.frequency) => f.reduce((prev: number, curren: number): number => prev + curren),
                    W: (w: number[] = this.w): number => w.reduce((prev: number, curren: number): number => prev + curren),
                    WX: (w: number[] = this.w, x: number[] = this.midPoint()): number => {
                        let sum: number = 0;
                        for (let i in w && x) {
                            sum += w[i] * x[i];
                        }
                        return sum;
                    },
                    MDX: (x: number[] = this.midPoint(),x̄: number = this.subProcess.noneFrequencyDistribution.mean.X()): number => {
                        let sum: number = 0;
                        for (let xi of x) {
                            sum += Math.abs(xi - x̄);
                        }
                        return sum;
                    },
                    MDX2: (x: number[] = this.midPoint(),x̄: number = this.subProcess.frequencyDistribution.mean.XF()): number => {
                        let sum: number = 0;
                        for (let xi of x) {
                            sum += Math.abs(xi - x̄);
                        }
                        return sum;
                    },
                    SD2: (x: number[] = this.midPoint(), Σx: number = 0): number => {
                        Σx = this.subProcess.noneFrequencyDistribution.array.SDX2().reduce((prev: number, curren: number) => prev + curren);
                        return Σx;
                    },
                    SDX: (x: number[] = this.subProcess.noneFrequencyDistribution.array.SDX(),Σx: number = 0): number => {
                        Σx = x.reduce((prev: number, curren: number) => prev + curren);
                        return Σx;
                    },
                },
                mean: {
                    X: (Σx: number = this.subProcess.noneFrequencyDistribution.sum.X(),n: number = this.n()): number => {
                        let x̄: number = 0;
                        x̄ = Σx / n;
                        return x̄;
                    },
                    WX: (x̄: number = 0,Σw: number = this.subProcess.noneFrequencyDistribution.sum.W(),Σwx: number = 0): number => {
                        Σwx = this.subProcess.noneFrequencyDistribution.sum.WX();
                        x̄ = Σwx / Σw;
                        return x̄;
                    },
                    MDX: (MDX: number = 0,sum: number = this.subProcess.noneFrequencyDistribution.sum.MDX(),n: number = this.n()): number => {
                        MDX = sum / n;
                        return MDX;
                    },
                    SDX: (SDX: number = 0,n: number = this.n(),Σx: number = this.subProcess.noneFrequencyDistribution.sum.SDX()): number => {
                        SDX = Math.sqrt(Σx / n);
                        return SDX;
                    },
                },
                array: {
                    MDX: (x: number[] = this.midPoint(),x̄: number = this.subProcess.noneFrequencyDistribution.mean.X()): number[] => {
                        let array: number[] = [];
                        for (let xi of x) {
                            let el: number = Math.abs(xi - x̄);
                            array.push(el);
                        }
                        return array;
                    },
                    MDX2: (array: number[] = [],x: number[] = this.midPoint()): number[] => {
                        for (let xi of x) {
                            let el: number = Math.abs(xi - this.subProcess.frequencyDistribution.mean.XF());
                            array.push(el);
                        }
                        return array;
                    },
                    SDX2: (array: number[] = [],x: number[] = this.midPoint(),x̄: number = this.subProcess.noneFrequencyDistribution.mean.X()): number[] => {
                        for (let xi of x) {
                            array.push(xi - x̄);
                        }
                        return array;
                    },
                    SDX: (array: number[] = [],arraySDX2: number[] = this.subProcess.noneFrequencyDistribution.array.SDX2()): number[] => {
                        arraySDX2.map((item: number) => {
                            array.push(Math.pow(item, 2));
                        });
                        return array;
                    },
                },
            },

            validation: {
                decimalCheck: (num: number): boolean => {
                    let status: boolean = true;
                    if (num.toString().includes(".")) {
                        status = status; // มี
                    } else {
                        status = !status;// ไม่มี
                    }
                    return status;
                },
                checkForNegativeNumber: (num: number): boolean => num < 0,
                checkForZeronumber: (num: number): boolean => num === 0,
            },
            findCumulativeFrequency: (position: number): number[] => this.cumulativeFrequency.filter((item: number) => item < position),
        };

        // ตาราง
        this.showTable = (word: string,nameX?: string,nameF?: string,nameC?: string,nameW?: string): void => {
            type StringAndArrayNumber = (string | number)[];
            let table: object[] = [];

            // ข้อมูลที่จะแสดงในตาราง
            let classInterval: string[] = [];
            let data: StringAndArrayNumber = [];
            let frequency: StringAndArrayNumber = [];
            let cumulativeFrequency: StringAndArrayNumber= [];
            let midPoint: StringAndArrayNumber = [];
            let xf: StringAndArrayNumber = [];
            let weight: StringAndArrayNumber = [];
            let wx: StringAndArrayNumber = [];
            let MD: StringAndArrayNumber = [];
            let fMD: StringAndArrayNumber = [];
            let MD2: StringAndArrayNumber = [];
            let SD: StringAndArrayNumber = [];
            let SD2: StringAndArrayNumber = [];
            let FSD: StringAndArrayNumber = [];
            let FSD2: StringAndArrayNumber = [];
            let SDXF: StringAndArrayNumber = [];
            let status: boolean = false;

            let summary: string[] = ["\tสรุปข้อมูลในตาราง",`- จำนวนข้อมูลทั้งหมด = ${this.n()} จำนวน`];
            /*
                      - t1 -> ข้อมูล , ความถี่ , ข้อมูล x ความถี่
                      - t2 -> ข้อมูล , ความถี่ , ความถึ่สะสม , ข้อมูล x ความถี่
                      - t3 -> อันตรภาคชั้น , จุดกึ่งกลางชั้น , ความถี่ , ความถี่สะสม , ข้อมูล x ความถี่
                      - t4 -> ข้อมูล , ค่าหน่วยกิต , ค่าหน่วยกิต x ข้อมูล
                      - t5 -> อันตรภาคชั้น , จุดกึ่งกลางชั้น , ข้อมูล , ความถี่ , ข้อมูล x ความถี่ , ส่วนเบี่ยงเบนเฉลี่ย
                      - t6 -> อันตรภาคชั้น , จุดกึ่งกลางชั้น , ข้อมูล , ความถี่ , ข้อมูล x ความถี่ , ส่วนเบี่ยงมาตราฐาน
                  */
            const tableType = (w: string): object[] | any => {
                // กำหนดค่าต่างๆให้ default parameter
                if (this.haveData) data = ["ข้อมูล",...this.data,`Σx = ${this.subProcess.noneFrequencyDistribution.sum.X()}`,];
                if (this.haveFrequency) frequency = ["ความถี่",...this.frequency,`n = ${this.subProcess.noneFrequencyDistribution.sum.F()}`,];
                if (this.haveWeight) {
                    weight = ["ค่าถ่วงน้ำหนัก",...this.w,`Σw = ${this.subProcess.noneFrequencyDistribution.sum.W()}`];
                    wx = [...this.subProcess.wx(),`Σwx = ${this.subProcess.noneFrequencyDistribution.sum.WX()}`,];
                    wx.unshift("ข้อมูล x ค่าถ่วงน้ำหนัก");
                }
                cumulativeFrequency = ["ความถี่สะสม",...this.cumulativeFrequency," - ",];
                classInterval = ["อันตรภาคชั้น", ...this.subProcess.ci(), "รวม"];
                midPoint = ["จุดกึ่งกลางชั้น",...this.midPoint(),`Σx = ${this.subProcess.noneFrequencyDistribution.sum.X()}`,];
                xf = [...this.subProcess.xf(),`Σxf = ${this.subProcess.frequencyDistribution.sum.XF()}`,];
                xf.unshift("ข้อมูล x ความถี่");
                MD = ["|ข้อมูล - ค่าเฉลี่ย|",...this.subProcess.noneFrequencyDistribution.array.MDX(),`Σ|x - x̄| = ${this.subProcess.noneFrequencyDistribution.sum.MDX()}`,];
                MD2 = ["|ข้อมูล - ค่าเฉลี่ย|",...this.subProcess.noneFrequencyDistribution.array.MDX2(),`Σ|x - x̄| = ${this.subProcess.noneFrequencyDistribution.sum.MDX2()}`,];
                fMD = ["ความถี่ x |ข้อมูล - ค่าเฉลี่ย|",...this.subProcess.frequencyDistribution.array.MDXF(),`Σf|x - x̄| = ${this.subProcess.frequencyDistribution.sum.MDXF()}`,];
                SD2 = ["ข้อมูล - ค่าเฉลี่ย",...this.subProcess.noneFrequencyDistribution.array.SDX2(),`Σ(x - x̄) = ${this.subProcess.noneFrequencyDistribution.sum.SD2()}`,];
                SD = ["(ข้อมูล - ค่าเฉลี่ย)^2",...this.subProcess.noneFrequencyDistribution.array.SDX(),`Σ(x - x̄)^2 = ${this.subProcess.noneFrequencyDistribution.sum.SDX()}`,];
                FSD = ["ข้อมูล - ค่าเฉลี่ย",...this.subProcess.frequencyDistribution.array.FSD(),`Σ(x - x̄) = ${this.subProcess.frequencyDistribution.sum.FSD()}`,];
                FSD2 = ["(ข้อมูล - ค่าเฉลี่ย)^2",...this.subProcess.frequencyDistribution.array.FSD2(),`Σ(x - x̄)^2 = ${this.subProcess.frequencyDistribution.sum.FSD2()}`,];
                SDXF = ["ความถี่ x (ข้อมูล - ค่าเฉลี่ย)^2",...this.subProcess.frequencyDistribution.array.SDXF(),`Σf(x - x̄)^2 = ${this.subProcess.frequencyDistribution.sum.SDXF()}`,];

                // เปลี่ยนชื่อ column
                const changeNameAColumn = function (): void {
                    try {
                        if (nameX && (nameX !== "")) {
                            data[0] = nameX;
                            MD.shift();
                            MD.unshift(`|${nameX} - ค่าเฉลี่ย|`);
                            MD2.shift();
                            MD2.unshift(`|${nameX} - ค่าเฉลี่ย|`);
                            SD2.shift();
                            SD2.unshift(`${nameX} - ค่าเฉลี่ย`);
                            SD.shift();
                            SD.unshift(`(${nameX} - ค่าเฉลี่ย)^2`);
                        }
                        if (nameF && (nameF !== "")) frequency[0] = nameF;
                        if (nameC && (nameC !== "")) {
                            classInterval[0] = nameC;
                            midPoint[0] = nameC;
                            xf.shift();
                            xf.unshift(`${nameC} x ${nameF}`);
                            MD.shift();
                            MD.unshift(`|${nameC} - ค่าเฉลี่ย|`);
                            MD2.shift();
                            MD2.unshift(`|${nameC} - ค่าเฉลี่ย|`);
                            fMD.shift();
                            fMD.unshift(`${nameF} x |${nameC} - ค่าเฉลี่ย|`);
                            SD2.shift();
                            SD2.unshift(`${nameC} - ค่าเฉลี่ย`);
                            SD.shift();
                            SD.unshift(`(${nameC} - ค่าเฉลี่ย)^2`);
                            FSD.shift();
                            FSD.unshift(`${nameC} - ค่าเฉลี่ย`);
                            FSD2.shift();
                            FSD2.unshift(`(${nameC} - ค่าเฉลี่ย)^2`);
                            SDXF.shift();
                            SDXF.unshift(`${nameF} x (${nameC} - ค่าเฉลี่ย)^2`);
                        }
                        if (nameW && (nameW !== "")) weight[0] = nameW;
                        if (nameW && nameX && (nameX !== "") && (nameW !== "") && (nameF === "") && (nameC === "")) {
                            weight[0] = nameW;
                            data[0] = nameX;
                            wx.shift();
                            wx.unshift(`${nameX} x ${nameW}`);
                        }
                        if (nameX && nameF && nameX !== "" && nameF !== "") {
                            data[0] = nameX;
                            frequency[0] = nameF;
                            xf.shift();
                            xf.unshift(`${nameX} x ${nameF}`);
                            MD.shift();
                            MD.unshift(`|${nameX} - ค่าเฉลี่ย|`);
                            MD2.shift();
                            MD2.unshift(`|${nameX} - ค่าเฉลี่ย|`);
                            fMD.shift();
                            fMD.unshift(`${nameF} x |${nameX} - ค่าเฉลี่ย|`);
                            SD2.shift();
                            SD2.unshift(`${nameX} - ค่าเฉลี่ย`);
                            SD.shift();
                            SD.unshift(`(${nameX} - ค่าเฉลี่ย)^2`);
                            FSD.shift();
                            FSD.unshift(`${nameX} - ค่าเฉลี่ย`);
                            FSD2.shift();
                            FSD2.unshift(`(${nameX} - ค่าเฉลี่ย)^2`);
                            SDXF.shift();
                            SDXF.unshift(`${nameF} x (${nameX} - ค่าเฉลี่ย)^2`);
                        }
                    } catch (err: unknown) {
                        throw err;
                    }
                };
                void changeNameAColumn();

                const error: string = `โปรแกรมหยุดทำงานโปรดทำตามคำแนะนำต่อไปนี้!\nอ่านการใช้งานตารางได้ที่ไฟล์ manual.ts \n1. ข้อมูลใส่ไม่ครบ\n2. รหัสของตารางที่ใส่กับข้อมูลไม่สอดคล้องกัน\n3. ข้อมูลตารางจะไม่แสดงจนกว่าจะได้ข้อมูลที่ต้องการในตารางนั้น`;
                if (typeof w === "string") {
                    status = !status;
                    if (w === "") {
                        if (this.haveData && this.notHaveClassInterval) {
                            for (let i: number = 0; i <= this.data.length + 1; i++) {
                                table.push({ x: data[i] });
                            }
                        } else {
                            for (let i: number = 0;i <= this.classInterval.length / 2 + 1;i++) {
                                table.push({ ci: classInterval[i], x: midPoint[i] });
                            }
                        }
                        summary.push(`- ค่าเฉลี่ยเลขคณิต = ${this.subProcess.noneFrequencyDistribution.mean.X()} ≈ ${this.subProcess.noneFrequencyDistribution.mean.X().toFixed(2)}`);
                    } else if (w === "t1".toUpperCase() || w === "t1".toLowerCase()) {
                        if (data[0] === undefined) throw new Error(error);
                        if (frequency[0] === undefined) throw new Error(error);
                        for (let i: number = 0; i <= this.data.length + 1; i++) {
                            table.push({ x: data[i], f: frequency[i], xf: xf[i] });
                        }
                        summary.push(`- ค่าเฉลี่ยเลขคณิต = ${this.subProcess.frequencyDistribution.mean.XF()} ≈ ${this.subProcess.frequencyDistribution.mean.XF().toFixed(2)}`);
                    } else if (w === "t2".toUpperCase() || w === "t2".toLowerCase()) {
                        if (data[0] === undefined) throw new Error(error);
                        if (frequency[0] === undefined) throw new Error(error);
                        for (let i: number = 0; i <= this.data.length + 1; i++) {
                            table.push({x: data[i],f: frequency[i],cf: cumulativeFrequency[i],xf: xf[i]});
                        }
                        summary.push(`- ค่าเฉลี่ยเลขคณิต = ${this.subProcess.frequencyDistribution.mean.XF()} ≈ ${this.subProcess.frequencyDistribution.mean.XF().toFixed(2)}`);
                    } else if (w === "t3".toUpperCase() || w === "t3".toLowerCase()) {
                        if (this.haveData) throw new Error(error);
                        if (this.notHaveClassInterval) throw new Error(error);
                        if (classInterval[0] === undefined) throw new Error(error);
                        if (frequency[0] === undefined) throw new Error(error);
                        for (let i: number = 0;i <= this.classInterval.length / 2 + 1;i++) {
                            table.push({ci: classInterval[i],x: midPoint[i],f: frequency[i],cf: cumulativeFrequency[i],xf: xf[i],});
                        }
                        summary.push(`- ค่าเฉลี่ยเลขคณิต = ${this.subProcess.frequencyDistribution.mean.XF()} ≈ ${this.subProcess.frequencyDistribution.mean.XF().toFixed(2)}`
                        );
                    } else if (w === "t4".toUpperCase() || w === "t4".toLowerCase()) {
                        if (this.notHaveWeight) throw new Error(error);
                        if (this.haveFrequency) throw new Error(error);
                        if (data[0] === undefined) throw new Error(error);
                        for (let i: number = 0; i <= this.w.length + 1; i++) {
                            table.push({ x: data[i], w: weight[i], wx: wx[i] });
                        }
                        summary.push(`- ค่าเฉลี่ยเลขคณิต = ${this.subProcess.noneFrequencyDistribution.mean.WX()} ≈ ${this.subProcess.noneFrequencyDistribution.mean.WX().toFixed(2)}`);
                    } else if (w === "t5".toUpperCase() || w === "t5".toLowerCase()) {
                        if (this.haveData && this.notHaveFrequency) {
                            for (let i: number = 0; i <= this.data.length + 1; i++) {
                                table.push({ x: data[i], "|x - x̄|": MD[i] });
                            }
                            summary.push(`- ค่าเฉลี่ยเลขคณิต = ${this.subProcess.noneFrequencyDistribution.mean.X()} ≈ ${this.subProcess.noneFrequencyDistribution.mean.X().toFixed(2)}`,`- ส่วนเบี่ยงเบนเฉลี่ย = ${this.subProcess.noneFrequencyDistribution.mean.MDX()} ≈ ${this.subProcess.noneFrequencyDistribution.mean.MDX().toFixed(2)}`);
                        } else if (this.notHaveData && this.haveFrequency && this.haveClassInterval) {
                            for (let i: number = 0;i <= this.classInterval.length / 2 + 1;i++) {
                                table.push({ ci: classInterval[i], x: midPoint[i],f: frequency[i],xf: xf[i],"|x - x̄|": MD2[i],"f|x - x̄|": fMD[i],});
                            }
                            summary.push(`- ค่าเฉลี่ยเลขคณิต = ${this.subProcess.frequencyDistribution.mean.XF()} ≈ ${this.subProcess.frequencyDistribution.mean.XF().toFixed(2)}`,`- ส่วนเบี่ยงเบนเฉลี่ย = ${this.subProcess.frequencyDistribution.mean.MDXF()} ≈ ${this.subProcess.frequencyDistribution.mean.MDXF().toFixed(2)}`);
                        } else {
                            if (data[0] === undefined) throw new Error(error);
                            if (frequency[0] === undefined) throw new Error(error);
                            for (let i: number = 0; i <= this.data.length + 1; i++) {
                                table.push({x: data[i],f: frequency[i],xf: xf[i],"|x - x̄|": MD2[i],"f|x - x̄|": fMD[i]});
                            }
                            summary.push(`- ค่าเฉลี่ยเลขคณิต = ${this.subProcess.frequencyDistribution.mean.XF()} ≈ ${this.subProcess.frequencyDistribution.mean.XF().toFixed(2)}`,`- ส่วนเบี่ยงเบนเฉลี่ย = ${this.subProcess.frequencyDistribution.mean.MDXF()} ≈ ${this.subProcess.frequencyDistribution.mean.MDXF().toFixed(2)}`);
                        }
                    } else if (w === "t6".toUpperCase() || w === "t6".toLowerCase()) {
                        if (this.haveData && this.notHaveFrequency) {
                            for (let i: number = 0; i <= this.data.length + 1; i++) {
                                table.push({ x: data[i], "x - x̄": SD2[i], "(x - x̄)^2": SD[i] });
                            }
                            summary.push(`- ค่าเฉลี่ยเลขคณิต = ${this.subProcess.noneFrequencyDistribution.mean.X()} ≈ ${this.subProcess.noneFrequencyDistribution.mean.X().toFixed(2)}`,`- ส่วนเบี่ยงมาตราฐาน = ${this.subProcess.noneFrequencyDistribution.mean.SDX()} ≈ ${this.subProcess.noneFrequencyDistribution.mean.SDX().toFixed(2)}`);
                        } else if (this.haveData && this.haveFrequency) {
                            for (let i: number = 0; i <= this.data.length + 1; i++) {
                                table.push({x: data[i],f: frequency[i],xf: xf[i],"x - x̄": FSD2[i],"(x - x̄)^2": FSD[i],"f(x - x̄)^2": SDXF[i],});
                            }
                            summary.push(`- ค่าเฉลี่ยเลขคณิต = ${this.subProcess.frequencyDistribution.mean.XF()} ≈ ${this.subProcess.frequencyDistribution.mean.XF().toFixed(2)}`,`- ส่วนเบี่ยงมาตราฐาน = ${this.subProcess.frequencyDistribution.mean.SDXF()} ≈ ${this.subProcess.frequencyDistribution.mean.SDXF().toFixed(2)}`);
                        } else if (this.haveClassInterval && this.haveFrequency && this.notHaveData) {
                            for (let i: number = 0;i <= this.classInterval.length / 2 + 1;i++) {
                                table.push({ci: classInterval[i],x: midPoint[i],f: frequency[i],xf: xf[i],"x - x̄": FSD[i],"(x - x̄)^2": FSD2[i], "f(x - x̄)^2": SDXF[i],});
                            }
                            summary.push(`- ค่าเฉลี่ยเลขคณิต = ${this.subProcess.frequencyDistribution.mean.XF()} ≈ ${this.subProcess.frequencyDistribution.mean.XF().toFixed(2)}`,`- ส่วนเบี่ยงมาตราฐาน = ${this.subProcess.frequencyDistribution.mean.SDXF()} ≈ ${this.subProcess.frequencyDistribution.mean.SDXF().toFixed(2)}`);
                        }
                    } else {
                        status = false;
                        const typeT: string[] = ["t1","t2","t3","t4","t5","t6","t7","t8"];
                        const check: string = w;
                        const textError: string = `เกิดข้อผิดพลาดขึ้นโปรดทำตามคำแนะนำหล่านี้!
                        * รหัสชนิดตาราง (${check}) นั้นไม่มีอยู่ในรหัสตารางที่สร้างไว้
                        * รหัสตารางได้แก่ ${typeT.join(" , ")} เป็นต้น
                        - โปรดตรวจสอบข้อมูลให้ถูกต้อง
                        - กรอกข้อมูลใหม่หรือกรอกให้ครบ
                        - กรอกรหัสชนิดตารางให้ถูกต้อง
                        - หากไม่มีข้อมูลบางชนิดให้ใส่เป็น array เปล่า []`;
                        return textError;
                    }
                    return table;
                } else {
                    if (typeof word === "undefined" || word === undefined)
                        return "โปรดระบุรหัสชนิดของตาราง!";
                    else return "โปรดใส่ข้อมูลที่เป็นชนิดข้อความเท่านั้น!";
                }
            }
            try {
                console.table(tableType(word));
                if (status) {
                    summary.forEach((idx: string): void => console.log(idx));
                }
            } catch (err: unknown) {
                throw err;
            }
        };
    }

    public mean = (x̄: number = 0,x: number[] = this.sortData,Σxi: number = 0,n: number = this.n(),f: number[] = this.frequency,Σxifi: number = 0,w: number[] = this.w,Σwixi: number = 0,Σwi: number = 0): string => {
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
            throw new Error("เกิดข้อผิดพลาดขึ้นโปรดลองใส่ข้อมูลใหม่");
        }
        return this.Write<Arg1 , Arg2 , number>(`ค่าเฉลี่ยเลขคณิต x̄ =` , x̄ , 2);
    };

    public median = (Med: number = 0,n: number = this.n(),l: number = 0,i: number = this.i,x: number[] = this.sortData,f: number[] = this.frequency,Σfl: number = 0,fm: number = 0,positionMed: any = 0): string | Error => {
        if (this.notHaveData && this.notHaveClassInterval)
            throw new Error("คุณยังไม่ได้ใส่ข้อมูล!");
        if (this.haveData && this.notHaveFrequency) {
            n % 2 !== 0
                ? (Med = this.sortData[Math.floor(n / 2)])
                : (Med =
                    (this.sortData[Math.floor((n - 1) / 2)] +
                        this.sortData[Math.floor((n + 1) / 2)]) /
                    2);
            if (n % 2 !== 0) positionMed = Math.ceil(n / 2);
            else positionMed = `${this.sortData[Math.floor((n - 1) / 2)]} ระหว่าง ${this.sortData[Math.floor((n + 1) / 2)]}`;
        } else {
            positionMed = n / 2;
            let search: number[] = this.subProcess.findCumulativeFrequency(positionMed);
            if (this.notHaveClassInterval) {
                Med = x[search.length];
            } else {
                x = this.midPoint();
                if (this.notHaveClassInterval) l = x[search.length * 2] - 0.5;
                else l = this.classInterval[search.length * 2] - 0.5;
                Σfl = this.cumulativeFrequency[search.length - 1];
                fm = this.frequency[search.length];
                Med = l + i * ((positionMed - Σfl) / fm);
            }
        }
        return this.Write<Arg1 , Arg2 , number>([`ตำแหน่งมัธยฐาน = `, `\nมัธยฐาน Me = `] , [positionMed, Med] , 2);
    };

    public mode = (Mode: number = 0,count: any = {},max: number = 0,x: number[] = this.sortData,f: number[] = this.frequency,d1: number = 0,d2: number = 0,l: number = 0,i: number = this.i): any => {
        if (this.haveData && this.notHaveFrequency) {
            let Mo: string[] = [];
            for (let i in this.sortData) {
                count[this.sortData[i]] = (count[this.sortData[i]] || 0) + 1;
                if (count[this.sortData[i]] > max) max = count[this.sortData[i]];
            }
            for (let j in count) {
                if (count[j] == max) Mo.push(j);
            }
            if (Mo.length >= 3) return this.ErrorMsg<string>(`ไม่มีค่าฐานนิยมของข้อมูลชุดนี้`);
            else return this.Write<Arg1 , Arg2 , undefined>("ฐานนิยม Mo =", Number(Mo[0]));
        } else if (this.haveFrequency) {
            let maximumFrequency: number = Math.max(...f);
            if (this.notHaveClassInterval) Mode = x[f.indexOf(maximumFrequency)];
            else {
                l = this.classInterval[f.indexOf(maximumFrequency) * 2] - 0.5;
                d1 = f[f.indexOf(maximumFrequency)] - f[f.indexOf(maximumFrequency) - 1];
                d2 = f[f.indexOf(maximumFrequency)] - f[f.indexOf(maximumFrequency) + 1];
                Mode = l + i * (d1 / (d1 + d2));
            }
            return this.Write<Arg1 , Arg2 , undefined>(`ฐานนิยม Mo =`, Mode);
        }
    };

    public midRange = (MR: number = 0,x: number[] = this.sortData,n: number = this.sortData.length,Xmax: number = 0,Xmin: number = 0): string => {
        if (this.haveData) {
            Xmax = x[n - 1];
            Xmin = x[n - n];
            MR = (Xmax + Xmin) / 2;
        } else {
            throw new Error("โปรดใส่ข้อมูลก่อน!");
        }
        return this.Write<Arg1 , Arg2 , undefined>(`ค่ากึ่งกลางพิสัย =`, MR);
    };

    public range = (r: number = 0,Xmax = 0,Xmin = 0,x: number[] = this.sortData,c: number[] = this.classInterval): string => {
        if (this.haveData && this.notHaveFrequency) {
            Xmax = x[this.data.length - 1];
            Xmin = x[0];
        } else if (this.haveData && this.haveFrequency) {
            Xmax = Math.max(...x) + 0.5;
            Xmin = Math.min(...x) - 0.5;
        } else if (this.haveFrequency && this.haveClassInterval) {
            Xmax = Math.max(...c) + 0.5;
            Xmin = Math.min(...c) - 0.5;
        } else {
            throw new Error("เกิดข้อผิดพลาดขี้นโปรดใส่ข้อมูลใหม่อีกครั้ง!");
        }
        r = Xmax - Xmin;
        return this.Write<Arg1 , Arg2 , undefined>(`พิสัย =`, r);
    };

    public geometricMean = (GM: number = 0,x: number[] = this.data,n: number = this.n(),Σlogxi: number = 1): string => {
        if (this.notHaveData) throw new Error("โปรดใส่ข้อมูลก่อน!");
        for (let i in x) {
            Σlogxi *= x[i];
        }
        GM = Σlogxi ** (1 / n);
        return this.Write<Arg1 , Arg2 , undefined>(`ค่าเฉลี่ยเรขาคณิต G.M. =`, GM);
    };

    public harmonicMean = (HM: number = 0,x: number[] = this.data,n: number = this.n(),Σ1_xi: number = 0,f: number[] = this.frequency,Σfi_xi: number = 0,Σxi: number = 0): string => {
        if (this.haveData && this.notHaveFrequency) {
            for (let i: number = 0; i < n; i++) {
                Σ1_xi += 1 / x[i];
            }
            HM = n / Σ1_xi;
        } else if (this.haveData && this.haveFrequency) {
            for (let j in x) {
                Σxi += x[j];
                Σfi_xi += x[j] / f[j];
            }
            HM = Σxi / Σfi_xi;
        } else if (this.haveFrequency) {
            if (this.notHaveData) x = this.midPoint();
            for (let k in x) {
                Σfi_xi += Number(f[k] / x[k]);
            }
            HM = n / Σfi_xi;
        } else {
            throw new Error("เกิดข้อผิดพลาดขี้นโปรดใส่ข้อมูลใหม่อีกครั้ง!");
        }
        return this.Write<Arg1 , Arg2 , undefined>(`ค่าเฉลี่ยฮาร์โมนิค H.M. =`, HM);
    };

    public Qr = (r: any,Qr: number = 0,positionQr: number = 0,x: number[] = this.sortData,n: number = this.n(),l: number = 0,i: number = this.i,Σfl: number = 0,fq: number = 0): any => {
        // parameter (r) จะต้องให้ผู้ใช้ส่งข้อมูลมาเพื่อนำมาใช้งาน
        if (Qr || (Qr && positionQr)) throw new Error(`ส่งข้อมูลได้แค่ค่าเดียว!`);
        if (this.subProcess.validation.checkForNegativeNumber(r)) throw new Error(`ตำแหน่งควอร์ไทล์ที่ ${r} ไม่สามารถหาค่าควอร์ไทล์ได้เพราะตำแหน่งควอร์ไทล์ของข้อมูลชุดนี้ติดลบ!`);
        else if (this.subProcess.validation.checkForZeronumber(r)) throw new Error(`ตำแหน่งควอร์ไทล์ไม่สามารถเป็นเลข 0 ได้!`);
        else if (this.subProcess.validation.decimalCheck(r)) throw new Error(`ตำแหน่งควอร์ไทล์ ${r} ไม่สามารถหาที่เป็นเลขทศนิยได้!`);
        else if (r > 4) throw new Error(`ไม่สามารถหาค่าควอร์ไทล์ Q${r} ของข้อมูลชุดนี้ได้\nเลขควอร์ไทล์จะต้องเป็นเลข 1 ถึง 4 เท่านั้น!`);
        else if (typeof r !== "number") throw new Error(`โปรดใส่ข้อมูลที่เป็นชนิดตัวเลขเท่านั้น!`);
        else if (typeof r === "undefined" || r === undefined) throw new Error(`โปรดใส่ข้อมูลตำแหน่งของ r ที่ต้องการหา!`);
        else {
            // ตรวจสอบข้อมูลเรียบร้อย
            if (this.haveData && this.notHaveClassInterval) {
                // แบบไม่แจกแจงความถี่
                positionQr = (r * (n + 1)) / 4;
                let search: number[] =
                    this.subProcess.findCumulativeFrequency(positionQr);
                if (this.haveData && Number.isInteger(positionQr) && this.notHaveFrequency) {
                    if (x[Math.trunc(positionQr)] === undefined || Number.isNaN(x[Math.trunc(positionQr)])) {
                        throw `${new Error(`ไม่สามารถหาค่าควอร์ไทล์ Q${r} ได้ตำแหน่งควอร์ไทล์ที่ ${positionQr} นั้นไม่มีอยู่จริงในข้อมูลชุดนี้เพราะข้อมูลชุดนี้มีแค่ ${n} จำนวน`)}`;
                    } else {
                        return this.Write<Arg1 , Arg2 , undefined>([`ตำแหน่งควอร์ไทล์ Q${r} =`, `ค่าของควอร์ไทล์ Q${r} =`],[positionQr, x[positionQr - 1]]);
                    }
                } else if (this.haveData && this.haveFrequency && this.notHaveClassInterval) {
                    let nearby: number = this.cumulativeFrequency[Math.sqrt(Math.trunc(positionQr)) - 1];
                    if (nearby < positionQr && positionQr < nearby + 1) {
                        let position1: number = x[search.length - 1];
                        let position2: number = x[search.length];
                        let difference: any = (positionQr - Math.trunc(positionQr)).toFixed(2);
                        Qr = position1 + difference * Math.abs(position2 - position1);
                    } else {
                        if (x[search.length] === undefined || Number.isNaN(x[search.length])) {
                            throw `${new Error(`ไม่สามารถหาค่าควอร์ไทล์ Q${r} ได้ตำแหน่งควอร์ไทล์ที่ ${positionQr} นั้นไม่มีอยู่จริงในข้อมูลชุดนี้เพราะข้อมูลชุดนี้มีแค่ ${n} จำนวน`)}`;
                        }
                        Qr = x[search.length];
                    }
                } else {
                    if (x[Math.floor(positionQr)] === undefined ||Number.isNaN(x[Math.floor(positionQr)])) {
                        throw `${new Error(`ไม่สามารถหาค่าควอร์ไทล์ Q${r} ได้ตำแหน่งควอร์ไทล์ที่ ${positionQr} นั้นไม่มีอยู่จริงในข้อมูลชุดนี้เพราะข้อมูลชุดนี้มีแค่ ${n} จำนวน`)}`;
                    }
                    let position1: number = x[Math.floor(positionQr) - 1];
                    let position2: number = x[Math.floor(positionQr)];
                    let difference: any = (positionQr - Math.trunc(positionQr)).toFixed(2);
                    Qr = position1 + difference * Math.abs(position2 - position1);
                }
            } else {
                // แบบแจกแจงความถี่
                positionQr = (r * n) / 4;
                let search = this.subProcess.findCumulativeFrequency(positionQr);
                l = this.classInterval[search.length * 2] - 0.5;
                Σfl = this.cumulativeFrequency[search.length - 1];
                fq = this.frequency[search.length];
                Qr = l + i * ((positionQr - Σfl) / fq);
            }
            return this.Write<Arg1 , Arg2 , number>([`ตำแหน่งควอร์ไทล์ Q${r} =`, `ค่าของควอร์ไทล์ Q${r} =`],[positionQr, Qr],2);
       }
    };

    public Dr = (r: any,Dr: number = 0,positionDr: number = 0,x: number[] = this.sortData,n: number = this.n(),l: number = 0,i: number = this.i,Σfl: number = 0,fd: number = 0): any => {
        // parameter (r) จะต้องให้ผู้ใช้ส่งข้อมูลมาเพื่อนำไปใช้งานต่อไป
        if (Dr || (Dr && positionDr)) throw new Error(`ส่งข้อมูลได้แค่ค่าเดียว!`);
        if (this.subProcess.validation.checkForNegativeNumber(r)) throw new Error(`ตำแหน่งเดไซล์ที่ ${r} ไม่สามารถหาค่าเดไซล์ได้เพราะตำแหน่งเดไซล์ของข้อมูลชุดนี้ติดลบ!`);
        else if (this.subProcess.validation.checkForZeronumber(r)) throw new Error(`ตำแหน่งเดไซล์ไม่สามารถเป็นเลข 0 ได้!`);
        else if (this.subProcess.validation.decimalCheck(r)) throw new Error(`ตำแหน่งเดไซล์ ${r} ไม่สามารถหาที่เป็นเลขทศนิยได้!`);
        else if (r > 10)throw new Error(`ไม่สามารถหาค่าเดไซล์ D${r} ของข้อมูลชุดนี้ได้\nเลขเดไซล์จะต้องเป็นเลข 1 ถึง 10 เท่านั้น`);
        else if (typeof r !== "number") throw new Error(`โปรดใส่ข้อมูลที่เป็นชนิดตัวเลขเท่านั้น!`);
        else if (typeof r === "undefined" || r === undefined) throw new Error(`โปรดใส่ข้อมูลตำแหน่งของ r ที่ต้องการหา!`);
        else {
            // ตรวจสอบข้อมูลเรียบร้อย
            if (this.haveData && this.notHaveClassInterval) {
                // แบบไม่แจกแจงความถี่
                positionDr = (r * (n + 1)) / 10;
                let search: number[] = this.subProcess.findCumulativeFrequency(positionDr);
                if (this.haveData && Number.isInteger(positionDr) &&this.notHaveFrequency) {
                    if (x[Math.trunc(positionDr)] === undefined || Number.isNaN(x[Math.trunc(positionDr)])) {
                        throw `${new Error(`ไม่สามารถหาค่าเดไซล์ D${r} ได้ตำแหน่งเดไซล์ที่ ${positionDr} นั้นไม่มีอยู่จริงในข้อมูลชุดนี้เพราะข้อมูลชุดนี้มีแค่ ${n} จำนวน`)}`;
                    } else {
                        return this.Write<Arg1 , Arg2 , undefined>([`ตำแหน่งเดไซล์ D${r} =`, `ค่าของเดไซล์ D${r} =`],[positionDr, x[positionDr - 1]]);
                    }
                } else if (this.haveData && this.haveFrequency && this.notHaveClassInterval) {
                    let nearby = this.cumulativeFrequency[Math.sqrt(Math.trunc(positionDr)) - 1];
                    if (nearby < positionDr && positionDr < nearby + 1) {
                        let position1: number = x[search.length - 1];
                        let position2: number = x[search.length];
                        let difference: any = (positionDr - Math.trunc(positionDr)).toFixed(2);
                        Dr = position1 + difference * Math.abs(position2 - position1);
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
                    Dr = position1 + difference * Math.abs(position2 - position1);
                }
            } else {
                // แบบแจกแจงความถี่
                positionDr = (r * n) / 10;
                let search: number[] = this.subProcess.findCumulativeFrequency(positionDr);
                l = this.classInterval[search.length * 2] - 0.5;
                Σfl = this.cumulativeFrequency[search.length - 1];
                fd = this.frequency[search.length];
                Dr = l + i * ((positionDr - Σfl) / fd);
            }
            return this.Write<Arg1 , Arg2 , number>([`ตำแหน่งเดไซล์ D${r} =`, `ค่าของเดไซล์ D${r} =`],[positionDr, Dr] , 2);
        }
    };

    public Pr = (r: any,Pr: number = 0,positionPr: number = 0,x: number[] = this.sortData,n: number = this.n(),f: number[] = this.frequency,l: number = 0,i: number = this.i,Σfl: number = 0,fp: number = 0): any => {
        // parameter (r) จะต้องให้ผู้ใช้ส่งข้อมูลมาเพื่อนำไปใช้งานต่อไป
        if (Pr || (Pr && positionPr)) throw new Error(`ส่งข้อมูลได้แค่ค่าเดียว!`);
        if (this.subProcess.validation.checkForNegativeNumber(r)) throw new Error(`ตำแหน่งเปอร์เซนต์ไทล์ที่ ${r} ไม่สามารถหาค่าเปอร์เซนต์ไทล์ได้เพราะตำแหน่งเดไซล์ของข้อมูลชุดนี้ติดลบ!`);
        else if (this.subProcess.validation.checkForZeronumber(r)) throw new Error(`ตำแหน่งเปอร์เซนต์ไทล์ไม่สามารถเป็นเลข 0 ได้!`);
        else if (this.subProcess.validation.decimalCheck(r)) throw new Error(`ตำแหน่งเปอร์เซนต์ไทล์ ${r} ไม่สามารถหาที่เป็นเลขทศนิยได้!`);
        else if (r > 100) throw new Error(`ไม่สามารถหาค่าเปอร์เซนต์ไทล์ P${r} ของข้อมูลชุดนี้ได้\nเลขเปอร์เซนต์ไทล์จะต้องเป็นเลข 1 ถึง 100 เท่านั้น`);
        else if (typeof r !== "number") throw new Error(`โปรดใส่ข้อมูลที่เป็นชนิดตัวเลขเท่านั้น!`);
        else if (typeof r === "undefined" || r === undefined) throw new Error(`โปรดใส่ข้อมูลตำแหน่งของ r ที่ต้องการหา!`);
        else {
            // แบบไม่แจกแจงความถี่
            if (this.haveData && this.notHaveClassInterval) {
                positionPr = (r * (n + 1)) / 100;
                let search: number[] = this.subProcess.findCumulativeFrequency(positionPr);
                if (this.haveData && Number.isInteger(positionPr) && this.notHaveFrequency) {
                    if (x[Math.trunc(positionPr)] === undefined || Number.isNaN(x[Math.trunc(positionPr)])) {
                        throw `${new Error(`ไม่สามารถหาค่าเปอร์เซนต์ไทล์ P${r} ได้ตำแหน่งเปอร์เซนต์ไทล์ที่ ${positionPr} นั้นไม่มีอยู่จริงในข้อมูลชุดนี้เพราะข้อมูลชุดนี้มีแค่ ${n} จำนวน`)}`;
                    } else {
                        return this.Write<Arg1 , Arg2 , undefined>([`ตำแหน่งเปอร์เซนต์ไทล์ P${r} =`, `ค่าของเปอร์เซนต์ไทล์ P${r} =`],[positionPr, x[positionPr - 1]]);
                    }
                } else if (this.haveData && this.haveFrequency && this.notHaveClassInterval) {
                    let nearby = this.cumulativeFrequency[Math.sqrt(Math.trunc(positionPr)) - 1];
                    if (nearby < positionPr && positionPr < nearby + 1) {
                        let position1: number = x[search.length - 1];
                        let position2: number = x[search.length];
                        let difference: any = (positionPr - Math.trunc(positionPr)).toFixed(2);
                        Pr = position1 + difference * Math.abs(position2 - position1);
                    } else {
                        if (x[search.length] === undefined || Number.isNaN(x[search.length]))
                            return `${new Error(`ไม่สามารถหาค่าเปอร์เซนต์ไทล์ P${r} ได้ตำแหน่งเปอร์เซนต์ไทล์ที่ ${positionPr} นั้นไม่มีอยู่จริงในข้อมูลชุดนี้เพราะข้อมูลชุดนี้มีแค่ ${n} จำนวน`)}`;
                        Pr = x[search.length];
                    }
                } else {
                    if (x[Math.floor(positionPr)] === undefined || Number.isNaN(x[Math.floor(positionPr)]))
                        return `${new Error(`ไม่สามารถหาค่าเปอร์เซนต์ไทล์ P${r} ได้ตำแหน่งเปอร์เซนต์ไทล์ที่ ${positionPr} นั้นไม่มีอยู่จริงในข้อมูลชุดนี้เพราะข้อมูลชุดนี้มีแค่ ${n} จำนวน`)}`;
                    let position1: number = x[Math.floor(positionPr) - 1];
                    let position2: number = x[Math.floor(positionPr)];
                    let difference: any = (positionPr - Math.trunc(positionPr)).toFixed(2);
                    Pr = position1 + difference * Math.abs(position2 - position1);
                }
            } else {
                // แบบแจกแจงความถี่
                positionPr = (r * n) / 100;
                let search: number[] = this.subProcess.findCumulativeFrequency(positionPr);
                l = this.classInterval[search.length * 2] - 0.5;
                Σfl = this.cumulativeFrequency[search.length - 1];
                fp = this.frequency[search.length];
                Pr = l + i * ((positionPr - Σfl) / fp);
            }
            return this.Write<Arg1 , Arg2 , number>([`ตำแหน่งเปอร์เซนต์ไทล์ P${r} =`, `ค่าของเปอร์เซนต์ไทล์ P${r} =`],[positionPr, Pr],2);
        }
    };

    public quartileDeviation = (QD: number = 0,Q1: any = 1,Q3: any = 3,n: number = this.n(),positionQr: number[] = this.sortData,l1: number = 0,i1: number = this.i,Σfl1: number = 0,fq1: number = 0,l3: number = 0,i3: number = this.i,Σfl3: number = 0,fq3: number = 0,x: number[] = this.sortData): string => {
        type PQr = {
            Q1: number;
            Q3: number;
        };
        type SQr = {
            readonly Q1: number[];
            readonly Q3: number[];
        };

        // แบบไม่แจกแจงความถี่
        if (this.haveData && this.notHaveFrequency) {
            // ตำแหน่ง Q3 และ Q1
            Q1 = (1 * (n + 1)) / 4;
            Q3 = (3 * (n + 1)) / 4;
            type QObject = {
                Q1: {
                    readonly r: number;
                    decimal: number;
                    difference: number;
                    value: number;
                    readonly sendValue: Function;
                };
                Q3: {
                    readonly r: number;
                    decimal: number;
                    difference: number;
                    value: number;
                    readonly sendValue: Function;
                };
            };
            let QValue: QObject = {
                Q1: {
                    // ค่า Q1
                    r: 1,
                    decimal: 0,
                    difference: 0,
                    value: 0,
                    sendValue(): number {
                        this.decimal = Math.abs(Q1 - Math.trunc(Q1));
                        this.difference = Math.abs(
                            positionQr[Math.trunc(Q1) - 1] - positionQr[Math.trunc(Q1)]
                        );
                        this.value = positionQr[Math.trunc(Q1) - 1] + this.decimal * this.difference;
                        return this.value;
                    },
                },
                Q3: {
                    // ค่า Q3
                    r: 3,
                    decimal: 0,
                    difference: 0,
                    value: 0,
                    sendValue(): number {
                        this.decimal = Math.abs(Q3 - Math.trunc(Q3));
                        this.difference = Math.abs(positionQr[Math.trunc(Q3) - 1] - positionQr[Math.trunc(Q3)]);
                        this.value = positionQr[Math.trunc(Q3) - 1] + this.decimal * this.difference;
                        return this.value;
                    },
                },
            };
            if (Number.isInteger(Q1) && Number.isInteger(Q3)) {
                // แบบไม่แจกแจงความถี่
                QD = (positionQr[Q3 - 1] - positionQr[Q1 - 1]) / 2;
            } else if (this.subProcess.validation.decimalCheck(Q1) && this.subProcess.validation.decimalCheck(Q3)) {
                QD = (QValue.Q3.sendValue() - QValue.Q1.sendValue()) / 2;
            } else if (this.subProcess.validation.decimalCheck(Q1) || this.subProcess.validation.decimalCheck(Q3)) {
                if (Number.isInteger(Q1)) {
                    QD = (QValue.Q3.sendValue() - positionQr[Q1 - 1]) / 2;
                } else if (Number.isInteger(Q3)) {
                    QD = (positionQr[Q1 - 3] - QValue.Q1.sendValue()) / 2;
                }
            }
        } else if (this.haveData &&this.haveFrequency && this.notHaveClassInterval) {
            let position: { Q1: number; Q3: number } = {
                Q1: (1 * (n + 1)) / 4,
                Q3: (3 * (n + 1)) / 4,
            };
            let search: { Q1: number[]; Q3: number[] } = {
                Q1: this.subProcess.findCumulativeFrequency(position.Q1),
                Q3: this.subProcess.findCumulativeFrequency(position.Q3),
            };
            position.Q1 = (1 * (n + 1)) / 4;
            position.Q3 = (3 * (n + 1)) / 4;
            Q1 = x[search.Q1.length];
            Q3 = x[search.Q3.length];
            if (this.cumulativeFrequency[this.cumulativeFrequency.indexOf(Math.trunc(position.Q1))] === Math.trunc(position.Q1) || this.cumulativeFrequency[this.cumulativeFrequency.indexOf(Math.trunc(position.Q3))] === Math.trunc(position.Q3)) {
                if (this.cumulativeFrequency[this.cumulativeFrequency.indexOf(Math.trunc(position.Q1))] === Math.trunc(position.Q1)) {
                    Q1 = x[search.Q1.length - 1] + Math.abs(position.Q1 - Math.trunc(position.Q1)) * Math.abs(x[search.Q1.length - 1] - x[search.Q1.length]);
                } else if (this.cumulativeFrequency[this.cumulativeFrequency.indexOf(Math.trunc(position.Q3))] === Math.trunc(position.Q3)) {
                    Q3 = x[search.Q3.length - 1] + Math.abs(position.Q3 - Math.trunc(position.Q3)) * Math.abs(x[search.Q3.length - 1] - x[search.Q3.length]);
                }
            }
            QD = (Q3 - Q1) / 2;
        } else if (this.notHaveData && this.haveFrequency && this.haveClassInterval) {
            // แบบแจกแจงความถี่
            let position: PQr = {
                Q1: (1 * n) / 4,
                Q3: (3 * n) / 4,
            };
            let search: SQr = {
                Q1: this.subProcess.findCumulativeFrequency(position.Q1),
                Q3: this.subProcess.findCumulativeFrequency(position.Q3),
            };
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
        return this.Write<Arg1 , Arg2 , number>(`ส่วนเบี่ยงเบนควอร์ไทล์ Q.D. =`, QD, 2);
    };

    public meanDeviation = (MD: number = 0,x̄: number = 0,Σxi: number = 0,n: number = this.n(),x: number[] = this.data,Σfilxi_x̄l: number = 0,Σlxi_x̄l: number = 0,f: number[] = this.frequency,Σxifi: number = 0): string => {
        if (this.haveData && this.notHaveFrequency) {
            // แบบไม่แจกแจงความถี่
            for (let i in x) {
                Σxi += x[i];
            }
            x̄ = Σxi / n;
            for (let j in x) {
                Σlxi_x̄l += Math.abs(x[j] - x̄);
            }
            MD = Σlxi_x̄l / n;
        } else if (this.haveFrequency) {
            // แบบแจกแจงความถี่
            if (this.notHaveData) x = this.midPoint();
            for (let i in x) {
                Σxifi += x[i] * f[i];
            }
            x̄ = Σxifi / n;
            for (let j in x) {
                Σfilxi_x̄l += f[j] * Math.abs(x[j] - x̄);
            }
            MD = Σfilxi_x̄l / n;
        } else {
            throw new Error(`เกิดข้อผิดพลาดขึ้นโปรดลองใส่ข้อมูลใหม่อีกครั้ง!`);
        }
        return this.Write<Arg1 , Arg2 , number>(`ส่วนเบี่ยงเบนเฉลี่ย M.D. =`, MD, 2);
    };

    public standardDeviation = (SD: number = 0,x̄: number = 0,Σxi: number = 0,Σxi_x̄2: number = 0,Σxi2_x̄2: number = 0,n: number = this.n(),f: number[] = this.frequency,x: number[] = this.sortData,Σxifi: number = 0,Σfixi_x̄2: number = 0,Σfixi2_x̄2: number = 0): string => {
        if (this.haveData && this.notHaveFrequency) {
            // แบบไม่แจกแจงความถี่
            for (let i in x) {
                Σxi += x[i];
            }
            x̄ = Σxi / n;
            try {
                for (let j in x) {
                    Σxi_x̄2 += Math.pow(x[j], 2);
                }
                SD = Math.sqrt(Σxi_x̄2 / n - Math.pow(x̄, 2));
            } catch (err:unknown) {
                console.error(err);
                for (let k in x) {
                    Σxi2_x̄2 += Math.pow(x[k] - x̄, 2);
                }
                SD = Math.sqrt(Σxi2_x̄2 / n);
            }
        } else if (this.haveFrequency) {
            // แบบแจกแจงความถี่
            if (this.notHaveData) x = this.midPoint();
            for (let i in x) {
                Σxifi += f[i] * x[i];
            }
            x̄ = Σxifi / n;
            try {
                for (let j in x) {
                    Σfixi_x̄2 += f[j] * Math.pow(x[j], 2);
                }
                SD = Math.sqrt(Σfixi_x̄2 / n - Math.pow(x̄, 2));
            } catch (err:unknown) {
                console.error(err);
                for (let k in x) {
                    Σfixi2_x̄2 += f[k] * Math.pow(x[k] - x̄, 2);
                }
                SD = Math.sqrt(Σfixi2_x̄2 / n);
            }
        } else if (this.notCompleteData) {
            throw new Error(`เกิดข้อผิดพลาดขึ้นโปรดลองใส่ข้อมูลใหม่อีกครั้ง!`);
        } else {
            throw new Error(`เกิดข้อผิดพลาดขึ้นโปรดลองใส่ข้อมูลใหม่อีกครั้ง!`);
        }
        return this.Write<Arg1 , Arg2 , number>(`ส่วนเบี่ยงเบนเฉลี่ยมาตราฐาน S.D. =`, SD, 2);
    };

    public variance = (S2: number = 0,x̄: number = 0,Σxi: number = 0,Σxi_x̄2: number = 0,Σxi2_x̄2: number = 0,n: number = this.n(),f: number[] = this.frequency,x: number[] = this.sortData,Σxifi: number = 0,Σfixi_x̄2: number = 0,Σfixi2_x̄2: number = 0): string => {
        if (this.haveData && this.notHaveFrequency) {
            // แบบไม่แจกแจงความถี่
            for (let i in x) {
                Σxi += x[i];
            }
            x̄ = Σxi / n;
            try {
                for (let j in x) {
                    Σxi_x̄2 += Math.pow(x[j] - x̄, 2);
                }
                S2 = Σxi_x̄2 / n;
            } catch (err: unknown) {
                console.error(err);
                for (let k in x) {
                    Σxi2_x̄2 += Math.pow(x[k], 2);
                }
                S2 = Σxi2_x̄2 / n - Math.pow(x̄, 2);
            }
        } else if (this.haveFrequency) {
            // แบบแจกแจงความถี่
            if (this.notHaveData) x = this.midPoint();
            for (let i in x) {
                Σxifi += f[i] * x[i];
            }
            x̄ = Σxifi / n;
            try {
                for (let j in x) {
                    Σfixi_x̄2 += f[j] * Math.pow(x[j], 2);
                }
                S2 = Σfixi_x̄2 / n - Math.pow(x̄, 2);
            } catch (err: unknown) {
                console.error(err);
                for (let k in x) {
                    Σfixi2_x̄2 += f[k] * Math.pow(x[k] - x̄, 2);
                }
                S2 = Σfixi2_x̄2 / n;
            }
        } else {
            throw new Error(`เกิดข้อผิดพลาดขึ้นโปรดลองใส่ข้อมูลใหม่อีกครั้ง!`);
        }
        return this.Write<Arg1 , Arg2 , number>(`ความแปรปรวนของข้อมูล S^2 =`, S2, 2);
        // `ความแปรปรวนของข้อมูล S^2 = ${S2}\nปัดเป็นทศนิยม 2 ตำแหน่ง ≈ ${S2.toFixed(2)}`;
    };

    public coefficientOfRange = (CR: number = 0,Xmax = 0,Xmin = 0,x: number[] = this.sortData,c: number[] = this.classInterval): string => {
        if (this.haveData && this.notHaveFrequency) {
            // แบบไม่แจกแจงความถี่
            Xmax = x[this.data.length - 1];
            Xmin = x[0];
        } else if (this.notHaveData && this.haveClassInterval) {
            // แบบแจกแจงความถี่
            Xmax = Math.max(...c) + 0.5;
            Xmin = Math.min(...c) - 0.5;
        } else {
            throw new Error(`เกิดข้อผิดพลาดขึ้นโปรดลองใส่ข้อมูลใหม่อีกครั้ง!`);
        }
        CR = (Xmax - Xmin) / (Xmax + Xmin);
        return this.Write<Arg1 , Arg2 , number>(`สัมประสิทธิ์ของพิสัย C.R =`, CR, 3);
    };

    public coefficientOfQuartileDeviation = (CQD: number = 0,Q1: number = 0,Q3: number = 0,x: number[] = this.sortData, n: number = this.n(),f: number[] = this.frequency,l1: number = 0,i1: number = this.i,Σfl1: number = 0,fq1: number = 0,l3: number = 0,i3: number = this.i,Σfl3: number = 0,fq3: number = 0): string => {
        type searchFloor = {
            Q1: number[];
            Q3: number[];
        };

        if (this.haveData && this.notHaveFrequency) {
            // แบบไม่แจกแจงความถี่
            let positionQ1 = (1 * (n + 1)) / 4;
            let positionQ3 = (3 * (n + 1)) / 4;
            if (Number.isInteger(positionQ1)) Q1 = x[positionQ1 - 1];
            else {
                let position1: number = x[Math.floor(positionQ1) - 1];
                let position2: number = x[Math.floor(positionQ1)];
                let difference: number = positionQ1 - Math.trunc(positionQ1);
                Q1 = position1 + difference * Math.abs(position2 - position1);
            }
            if (Number.isInteger(positionQ3)) Q3 = x[positionQ3 - 1];
            else {
                let position1: number = x[Math.floor(positionQ3) - 1];
                let position2: number = x[Math.floor(positionQ3)];
                let difference: number = positionQ3 - Math.trunc(positionQ3);
                Q3 = position1 + difference * Math.abs(position2 - position1);
            }
        } else if (this.haveData && this.haveFrequency && this.notHaveClassInterval) {
            let positionQ1: number = (1 * (n + 1)) / 4;
            let positionQ3: number = (3 * (n + 1)) / 4;
            let search: searchFloor = {
                Q1: this.subProcess.findCumulativeFrequency(positionQ1),
                Q3: this.subProcess.findCumulativeFrequency(positionQ3),
            };
            Q1 = x[search.Q1.length];
            Q3 = x[search.Q3.length];
        } else if (this.notHaveData && this.haveFrequency && this.haveClassInterval) {
            // แบบแจกแจงความถี่
            let position: { Q1: number; Q3: number } = {
                Q1: (1 * n) / 4,
                Q3: (3 * n) / 4,
            };
            let search: searchFloor = {
                Q1: this.subProcess.findCumulativeFrequency(position.Q1),
                Q3: this.subProcess.findCumulativeFrequency(position.Q3),
            };
            l1 = this.classInterval[search.Q1.length * 2] - 0.5;
            Σfl1 = this.cumulativeFrequency[search.Q1.length - 1];
            fq1 = f[search.Q1.length];
            Q1 = l1 + i1 * ((position.Q1 - Σfl1) / fq1);
            l3 = this.classInterval[search.Q3.length * 2] - 0.5;
            Σfl3 = this.cumulativeFrequency[search.Q3.length - 1];
            fq3 = f[search.Q3.length];
            Q3 = l3 + i3 * ((position.Q3 - Σfl3) / fq3);
        } else {
            throw new Error(`เกิดข้อผิดพลาดขึ้นโปรดลองใส่ข้อมูลใหม่อีกครั้ง!`);
        }
        CQD = (Q3 - Q1) / (Q3 + Q1);
        return `สัมประสิทธิ์องส่วนเบี่ยงเบนควอร์ไทล์ C.QD = ${CQD}\nปัดเป็นทศนิยม 4 ตำแหน่ง ≈ ${CQD.toFixed(4)}`;
    };

    public coefficientOfMeanDeviation = (CMD: number = 0,MD: number = 0,x: number[] = this.sortData,n: number = this.n(),f: number[] = this.frequency,x̄: number = 0,Σxi: number = 0,Σxifi: number = 0,Σlxi_x̄l: number = 0,Σfilxi_x̄l: number = 0): string => {
        if (this.haveData && this.notHaveFrequency) {
            // แบบไม่แจกแจงความถี่
            for (let i in x) {
                Σxi += x[i];
            }
            x̄ = Σxi / n;
            for (let j in x) {
                Σlxi_x̄l += Math.abs(x[j] - x̄);
            }
            MD = Σlxi_x̄l / n;
        } else if (this.haveFrequency && this.haveClassInterval) {
            // แบบแจกแจงความถี่
            if (this.notHaveData) x = this.midPoint();
            for (let i in x) {
                Σxifi += x[i] * f[i];
            }
            x̄ = Σxifi / n;
            for (let j in x) {
                Σfilxi_x̄l += f[j] * Math.abs(x[j] - x̄);
            }
            MD = Σfilxi_x̄l / n;
        } else {
            throw new Error(`เกิดข้อผิดพลาดขึ้นโปรดลองใส่ข้อมูลใหม่อีกครั้ง!`);
        }
        CMD = MD / x̄;
        return this.Write<Arg1 , Arg2 , number>(`สัมประสิทธิ์ของส่วนเบี่ยงเบนเฉลี่ย C.MD =`, CMD, 3);
    };

    public coefficientOfDeviation = (CSD: number = 0,SD: number = 0,x̄: number = 0,Σxi: number = 0,Σxi_x̄2: number = 0,Σxi2_x̄2: number = 0,n: number = this.n(),f: number[] = this.frequency,x: number[] = this.sortData,Σxifi: number = 0,Σfixi_x̄2: number = 0,Σfixi2_x̄2: number = 0): string => {
        if (this.haveData && this.notHaveFrequency) {
            // แบบไม่แจกแจงความถี่
            for (let i in x) {
                Σxi += x[i];
            }
            x̄ = Σxi / n;
            try {
                for (let j in x) {
                    Σxi_x̄2 += Math.pow(x[j], 2);
                }
                SD = Math.sqrt(Σxi_x̄2 / n - Math.pow(x̄, 2));
            } catch (err: unknown) {
                console.error(err);
                for (let k in x) {
                    Σxi2_x̄2 += Math.pow(x[k] - x̄, 2);
                }
                SD = Math.sqrt(Σxi2_x̄2 / n);
            }
        } else if (this.haveFrequency) {
            // แบบแจกแจงความถี่
            if (this.notHaveData) x = this.midPoint();
            for (let i in x) {
                Σxifi += f[i] * x[i];
            }
            x̄ = Σxifi / n;
            try {
                for (let j in x) {
                    Σfixi_x̄2 += f[j] * Math.pow(x[j], 2);
                }
                SD = Math.sqrt(Σfixi_x̄2 / n - Math.pow(x̄, 2));
            } catch (err: unknown) {
                console.error(err);
                for (let k in x) {
                    Σfixi2_x̄2 += f[k] * Math.pow(x[k] - x̄, 2);
                }
                SD = Math.sqrt(Σfixi2_x̄2 / n);
            }
        } else {
            throw new Error(`เกิดข้อผิดพลาดขึ้นโปรดลองใส่ข้อมูลใหม่อีกครั้ง!`);
        }
        CSD = SD / x̄;
        return this.Write<Arg1 , Arg2 , number>(`สัมประสิทธิ์ของการแปรผัน C.SD =`, CSD, 3);
        // `สัมประสิทธิ์ของการแปรผัน C.SD = ${CSD}\nปัดเป็นทศนิยม 3 ตำแหน่ง ≈ ${CSD.toFixed(3)}`;
    };

    public standardScores = (score: number | number[],name: string[] = [],Z: number = 0,x: number[] = this.sortData,x̄: number = 0,Σxi: number = 0,n: number = this.n(),S: number = 0,Σxi_x̄2: number = 0): any => {
        // parameter (score) จะต้องให้ผู้ใช้ส่งข้อมูลมาเพื่อนำไปใช้งานต่อไป
        let list: string[] = [];
        let arr: number[] = [];
        x.map((i: number) => {
            Σxi += i; // แบบไม่แจกแจงความถี่
        });
        x̄ = Σxi / n;
        for (let xi of x) {
            Σxi_x̄2 += Math.pow(xi - x̄, 2);
        }
        S = Math.sqrt(Σxi_x̄2 / n);

        if (Array.isArray(score) &&typeof score === "object" &&name.length > 0 &&name.length === n &&score.length === name.length) {
            for (let i in x) {
                Z = (score[i] - x̄) / S;
                list.push(`คะแนนของ ${name[i]} มีค่ามาตราฐาน = ${Z}`);
                arr[i] = Z;
            }
            return this.List<string[] , number[] , string , string[]>(list, arr, "l1", name);
        }

        if (Array.isArray(score) && typeof score === "object" && name.length === 0 && score.length === n) {
            let num: number = 1;
            for (let j in x) {
                Z = (score[j] - x̄) / S;
                list.push(`คะแนนชุดที่ ${num++} มีค่ามาตราฐาน = ${Z}`);
                arr[j] = Z;
            }
            return this.List<string[] , number[] , string , undefined>(list, arr, "l2");
        }

        if (typeof score === "number" && name.length === 0) {
            Z = (score - x̄) / S;
            return this.Write<Arg1 , Arg2 , number>(`ค่ามาตราฐาน Z =`, Z, 2);
        } else {
            throw new Error(`เกิดข้อผิดพลาดขึ้น!\nการส่งข้อมูล argument ไปให้ parameter ตัวแรกนั้นต้องส่งเป็นตัวเลขเท่านั้น!\nการใส่จำนวนข้อมูลต้องเท่ากับจำนวนที่ใส่ให้ฟังชันก์`);
        }
    }
}