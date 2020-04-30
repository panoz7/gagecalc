import {gageCalc} from './gage-calc.js'

const inputMeasurementField = document.getElementById('input-measurement');
const processButton = document.getElementById('process-measurement');
const outputNode = document.getElementById('output');

processButton.addEventListener('click', processMeasurement);

function processMeasurement() {
    const input = inputMeasurementField.value;
    if (input) {
        const measurement = Number(input);
        const gages = gageCalc(measurement);
        outputGages(outputNode, gages);
    }

}

function outputGages(node, gages) {
    node.innerHTML = "";

    gages.forEach(gage => {
        const li = document.createElement('li');
        li.innerHTML = gage;
        node.appendChild(li);
    })


}