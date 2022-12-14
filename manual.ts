/* คู่มือการใช้งานโปรแกรมคำนวณสถิติ    (เขียนเมื่อวันที่ 7/12/2565)  */
import { Stat } from "./main"; // เรียกใช้งาน module 
import { Statistics } from "./main"; 
console.log(Stat);

/*  
    - โครงสร้างของ class

        Statistics {
            classinterval: [],
            mid_point: [Function (anonymous)],
            data: [],
            sortdata: [],
            frequency: [],
            cumulative: [Function (anonymous)],
            cumulative_frequency: [ undefined ],
            n: [Function (anonymous)],
            I: NaN,
            W: [],
            Showclassinterval: [Function (anonymous)],
            Showmiddle: [Function (anonymous)],
            Showdata: [Function (anonymous)],
            Showfrequency: [Function (anonymous)],
            Shownumber: [Function (anonymous)],
            Showweignt: [Function (anonymous)],
            ShowI: [Function (anonymous)],
            Mean: [Function: Mean],
            Median: [Function: Median],
            Mode: [Function: Mode],
            Mid_range: [Function: Mid_range],
            Range: [Function: Range],
            Geometric_mean: [Function: Geometric_mean],
            Harmonic_mean: [Function: Harmonic_mean],
            Qr: [Function: Qr],
            Dr: [Function: Dr],
            Pr: [Function: Pr],
            Quartile_deviation: [Function: Quartile_deviation],
            Mean_deviation: [Function: Mean_deviation],
            Standard_deviation: [Function: Standard_deviation],
            Variance: [Function: Variance],
            Coefficient_of_range: [Function: Coefficient_of_range],
            Coefficient_of_quartile_deviation: [Function: Coefficient_of_quartile_deviation],
            Coefficient_of_mean_deviation: [Function: Coefficient_of_mean_deviation],
            Coefficient_of_deviation: [Function: Coefficient_of_deviation]
    }

*/

/*
                    หลักการใช้งาน
    - สิ่งที่ต้องติดตั้งก่อนนำมาใช้งาน 
        1.) ติดตั้ง Nodejs ลงบนเครื่องแนะนำให้ติดตั้ง version เก่า     link => nodejs.org
        2.) ติดตั้ง Git                                         link => git-scm.com/downloads
        3.) ติดตั้ง lib ของ typescript ด้วยให้เปิดโปรแกรม cmd หรือ powershell หรือเปิด texteditor แล้วเปิดที่ terminal
        พิมพ์คำสั่งติดตั้งคือ npm i -g typescript 
        4.) clone repository เพื่อนำมา หรือ Dowload แบบ Zipfile ในหน้า github
        หากติดตั้งแบบ git ให้เปิด cmd หรือ terminal ขึ้นมา
        พิมพ์คำสั่ง:  git clone https://github.com/VarinCode/statistics.git
        5.) เข้าโฟลเดอร์ที่ดาวโหลด์มาจากนั้นสร้าง file ชื่ออะไรก็ได้แต่นามสกุลไฟล์ต้องเป็น .ts หรือ .js
        ถ้าเป็น .js จะต้อง compile ไฟล์ Typescript ก่อนนำไปใช้งาน

    - หลังติดตั้งเรียบร้อยเเล้ว
        6.) เราสามารถ Compile ไฟล์ Typescript ให้เป็น Javascript ด้วยคำสั่ง
        typescript main.ts 
        จะได้ไฟล์ใหม่ขึ้นมาคือ main.js // จะเขียนในรูปแบบ js หรือ ts ก็ได้
        7.) การเรียกใช้งานหลังจากสร้างไฟล์เรียบร้อยแล้ว พิมพ์คำสั่ง

            import { Statistics , Stat } from "./main";
            จากนั้นเราสามารถสร้างตัวแปรมาเก็บ object ที่ import มาจากไฟล์ module หลักได้
            const S = new Statistics(); แนะนำให้ใช้ const แทน let และ var

            หรือถ้าหากไม่ต้องการเก็บไว้ในตัวแปรก็สามารถใช้ object ดั่งเดิมได้
            new Statistics();


                        !!! คำเตือนก่อนใช้งาน
        !ห้ามแก้ไข code ที่เป็นส่วนของ module หลัก main.ts และ apply.ts เพราะเป็นส่วนสำคัญในการคำนวณเลขทั้งหมด               
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
            9.)นำมันมาไปใส่ใน Object new Statistics(); ข้างในวงเล็บ() 
            ช่องในวงเล็บเราจะใส่ข้อมูลเป็น array ลงไปโดยจะอธิบายการใส่ข้อมูลในแต่ละช่องได้ว่า
            new Statistics( [arrayช่องที่1] , [arrayช่องที่2] , [arrayช่องที่3] , [arrayช่องที่4] )
            ช่อง1 คือ ข้อมูล ( x )
            ช่อง2 คือ ความถี่ ( f )
            ช่อง3 คือ อันตรภาคชั้น ( c )
            ช่อง4 คือ ค่าถ่วงน้ำหนัก หน่วยกิต เกรตเฉลี่ย ( w )
            ช่อง5 คือ ความถี่สะสม ( cf ) ไม่ต้องใส่ข้อมูลในช่องนี้แค่ใส่ในช่องความถี่มามันจะหาให้อัติโนมัติ
                ตัวอย่าง 
                new Statistics([1,2,3,4,5,6]) กรณีใส่ข้อมูล(x) อย่างเดียว
                new Statistics([1,2,3,4,5,6] , [9,3,4,2,5,8]) กรณีใส่ข้อมูล(x) และ ความถี่(f)
                new Statistics([] , [9,3,4,2,5,8] , [10,14,15,19,20,24,25,29]) กรณีใส่ความถี่(f) และอันตรภาคชั้น(c)
                new Statistics([2,8,16] , [] , [] ,[12,67,6]) กรณีใส่ค่าหน่วยกิต(w) และ ข้อมูล(x)
            10.) ใช้งานโดยการ พิมพ์จุดข้างหลังวงเล็บ new Statistics().  ตามด้วยสิ่งที่ต้องการหากรณีใช้ Texteditor เป็น Visual Studio Code 
                 เช่นต้องการหาค่าเฉลี่ย new Statistics(....).Mean();
                 หามัธยฐาน new Statistics.Median(....);
                 หาฐานนิยม new Statistics.Mode(....);
            11.) แสดงผลลัพธ์ข้อมูลที่ได้ผ่านใน termianl คำสั่ง: console.log(....)
  
                                                                        - ผู้เขียนคู่มือนี้ วรินทร์ 
*/

