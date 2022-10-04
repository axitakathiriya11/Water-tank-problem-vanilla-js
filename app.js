function getInputValues() {
  let inputEle = document.getElementById("inputText");

  // If values are empty then return
  if (inputEle.value === "") {
    alert("Input value can't be empty");
    return;
  }

  // If values contains any Alphabates then return
  var regExp = /[a-zA-Z]/g;
  if (regExp.test(inputEle.value)) {
    alert("Input value contains digits only");
    return;
  }

  // Generate input and output charts
  let inputArr = inputEle.value.split(",");
  generateChartForBlocks(inputArr);
}

function generateChartForBlocks(blocks) {
  let n = blocks.length;
  let front = [];
  let back = [];
  let finalArr = [];
  let blockChartValue = [];
  let waterChartValue = [];
  let onlyWaterValue = [];
  let temp = 0;
  let sum = 0;

  //Calculating the highest block from the left for each element and generate block value for chart
  for (let i = 0; i < n; i++) {
    if (temp < blocks[i]) {
      temp = blocks[i];
    }
    front[i] = temp;

    let value = blocks[i];
    blockChartValue.push({
      value: value,
      itemStyle: {
        color: "#FFFF00",
      },
    });
  }

  temp = 0;
  //Calculating the highest block from the right for each element
  for (let i = n - 1; i >= 0; i--) {
    if (temp < blocks[i]) {
      temp = blocks[i];
    }
    back[i] = temp;
  }

  for (let j = 0; j < n; j++) {
    finalArr[j] = (front[j] < back[j] ? front[j] : back[j]) - blocks[j];
    sum += finalArr[j];

    // Add only water value
    if (finalArr[j] != 0) {
      onlyWaterValue.push({
        value: front[j] < back[j] ? front[j] : back[j],
        itemStyle: {
          color: "#00B0F0",
        },
      });
    } else {
      onlyWaterValue.push({
        value: 0,
      });
    }

    // Add water computed values from max hight blocks
    waterChartValue.push({
      value: finalArr[j],
      itemStyle: {
        color: "#00B0F0",
      },
    });
  }

  drawChart(blocks, blockChartValue, waterChartValue, "input-chart");
  let outputSpan = document.getElementById("waterunit");
  outputSpan.innerHTML = `Total ${sum} Water Units`;
  drawChart(blocks, [], onlyWaterValue, "output-chart");
}

function drawChart(input, blockChartValue, waterChartValue, id) {
  var dom = document.getElementById(id);
  var myChart = echarts.init(dom, null, {
    renderer: "canvas",
    useDirtyRect: false,
  });
  var option;
  option = {
    xAxis: {
      type: "category",
      data: input,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: blockChartValue,
        type: "bar",
        stack: "x",
      },
      {
        data: waterChartValue,
        type: "bar",
        stack: "x",
      },
    ],
  };

  if (option && typeof option === "object") {
    myChart.setOption(option);
  }
  
  window.addEventListener("resize", myChart.resize);
}
