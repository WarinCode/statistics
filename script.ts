import { ValentinesDay } from "./main";

(async function (love:boolean):Promise<void> {
    let date:string = new Date().toISOString();
    return await ValentinesDay(love)
        .then((res) => console.log(`${date}: "${res}"`))
        .catch((err) => console.error(err));
})(true && true);