import React, { createElement, useState, useEffect } from "react";
import { PageHeader } from "antd";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import "./index.scss";
import { Pie, defaults, Bar, Doughnut } from 'react-chartjs-2';
import { Row, Col, DatePicker, Comment, Tooltip, Avatar, Card ,Button } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { getStoreByBuildingId } from "App/Services/store.service";
import { getAllCouponInUse } from "App/Services/couponInUse.service";
import { getVisitPointByBuildingId } from "App/Services/visitPoint.service";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { BiStoreAlt, BiMapAlt, BiMapPin } from "react-icons/bi";
import { RiSignalTowerFill } from "react-icons/ri";
import { DislikeFilled, LikeFilled } from '@ant-design/icons';
import moment from 'moment';

const { RangePicker } = DatePicker;


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

    return { name: storeName, numberOfUses: lengCoupon };
  };

  const getAllVisitPoinByBuildingIdAndLocationType = async () => {
    const data = await getVisitPointByBuildingId({
      buildingId: 12,
      locationTypeId: 1
    });
    return data.content;
  };

  const getVisitPointArray = async (dataStore) => {
    var key = "locationId";
    var returnArray = [];
    var newArray = [];

    const data = [...new Map(dataStore.map(item => [item[key], item])).values()];
    data.forEach(element => {
      returnArray = dataStore.filter((obj) => obj.locationId === element.locationId);
      var count = returnArray.length;
      newArray.push({ name: element.location?.store?.name, numberOfAppearance: count });
    });

    newArray.sort((a, b) => a.numberOfAppearance < b.numberOfAppearance ? 1 : -1);
    const newData = newArray.slice(0, 10);
    getdataPieLabels(newData.map(_ => _.name));
    getdataSetPieLabels(newData.map(_ => _.numberOfAppearance));
  }

  const getReturnArray = async (dataStore) => {
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
    getCouponInUseByID();
  }, [dispatch]);


  const [dataFeedback, setDataFeedback] = useState([]);

  const getCouponInUseByID = async () => {
    const data = await getAllCouponInUse({
      storeId: 8,
    });
    setDataFeedback(data.content);
  };
  // for view feedback
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction('disliked');
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(LikeFilled)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(DislikeFilled)}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">View reply </span>,
  ];
  //end feedback
  function ShowListFeedback() {
    var newArray = dataFeedback;
    newArray.sort((a, b) => a.feedbackDate < b.feedbackDate ? 1 : -1);
    const newData = newArray.slice(0, 3);
    const listFeedbacks = newData.map((element) =>
      <Comment
        actions={actions}
        author={<h5 style={{fontWeight: 'bold'}}>{element.visitor.name}</h5>}
        datetime={<span>{moment(element.feedbackDate).format("DD-MM-YYYY (hh:mm)")}</span>}
        avatar={<Avatar shape="square" size="large" src={element.visitor.imageUrl} />}
        content={
          <p>{element.feedbackContent}</p>
        }
      />
    );
    return (
      <div>
        {listFeedbacks}
        <hr/>
        <div style={{float: 'right'}}>
          <Button color={{color: 'gray'}} style={{color: 'black'}}>View more feedback</Button>
        </div>
      </div>
    );
  }

  return (
    <PageWrapper>
      {/* <PageHeader title="Overview" subTitle="Building Manager"/> */}
      <PageBody>
        <Card className="col-md-12" style={{ backgroundColor: '#eef0f4', }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Card style={{ backgroundColor: '#5b69bc', flex: '1', height: "130px", borderRadius: '15px', color: "gray", }} >
              <p style={{ fontWeight: "bold", fontSize: 18, color: 'white' }}>Total Stores </p>
              <Row>
                <BiStoreAlt size={35} style={{ color: 'white' }} />
                <h4 style={{ marginLeft: '55%', fontSize: 25, color: 'white' }}>42</h4>
              </Row>
            </Card>
            <Card style={{ backgroundColor: '#558b2f', flex: '1', height: "130px", marginLeft: 15, borderRadius: '15px', color: "gray" }} >
              <p style={{ fontWeight: "bold", fontSize: 16, color: 'white' }}>Total Floor Plans </p>
              <Row>
                <BiMapAlt size={35} style={{ color: 'white' }} />
                <h4 style={{ marginLeft: '55%', fontSize: 25, color: 'white' }}>42</h4>
              </Row>
            </Card>
            <Card style={{ backgroundColor: '#e5343d', flex: '1', height: "130px", marginLeft: 15, borderRadius: '15px', color: "gray" }} >
              <p style={{ fontWeight: "bold", fontSize: 16, color: 'white' }}>Total Places </p>
              <Row>
                <BiMapPin size={35} style={{ color: 'white' }} />
                <h4 style={{ marginLeft: '55%', fontSize: 25, color: 'white' }}>42</h4>
              </Row>
            </Card>
            <Card style={{ backgroundColor: '#ef6c00', flex: '1', height: "130px", marginLeft: 15, borderRadius: '15px', color: "gray" }} >
              <p style={{ fontWeight: "bold", fontSize: 16, color: 'white' }}>Total IBeacons </p>
              <Row>
                <RiSignalTowerFill size={35} style={{ color: 'white' }} />
                <h4 style={{ marginLeft: '55%', fontSize: 25, color: 'white' }}>42</h4>
              </Row>
            </Card>
          </div>
          <Card className="col-md-12 mt-4" style={{ borderRadius: '15px' }}>
            <Row >
              <Col span={24}>
                <Row>
                  <h3 className='font-weight-bold'>Most Of Store Used Coupons</h3>
                  <RangePicker style={{ marginLeft: '40%' }}
                    dateRender={current => {
                      const style = {};
                      if (current.date() === 1) {
                        style.border = '1px solid #1890ff';
                        style.borderRadius = '50%';
                      }
                      return (
                        <div className="ant-picker-cell-inner" style={style}>
                          {current.date()}
                        </div>
                      );
                    }}
                  />,
                </Row>
                <Bar
                  height={120}
                  // width={300}
                  data={{
                    labels: labelBars,
                    datasets: [
                      {
                        label: 'Times of use',
                        borderColor: '#e37b4c',
                        backgroundColor: [
                          '#0175d8'
                        ],
                        data: dataNumberOfUseBar,
                        fill: false,
                        yAxisID: 'y',
                      },
                    ],
                    backgroundColor: "rgba(0,123,255,0.1)",
                    borderColor: "rgba(0,123,255,1)",
                    pointBackgroundColor: "#ffffff",
                    pointHoverBackgroundColor: "rgb(0,123,255)",
                    borderWidth: 1.5,
                    pointRadius: 0,
                    pointHoverRadius: 3
                  }}
                  plugins={[ChartDataLabels]}
                  options={
                    {
                      indexAxis: 'y',
                      responsive: true,
                      interaction: {
                        mode: 'index',
                        intersect: false,
                      },
                      scales: {
                        xAxes: [{
                          ticks: {
                            fontColor: "black",
                            fontSize: 18,
                            stepSize: 1,
                            beginAtZero: true
                          }
                        }],
                      },
                      plugins: {
                        // title: {
                        //   display: true,
                        //   text: 'Most of store used coupons',
                        //   // position: 'left'
                        // },
                        datalabels: {
                          color: 'white',
                          font: {
                            weight: 'bold',
                            size: 11
                          }
                        }
                      },

                    }
                  }

                />
              </Col>
            </Row>
          </Card>
          <Row>
            <Card className="col-md-5 mt-4" style={{ borderRadius: '15px' }}>
              <Col >
                <h3 className='font-weight-bold'>Store customers go through most</h3>
                <hr/>
                <Doughnut
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
                        // title: {
                        //   display: true,
                        //   text: "Store customers go through most",
                        //   position: "top"
                        // },
                        legend: {
                          display: true,
                          position: 'right',
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
                      // scales: { // vẽ ra mấy cái đánh số từ 0 --> 1
                      //   x:{
                      //     stacked: true,
                      //   },
                      //   yAxes: [
                      //     {
                      //       stacked : true,
                      //       ticks: {
                      //         beginAtZero: true,
                      //       },
                      //     },
                      //   ],
                      // },
                    }
                  }
                />
                <RangePicker style={{ marginLeft: '10%' }}
                  dateRender={current => {
                    const style = {};
                    if (current.date() === 1) {
                      style.border = '1px solid #1890ff';
                      style.borderRadius = '50%';
                    }
                    return (
                      <div className="ant-picker-cell-inner" style={style}>
                        {current.date()}
                      </div>
                    );
                  }}
                />,
              </Col>
            </Card>
            <Card className="col-md-1 mt-4" style={{ backgroundColor: '#eef0f4', }} />
            {/* <div style={{width: '30px'}}> </div> */}
            <Card className="col-md-6 mt-4" style={{ borderRadius: '15px' }}>
              <Col>
                <h3 className='font-weight-bold'>New Custommer Feedbacks</h3>
                <hr/>
                <ShowListFeedback/>
              </Col>
            </Card>
          </Row>
        </Card>
      </PageBody>
    </PageWrapper>
  );
};

export default BmHomePage;
