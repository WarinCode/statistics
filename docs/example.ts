import Statistics from "../main";
/* แบบทดสอบอันเก่า */

// Ex.1
let EX1 = new Statistics([8, 9, 5, 7, 11, 10, 12, 9, 10]);
console.log(EX1.mean());
// output: ค่าเฉลี่ยเลขคณิต x̄ = 9.00
console.log(EX1.median());
// output: มัธยฐาน Me = 9.00
console.log(EX1.mode());
// output: ฐานนิยม Mo = 9 และ 10


// EX.2
let EX2 = new Statistics([8, 9, 11, 12, 13, 15], [9, 4, 8, 11, 6, 2]);
console.log(EX2.mean());
// output: 10.9
console.log(EX2.mode());
// output: 12
console.log(EX2.median());
// output: 11


// EX.3
let EX3 = new Statistics([], [2, 4, 7, 5, 4, 3], [11, 15, 16, 20, 21, 25, 26, 30, 31, 35, 36, 40]);
console.log(EX3.mean());
// output: 25.8
console.log(EX3.mode());
// output: 23.5
console.log(EX3.median());
// output: 25.142857142857142


// EX.4
let array: number[] = [24, 27, 31, 22, 19, 21].map((i) => i + 4)
let EX4 = new Statistics(array);
console.log(EX4.mean());
// output: 28


// EX.5
let EX5 = new Statistics([2, 10, 20, 25]);
console.log(EX5.geometricMean());
// output: 10


// EX.6
let EX6 = new Statistics([24, 16, 12, 48, 36]);
console.log(EX6.geometricMean());
// output: 24.000000000000004


// EX.7
let EX7 = new Statistics([3, 9, 6, 18]);
console.log(EX7.harmonicMean());
// output: 6


// EX.8
let EX8 = new Statistics([2, 5, 6, 12, 15]);
console.log(EX8.harmonicMean());
// output: 4.918032786885246
EX8 = new Statistics([10, 15, 8, 6]);
console.log(EX8.harmonicMean());
// output: ค่าเฉลี่ยฮาร์โมนิค H.M. = 8.73
EX8 = new Statistics([2, 3, 4, 6, 4, 3]);
console.log(EX8.harmonicMean());
// output: ค่าเฉลี่ยฮาร์โมนิค H.M. = 3.27
EX8 = new Statistics([], [2, 5, 3], [11, 15, 16, 20, 21, 25]);
console.log(EX8.harmonicMean());
// output: ค่าเฉลี่ยฮาร์โมนิค H.M. = 17.86


// EX.9
let EX9 = new Statistics([50, 65, 70, 55, 75], [], [], [30, 20, 15, 20, 15]);
console.log(EX9.mean());
// output: 60.75


// EX.10
let EX10 = new Statistics([12, 18, 20, 19, 15, 16]);
console.log(EX10.mean());
// output: 16.666666666666668


// EX.11
let EX11 = new Statistics([5, 6, 7, 8, 9], [4, 6, 3, 5, 2]);
console.log(EX11.mean());
// output: 6.75


// EX.12
let EX12 = new Statistics([], [3, 5, 10, 7, 5], [5, 9, 10, 14, 15, 19, 20, 24, 25, 29]);
console.log(EX12.mean());
// output: 18


let EX13 = new Statistics([11, 15, 22, 36, 11, 18, 22, 22, 16, 28]);
EX13.showData();
// output: ข้อมูลเดิมคือ 11 15 22 36 11 18 22 22 16 28
//         เรียงข้อมูลชุดใหม่ได้ 11 11 15 16 18 22 22 22 28 36
console.log(EX13.median());
// output: ตำแหน่งมัธยฐาน = 18 ระหว่าง 22
//         มัธยฐาน Me = 20.00
EX13.showData()
// output: ข้อมูลเดิมคือ 156 152 157 150 155 159
//         เรียงข้อมูลชุดใหม่ได้ 150 152 155 156 157 159
console.log(EX13.median());
// output: ตำแหน่งมัธยฐาน = 155 ระหว่าง 156
//         มัธยฐาน Me = 155.50


