// Script for areas.html

// Declare variables for areas
var lakesAreaHeader;
var lakesAreaDesc1;
var lakesAreaDesc2;
var lakesAreaLink;
var lakesAreaImage;

var walesAreaHeader;
var walesAreaDesc1;
var walesAreaDesc2;
var walesAreaLink;
var walesAreaImage;

var peaksAreaHeader;
var peaksAreaDesc1;
var peaksAreaDesc2;
var peaksAreaLink;
var peaksAreaImage;

// Get navigation arrows
var navArrows = document.getElementsByClassName("navArrow")

// Add onclick events
// Check each arrow
for (var i=0; i<navArrows.length; i++) {
    var area = "";
    var direction = "";
    // Check each class for area and direction
    for (var j=0; j<navArrows[i].classList.length; j++) {
        if (navArrows[i].classList[j] === "lakes") {area = "lakes"}
        else if (navArrows[i].classList[j] === "wales") {area = "wales"}
        else if (navArrows[i].classList[j] === "peaks") {area = "peaks"}
        else if (navArrows[i].classList[j] === "forward") {direction = "forward"}
        else if (navArrows[i].classList[j] === "back") {direction = "back"}
    }
    // Add properties to object
    navArrows[i].area = area
    navArrows[i].direction = direction

    // Created onclick event handler
    navArrows[i].onclick = function() { changeArea(this.area, this.direction)};
}

// Set display position for each area
var lakesPos = 0;
var walesPos = 0;
var peaksPos = 0;

// Function to change displayed area
function changeArea(area, direction) {

    // Check direction and area and call renderArea function
    if (direction === "forward") {
        if (area === "lakes") {
            if (lakesPos === 2) {
                lakesPos = 0;
            }
            else {
                lakesPos += 1;
            }
            renderArea("lakes");
        }
        else if (area === "wales") {
            if (area === "wales") {
                if (walesPos === 2) {
                    walesPos = 0;
                }
                else {
                    walesPos += 1;
                }
            }
            renderArea("wales");
        }
        else if (area ==="peaks") {
            if (area === "peaks") {
                if (peaksPos === 2) {
                    peaksPos = 0;
                }
                else {
                    peaksPos += 1;
                }
            }
            renderArea("peaks");
        }
    }
    else if (direction === "back") {
        if (area === "lakes") {
            if (lakesPos === 0) {
                lakesPos = 2;
            }
            else {
                lakesPos -= 1;
            }
            renderArea("lakes");
        }
        else if (area === "wales") {
            if (area === "wales") {
                if (walesPos === 0) {
                    walesPos = 2;
                }
                else {
                    walesPos -= 1;
                }
            }
            renderArea("wales");
        }
        else if (area ==="peaks") {
            if (area === "peaks") {
                if (peaksPos === 0) {
                    peaksPos = 2;
                }
                else {
                    peaksPos -= 1;
                }
            }
            renderArea("peaks");
        }
    }
}

