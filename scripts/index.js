
console.log(document.URL);

// All meet data, in ascending date order with dates in ISO 8601 format: YYYY-MM-DD

var allData = [
    {header: "PAST bouldering at the Depot", details: "PAST evening of bouldering at the Depot, Manchester",
        date: "2021-03-01", time: "18:00 - 22:00", tags: ["bouldering", "midweek"]},
    {header: "Indoor bouldering at the Depot", details: "An evening of bouldering at the Depot, Manchester",
        date: "2021-03-31", time: "18:00 - 22:00", tags: ["bouldering", "midweek"]},
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
    console.log("we're on meets page!")

    // Check some check boxes!
    if (document.getElementById("sport").checked){
        console.log("Sport is checked!")
    }

    // Create an array of the checkboxes to check!
    var checkBoxes = document.getElementsByClassName("filterCheck")
    var checked = [];

    // Check the array for the checked items and create another array with those id's
    for (var i=0; i<checkBoxes.length; i++) {
        console.log(checkBoxes[i]);
        if (checkBoxes[i].checked) {
            // console.log("We've got a checker! " + checkBoxes[i].id)
            checked.push(checkBoxes[i].id);
        }
    }

    // Create date object of now to use to compare months etc
    var now = new Date(Date.now());

    //Set month to this month first time round
    var month = now.getMonth();

    // Create array to store meet data for template
    var meetsData = [];

    // Loop the data and add to array for the relevant month
    for (var i = 0; i < allData.length; i++) {
        var meetDate = new Date(Date.parse(allData[i].date));

        if (meetDate.getMonth() === month) {
            var matches = [];
            for (var j=0; j<allData[i].tags.length; j++) {
                for (var k=0; k<checked.length; k++){
                    if (checked[k] === allData[i].tags[j]) {
                        console.log("match! " + checked[k] + " is in " + allData[i].date + " " + allData[i].details);
                        matches.push(allData[i]); // hmmmm
                    }
                }
            }




            // if (allData[i].)
            //     console.log("Lift-off!!!");
            // var dateParsed = Date.parse(allData[i].date);
            // allData[i].date = days[dateParsed.getDay()] + " " + dateParsed.getDate() + " " + months[dateParsed.getMonth()]
            //     + " " + dateParsed.getFullYear();
            // sidebarData.push(allData[i]);
            //
            // if (sidebarData.length >= 3) {
            //     break;
            // }
        }
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