// EX.14
let EX14 = new Statistics([8, 9, 10, 11, 12], [5, 2, 1, 7, 5]);
EX14.showData();
// output: ข้อมูลเดิมคือ 8 9 10 11 12
//         เรียงข้อมูลชุดใหม่ได้ 8 9 10 11 12
EX14.showFrequency();
// output: ความถี่ 5 2 1 7 5
//         ความถี่สะสม 5 7 8 15 20
console.log(EX14.median());
// output: ตำแหน่งมัธยฐาน = 10
//         มัธยฐาน Me = 11.00

// EX.15
let EX15 = new Statistics([], [4, 5, 6, 10, 15], [5, 9, 10, 14, 15, 19, 20, 24, 25, 29]);
console.log(EX15.median());
// output: ตำแหน่งมัธยฐาน = 20
//         มัธยฐาน Me = 22.00

// EX.16
let EX16 = new Statistics([4, 5, 3, 2, 4, 1, 5, 4, 2, 1, 4, 3]);
console.log(EX16.mode());
// output: ฐานนิยม Mo = 4
EX16 = new Statistics([1, 2, 4, 9, 9, 1, 4, 2, 1, 9, 2, 4]);
console.log(EX16.mode());
// output: ไม่มีค่าฐานนิยมของข้อมูลชุดนี้

let mode: number[] = [10, 30, 20, 10, 40, 30, 10, 20, 10, 30]
let newMode: number[] = [];
let count:number = 0;
while (mode.length > count) {
    newMode.push((mode[count] / 10) + 6);
    count++;
}
EX16 = new Statistics(newMode);
console.log(EX16.mode());
// output: ฐานนิยม Mo = 7


// EX.17
let EX17 = new Statistics([], [5, 6, 7, 10, 1, 1], [5, 9, 10, 14, 15, 19, 20, 24, 25, 29, 30, 34]);
console.log(EX17.mode());
// output: ฐานนิยม Mo = 20.75

// EX.18
let EX18 = new Statistics([], [8, 3, 6, 10, 2, 4], [20, 29, 30, 39, 40, 49, 50, 59, 60, 69, 70, 79]);
console.log(EX18.mode());
// output: ฐานนิยม Mo = 52.83


// EX.19
let EX19 = new Statistics([2, 7, 9, 15, 22, 30, 17]);
console.log(EX19.midRange());
// output: ค่ากึ่งกลางพิสัย = 16
EX19 = new Statistics([65, 71, 32, 69, 78, 81, 45]);
console.log(EX19.midRange());
// output: ค่ากึ่งกลางพิสัย = 56

// EX.20
let EX20 = new Statistics([80, 100]);
console.log(EX20.harmonicMean());
// output: ค่ากึ่งกลางพิสัย = 88.89

// EX.21
let EX21 = new Statistics([35, 31, 42, 43, 30, 35, 49, 48, 25, 60, 52]);
console.log(EX21.Qr(3));
// output: ตำแหน่งควอร์ไทล์ Q3 = 9
//         ค่าของควอร์ไทล์ Q3 = 49
console.log(EX21.Dr(2));
// output: ตำแหน่งเดไซล์ D2 = 2.4
//         ค่าของเดไซล์ D2 = 30.4
console.log(EX21.Pr(85));
// output: ตำแหน่งเปอร์เซนต์ไทล์ P85 = 10.2
//         ค่าของเปอร์เซนต์ไทล์ P85 = 53.60

EX21 = new Statistics([35, 31, 42, 43, 30, 35, 49, 48, 25, 60, 52])
console.log(EX21.Qr(3));
// output: 49
console.log(EX21.Dr(2));
// output: 30.4
console.log(EX21.Pr(85));
// output: 53.599999999999994

// EX.22
let EX22 = new Statistics([5, 7, 10, 14, 15], [1, 3, 5, 4, 2]);
console.log(EX22.Qr(2));
// output: ตำแหน่งควอร์ไทล์ Q2 = 8
//         ค่าของควอร์ไทล์ Q2 = 10
console.log(EX22.Dr(4));
// output: ตำแหน่งเดไซล์ D4 = 6.4
//         ค่าของเดไซล์ D4 = 10
console.log(EX22.Pr(67));
// output: ตำแหน่งเปอร์เซนต์ไทล์ P67 = 10.72
//         ค่าของเปอร์เซนต์ไทล์ P67 = 14.00

