// เรียกใช้ทั้ง 2 module
import { my_stats } from "./apply"; // เหมาะกับการคำนวณเลขหาค่าที่แท้จริงทศนิยมที่ไม่ได้มีการปัดขึ้นหรือปัดลงอย่างไร
import { Statistics } from "./main"; // เหมาะกับการหาค่าโดยประมาณซึ่งไม่ใช้ค่าที่แท้จริงนักเพราะมีการปัดขึ้นปัดลงของทศนิยมและถูกตั้งค่าให้ตอบ 2,3,4 ตำแหน่งเพื่อง่ายและสดวกต่อการตอบและหาคำตอบและมีตัวเลือกมากมายในการใช้งาน
// ในการยกตัวอย่างครั้งนี้จะขอใช้ทั้ง 2 แบบเพื่อให้เห็นถึงความแตกต่าง
/* 
    เราสามารถเปลี่ยนชื่อ Objectt ที่ import มันเข้ามาได้ถ้ารู้สึกว่าชื่อมันยาวและ ขก.พิมพ์
    - วิธีใช้    
    import {  my_stats as ชื่อที่ต้องการเปลี่ยน } from "./apply";
    new ชื่อที่เปลี่ยนแล้ว(ใส่ข้อมูลตามปกติ);

    - ตัวอย่าง 
    import { my_stats as analyze_data} from "./apply";
    new analyze_data([12,34,98] , [3,4,1] , [1,4,5,9,10,14,15,19]);

    การยกตัวอย่างการใช้งานนี้จะขอเก็บไว้ในตัวแปรในแต่ละตัวอย่างเพื่อง่ายต่อการดู
    โดยอย่าลืมว่าข้อมูลที่ใส่ลงไปนั้นจะต้องอยู่ในวงเล็บ (...) และตัวเลขต้อองอยู่ในเครื่องหมาย array เท่านั้น [...]
    ในแต่ละ [] จะมีเครื่องหมายลูกน้ำกั้นไว้อยู่เสมอ

    * new Statistics( [ข้อมูล] , [ความถี่สะสม] , [อันตรภาคชั้น] , [ค่าถ่วงน้ำหนัก] );
    หากข้อมูลบางช่องไม่อยากใส่ให้ใส่เครื่องหมาย array เปล่า []

*/
/* โจทย์ทั้งหมดมาจากแบบฝึกในสมุดคณิตเพิ่มและในใบงาน */ 
/* โจทย์บางข้ออาจหาไม่ได้เพราะทำมาเพื่อหาข้อมูลจากตารางและข้อมูลที่ไม่แจกแจงความถี่ */

// Ex.1
let EX1_1 = new my_stats([8,9,5,7,11,10,12,9,10]);
let EX1_2 = new Statistics([8,9,5,7,11,10,12,9,10]);
console.log(EX1_1.Mean());
// output: 9
console.log(EX1_1.Median());
// output: 9
console.log(EX1_1.Mode());
// output: 9 , 10
console.log(EX1_2.Mean());
// output: ค่าเฉลี่ยเลขคณิต x̄ = 9.00
console.log(EX1_2.Median());
// output: มัธยฐาน Me = 9.00
console.log(EX1_2.Mode());
// output: ฐานนิยม Mo = 9 และ 10

// EX.2
let EX2_1= new my_stats([8,9,11,12,13,15],[9,4,8,11,6,2]);
let EX2_2 = new Statistics([8,9,11,12,13,15],[9,4,8,11,6,2]);
console.log(EX2_1.Mean());
// output: 10.9
console.log(EX2_1.Mode());
// output: 12
console.log(EX2_1.Median());
// output: 11
console.log(EX2_2.Mean());
// output: ค่าเฉลี่ยเลขคณิต x̄ = 10.90
console.log(EX2_2.Mode());
// output: ฐานนิยม Mo = 12.00
console.log(EX2_2.Median());
// output: มัธยฐาน Me = 11.00

// EX.3
let EX3_1 = new my_stats([],[2,4,7,5,4,3],[11,15,16,20,21,25,26,30,31,35,36,40]);
let EX3_2 = new Statistics([],[2,4,7,5,4,3],[11,15,16,20,21,25,26,30,31,35,36,40]);
console.log(EX3_1.Mean());
// output: 25.8
console.log(EX3_1.Mode());
// output: 23.5
console.log(EX3_1.Median());
// output: 25.142857142857142
console.log(EX3_2.Mean());
// output: ค่าเฉลี่ยเลขคณิต x̄ = 25.80
console.log(EX3_2.Mode());
// output: ฐานนิยม Mo = 23.50
console.log(EX3_2.Median());
// output: มัธยฐาน Me = 25.14

