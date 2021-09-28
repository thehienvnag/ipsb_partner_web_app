import { Card } from "antd";
import React, { useState, useEffect } from "react";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import "./index.scss";
import { Pie, defaults, Bar } from 'react-chartjs-2'
import { Row, Col } from 'antd';
import { loadCouponInUses, selectListCouponInUse } from "App/Stores/couponInUse.slice";
import { useDispatch, useSelector } from "react-redux";

defaults.plugins.title.font.size = 20
// defaults.plugins.tooltip = false

const SOHomePage = () => {
  const dispatch = useDispatch();
  const listCouponInUse = useSelector(selectListCouponInUse);
  // for pie chart
  const [labels, setLabel] = useState([]);
  const [dataSetPieLabels, setDataPieLabels] = useState([]);
  // end pie chart

  // for bar chart
  const [labelBars, setLabelBar] = useState([]);
  const [dataSetBarLabels, setDataBarLabels] = useState([]);
  const [dataNumberOfUseBar, setNumberOfUseBarLabels] = useState([]);
  // end bar chart

  console.log("alo : ", listCouponInUse);
  // var nameArray = [];
  // var numberOfAppearanceArray = [];
  // if (listCouponInUse != null) {
  //   var key = "couponId";
  //   const newArray = [...new Map(listCouponInUse.map(item => [item[key], item])).values()];
  //   newArray.forEach(element => {
  //     var count = listCouponInUse.filter((obj) => obj.couponId === element.couponId).length;
  //     nameArray.push(element.coupon.name);
  //     numberOfAppearanceArray.push(count);
  //   });
  // }
  var key = "couponId";
  var returnArray = [];
  var anotherNewArray = [];
  var nameArray = [];
  var numberOfAppearanceArray = [];
  var averageScoreArray = [];
  if (listCouponInUse != null) {
    const newArray = [...new Map(listCouponInUse.map(item =>
      [item[key], item])).values()];
    var averageRateScore = 0;
    newArray.forEach(element => {
      var totalRatescore = 0;
      returnArray = listCouponInUse.filter((obj) => obj.couponId === element.couponId);
      var count = returnArray.length;
      returnArray.forEach(newElement => {
        totalRatescore += newElement.rateScore;
      });
      averageRateScore = totalRatescore /= count;

      anotherNewArray.push({couponId : element.id, 
        numberOfAppearance : count, name : element.coupon.name, 
        avgRateScore : averageRateScore});
      // nameArray.push(element.coupon.name);
      // numberOfAppearanceArray.push(count);
      // averageScoreArray.push(averageRateScore);
    });

    anotherNewArray.sort((a, b) => a.avgRateScore < b.avgRateScore ? 1 : -1);
    nameArray = anotherNewArray.map(_ => _.name);
    numberOfAppearanceArray = anotherNewArray.map(_ => _.numberOfAppearance);
    averageScoreArray = anotherNewArray.map(_ => _.avgRateScore);

  }

  const dataLabels = () => {
    setLabel(nameArray);
    //setLabel(['Red', 'Blue', 'Yellow', 'Green', 'Purple']);
    //setLabelBar(['Giảm 100%', 'Giảm 80%', 'Giảm 60%', 'Giảm 50%', 'Giảm 40%', 'Giảm 30%']);
    setLabelBar(nameArray);
  };
  const dataSetLabels = () => {
    setDataPieLabels(numberOfAppearanceArray);
    //setDataPieLabels([12, 19, 3, 5, 5]);
    //setDataBarLabels([4.5, 4.1, 4.8, 4.4, 4.2, 4.3]);
    setDataBarLabels(averageScoreArray);
    setNumberOfUseBarLabels(numberOfAppearanceArray);
  };
  useEffect(() => {
    dispatch(loadCouponInUses());
    dataLabels();
    dataSetLabels();
  }, [dispatch]);

  const loadChartPie = () => {
    return {
      labels: labels,
      datasets: [
        {
          data: dataSetPieLabels,
          label: '# of votes',
          backgroundColor: [
            'rgba(221, 56, 56, 1)',
            'rgba(55, 161, 222, 0.66)',
            'rgba(244, 244, 56, 1)',
            'rgba(27, 245, 43, 0.66)',
            'rgba(245, 27, 188, 0.66)',
          ],
          borderColor: [
            'rgba(221, 56, 56, 1)',
            'rgba(55, 161, 222, 0.66)',
            'rgba(244, 244, 56, 1)',
            'rgba(27, 245, 43, 0.66)',
            'rgba(245, 27, 188, 0.66)',
          ],
          borderWidth: 1,
          hoverBorderWidth: 1,
          hoverBorderColor: '#000'
        },
      ],
      dataSetPieLabels: ['ngon', 'ngon', 'ngon', 'ngon', 'ngon'],
    }
  };

  const option = {
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var meta = dataset._meta[Object.keys(dataset._meta)[0]];
          var total = meta.total;
          var currentValue = dataset.data[tooltipItem.index];
          var percentage = parseFloat((currentValue / total * 100).toFixed(1));
          return currentValue + ' (' + percentage + '%)';
        },
        title: function (tooltipItem, data) {
          return data.labels[tooltipItem[0].index];
        }
      }
    },
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
        text: "Most used coupons",
        position: "top"
      },
      legend: {
        display: true,
        position: 'bottom',
      },
    },
    scales: { // vẽ ra mấy cái đánh số từ 0 --> 1
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }

  return (
    <PageWrapper>
      <PageBody>
        <Card className="col-md-12" >
          <Row>
            <Col span={10}>
              <Pie
                height={180}
                width={180}
                data={loadChartPie}
                options={option}
              />
            </Col>
            <Col span={1} />
            <Col span={13}>
              <Bar
                height={200}
                // width={300}
                data={{
                  labels: labelBars,
                  datasets: [{
                    label: 'Rate Score',
                    // yAxisID: 'B',
                    borderColor: 'rgba(54, 162, 235, 0.6)',
                    backgroundColor: [
                      // 'rgba(255, 99, 132, 0.6)',
                      // 'rgba(54, 162, 235, 0.6)',
                      'rgba(255, 206, 86, 0.6)',
                      // 'rgba(75, 192, 192, 0.6)',
                      // 'rgba(153, 102, 255, 0.6)',
                      // 'rgba(255, 159, 64, 0.6)',
                      // 'rgba(255, 99, 132, 0.6)'
                    ],
                    data: dataSetBarLabels,
                    fill: false,
                    yAxisID: 'y1',
                  },{
                    label: 'Times of use',
                    // yAxisID: 'A',
                    borderColor: 'rgba(255, 99, 132, 0.6)',
                    // backgroundColor: "pink",
                    backgroundColor: [
                      // 'rgba(255, 99, 132, 0.6)',
                    //   'rgba(54, 162, 235, 0.6)',
                    //   'rgba(255, 206, 86, 0.6)',
                    //   'rgba(75, 192, 192, 0.6)',
                      'rgba(153, 102, 255, 0.6)',
                    //   'rgba(255, 159, 64, 0.6)',
                    //   'rgba(255, 99, 132, 0.6)'
                    ],
                    data: dataNumberOfUseBar,
                    type: 'line',
                    fill: false,
                    yAxisID: 'y',
                  },]
                }}

                options={
                {
                  responsive: true,
                  interaction: {
                    mode: 'index',
                    intersect: false,
                  },
                  // stacked: false,
                  plugins: {
                    title: {
                      display: true,
                      text: 'Highest Rated Coupons'
                    }
                  },
                  scales: {
                    y: {
                      type: 'linear',
                      display: true,
                      position: 'right',
                    },
                    y1: {
                      type: 'linear',
                      display: true,
                      position: 'left',
              
                      // grid line settings
                      grid: {
                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                      },
                    },
                  }
                }
              }
                
              />
            </Col>
          </Row>
        </Card>
      </PageBody>
    </PageWrapper>
  );
};

export default SOHomePage;
