var firebaseConfig = {
    apiKey: "AIzaSyAXL0h3PngpUtLSsygrPqkJd3yQTtmgP08",
    authDomain: "inclasstrilogyactivities.firebaseapp.com",
    databaseURL: "https://inclasstrilogyactivities.firebaseio.com",
    projectId: "inclasstrilogyactivities",
    storageBucket: "inclasstrilogyactivities.appspot.com",
    messagingSenderId: "892905177612",
    appId: "1:892905177612:web:e6fa4fb606489cbe"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


var database = firebase.database();
// Store new employee data in ID "#employeeData" by making a new <tr> tag and appending everything within <td>
name = "";
role = "";
startDate = "";
monthlyPay = 0;


$(".idk").on("click", function (event) {
    event.preventDefault();
    name = $("#name").val();
    role = $("#role").val();
    startDate = $("#start").val();
    monthlyPay = $("#rate").val();

    database.ref().push({
        name: name,
        role: role,
        startDate: startDate,
        monthlyPay: monthlyPay,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    })

})

database.ref().on("child_added", function (snapshot, prevChildKey) {
    var newPost = snapshot.val();
    var newTR = $("<tr>");
    var nameTD = $("<td>").text(newPost.name);
    var roleTD = $("<td>").text(newPost.role);
    var startDateTD = $("<td>").text(newPost.startDate);
    var monthsWorkedTD = $("<td>").text(moment(newPost.startDate).toNow(true));
    var monthlyPay = $("<td>").text(newPost.monthlyPay);
    var billedTD = $("<td>").text(totalBilled());

    function totalBilled() {
        var startingMonth = moment(newPost.startDate).month();
        var currentMonth = moment(newPost.dateAdded).month();
        var monthsWorked = currentMonth - startingMonth;
        return monthsWorked * newPost.monthlyPay;
    }

    newTR.append(nameTD);
    newTR.append(roleTD);
    newTR.append(startDateTD);
    newTR.append(monthsWorkedTD);
    newTR.append(monthlyPay);
    newTR.append(billedTD);

    $("#employeeData").append(newTR);

    console.log(newPost);
})