// EX.4
let array1:number[] = [24,27,31,22,19,21].map((i) => i + 4)
let EX4_1 = new my_stats(array1);
let EX4_2 = new Statistics(array1);
console.log(EX4_1.Mean());
// output: 28
console.log(EX4_2.Mean());
// output: ค่าเฉลี่ยเลขคณิต x̄ = 28.00

// EX.5
let EX5_1 = new my_stats([2,10,20,25]);
let EX5_2 = new Statistics([2,10,20,25]);
console.log(EX5_1.Geometric_mean());
// output: 10
console.log(EX5_2.Geometric_mean());
// output: ค่าเฉลี่ยเรขาคณิต G.M. = 10.00

// EX.6
let EX6_1 = new my_stats([24,16,12,48,36]);
let EX6_2 = new Statistics([24,16,12,48,36]);
console.log(EX6_1.Geometric_mean());
// output: 24.000000000000004
console.log(EX6_2.Geometric_mean());
// output: ค่าเฉลี่ยเรขาคณิต G.M. = 24.00

// EX.7
let EX7_1 = new my_stats([3,9,6,18]);
let EX7_2 = new Statistics([3,9,6,18]);
console.log(EX7_1.Harmonic_mean());
// output: 6
console.log(EX7_2.Harmonic_mean());
// output: ค่าเฉลี่ยฮาร์โมนิค H.M. = 6.00

// EX.8
let EX8_1 = new my_stats([2,5,6,12,15]);
console.log(EX8_1.Harmonic_mean());
// output: 4.918032786885246
let EX8_2 = new Statistics([2,5,6,12,15]);
console.log(EX8_2.Harmonic_mean());
// output: ค่าเฉลี่ยฮาร์โมนิค H.M. = 4.92
let EX8_3 = new Statistics([10,15,8,6]);
console.log(EX8_3.Harmonic_mean());
// output: ค่าเฉลี่ยฮาร์โมนิค H.M. = 8.73
let EX8_4 = new Statistics([2,3,4,6,4,3]);
console.log(EX8_4.Harmonic_mean());
// output: ค่าเฉลี่ยฮาร์โมนิค H.M. = 3.27
let EX8_5 = new Statistics([],[2,5,3],[11,15,16,20,21,25]);
console.log(EX8_5.Harmonic_mean());
// output: ค่าเฉลี่ยฮาร์โมนิค H.M. = 17.86

// EX.9
let EX9_1 = new my_stats([50,65,70,55,75],[],[],[30,20,15,20,15]);
let EX9_2 = new Statistics([50,65,70,55,75],[],[],[30,20,15,20,15]);
console.log(EX9_1.Mean());
// output: 60.75
console.log(EX9_2.Mean());
// output: ค่าเฉลี่ยเลขคณิต x̄ = 60.75

// EX.10
let EX10_1 = new my_stats([12,18,20,19,15,16]);
let EX10_2 = new Statistics([12,18,20,19,15,16]);
console.log(EX10_1.Mean());
// output: 16.666666666666668
console.log(EX10_2.Mean());
// output: ค่าเฉลี่ยเลขคณิต x̄ = 16.67

// EX.11
let EX11_1 = new my_stats([5,6,7,8,9],[4,6,3,5,2]);
let EX11_2 = new Statistics([5,6,7,8,9],[4,6,3,5,2]);
console.log(EX11_1.Mean());
// output: 6.75
console.log(EX11_2.Mean());
// output: ค่าเฉลี่ยเลขคณิต x̄ = 6.75

// EX.12
let EX12_1 = new my_stats([],[3,5,10,7,5],[5,9,10,14,15,19,20,24,25,29]);
console.log(EX12_1.Mean());
// output: 18
let EX12_2 = new Statistics([],[3,5,10,7,5],[5,9,10,14,15,19,20,24,25,29]);
console.log(EX12_2.Mean());
// output: ค่าเฉลี่ยเลขคณิต x̄ = 18.00

