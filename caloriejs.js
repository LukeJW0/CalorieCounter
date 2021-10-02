var caloriesList = [];
var proteinList = [];
var dateList = [];

function calculate() { // reading and saving input data
    var calories = 0;
    var protein = 0;
    caloriestext = document.getElementById('caloriesinput').value; // getting input text
    proteintext = document.getElementById('proteininput').value;
    calories = parseInt(caloriestext);
    protein = parseInt(proteintext);
    var today = new Date();
    var day = today.getDate();
    localStorage.setItem('calorieslast', calories + " Calories"); // saving data to persistent storage
    localStorage.setItem('proteinlast', protein + "g Protein");
    caloriesList[caloriesList.length] = calories;
    proteinList[proteinList.length] = protein;
    dateList[dateList.length] = day;
    localStorage.setItem('calorieslist', JSON.stringify(caloriesList));
    localStorage.setItem('proteinlist', JSON.stringify(proteinList));
    localStorage.setItem('datelist', JSON.stringify(dateList));
    storage()
}

function storage() { // loading and presenting stats
    localStorage = window.localStorage;

    caloriesList = JSON.parse(localStorage.getItem('calorieslist'));
    proteinList = JSON.parse(localStorage.getItem('proteinlist'));
    dateList = JSON.parse(localStorage.getItem('datelist'));

    document.getElementById('lastentered').innerText = "You last ate " + localStorage.getItem('calorieslast') + ' and ' + localStorage.getItem('proteinlast');
    var today = new Date();
    var day = today.getDate();
    var caloriesToday = 0;
    for (let i = 0; i < caloriesList.length; i++) {
        if (dateList[i] == day) { // checking if the entry is from today
            caloriesToday = caloriesToday + caloriesList[i];
        }
      }
    var proteinToday = 0;
    for (let i = 0; i < proteinList.length; i++) {
        if (dateList[i] == day) { // checking if the entry is from today
            proteinToday = proteinToday + proteinList[i];
        }
    }
    document.getElementById('eatentoday').innerText = "Today, you've eaten " + caloriesToday + ' Calories and ' + proteinToday + "g of Protein.";
}

function storageclear() { // clearing all data
    localStorage.clear();
    storage();
    caloriesList = [];
    proteinList = [];
    dateList = [];
}

function download(data, filename, type) { // Filesave function by Kanchu on StackOverflow
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

function statsexport() { // Function to prepare data for export
    var exportText = "";
    exportText = JSON.stringify(caloriesList) + '\n' + JSON.stringify(proteinList) + '\n' + JSON.stringify(dateList); // converting all data to string
    download(exportText, 'firsttest', 'txt');
}