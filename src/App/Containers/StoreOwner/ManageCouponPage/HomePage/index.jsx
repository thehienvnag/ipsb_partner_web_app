import { Card } from "antd";
import React, { useState, useEffect } from "react";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import "./index.scss";
import { Pie, defaults, Bar } from 'react-chartjs-2'
import { Row, Col, PageHeader } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { getAllCouponInUse } from "App/Services/couponInUse.service";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { BiGift } from "react-icons/bi";
import { FaYandexInternational } from "react-icons/fa";

defaults.plugins.title.font.size = 20

const SOHomePage = () => {
  const dispatch = useDispatch();
  // for pie chart
  const [labels, setLabel] = useState([]);
  const [dataSetPieLabels, setDataPieLabels] = useState([]);
  // end pie chart

  // for bar chart
  const [labelBars, setLabelBar] = useState([]);
  const [dataSetBarLabels, setDataBarLabels] = useState([]);
  const [dataNumberOfUseBar, setNumberOfUseBarLabels] = useState([]);
  // end bar chart

  const getCouponInUse = async (storeId) => {
    const data = await getAllCouponInUse({
      storeId: storeId,
    });
    return data.content;
  };

  const getReturnArray = async (listCouponInUse) => {
    var key = "couponId";
    var returnArray = [];
    var averageRateScore = 0;
    var totalRatescore = 0;
    var newArray = [];

    const data = [...new Map(listCouponInUse.map(item =>
      [item[key], item])).values()];

    data.forEach(element => {
      totalRatescore = 0;
      returnArray = listCouponInUse.filter((obj) => obj.couponId === element.couponId);
      var count = returnArray.length;
      returnArray.forEach(newElement => {
        totalRatescore += newElement.rateScore;
      });
      averageRateScore = totalRatescore /= count;

      newArray.push({
        couponId: element.id,
        numberOfAppearance: count, name: element.coupon.name,
        avgRateScore: averageRateScore
      });
    });

    const newData = newArray.sort((a, b) => a.avgRateScore < b.avgRateScore ? 1 : -1);
    dataLabels(newData.map(_ => _.name));
    dataSetLabels(newData.map(_ => _.avgRateScore), newData.map(_ => _.numberOfAppearance));
  }

  const dataLabels = (nameArray) => {
    setLabel(nameArray);
    setLabelBar(nameArray);
  };
  const dataSetLabels = (averageScoreArray, numberOfAppearanceArray) => {
    setDataPieLabels(numberOfAppearanceArray);
    setDataBarLabels(averageScoreArray);
    setNumberOfUseBarLabels(numberOfAppearanceArray);
  };
  useEffect(() => {
    getCouponInUse(18).then((value) => getReturnArray(value));
  }, [dispatch]);

  return (
    <PageWrapper>
      {/* <PageHeader title="Overview" subTitle="Store Owner" /> */}
      {/* <h2 style={{marginLeft: 15}}>Overview</h2> */}
      <PageBody>
        <Card className="col-md-12" style={{ backgroundColor: '#eef0f4', }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Card style={{ backgroundColor: '#5b69bc', flex: '2', height: "130px", borderRadius: '15px', color: "gray", }} >
              <p style={{ fontWeight: "bold", fontSize: 18, color: 'white' }}>Total Coupons </p>
              <Row>
                <BiGift size={35} style={{ color: 'white' }} />
                <h4 style={{ marginLeft: '70%', fontSize: 25, color: 'white' }}>122</h4>
              </Row>
            </Card>
            <Card style={{ backgroundColor: '#558b2f', flex: '2', height: "130px", marginLeft: 15, borderRadius: '15px', color: "gray" }} >
              <p style={{ fontWeight: "bold", fontSize: 16, color: 'white' }}>Total Product </p>
              <Row>
                <FaYandexInternational size={35} style={{ color: 'white' }} />
                <h4 style={{ marginLeft: '70%', fontSize: 25, color: 'white' }}>420</h4>
              </Row>
            </Card>
          </div>
          <Card className="col-md-12 mt-4" style={{ borderRadius: '15px' }}>
            <Row>
              <Col span={10}>
                <Pie
                  data={{
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
                      },
                    ],
                  }}
                  plugins={[ChartDataLabels]}
                  options={{
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
                      datalabels: {
                        formatter: (value, ctx) => {
                          let sum = 0;
                          let dataArr = ctx.chart.data.datasets[0].data;
                          dataArr.map(data => {
                            sum += data;
                          });
                          let percentage = (value * 100 / sum).toFixed(2) + "%";
                          return percentage;
                        },
                        color: 'black',
                        font: {
                          weight: 'bold',
                          size: 11
                        }
                      }
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
                  }}
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
                        'rgba(255, 206, 86, 0.6)',
                        // '#0175d8'
                      ],
                      data: dataSetBarLabels,
                      fill: false,
                      yAxisID: 'y1',
                    }, {
                      label: 'Times of use',
                      // yAxisID: 'A',
                      borderColor: 'rgba(255, 99, 132, 0.6)',
                      backgroundColor: [
                        'rgba(153, 102, 255, 0.6)',

                      ],
                      data: dataNumberOfUseBar,
                      type: 'line',
                      fill: false,
                      yAxisID: 'y',
                    },]
                  }}
                  //plugins={[ChartDataLabels]}
                  options={
                    {
                      responsive: true,
                      interaction: {
                        mode: 'index',
                        intersect: false,
                      },
                      plugins: {
                        title: {
                          display: true,
                          text: 'Highest Rated Coupons'
                        },
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
                          grid: {
                            drawOnChartArea: false,
                          },
                        },
                      }
                    }
                  }

                />
              </Col>
            </Row>
          </Card>
        </Card>
      </PageBody>
    </PageWrapper>
  );
};

export default SOHomePage;
