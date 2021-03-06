import {gageCalc} from './gage-calc'
import {gageData} from './gage-info'


const inputMeasurementField = document.getElementById('input-measurement') as HTMLInputElement;
const processButton = document.getElementById('process-measurement');
const outputNode = document.getElementById('output');
const errorNode = document.getElementById('error');

processButton.addEventListener('click', processMeasurement);

function processMeasurement() {
    const input = inputMeasurementField.value;
    if (input) {
        const measurement = Number(input);
        console.log(measurement);

        try {
            const gages = gageCalc(measurement);

            // get the full gage name and sort them by the order they appear in the case
            // we do this by filtering down the full list of gages to just those that are needed for the measurement
            // and then mapping out only their names
            const gageNames = gageData
                .filter(gage => gages.indexOf(gage.width) >= 0)
                .map(gage => gage.name)

            outputGages(outputNode, gageNames);
        }
        catch(e) {
            displayError(e);
        }

    }

}

function outputGages(node: HTMLElement, gages: string[]) {
    node.innerHTML = "";
    clearError();

    gages.forEach(gage => {
        const li = document.createElement('li');
        li.innerHTML = gage;
        node.appendChild(li);
    })
}

function displayError(e: Error) {
    outputNode.innerHTML = "";
    errorNode.innerHTML = e.message;
}

function clearError() {
    errorNode.innerHTML = "";
}