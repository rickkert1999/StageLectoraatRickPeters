window.onload = function () {
    /////////////////////Generated data (information about child)/////////////////////////////////////
    let motorScore = ["Voorsprong meer dan 1 jaar", "Normale motoriek", "Achterstand tussen 1 en 2 jaar", "Meer dan 2 jaar achterstand"];
    const motorScoreRandom = motorScore[Math.floor(Math.random() * motorScore.length)];
    console.log(motorScoreRandom);
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
      ////////////////////////////Test linechart static lines////////////////////////////////////////////
      data: [
        {
          type: "line",
          showInLegend: true,
          name: ": Op object balanceren",
          markerColor: "Black",
          xValueFormatString: "DD MMM, YYYY",
          color: "#0070C0",
          dataPoints: [
            { x: new Date(2021, 1, 18), y: 14.54 },
            { x: new Date(2021, 1, 5), y: 4.28 },
            { x: new Date(2021, 0, 15), y: 3.54 },
            { x: new Date(2020, 11, 8), y: 2.42 },
            { x: new Date(2020, 10, 15), y: -0.26 },
            { x: new Date(2020, 9, 9), y: 1.25 },
            { x: new Date(2020, 9, 2), y: 0 },
          ],
        },
        {
          type: "line",
          showInLegend: true,
          name: ": Balanceren op 1 been",
          lineDashType: "dash",
          markerColor: "Black",
          color: "#00B0F0",
          dataPoints: [
            { x: new Date(2021, 1, 9), y: 15.01 },
            { x: new Date(2020, 11, 22), y: 11.5 },
            { x: new Date(2020, 11, 8), y: 7.86 },
            { x: new Date(2020, 10, 22), y: 9.21 },
            { x: new Date(2020, 9, 24), y: 4.52 },
            { x: new Date(2020, 9, 15), y: 3.9 },
            { x: new Date(2020, 8, 15), y: 0 },
          ],
        },
        {
          type: "line",
          showInLegend: true,
          name: ": Op de tenen staan",
          lineDashType: "dash2",
          markerColor: "Black",
          color: "#9BC2E6",
          dataPoints: [
            { x: new Date(2021, 0, 23), y: 2.43 },
            { x: new Date(2021, 0, 5), y: 5.02 },
            { x: new Date(2020, 11, 5), y: 3.71 },
            { x: new Date(2020, 10, 5), y: 1.02 },
            { x: new Date(2020, 8, 30), y: 0 },
          ],
        },
      ],
      //////////////////////////////////////////////////////////////////////////////////////////////////
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
};

  
