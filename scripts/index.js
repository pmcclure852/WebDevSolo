
// All meet data, in ascending date order with dates in ISO 8601 format: YYYY-MM-DD

var allData = [
    {header: "Indoor climbing at Northwest Face", details: "An evening of sport climbing at the Northwest Face, Warrington",
        date: "2021-03-31", time: "18:00 - 22:00", image: "img/northwestface.png", alt: "Northwest Face climbing wall logo",
        tags: ["midweek", "bouldering", "sport"], price: "£8.00"},
    {header: "Trad climbing at Stanage Edge", details: "Traditional climbing at Stanage Edge, the Peak District",
        date: "2021-04-03", time: "09:00 - 18:00", image: "img/stanage.jpg", alt: "Picture of Stanage Edge rocks",
        tags: ["weekend", "bouldering", "trad"], price: "FREE"},
    {header: "Indoor climbing at the Northwest Face", details: "An evening of sport climbing at the Northwest Face, Warrington",
        date: "2021-04-07", time: "18:00 - 22:00", image: "img/northwestface.png",
        alt: "Northwest Face climbing wall logo featuring a person climbing an overhang" ,
        tags: ["midweek", "bouldering", "sport"], price: "£8.00"},
    {header: "Trad climbing at the Roaches", details: "Traditional climbing at the Roaches, the Peak District",
        date: "2021-04-10", time: "09:00 - 18:00", image: "img/roaches.jpg", alt: "Picture of the Roaches rocks",
        tags: ["weekend", "bouldering", "trad"], price: "FREE"},
    {header: "Indoor bouldering at the depot", details: "An evening of bouldering at the Depot, Manchester",
        date: "2021-04-14", time: "18:00 - 22:00", image: "img/depot.png", alt: "The Depot bouldering centre logo",
        tags: ["midweek", "bouldering", "sport"], price: "£9.00"},
    {header: "Traditional climbing at Llanberis Pass", details: "Traditional climbing at Llanberis Pass, North Wales",
        date: "2021-04-17", time: "18:00 - 22:00", image: "img/llanberis.jpg", alt: "Picture of Llanberis pass rocks",
        tags: ["weekend", "bouldering", "trad"], price: "FREE"}
]

// Create arrays to display human friendly days and months
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var monthsFull = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
    "November", "December"]

// Code for meet items on meets page
if (document.URL.includes("meets.html")){

    // Create date object for the meets template
    var now = new Date(Date.now());
    var dispMonth = now.getMonth();     // The month to display
    var curMonth = now.getMonth();      // The current month in the real world

    // Get the last month with data
    var lastMonth = new Date(allData[allData.length-1].date); // The last month that has data
    lastMonth = lastMonth.getMonth();


    // Create onclick event for filter checkboxes
    // Makes the template reload
    var checkboxes = document.getElementsByClassName("filterCheck");
    for (var i=0; i<checkboxes.length; i++) {
        checkboxes[i].onclick = function () {
            renderMeets(dispMonth)
        };
    }

    // Month navigation

    // Click left arrow
    document.getElementById("monthBack").onclick = function () {
        if (dispMonth > curMonth) {
            dispMonth -= 1;
            renderMeets(dispMonth);
            // endOfNav = false;
        }
    }
    // Click right arrow
    document.getElementById("monthForward").onclick = function () {
        // Do nothing if at the end of the data
        if (dispMonth <= lastMonth) {
            dispMonth += 1;
                renderMeets(dispMonth);
        }
    }

    renderMeets(dispMonth);
}

