import Statistics from "../main";
/* ทำโจทย์สอบซ่อมกลางภาคคณิตเพิ่ม */

// โจทย์ข้อที่ 1
let data: number[] = [4, 18, 9, 15, 20, 11, 7, 20];
let problem1 = new Statistics(data);

problem1.showData();
console.log(problem1.mean());
console.log(problem1.Dr(7));
console.log(problem1.Pr(35));
console.log(problem1.quartileDeviation());
console.log(problem1.meanDeviation());
console.log(problem1.standardDeviation());
console.log(problem1.coefficientOfRange());
console.log(problem1.coefficientOfQuartileDeviation());
console.log(problem1.coefficientOfMeanDeviation());
console.log(problem1.coefficientOfDeviation());

    /* output:
            ข้อมูลเดิมคือ 4 , 18 , 9 , 15 , 20 , 11 , 7 , 20
            เรียงข้อมูลชุดใหม่ได้ 4 , 7 , 9 , 11 , 15 , 18 , 20 , 20
            ค่าเฉลี่ยเลขคณิต x̄ = 13
            ปัดเป็นทศนิยม 2 ตำแหน่ง = 13.00
            ตำแหน่งเดไซล์ D7 = 6.3
            ค่าของเดไซล์ D7 = 18.6
            ปัดเป็นทศนิยม 2 ตำแหน่ง = 18.60
            ตำแหน่งเปอร์เซนต์ไทล์ P35 = 3.15
            ค่าของเปอร์เซนต์ไทล์ P35 = 9.3
            ปัดเป็นทศนิยม 2 ตำแหน่ง = 9.30
            ส่วนเบี่ยงเบนควอร์ไทล์ Q.D. = 6
            ปัดเป็นทศนิยม 2 ตำแหน่ง = 6.00
            ส่วนเบี่ยงเบนเฉลี่ย M.D. = 5.25
            ปัดเป็นทศนิยม 2 ตำแหน่ง = 5.25
            ส่วนเบี่ยงเบนเฉลี่ยมาตราฐาน S.D. = 5.744562646538029
            ปัดเป็นทศนิยม 2 ตำแหน่ง = 5.74
            สัมประสิทธิ์ของพิสัย C.R = 0.6666666666666666
            ปัดเป็นทศนิยม 3 ตำแหน่ง = 0.667
            สัมประสิทธิ์องส่วนเบี่ยงเบนควอร์ไทล์ C.QD = 0.4444444444444444
            ปัดเป็นทศนิยม 4 ตำแหน่ง = 0.4444
            สัมประสิทธิ์ของส่วนเบี่ยงเบนเฉลี่ย C.MD = 0.40384615384615385
            ปัดเป็นทศนิยม 3 ตำแหน่ง = 0.404
            สัมประสิทธิ์ของการแปรผัน C.SD = 0.4418894343490791
            ปัดเป็นทศนิยม 3 ตำแหน่ง = 0.442
    */


// โจทย์ข้อที่ 2
let score: number[] = [3, 4, 6, 8, 10, 12];
let frequency: number[] = [2, 5, 2, 7, 1, 3];
let problem2 = new Statistics(score, frequency);

problem2.showFrequency();
console.log(problem2.mean());
console.log(problem2.Dr(4));
console.log(problem2.Pr(80));
console.log(problem2.quartileDeviation());
console.log(problem2.meanDeviation());
console.log(problem2.standardDeviation());
console.log(problem2.coefficientOfRange());
console.log(problem2.coefficientOfQuartileDeviation());
console.log(problem2.coefficientOfMeanDeviation());
console.log(problem2.coefficientOfDeviation());

    /* output:
            ความถี่ 2 , 5 , 2 , 7 , 1 , 3
            ความถี่สะสม 2 , 7 , 9 , 16 , 17 , 20
            ค่าเฉลี่ยเลขคณิต x̄ = 7
            ปัดเป็นทศนิยม 2 ตำแหน่ง = 7.00
            ตำแหน่งเดไซล์ D4 = 8.4
            ค่าของเดไซล์ D4 = 6
            ปัดเป็นทศนิยม 2 ตำแหน่ง = 6.00
            ตำแหน่งเปอร์เซนต์ไทล์ P80 = 16.8
            ค่าของเปอร์เซนต์ไทล์ P80 = 9.6
            ปัดเป็นทศนิยม 2 ตำแหน่ง = 9.60
            ส่วนเบี่ยงเบนควอร์ไทล์ Q.D. = 2
            ปัดเป็นทศนิยม 2 ตำแหน่ง = 2.00
            ส่วนเบี่ยงเบนเฉลี่ย M.D. = 2.5
            ปัดเป็นทศนิยม 2 ตำแหน่ง = 2.50
            ส่วนเบี่ยงเบนเฉลี่ยมาตราฐาน S.D. = 2.9154759474226504
            ปัดเป็นทศนิยม 2 ตำแหน่ง = 2.92
            สัมประสิทธิ์ของพิสัย C.R = 0.6
            ปัดเป็นทศนิยม 3 ตำแหน่ง = 0.600
            สัมประสิทธิ์องส่วนเบี่ยงเบนควอร์ไทล์ C.QD = 0.3333333333333333
            ปัดเป็นทศนิยม 4 ตำแหน่ง = 0.3333
            สัมประสิทธิ์ของส่วนเบี่ยงเบนเฉลี่ย C.MD = 0.35714285714285715
            ปัดเป็นทศนิยม 3 ตำแหน่ง = 0.357
            สัมประสิทธิ์ของการแปรผัน C.SD = 0.4164965639175215
            ปัดเป็นทศนิยม 3 ตำแหน่ง = 0.416
    */


