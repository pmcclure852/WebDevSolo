// Script for hut.html

// Get callendar cells
var calCells = document.getElementsByClassName("calCell");

// Create variables for date comparisons
var now = new Date(Date.now());
var dispYear = now.getFullYear(); // Year to display
var curYear = now.getFullYear(); // The current year in the real world
var dispMonth = now.getMonth(); // Month to display
var curMonth = now.getMonth(); // The current month in the real world

// Create month labels
var monthsFull = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
    "November", "December"];

// Create array with number days of in the month
var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

// Create array with entries for which days are booked up
var booked = [
    {
        year: 2021,
        months: [   [], //jan
                    [], //feb
                    [], //mar
                    [1, 2, 3, 4], //apr
                    [5,6,7,8,15,16,17,21,22,24,2], //may
                    [1,16,2,5,6,19,22], // jun
                    [6,12,13,14,28], // jul
                    [5,6,7], // aug
                    [18,19,22,23], // sept
                    [11,12,13], // oct
                    [4,5,6,7,8,9,10], // nov
                    [21,22,23,24,25,26,30,31] // dec
        ]
    },
    {
        year: 2022,
        months: [
            [1,2,3], //jan
            [6,7,8,9], //feb
            [], //mar
            [], //apr
            [], //may
            [], // jun
            [], // jul
            [], // aug
            [], // sept
            [], // oct
            [], // nov
            [] // dec
        ]
    }
];

// Create variables for the end of the dataset
var lastYear = booked[booked.length - 1].year;
var lastMonth = booked[booked.length - 1].months.length - 1;

// Call renderCalendar
renderCalendar();


// Month navigation
// Click left arrow
document.getElementById("monthBack").onclick = function () {
    // Do nothing if at the current month
    if (dispYear === curYear && dispMonth === curMonth){
        // Do nothing!
    }
    // Change to December of previous year if at January
    else if (dispMonth === 0){
            dispMonth = 11;
            dispYear -= 1;
            renderCalendar();
    }
    // Otherwise go back a month
    else {
            dispMonth -= 1;
            renderCalendar();
    }
}

// Click right arrow
document.getElementById("monthForward").onclick = function () {
    // Do nothing if at the end of the data
    if (dispYear === lastYear && dispMonth >= lastMonth) {
        // Do nothing!
    }
    // Handle crossover to new year
    else if (dispMonth === 11) {
        dispMonth = 0;
        dispYear += 1;
        renderCalendar();
    }
    // Or go ahead one month
    else {
        dispMonth += 1;
        renderCalendar();
    }
}


function renderCalendar() {

// Display month and year
    document.getElementById("calMonth").innerHTML = monthsFull[dispMonth] + " " + dispYear;

// Add day of month labels
    for (var i = 0; i < monthDays[dispMonth]; i++) {
        calCells[i].year = dispYear;
        calCells[i].month = dispMonth;
        calCells[i].day = i + 1;
        calCells[i].innerHTML = calCells[i].id;
    }
// Add extra days from start of next month to fill the grid
    var extraDays = 1;
    for (var i = monthDays[dispMonth]; i < 35; i++) {
        // Handle crossover to new year
        if (dispMonth === 11) {
            calCells[i].year = dispYear + 1;
            calCells[i].month = 0;
        } else {
            calCells[i].year = dispYear;
            calCells[i].month = dispMonth + 1;
        }
        calCells[i].day = extraDays;
        calCells[i].innerHTML = extraDays.toString();
        extraDays += 1;
    }

// Set background colour of cells
    for (var i = 0; i < 35; i++) {
        // Create variable of current cell to compare
        var thisCellData = calCells[i];
        // Reset to green
        calCells[i].style.backgroundColor = "limegreen";
        // Check for booked dates
        for (var j = 0; j < booked.length; j++) {
            // Match year
            if (booked[j].year === thisCellData.year) {
                // Loop months
                for (var k = 0; k < booked[j].months[thisCellData.month].length; k++) {
                    // Match day
                    if (booked[j].months[thisCellData.month][k] === thisCellData.day) {
                        // Colour background red
                        calCells[i].style.backgroundColor = "red";
                        // Stop searching
                        break;
                    }
                }
            }
        }
    }
}