// EX.23
let EX23 = new Statistics([], [5, 9, 12, 8, 11, 15], [21, 30, 31, 40, 41, 50, 51, 60, 61, 70, 71, 80]);
console.log(EX23.Qr(3));
// output: ตำแหน่งควอร์ไทล์ Q3 = 45
//         ค่าของควอร์ไทล์ Q3 = 70.50
console.log(EX23.Dr(4));
// output: ตำแหน่งเดไซล์ D4 = 24
//         ค่าของเดไซล์ D4 = 48.83
console.log(EX23.Pr(72));
// output: ตำแหน่งเปอร์เซนต์ไทล์ P72 = 43.2
//         ค่าของเปอร์เซนต์ไทล์ P72 = 68.86

// EX.24
let EX24 = new Statistics([10, 5, 4, 9, 12, 15, 7, 18]);
console.log(EX24.Qr(3));
// output: 14.25
console.log(EX24.Dr(2));
// output: 4.8
console.log(EX24.Pr(65));
// output: 11.7

// EX.25
let EX25 = new Statistics([40, 42, 45, 46, 48, 50, 54, 56], [4, 6, 10, 9, 9, 5, 5, 3]);
console.log(EX25.Qr(2));
// output: 46
console.log(EX25.Dr(3));
// output: 45
console.log(EX25.Pr(74));
// output: 50


// EX.26
let EX26 = new Statistics([], [6, 10, 14, 8, 2], [2, 5, 6, 9, 10, 13, 14, 17, 18, 21]);
console.log(EX26.Qr(2));
// output: 10.642857142857142
console.log(EX26.Dr(3));
// output: 7.9
console.log(EX26.Pr(81));
// output: 14.7


EX26 = new Statistics([], [6, 10, 14, 8, 2], [2, 5, 6, 9, 10, 13, 14, 17, 18, 21]);
console.log(EX26.Qr(2));
// output: ตำแหน่งควอร์ไทล์ Q2 = 20
//         ค่าของควอร์ไทล์ Q2 = 10.64
console.log(EX26.Dr(3));
// output: ตำแหน่งเดไซล์ D3 = 12
//         ค่าของเดไซล์ D3 = 7.90
console.log(EX26.Pr(81));
// output: ตำแหน่งเปอร์เซนต์ไทล์ P81 = 32.4
//         ค่าของเปอร์เซนต์ไทล์ P81 = 14.70


// EX.27
let EX27 = new Statistics([2, 7, 5, 4, 9]);
console.log(EX27.range());
// output: พิสัย = 7
EX27 = new Statistics([9, 11, 15, 16, 10, 19, 8, 21]);
console.log(EX27.range());
// output: พิสัย = 13
EX27 = new Statistics([20, 35, 38, 10, 16, 7, 76]);
console.log(EX27.range());
// output: พิสัย = 69
EX27 = new Statistics([23, 45, 12, 95, 63, 56, 78, 10]);
console.log(EX27.range());
// output: พิสัย = 85


// EX.28
let EX28 = new Statistics([],[2,6,9,3],[21,30,31,40,41,50,51,60]);
console.log(EX28.range());
// output: พิสัย = 40


// EX.29
let EX29 = new Statistics([],[8,27,42,18,5],[72,74,69,71,66,68,63,65,60,62]);
console.log(EX29.range());
// output: พิสัย = 15


// EX.30
let EX30 = new Statistics([42,50,55,58,59,61,63,63,63,68,69,70,70,71,71,71,71,76,82,88]);
console.log(EX30.range());
// output: พิสัย = 46
console.log(EX30.quartileDeviation());
// output: ส่วนเบี่ยงเบนควอร์ไทล์ Q.D. = 5.75


// EX.31
let EX31 = new Statistics([10,12,17,25,28,32,36,42,50,54]);
console.log(EX31.quartileDeviation());
// output: ส่วนเบี่ยงเบนควอร์ไทล์ Q.D. = 14.13


