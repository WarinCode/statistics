import Statistics from "../main";
import Extension from "../plugin/extensions";

let status = true;
async function testProgram(): Promise<void> {
    const arr = new Extension([], []).generateNumbers(10,'h');
    const stat =  new Statistics(arr);
    try {
        console.group('เริ่มทำการทดสอบโปรแกรม');
        stat.showData();
        console.log(stat.mean());
        console.log(stat.median());
        console.log(stat.mode());
        console.log(stat.range());
        console.log(stat.quartileDeviation());
        console.log(stat.meanDeviation());
        console.log(stat.standardDeviation());
        console.groupEnd();
    } catch (err: unknown) {
        status = !status;
        throw err;
    }
}
testProgram().finally(() => {
    if (status) console.log('ทดสอบโปรแกรมเสร็จสิ้นโปรแกรมพร้อมใช้งาน');
    else if (status) console.error('ทดสอบโปรแกรมเสร็จสิ้นโปรแกรมยังไม่พร้อมใช้งาน');
})