import React, { useEffect, useState, useMemo } from "react";
import { Row, Col, Image, Radio, Table, Tabs,Button } from "antd";
import { getCompanyProfitInfo, getCompanyProfitList } from "@/api/api";
import List from "./List";
import "./CompanyView.less";
import touxiang from "@/assets/images/touxiang.png";

const status = [
  { label: "待使用", value: "1" },
  { label: "已使用", value: "2" },
];

const columns1 = [
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
    title: "使用人ID",
    dataIndex: "userId",
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

const columns2 = [
  {
    title: "积分领取时间",
    dataIndex: "hasTime",
  },
  {
    title: "获取总量",
    dataIndex: "getAll",
  },
  {
    title: "积分余量",
    dataIndex: "scoreBalance",
  },
  {
    title: "已使用数量",
    dataIndex: "usedCount",
  },
  {
    title: "过期数量",
    dataIndex: "expiredCount",
  },
  {
    title: "冻结数量",
    dataIndex: "frozenCount",
  },
];
const columns3 = [
  {
    title: "活动名称",
    dataIndex: "activityName",
  },
  {
    title: "参与时间",
    dataIndex: "joinTime",
  },
  {
    title: "达标状态",
    dataIndex: "status",
  },
  {
    title: "奖品发放状态",
    dataIndex: "spreadStatus",
  },
];
const columns4 = [
  {
    title: "客户号",
    dataIndex: "customerId",
  },
  {
    title: "成员名称",
    dataIndex: "customerName",
  },
  {
    title: "手机号",
    dataIndex: "customerPhone",
  },
  {
    title: "证件类型",
    dataIndex: "customerIdtype",
  },
  {
    title: "证件号码",
    dataIndex: "customerIdcard",
  },
  {
    title: "操作",
    dataIndex: "operation",
    render: () => {
      return <div style={{ color: "red", cursor: "pointer" }}>移除</div>;
    },
  },
];

export default function Index() {
  const [companyInfo, setCompanyInfo] = useState({});
  const [total, setTotal] = useState({});
  const [list, setList] = useState([]);
  const [hasList, setHasList] = useState([]);
  const [usedList, setUsedList] = useState([]);
  const [expiredList, setExpiredList] = useState([]);
  const [radioValue, setRadioValue] = useState("1");
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
    let arr = [];
    if (radioValue == 1) {
      arr = columns1;
    } else if (radioValue == 2) {
      arr = columns2;
    } else if (radioValue == 3) {
      arr = columns3;
    } else if (radioValue == 4) {
      arr = columns4;
    }
    return arr;
  }, [radioValue]);

  const radioChange = ({ target: { value } }) => {
    getCompanyProfitList({ value: value }).then((res) => {
      setRadioValue(value);
      setList(res.data.list);
    });
  };

  useEffect(() => {
    getCompanyProfitInfo().then((res) => {
      const { data } = res;
      setCompanyInfo(data.companyInfo);
      setList(data.list);
      setTotal(data.total);
      setHasList(data.hasList);
      setUsedList(data.usedList);
      setExpiredList(data.expiredList);
    });
  }, []);
  useEffect(() => {}, [radioValue]);
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
    <div className="companyContainer">
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
                    <span className="name2">{companyInfo.companyName}</span>
                  </div>
                  <div className="companyRank">
                    企业等级：{companyInfo.companyRank}
                  </div>
                  <div className="companyId">企业ID： {companyInfo.custNo}</div>
                  <div>所属机构：{companyInfo.branch}</div>
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
                  <Radio.Button value="4">企业关键人列表</Radio.Button>
                </Radio.Group>
              </div>
              {radioValue=="4" && <div style={{marginBottom:"10px"}}>
              <Button>新增</Button>
              </div>}
              <Table
                columns={columnsMemo}
                dataSource={list}
                pagination={pagination}
                scroll={{ x: "100", y: 300 }}
              />
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
