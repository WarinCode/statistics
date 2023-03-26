/* คู่มือการใช้งานโปรแกรมคำนวณสถิติ    (เขียนเมื่อวันที่ 7/12/2565)  */
/* อัปเดตล่าสุดรอบที่ 1: (17/3/25666) */
/*  
    * โครงสร้างของ class

        Statistics {
            xi: [],
            fi: [],
            ci: [],
            wi: [],
            cf: [ undefined ],
            classInterval: [],
            midPoint: [Function (anonymous)],
            data: [],
            sortData: [],
            frequency: [],
            cumulative: [Function (anonymous)],
            cumulativeFrequency: [ undefined ],
            n: [Function (anonymous)],
            i: NaN,
            w: [],
            subProcess: {
                x: [],
                f: [],
                cf: [ undefined ],
                xf: [Function: xf],
                w: [],
                wx: [Function: wx],
                ci: [Function: ci],
                sumX: [Function: sumX],
                sumF: [Function: sumF],
                sumXF: [Function: sumXF],
                sumW: [Function: sumW],
                sumWX: [Function: sumWX],
                sumMDX: [Function: sumMDX],
                sumMDX2: [Function: sumMDX2],
                sumMDXF: [Function: sumMDXF],
                sumSD2: [Function: sumSD2],
                sumSDX: [Function: sumSDX],
                sumFSD: [Function: sumFSD],
                sumFSD2: [Function: sumFSD2],
                sumSDXF: [Function: sumSDXF],
                meanX: [Function: meanX],
                meanXF: [Function: meanXF],
                meanWX: [Function: meanWX],
                meanMDX: [Function: meanMDX],
                meanMDXF: [Function: meanMDXF],
                meanSDX: [Function: meanSDX],
                meanSDXF: [Function: meanSDXF],
                arrayMDX: [Function: arrayMDX],
                arrayMDX2: [Function: arrayMDX2],
                arrayMDXF: [Function: arrayMDXF],
                arraySDX2: [Function: arraySDX2],
                arraySDX: [Function: arraySDX],
                arrayFSD: [Function: arrayFSD],
                arrayFSD2: [Function: arrayFSD2],
                arraySDXF: [Function: arraySDXF],
                decimalCheck: [Function: decimalCheck],
                checkForNegativeNumber: [Function: checkForNegativeNumber],
                checkForZeronumber: [Function: checkForZeronumber],
                findCumulativeFrequency: [Function: findCumulativeFrequency]
            },
            showClassInterval: [Function (anonymous)],
            showMiddle: [Function (anonymous)],
            showData: [Function (anonymous)],
            showFrequency: [Function (anonymous)],
            showNumber: [Function (anonymous)],
            showWeignt: [Function (anonymous)],
            showWidth: [Function (anonymous)],
            showTable: [Function (anonymous)],
            haveData: false,
            notHaveData: true,
            haveFrequency: false,
            notHaveFrequency: true,
            haveClassInterval: false,
            notHaveClassInterval: true,
            haveWeight: false,
            notHaveWeight: true,
            completeData: true,
            notCompleteData: false,
            haveANumber: false,
            notHaveANumber: true,
            isEven: true,
            isOdd: false,
            classIntervalIsEven: true,
            classIntervalIsOdd: false,
            dataValidation: [Function (anonymous)],
            x: false,
            mean: [Function: mean],
            median: [Function: median],
            mode: [Function: mode],
            midRange: [Function: midRange],
            range: [Function: range],
            geometricMean: [Function: geometricMean],
            harmonicMean: [Function: harmonicMean],
            Qr: [Function: Qr],
            Dr: [Function: Dr],
            Pr: [Function: Pr],
            quartileDeviation: [Function: quartileDeviation],
            meanDeviation: [Function: meanDeviation],
            standardDeviation: [Function: standardDeviation],
            variance: [Function: variance],
            coefficientOfRange: [Function: coefficientOfRange],
            coefficientOfQuartileDeviation: [Function: coefficientOfQuartileDeviation],
            coefficientOfMeanDeviation: [Function: coefficientOfMeanDeviation],
            coefficientOfDeviation: [Function: coefficientOfDeviation],
            standardScores: [Function: standardScores]
        }

*/

