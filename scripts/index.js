

// document.getElementById('logo').innerHTML = '<a href="index.html">CHANGED IT!!</a>';

// var data = [
//     {sideBarHeader: 'Meeting Heading 2', sideBarDetails: 'Details of meeting 2'},
//     {sideBarHeader: 'Meeting Heading 3', sideBarDetails: 'Details of meeting 3'},
//     {sideBarHeader: 'Meeting Heading 4', sideBarDetails: 'Details of meeting 4'}
// ];

var template = document.getElementById('sideBarTemplate').innerHTML;
var compiledTemp = Handlebars.compile(template);
var renderedTemp = compiledTemp({
    sideBarHeader: 'Meeting Heading 1',
    sideBarDetails: 'Details of the meeting 1'
});
document.getElementById('templateTarget').innerHTML = renderedTemp;