// EX.12
let EX13_1 = new Statistics([11,15,22,36,11,18,22,22,16,28]);
let EX13_2 = new Statistics([156,152,157,150,155,159]);
console.log(EX13_1.Showdata());
// output: ข้อมูลเดิมคือ 11 15 22 36 11 18 22 22 16 28
//         เรียงข้อมูลชุดใหม่ได้ 11 11 15 16 18 22 22 22 28 36
console.log(EX13_1.Median());
// output: ตำแหน่งมัธยฐาน = 18 ระหว่าง 22
//         มัธยฐาน Me = 20.00
console.log(EX13_2.Showdata());
// output: ข้อมูลเดิมคือ 156 152 157 150 155 159
//         เรียงข้อมูลชุดใหม่ได้ 150 152 155 156 157 159
console.log(EX13_2.Median());
// output: ตำแหน่งมัธยฐาน = 155 ระหว่าง 156
//         มัธยฐาน Me = 155.50

// EX.14
let EX14 = new Statistics([8,9,10,11,12],[5,2,1,7,5]);
console.log(EX14.Showdata());
// output: ข้อมูลเดิมคือ 8 9 10 11 12
//         เรียงข้อมูลชุดใหม่ได้ 8 9 10 11 12
console.log(EX14.Showfrequency());
// output: ความถี่ 5 2 1 7 5
//         ความถี่สะสม 5 7 8 15 20
console.log(EX14.Median());
// output: ตำแหน่งมัธยฐาน = 10
//         มัธยฐาน Me = 11.00

// EX.15
let EX15 = new Statistics([],[4,5,6,10,15],[5,9,10,14,15,19,20,24,25,29]);
console.log(EX15.Median());
// output: ตำแหน่งมัธยฐาน = 20
//         มัธยฐาน Me = 22.00

// EX.16
let EX16_1 = new Statistics([4,5,3,2,4,1,5,4,2,1,4,3]);
console.log(EX16_1.Mode());
// output: ฐานนิยม Mo = 4
let EX16_2 = new Statistics([1,2,4,9,9,1,4,2,1,9,2,4]);
console.log(EX16_2.Mode());
// output: ไม่มีค่าฐานนิยมของข้อมูลชุดนี้
let Mode:number[] =[10,30,20,10,40,30,10,20,10,30]
let new_Mode:number[] = [];
let count = 0;
while(Mode.length > count){
    new_Mode.push((Mode[count] / 10) + 6);
    count++;
}
let EX16_3 =  new Statistics(new_Mode);
console.log(EX16_3.Mode());
// output: ฐานนิยม Mo = 7

// EX.17
let EX17 =  new Statistics([],[5,6,7,10,1,1],[5,9,10,14,15,19,20,24,25,29,30,34]);
console.log(EX17.Mode());
// output: ฐานนิยม Mo = 20.75

// EX.18
let EX18 = new Statistics([],[8,3,6,10,2,4],[20,29,30,39,40,49,50,59,60,69,70,79]);
console.log(EX18.Mode());
// output: ฐานนิยม Mo = 52.83

// EX.19
let EX19_1 = new Statistics([2,7,9,15,22,30,17]);
console.log(EX19_1.Mid_range());
// output: ค่ากึ่งกลางพิสัย = 16
let EX19_2 = new Statistics([65,71,32,69,78,81,45]);
console.log(EX19_2.Mid_range());
// output: ค่ากึ่งกลางพิสัย = 56

// EX.20
let EX20 = new Statistics([80,100]);
console.log(EX20.Harmonic_mean());
// output: ค่ากึ่งกลางพิสัย = 88.89

// EX.21
let EX21_1 = new Statistics([35,31,42,43,30,35,49,48,25,60,52]);
console.log(EX21_1.Qr(3));
// output: ตำแหน่งควอร์ไทล์ Q3 = 9 
//         ค่าของควอร์ไทล์ Q3 = 49
console.log(EX21_1.Dr(2));
// output: ตำแหน่งเดไซล์ D2 = 2.4 
//         ค่าของเดไซล์ D2 = 30.4
console.log(EX21_1.Pr(85));
// output: ตำแหน่งเปอร์เซนต์ไทล์ P85 = 10.2 
//         ค่าของเปอร์เซนต์ไทล์ P85 = 53.60
let EX21_2 = new my_stats([35,31,42,43,30,35,49,48,25,60,52])
console.log(EX21_2.Qr(3));
// output: 49
console.log(EX21_2.Dr(2));
// output: 30.4
console.log(EX21_2.Pr(85));
// output: 53.599999999999994