// โจทย์ข้อที่ 3
frequency = [2, 6, 5, 2, 3, 2];
score = [2, 6, 7, 11, 12, 16, 17, 21, 22, 26, 27, 31];
let problem3 = new Statistics([], frequency, score);

problem3.showTable('t3')
problem3.showFrequency();
console.log(problem3.mean());
console.log(problem3.mode());
console.log(problem3.median());
console.log(problem3.quartileDeviation());
console.log(problem3.meanDeviation());
console.log(problem3.standardDeviation());
console.log(problem3.coefficientOfRange());
console.log(problem3.coefficientOfQuartileDeviation());
console.log(problem3.coefficientOfMeanDeviation());
console.log(problem3.coefficientOfDeviation());

    /* output:
        ┌─────────┬─────────────┬──────────────┬──────────┬─────────────┬────────────────┐
        │ (index) │     ci      │      x       │    f     │     cf      │       xf       │
        ├─────────┼─────────────┼──────────────┼──────────┼─────────────┼────────────────┤
        │    0    │ 'อันตรภาคชั้น' │ 'จุดกึ่งกลางชั้น' │ 'ความถี่'  │ 'ความถี่สะสม' │ 'ข้อมูล x ความถี่' │
        │    1    │   '2 - 6'   │      4       │    2     │      2      │       8        │
        │    2    │  '7 - 11'   │      9       │    6     │      8      │       54       │
        │    3    │  '12 - 16'  │      14      │    5     │     13      │       70       │
        │    4    │  '17 - 21'  │      19      │    2     │     15      │       38       │
        │    5    │  '22 - 26'  │      24      │    3     │     18      │       72       │
        │    6    │  '27 - 31'  │      29      │    2     │     20      │       58       │
        │    7    │    'รวม'    │  'Σx = 99'   │ 'n = 20' │    ' - '    │  'Σxf = 300'   │
        └─────────┴─────────────┴──────────────┴──────────┴─────────────┴────────────────┘
            ความถี่ 2 , 6 , 5 , 2 , 3 , 2
            ความถี่สะสม 2 , 8 , 13 , 15 , 18 , 20
            ค่าเฉลี่ยเลขคณิต x̄ = 15
            ปัดเป็นทศนิยม 2 ตำแหน่ง = 15.00
            ฐานนิยม Mo = 10.5
            ปัดเป็นทศนิยม 2 ตำแหน่ง = 10.50
            ตำแหน่งมัธยฐาน = 10
            มัธยฐาน Me = 13.5
            ส่วนเบี่ยงเบนควอร์ไทล์ Q.D. = 6.25
            ปัดเป็นทศนิยม 2 ตำแหน่ง = 6.25
            ส่วนเบี่ยงเบนเฉลี่ย M.D. = 6.3
            ปัดเป็นทศนิยม 2 ตำแหน่ง = 6.30
            ส่วนเบี่ยงเบนเฉลี่ยมาตราฐาน S.D. = 7.516648189186454
            ปัดเป็นทศนิยม 2 ตำแหน่ง = 7.52
            สัมประสิทธิ์ของพิสัย C.R = 0.9090909090909091
            ปัดเป็นทศนิยม 3 ตำแหน่ง = 0.909
            สัมประสิทธิ์องส่วนเบี่ยงเบนควอร์ไทล์ C.QD = 0.4098360655737705
            ปัดเป็นทศนิยม 4 ตำแหน่ง = 0.4098
            สัมประสิทธิ์ของส่วนเบี่ยงเบนเฉลี่ย C.MD = 0.42
            ปัดเป็นทศนิยม 3 ตำแหน่ง = 0.420
            สัมประสิทธิ์ของการแปรผัน C.SD = 0.5011098792790969
            ปัดเป็นทศนิยม 3 ตำแหน่ง = 0.501
    */
