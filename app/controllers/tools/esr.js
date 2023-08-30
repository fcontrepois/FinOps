import { logger } from 'logger';

let focussedTextfield;

function calculateEsr({ source, value }) {
    logger.log(`${source.id} changed value to ${value}`);
    var odSpend = parseFloat($.onDemandSpend.value);
    var actualSpend = parseFloat($.actualSpend.value)
    let esrText = "The ESR will appear here"

    if (odSpend !== NaN && actualSpend !== NaN && odSpend >=0 && actualSpend >=0) {
        calculatedEsr = 1 - (actualSpend / odSpend)
        logger.log(`ESR is  ${calculatedEsr}`);
         esrText = "Your ESR is: "+(calculatedEsr*100).toFixed(2)+"%"
    }
    $.calculatedEsr.text = esrText
}