// Function for rendering meet boxes
function renderMeets(month) {

    // Populate current month heading
    var monthTemp = document.getElementById("monthTemplate").innerHTML;
    var compMonthTemp = Handlebars.compile(monthTemp);
    var rendMonthTemp = compMonthTemp({
        currentMonth: monthsFull[month] + " " + now.getFullYear()
    })
    document.getElementById("monthTarget").innerHTML = rendMonthTemp;

    // Get the checkboxes to check!
    var checkBoxes = document.getElementsByClassName("filterCheck")

    // Push checked id's to arrays
    var dayTypeChecked = [];
    var climbTypeChecked = [];

    for (var i=0; i<checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            if (
                checkBoxes[i].id === "midweek" ||
                checkBoxes[i].id === "weekend" ||
                checkBoxes[i].id === "multiday"
            ) {
                dayTypeChecked.push(checkBoxes[i].id);
            }
            else {
                climbTypeChecked.push(checkBoxes[i].id);
            }
        }
    }

    // Create array to store the items that match the day type
    var dayTypeMatches = [];

    // Loop the data and add to array for the relevant month
    for (var i = 0; i < allData.length; i++) {
        // Get the month of the meet
        var meetDate = new Date(Date.parse(allData[i].date));
        // Check meet matches the month we want

        if (meetDate.getMonth() === month && meetDate >= now) {
            // Loop the tags to check for day type match

            for (var j=0; j<allData[i].tags.length; j++) {
                for (var k=0; k<dayTypeChecked.length; k++){
                    if (dayTypeChecked[k] === allData[i].tags[j]) {
                        dayTypeMatches.push(allData[i]);
                        break;
                    }
                }
            }
        }
    }

    // Create array for template data
    var templateData = [];
    // Take the day type matches and loop checking for climbing type match
    // Loop through the dayTypeMatches
    for (var i=0; i<dayTypeMatches.length; i++) {
        // Create variable to stop duplicate entries for multiple matches and unnecessary looping
        var matched = false;
        // Loop through the tags
        for (var j=0; j<dayTypeMatches[i].tags.length; j++) {
            if (matched) {
                break;
            }
            // Check against the climbTypeChecked id's
            for (var k=0; k<climbTypeChecked.length; k++) {
                if (climbTypeChecked[k] === dayTypeMatches[i].tags[j]) {
                    templateData.push(dayTypeMatches[i]);
                    matched = true;
                    break;
                }
            }
        }
    }

    // Check if there is any data to fill the template
    if (templateData.length >= 1) {
        // Create meets template
        var meetsTemplate = document.getElementById("meetsTemplate").innerHTML;
        var compMeetsTemplate = Handlebars.compile(meetsTemplate);

        var meetsData = {meetsData: templateData}

        Handlebars.registerHelper("meets", function (meetsData) {
            var output = "";
            for (var i = 0; i < meetsData.length; i++) {
                var meetDateParsed = new Date(meetsData[i].date);
                output +=
                    "<div class='meetBox'>" +
                        "<img class='meetBoxImage' src='" + Handlebars.Utils.escapeExpression(meetsData[i].image) +
                        "' alt='" + Handlebars.Utils.escapeExpression(meetsData[i].alt) + "'>" +
                        "<h3>" + days[meetDateParsed.getDay()] + " " + meetDateParsed.getDate() + " " +
                        months[meetDateParsed.getMonth()] + " " + meetDateParsed.getFullYear() + "</h3>" +
                        "<h3>" + Handlebars.Utils.escapeExpression(meetsData[i].header) + "</h3>" +
                        "<p>" + Handlebars.Utils.escapeExpression(meetsData[i].time) + "</p>" +
                        "<p>" + Handlebars.Utils.escapeExpression(meetsData[i].details) + "</p>" +
                        "<p class='meetPrice'>" + Handlebars.Utils.escapeExpression(meetsData[i].price) + "</p>" +
                        "<p class='meetTags'>| ";
                //Loop to add tags
                for (var j=0; j<meetsData[i].tags.length; j++) {
                    output += Handlebars.Utils.escapeExpression(meetsData[i].tags[j]).toUpperCase() + " | ";
                }
                output += "</p></div>";
            }
            return new Handlebars.SafeString(output);
        })

        var rendMeetsTemplate = compMeetsTemplate(meetsData);
        document.getElementById("meetsTarget").innerHTML = rendMeetsTemplate;
    }

    // If past the end of the data
    else if (dispMonth > lastMonth) {
        var meetsTemplate = document.getElementById("meetsTemplate").innerHTML;
        var compMeetsTemplate = Handlebars.compile(meetsTemplate);

        Handlebars.registerHelper("meets", function () {
            return new Handlebars.SafeString(
                "<div class='meetBox'>" +
                "<img class='meetBoxImage' src='img/nomeets.jpg' alt='a photo of a stuck mountain goat'>" +
                "<h3>Sorry!</h3>" +
                // "<h3>" + Handlebars.Utils.escapeExpression(meetsData[i].header) + "</h3>" +
                "<p>We've not got meetings arranged that far ahead.</p>" +
                "<p>Check back soon :)</p>" +
                "</div>"
            )
        })

        var rendMeetsTemplate = compMeetsTemplate();
        document.getElementById("meetsTarget").innerHTML = rendMeetsTemplate;
        // endOfNav = true;
    }

    // Check if more checkboxes might help
    else if (dayTypeChecked.length + climbTypeChecked.length < 7) {
        var meetsTemplate = document.getElementById("meetsTemplate").innerHTML;
        var compMeetsTemplate = Handlebars.compile(meetsTemplate);

        Handlebars.registerHelper("meets", function () {
            return new Handlebars.SafeString(
                "<div class='meetBox'>" +
                "<img class='meetBoxImage' src='img/options.png' alt='a photo of a huge climbing rack'>" +
                "<h3>No meets match your criteria...</h3>" +
                // "<h3>" + Handlebars.Utils.escapeExpression(meetsData[i].header) + "</h3>" +
                "<p>Perhaps try selecting a few more options.</p>" +
                // "<p>Check back soon :)</p>" +
                "</div>"
            )
        })

        var rendMeetsTemplate = compMeetsTemplate();
        document.getElementById("meetsTarget").innerHTML = rendMeetsTemplate;
        // endOfNav = true;
    }

    // Try the next month
    else if (dispMonth < lastMonth) {
        dispMonth += 1;
        renderMeets(dispMonth);
    }

}

