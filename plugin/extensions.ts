import Statistics from "../main";

// เหลือมาทำแบบแจกแจงความถี่ให้กับทุก methods
export default class Extension {

    /* ข้อมูลทั่วไป */
    private dataA: number[];
    private dataB: number[];
    private frequencyA?: number[];
    private frequencyB?: number[];

    /* แสดงผลข้อมูล */
    private composeArticles: string = '';
    private compare: string = '';

    public constructor(
        /* parameters ที่ต้องรับค่ามาจากผู้ใช้งาน */
        private DA: number[],                 // @param1 ข้อมูลชุดที่ 1
        private DB: number[],                 // @param2 ข้อมูลชุดที่ 2
        private FA?: number[] | undefined,    // @param3 ความถี่ชุดที่ 1
        private FB?: number[] | undefined,    // @param4 ความถี่ชุดที่ 2
    ) {
        this.dataA = DA;
        this.dataB = DB;
        this.frequencyA = FA;
        this.frequencyB = FB;
        ((textError: string): void => {
            if (this.DA.length !== this.DB.length) {
                throw new Error(textError);
            } 
            if (arguments[2] && arguments[3]) {
                if ((this.DA.length / 2 !== 0 && this.FA?.length === 0) || (this.FA?.length !== 0 && this.DA.length === 0)) {
                    throw new Error(textError);
                } else if ((this.DB.length / 2 !== 0 && this.FB?.length === 0) || (this.FB?.length !== 0 && this.DB.length === 0)) {
                    throw new Error(textError);
                } else if (this.DA.length / 2 !== this.FA?.length || this.DB.length / 2 !== this.FB?.length || this.FA?.length !== this.FB?.length) {
                    throw new Error(textError);
                }

            }
        })('ใส่ข้อมูลไม่ครบ!');
    }

    /* ใช้งานภายใน class */
    private arr: number[] = [];
    private convertStringToDecimalNumber = (stringA: string, stringB: string): number[] => {
        type boundary = {
            A: { indexStart: number, indexEnd: number };
            B: { indexStart: number, indexEnd: number };
        }
        const wordBoundary: boundary = {
            A: {
                indexStart: stringA.indexOf('=') + 1,
                indexEnd: stringA.indexOf('\n')
            },
            B: {
                indexStart: stringB.indexOf('=') + 1,
                indexEnd: stringB.indexOf('\n')
            },
        }
        return [
            parseFloat(stringA.substring(wordBoundary.A.indexStart, wordBoundary.A.indexEnd)),
            parseFloat(stringB.substring(wordBoundary.B.indexStart, wordBoundary.B.indexEnd))
        ];
    }

    private comparisonAndConclusion = (A: number, B: number, type: string): string => {
        if (A === 0 || B === 0 || Number.isNaN(A) || Number.isNaN(B)) throw new Error('เกิดข้อผิดพลาดขึ้นโปรดลองใหม่อีกครั้ง!');
        if (A > B) {
            this.compare = 'ข้อมูล A มีการกระจายมากกว่าข้อมูล B';
        } else if (B > A) {
            this.compare = 'ข้อมูล B มีการกระจายมากกว่าข้อมูล A';
        } else if (A === B) {
            this.compare = 'ข้อมูล A และ ข้อมูล B มีการกระจายที่เท่ากัน';
        } else {
            throw new Error('เกิดข้อผิดพลาดขึ้นโปรดลองใหม่อีกครั้ง!');
        }
        if (type === 'coefficientOfRange') {
            this.composeArticles = `สัมประสิทธิ์ของพิสัย C.R ของข้อมูล A = ${A} ≈ ${A.toFixed(3)}\nสัมประสิทธิ์ของพิสัย C.R ของข้อมูล B = ${B} ≈ ${B.toFixed(3)}\n${this.compare}`;
        } else if (type === 'coefficientOfQuartileDeviation') {
            this.composeArticles = `สัมประสิทธิ์องส่วนเบี่ยงเบนควอร์ไทล์ C.QD ของข้อมูล A = ${A} ≈ ${A.toFixed(4)}\nสัมประสิทธิ์องส่วนเบี่ยงเบนควอร์ไทล์ C.QD ของข้อมูล B = ${B} ≈ ${B.toFixed(4)}\n${this.compare}`;
        } else if (type === 'coefficientOfMeanDeviation') {
            this.composeArticles = `สัมประสิทธิ์ของส่วนเบี่ยงเบนเฉลี่ย C.MD ของข้อมูล A = ${A} ≈ ${A.toFixed(3)}\nสัมประสิทธิ์ของส่วนเบี่ยงเบนเฉลี่ย C.MD ของข้อมูล B = ${B} ≈ ${B.toFixed(3)}\n${this.compare}`;
        } else if (type === 'coefficientOfDeviation') {
            this.composeArticles = `สัมประสิทธิ์ของการแปรผัน C.SD ของข้อมูล A = ${A} ≈ ${A.toFixed(3)}\nสัมประสิทธิ์ของการแปรผัน C.SD ของข้อมูล B = ${B} ≈ ${B.toFixed(3)}\n${this.compare}`;
        } else {
            throw new Error('เกิดข้อผิดพลาดขึ้นโปรดลองใหม่อีกครั้ง!');
        }
        
        if (this.frequencyA !== undefined && this.frequencyB !== undefined) {
            return `ข้อมูล A = ${this.dataA.join(' , ')}\nความถี่ A = ${this.frequencyA.join(' , ')}\nความถี่สะสม A = ${new Statistics([] , this.frequencyA , this.dataA).cumulative().join(' , ')}\nข้อมูล B = ${this.dataB.join(' , ')}\nความถี่ B = ${this.frequencyB.join(' , ')}\nความถี่สะสม B = ${new Statistics([] , this.frequencyB, this.dataB).cumulative().join(' , ')}\n${this.composeArticles}`
        } else {
            return `ข้อมูล A = ${this.dataA.join(' , ')}\nข้อมูล B = ${this.dataB.join(' , ')}\n`.concat(this.composeArticles);
        }
    }

