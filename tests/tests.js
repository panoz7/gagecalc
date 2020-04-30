import {gageCalc, isValidGage, toNoDecimal, isValidMeasurement} from './gage-calc.js'
import {randomNum} from './helper.js';

const gages = [
    .0500,
    .1001,
    .1002,
    .1003,
    .1004,
    .1005,
    .1006,
    .1007,
    .1008,
    .1009,
    .100,
    .101,
    .102,
    .103,
    .104,
    .105,
    .106,
    .107,
    .108,
    .109,
    .110,
    .111,
    .112,
    .113,
    .114,
    .115,
    .116,
    .117,
    .118,
    .119,
    .120,
    .121,
    .122,
    .123,
    .124,
    .125,
    .126,
    .127,
    .128,
    .129,
    .130,
    .132,
    .133,
    .134,
    .135,
    .136,
    .137,
    .138,
    .139,
    .140,
    .142,
    .143,
    .144,
    .145,
    .146,
    .147,
    .148,
    .149,
    .150,
    .200,
    .250,
    .300,
    .350,
    .400,
    .450,
    .500,
    .550,
    .600,
    .650,
    .700,
    .750,
    .800,
    .850,
    .900,
    .950,
    1.000,
    2.000,
    3.000,
    4.000
];

const groupedGages = [

    [
        .1001,
        .1002,
        .1003,
        .1004,
        .1005,
        .1006,
        .1007,
        .1008,
        .1009
    ],
    [
        .100,
        .101,
        .102,
        .103,
        .104,
        .105,
        .106,
        .107,
        .108,
        .109,
        .110,
        .111,
        .112,
        .113,
        .114,
        .115,
        .116,
        .117,
        .118,
        .119,
        .120,
        .121,
        .122,
        .123,
        .124,
        .125,
        .126,
        .127,
        .128,
        .129,
        .130,
        .132,
        .133,
        .134,
        .135,
        .136,
        .137,
        .138,
        .139,
        .140,
        .142,
        .143,
        .144,
        .145,
        .146,
        .147,
        .148,
        .149,
    ],
    [
        .150,
        .200,
        .250,
        .300,
        .350,
        .400,
        .450,
        .500,
        .550,
        .600,
        .650,
        .700,
        .750,
        .800,
        .850,
        .900,
        .950
    ],
    [
        1.000,
        2.000,
        3.000,
        4.000
    ]
];


// Test isValidGage
const isValidGageTest = gages.reduce((passes, cur) => {
    if (!isValidGage(toNoDecimal(cur))) {
        return false;
    }
    return passes;
}, true)

console.log('isValidGage:\t', isValidGageTest ? 'passed' : 'failed')


let checkRandomGageTest = true;
for (let i = 0; i < 100000; i++) {
    if (!checkRandomGages()) {
        checkRandomGageTest = false;
    }
}

console.log('checkRandomGage:', checkRandomGageTest ? 'passed' : 'failed')

let checkMeasurementTest = true;
for (let i = 1000; i < 110000; i++) {

    if (isValidMeasurement(i)) {
        const measurment = Number((i/10000).toFixed(4));
        const gages = gageCalc(measurment);
        const gageTotal = Number(gages.reduce((sum,cur) => sum + cur).toFixed(4));
        if (gageTotal !== measurement) {
            checkMeasurementTest = false;
        }
    }
}

console.log('checkMeasurement:', checkMeasurementTest ? 'passed' : 'failed')



function checkRandomGages() {

    let randomGages = [];

    for (let gageGroup of groupedGages) {
        let randomKey = randomNum(-1,gageGroup.length -1);
        if (randomKey >= 0) {
            randomGages.push(gageGroup[randomKey])
        }
    }

    if (randomGages.length == 0) {
        randomGages.push(.1);
    }
    
    const randomGageTotal = Number(randomGages.reduce((sum,cur) => sum + cur).toFixed(4));
    const gageTest = gageCalc(randomGageTotal);
    const gageTestTotal = Number(gageTest.reduce((sum,cur) => sum + cur).toFixed(4));

    if (gageTestTotal != randomGageTotal) {
        console.log(randomGageTotal, randomGages, gageTest)
        return false; 
    }

    if (gageTestTotal.length > randomGages.length) {
        console.log(randomGageTotal, randomGages, gageTest)
        return false;
    }    

    return true;
}