// Function to update the content for the area
function renderArea(area) {
    // Check area to update and position. Update HTML content.
    if (area === "lakes"){
        if (lakesPos === 0) {
            lakesAreaHeader = "Borrowdale";
            lakesAreaDesc1 = "Borrowdale is a wonderfully beautiful valley with many crags to choose from with " +
                "excellent climbing to be done throughout the full grade range."
            lakesAreaDesc2 = "The volcanic ash rock is of good quality, usually perched above the tree lined valley " +
                "sides.<br> Borrowdale is a justifiably busy location to go climbing but with a little extra effort, " +
                "quality climbing can always be had in near solitude."
            lakesAreaLink = "https://www.ukclimbing.com/logbook/books/borrowdale-1710"
            lakesAreaImage = "img/borrowdale.jpg"
        }
        else if (lakesPos === 1) {
            lakesAreaHeader = "Wasdale";
            lakesAreaDesc1 = "Wasdale is the traditional centre of rock climbing in the UK with the ascent of Napes" +
                "Needle in 1886 being widely considered the UK's first real rock climb"
            lakesAreaDesc2 = "Here you will find lots of classic climbs on Scafell, Scafell Pike and Great Gable. A " +
                "great day out on traditional mountain routes is available on all of them."
            lakesAreaLink = "https://www.ukclimbing.com/logbook/crags/buckbarrow_wasdale-664"
            lakesAreaImage = "img/wasdale.jpg"
        }
        else if (lakesPos === 2) {
            lakesAreaHeader = "Langdale";
            lakesAreaDesc1 = "There are a number of fine crags at Langdale, none are enormous in stature but they do" +
                "offer some great climbing in reasonable distance from the car. Highlights include Raven Crag and " +
                "Gimmer Crag."
            lakesAreaDesc2 = "As with everywhere in the Lake district, Langdale is a truly beautiful place to be."
            lakesAreaLink = "https://www.ukclimbing.com/logbook/books/langdale-1438"
            lakesAreaImage = "img/langdale.png"
        }
        document.getElementById("lakesAreaHeader").innerHTML = lakesAreaHeader;
        document.getElementById("lakesAreaDesc1").innerHTML = lakesAreaDesc1;
        document.getElementById("lakesAreaDesc2").innerHTML = lakesAreaDesc2;
        document.getElementById("lakesAreaLink").href = lakesAreaLink;
        document.getElementById("lakesAreaImage").src = lakesAreaImage;

    }
    else if (area === "wales"){
        if (walesPos === 0) {
            walesAreaHeader = "Tryfan";
            walesAreaDesc1 = "Tryfan is possibly Wales' greatest peak with over 150 routes chocked full of classic" +
                "mountain routes. The rock is clean and the setting spectacular"
            walesAreaDesc2 = "If you're looking for easier, long, multi-pitch mountaineering routes, it doesn't get " +
                "much better than this in the UK."
            walesAreaLink = "https://www.ukclimbing.com/logbook/crags/tryfan-491"
            walesAreaImage = "img/tryfan.jpg"
        }
        else if (walesPos === 1) {
            walesAreaHeader = "Llanberis Pass";
            walesAreaDesc1 = "The pass is famous for good reason, it's the heart of Welsh rock climbing, with crag " +
                "after crag of world class climbing, most of which is only a few minutes walk from the road. It's all" +
                "amazing, just take a look at the link below."
            walesAreaDesc2 = "There is also lots of great bouldering to be done in the pass if you're that way inclined."
            walesAreaLink = "https://www.ukclimbing.com/articles/destinations/llanberis_pass-2508"
            walesAreaImage = "img/llanberisarea.jpg"
        }
        else if (walesPos === 2) {
            walesAreaHeader = "Gogarth";
            walesAreaDesc1 = "On the Anglesey coast near Holyhead, Gogarth features a stunning selection of world class " +
                "sea cliff climbing in a breathtaking location. If you're brave enough, the adventures to be had here" +
                "are incredible."
            walesAreaDesc2 = "If you're feeling a little less bold, Holyhead Mountian offers some excellent trad climbing" +
                "without the intimidation of the sea roaring beneath you."
            walesAreaLink = "https://www.ukclimbing.com/articles/destinations/gogarth-1850"
            walesAreaImage = "img/gogarth.jpg"
        }
        document.getElementById("walesAreaHeader").innerHTML = walesAreaHeader;
        document.getElementById("walesAreaDesc1").innerHTML = walesAreaDesc1;
        document.getElementById("walesAreaDesc2").innerHTML = walesAreaDesc2;
        document.getElementById("walesAreaLink").href = walesAreaLink;
        document.getElementById("walesAreaImage").src = walesAreaImage;
    }
    else if (area === "peaks"){
        if (peaksPos === 0) {
            peaksAreaHeader = "Stanage Edge";
            peaksAreaDesc1 = "At over a mile long, Stanage Edge has to be the best, longest outcrop of rock the UK has " +
                "to offer. It's barely believable in terms of quality, scale and ease of access. Just go there now, " +
                "it's truly fantastic!"
            peaksAreaDesc2 = "There are countless classics in all grades and if you're chosen route is busy, just walk " +
                "a few meters to the next section of amazing routes. The bouldering's not to shabby either!"
            peaksAreaLink = "https://www.ukclimbing.com/articles/destinations/stanage_-_britains_most_popular_crag-2526"
            peaksAreaImage = "img/stanagearea.jpg"
        }
        else if (peaksPos === 1) {
            peaksAreaHeader = "The Roaches";
            peaksAreaDesc1 = "The Roaches is a firm peak district favorite amongst our members. Perhaps it's the beatiful " +
                "location, huge selection of classic routes or just the weird and wonderful nature of the rock formations " +
                "there. Whatever it is, we go there a lot and it's always a good time."
            peaksAreaDesc2 = "There are great routes in the full grade spectrum up to 30m tall and plenty of top class " +
                "boundering to go at."
            peaksAreaLink = "https://www.ukclimbing.com/logbook/crags/roaches_upper_tier-797"
            peaksAreaImage = "img/roachesarea.jpg"
        }
        else if (peaksPos === 2) {
            peaksAreaHeader = "Froggatt Edge";
            peaksAreaDesc1 = "Another extensive area with over 160 routes is Froggatt Edge, renowned for it's slabs. " +
                "The routes are all top quality, very close together and parking is only 15 minutes away."
            peaksAreaDesc2 = "Classic routes include Indoor Fisherman, Sunset Slab and Narcissus."
            peaksAreaLink = "https://www.ukclimbing.com/logbook/crags/froggatt_edge_derbyshire-22?lgn=147230"
            peaksAreaImage = "img/froggatt.jpg"
        }
        document.getElementById("peaksAreaHeader").innerHTML = peaksAreaHeader;
        document.getElementById("peaksAreaDesc1").innerHTML = peaksAreaDesc1;
        document.getElementById("peaksAreaDesc2").innerHTML = peaksAreaDesc2;
        document.getElementById("peaksAreaLink").href = peaksAreaLink;
        document.getElementById("peaksAreaImage").src = peaksAreaImage;
    }
}