    public compareTheCoefficientOfRange = (): string => {
        let RA: number = 0;
        let RB: number = 0;
        if (this.dataA !== undefined && this.dataB !== undefined) { // แบบแจกแจงความถี่
            if (Math.abs((this.dataA[1] - this.dataA[0])) === Math.abs((this.dataA[3] - this.dataA[2]))
                && Math.abs((this.dataA[1] - this.dataA[0])) === Math.abs((this.dataA[5] - this.dataA[4]))
            ) {
                this.arr = this.convertStringToDecimalNumber(new Statistics([], [], this.dataA).coefficientOfRange()
                    , new Statistics([], [], this.dataB).coefficientOfRange());
                RA = this.arr[0];
                RB = this.arr[1];
                return this.comparisonAndConclusion(RA, RB, 'coefficientOfRange');
            }}
        this.arr = this.convertStringToDecimalNumber(
            new Statistics(this.dataA).coefficientOfRange(),
            new Statistics(this.dataB).coefficientOfRange());
        RA = this.arr[0];
        RB = this.arr[1];
        return this.comparisonAndConclusion(RA, RB, 'coefficientOfRange');
    }

    public compareTheCoefficientOfQuartileDeviation = (): string => {
        let QA: number = 0;
        let QB: number = 0;
        if(this.DA.length > 0 && this.DB.length > 0 && this.FA?.length === undefined && this.FB?.length === undefined){
        this.arr = this.convertStringToDecimalNumber(
            new Statistics(this.dataA).coefficientOfQuartileDeviation(),
            new Statistics(this.dataB).coefficientOfQuartileDeviation());
        }
        else if (this.DA.length > 0 && this.DB.length > 0 && this.FA?.length !== 0 && this.FB?.length !== 0) {
            this.arr = this.convertStringToDecimalNumber(
                new Statistics([], this.frequencyA, this.dataA).coefficientOfQuartileDeviation(),
                new Statistics([], this.frequencyB, this.dataB).coefficientOfQuartileDeviation());
        }

        QA = this.arr[0];
        QB = this.arr[1];
        return this.comparisonAndConclusion(QA, QB, 'coefficientOfQuartileDeviation');
    }

    public compareTheCoefficientOfMeanDeviation = (): string => {
        let MDA: number = 0;
        let MDB: number = 0;
        if(this.DA.length > 0 && this.DB.length > 0 && this.FA?.length === undefined && this.FB?.length === undefined){
                    this.arr = this.convertStringToDecimalNumber(
            new Statistics(this.dataA).coefficientOfMeanDeviation(),
            new Statistics(this.dataB).coefficientOfMeanDeviation());
        }
        else if (this.DA.length > 0 && this.DB.length > 0 && this.FA?.length !== 0 && this.FB?.length !== 0) {
            this.arr = this.convertStringToDecimalNumber(
                new Statistics([], this.frequencyA, this.dataA).coefficientOfMeanDeviation(),
                new Statistics([], this.frequencyB, this.dataB).coefficientOfMeanDeviation());
        } 

        MDA = this.arr[0];
        MDB = this.arr[1];
        return this.comparisonAndConclusion(MDA, MDB, 'coefficientOfMeanDeviation');
    }

    public compareTheCoefficientOfDeviation = (): string => {
        let SA: number = 0;
        let SB: number = 0;
        if(this.DA.length > 0 && this.DB.length > 0 && this.FA?.length === undefined && this.FB?.length === undefined){
                    this.arr = this.convertStringToDecimalNumber(
            new Statistics(this.dataA).coefficientOfDeviation(),
            new Statistics(this.dataB).coefficientOfDeviation());
        }
        else if (this.DA.length > 0 && this.DB.length > 0 && this.FA?.length !== 0 && this.FB?.length !== 0) {
            this.arr = this.convertStringToDecimalNumber(
                new Statistics([], this.frequencyA, this.dataA).coefficientOfDeviation(),
                new Statistics([], this.frequencyB, this.dataB).coefficientOfDeviation());
        } 
        SA = this.arr[0];
        SB = this.arr[1];
        return this.comparisonAndConclusion(SA, SB, 'coefficientOfDeviation');
    }

    public generateNumbers = (length: number, word?: string): number[] => {
        let data: number[] = [];
        let increase: number = 0;
        let numberX: number = 10;
        try {
            if (word === 'h'.toLowerCase() || word === 'h'.toUpperCase()) numberX = 100;
            else if (word === 't'.toLowerCase() || word === 't'.toUpperCase()) numberX = 1000;
            let random: number = Math.round(Math.random() * numberX);
            while (increase < length) {
                data[increase] = Math.round(Math.random() * random);
                increase++;
            }
        } catch (err: unknown) {
            throw err;
        }
        return data;
    }

    public generateClassInterval = (initialValue: number, distance: number, quantity?: number): number[] => {
        let topEdge: number = 0;
        let bottomEdge: number = initialValue;
        let cumulativeFrequency: number[] = [];
        let defaultNumber: number = 10;
        try {
            if (quantity) defaultNumber = quantity;
            for (let i = 0; i < defaultNumber; i++) {
                if (i === 0) topEdge += initialValue + distance;
                cumulativeFrequency.push(bottomEdge, topEdge);
                bottomEdge += distance + 1;
                topEdge += distance + 1;
            }
        } catch (err: unknown) {
            throw err;
        }
        return cumulativeFrequency;
    }
}