// EX.22
let EX22 = new Statistics([5,7,10,14,15],[1,3,5,4,2]);
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
let EX23 = new Statistics([],[5,9,12,8,11,15],[21,30,31,40,41,50,51,60,61,70,71,80]);
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
let EX24 = new my_stats([10,5,4,9,12,15,7,18]);
console.log(EX24.Qr(3));
// output: 14.25
console.log(EX24.Dr(2));
// output: 4.8
console.log(EX24.Pr(65));
// output: 11.7

// EX.25
let EX25 = new my_stats([40,42,45,46,48,50,54,56],[4,6,10,9,9,5,5,3]);
console.log(EX25.Qr(2));
// output: 46
console.log(EX25.Dr(3));
// output: 45
console.log(EX25.Pr(74));
// output: 50

// EX.26
let EX26_1 = new my_stats([],[6,10,14,8,2],[2,5,6,9,10,13,14,17,18,21]);
console.log(EX26_1.Qr(2));
// output: 10.642857142857142
console.log(EX26_1.Dr(3));
// output: 7.9
console.log(EX26_1.Pr(81));
// output: 14.7
let EX26_2 = new Statistics([],[6,10,14,8,2],[2,5,6,9,10,13,14,17,18,21]);
console.log(EX26_2.Qr(2));
// output: ตำแหน่งควอร์ไทล์ Q2 = 20 
//         ค่าของควอร์ไทล์ Q2 = 10.64
console.log(EX26_2.Dr(3));
// output: ตำแหน่งเดไซล์ D3 = 12 
//         ค่าของเดไซล์ D3 = 7.90
console.log(EX26_2.Pr(81));
// output: ตำแหน่งเปอร์เซนต์ไทล์ P81 = 32.4 
//         ค่าของเปอร์เซนต์ไทล์ P81 = 14.70

// EX.27  
let EX27_1 = new Statistics([2,7,5,4,9]);
console.log(EX27_1.Range());
// output: พิสัย = 7
let EX27_2 = new Statistics([9,11,15,16,10,19,8,21]);
console.log(EX27_2.Range());
// output: พิสัย = 13
let EX27_3 = new Statistics([20,35,38,10,16,7,76]);
console.log(EX27_3.Range());
// output: พิสัย = 69
let EX27_4 = new Statistics([23,45,12,95,63,56,78,10]);
console.log(EX27_4.Range());
// output: พิสัย = 85

// EX.28  
let EX28 = new Statistics([],[2,6,9,3],[21,30,31,40,41,50,51,60]);
console.log(EX28.Range());
// output: พิสัย = 40

// EX.29
let EX29 = new Statistics([],[8,27,42,18,5],[72,74,69,71,66,68,63,65,60,62]);
console.log(EX29.Range());
// output: พิสัย = 15

// EX.30
let EX30 = new Statistics([42,50,55,58,59,61,63,63,63,68,69,70,70,71,71,71,71,76,82,88]);
console.log(EX30.Range());
// output: พิสัย = 46
console.log(EX30.Quartile_deviation());
// output: ส่วนเบี่ยงเบนควอร์ไทล์ Q.D. = 5.75

// EX.31
let EX31 = new Statistics([10,12,17,25,28,32,36,42,50,54]);
console.log(EX31.Quartile_deviation());
// output: ส่วนเบี่ยงเบนควอร์ไทล์ Q.D. = 14.13

// EX.32
let EX32 = new Statistics([10,13,15,20,24],[8,5,4,12,3]);
console.log(EX32.Quartile_deviation());
// output: ส่วนเบี่ยงเบนควอร์ไทล์ Q.D. = 4.63
console.log(new my_stats([10,13,15,20,24],[8,5,4,12,3]).Quartile_deviation());
// output: 4.625

// EX.33
let EX33_1 = new Statistics([],[2,6,10,15,12,6,3],[40,44,45,49,50,54,55,59,60,64,65,69,70,74]);
console.log(EX33_1.Quartile_deviation());
// output: ส่วนเบี่ยงเบนควอร์ไทล์ Q.D. = 5.19
let EX33_2 = new my_stats([],[2,6,10,15,12,6,3],[40,44,45,49,50,54,55,59,60,64,65,69,70,74]);
console.log(EX33_2.Quartile_deviation());
// output: 5.1875

