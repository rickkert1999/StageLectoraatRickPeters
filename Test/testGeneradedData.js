window.onload = function () {
    //////////////////////////Generated data like te database//////////////////////////////////////////
    const testDataExergame = [...Array(3).keys()].map(function (i) {
      return {
        id: i,
        description: "descriptionp " + i,
        competenceType: "competence type " + i,
        label: "label " + i,
        exerGameId: 1,
        progress: [
          new Date(2021, 5, 31),
          new Date(2021, 1, 18),
          new Date(2021, 1, 5),
          new Date(2020, 11, 8),
          new Date(2020, 11, 5),
        ].map(function (date, index) {
          return {
            gameName: "game name " + i,
            value: Math.floor(Math.random() * 30),
            studentId: 1,
            extraData: null,
            measurementMoment: date,
          };
        }),
      };
    });
    console.log(testDataExergame);
    /////////////////////Generated data (information about child)/////////////////////////////////////
    let motorScore = ["Voorsprong  meer dan 1 jaar", "Normale motoriek", "Achterstand tussen 1 en 2 jaar", "Meer dan 2 jaar achterstand"];
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
    document.getElementById("name").innerHTML = ": " + testDataChild.name 
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
      data: testDataExergame.map(function (item, i) {
        const line = lines[i] ?? lines[0];
        return {
          type: "line",
          showInLegend: true,
          name: ": " + item.description,
          markerColor: "black",
          lineDashType: line.dash,
          xValueFormatString: "DD MM, YYYY",
          color: line.color,
          dataPoints: item.progress.map(function (progressItem) {
            return {
              x: progressItem.measurementMoment,
              y: progressItem.value,
            };
          }),
        };
      }),
    });
    chart.render(); //Plot line chart

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
    testDataExergame.forEach(createDataCognitive);
    function createDataCognitive(item) {
        //console.log(item);

        const progress = item.progress;
        // console.log(progress);

        progress.forEach(createDivCognitive);
        function createDivCognitive(progressItem){
            document.getElementById("scrollDiv").innerHTML += 
              "<div class=dataScrollDiv>"  + 
                "<h1>" + item.description + "</h1>" + 
                "<p>" + "Beweeg resultaat: " + progressItem.value + "</p>" +
                "<p>" + "Datum: " + progressItem.measurementMoment.toDateString() + "</p>" + 
              "</div>"
        }
    }
};

  