/*
                    หลักการใช้งาน
    - สิ่งที่ต้องติดตั้งก่อนนำมาใช้งาน 
        1.) ติดตั้ง Nodejs ลงบนเครื่องแนะนำให้ติดตั้ง version เก่า     link => nodejs.org
        2.) ติดตั้ง Git                                         link => git-scm.com/downloads
        3.) ติดตั้ง lib ของ typescript ด้วยให้เปิดโปรแกรม cmd หรือ powershell หรือเปิด texteditor แล้วเปิดที่ terminal
        พิมพ์คำสั่งติดตั้งคือ npm install -g typescript 
        4.) clone repository 
        หากติดตั้งแบบ git ให้เปิด cmd หรือ terminal ขึ้นมา
        พิมพ์คำสั่ง:  git clone https://github.com/VarinCode/statistics.git
        5.) เข้าโฟลเดอร์ที่ดาวโหลดมาจากนั้นสร้าง file ชื่ออะไรก็ได้แต่นามสกุลไฟล์ต้องเป็น .ts

    - หลังติดตั้งเรียบร้อยเเล้ว
        6.) เราสามารถ Compile ไฟล์ Typescript ให้เป็น Javascript ด้วยคำสั่ง
        typescript main.ts 
        จะได้ไฟล์ใหม่ขึ้นมาคือ main.js 
        7.) การเรียกใช้งานหลังจากสร้างไฟล์เรียบร้อยแล้ว พิมพ์คำสั่ง
            import Statistics from "../main";
            จากนั้นเราสามารถสร้างตัวแปรมาเก็บ class ที่ import มาจากไฟล์ module หลักได้
            const S = new new Statistics(); 
            หรือถ้าหากไม่ต้องการเก็บไว้ในตัวแปรก็สามารถใช้ class ดั่งเดิมได้ new Statistics();


                        !!! คำเตือนก่อนใช้งาน
        !ห้ามแก้ไข code ที่เป็นส่วนของ module หลัก main.ts เพราะเป็นส่วนสำคัญในการคำนวณเลขทั้งหมด               
        !ถ้าหากใส่ข้อมูลไม่ครบโปรแกรมจะไม่ทำงาน ถ้าหากใส่ความถี่ไม่เท่ากับจำนวนของข้อมูลจะไม่ทำงาน
        !หากต้องการใส่แค่ค่าบางอย่างค่าที่ไม่ต้องการใส่ให้ใส่เป็น array เปล่า [] เท่านั้น
        !การใส่อันตรภาคชั้นและข้อมูลนั้นให้เลือกใส่อย่างใดอย่างหนึ่งไม่งั้นโปรแกรมอาจทำงานผิดพลาด
        !การใช้งานทุกครั้งจะต้องสร้างไฟล์ใหม่เสมอด้วยภาษา Typescript หรือ Javascript ถ้าหากสร้างด้วย javascript ต้อง compile ไฟล์ typescript ก่อน ไฟล์ main.ts
        !จำนวนข้อมูลและความถึ่ใน array จะต้องเท่ากันโปรแกรมจึงจะทำงาน
        !หากใส่ข้อมูลที่ไม่ใช้ตัวเลขโปรแกรมจะไม่สามารถทำงานได้
    ฟีเจอร์ที่ไม่มีคือ การค่าเฉลี่ยเลขคณิตรวม และ ความแปรปรวนรวม
    เนื่องจากโปรแกรมที่เขียนนั้นรับค่าข้อมูล(X)ได้แค่ชุดเดียวไม่สามารถรับหลายค่าได้ในคราวเดียวกันได้

    - การใช้งาน
            8.) นำตัวเลขข้อมูลที่ต้องการหาค่าทางสถติใส่ไว้ใน array เครื่องหมาย [] 
                ตัวอย่าง [1 , 2 , 3 , 4 , 5 , ....]  [2 , 3 , 7 , 1 , 9]  [-4 , -1 ,-3.43 , 9.3]
            9.)นำมันมาไปใส่ใน object new Statistics(); ข้างในวงเล็บ() 
            ช่องในวงเล็บเราจะใส่ข้อมูลเป็น array ลงไปโดยจะอธิบายการใส่ข้อมูลในแต่ละช่องได้ว่า
                new Statistics( [ช่องที่ 1] , [ช่องที่ 2] , [ช่องที่ 3] , [ช่องที่ 4] )
            ช่องที่ 1 คือ ข้อมูล (x)
            ช่องที่ 2 คือ ความถี่ (f)
            ช่องที่ 3 คือ อันตรภาคชั้น (c)
            ช่องที่ 4 คือ ค่าถ่วงน้ำหนัก หน่วยกิต เกรตเฉลี่ย (w)
            ช่องที่ 5 คือ ความถี่สะสม (cf) ไม่ต้องใส่ข้อมูลในช่องนี้แค่ใส่ในช่องความถี่มามันจะหาให้อัติโนมัติ
                ตัวอย่าง 
                new new Statistics()istics([1,2,3,4,5,6])                                           กรณีใส่ข้อมูล(x) อย่างเดียว
                new new Statistics()istics([1,2,3,4,5,6] , [9,3,4,2,5,8])                           กรณีใส่ข้อมูล(x) และ ความถี่(f)
                new new Statistics()istics([] , [9,3,4,2,5,8] , [10,14,15,19,20,24,25,29])          กรณีใส่ความถี่(f) และอันตรภาคชั้น(c)
                new new Statistics()istics([2,8,16] , [] , [] ,[12,67,6])                           กรณีใส่ค่าหน่วยกิต(w) และ ข้อมูล(x)
            10.) ใช้งานโดยการพิมพ์จุดข้างหลังวงเล็บ new Statistics().  ตามด้วยสิ่งที่ต้องการหาในสถิติ
                 เช่นต้องการหา ค่าเฉลี่ยเลขคณิต      new Statistics(...).mean();
                 หามัธยฐาน                      new Statistics(...).median(....);
                 หาฐานนิยม                      new Statistics(...).mode(....);
            11.) แสดงผลลัพธ์ข้อมูลที่ได้ผ่านใน termianl คำสั่ง: console.log(....);
  
                                                                            - ผู้เขียนคู่มือนี้ วรินทร์ 
*/
        const number:number = 0;
        const string:string = '';

        /* รวมคำสั่งการใช้งานสถิติทั้งหมด */
        /* คำสั่งทั้งหมดนี้จะหาทั้ง 2 รูปแบบคือ { แบบแจกแจงความถี่ } และ { แบบไม่แจกแจงความถึ่ } จะหาแบบไหนขึ้นอยู่กับการใส่ข้อมูลลงไปและใส่ให้ถูกต้อง */
        /* การเรียกใช้ methods บางชนิดจะต้องมีการใส่ข้อมูลเพิ่มลงไปใน methods นั้น ในส่วนนี้จะมีการอธิบายเพิ่ม  */

            import Statistics from "../main";                     // เรียกใช้งาน module  
            const Stat: Statistics = new Statistics();            // สร้าง instance

                Stat.data;                                        /* ข้อมูล (x) */
                Stat.sortData;                                    /* เรียงข้อมูลจากน้อยไปมาก (x) */
                Stat.n();                                         /* จำนวนข้อมูลทั้งหมด (n) */
                Stat.classInterval;                               /* อันตรภาคชั้น */
                Stat.midPoint();                                  /* จุดกึ่งกลางชั้น */
                Stat.frequency;                                   /* ความถี่ (f) */
                Stat.cumulativeFrequency;                         /* ความถี่สะสม (cf) */
                Stat.i;                                           /* ความกว้างอันตรภาคช้น (i) */
                Stat.w;                                           /* ค่าถ่วงน้ำหนัก (w) */
                Stat.mean();                                      /* หาค่าเฉลี่ยเลขคณิต */
                Stat.median();                                    /* หาค่ามัธยฐาน */
                Stat.mode();                                      /* หาฐานนิยม */
                Stat.midRange();                                  /* หาค่ากึ่งกลางพิสัย */
                Stat.range();                                     /* หาค่าพิสัย */
                        /* 
                                  * การใช้งาน ควอร์ไทล์ เดไซล์ และ เปอร์เซนต์ไทล์
                            - การใช้งาน Qr Dr และ Pr จะต้องกำหนดเลขเข้าไปใน methods class เพื่อเป็นการส่ง argument 
                            ให้ค่า r ซึ่งเป็น parameter ตัวแรกของ methods นั้นรับค่าไปใช้ในการคำนวณต่อ
                            - เช่น   
                                    new Statistics([ข้อมูล]).Qr(ตัวเลข);   เลข 1 ถึง 4
                                    new Statistics([ข้อมูล]).Dr(ตัวเลข);   เลข 1 ถึง 10
                                    new Statistics([ข้อมูล]).Pr(ตัวเลข);   เลข 1 ถึง 100
                            ! เตือน
                            สิ่งที่ไม่สามารถใส่ได้คือ ข้อมูลที่เป็นชนิดข้อความ '' , "" จะไม่สามารถใช้ได้
                            ข้อมูลที่เป็นชนิดตัวเลขที่ติดลบ และ ทศนิยมก็ไม่สามารถนำไปใช้ได้ 
                        */
                Stat.Qr(number);                                  /* หาค่าควอร์ไทล์ */
                Stat.Dr(number);                                  /* หาค่าเดไซล์ */
                Stat.Pr(number);                                  /* หาค่าเปอร์เซนต์ไทล์ */
                Stat.harmonicMean();                              /* หาค่าเฉลี่ยฮาร์โมนิค */
                Stat.geometricMean();                             /* หาค่าเฉลี่ยเรขาคณิต */
                Stat.quartileDeviation();                         /* หาส่วนเบี่ยงเบนควอร์ไทล์ */
                Stat.meanDeviation();                             /* หาส่วนเบี่ยงเบนเฉลี่ย */
                Stat.standardDeviation();                         /* หาส่วนเบี่ยงเบนเฉลี่ยมาตราฐาน */
                Stat.variance();                                  /* หาค่าความแปรปรวนข้อมูล */
                Stat.coefficientOfRange();                        /* หาสัมประสิทธิ์ของพิสัย */
                Stat.coefficientOfQuartileDeviation();            /* หาสัมประสิทธิ์องส่วนเบี่ยงเบนควอร์ไทล์ */
                Stat.coefficientOfMeanDeviation();                /* หาสัมประสิทธิ์ของส่วนเบี่ยงเบนเฉลี่ย */
                Stat.coefficientOfDeviation();                    /* หาสัมประสิทธิ์ของการแปรผัน */
                    /* 
                                  * การใช้งานค่ามาตราฐาน
                        new Statistics([ข้อมูล]).standardScores(คะแนน , รายชื่อ);
                                                       ช่องที่ 1 , ช่องที่ 2
                        - ช่องที่ 1 คะแนน สามารถใส่ได้ 3 รูปแบบคือ 
                            1.) ตัวเลขธรรมดา เลขติดลบ หรือ ทศนิยม 
                            เช่น 2 , 95 , 7.41 , -5 , -34.893
                            2.) ตัวเลขแบบเป็นกลุ่ม array 
                            เช่น [1,4,6]  [9,74,-2315]
                            3.) ตัวเลขแบบในกลุ่ม array และ ใส่คู่กับรายชื่อ 
                                !โดยที่ชื่อจะต้องเท่ากับจำนวนตัวเลขในกลุ่ม array
                        - ช่องที่ 2 รายชื่อ จะต้องเป็นข้อความอยู่ในเครื่องหมาย []
                            เช่น ['นาย a' , 'นาย b' , 'นาย c']
                    */
                Stat.standardScores(number);                     /* หาค่ามาตราฐาน */
                    /* 
                                คำสั่งที่ขึ้นต้นคำว่า show ไม่ต้องใช้ console.log() เพราะแสดงออกมาผ่าน console ให้เลย
                    */
                Stat.showData();                                 /* แสดงผลข้อมูลทั้งหมด */
                Stat.showNumber();                               /* แสดงจำนวนข้อมูล */
                Stat.showClassInterval();                        /* แสดงอันตรภาคชั้น */
                Stat.showMiddle();                               /* แสดงจุดกึ่งกลางอันตรภาคชั้น */
                Stat.showFrequency();                            /* แสดงความถี่ทั้งหมด */
                Stat.showWidth();                                /* แสดงความกว้างของอันตรภาคชั้น */
                Stat.showWeignt();                               /* แสดงค่าถ่วงน้ำหนัก */
                    /*
                                * การใช้งานตาราง
                    new Statistics([ข้อมูล]).showTable('รหัส');
                    รหัส ในทีนี้คือ ชนิดของตารางที่จะแสดงลข้อมูลตามสิ่งที่ต้องการข้องู้ใช้งาน
                    โดย รหัส จะมีอยู่ด้วยกัน 6 คำ คือ t1 , t2 , t3 , t4 , t5 , t6 
                                * รหัสชนิดของตารางที่จะแสดงผลตามดังนี้
                - t1 แสดง -> ข้อมูล , ความถี่ , ข้อมูล x ความถี่ 
                - t2 แสดง -> ข้อมูล , ความถี่ , ความถึ่สะสม , ข้อมูล x ความถี่ 
                - t3 แสดง -> อันตรภาคชั้น , จุดกึ่งกลางชั้น , ความถี่ , ความถี่สะสม , ข้อมูล x ความถี่ 
                - t4 แสดง -> ข้อมูล , ค่าหน่วยกิต , ค่าหน่วยกิต x ข้อมูล
                - t5 แสดง -> อันตรภาคชั้น , จุดกึ่งกลางชั้น , ข้อมูล , ความถี่ , ข้อมูล x ความถี่ , ส่วนเบี่ยงเบนเฉลี่ย
                - t6 แสดง -> อันตรภาคชั้น , จุดกึ่งกลางชั้น , ข้อมูล , ความถี่ , ข้อมูล x ความถี่ , ส่วนเบี่ยงมาตราฐาน     
                                * การแสดงตารางข้อมูลในสิ่งที่ผู้ใช้ต้องการจะต้องให้ข้อมูลที่จำเป็นในการแสดงผลของตาราง
                    สิ่งที่ผู้ใช้ต้องใส่ข้อมูลที่จำเป็นก่อน ระบุรหัสตาราง
                                * ข้อมูลที่ต้องระบุ
                - t1 ต้องมี ข้อมูล กับ ความถี่                        new Statistics([1,2,...],[1,2,...]).showTable('t1');
                - t2 ต้องมี ข้อมูล กับ ความถี่                        new Statistics([1,2,...],[1,2,...]).showTable('t2');
                - t3 ต้องมี อันตรภาคชั้น กับ ความถี่                   new Statistics([],[1,2],[1,2,3,4]).showTable('t3');
                - t4 ต้องมี ข้อมูล กับ ค่าหน่วยกิต                     new Statistics([1,2,...],[],[],[1,2,...]).showTable('t4');
                - t5 ต้องมี อันตราภาคชั้น หรือ ข้อมูล และต้องมี ความถี่    new Statistics([1,2],[1,2],[1,2,3,4]).showTable('t5'); 
                - t6 ต้องมี อันตราภาคชั้น หรือ ข้อมูล และต้องมี ความถี่    new Statistics([1,2],[1,2],[1,2,3,4]).showTable('t6');
                               * คำแนะนำ
                    การใส่ข้อมูลแต่ละชนิด จะต้องมีจำนวนที่เท่ากันเสมอ
                    อันตรภาคจะมีจำนวนข้อมูลที่เยอะกว่าข้อมูลชนิดอื่นๆ
                    ไม่สารถใส่ ข้อมูล และ อันตรภาคชั้นพร้อมกันได้ ให้เลือกใส่ตัวใดตัวหนึ่ง
                    */
                Stat.showTable(string);                         /* แสดงตารางข้อมูล */

        /* คำสั่งเสริมที่เป็นส่วนหนึ่งของ สถิติ แต่ถูกแยกออกมา */
        /* เป็นส่วนเสริมที่ช่วยเหลือลดปัญหาเรื่องบางเรื่อง  */
                            /*
                                            * การใส่ข้อมูลใน class
                                    new Extension( [ช่องที่ 1] , [ช่องที่ 2] )
                                ช่องที่ 1 คือ ข้อมูลชุดที่ 1 (x)
                                ช่องที่ 2 คือ ข้อมูลชุดที่ 2 (x)
                                จะใส่หรือม่ใส่ก็ได้แต่ถ้าใส่แล้วต้องใส่ข้อมูล จำนวน 2 ชุด และ จำนวนต้องเท่ากัน
                            */
                import Extension from '../plugin/extensions'                     // เรียกใช้งาน module
                const e: Extension = new Extension();                            // สร้าง instance

                    /* 
                                    * การใช้งานสร้างตัวเลข
                        new Extension().generateNumbers(ความยาว , คำ);
                        ความยาว คือ ตัวเลขจำนวนสมาชิกใน array 
                        เช่น ความยาว = 5           เลขที่สร้างจะสุ่มได้ ->  [ 6, 7, 3, 7, 0 ]
                        ความยาว = 12              เลขที่สร้างจะสุ่มได้ ->  [ 0, 2, 2, 3, 2, 1, 0, 3, 2, 1, 0, 2 ]
                        คำ คือ การสุ่มเลขในแต่ละหลัก โดยคำที่ระบุมี 2 คำได้แก่ 'h' กับ 't'
                        - h คือการสร้างตัวเลขแบบสุ่มในหลักร้อย         ในช่วงตั้งแต่ 1 ถึง 100
                        - t คือการสุ่มสร้างตัวเลขแบบสุ่มในหลักพัน       ในช่วงตั้งแต่ 1 ถึง 1000
                        จะระบุหรือไม่ระบุก็ได้ โดยที่ค่าเนิ่มต้นในการสุ่ม จะอยู่ที่หลักสิบ 1 ถึง 10
                    */
                e.generateNumbers(number,string);                 /* สร้างตัวเลขแบบสุ่มๆ*/
                    /* 
                                    * การใช้งานสร้างตัวเลขของอันตรภาคชั้น
                        new Extension().generateClassInterval(ตัวเลขที่ 1 , ตัวเลขที่ 2 , ตัวเลขที่ 3)
                        ตัวเลขที่ 1 คือ ค่าเริ่มต้นของ ขอบล่าง
                        ตัวเลขที่ 2 คือ ระยะห่างของ ขอบล่าง กับ ขอบบน 
                        ตัวเลขที่ 3 คือ ความยาวในการสร้าง อันตรภาคชั้น
                    ต้องมีการระบุตัวเลขที่ 1 กับ ตัวเลขที่ 2 ส่วนตัวเลขที่ 3 จะใส่รือม่ใส่ก็ได้
                    ยกตัวอย่าง 
                    new Extension().generateClassInterval(1,4,6)     เลขที่สร้างได้ -> [ 1,  5,  6, 10, 11, 15, 16, 20, 21, 25, 26, 30 ]
                    */
                e.generateClassInterval(number,number,number)    /* สร้างตัวเลขที่เป็นอันตรภาคชั้น */
                    /* 
                                    * การใช้งานการเปรียบเทียบสัมประสิทธิ์ของข้อมูล 2 ชนิด
                        new Extension([ข้อมูลชุดที่ 1] , [ข้อมูลชุดที่ 2] , [ความถี่ของข้อมูลชุดที่ 1] , [ความถี่ของข้อมูลชุดที่ 2]).compareTheCoefficientOfRange();
                        new Extension([ข้อมูลชุดที่ 1] , [ข้อมูลชุดที่ 2], [ความถี่ของข้อมูลชุดที่ 1] , [ความถี่ของข้อมูลชุดที่ 2]).compareTheCoefficientOfQuartileDeviation();
                        new Extension([ข้อมูลชุดที่ 1] , [ข้อมูลชุดที่ 2], [ความถี่ของข้อมูลชุดที่ 1] , [ความถี่ของข้อมูลชุดที่ 2]).compareTheCoefficientOfMeanDeviation();
                        new Extension([ข้อมูลชุดที่ 1] , [ข้อมูลชุดที่ 2], [ความถี่ของข้อมูลชุดที่ 1] , [ความถี่ของข้อมูลชุดที่ 2]).compareTheCoefficientOfDeviation();
                    
                    - ต้องระบุข้อมูลชุดที่ 1 และ ชุดที่ 2 ทุกครั้ง ถ้าไม่อยากใส่ให้ใช้ new Extension([],[]) ได้                    
                    - ข้อมูลชุดที่ 1 และ ข้อมูลชุดที่ 2 จะต้องมีจำนวนที่เท่ากัน 
                    - ความถี่จะใส่หรือไม่ใส่ก็ได้แต่ถ้าใส่ข้อมูลทั้ง 2 ชุดต้องมีจำนวนเท่ากันและจำนวนของข้อมูล
                    - การเปรียบเทียบข้อมูลจะเปรียบเทียบแบบไม่แจกแจงความถี่เท่านั้น แต่ สัมประสิทธิ์พิสัย สามารถ หาได้ทั้ง แจกแจง และ ไม่แจกแจง
                    */
                e.compareTheCoefficientOfRange();                /* การเปรียบเทียบสัมประสิทธิ์ของพิสัย */   
                e.compareTheCoefficientOfQuartileDeviation();    /* การเปรียบเทียบสัมประสิทธิ์องส่วนเบี่ยงเบนควอร์ไทล์ */
                e.compareTheCoefficientOfMeanDeviation();        /* การเปรียบเทียบสัมประสิทธิ์ของส่วนเบี่ยงเบนเฉลี่ย */
                e.compareTheCoefficientOfDeviation();            /* การเปรียบเทียบสัมประสิทธิ์ของการแปรผัน */