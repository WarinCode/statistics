# สถิติ
<header ><u><h2 align="center">การหาค่าทางสถิติหาได้ทั้ง 2 แบบคือ แบบแจกแจงความถี่ และ แบบไม่แจกแจงความถี่</h2></u></header>

> โปรแกรมนั้นยังต้องมีการแก้ไข code ในบางส่วนยังคงมีบัคมี error อยู่บ้างถ้าหากใส่ข้อมูลไปแล้ว รัน code ได้คำตอบเป็น undefined หรือ NaN ก็แปลว่ายังไม่ได้แก้ไข error ในส่วนตรงนั้น


### ติดตั้งโปรเจค
เปิด Terminal พิมพ์คำสั่งตามนี้
- <code> git clone https://github.com/VarinCode/statistics.git</code> <br/>
- <code> cd statistics</code><br/>
- <code> code. </code>


### นำไปใช้งาน 

```javascript
import { Statistics } from "./main"; /* เหมาะกับการใช้งานทั่วไปทศนิยมจะปัด 2 , 3 ตำแหน่ง */
import { my_stats } from "./apply"; /* เหมาะกับการหาค่าที่แท้จริงค่าจริงๆทศนิยมจะไม่ปัด */

/* การใส่ข้อมูล */
/* 
new Statistics( [arrayช่องที่1] , [arrayช่องที่2] , [arrayช่องที่3] , [arrayช่องที่4] );
     - ช่อง 1 คือ ข้อมูล ( x )
     - ช่อง 2 คือ ความถี่ ( f )
     - ช่อง 3 คือ อันตรภาคชั้น ( class-interval )
     - ช่อง 4 คือ ค่าถ่วงน้ำหนัก หน่วยกิต เกรตเฉลี่ย ( w )
     - ช่อง 5 คือ ความถี่สะสม ( cf ) ไม่ต้องใส่ข้อมูลในช่องนี้แค่ใส่ในช่องความถี่มามันจะหาให้อัติโนมัติ
*/

```

### ตัวอย่างการใช้งานโปรแกรม

```javascript
import { Statistics } from "./main";
/* ดูตัวอย่างการใช้งานเพิ่มเติมได้ที่ไฟล์ example.ts */

/* ตัวอย่างที่ 1 */
let EX1 = new my_stats([8,9,5,7,11,10,12,9,10]);
console.log(EX1.Mean()); // หาค่าเฉลี่เลขคณิต
// output: 9
console.log(EX1.Median()); // หาค่ามัธยฐาน
// output: 9
console.log(EX1.Mode()); // หาค่าฐานนิยม
// output: 9 , 10


/* ตัวอย่างที่ 2 */
let array = [24,27,31,22,19,21].map((i) => i + 4)
let EX2 = new Statistics(array);
console.log(EX2.Mean());
// output: ค่าเฉลี่ยเลขคณิต x̄ = 28.00


/* ตัวอย่างที่ 3 */
let EX3_1 = new Statistics([11,15,22,36,11,18,22,22,16,28]);
let EX3_2 = new Statistics([156,152,157,150,155,159]);
console.log(EX3_1.Showdata());
// output: ข้อมูลเดิมคือ 11 15 22 36 11 18 22 22 16 28
//         เรียงข้อมูลชุดใหม่ได้ 11 11 15 16 18 22 22 22 28 36
console.log(EX3_2.Median());
// output: ตำแหน่งมัธยฐาน = 18 ระหว่าง 22
//         มัธยฐาน Me = 20.00


/* ตัวอย่างที่ 4 */
let Mode = [10,30,20,10,40,30,10,20,10,30]
let new_Mode = [];
let count = 0;
while(Mode.length > count){
    new_Mode.push((Mode[count] / 10) + 6);
    count++;
}
let EX4 =  new Statistics(new_Mode);
console.log(EX4.Mode());
// output: ฐานนิยม Mo = 7


/* ตัวอย่างที่ 5 */
let Ex5_data_A = [75,72,71,73,74,76];
let Ex5_data_B = [112,115,118,116,117,110];
const conclusion = (A , B):void => {
        console.log('ข้อมูลชุด A มี ' + new Statistics(A).Coefficient_of_range());
        console.log('ข้อมูลชุด B มี ' + new Statistics(B).Coefficient_of_range());    
    const analyze_data:{ a:number , b:number } =  {
        a:new my_stats(A).Coefficient_of_range(),
        b:new my_stats(B).Coefficient_of_range(),
    }
    if(analyze_data.a > analyze_data.b){
        console.log(`ข้อมูล A มีการกระจายมากกว่าข้อมูล B`);
    } else if(analyze_data.a < analyze_data.b){
        console.log(`ข้อมูล B มีการกระจายมากกว่าข้อมูล A`);
    }
}
conclusion(Ex5_data_A , Ex5_data_B);
// output: ข้อมูลชุด A มี สัมประสิทธิ์ของพิสัย C.R = 0.034
//         ข้อมูลชุด B มี สัมประสิทธิ์ของพิสัย C.R = 0.035
//         ข้อมูล B มีการกระจายมากกว่าข้อมูล A
```

### คำสั่งทั้งหมด

```javascript
import { Statistics as Stat } from "./main";
/* อ่านการใช้งานเบื้องต้นที่ไฟล์ manual.ts */

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
```


