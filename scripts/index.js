
// All meet data, in ascending date order with dates in ISO 8601 format: YYYY-MM-DD

var allData = [
    {header: "PAST bouldering at the Depot", details: "PAST evening of bouldering at the Depot, Manchester",
        date: "2021-03-01", time: "18:00 - 22:00", tags: ["bouldering", "midweek"]},
    {header: "Indoor climbing at the Depot", details: "An evening of bouldering at the Depot, Manchester",
        date: "2021-03-05", time: "18:00 - 22:00", tags: ["sport", "midweek"]},
    {header: "Trad climbing at the Roaches", details: "Trad climbing at the Roaches, the Peak District",
        date: "2021-03-06", time: "10:00 - 18:00", tags: ["trad", "weekend"]},
    {header: "Multi-pitch climbing at Idwal Slabs", details: "Trad climbing at Idwal Slabs, Ogwen Valley, North Wales",
        date: "2021-03-20", time: "10:00 - 18:00", tags: ["trad", "weekend", "multipitch"]},
    {header: "Indoor climbing at the Northwest Face", details: "An evening of sport climbing at the Northwest Face, Warrington",
        date: "2021-03-31", time: "18:00 - 22:00", tags: ["bouldering", "midweek", "sport"]},
    {header: "Trad climbing at Stanage Edge", details: "Traditional climbing at Stanage Edge, the Peak District",
        date: "2021-04-03", time: "09:00 - 18:00", tags: ["trad", "weekend"]},
    {header: "Indoor climbing at the Northwest Face", details: "An evening of sport climbing at the Northwest Face, Warrington",
        date: "2021-04-07", time: "18:00 - 22:00", tags: ["sport", "bouldering", "midweek", "indoor"]}
    // {header: "Indoor climbing at the Northwest Face", details: "An evening of sport climbing at the Northwest Face, Warrington",
    //     date: "2021-05-07", time: "18:00 - 22:00"},
    // {header: "Indoor climbing at the Northwest Face", details: "An evening of sport climbing at the Northwest Face, Warrington",
    //     date: "2021-06-07", time: "18:00 - 22:00"},
    // {header: "Indoor climbing at the Northwest Face", details: "An evening of sport climbing at the Northwest Face, Warrington",
    //     date: "2021-07-07", time: "18:00 - 22:00"}
];

// Create arrays to display human friendly days and months
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Code for meet items on meets page
if (document.URL.includes("meets.html")){

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

    // Create date object of now to use to compare months etc
    var now = new Date(Date.now());

    //Create and month to this month first time round
    var month = now.getMonth();

    // Create array to store the items that match the day type
    var dayTypeMatches = [];

    // Loop the data and add to array for the relevant month
    for (var i = 0; i < allData.length; i++) {
        // Get the month of the meet
        var meetDate = new Date(Date.parse(allData[i].date));
        // Check meet matches the month we want
        if (meetDate.getMonth() === month) {
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

    // Create meets template
    var meetsTemplate = document.getElementById("meetsTemplate").innerHTML;
    var compMeetsTemplate = Handlebars.compile(meetsTemplate);

    var meetsData = {meetsData: templateData}

    Handlebars.registerHelper("meets", function(meetsData) {
        var output = "";
        for (var i=0; i<meetsData.length; i++) {
            var meetDateParsed = new Date(meetsData[i].date);
            output +=
                "<div class='meetBox'>" +
                "<img class='meetBoxImage' src='img/ph_150.jpg' alt='a photo of the Roaches'>" +
                    "<h3>" + days[meetDateParsed.getDay()] + " " + meetDateParsed.getDate() + " " +
                        months[meetDateParsed.getMonth()] + " " + meetDateParsed.getFullYear() + "</h3>" +
                    "<h3>" + Handlebars.Utils.escapeExpression(meetsData[i].header) + "</h3>" +
                    "<p>" + Handlebars.Utils.escapeExpression(meetsData[i].time) + "</p>" +
                    "<p>" + Handlebars.Utils.escapeExpression(meetsData[i].details) + "</p>" +
                    "<img class='meetBoxIcon' src='img/30x30.png' alt='climbing type icon'>" +
                    "<img class='meetBoxIcon' src='img/30x30.png' alt='climbing type icon'>"
            output += "</div>";

        }
        return new Handlebars.SafeString(output);
    })

    var rendMeetsTemplate = compMeetsTemplate(meetsData);
    document.getElementById("meetsTarget").innerHTML = rendMeetsTemplate;
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

