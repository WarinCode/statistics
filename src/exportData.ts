import fs from 'fs';

export interface dataStructure {
    readonly example1: {
        readonly set1: { readonly data: number[], readonly weight: number[] },
        readonly set2: { readonly data: number[] },
        readonly set3: { readonly data: number[], readonly frequency: number[] },
        readonly set4: { readonly classInterval: number[], readonly frequency: number[] },
        readonly set5: { readonly data: number[], readonly weight: number[] }
    },
    readonly example2: {
        readonly set1: { readonly data: number[] },
        readonly set2: { readonly data: number[] },
        readonly set3: { readonly data: number[], readonly frequency: number[] },
        readonly set4: { readonly classInterval: number[], readonly frequency: number[] }
    },
    readonly example3: {
        readonly set1: { readonly data: number[] },
        readonly set2: { readonly data: number[] },
        readonly set3: { readonly data: number[] },
        readonly set4: { readonly classInterval: number[], readonly frequency: number[] },
        readonly set5: { readonly classInterval: number[], readonly frequency: number[] },
        readonly set6: { readonly classInterval: number[], readonly frequency: number[] }
    },
    readonly example4: {
        readonly set1: { readonly data: number[] },
        readonly set2: { readonly data: number[] },
        readonly set3: { readonly data: number[] },
        readonly set4: { readonly data: number[] },
        readonly set5: { readonly classInterval: number[], readonly frequency: number[] },
        readonly set6: { readonly data: number[] },
        readonly set7: { readonly data: number[] },
        readonly set8: { readonly data: number[] },
        readonly set9: { readonly data: number[], readonly frequency: number[] }
    },
    readonly example5: {
        readonly set1: { readonly data: number[] },
        readonly set2: { readonly data: number[], readonly frequency: number[] },
        readonly set3: { readonly data: number[] },
        readonly set4: { readonly data: number[] },
        readonly set5: { readonly data: number[], readonly frequency: number[] },
        readonly set6: { readonly data: number[], readonly frequency: number[] },
        readonly set7: { readonly classInterval: number[], readonly frequency: number[] },
        readonly set8: { readonly classInterval: number[], readonly frequency: number[] }
    },
    readonly example6: {
        readonly set1: { readonly classInterval: number[], readonly frequency: number[] },
        readonly set2: { readonly classInterval: number[], readonly frequency: number[] },
        readonly set3: {
            readonly classInterval: number[],
            readonly frequency1: number[],
            readonly frequency2: number[]
        },
        readonly set4: { readonly data1: number[], readonly data2: number[], readonly data3: number[], readonly data4: number[] },
        readonly set5: { readonly classInterval: number[], readonly frequency: number[] },
        readonly set6: { readonly classInterval: number[], readonly frequency: number[] },
        readonly set7: { readonly classInterval: number[], readonly frequency: number[] },
        readonly set8: { readonly data: number[] },
        readonly set9: { readonly data: number[], readonly frequency: number[] },
        readonly set10: { readonly classInterval: number[], readonly frequency: number[] }
    },
    readonly example7: {
        readonly set1: { readonly data: number[] },
        readonly set2: { readonly data: number[], readonly frequency: number[] },
        readonly set3: { readonly classInterval: number[], readonly frequency: number[] },
        readonly set4: { readonly data: number[] },
        readonly set5: { readonly data: number[], readonly frequency: number[] },
        readonly set6: { readonly classInterval: number[], readonly frequency: number[] }
    },
    readonly example8: {
        readonly set1: { readonly data: number[] },
        readonly set2: { readonly data: number[], readonly frequency: number[] },
        readonly set3: { readonly classInterval: number[], readonly frequency: number[] },
        readonly set4: { readonly data: number[] },
        readonly set5: { readonly data: number[] },
        readonly set6: { readonly data: number[] },
        readonly set7: { readonly data: number[] },
        readonly set8: { readonly data: number[], readonly frequency: number[] },
        readonly set9: { readonly classInterval: number[], readonly frequency: number[] },
        readonly set10: { readonly data: number[] },
        readonly set11: { readonly data: number[] }
    },
    readonly example9: {
        readonly set1: { readonly data: number[], readonly frequency: number[] },
        readonly set2: { readonly classInterval: number[], readonly frequency: number[] },
        readonly set3: { readonly classInterval: number[], readonly frequency: number[] },
        readonly set4: { readonly dataA: number[], readonly dataB: number[] },
        readonly set5: {
            readonly dataA: {
                readonly classInterval: number[],
                readonly frequency: number[]
            },
            readonly dataB: {
                readonly classInterval: number[],
                readonly frequency: number[]
            },
            readonly dataC: {
                readonly classInterval: number[],
                readonly frequency: number[]
            }
        },
        readonly set6: { readonly dataA: number[], readonly dataB: number[] },
        readonly set7: {
            readonly classInterval: number[],
            readonly frequencyA: number[],
            readonly frequencyB: number[]
        },
        readonly set8: { readonly dataA: number[], readonly dataB: number[] },
        readonly set9: { readonly dataA: number[], readonly dataB: number[] }

    }
}

const fileData: Buffer = fs.readFileSync('./src/data.json');
const data: dataStructure = JSON.parse(fileData.toString());

export { data };
