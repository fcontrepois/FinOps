import { logger } from 'logger';

function elaborateCommitment() {
    const startDate = $.datePicker.value;
    const monthsToAdd = parseInt($.numberOfMonths.value);
    const listPrice = parseFloat($.listPrice.value);
    const discountedPrice = parseFloat($.discountedPrice.value);

    const endDate = calculateEndDate(startDate, monthsToAdd);
    const hoursDifference = calculateHoursBetweenDates(startDate, monthsToAdd);
    const discountInPc = calculateCommitmentDiscount(listPrice, discountedPrice);
    const breakevenDate = calculateBreakevenDate(discountInPc, startDate, hoursDifference)

var items = [];


    if (!isNaN(hoursDifference)) {
        items.push({
            title: {text: "Committed hours"},
            detail: {text: hoursDifference},
            template: "MyCustomTemplate"
         })
    }

    if (!isNaN(discountInPc)){
        items.push({
            title: {text: "Discount in %"},
            detail: {text: `${discountInPc * 100}%`},
            template: "MyCustomTemplate"
         })
    }
        
    if(!isInvalidDate(endDate)){
        items.push({
            title: {text: "End of commitment"},
            detail: {text: `${endDate.toISOString().split('T')[0]}`},
            template: "MyCustomTemplate"
         })
    }

    if(!isInvalidDate(breakevenDate) || (discountInPc<=0)){
        items.push({
            title: {text: "Breakeven date"},
            detail: {text: `${breakevenDate.toISOString().split('T')[0]}`},
            template: "MyCustomTemplate"
         })
    }
    $.myListView.sections[0].setItems(items);
}

function calculateCommitmentDiscount(listPrice, discountedPrice) {
    if(isNaN(listPrice) || isNaN(discountedPrice)){ return NaN} ;
    const discountinpc = (1 - discountedPrice / listPrice).toFixed(2);
    return discountinpc;
}

function calculateHoursBetweenDates(originalDate, monthsToAdd) {
    // Create a date object for the original date
    const startDate = new Date(originalDate);

    // Create a new date object by adding the specified months
    const endDate = calculateEndDate(startDate, monthsToAdd)

    // Calculate the time difference in milliseconds
    const timeDifferenceMs = endDate - startDate;

    // Convert milliseconds to hours
    const hoursDifference = timeDifferenceMs / (1000 * 60 * 60);

    return hoursDifference;
}

function calculateEndDate(originalDate, monthsToAdd) {
    
    // Create a date object for the original date
    const startDate = new Date(originalDate);
    const hoursToAdd = monthsToAdd * 730;

    // Create a new date object by adding the specified months
    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + hoursToAdd);

    return endDate;
}

function calculateBreakevenDate(pcDiscount, originalDate, hoursDifference) {
    if(isNaN(pcDiscount)){ return NaN };
    if(isNaN(hoursDifference)){ return NaN };

    const hoursToBreakeven = hoursDifference * pcDiscount;
    const returnDate = new Date(originalDate);
    returnDate.setHours(returnDate.getHours() + hoursToBreakeven);
    return returnDate;
}

function isInvalidDate(date) {
    const tDate = new Date(date);
    return isNaN(tDate.getTime());
}