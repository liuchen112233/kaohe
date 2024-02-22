import React, { useEffect, useState } from "react";
import { Col, Row, Radio, Select, Button, DatePicker } from "antd";
import {
  BellOutlined,
  RightOutlined,
  AlertOutlined,
  CheckSquareOutlined,
  SoundOutlined,
} from "@ant-design/icons";
import "./Index.less";
import * as echarts from "echarts";
import { BarChart, FunnelChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
} from "echarts/components";
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from "echarts/features";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers";
import { getWorkdesk } from "@/api/api";
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  FunnelChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);
const { RangePicker } = DatePicker;
export default function Index() {
  const [radioValue, setRadioValue] = useState("1");
  const [barData, setBarData] = useState([]);
  const [funnelData, setFunnelData] = useState([]);
  let [activityEnd, setActivityEnd] = useState({});
  let [activityRemid, setActivityRemid] = useState({});
  let [activityTodo, setActivityTodo] = useState({});
  let [systemInform, setSystemInform] = useState({});
  let [dataManage, setDataManage] = useState({});

  const radioOnChange = ({ target: { value } }) => {
    console.log(value);
    setRadioValue(value);
  };
  const selectOptions = [
    {
      label: "权益发放统计",
      value: "1",
    },
    {
      label: "权益活动发放统计",
      value: "2",
    },
    {
      label: "权益订单统计",
      value: "3",
    },
    {
      label: "商品订单统计",
      value: "4",
    },
  ];
  const handleChange = () => {};
  useEffect(() => {
    getWorkdesk().then((res) => {
      setActivityEnd(res.data.activity.activityEnd);
      setActivityRemid(res.data.activity.activityRemid);
      setActivityTodo(res.data.activity.activityTodo);
      setSystemInform(res.data.activity.systemInform);
      setDataManage(res.data.dataManage);
      setBarData(res.data.barData);
      setFunnelData(res.data.funnelData);
    });
  }, []);
  useEffect(() => {
    if (barData.length && funnelData.length > 0) {
      let barChart = echarts.init(document.getElementById("barChart"));
      let funnelChart = echarts.init(document.getElementById("funnelChart"));
      barChart.setOption({
        tooTip: {
          show: true,
        },
        xAxis: {
          axisLabel: {
            interval: 0,
            rotate: 40,
          },
          type: "category",
          data: [
            "爱奇艺会员",
            "马术权益",
            "便捷挂号",
            "游泳权益",
            "腾讯视频",
            "QQ音乐",
            "网易云音乐",
            "叮咚买菜",
            "优酷视频",
            "奈雪的茶",
          ],
        },
        yAxis: {
          type: "value",
          name: "订单数量",
        },

        series: [
          {
            label: {
              show: true,
              position: "top",
            },
            data: barData,
            type: "bar",
            barWidth: 20,
            itemStyle: {
              color: function (params) {
                let colorarrays = [
                  "#FABC36",
                  "#3377FF",
                  "#FABC36",
                  "#3377FF",
                  "#FABC36",
                  "#3377FF",
                  "#FABC36",
                  "#3377FF",
                  "#FABC36",
                  "#3377FF",
                ];
                return colorarrays[params.dataIndex];
              },
            },
          },
        ],
      });
      funnelChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: (params, ticket, callback) => {
            const { data } = params;
            return `
          <div style="font-size:14px">
            <p>
            ${params.name}会员总人数：<span style="color:#1D70F5">${data.memberAll}</span>
            </p>
            <p>
            权益总人数：<span style="color:#1D70F5">${data.profitMember}</span>
            </p>
            <p>
            已领取总数：<span style="color:#1D70F5">${data.hasMember}</span>
            </p>
            <p>
            已使用总数：<span style="color:#1D70F5">${data.usedMember}</span>
            </p>
          </div>
          `;
          },
        },
        series: [
          {
            name: "Funnel",
            type: "funnel",
            left: "10%",
            top: 60,
            bottom: 60,
            width: "80%",
            min: 0,
            max: 100,
            minSize: "0%",
            maxSize: "100%",
            sort: "descending",
            sort: "ascending",
            gap: 2,
            label: {
              show: true,
              position: "inside",
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: "solid",
              },
            },
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 1,
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                global: false, // 缺省为 false
              },
            },
            emphasis: {
              label: {
                fontSize: 20,
              },
              itemStyle: {
                shadowBlur: 20,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            data: funnelData,
          },
        ],
      });
    }
  }, [barData, funnelData]);
  return (
    <div>
      <div>
        <Row gutter={26}>
          <Col span={5}>
            <div className="box">
              <div className="title">
                <div>
                  <BellOutlined
                    style={{
                      color: "#fff",
                      backgroundColor: "#456BF7",
                      padding: "5px",
                      textAlign: "center",
                      borderRadius: "50%",
                      marginRight: "7px",
                    }}
                  />
                  <span>活动到期</span>
                  <div className="tag">99+</div>
                </div>
                <div>
                  <span>更多</span>
                  <RightOutlined />
                </div>
              </div>
              <div className="content">
                <div>{activityEnd.title1}</div>
                <div>{activityEnd.time1}</div>
              </div>
              <div className="content">
                <div>{activityEnd.title2}</div>
                <div>{activityEnd.time2}</div>
              </div>
            </div>
          </Col>
          <Col span={5}>
            <div className="box">
              <div className="title">
                <div>
                  <AlertOutlined
                    style={{
                      color: "#fff",
                      backgroundColor: "#A069E0",
                      padding: "5px",
                      textAlign: "center",
                      borderRadius: "50%",
                      marginRight: "7px",
                    }}
                  />
                  <span>预警提示</span>
                  <div className="tag">99+</div>
                </div>
                <div>
                  <span>更多</span>
                  <RightOutlined />
                </div>
              </div>
              <div className="content">
                <div>{activityRemid.title1}</div>
                <div>{activityRemid.time1}</div>
              </div>
              <div className="content">
                <div>{activityRemid.title2}</div>
                <div>{activityRemid.time2}</div>
              </div>
            </div>
          </Col>
          <Col span={5}>
            <div className="box">
              <div className="title">
                <div>
                  <CheckSquareOutlined
                    style={{
                      color: "#fff",
                      backgroundColor: "#F97178",
                      padding: "5px",
                      textAlign: "center",
                      borderRadius: "50%",
                      marginRight: "7px",
                    }}
                  />
                  <span>待办事项</span>
                  <div className="tag">99+</div>
                </div>
                <div>
                  <span>更多</span>
                  <RightOutlined />
                </div>
              </div>
              <div className="content">
                <div>{activityTodo.title1}</div>
                <div>{activityTodo.time1}</div>
              </div>
              <div className="content">
                <div>{activityTodo.title2}</div>
                <div>{activityTodo.time2}</div>
              </div>
            </div>
          </Col>
          <Col span={9}>
            <div className="box">
              <div className="title">
                <div>
                  <SoundOutlined
                    style={{
                      color: "#fff",
                      backgroundColor: "#3BC58B",
                      padding: "5px",
                      textAlign: "center",
                      borderRadius: "50%",
                      marginRight: "7px",
                    }}
                  />
                  <span>系统通知</span>
                  <div className="tag">99+</div>
                </div>
                <div>
                  <span>更多</span>
                  <RightOutlined />
                </div>
              </div>
              <div className="content">
                <div style={{ color: "#333333", width: "100%" }}>
                  {systemInform.title1}
                </div>
              </div>
              <div className="content">
                <div style={{ color: "#333333", width: "100%" }}>
                  {systemInform.title2}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="info">
        <div className="head">
          <div>
            <span></span>
            <span>数据管理</span>
          </div>
          <div>
            <span>设置</span>
            <RightOutlined />
          </div>
        </div>
        <div className="infoData">
          <div>
            <div>{dataManage.validAll}</div>
            <div>有效权益总量</div>
          </div>
          <div>
            <div>{dataManage.onlineAll}</div>
            <div>在线活动总量</div>
          </div>
          <div>
            <div>{dataManage.profitAll}</div>
            <div>权益订单总量</div>
          </div>
          <div>
            <div>
              <span>
                {dataManage.productAll}<span style={{ fontSize: "20px" }}>w</span>
              </span>
            </div>
            <div>商品订单总量</div>
          </div>
          <div>
            <div>
              <span>
                {dataManage.usedA}/<span>{dataManage.spread}</span>
                <span style={{ fontSize: "20px" }}>w</span>
              </span>
            </div>
            <div>类型A使用量/发放量</div>
          </div>
        </div>
      </div>
      <div className="footer">
        <Row gutter={16}>
          <Col span={16}>
            <div className="left">
              <div className="left-title">
                <span></span>
                <span>TOP10数据统计</span>
              </div>
              <div className="radioTab">
                <Radio.Group
                  defaultValue="a"
                  buttonStyle="solid"
                  value={radioValue}
                  onChange={radioOnChange}
                >
                  <Radio.Button value="1">权益数据统计</Radio.Button>
                  <Radio.Button value="2">积分数据统计</Radio.Button>
                </Radio.Group>
              </div>
              <div className="filter">
                <Select
                  style={{ width: 160 }}
                  onChange={handleChange}
                  options={selectOptions}
                />
                <div>
                  <Button style={{ marginRight: "7px" }}>全部</Button>
                  <RangePicker placeholder={["开始日期", "结束日期"]} />
                </div>
              </div>
              <div style={{ height: "400px" }}>
                <div
                  id="barChart"
                  style={{ width: "100%", height: "100%" }}
                ></div>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className="right">
              <div className="right-title">
                <div>
                  <span></span>
                  <span>会员体系</span>
                </div>
                <div>
                  <span>更多</span>
                  <RightOutlined />
                </div>
              </div>
              <div style={{ height: "400px" }}>
                <div
                  id="funnelChart"
                  style={{ width: "100%", height: "100%" }}
                ></div>
              </div>
              <div className="right-footer">
                <div>
                  <div>
                    <span></span>
                    <span>会员总人数</span>
                    <span>102</span>
                  </div>
                  <div>
                    <span></span>
                    <span>已领取总数</span>
                    <span>178</span>
                  </div>
                </div>
                <div>
                  <div>
                    <span></span>
                    <span>权益总数量</span>
                    <span>102</span>
                  </div>
                  <div>
                    <span></span>
                    <span>已使用总数量</span>
                    <span>178</span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
