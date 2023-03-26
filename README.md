# สถิติ

<header><u><h2 align="center">การหาค่าทางสถิติหาได้ทั้ง 2 แบบคือ แบบแจกแจงความถี่ และ แบบไม่แจกแจงความถี่</h2></u></header>

> โปรแกรมนี้ไม่ลองรับข้อมูลขนาดใหญ่ข้อมูลที่มีจำนวนมากได้ และข้อมูลที่ไม่แน่นอน โปรดคัดกรองข้อมูลก่อนนำไปเขียนสคริปต์เพื่อคำนวณ

### ติดตั้งโปรเจค

เปิด Terminal พิมพ์คำสั่งตามนี้

- `<code>` git clone [https://github.com/VarinCode/statistics.git](https://github.com/VarinCode/statistics.git) `</code><br/>`
- `<code>` cd statistics `</code><br/>`
- `<code>` code. `</code>`

### อธิบายการใส่ข้อมูล

```javascript
import Statistics from "../main"; // เรียกใช้ module

/* การใส่ข้อมูล */
/*
ให้ใส่ข้อมูลลงในเครื่องหมาย [] หรือ เก็บไว้ในรูปของตัวแปร
new Statistics( [arrayช่องที่1] , [arrayช่องที่2] , [arrayช่องที่3] , [arrayช่องที่4] );
     - ช่อง 1 คือ ข้อมูล (x)
     - ช่อง 2 คือ ความถี่ (f)
     - ช่อง 3 คือ อันตรภาคชั้น (class-interval)
     - ช่อง 4 คือ ค่าถ่วงน้ำหนัก หน่วยกิต เกรตเฉลี่ย (w)
     - ช่อง 5 คือ ความถี่สะสม (cf) ไม่ต้องใส่ข้อมูลในช่องนี้แค่ใส่ในช่องความถี่มามันจะหาให้อัติโนมัติ
*/
```

### นำไปใช้งาน

1. ติดตั้งโปรเจคเสร็จเรียบร้อยแล้วสามารถทดลองใช้งานได้ที่ไฟล์ test.ts
2. import module เข้ามาในไฟล์
3. เขียนคำสั่งและใส่ข้อมูลครบถูกต้อง
4. เรียกใช้ methods ที่ต้องการในสถิติจาก class Statistics
5. แสดงผลข้อมูลที่ได้ผ่าน console.log();

### ตัวอย่างการใช้งานโปรแกรม

```typescript
import Statistics from "../main";
/* ดูตัวอย่างการใช้งานเพิ่มเติมได้ที่ไฟล์ example.ts และ newExample.ts*/

/* ตัวอย่างที่ 1 */
let data = new Statistics([8, 9, 5, 7, 11, 10, 12, 9, 10]);
console.log(data.mean()); // หาค่าเฉลี่เลขคณิต
// output: 9
console.log(data.median()); // หาค่ามัธยฐาน
// output: 9
console.log(data.mode()); // หาค่าฐานนิยม
// output: 9 , 10

/* ตัวอย่างที่ 2 */
let array = [24, 27, 31, 22, 19, 21].map((i) => i + 4);
data = new Statistics(array);
console.log(data.mean());
// output: ค่าเฉลี่ยเลขคณิต x̄ = 28.00

/* ตัวอย่างที่ 3 */
let data1 = new Statistics([11, 15, 22, 36, 11, 18, 22, 22, 16, 28]);
let data2 = new Statistics([156, 152, 157, 150, 155, 159]);
console.log(data1.showData());
// output: ข้อมูลเดิมคือ 11 15 22 36 11 18 22 22 16 28
//         เรียงข้อมูลชุดใหม่ได้ 11 11 15 16 18 22 22 22 28 36
console.log(data2.median());
// output: ตำแหน่งมัธยฐาน = 18 ระหว่าง 22
//         มัธยฐาน Me = 20.00

/* ตัวอย่างที่ 4 */
let mode = [10, 30, 20, 10, 40, 30, 10, 20, 10, 30];
let newMode = [];
let count = 0;
while (mode.length > count) {
  newMode.push(mode[count] / 10 + 6);
  count++;
}
data = new Statistics(newMode);
console.log(data.mode());
// output: ฐานนิยม Mo = 7

/* ตัวอย่างที่ 5 */
let score = [20, 30, 35, 50, 75, 90];
let myScore = 35;
(function (data, Score) {
  const data = new Statistics(data).standardScores(Score);
  console.log(data);
})(score, myScore);
// output: ค่ามาตราฐาน Z = -0.6

/* ตัวอย่างที่ 6 */
let score = [20, 30, 35, 50, 75, 90];
let list = ["พธู", "ชูชาติ", "เอนก", "ดำรง", "ทนง", "พิชิต"];
const func = new Promise((res, rej) => {
  try {
    res(new Statistics(score).standardScores(score, list));
  } catch (err) {
    rej(err);
  }
});
func
  .then((result) => console.log(result))
  .catch((reason) => console.error(reason));
/*  output:
            คะแนนของ พธู มีค่ามาตราฐาน = -1.2,
            คะแนนของ ชูชาติ มีค่ามาตราฐาน = -0.8,
            คะแนนของ เอนก มีค่ามาตราฐาน = -0.6,
            คะแนนของ ดำรง มีค่ามาตราฐาน = 0,
            คะแนนของ ทนง มีค่ามาตราฐาน = 1,
            คะแนนของ พิชิต มีค่ามาตราฐาน = 1.6
*/
```

### คำสั่งทั้งหมด

```javascript
import Statistics from "../main"; 
const Stat = new Statistics();
/* อ่านการใช้งานเบื้องต้นได้ที่ไฟล์ manual.ts และ patterns.txt */

Stat.data;                                        /* ข้อมูล (x) */
Stat.sortData;                                    /* เรียงข้อมูลจากน้อยไปมาก (x) */
Stat.n();                                         /* จำนวนข้อมูลทั้งหมด (n) */
Stat.classInterval;                               /* อันตรภาคชั้น */
Stat.midPoint();                                  /* จุดกึ่งกลางชั้น */
Stat.frequency;                                   /* ความถี่ (f) */
Stat.cumulative();                                /* ความถี่สะสม (cf) */
Stat.cumulativeFrequency;                         /* ความถี่สะสม (cf) */
Stat.I;                                           /* ความกว้างอันตรภาคช้น (i) */
Stat.W;                                           /* ค่าถ่วงน้ำหนัก (w) */
Stat.mean();                                      /* หาค่าเฉลี่ยเลขคณิต */
Stat.median();                                    /* หาค่ามัธยฐาน */
Stat.mode();                                      /* หาฐานนิยม */
Stat.midRange();                                  /* หาค่ากึ่งกลางพิสัย */
Stat.range();                                     /* หาค่าพิสัย */
Stat.Qr();                                        /* หาค่าควอร์ไทล์ */
Stat.Dr();                                        /* หาค่าเดไซล์ */
Stat.Pr();                                        /* หาค่าเปอร์เซนต์ไทล์ */
Stat.harmonicmean();                              /* หาค่าเฉลี่ยฮาร์โมนิค */
Stat.geometricmean();                             /* หาค่าเฉลี่ยเรขาคณิต */
Stat.quartileDeviation();                         /* หาส่วนเบี่ยงเบนควอร์ไทล์ */
Stat.meanDeviation();                             /* หาส่วนเบี่ยงเบนเฉลี่ย */
Stat.standardDeviation();                         /* หาส่วนเบี่ยงเบนเฉลี่ยมาตราฐาน */
Stat.variance();                                  /* หาค่าความแปรปรวนข้อมูล */
Stat.coefficientOfRange();                        /* หาสัมประสิทธิ์ของพิสัย */
Stat.coefficientOfQuartileDeviation();            /* หาสัมประสิทธิ์องส่วนเบี่ยงเบนควอร์ไทล์ */
Stat.coefficientOfMeanDeviation();                /* หาสัมประสิทธิ์ของส่วนเบี่ยงเบนเฉลี่ย */
Stat.coefficientOfDeviation();                    /* หาสัมประสิทธิ์ของการแปรผัน */
Stat.standardScores();                            /* หาค่ามาตราฐาน */
Stat.showData();                                  /* แสดงผลข้อมูลทั้งหมด */
Stat.showNumber();                                /* แสดงจำนวนข้อมูล */
Stat.showClassInterval();                         /* แสดงอันตรภาคชั้น */
Stat.showMiddle();                                /* แสดงจุดกึ่งกลางอันตรภาคชั้น */
Stat.ShowFrequency();                             /* แสดงความถี่ทั้งหมด */
Stat.showI();                                     /* แสดงความกว้างของอันตรภาคชั้น */
Stat.showWeignt();                                /* แสดงค่าถ่วงน้ำหนัก */
Stat.showTable();                                 /* แสดงตารางข้อมูล */

import Extension from "../plugin/extensions";
const e: Extension = new Extension();

e.generateNumbers();                              /* สร้างตัวเลขแบบสุ่มๆ*/
e.generateClassInterval();                        /* สร้างตัวเลขที่เป็นอันตรภาคชั้น */
e.compareTheCoefficientOfRange();                 /* การเปรียบเทียบสัมประสิทธิ์ของพิสัย */
e.compareTheCoefficientOfQuartileDeviation();     /* การเปรียบเทียบสัมประสิทธิ์องส่วนเบี่ยงเบนควอร์ไทล์ */
e.compareTheCoefficientOfMeanDeviation();         /* การเปรียบเทียบสัมประสิทธิ์ของส่วนเบี่ยงเบนเฉลี่ย */
e.compareTheCoefficientOfDeviation();             /* การเปรียบเทียบสัมประสิทธิ์ของการแปรผัน */
```