// EX.32
let EX32 = new Statistics([10,13,15,20,24],[8,5,4,12,3]);
console.log(EX32.quartileDeviation());
// output: ส่วนเบี่ยงเบนควอร์ไทล์ Q.D. = 4.63


// EX.33
let EX33 = new Statistics([],[2,6,10,15,12,6,3],[40,44,45,49,50,54,55,59,60,64,65,69,70,74]);
console.log(EX33.quartileDeviation());
// output: ส่วนเบี่ยงเบนควอร์ไทล์ Q.D. = 5.19


// EX.34
let EX34 = new Statistics([],[3,7,16,12,2],[10,14,15,19,20,24,25,29,30,34]);
console.log(EX34.range());
// output: พิสัย = 25
console.log(EX34.quartileDeviation());
// output: ส่วนเบี่ยงเบนควอร์ไทล์ Q.D. = 3.34
console.log(new Statistics([],[3,7,16,12,2],[10,14,15,19,20,24,25,29,30,34]).quartileDeviation());
// output: 3.333333333333334


// EX.35
let EX35 = new Statistics([12,15,35,27,19]);
console.log(EX35.meanDeviation());
// output: ส่วนเบี่ยงเบนเฉลี่ย M.D. = 7.52


//EX.36
let EX36 = new Statistics([10,13,15,17,19,20],[7,5,12,10,5,1]);
console.log(EX36.meanDeviation());
// output: ส่วนเบี่ยงเบนเฉลี่ย M.D. = 2.25


// EX.37
let EX37 = new Statistics([],[3,5,7,8,4,3],[10,14,15,19,20,24,25,29,30,34,35,39]);
console.log(EX37.meanDeviation());
// output: ส่วนเบี่ยงเบนเฉลี่ย M.D. = 6.00


// EX.38
let EX38 = new Statistics([16,11,10,14,19]);
console.log(EX38.meanDeviation());
// output: ส่วนเบี่ยงเบนเฉลี่ย M.D. = 2.80


// EX.39
let EX39 = new Statistics([40,42,45,50,55],[15,25,20,24,16]);
console.log(EX39.meanDeviation());
// output: ส่วนเบี่ยงเบนเฉลี่ย M.D. = 4.56


// EX.40
let EX40 = new Statistics([],[10,18,42,27,3],[60,62,63,65,66,68,69,71,72,74]);
console.log(EX40.meanDeviation());
// output: ส่วนเบี่ยงเบนเฉลี่ย M.D. = 2.20


// EX.41
let EX41 = new Statistics([5,5,6,7,8]);
console.log(EX41.standardDeviation());
// output: ส่วนเบี่ยงเบนเฉลี่ยมาตราฐาน S.D. = 1.17


// EX.42
let EX42 = new Statistics([13,16,22,10,15,20]);
console.log(EX42.standardDeviation());
// output: ส่วนเบี่ยงเบนเฉลี่ยมาตราฐาน S.D. = 4.04


// EX.43
let EX43 = new Statistics([10,13,15,20,24],[2,3,9,4,2]);
console.log(EX43.standardDeviation());
// output: ส่วนเบี่ยงเบนเฉลี่ยมาตราฐาน S.D. = 3.87


// EX.44
let EX44 = new Statistics([],[6,16,22,26,14,12,4],[40,44,45,49,50,54,55,59,60,64,65,69,70,74]);
console.log(EX44.standardDeviation());
// output: ส่วนเบี่ยงเบนเฉลี่ยมาตราฐาน S.D. = 7.63
EX44 = new Statistics([],[6,16,22,26,14,12,4],[40,44,45,49,50,54,55,59,60,64,65,69,70,74]);
console.log(EX44.standardDeviation());
// output: 7.634788798650554


// EX.45
array =  [2,4,6,8,10];
let EX45 = new Statistics(array);
console.log(EX45.standardDeviation());
// output: ส่วนเบี่ยงเบนเฉลี่ยมาตราฐาน S.D. = 2.83
EX45 = new Statistics(array.map((x) => x + 3));
console.log(EX45.standardDeviation());
// output: ส่วนเบี่ยงเบนเฉลี่ยมาตราฐาน S.D. = 2.83


