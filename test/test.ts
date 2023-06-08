import Statistics from "../main";
import Extension from "../plugin/extensions";
import figlet from 'figlet';

let status = true;

async function textFiglet(msg:string):Promise<void>{
    console.log(
        figlet.textSync(msg, {
          font: "Univers",
          horizontalLayout: "default",
          verticalLayout: "default",
          width: 160,
          whitespaceBreak: true,
        })
      );
}

async function testProgram(): Promise<void> {
    const arr:number[] = new Extension([], []).generateNumbers(10,'h');
    const Stat:Statistics =  new Statistics(arr);
    try {
        textFiglet('Start Program!');
        console.group('เริ่มทำการทดสอบโปรแกรม');
        Stat.showData();
        console.log(Stat.mean());
        console.log(Stat.median());
        console.log(Stat.mode());
        console.log(Stat.range());
        console.log(Stat.quartileDeviation());
        console.log(Stat.meanDeviation());
        console.log(Stat.standardDeviation());
        console.groupEnd();
    } catch (err: unknown) {
        status = !status;
        throw err;
    }
}
testProgram()
    .finally(() => {
    if (status) {
        textFiglet('Test the program is complete, the program is ready to use.');
    } else {
        textFiglet('Test the program is complete, the program is not available yet. please try again');
    }
});
