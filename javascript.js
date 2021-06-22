window.onload = function () {
  /////////////////////////////Fetch data from database//////////////////////////////////////////////
  fetch("http://35.205.189.186/api/progress/progress/student/4")
    .then(function (response) {
      return response.json();
    })
    .then(function (dataDB) {
    console.log(dataDB);

    /////////////////////Generated data (information about child)/////////////////////////////////////
    let motorScore = ["Voorsprong meer dan 1 jaar", "Normale motoriek", "Achterstand tussen 1 en 2 jaar", "Meer dan 2 jaar achterstand"];
    const motorScoreRandom = motorScore[Math.floor(Math.random() * motorScore.length)];

    const testDataChild = {
      id: 1,
      name: "Julia van Leeuwe",
      dateOfBirth: new Date((Math.random() * (2016 - 2012 + 1)) + 2012, (Math.random() * 12) + 1, (Math.random() * 30) + 1),
      city: "Eindhoven",
      gender: "Woman",
      class: (Math.floor(Math.random() * (4 - 3 + 1)) + 3) + "A",
      motorScore: motorScoreRandom,
    };
    // console.log(testDataChild);
    /////////////////////////////Change infromation child/////////////////////////////////////////////
    document.getElementById("name").innerHTML = ": " + testDataChild.name; 
    document.getElementById("dateOfBirth").innerHTML = ": " + testDataChild.dateOfBirth.toLocaleDateString(); 
    document.getElementById("class").innerHTML = ": " + testDataChild.class;
    document.getElementById("score").innerHTML = testDataChild.motorScore;
    //////////////////////////////Create differend lines//////////////////////////////////////////////
    const lines = [
      {
        color: "#0070C0",
        dash: "solid",
      },
      {
        color: "#00B0F0",
        dash: "shortDot",
      },
      {
        color: "#9BC2E6",
        dash: "longDash",
      },
    ];
    //////////////////////////////////Create linechart//////////////////////////////////////////////////
    var chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      theme: "light2",
      title: {},
      axisX: {
        title: "Datum >",
        valueFormatString: "DD MMM", // DD = day, MMM = month, YYYY = year
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
        },
      },
      axisY: {
        title: "Procentuele groei >",
      },
      legend: {
        cursor: "pointer",
        verticalAlign: "top",
        horizontalAlign: "left",
        dockInsidePlotArea: true,
        itemclick: toogleDataSeries,
        maxWidth: "300",
    },
      //////////////////Test linechart generated lines like the database//////////////////////////////////
      data: dataDB.map(function (item, i) {
        const line = lines[i] ?? lines[0];
        if (item.label == "Rekenen"){
          exergameName = "Op een been balanseren";
        } 
        if (item.label == "Lezen"){
          exergameName = "Balanseren op een object";
        } 
        return { 
          type: "line",
          showInLegend: true,
          name: ": " + exergameName,
          markerColor: "black",
          lineDashType: line.dash,
          xValueFormatString: "DD MM, YYYY",
          color: line.color,
          dataPoints: item.progress.map(function (progress){
            return {
              x: new Date(progress.measurementMoment), 
              y: progress.value}
          })
        }
      }),
    });
    chart.render(); //Plot line chart

    //console.log(chart.data);

    ///////////////////////////////////Toggel lines///////////////////////////////////////////////////
    function toogleDataSeries(e) {
      if (
        typeof e.dataSeries.visible === "undefined" ||
        e.dataSeries.visible
      ) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      chart.render();
    }

    //////////////////////////////////Fill scroll box/////////////////////////////////////////////////
    dataDB.forEach(function createDataCognitive(item) {
      console.log(item);
      
      item.progress.forEach(function progressItem(progress){
        output = progress.measurementMoment.split("T"); //Get the only the date
        gameName = progress.gameName.replace(/([A-Z || 1-9])/g, ' $1').trim() //Add spaces to the gamename

        

        progress.extraData.forEach(function scoreMovement(score){
          document.getElementById("scrollDiv").innerHTML += 
          "<div class=dataScrollDiv>"  + 
            "<h1>" + gameName + "</h1>" + 
            "<p>" + "Beweeg resultaat: " + score.value + " seconden" + "</p>" +
            "<p>" + "Cognitief resultaat: " + progress.value + "</p>" +
            "<p>" + "Datum: " + output[0] + "</p>" + 
          "</div>"
        })  
          Gemiddelde = score.value
            

      }) 
      console.log(Gemiddelde);
    });
  });
};