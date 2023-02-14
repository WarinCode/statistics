const ValentinesDay = async (love: boolean): Promise<string | undefined> => {
    if (love) { // love == true
        return 'ขอให้มีความสุขกับแฟนในวันนี้';
    } else if (!love) { // love == false
        throw 'ไม่มีความสุขในวันนี้';
    }
}
export { ValentinesDay };