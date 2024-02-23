import React, { useEffect, useState, useMemo } from "react";
import { Row, Col, Image, Slider, Radio, Table, Tabs } from "antd";
import { RightOutlined } from "@ant-design/icons";
import * as echarts from "echarts";
import { LineChart } from "echarts/charts";
import List from "./List";
import "./CustomerView.less";
import touxiang from "@/assets/images/touxiang.png";
import pizza from "@/assets/images/pizza.png";
import aiqiyi from "@/assets/images/aiqiyi.png";
import starBucks from "@/assets/images/starBucks.png";

const status = [
  { label: "待使用", value: "1" },
  { label: "已使用", value: "2" },
];
echarts.use([LineChart]);
const columns1 = [
  {
    title: "使用排名",
    dataIndex: "profitName",
  },
  {
    title: "权益类型",
    dataIndex: "profitCost",
  },
  {
    title: "包含权益数量",
    dataIndex: "profitRelate",
  },
  {
    title: "使用/领取",
    dataIndex: "profitUsetime",
  },
  {
    title: "使用率",
    dataIndex: "profitAddr",
  },
];
const columns2 = [
  {
    title: "权益名称",
    dataIndex: "profitName",
    render: () => {
      return <a href="javascript:;">家乐福10元抵扣券</a>;
    },
  },
  {
    title: "权益成本（元）",
    dataIndex: "profitCost",
  },
  {
    title: "关联预算",
    dataIndex: "profitRelate",
  },
  {
    title: "使用时间",
    dataIndex: "profitUsetime",
  },
  {
    title: "使用地点",
    dataIndex: "profitAddr",
  },
  {
    title: "支付银行卡",
    dataIndex: "profitCard",
  },
  {
    title: "支付金额",
    dataIndex: "profitPay",
  },
  {
    title: "状态",
    dataIndex: "profitStatus",
    render: (text) => {
      return status.map((el) => {
        if (el.value == text) {
          return el.label;
        }
      });
    },
  },
];

export default function Index() {
  const [list, setList] = useState([{}, {}, {}, {}, {}, {},{}, {}, {},{}, {}, {},{}, {}, {}]);
  const [radioValue, setRadioValue] = useState("1");
  const items = [
    {
      key: "1",
      label: "已领取权益",
      children: <List list={list} />,
    },
    {
      key: "2",
      label: "已使用权益",
      children: <List list={list} />,
    },
    {
      key: "3",
      label: "已失效权益",
      children: <List list={list} />,
    },
  ];
  const radioChange = ({ target: { value } }) => {
    setRadioValue(value);
  };
  const columnsMemo = useMemo(() => {
    if (radioValue == "4") {
      return columns1;
    } else {
      return columns2;
    }
  }, [radioValue]);

  useEffect(() => {
    if (document.getElementById("lineChart")) {
      let lineChart = echarts.init(document.getElementById("lineChart"));
      lineChart.setOption({
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line",
          },
        ],
      });
    }
  }, [radioValue]);

  return (
    <div className="container">
      <Row gutter={32}>
        <Col span={16}>
          <div style={{ overflow: "hidden", height: "100%" }}>
            <div className="left">
              <div className="banner">
                <div className="avatar">
                  <Image
                    style={{ borderRadius: "50%" }}
                    src={touxiang}
                    preview={false}
                  ></Image>
                </div>
                <div className="banner-info">
                  <div className="name">
                    <span className="name2">王雄</span>
                    <span className="tag">
                      <span>**</span>
                      <span>侯爵</span>
                    </span>
                  </div>
                  <div className="process">
                    <span>侯爵</span>
                    <span>0</span>
                    <span>
                      <Slider max={10000} min={0} />
                    </span>
                    <span>10000</span>
                  </div>
                  <div className="banner-detail">
                    <div>
                      <div>
                        <span>客户号</span>
                        <span>6000001</span>
                      </div>
                      <div>
                        <span>证件类型</span>
                        <span>居民身份证</span>
                      </div>
                      <div>
                        <span>证件号</span>
                        <span>6000001</span>
                      </div>
                      <div>
                        <span>手机号</span>
                        <span>6000001</span>
                      </div>
                    </div>
                    <div>
                      <div>
                        <span>所属机构</span>
                        <span>兴业银行郑州紫荆山路支行</span>
                      </div>
                      <div>
                        <span>登录渠道</span>
                        <span>6000001</span>
                      </div>
                      <div>
                        <span>登录ip</span>
                        <span>192.168.1.137</span>
                      </div>
                      <div>
                        <span>上次登录时间</span>
                        <span>2020-12-30 15:41:21</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="profitCenter">
                <div className="title">
                  <span></span>
                  <span>权益中心</span>
                </div>
                <div className="profitShow">
                  <div className="profitShow-left">
                    <div className="profitShow-title">
                      <span>当前可选权益</span>
                      <RightOutlined />
                    </div>
                    <div className="profitShow-box">
                      <div>
                        <Image src={pizza} preview={false}></Image>
                        <div>必胜客</div>
                      </div>
                      <div>
                        <Image src={aiqiyi} preview={false}></Image>
                        <div>爱奇艺会员</div>
                      </div>
                      <div>
                        <div>
                          <Image
                            className="img"
                            src={starBucks}
                            preview={false}
                          ></Image>
                        </div>
                        <div>星巴克</div>
                      </div>
                    </div>
                  </div>
                  <div className="profitShow-left">
                    <div className="profitShow-title">
                      <span>当前可选权益</span>
                      <RightOutlined />
                    </div>
                    <div style={{ border: "none" }} className="profitShow-box">
                      <div>
                        <Image src={pizza} preview={false}></Image>
                        <div>livehouse</div>
                      </div>
                      <div>
                        <Image src={aiqiyi} preview={false}></Image>
                        <div>QQ音乐</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ marginBottom: "16px" }}>
                <Radio.Group
                  value={radioValue}
                  onChange={radioChange}
                  buttonStyle="solid"
                >
                  <Radio.Button value="1">权益信息</Radio.Button>
                  <Radio.Button value="2">积分信息</Radio.Button>
                  <Radio.Button value="3">活动信息</Radio.Button>
                  <Radio.Button value="4">使用权益编号</Radio.Button>
                  <Radio.Button value="5">账户资产分析</Radio.Button>
                </Radio.Group>
              </div>
              {radioValue != 5 && (
                <Table
                  columns={columnsMemo}
                  dataSource={list}
                  scroll={{ x: "100", y: 300 }}
                />
              )}
              {radioValue == 5 && (
                <div style={{ height: "400px" }}>
                  <div
                    style={{ width: "100%", height: "100%" }}
                    id="lineChart"
                  ></div>
                </div>
              )}
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div style={{height:'900px',overflow:"hidden"}}>
            <Tabs defaultActiveKey="1" items={items} />
          </div>
        </Col>
      </Row>
    </div>
  );
}
