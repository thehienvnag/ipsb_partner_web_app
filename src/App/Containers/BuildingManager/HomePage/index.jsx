import React, { useState, useEffect } from "react";
import Card from "App/Components/Card";
import { PageHeader } from "antd";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import "./index.scss";
import { Pie, defaults, Bar } from 'react-chartjs-2';
import { Row, Col } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { getStoreByBuildingId } from "App/Services/store.service";
import { getAllCouponInUse } from "App/Services/couponInUse.service";
import { getVisitPointByBuildingId } from "App/Services/visitPoint.service";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const BmHomePage = () => {
  const dispatch = useDispatch();

  // for pie chart
  const [labels, setLabel] = useState([]);
  const [dataPieLabels, setDataPieLabels] = useState([]);
  // end pie chart

  // for bar chart
  const [labelBars, setLabelBar] = useState([]);
  const [dataSetBarLabels, setDataBarLabels] = useState([]);
  const [dataNumberOfUseBar, setNumberOfUseBarLabels] = useState([]);
  // end bar chart

  const dataLabels = (data) => {
    setLabelBar(data);
  };
  const dataSetLabels = (data) => {
    setNumberOfUseBarLabels(data);
  };

  const getdataPieLabels = (data) => {
    setLabel(data);
  }

  const getdataSetPieLabels = (data) => {
    setDataPieLabels(data);
  }

  const getAllStoreByBuildingId = async () => {
    const data = await getStoreByBuildingId({
      buildingId: 12,
    });
    return data.content;
  };

  const getCouponInUse = async (storeId, storeName) => {
    const data = await getAllCouponInUse({
      storeId: storeId,
    });
    var newDataCoupon = data.content;
    var lengCoupon = newDataCoupon.length;

    return {name : storeName, numberOfUses: lengCoupon};
  };

  const getAllVisitPoinByBuildingIdAndLocationType = async () => {
    const data = await getVisitPointByBuildingId({
      buildingId: 12,
      locationTypeId: 1
    });
    return data.content;
  };

  const getVisitPointArray = async(dataStore) => {
    var key = "locationId";
    var returnArray = [];
    var newArray = [];

    const data = [...new Map(dataStore.map(item =>
      [item[key], item])).values()];

    console.log(data);
    data.forEach(element => {
      
      returnArray = dataStore.filter((obj) => obj.locationId === element.locationId);
      console.log(returnArray);
      var count = returnArray.length;
      newArray.push({name : element.location.store.name, numberOfAppearance : count});
      });
      
      newArray.sort((a, b) => a.numberOfAppearance < b.numberOfAppearance ? 1 : -1);
      const newData =  newArray.slice(0, 10);
      getdataPieLabels(newData.map(_ => _.name));
      getdataSetPieLabels(newData.map(_ => _.numberOfAppearance));  
  }

  const getReturnArray = async (dataStore) => {
    // console.log(dataStore);
    const data = await Promise.all(dataStore.map(element => getCouponInUse(element.id, element.name)));
    data.sort((a, b) => a.numberOfUses < b.numberOfUses ? 1 : -1);
    const newData = data.slice(0, 10);
    dataLabels(newData.map(element => element.name));
    dataSetLabels(newData.map(element => element.numberOfUses));
   }
  
  useEffect(() => {
    getAllStoreByBuildingId().then((value) => getReturnArray(value)).catch((e) => console.log(e));
    getAllVisitPoinByBuildingIdAndLocationType()
    .then((value) => getVisitPointArray(value)).catch((e) => console.log(e));
    dataLabels();
    dataSetLabels();
  }, [dispatch]);


  return (
    <PageWrapper>
      {/* <PageHeader title="Overview" subTitle="Building Manager"/> */}
      <PageBody>
        <Card className="col-md-12">
          <Row>
            <Col span={10}>
              <Pie
                height={180}
                width={180}
                data={{
                  labels: labels,
                  datasets: [
                    {
                      data: dataPieLabels,
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
                }
                }
                plugins={[ChartDataLabels]}
                options={
                  {
                    tooltips: {
                      enabled: false
                    },
                    maintainAspectRatio: true,
                    plugins: {
                      title: {
                        display: true,
                        text: "Store customers go through most",
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
                          let percentage = (value*100 / sum).toFixed(2)+"%";
                          return percentage;
                        },
                        color: 'black',
                        font: {
                          weight : 'bold',
                          size: 11                        }
                        }
                    },
                    scales: { // vẽ ra mấy cái đánh số từ 0 --> 1
                      x:{
                        stacked: true,
                      },
                      yAxes: [
                        {
                          stacked : true,
                          ticks: {
                            beginAtZero: true,
                          },
                        },
                      ],
                    },
                  }
                }
              />
            </Col>
            <Col span={1} />
            <Col span={13}>
              <Bar
                height={200}
                // width={300}
                data={{
                  labels: labelBars,
                  datasets: [
                  {
                    label: 'Times of use',
                    borderColor: '#e37b4c',
                    backgroundColor: [
                      '#e37b4c'
                    ],
                    data: dataNumberOfUseBar,
                    fill: false,
                    yAxisID: 'y',
                  },]
                }}
                plugins={[ChartDataLabels]}
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
                        text: 'Most of store used coupons'
                      }
                    },
                    scales: {
                      y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
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

export default BmHomePage;
