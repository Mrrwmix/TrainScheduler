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


    newTR.append(nameTD);
    newTR.append(destinoTD);
    newTR.append(freqTD);
    $("#trainData").append(newTR);

    console.log(newPost);
})