// Code for sidebar on index.html. only run if on home page!
if (document.URL.includes("index.html")) {

    var sidebarData = [];
// Loop the data and create array of the next 4 meets
// TODO: What if allData if not in date order!?
    for (var i = 0; i < allData.length; i++) {
        if (Date.parse(allData[i].date) > Date.now()) {

            var dateParsed = new Date(allData[i].date);
            allData[i].date = days[dateParsed.getDay()] + " " + dateParsed.getDate() + " " + months[dateParsed.getMonth()]
                + " " + dateParsed.getFullYear();
            sidebarData.push(allData[i]);

            if (sidebarData.length >= 3) {
                break;
            }
        }
    }

// Add array to object for the sidebar template
    var data = {listItems: sidebarData}

// Create and render sidebar template, looping through data object
// Escape data to prevent code input causing errors and return safe string
// TODO: links to meet items on meets page?

    var template2 = document.getElementById("sideBarTemplate2").innerHTML;
    var compiledTemp2 = Handlebars.compile(template2);

    Handlebars.registerHelper("meetingsList", function (listItems) {
        var output = "";
        for (var i = 0; i < listItems.length; i++) {
            output += "<div>" +
                "<h3>" + Handlebars.Utils.escapeExpression(listItems[i].header) + "</h3>" +
                "<p>" + listItems[i].date + "<br>" + listItems[i].time + "</p>" +
                "<p>" + Handlebars.Utils.escapeExpression(listItems[i].details) + "</p>" +
                "</div>"
        }
        return new Handlebars.SafeString(output);
    });

    var renderedTemp2 = compiledTemp2(data);
    document.getElementById("template2Target").innerHTML = renderedTemp2;
}




