# สถิติ
<header ><h4 align="center">การหาค่าทางสถิติหาได้ 2 แบบคือแบบแจกแจงความถี่ และ แบบไม่แจกแจกความถี่</h4></header>

### ติดตั้งโปรเจคนี้ 

<code> git clone https://github.com/VarinCode/statistics.git</code> <br/>


### เรียกใช้งานไฟล์ module  

```
import { Statistics } from "./main"; // สำหรับใช้งานทั่วไป
import { my_stats } from "./apply"; // สำหรับต้องการหาค่าที่แท้จริงค่าจริงๆ

```

### ตัวอย่างการใช้งานโปรแกรม

```
let EX1 = new my_stats([8,9,5,7,11,10,12,9,10]);
console.log(EX1.Mean());
// output: 9
console.log(EX1.Median());
// output: 9
console.log(EX1.Mode());
// output: 9 , 10

```
