export function gageCalc(measurement) {
    
    if (!isValidMeasurement(measurement)) {
        throw new Error(`measurement "${measurement}" not valid`);
    }

    let gages = [];
    let remaining = toNoDecimal(measurement);

    [1,100,1000,100000].forEach(place => {
        let placeResult = processPlace(remaining, place);
        remaining = placeResult.remaining;
        gages = [...gages, ...placeResult.gages];
    })

    return gages.map(toDecimal);

}


function processPlace(num, place) {
    let remaining = num; 
    let gages = [];
    
    // Check if a single gage will conver the entire measurement
    if (isValidGage(remaining)) {
        return {remaining: 0, gages: [remaining]}
    }

    // Get the value for that position
    let placeValue = getPlaceValue(num, place);

    if (place === 100 && placeValue >= 500) {
        placeValue -= 500;
    }

    if (placeValue !== 0 && place < 10000) {
        let gage = placeValue;
        if (place <= 100) {
            gage += 1000; 
        }
        gages.push(gage);
        remaining = num - gage;
    }

    if (placeValue !== 0 && place >= 10000) {
        gages = [...gages, ...splitTenThousands(placeValue)]
    }

    return {remaining, gages}
}


export function toNoDecimal(decimal) {
    return Number((decimal * 10000).toFixed(0));
}

function toDecimal(integer) {
    return integer / 10000;
}

function splitTenThousands(num) {
    let gages = [];
    let remaining = num;
    for (let i = 40000; i >= 10000; i -= 10000) {
        if (i <= remaining && remaining - i >= 0) {
            gages.push(i);
            remaining -= i;
        }
    }
    return gages;
}

export function isValidMeasurement(num) {

    // Check that it's a number and it has no more than 4 decimal places
    if (typeof num !== 'number' || getNumDecimals(num) > 4) {
        return false;
    }

    // Convert to integer to avoid floating point remainder problems
    const numNoDec = toNoDecimal(num);

    if ((numNoDec >= 1000 && numNoDec <= 1009) || (numNoDec >= 1500 && numNoDec <= 1509) || (numNoDec >= 2000 && numNoDec < 110000)) {
        return numNoDec%1 === 0;
    }

    if ((numNoDec >= 1010 && numNoDec <= 1490) || (numNoDec >= 1510 && numNoDec <= 1990)) {
        return numNoDec%10 === 0;
    }
}


function getNumDecimals(num) {
    const numString = num.toString();
    return numString.length - numString.indexOf('.') - 1;
}

function getPlaceValue(num, place) {
    return Number(num.toString().substr(-1 * (Math.log10(place) + 1)));
}


export function isValidGage(num) {

    if (num == 500 || num === 1000) {
        return true;
    }

    if (num >= 1001 && num <= 1009) {
        return num%1 === 0;
    }

    if (num >= 1010 && num <= 1490) {
        return num%10 === 0;
    }

    if (num >= 1500 && num <= 9500) {
        return num%500 === 0;
    }

    if (num >= 10000 && num <= 40000) {
        return num%10000 === 0;
    }

}

