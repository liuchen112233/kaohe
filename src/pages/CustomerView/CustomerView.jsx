import React, { useEffect, useState, useMemo } from "react";
import { Row, Col, Image, Slider, Radio, Table, Tabs } from "antd";
import { RightOutlined } from "@ant-design/icons";
import * as echarts from "echarts";
import { LineChart } from "echarts/charts";
import { getProfitInfo, getProfitList } from "@/api/api";
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
const profitType = [
  { label: "票券类", value: "1" },
  { label: "家乐福10元抵扣券", value: "2" },
];
echarts.use([LineChart]);
const columns1 = [
  {
    title: "使用排名",
    dataIndex: "usedRank",
  },
  {
    title: "权益类型",
    dataIndex: "profitType",
    render: (text) => {
      return profitType.map((el) => {
        if (el.value == text) {
          return <a>{el.label}</a>;
        }
      });
    },
  },
  {
    title: "包含权益数量",
    dataIndex: "containCount",
  },
  {
    title: "使用/领取",
    dataIndex: "useAndGet",
    render: (text, record) => {
      return (
        <div>
          <a>{record.use}</a>
          <span>/{record.get}</span>
        </div>
      );
    },
  },
  {
    title: "使用率",
    dataIndex: "rate",
  },
];
const columns2 = [
  {
    title: "权益名称",
    dataIndex: "profitName",
    render: () => {
      return <a>家乐福10元抵扣券</a>;
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
          if (text == 1) {
            return <a>{el.label}</a>;
          } else {
            return el.label;
          }
        }
      });
    },
  },
];

export default function Index() {
  const [custInfo, setCustInfo] = useState({});
  const [total, setTotal] = useState({});
  const [list, setList] = useState([]);
  const [hasList, setHasList] = useState([]);
  const [usedList, setUsedList] = useState([]);
  const [expiredList, setExpiredList] = useState([]);
  const [radioValue, setRadioValue] = useState("1");
  const [lineData, setLineData] = useState([
    150, 230, 224, 218, 135, 147, 260, 33, 444, 22, 223, 666,
  ]);
  const items = [
    {
      key: "1",
      label: "已领取权益",
      children: <List list={hasList} />,
    },
    {
      key: "2",
      label: "已使用权益",
      children: <List list={usedList} />,
    },
    {
      key: "3",
      label: "已失效权益",
      children: <List list={expiredList} />,
    },
  ];

  const columnsMemo = useMemo(() => {
    if (radioValue == "4") {
      return columns1;
    } else {
      return columns2;
    }
  }, [radioValue]);

  const radioChange = ({ target: { value } }) => {
    getProfitList({ value: value }).then((res) => {
      setRadioValue(value);
      if (value == 5) {
        setLineData(res.data.list);
      } else {
        setList(res.data.list);
      }
    });
  };

  useEffect(() => {
    getProfitInfo().then((res) => {
      const { data } = res;
      setCustInfo(data.custInfo);
      setList(data.list);
      setTotal(data.total);
      setHasList(data.hasList);
      setUsedList(data.usedList);
      setExpiredList(data.expiredList);
    });
  }, []);
  useEffect(() => {
    if (document.getElementById("lineChart")) {
      let lineChart = echarts.init(document.getElementById("lineChart"));
      lineChart.setOption({
        tooltip:{
          show:true,
          trigger:"axis",
          position:"right",
          backgroundColor:"#fff",
          axisPointer:{
            type:"line"
          },
          formatter:(params)=>{
            return `
            <div style="font-size:14px">${params[0].name}</div>
            <div style="font-size:16px">${params[0].value} 元</div>
            `
          }
        },
        xAxis: {
          type: "category",
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: lineData,
            type: "line",
            symbol:"none"
          },
        ],
      });
    }
  }, [radioValue]);
  const pagination = useMemo(() => {
    return {
      total: total,
      showTotal: () => {
        return <div>共{total}条</div>;
      },
      showQuickJumper: true,
      pageSizeOptions: [10, 20, 50],
      locale: "zhCN",
      defaultPageSize: 10,
      showSizeChanger: true,
    };
  }, [total]);
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
                    <span className="name2">{custInfo.custName}</span>
                    <span className="tag">
                      <span>**</span>
                      <span>{custInfo.status}</span>
                    </span>
                  </div>
                  <div className="process">
                    <span>侯爵</span>
                    <span>{custInfo.min}</span>
                    <span>
                      <Slider max={custInfo.max} min={custInfo.min} />
                    </span>
                    <span>{custInfo.max}</span>
                  </div>
                  <div className="banner-detail">
                    <div>
                      <div>
                        <span>客户号</span>
                        <span>{custInfo.custNo}</span>
                      </div>
                      <div>
                        <span>证件类型</span>
                        <span>{custInfo.custIdType}</span>
                      </div>
                      <div>
                        <span>证件号</span>
                        <span>{custInfo.custIdCard}</span>
                      </div>
                      <div>
                        <span>手机号</span>
                        <span>{custInfo.custPhone}</span>
                      </div>
                    </div>
                    <div>
                      <div>
                        <span>所属机构</span>
                        <span>{custInfo.branch}</span>
                      </div>
                      <div>
                        <span>登录渠道</span>
                        <span>{custInfo.loginWay}</span>
                      </div>
                      <div>
                        <span>登录ip</span>
                        <span>{custInfo.loginIp}</span>
                      </div>
                      <div>
                        <span>上次登录时间</span>
                        <span>{custInfo.lastLogin}</span>
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
                            className="profitShow-box-img"
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
                  rowKey={"key"}
                  pagination={pagination}
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
          <Tabs defaultActiveKey="1" items={items} />
        </Col>
      </Row>
    </div>
  );
}
