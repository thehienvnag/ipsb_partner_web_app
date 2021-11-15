import React, { createElement, useState, useEffect } from "react";
import { Empty } from "antd";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import "./index.scss";
import { Bar } from "react-chartjs-2";
import {
  Row,
  Col,
  DatePicker,
  Comment,
  Tooltip,
  Avatar,
  Card,
  Button,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { countStore, getStoreByBuildingId } from "App/Services/store.service";
import { getAllCouponInUse } from "App/Services/couponInUse.service";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { BiStoreAlt, BiMapAlt, BiMapPin } from "react-icons/bi";
import { RiSignalTowerFill } from "react-icons/ri";
import { DislikeFilled, LikeFilled } from "@ant-design/icons";
import moment from "moment";
import { selectBuildingId } from "App/Stores/auth.slice";
import { countFloorPlan } from "App/Services/floorPlan.service";
import { countLocatorTags } from "App/Services/locatorTag.service";
import { countFacility } from "App/Services/facility.service";

const { RangePicker } = DatePicker;

const BmHomePage = () => {
  const dispatch = useDispatch();

  // Building Id
  const buildingId = useSelector(selectBuildingId);

  // for top bar chart
  const [labelBars, setLabelBar] = useState([]);
  const [dataNumberOfUseBar, setNumberOfUseBarLabels] = useState([]);
  // end top bar chart

  // for bottom bar chart
  const [bottomLabelBars, setBottomLabelBar] = useState([]);
  const [bottomDataAverageScoreLabels, setBottomAverageScoreLabels] = useState(
    []
  );
  const [bottomDataNumberOfUseBar, setBottomNumberOfUseBarLabels] = useState(
    []
  );
  // end bottom bar chart

  // Count stores
  const [dataCountStore, setCountStore] = useState();

  // Count floor plans
  const [dataCountFloorPlan, setCountFloorPlan] = useState();

  // Count floor plans
  const [dataCountFacility, setCountFacility] = useState();

  // Count floor plans
  const [dataCountBeacon, setCountBeacon] = useState();

  const getDataByDate = async (startDate, endDate) => {
    getAllStoreByBuildingId()
      .then((value) => getReturnArray(value, startDate, endDate))
      .then((value) => getBottomReturnArray(value))
      .catch((e) => console.log(e));
  };

  const getCountStore = async () => {
    const data = await countStore({ buildingId: buildingId, isAll: true });
    return data;
  };

  const getCountFloorPlan = async () => {
    const data = await countFloorPlan({ buildingId: buildingId, isAll: true });
    return data;
  };

  const getCountFacility = async () => {
    const data = await countFacility({ buildingId: buildingId, isAll: true });
    return data;
  };

  const getCountBeacon = async () => {
    const data = await countLocatorTags({
      buildingId: buildingId,
      isAll: true,
    });
    return data;
  };

  const getAllStoreByBuildingId = async () => {
    const data = await getStoreByBuildingId({
      buildingId: buildingId,
    });
    return data.content;
  };

  const getCouponInUse = async (storeId, storeName, startDate, endDate) => {
    const data = await getAllCouponInUse({
      storeId: storeId,
      lowerApplyDate: startDate,
      upperApplyDate: endDate,
    });
    var averageRateScore = 0;

    var newDataCoupon = data.content;
    if (newDataCoupon.length) {
      var lengCoupon = newDataCoupon.length;
      newDataCoupon.forEach((element) => {
        averageRateScore += element.rateScore;
      });
      averageRateScore /= lengCoupon;

      if (!averageRateScore) {
        averageRateScore = 0;
      } else {
        averageRateScore = averageRateScore.toFixed(2);
      }

      return {
        name: storeName,
        numberOfUses: lengCoupon,
        averageRateScore: averageRateScore,
      };
    } else {
      return null;
    }
  };

  const dataLabels = (data) => {
    setLabelBar(data);
  };

  const dataSetLabels = (data) => {
    setNumberOfUseBarLabels(data);
  };

  const bottomDataLabels = (data) => {
    setBottomLabelBar(data);
  };

  const bottomAverageScoreLabels = (data) => {
    setBottomAverageScoreLabels(data);
  };

  const bottomDataSetLabels = (data) => {
    setBottomNumberOfUseBarLabels(data);
  };

  const getReturnArray = async (dataStore, startDate, endDate) => {
    var data = await Promise.all(
      dataStore.map((element) => {
        const coupon = getCouponInUse(
          element.id,
          element.name,
          startDate,
          endDate
        );
        if (coupon) {
          return coupon;
        }
      })
    );
    data = data.filter(function (e) {
      return e != null;
    });
    data.sort((a, b) => (a.numberOfUses < b.numberOfUses ? 1 : -1));
    const newData = data.slice(0, 10);
    dataLabels(
      newData.map((element) => {
        return element.name;
      })
    );
    dataSetLabels(newData.map((element) => element.numberOfUses));
    return data;
  };

  const getBottomReturnArray = async (data) => {
    data.sort((a, b) => (a.averageRateScore < b.averageRateScore ? 1 : -1));
    const newData = data.slice(0, 10);
    bottomDataLabels(
      newData.map((element) => {
        return element.name;
      })
    );
    bottomDataSetLabels(newData.map((element) => element.numberOfUses));
    bottomAverageScoreLabels(
      newData.map((element) => element.averageRateScore)
    );
  };

  useEffect(() => {
    getAllStoreByBuildingId()
      .then((value) => getReturnArray(value))
      .then((value) => getBottomReturnArray(value))
      .catch((e) => console.log(e));

    getCountStore()
      .then((value) => setCountStore(value))
      .catch((e) => console.log(e));

    getCountFloorPlan()
      .then((value) => setCountFloorPlan(value))
      .catch((e) => console.log(e));

    getCountFacility()
      .then((value) => setCountFacility(value))
      .catch((e) => console.log(e));

    getCountBeacon()
      .then((value) => setCountBeacon(value))
      .catch((e) => console.log(e));

    // if (dataStartDate) {
    //   getDataByDate();
    // }
    // dataLabels();
    // dataSetLabels();
  }, [dispatch]);

  return (
    <PageWrapper>
      {/* <PageHeader title="Overview" subTitle="Building Manager"/> */}
      <PageBody>
        <Card className="col-md-12" style={{ backgroundColor: "#eef0f4" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Card
              className="coupon-building-manager"
              style={{
                backgroundColor: "#5b69bc",
                flex: "1",
                height: "130px",
                borderRadius: "5px",
                color: "gray",
              }}
            >
              <div>
                <Row className="justify-content-between">
                  <Col>
                    <h4 style={{ fontSize: 25, color: "white" }}>
                      {dataCountStore}
                    </h4>
                    {/* <p
                      style={{
                        fontWeight: "bold",
                        fontSize: 18,
                        color: "white",
                      }}
                    > */}
                    <p
                      className="col"
                      style={{
                        fontFamily: "unset",
                        fontSize: "16px",
                        justifyContent: "space-between",
                        color: "white",
                      }}
                    >
                      Total Stores{" "}
                    </p>
                  </Col>

                  <BiStoreAlt
                    className="mt-2"
                    size={45}
                    style={{ color: "white" }}
                  />
                </Row>
              </div>
            </Card>
            <Card
              className="product-building-manager"
              style={{
                flex: "1",
                height: "130px",
                marginLeft: 15,
                borderRadius: "5px",
              }}
            >
              <div>
                <Row className="justify-content-between">
                  <Col>
                    <h4 style={{ fontSize: 25, color: "white" }}>
                      {dataCountFloorPlan}
                    </h4>
                    <p
                      className="col"
                      style={{
                        fontFamily: "unset",
                        fontSize: "16px",
                        justifyContent: "space-between",
                        color: "white",
                      }}
                    >
                      Total Floor Plans{" "}
                    </p>
                  </Col>

                  <BiMapAlt
                    className="mt-2"
                    size={45}
                    style={{ color: "white" }}
                  />
                </Row>
              </div>
            </Card>
            <Card
              className="place-building-manager"
              style={{
                flex: "1",
                height: "130px",
                marginLeft: 15,
                borderRadius: "5px",
              }}
            >
              <div>
                <Row className="justify-content-between">
                  <Col>
                    <h4 style={{ fontSize: 25, color: "white" }}>
                      {dataCountFacility}
                    </h4>
                    <p
                      className="col"
                      style={{
                        fontFamily: "unset",
                        fontSize: "16px",
                        justifyContent: "space-between",
                        color: "white",
                      }}
                    >
                      Total Facilities{" "}
                    </p>
                  </Col>

                  <BiMapPin
                    className="mt-2"
                    size={45}
                    style={{ color: "white" }}
                  />
                </Row>
              </div>
            </Card>
            <Card
              className="iBeacon-building-manager"
              style={{
                flex: "1",
                height: "130px",
                marginLeft: 15,
                borderRadius: "5px",
              }}
            >
              <div>
                <Row className="justify-content-between">
                  <Col>
                    <h4 style={{ fontSize: 25, color: "white" }}>
                      {dataCountBeacon}
                    </h4>
                    <p
                      className="col"
                      style={{
                        fontFamily: "unset",
                        fontSize: "16px",
                        justifyContent: "space-between",
                        color: "white",
                      }}
                    >
                      Total IBeacons{" "}
                    </p>
                  </Col>
                  <RiSignalTowerFill
                    className="mt-2"
                    size={45}
                    style={{ color: "white" }}
                  />
                </Row>
              </div>
            </Card>
          </div>

          <Col>
            <div className="col-md-12 mt-4" style={{ borderRadius: "5px" }}>
              {/* <Card> */}
              <div
                className="col-sm-4 d-flex flex-row d-inline-block justify-content-between rounded"
                style={{
                  background: "linear-gradient(#ce7ffe, #ad62fd)",
                }}
              >
                <p
                  className="pt-2 mb-2"
                  style={{
                    color: "white",
                    paddingLeft: "10px",
                    fontWeight: "bold",
                    fontFamily: "unset",
                    fontSize: "14px",
                    // marginBottom: "-5px",
                  }}
                >
                  Date Filter
                </p>
                <RangePicker
                  className="shadow bg-white rounded w-75"
                  // style={{ borderRadius: "10px" }}
                  onChange={(value) => {
                    if (value) {
                      const startDate = value[0].format("YYYY-MM-DD");
                      const endDate = value[1].format("YYYY-MM-DD");
                      getDataByDate(startDate, endDate);
                    } else {
                      getAllStoreByBuildingId()
                        .then((value) => getReturnArray(value))
                        .then((value) => getBottomReturnArray(value))
                        .catch((e) => console.log(e));
                    }
                  }}
                  dateRender={(current) => {
                    const style = {};
                    if (current.date() === 1) {
                      style.border = "1px solid #1890ff";
                      style.borderRadius = "50%";
                    }
                    return (
                      <div className="ant-picker-cell-inner" style={style}>
                        {current.date()}
                      </div>
                    );
                  }}
                />
              </div>

              {/* </Card> */}
              <div
                className="h-5 mt-2 bg-white"
                style={{ borderRadius: "5px" }}
              >
                {/* <Row> */}
                <p
                  className="p-3"
                  style={{
                    fontWeight: "bold",
                    fontFamily: "unset",
                    fontSize: "18px",
                    justifyContent: "space-between",
                  }}
                >
                  Most Of Store Used Coupons
                </p>
                {/* </Row> */}
              </div>
              {!!bottomLabelBars.length && (
                <Card className="mt-1" style={{ borderRadius: "5px" }}>
                  <Bar
                    height={100}
                    data={{
                      labels: labelBars,
                      datasets: [
                        {
                          label: "Times of use",
                          borderColor: "#e37b4c",
                          backgroundColor: ["#0175d8"],
                          data: dataNumberOfUseBar,
                          fill: false,
                          yAxisID: "y",
                        },
                      ],
                      backgroundColor: "rgba(0,123,255,0.1)",
                      borderColor: "rgba(0,123,255,1)",
                      pointBackgroundColor: "#ffffff",
                      pointHoverBackgroundColor: "rgb(0,123,255)",
                      borderWidth: 1.5,
                      pointRadius: 0,
                      pointHoverRadius: 3,
                    }}
                    plugins={[ChartDataLabels]}
                    options={{
                      indexAxis: "y",
                      responsive: true,
                      interaction: {
                        mode: "index",
                        intersect: false,
                      },

                      plugins: {
                        datalabels: {
                          color: "white",
                          font: {
                            weight: "bold",
                            size: 11,
                          },
                        },
                      },
                    }}
                  />
                </Card>
              )}
              {!bottomLabelBars.length && (
                <Card className="col-sm-12" style={{ minHeight: "20vh" }}>
                  <Empty
                    style={{ fontWeight: "bold" }}
                    imageStyle={{ minHeight: "20vh" }}
                  ></Empty>
                </Card>
              )}
            </div>

            <div>
              <div
                className="h-5 mt-4 bg-white"
                style={{ borderRadius: "5px" }}
              >
                <p
                  className="p-3"
                  style={{
                    fontWeight: "bold",
                    fontFamily: "unset",
                    fontSize: "18px",
                    justifyContent: "space-between",
                  }}
                >
                  Highest Rated Stores
                </p>
              </div>
              {!!bottomLabelBars.length && (
                <Card
                  className="col-sm-12 mt-1"
                  style={{ borderRadius: "5px" }}
                >
                  <Bar
                    height={150}
                    data={{
                      labels: bottomLabelBars,
                      datasets: [
                        {
                          label: "Rate Score",
                          borderColor: "rgba(54, 162, 235, 0.6)",
                          backgroundColor: ["#ffb455"],
                          data: bottomDataAverageScoreLabels,
                          xAxisID: "x1",
                        },
                        {
                          label: "Times of use",
                          borderColor: "rgba(255, 99, 132, 0.6)",
                          backgroundColor: ["#51d8af"],
                          data: bottomDataNumberOfUseBar,
                          xAxisID: "x2",
                        },
                      ],
                      backgroundColor: "rgba(0,123,255,0.1)",
                      borderColor: "rgba(0,123,255,1)",
                      pointBackgroundColor: "#ffffff",
                      pointHoverBackgroundColor: "rgb(0,123,255)",
                      borderWidth: 1.5,
                      pointRadius: 0,
                      pointHoverRadius: 3,
                    }}
                    plugins={[ChartDataLabels]}
                    options={{
                      indexAxis: "y",
                      responsive: true,
                      interaction: {
                        mode: "index",
                        intersect: false,
                      },

                      interaction: {
                        mode: "index",
                        intersect: false,
                      },
                      plugins: {
                        datalabels: {
                          color: "black",
                          font: {
                            weight: "bold",
                            size: 11,
                          },
                        },
                      },
                      scales: {
                        x1: {
                          type: "linear",
                          display: true,
                          position: "top",
                          grid: {
                            borderColor: "#ffb455",
                          },
                        },
                        x2: {
                          type: "linear",
                          display: true,
                          position: "bottom",
                          grid: {
                            borderColor: "#51d8af",
                            drawOnChartArea: false,
                          },
                        },
                      },
                    }}
                  />
                </Card>
              )}
              {!bottomLabelBars.length && (
                <Card className="col-sm-12" style={{ minHeight: "20vh" }}>
                  <Empty
                    style={{ fontWeight: "bold" }}
                    imageStyle={{ minHeight: "20vh" }}
                  ></Empty>
                </Card>
              )}
            </div>
          </Col>
        </Card>
      </PageBody>
    </PageWrapper>
  );
};

export default BmHomePage;
