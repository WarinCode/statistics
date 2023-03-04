// import { Statistics } from "./main"

// /* ลองทำโจทย์สอบซ่อมกลางภาคคณิตเพิ่ม */

// // โจทย์ข้อที่ 1
// let data:number[] = [4,18,9,15,20,11,7,20];
// let problem1 = new Statistics(data);

// console.log(problem1.Showdata());
// console.log(problem1.Mean());
// console.log(problem1.Dr(7));
// console.log(problem1.Pr(35));
// console.log(problem1.Quartile_deviation());
// console.log(problem1.Mean_deviation());
// console.log(problem1.Standard_deviation());
// console.log(problem1.Coefficient_of_range());
// console.log(problem1.Coefficient_of_quartile_deviation());
// console.log(problem1.Coefficient_of_mean_deviation());
// console.log(problem1.Coefficient_of_deviation());

// /* output:
//         ข้อมูลเดิมคือ 4 18 9 15 20 11 7 20
//         เรียงข้อมูลชุดใหม่ได้ 4 7 9 11 15 18 20 20
//         ค่าเฉลี่ยเลขคณิต x̄ = 13.00
//         ตำแหน่งเดไซล์ D7 = 6.3 
//         ค่าของเดไซล์ D7 = 18.6
//         ตำแหน่งเปอร์เซนต์ไทล์ P35 = 3.15 
//         ค่าของเปอร์เซนต์ไทล์ P35 = 9.30
//         ส่วนเบี่ยงเบนควอร์ไทล์ Q.D. = 6.00
//         ส่วนเบี่ยงเบนเฉลี่ย M.D. = 5.25
//         ส่วนเบี่ยงเบนเฉลี่ยมาตราฐาน S.D. = 5.74
//         สัมประสิทธิ์ของพิสัย C.R = 0.667
//         สัมประสิทธิ์องส่วนเบี่ยงเบนควอร์ไทล์ C.QD = 0.444
//         สัมประสิทธิ์ของส่วนเบี่ยงเบนเฉลี่ย C.MD = 0.404
//         สัมประสิทธิ์ของการแปรผัน C.SD = 0.442
// */


// // โจทย์ข้อที่ 2
// let score:number[] = [3,4,6,8,10,12];
// let frequency:number[] = [2,5,2,7,1,3];
// let problem2 = new Statistics(score,frequency);

// console.log(problem2.Showfrequency());
// console.log(problem2.Mean());
// console.log(problem2.Dr(4));
// console.log(problem2.Pr(80));
// console.log(problem2.Quartile_deviation());
// console.log(problem2.Mean_deviation());
// console.log(problem2.Standard_deviation());
// console.log(problem2.Coefficient_of_range());
// console.log(problem2.Coefficient_of_quartile_deviation());
// console.log(problem2.Coefficient_of_mean_deviation());
// console.log(problem2.Coefficient_of_deviation());

// /* output:
//         ความถี่ 2 5 2 7 1 3
//         ความถี่สะสม 2 7 9 16 17 20
//         ค่าเฉลี่ยเลขคณิต x̄ = 7.00
//         ตำแหน่งเดไซล์ D4 = 8.4 
//         ค่าของเดไซล์ D4 = 6
//         ตำแหน่งเปอร์เซนต์ไทล์ P80 = 16.8 
//         ค่าของเปอร์เซนต์ไทล์ P80 = 9.60
//         ส่วนเบี่ยงเบนควอร์ไทล์ Q.D. = 2.00
//         ส่วนเบี่ยงเบนเฉลี่ย M.D. = 2.50
//         ส่วนเบี่ยงเบนเฉลี่ยมาตราฐาน S.D. = 2.92
//         สัมประสิทธิ์ของพิสัย C.R = 0.600
//         สัมประสิทธิ์องส่วนเบี่ยงเบนควอร์ไทล์ C.QD = 0.333
//         สัมประสิทธิ์ของส่วนเบี่ยงเบนเฉลี่ย C.MD = 0.357
//         สัมประสิทธิ์ของการแปรผัน C.SD = 0.416
// */


// // โจทย์ข้อที่ 3
// frequency = [2,6,5,2,3,2];
// score = [2,6,7,11,12,16,17,21,22,26,27,31];
// let problem3 = new Statistics([],frequency,score);

// problem3.Showclassinterval();
// console.log(problem3.Showfrequency());
// console.log(problem3.Mean());
// console.log(problem3.Mode());
// console.log(problem3.Median());
// console.log(problem3.Quartile_deviation());
// console.log(problem3.Mean_deviation());
// console.log(problem3.Standard_deviation());
// console.log(problem3.Coefficient_of_range());
// console.log(problem3.Coefficient_of_quartile_deviation());
// console.log(problem3.Coefficient_of_mean_deviation());
// console.log(problem3.Coefficient_of_deviation());

// /* output:
//         อันตรภาคชั้น
//         2 - 6
//         7 - 11
//         12 - 16
//         17 - 21
//         22 - 26
//         27 - 31
//         ความถี่ 2 6 5 2 3 2
//         ความถี่สะสม 2 8 13 15 18 20
//         ค่าเฉลี่ยเลขคณิต x̄ = 15.00
//         ฐานนิยม Mo = 10.50
//         ตำแหน่งมัธยฐาน = 10
//         มัธยฐาน Me = 13.50
//         ส่วนเบี่ยงเบนควอร์ไทล์ Q.D. = 6.25
//         ส่วนเบี่ยงเบนเฉลี่ย M.D. = 6.30
//         ส่วนเบี่ยงเบนเฉลี่ยมาตราฐาน S.D. = 7.52
//         สัมประสิทธิ์ของพิสัย C.R = 0.909
//         สัมประสิทธิ์องส่วนเบี่ยงเบนควอร์ไทล์ C.QD = 0.410
//         สัมประสิทธิ์ของส่วนเบี่ยงเบนเฉลี่ย C.MD = 0.420
//         สัมประสิทธิ์ของการแปรผัน C.SD = 0.501
// */
