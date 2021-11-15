import { Card } from "antd";
import React, { useState, useEffect } from "react";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import "./index.scss";
import { Pie, defaults, Bar, Doughnut } from "react-chartjs-2";
import { Row, Col, PageHeader, DatePicker, Empty } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllCouponInUse } from "App/Services/couponInUse.service";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { BiGift } from "react-icons/bi";
import { FaYandexInternational } from "react-icons/fa";
import { selectStoreId } from "App/Stores/auth.slice";
import { truncate } from "App/Utils/utils";
import { countCoupon } from "App/Services/coupon.service";
import { countProduct } from "App/Services/product.service";

defaults.plugins.title.font.size = 20;
const { RangePicker } = DatePicker;

const SOHomePage = () => {
  const storeId = useSelector(selectStoreId);

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

  // Count stores
  const [dataCountCoupon, setCountCoupon] = useState();

  // Count floor plans
  const [dataCountProduct, setCountProduct] = useState();

  const getCountCoupon = async () => {
    const data = await countCoupon({ storeId: storeId, isAll: true });
    return data;
  };

  const getCountProduct = async () => {
    const data = await countProduct({ storeId: storeId, isAll: true });
    return data;
  };

  const getDataByDate = async (startDate, endDate) => {
    getCouponInUse(storeId, startDate, endDate).then((value) =>
      getReturnArray(value)
    );
  };

  const getCouponInUse = async (storeId, startDate, endDate) => {
    const data = await getAllCouponInUse({
      storeId: storeId,
      lowerApplyDate: startDate,
      upperApplyDate: endDate,
    });
    return data.content;
  };

  const getReturnArray = async (listCouponInUse) => {
    var key = "couponId";
    var returnArray = [];
    var averageRateScore = 0;
    var totalRatescore = 0;
    var newArray = [];

    const data = [
      ...new Map(listCouponInUse.map((item) => [item[key], item])).values(),
    ];

    data.forEach((element) => {
      totalRatescore = 0;
      returnArray = listCouponInUse.filter(
        (obj) => obj.couponId === element.couponId
      );
      var count = returnArray.length;
      returnArray.forEach((newElement) => {
        totalRatescore += newElement.rateScore;
      });
      averageRateScore = totalRatescore /= count;

      newArray.push({
        couponId: element.id,
        numberOfAppearance: count,
        name: element.coupon.name,
        avgRateScore: averageRateScore,
      });
    });

    const newData = newArray.sort((a, b) =>
      a.avgRateScore < b.avgRateScore ? 1 : -1
    );

    dataLabels(newData.map((_) => truncate(_.name, 20)));
    dataSetLabels(
      newData.map((_) => _.avgRateScore),
      newData.map((_) => _.numberOfAppearance)
    );
  };

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
    getCouponInUse(storeId).then((value) => getReturnArray(value));

    getCountCoupon()
      .then((value) => setCountCoupon(value))
      .catch((e) => console.log(e));

    getCountProduct()
      .then((value) => setCountProduct(value))
      .catch((e) => console.log(e));
  }, [dispatch]);

  return (
    <PageWrapper>
      <PageBody>
        <Card className="col-sm-12" style={{ backgroundColor: "#eef0f4" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Card
              style={{
                flex: "1",
                height: "130px",
                borderRadius: "5px",
              }}
              className="coupon-store-owner"
            >
              <p style={{ fontWeight: "bold", fontSize: 18, color: "white" }}>
                Total Coupons{" "}
              </p>
              <Row className="justify-content-between col-sm-11">
                <BiGift size={35} style={{ color: "white" }} />
                <h4 style={{ fontSize: 25, color: "white" }}>
                  {dataCountCoupon}
                </h4>
              </Row>
            </Card>

            <Card
              style={{
                backgroundColor: "#558b2f",
                flex: "1",
                height: "130px",
                marginLeft: 15,
                borderRadius: "5px",
              }}
              className="product-store-owner"
            >
              <p style={{ fontWeight: "bold", fontSize: 16, color: "white" }}>
                Total Product{" "}
              </p>
              <Row className="justify-content-between col-sm-11">
                <FaYandexInternational size={35} style={{ color: "white" }} />
                <h4 style={{ fontSize: 25, color: "white" }}>
                  {dataCountProduct}
                </h4>
              </Row>
            </Card>
          </div>
          <div
            className="col-sm-4 mt-4 d-flex flex-row d-inline-block justify-content-between rounded"
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
              style={{ borderRadius: "10px" }}
              onChange={(value) => {
                if (value) {
                  const startDate = value[0].format("YYYY-MM-DD");
                  const endDate = value[1].format("YYYY-MM-DD");
                  getDataByDate(startDate, endDate);
                } else {
                  getCouponInUse(storeId).then((value) =>
                    getReturnArray(value)
                  );
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
          {!!dataSetBarLabels.length && (
            <Row>
              <div className="col-sm-4 mt-2">
                <Card className="h-5">
                  <p
                    style={{
                      fontWeight: "bold",
                      fontFamily: "unset",
                      fontSize: "16px",
                      borderRadius: "5px",
                    }}
                  >
                    Most Used Coupons
                  </p>
                </Card>
                <Card className="pb-3" style={{ borderRadius: "5px" }}>
                  <Doughnut
                    // height={150}
                    className="mt-2"
                    data={{
                      labels: labels,
                      datasets: [
                        {
                          data: dataSetPieLabels,
                          label: "# of votes",
                          backgroundColor: [
                            "rgba(221, 56, 56, 1)",
                            "rgba(55, 161, 222, 0.66)",
                            "rgba(244, 244, 56, 1)",
                            "rgba(27, 245, 43, 0.66)",
                            "rgba(245, 27, 188, 0.66)",
                          ],
                          borderColor: [
                            "rgba(221, 56, 56, 1)",
                            "rgba(55, 161, 222, 0.66)",
                            "rgba(244, 244, 56, 1)",
                            "rgba(27, 245, 43, 0.66)",
                            "rgba(245, 27, 188, 0.66)",
                          ],
                        },
                      ],
                    }}
                    plugins={[ChartDataLabels]}
                    options={{
                      maintainAspectRatio: true,
                      plugins: {
                        // title: {
                        //   display: true,
                        //   text: "Most used coupons",
                        //   position: "top",
                        // },
                        legend: {
                          align: "start",
                          display: true,
                          position: "top",
                        },

                        datalabels: {
                          formatter: (value, ctx) => {
                            let sum = 0;
                            let dataArr = ctx.chart.data.datasets[0].data;
                            dataArr.map((data) => {
                              sum += data;
                            });
                            let percentage =
                              ((value * 100) / sum).toFixed(2) + "%";
                            return percentage;
                          },
                          color: "black",
                          font: {
                            weight: "bold",
                            size: 11,
                          },
                        },
                      },
                      // scales: { // vẽ ra mấy cái đánh số từ 0 --> 1
                      //   yAxes: [
                      //     {
                      //       ticks: {
                      //         beginAtZero: true,
                      //       },
                      //     },
                      //   ],
                      // },
                    }}
                  />

                  {/* <RangePicker
                    style={{
                      marginLeft: "8%",
                      marginTop: "15%",
                      marginRight: "8%",
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
                  /> */}
                </Card>
              </div>
              {/* </Col> */}

              {/* </Card> */}
              {/* <Col span={1}/> */}
              {/* <Card className="col-sm-8 mt-4" style={{ borderRadius: "5px" }}> */}
              <div className="col-sm-8 mt-2">
                <Card className="h-5" style={{ borderRadius: "5px" }}>
                  <Row
                    className="col-sm-12"
                    style={{
                      alignItems: "start",
                      justifyContent: "space-between",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "bold",
                        fontFamily: "unset",
                        fontSize: "16px",
                      }}
                    >
                      Highest Rated Coupons
                    </p>
                    {/* <RangePicker
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
                    /> */}
                  </Row>
                </Card>
                <Card style={{ borderRadius: "5px" }}>
                  <Bar
                    // height={177}
                    data={{
                      labels: labelBars,
                      datasets: [
                        {
                          label: "Rate Score",
                          borderColor: "rgba(54, 162, 235, 0.6)",
                          backgroundColor: ["#ffb455"],
                          data: dataSetBarLabels,
                          // fill: false,
                          xAxisID: "x1",
                        },
                        {
                          label: "Times of use",
                          borderColor: "rgba(255, 99, 132, 0.6)",
                          backgroundColor: ["#51d8af"],
                          data: dataNumberOfUseBar,
                          // fill: false,
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
                        // yAxes: [
                        //   {
                        //     ticks: {
                        //       fontColor: "black",
                        //       fontSize: 18,
                        //       stepSize: 1,
                        //       beginAtZero: true,
                        //     },
                        //   },
                        // ],
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
              </div>
            </Row>
          )}
          {!dataSetBarLabels.length && (
            <Card className="col-sm-12 mt-2" style={{ minHeight: "20vh" }}>
              <Empty
                style={{ fontWeight: "bold" }}
                imageStyle={{ minHeight: "20vh" }}
              ></Empty>
            </Card>
          )}
        </Card>
      </PageBody>
    </PageWrapper>
  );
};

export default SOHomePage;
