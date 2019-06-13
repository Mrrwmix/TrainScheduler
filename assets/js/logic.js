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

$("#submit").on("click", function (event) {
    event.preventDefault();
    var name = $("#name").val();
    var destino = $("#destination").val();
    var firstTrainTime = $("#firstTrain").val();
    var frequency = $("#frequency").val();

    database.ref('trains').push({
        name: name,
        destino: destino,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    })
    $("input").each(function(index){
        $(this).val('');
    })
})

database.ref('trains').on("child_added", function (snapshot, prevChildKey) {
    var newPost = snapshot.val();
    var newTR = $("<tr>");
    var nameTD = $("<td>").text(newPost.name);
    var destinoTD = $("<td>").text(newPost.destino);
    var freqTD = $("<td>").text(newPost.frequency);

    // Math to determine next train time and minutes away

    var firstTimeConverted = moment(newPost.firstTrainTime, 'HH:mm').subtract(1, 'years');
    var diffTime = moment().diff(moment(firstTimeConverted), 'minutes');
    var timeApartRemainder = diffTime % newPost.frequency;
    var minutesUntilTrain = newPost.frequency - timeApartRemainder;
    var nextTrain = moment().add(minutesUntilTrain, "minutes");

    var nextArrivalTD = $("<td>").text(moment(nextTrain).format('hh:mm A')); // Figuring out how to get the next arrival time posted here
    var minutesAwayTD = $("<td>").text(minutesUntilTrain); //Possibly using $moment(arrivalTD).toNow(true)

    newTR.append(nameTD);
    newTR.append(destinoTD);
    newTR.append(freqTD);
    newTR.append(nextArrivalTD);
    newTR.append(minutesAwayTD);
    $("#trainData").append(newTR);

        // var firstTimeConverted = moment(newPost.firstTrainTime, 'HH:mm').subtract(1, 'years');
        // var diffTime = moment().diff(moment(firstTimeConverted), 'minutes');
        // console.log(diffTime);
        // var timeApartRemainder = diffTime % newPost.frequency;
        // console.log(timeApartRemainder);
        // var minutesUntilTrain = newPost.frequency - timeApartRemainder;
        // console.log("Minutes till train: " + minutesUntilTrain);
        // var nextTrain = moment().add(minutesUntilTrain, "minutes");
        // console.log("Next train = " + moment(nextTrain).format("hh:mm A"));
})