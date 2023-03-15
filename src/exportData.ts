import fs from 'fs';

export interface dataStructure {
    example1: {
        set1: { data: number[], weight: number[] },
        set2: { data: number[] },
        set3: { data: number[], frequency: number[] },
        set4: { classInterval: number[], frequency: number[] },
        set5: { data: number[], weight: number[] }
    },
    example2: {
        set1: { data: number[] },
        set2: { data: number[] },
        set3: { data: number[], frequency: number[] },
        set4: { classInterval: number[], frequency: number[] }
    },
    example3: {
        set1: { data: number[] },
        set2: { data: number[] },
        set3: { data: number[] },
        set4: { classInterval: number[], frequency: number[] },
        set5: { classInterval: number[], frequency: number[] },
        set6: { classInterval: number[], frequency: number[] }
    },
    example4: {
        set1: { data: number[] },
        set2: { data: number[] },
        set3: { data: number[] },
        set4: { data: number[] },
        set5: { classInterval: number[], frequency: number[] },
        set6: { data: number[] },
        set7: { data: number[] },
        set8: { data: number[] },
        set9: { data: number[], frequency: number[] }
    },
    example5: {
        set1: { data: number[] },
        set2: { data: number[], frequency: number[] },
        set3: { data: number[] },
        set4: { data: number[] },
        set5: { data: number[], frequency: number[] },
        set6: { data: number[], frequency: number[] },
        set7: { classInterval: number[], frequency: number[] },
        set8: { classInterval: number[], frequency: number[] }
    },
    example6: {
        set1: { classInterval: number[], frequency: number[] },
        set2: { classInterval: number[], frequency: number[] },
        set3: {
            classInterval: number[],
            frequency1: number[],
            frequency2: number[]
        },
        set4: { data1: number[], data2: number[], data3: number[], data4: number[] },
        set5: { classInterval: number[], frequency: number[] },
        set6: { classInterval: number[], frequency: number[] },
        set7: { classInterval: number[], frequency: number[] },
        set8: { data: number[] },
        set9: { data: number[], frequency: number[] },
        set10: { classInterval: number[], frequency: number[] }
    },
    example7: {
        set1: { data: number[] },
        set2: { data: number[], frequency: number[] },
        set3: { classInterval: number[], frequency: number[] },
        set4: { data: number[] },
        set5: { data: number[], frequency: number[] },
        set6: { classInterval: number[], frequency: number[] }
    },
    example8: {
        set1: { data: number[] },
        set2: { data: number[], frequency: number[] },
        set3: { classInterval: number[], frequency: number[] },
        set4: { data: number[] },
        set6: { data: number[] },
        set7: { data: number[] },
        set8: { data: number[] },
        set9: { data: number[], frequency: number[] },
        set10: { classInterval: number[], frequency: number[] },
        set11: { data: number[] },
        set12: { data: number[] }
    },
    example9: {
        set1: { data: number[], frequency: number[] },
        set2: { classInterval: number[], frequency: number[] },
        set3: { classInterval: number[], frequency: number[] },
        set4: { dataA: number[], dataB: number[] },
        set5: {
            dataA: {
                classInterval: number[],
                frequency: number[]
            },
            dataB: {
                classInterval: number[],
                frequency: number[]
            },
            dataC: {
                classInterval: number[],
                frequency: number[]
            }
        },
        set6: { dataA: number[], dataB: number[] },
        set7: {
            classInterval: number[],
            frequencyA: number[],
            frequencyB: number[]
        },
        set8: { dataA: number[], dataB: number[] },
        set9: { dataA: number[], dataB: number[] }

    }
}

const fileData: Buffer = fs.readFileSync('./src/data.json');
const data: dataStructure = JSON.parse(fileData.toString());

export default data;