/* รวมคำสั่งการใช้งานสถิติทั้งหมด */
/* คำสั่งทั้งหมดนี้จะหาทั้ง 2 รูปแบบคือ { แบบแจกแจงความถี่ } และ { แบบไม่แจกแจงความถึ่ } จะหาแบบไหนขึ้นอยู่กับการใส่ข้อมูลลงไปและใส่ให้ถูกต้อง */
new Statistics(); /* new Statistics() และ Stat คือตัวเดียวกันแต่ Stat จะไม่สามารถส่งข้อมูลไปคำนวณได้เพราะเป็๋น instance ของ class เป็นเพียงการยกตัวอย่างกลุ่มคำสั่งเท่านั้น */
Stat.data;                                  /* ข้อมูล (x) */
Stat.sortdata;                              /* เรียงข้อมูลจากน้อยไปมาก (x) */
Stat.n();                                   /* จำนวนข้อมูลทั้งหมด (n) */
Stat.classinterval;                         /* อันตรภาคชั้น */
Stat.mid_point();                           /* จุดกึ่งกลางชั้น */
Stat.frequency;                             /* ความถี่ (f) */
Stat.cumulative();                          /* ความถี่สะสม (cf) */
Stat.cumulative_frequency;                  /* ความถี่สะสม (cf) */
Stat.I;                                     /* ความกว้างอันตรภาคช้น (i) */
Stat.W;                                     /* ค่าถ่วงน้ำหนัก (w) */
Stat.Mean();                                /* หาค่าเฉลี่ยเลขคณิต */
Stat.Median();                              /* หาค่ามัธยฐาน */
Stat.Mode();                                /* หาฐานนิยม */
Stat.Mid_range();                           /* หาค่ากึ่งกลางพิสัย */
Stat.Range();                               /* หาค่าพิสัย */
    /* 
        - การใช้งาน Qr Dr และ Pr จะต้องกำหนดเลขเข้าไปใน method class เพื่อเป็นการส่ง argument 
          ให้ค่า r ซึ่งเป็น parameter ตัวแรกของ method 
        - เช่น   
                Stat.Qr(4);   เลข 1 ถึง 4
                Stat.Dr(10);  เลข 1 ถึง 10
                Stat.Pr(100); เลข 1 ถึง 100
    */
Stat.Qr();                                  /* หาค่าควอร์ไทล์ */
Stat.Dr();                                  /* หาค่าเดไซล์ */
Stat.Pr();                                  /* หาค่าเปอร์เซนต์ไทล์ */
Stat.Harmonic_mean();                       /* หาค่าเฉลี่ยฮาร์โมนิค */
Stat.Geometric_mean();                      /* หาค่าเฉลี่ยเรขาคณิต */
Stat.Quartile_deviation();                  /* หาส่วนเบี่ยงเบนควอร์ไทล์ */
Stat.Mean_deviation();                      /* หาส่วนเบี่ยงเบนเฉลี่ย */
Stat.Standard_deviation();                  /* หาส่วนเบี่ยงเบนเฉลี่ยมาตราฐาน */
Stat.Variance();                            /* หาค่าความแปรปรวนข้อมูล */
Stat.Coefficient_of_range();                /* หาสัมประสิทธิ์ของพิสัย */
Stat.Coefficient_of_quartile_deviation();   /* หาสัมประสิทธิ์องส่วนเบี่ยงเบนควอร์ไทล์ */
Stat.Coefficient_of_mean_deviation();       /* หาสัมประสิทธิ์ของส่วนเบี่ยงเบนเฉลี่ย */
Stat.Coefficient_of_deviation();            /* หาสัมประสิทธิ์ของการแปรผัน */
Stat.Showdata();                            /* แสดงผลข้อมูลทั้งหมด */
Stat.Shownumber();                          /* แสดงจำนวนข้อมูล */
Stat.Showclassinterval();                   /* แสดงอันตรภาคชั้น */
Stat.Showmiddle();                          /* แสดงจุดกึ่งกลางอันตรภาคชั้น */
Stat.Showfrequency();                       /* แสดงความถี่ทั้งหมด */
Stat.ShowI();                               /* แสดงความกว้างของอันตรภาคชั้น */
Stat.Showweignt();                          /* แสดงค่าถ่วงน้ำหนัก */
