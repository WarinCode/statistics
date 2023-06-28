import Statistics from './main';

type n = number[]
const data:n = [];
const frequency:n = [6,16,22,26,14,12,4]
const classInterval:n = [40,44,45,49,50,54,55,59,60,64,65,69,70,74]

const Stat:Statistics = new Statistics(data , frequency , classInterval);

Stat.showTable('t6');
Stat.mean();
Stat.meanDeviation();
Stat.standardDeviation();
Stat.variance();