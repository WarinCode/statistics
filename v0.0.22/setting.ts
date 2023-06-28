import { Config } from "./main";

//? การตั้งค่าพื้นฐานของโปรแกรมสามารถเปลี่ยนค่า true หรือ fasle ใน Object ได้เลย
//? Object นี้จะถูกส่งไปยัง class Setting และใช้คำสั่ง super ใน class Statistics เพื่อส่ง Object นี้ให้ superclass อ่าน 
export const setting: Config = {
    displayText: true,  //* true -> แสดงข้อความ , false -> ไม่แสดงข้อความ(แสดงแค่ตัวเลขอย่างเดียว)
    decimal: true,      //* true -> ผลลัพธ์การคำนวณจะเป็นเลขทศนิยม(มีการปัดทศนิยม 2 , 3 ,4 ตำแหน่ง) , false -> ผลลัพธ์การคำนวณเป็นจำนวนเต็ม
    usingConsole: false, //* true -> ใช้คำสั่ง console เพื่อแสดงข้อมูล , false -> ไม่ต้องใช้คำสั่ง console เพื่อแสดงข้อมูล
};