// EX.34
let EX34 = new Statistics([],[3,7,16,12,2],[10,14,15,19,20,24,25,29,30,34]);
console.log(EX34.Range());
// output: พิสัย = 25
console.log(EX34.Quartile_deviation());
// output: ส่วนเบี่ยงเบนควอร์ไทล์ Q.D. = 3.34
console.log(new my_stats([],[3,7,16,12,2],[10,14,15,19,20,24,25,29,30,34]).Quartile_deviation());
// output: 3.333333333333334

// EX.35
let EX35 = new Statistics([12,15,35,27,19]);
console.log(EX35.Mean_deviation());
// output: ส่วนเบี่ยงเบนเฉลี่ย M.D. = 7.52

//EX.36
let EX36 = new Statistics([10,13,15,17,19,20],[7,5,12,10,5,1]);
console.log(EX36.Mean_deviation());
// output: ส่วนเบี่ยงเบนเฉลี่ย M.D. = 2.25

// EX.37
let EX37 = new Statistics([],[3,5,7,8,4,3],[10,14,15,19,20,24,25,29,30,34,35,39]);
console.log(EX37.Mean_deviation());
// output: ส่วนเบี่ยงเบนเฉลี่ย M.D. = 6.00

// EX.38
let EX38 = new Statistics([16,11,10,14,19]);
console.log(EX38.Mean_deviation());
// output: ส่วนเบี่ยงเบนเฉลี่ย M.D. = 2.80

// EX.39
let EX39 = new Statistics([40,42,45,50,55],[15,25,20,24,16]);
console.log(EX39.Mean_deviation());
// output: ส่วนเบี่ยงเบนเฉลี่ย M.D. = 4.56

// EX.40
let EX40 = new Statistics([],[10,18,42,27,3],[60,62,63,65,66,68,69,71,72,74]);
console.log(EX40.Mean_deviation());
// output: ส่วนเบี่ยงเบนเฉลี่ย M.D. = 2.20

// EX.41
let EX41 = new Statistics([5,5,6,7,8]);
console.log(EX41.Standard_deviation());
// output: ส่วนเบี่ยงเบนเฉลี่ยมาตราฐาน S.D. = 1.17

// EX.42
let EX42 = new Statistics([13,16,22,10,15,20]);
console.log(EX42.Standard_deviation());
// output: ส่วนเบี่ยงเบนเฉลี่ยมาตราฐาน S.D. = 4.04

// EX.43
let EX43 = new Statistics([10,13,15,20,24],[2,3,9,4,2]);
console.log(EX43.Standard_deviation());
// output: ส่วนเบี่ยงเบนเฉลี่ยมาตราฐาน S.D. = 3.87

// EX.44
let EX44_1 = new Statistics([],[6,16,22,26,14,12,4],[40,44,45,49,50,54,55,59,60,64,65,69,70,74]);
console.log(EX44_1.Standard_deviation());
// output: ส่วนเบี่ยงเบนเฉลี่ยมาตราฐาน S.D. = 7.63
let EX44_2 = new my_stats([],[6,16,22,26,14,12,4],[40,44,45,49,50,54,55,59,60,64,65,69,70,74]);
console.log(EX44_2.Standard_deviation());
// output: 7.634788798650554

// EX.45
let array2:number[] =  [2,4,6,8,10];
let EX45_1 = new Statistics(array2);
console.log(EX45_1.Standard_deviation());
// output: ส่วนเบี่ยงเบนเฉลี่ยมาตราฐาน S.D. = 2.83
let EX45_2 = new Statistics(array2.map((x:number) => x + 3));
console.log(EX45_2.Standard_deviation());
// output: ส่วนเบี่ยงเบนเฉลี่ยมาตราฐาน S.D. = 2.83

// EX.46
let array3:number[] =  [3,5,6,9,12];
let EX46_1 = new Statistics(array3);
console.log(EX46_1.Standard_deviation());
// output: ส่วนเบี่ยงเบนเฉลี่ยมาตราฐาน S.D. = 3.16
let EX46_2 = new Statistics(array3.map((y:number) => y * 3));
console.log(EX46_2.Standard_deviation());
// output: ส่วนเบี่ยงเบนเฉลี่ยมาตราฐาน S.D. = 9.49

// EX.47
let EX47_1 = new Statistics([15,14,10,12,10,9,8,6]);
console.log(EX47_1.Standard_deviation());
// output: ส่วนเบี่ยงเบนเฉลี่ยมาตราฐาน S.D. = 2.83
let EX47_2 = new my_stats([15,14,10,12,10,9,8,6]);
console.log(EX47_2.Standard_deviation());
// output: 2.8284271247461903