// EX.46
array =  [3,5,6,9,12];
let EX46 = new Statistics(array);
console.log(EX46.standardDeviation());
// output: ส่วนเบี่ยงเบนเฉลี่ยมาตราฐาน S.D. = 3.16
EX46 = new Statistics(array.map((y) => y * 3));
console.log(EX46.standardDeviation());
// output: ส่วนเบี่ยงเบนเฉลี่ยมาตราฐาน S.D. = 9.49


// EX.47
let EX47 = new Statistics([15,14,10,12,10,9,8,6]);
console.log(EX47.standardDeviation());
// output: ส่วนเบี่ยงเบนเฉลี่ยมาตราฐาน S.D. = 2.83
EX47 = new Statistics([15,14,10,12,10,9,8,6]);
console.log(EX47.standardDeviation());
// output: 2.8284271247461903


// EX.48
let EX48 = new Statistics([15,15,21,25]);
console.log(EX48.meanDeviation());
// output: ส่วนเบี่ยงเบนเฉลี่ย M.D. = 4.00
console.log(EX48.standardDeviation());
// output: ส่วนเบี่ยงเบนเฉลี่ยมาตราฐาน S.D. = 4.24


// EX.49
let EX49 = new Statistics([15,17,20,25,30],[1,4,6,3,1]);
console.log(EX49.meanDeviation());
// output: ส่วนเบี่ยงเบนเฉลี่ย M.D. = 3.05
console.log(EX49.standardDeviation());
// output: ส่วนเบี่ยงเบนเฉลี่ยมาตราฐาน S.D. = 3.93
console.log(EX49.variance());
// output: ความแปรปรวนของข้อมูล S2 = 15.45


// EX.50
let EX50 = new Statistics([20,23,27,29,30,33]);
console.log(EX50.quartileDeviation());
// output: ส่วนเบี่ยงเบนควอร์ไทล์ Q.D. = 4.25
console.log(EX50.meanDeviation());
// output: ส่วนเบี่ยงเบนเฉลี่ย M.D. = 3.67
console.log(EX50.standardDeviation());
// output: ส่วนเบี่ยงเบนเฉลี่ยมาตราฐาน S.D. = 4.36


// EX.51
let EX51 = new Statistics([],[6,2,4,3,4,1],[4,6,7,9,10,12,13,15,16,18,19,21]);
console.log(EX51.quartileDeviation());
// output: ส่วนเบี่ยงเบนควอร์ไทล์ Q.D. = 4.75
console.log(EX51.meanDeviation());
// output: ส่วนเบี่ยงเบนเฉลี่ย M.D. = 4.20
console.log(EX51.standardDeviation());
// output: ส่วนเบี่ยงเบนเฉลี่ยมาตราฐาน S.D. = 4.93


// EX.52
let EX52 = new Statistics([],[15,20,12,2,1],[0,2,3,5,6,8,9,11,12,14]);
console.log(EX52.standardDeviation());
// output: ส่วนเบี่ยงเบนเฉลี่ยมาตราฐาน S.D. = 2.80
console.log(EX52.variance());
// output: ความแปรปรวนของข้อมูล S2 = 7.86


// Ex.53
array = [20,30,35,50,75,90];
let myScore:number = 30;
let Ex53 = new Statistics(array).standardScores(myScore);
console.log(Ex53);
// output: ค่ามาตราฐาน Z = -0.8


// Ex.54
array = [20,30,35,50,75,90];
let name:string[] = ['พธู' , 'ชูชาติ' ,'เอนก' , 'ดำรง' , 'ทนง' , 'พิชิต'];
let Ex54 = new Statistics(array).standardScores(array,name);
console.log(Ex54);
// output:
        // คะแนนของ พธู มีค่ามาตราฐาน = -1.2,
        // คะแนนของ ชูชาติ มีค่ามาตราฐาน = -0.8,
        // คะแนนของ เอนก มีค่ามาตราฐาน = -0.6,
        // คะแนนของ ดำรง มีค่ามาตราฐาน = 0,
        // คะแนนของ ทนง มีค่ามาตราฐาน = 1,
        // คะแนนของ พิชิต มีค่ามาตราฐาน = 1.6