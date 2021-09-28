import React, { useState, useEffect } from "react";
import Card from "App/Components/Card";
import { PageHeader } from "antd";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import "./index.scss";
import { Pie, defaults, Bar } from 'react-chartjs-2'
import { Row, Col } from 'antd';
import { loadCouponInUses, selectListCouponInUse } from "App/Stores/couponInUse.slice";
import { useDispatch, useSelector } from "react-redux";
import { getStoreByBuildingId } from "App/Services/store.service";
import { getAllCouponInUse } from "App/Services/couponInUse.service";
import { element } from "prop-types";

const BmHomePage = () => {
  const dispatch = useDispatch();
  const listCouponInUse = useSelector(selectListCouponInUse);
  const [dataStore, setDataStore] = useState([]);
  const [dataCoupon, setDataCoupon] = useState([]);
  const [dataCouponTotal, setDataCouponTotal] = useState(null);
  
  // for pie chart
  const [labels, setLabel] = useState([]);
  const [dataSetPieLabels, setDataPieLabels] = useState([]);
  // end pie chart

  // for bar chart
  const [labelBars, setLabelBar] = useState([]);
  const [dataSetBarLabels, setDataBarLabels] = useState([]);
  const [dataNumberOfUseBar, setNumberOfUseBarLabels] = useState([]);
  // end bar chart

  const dataLabels = () => {
    // setLabel(nameArray);
    setLabel(['Red', 'Blue', 'Yellow', 'Green', 'Purple']);
    //setLabelBar(['Giảm 100%', 'Giảm 80%', 'Giảm 60%', 'Giảm 50%', 'Giảm 40%', 'Giảm 30%']);
    setLabelBar(nameArray);
  };
  const dataSetLabels = () => {
    // setDataPieLabels(numberOfAppearanceArray);
    setDataPieLabels([12, 19, 3, 5, 5]);
    setDataBarLabels([4.5, 4.1, 4.8, 4.4, 4.2, 4.3]);
    setNumberOfUseBarLabels([4.5, 4.1, 4.8, 4.4, 4.2, 4.3]);
    // setDataBarLabels(numberOfUsesArray);
    // setNumberOfUseBarLabels(numberOfAppearanceArray);
  };

  const getAllStoreByBuildingId = async () => {
    const data = await getStoreByBuildingId({
      buildingId: 12,
    });
    setDataStore(data.content);
  };

  const getCouponInUse = async (storeId) => {
    const data = await getAllCouponInUse({
      storeId: storeId,
    });
    setDataCoupon(data.content);
    setDataCouponTotal(data.totalCount);
    //console.log("=========total: "+ data.totalCount);
  };
  // console.log("dataCoupon : ", dataCoupon);

  var newArray = [];
  var returnArray = [];

  var nameArray = [];
  var numberOfUsesArray = [];
  // console.log("dataStore: " + JSON.stringify(dataStore));

  //dataStore = JSON.stringify(dataStore);
  const getReturnArray = async () => {
    dataStore.forEach(element => {
      var id = JSON.stringify(element.id);
      var name = JSON.stringify(element.name);
    //  console.log("=======================================================id======: " + id);
      getCouponInUse(id); 
      //console.log("du lieu ne: ", dataCoupon.size);
      // console.log("=========total: "+ dataCouponTotal);
      var newDataCoupon = JSON.stringify(dataCoupon);
      var lengCoupon = newDataCoupon.length;
       console.log("số lượng: " + lengCoupon);
       console.log("new data coupon: " + newDataCoupon);
      // newArray = dataCoupon.filter((obj) => obj.id === element.id);
      returnArray.push({ name: name, numberOfUses: lengCoupon });
    })
    // console.log("return array : ", returnArray);
   }

    console.log("Hello");
  // if (returnArray != null) {
    // console.log("return array ngoai loop: ", returnArray);
    returnArray.sort((a, b) => a.numberOfUses < b.numberOfUses ? 1 : -1);
    nameArray = returnArray.map(_ => _.name);
    numberOfUsesArray = returnArray.map(_ => _.numberOfUses);
  // }

  // console.log("return array : ", returnArray);
  // console.log("nameArray : ", nameArray);
  // console.log("so lan su dung : ", numberOfUsesArray);

  useEffect(() => {
    getAllStoreByBuildingId();
    getReturnArray();
    // getAllStoreByBuildingId();
    dataLabels();
    dataSetLabels();
  }, [dispatch]);


  return (
    <PageWrapper>
      {/* <PageHeader title="Overview" subTitle="Building Manager" /> */}
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
                }
                }
                options={
                  {
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
                  }, {
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
                        text: 'Most of store used coupons'
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

export default BmHomePage;