// EX.48
let EX48 = new Statistics([15,15,21,25]);
console.log(EX48.Mean_deviation());
// output: ส่วนเบี่ยงเบนเฉลี่ย M.D. = 4.00
console.log(EX48.Standard_deviation());
// output: ส่วนเบี่ยงเบนเฉลี่ยมาตราฐาน S.D. = 4.24

// EX.49
let EX49 = new Statistics([15,17,20,25,30],[1,4,6,3,1]);
console.log(EX49.Mean_deviation());
// output: ส่วนเบี่ยงเบนเฉลี่ย M.D. = 3.05
console.log(EX49.Standard_deviation());
// output: ส่วนเบี่ยงเบนเฉลี่ยมาตราฐาน S.D. = 3.93
console.log(EX49.Variance());
// output: ความแปรปรวนของข้อมูล S2 = 15.45

// EX.50
let EX50 = new Statistics([20,23,27,29,30,33]);
console.log(EX50.Quartile_deviation());
// output: ส่วนเบี่ยงเบนควอร์ไทล์ Q.D. = 4.25
console.log(EX50.Mean_deviation());
// output: ส่วนเบี่ยงเบนเฉลี่ย M.D. = 3.67
console.log(EX50.Standard_deviation());
// output: ส่วนเบี่ยงเบนเฉลี่ยมาตราฐาน S.D. = 4.36

// EX.51
let EX51 = new Statistics([],[6,2,4,3,4,1],[4,6,7,9,10,12,13,15,16,18,19,21]);
console.log(EX51.Quartile_deviation());
// output: ส่วนเบี่ยงเบนควอร์ไทล์ Q.D. = 4.75
console.log(EX51.Mean_deviation());
// output: ส่วนเบี่ยงเบนเฉลี่ย M.D. = 4.20
console.log(EX51.Standard_deviation());
// output: ส่วนเบี่ยงเบนเฉลี่ยมาตราฐาน S.D. = 4.93

// EX.52
let EX52 = new Statistics([],[15,20,12,2,1],[0,2,3,5,6,8,9,11,12,14]);
console.log(EX52.Standard_deviation());
// output: ส่วนเบี่ยงเบนเฉลี่ยมาตราฐาน S.D. = 2.80
console.log(EX52.Variance());
// output: ความแปรปรวนของข้อมูล S2 = 7.86

// EX.53
let Ex53_data_A:number[] = [75,72,71,73,74,76];
let Ex53_data_B:number[] = [112,115,118,116,117,110];
const Ex53_conclusion = (A:number[] , B:number[]):void => {
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
Ex53_conclusion(Ex53_data_A , Ex53_data_B);
// output: ข้อมูลชุด A มี สัมประสิทธิ์ของพิสัย C.R = 0.034
//         ข้อมูลชุด B มี สัมประสิทธิ์ของพิสัย C.R = 0.035
//         ข้อมูล B มีการกระจายมากกว่าข้อมูล A

// EX.54
interface dataset {
    data:number[];
    classinterval:number[];
    frequency:number[]
}
let Ex54_data_A:dataset = {
    data:[],
    classinterval:[6,10,11,15,16,20,21,25,26,30],
    frequency:[4,5,10,6,2]
}
let Ex54_data_B:dataset = {
    data:[],
    classinterval:[20,24,25,29,30,34,35,39,40,44],
    frequency:[2,8,15,12,3]
}
let Ex54_data_C:dataset = {
    data:[],
    classinterval:[30,39,40,49,50,59,60,69,70,79],
    frequency:[2,3,6,4,1]
}
const Ex54_conclusion = (data_A:number[] , data_B:number[] , data_C:number[], frequency_A:number[] , frequency_B:number[] , frequency_C:number[],classinterval_A:number[] , classinterval_B:number[] , classinterval_C:number[]):void => {
        console.log('ข้อมูลชุด A มี ' + new Statistics(data_A , frequency_A , classinterval_A).Coefficient_of_range());
        console.log('ข้อมูลชุด B มี ' + new Statistics(data_B , frequency_B , classinterval_B).Coefficient_of_range());
        console.log('ข้อมูลชุด C มี ' + new Statistics(data_C , frequency_C , classinterval_C).Coefficient_of_range());
    const analyze_data:{ a:number , b:number , c:number} =  {
        a:new my_stats(data_A , frequency_A , classinterval_A).Coefficient_of_range(),
        b:new my_stats(data_B , frequency_B , classinterval_B).Coefficient_of_range(),
        c:new my_stats(data_C , frequency_C , classinterval_C).Coefficient_of_range()
    }
    if(analyze_data.a > analyze_data.b  && analyze_data.a > analyze_data.c && analyze_data.b > analyze_data.c){
        console.log(`ข้อมูล A มีการกระจายมากกว่าข้อมูล B และ ข้อมูล B มีการกระจายมากกว่าข้อมูล C`);
    } else if(analyze_data.a > analyze_data.b && analyze_data.a > analyze_data.c && analyze_data.c > analyze_data.b ){
        console.log(`ข้อมูล A มีการกระจายมากกว่าข้อมูล C และ ข้อมูล C มีการกระจายมากกว่าข้อมูล B`);
    } else if(analyze_data.b > analyze_data.a &&  analyze_data.b > analyze_data.c && analyze_data.a > analyze_data.c){
        console.log(`ข้อมูล B มีการกระจายมากกว่าข้อมูล A และ ข้อมูล A มีการกระจายมากกว่าข้อมูล C`);
    } else if(analyze_data.b > analyze_data.a &&  analyze_data.b > analyze_data.c && analyze_data.c > analyze_data.a){
        console.log(`ข้อมูล B มีการกระจายมากกว่าข้อมูล C และ ข้อมูล C มีการกระจายมากกว่าข้อมูล A`);
    } else if(analyze_data.c > analyze_data.a &&  analyze_data.c > analyze_data.b && analyze_data.a > analyze_data.b){
        console.log(`ข้อมูล C มีการกระจายมากกว่าข้อมูล A และ ข้อมูล A มีการกระจายมากกว่าข้อมูล B`);
    } else if(analyze_data.c > analyze_data.a &&  analyze_data.c > analyze_data.b && analyze_data.b > analyze_data.a){
        console.log(`ข้อมูล C มีการกระจายมากกว่าข้อมูล B และ ข้อมูล B มีการกระจายมากกว่าข้อมูล A`);
    }
}
Ex54_conclusion(Ex54_data_A.data , Ex54_data_B.data , Ex54_data_C.data , Ex54_data_A.frequency , Ex54_data_B.frequency , Ex54_data_C.frequency, Ex54_data_A.classinterval , Ex54_data_B.classinterval , Ex54_data_C.classinterval);
// output: ข้อมูลชุด A มี สัมประสิทธิ์ของพิสัย C.R = 0.694
//         ข้อมูลชุด B มี สัมประสิทธิ์ของพิสัย C.R = 0.391
//         ข้อมูลชุด C มี สัมประสิทธิ์ของพิสัย C.R = 0.459
//         ข้อมูล A มีการกระจายมากกว่าข้อมูล C และ ข้อมูล C มีการกระจายมากกว่าข้อมูล B

// Ex.55
let Ex55_data_A:number[] = [51,54,56,58,59,59,60,65,69,87];
let Ex55_data_B:number[] = [64,66,69,70,70,71,75,85];
const Ex55_conclusion = (A:number[] , B:number[]):void => {
        console.log('ข้อมูลชุด A มี ' + new Statistics(A).Coefficient_of_quartile_deviation());
        console.log('ข้อมูลชุด B มี ' + new Statistics(B).Coefficient_of_quartile_deviation());    
    const analyze_data:{ a:number , b:number } =  {
        a:new my_stats(A).Coefficient_of_quartile_deviation(),
        b:new my_stats(B).Coefficient_of_quartile_deviation(),
    }
    if(analyze_data.a > analyze_data.b){
        console.log(`ข้อมูล A มีการกระจายมากกว่าข้อมูล B`);
    } else if(analyze_data.a < analyze_data.b){
        console.log(`ข้อมูล B มีการกระจายมากกว่าข้อมูล A`);
    }
}
Ex55_conclusion(Ex55_data_A , Ex55_data_B);
// output: ข้อมูลชุด A มี สัมประสิทธิ์องส่วนเบี่ยงเบนควอร์ไทล์ C.QD = 0.0864
//         ข้อมูลชุด B มี สัมประสิทธิ์องส่วนเบี่ยงเบนควอร์ไทล์ C.QD = 0.0515
//         ข้อมูล A มีการกระจายมากกว่าข้อมูล B

// Ex.56
let EX56_data:number[] = []
let EX56_classinterval:number[] = [140,144,145,149,150,154,155,159,160,164,165,169,170,174]
let Ex56_frequency_A:number[] = [2,4,10,13,16,9,6];
let Ex56_frequency_B:number[] = [1,4,6,9,5,3,2];
const Ex56_conclusion = (data:number[] , classinterval:number[] ,  A:number[] , B:number[]):void => {
        console.log('ข้อมูลชุด A มี ' + new Statistics(data , A , classinterval).Coefficient_of_quartile_deviation());
        console.log('ข้อมูลชุด B มี ' + new Statistics(data , B , classinterval).Coefficient_of_quartile_deviation());    
    const analyze_data:{ a:number , b:number } =  {
        a:new my_stats(data , A , classinterval).Coefficient_of_quartile_deviation(),
        b:new my_stats(data , B , classinterval).Coefficient_of_quartile_deviation(),
    }
    if(analyze_data.a > analyze_data.b){
        console.log(`ข้อมูล A มีการกระจายมากกว่าข้อมูล B`);
    } else if(analyze_data.a < analyze_data.b){
        console.log(`ข้อมูล B มีการกระจายมากกว่าข้อมูล A`);
    }
}
Ex56_conclusion(EX56_data , EX56_classinterval , Ex56_frequency_A , Ex56_frequency_B);
// output: ข้อมูลชุด A มี สัมประสิทธิ์องส่วนเบี่ยงเบนควอร์ไทล์ C.QD = 0.0330
//         ข้อมูลชุด B มี สัมประสิทธิ์องส่วนเบี่ยงเบนควอร์ไทล์ C.QD = 0.0332
//         ข้อมูล B มีการกระจายมากกว่าข้อมูล A

// Ex.57
let Ex57_data_A:number[] = [40,44,55,62,48,51];
let Ex57_data_B:number[] = [65,68,75,81,69,86];
const Ex57_conclusion = (A:number[] , B:number[]):void => {
        console.log('ข้อมูลชุด A มี ' + new Statistics(A).Coefficient_of_mean_deviation());
        console.log('ข้อมูลชุด B มี ' + new Statistics(B).Coefficient_of_mean_deviation());    
    const analyze_data:{ a:number , b:number } =  {
        a:new my_stats(A).Coefficient_of_mean_deviation(),
        b:new my_stats(B).Coefficient_of_mean_deviation(),
    }
    if(analyze_data.a > analyze_data.b){
        console.log(`ข้อมูล A มีการกระจายมากกว่าข้อมูล B`);
    } else if(analyze_data.a < analyze_data.b){
        console.log(`ข้อมูล B มีการกระจายมากกว่าข้อมูล A`);
    }
}
Ex57_conclusion(Ex57_data_A , Ex57_data_B);
// output: ข้อมูลชุด A มี สัมประสิทธิ์ของส่วนเบี่ยงเบนเฉลี่ย C.MD = 0.120
//         ข้อมูลชุด B มี สัมประสิทธิ์ของส่วนเบี่ยงเบนเฉลี่ย C.MD = 0.090
//         ข้อมูล A มีการกระจายมากกว่าข้อมูล B

// Ex.58
let Ex58_data_A:number[] = [40,44,55,62,48,51];
let Ex58_data_B:number[] = [65,68,75,81,69,86];
const Ex58_conclusion = (A:number[] , B:number[]):void => {
        console.log('ข้อมูลชุด A มี ' + new Statistics(A).Coefficient_of_deviation());
        console.log('ข้อมูลชุด B มี ' + new Statistics(B).Coefficient_of_deviation());    
    const analyze_data:{ a:number , b:number } =  {
        a:new my_stats(A).Coefficient_of_deviation(),
        b:new my_stats(B).Coefficient_of_deviation(),
    }
    if(analyze_data.a > analyze_data.b){
        console.log(`ข้อมูล A มีการกระจายมากกว่าข้อมูล B`);
    } else if(analyze_data.a < analyze_data.b){
        console.log(`ข้อมูล B มีการกระจายมากกว่าข้อมูล A`);
    }
}
Ex58_conclusion(Ex58_data_A , Ex58_data_B);
// output: ข้อมูลชุด A มี สัมประสิทธิ์ของการแปรผัน C.SD = 0.144
//         ข้อมูลชุด B มี สัมประสิทธิ์ของการแปรผัน C.SD = 0.101
//         ข้อมูล A มีการกระจายมากกว่าข้อมูล B