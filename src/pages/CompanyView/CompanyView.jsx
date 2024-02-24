import React, { useEffect, useState, useMemo } from "react";
import {
  Row,
  Col,
  Image,
  Radio,
  Table,
  Tabs,
  Button,
  Modal,
  Form,
  Input,
  notification,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  getCompanyProfitInfo,
  getCompanyProfitList,
  deleteProfitList,
  companyAddnewQuery,
  companyAddnew
} from "@/api/api";
import List from "./List";
import "./CompanyView.less";
import touxiang from "@/assets/images/touxiang.png";

const status = [
  { label: "待使用", value: "1" },
  { label: "已使用", value: "2" },
];
const getStatus = [
  { label: "达标", value: "1" },
  { label: "未达标", value: "2" },
];
const spreadStatus = [
  { label: "发放完毕", value: "1" },
  { label: "未发放", value: "2" },
];
export default function Index() {
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
      render: (text) => {
        return getStatus.map((el) => {
          if (el.value == text) {
            return el.label;
          }
        });
      },
    },
    {
      title: "奖品发放状态",
      dataIndex: "spreadStatus",
      render: (text) => {
        return spreadStatus.map((el) => {
          if (el.value == text) {
            return el.label;
          }
        });
      },
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
      render: (text, record, index) => {
        return (
          <div
            onClick={() => {
              deleteItem(record.key);
            }}
            style={{ color: "red", cursor: "pointer" }}
          >
            移除
          </div>
        );
      },
    },
  ];
  const columnsModal = [
    {
      title: "客户号",
      dataIndex: "customerId",
    },
    {
      title: "客户名称",
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
  ];

  const deleteItem = (key) => {
    Modal.confirm({
      title: "确定删除该条数据？",
      onOk: () => {
        setLoading(true);
        deleteProfitList({ key })
          .then((res) => {
            console.log(res);
            getList("4");
          })
          .catch((err) => {})
          .finally(() => {
            setLoading(false);
          });
      },
    });
  };
  const [companyInfo, setCompanyInfo] = useState({});
  const [total, setTotal] = useState({});
  const [totalModal, setTotalModal] = useState({});
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [hasList, setHasList] = useState([]);
  const [usedList, setUsedList] = useState([]);
  const [expiredList, setExpiredList] = useState([]);
  const [radioValue, setRadioValue] = useState("1");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLoading, setIsModalLoading] = useState(false);
  const [modalList, setModalList] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [form] = Form.useForm();

  const addNew = () => {
    setIsModalLoading(true);
    setIsModalOpen(true);

    companyAddnewQuery()
      .then((res) => {
        setModalList([...res.data.list]);
        console.log(res);
        setTotalModal(res.data.total);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsModalLoading(false);
      });
  };
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

  const getList = (value) => {
    getCompanyProfitList({ value: value }).then((res) => {
      setRadioValue(value);
      setList(Array.from(res.data.list));
      setTotal(res.data.total);
    });
  };
  const radioChange = ({ target: { value } }) => {
    getList(value);
  };
  const onSelectChange = (newSelectedRowKeys,newSelectedRows) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRows(newSelectedRows)
  };
  const handleOk = () => {
    console.log(selectedRows);
    companyAddnew({arr:selectedRows}).then(res=>{
        notification.success({
            message:"提示",
            description:"新增成功"
        })
        getList("4");
        setIsModalOpen(false)
    }).finally(()=>{
        setSelectedRowKeys([])
        setSelectedRows([])
    })

  };
  useEffect(() => {
    getCompanyProfitInfo().then((res) => {
      const { data } = res;
      setCompanyInfo(data.companyInfo);
      setList(Array.from(data.list));
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
  const search = (page='reset')=>{
    if(page=='reset'){
        form.resetFields()
    }
    companyAddnewQuery().then(res=>{
        console.log(res);
        setModalList(res.data.list)
        setTotalModal(res.data.total)
    }).finally(()=>{
        setSelectedRowKeys([])
        setSelectedRows([])
    })
  }
  const paginationModal = useMemo(() => {
    return {
      total: totalModal,
      showTotal: () => {
        return <div>共{totalModal}条</div>;
      },
      showQuickJumper: true,
      pageSizeOptions: [10, 20, 50],
      locale: "zhCN",
      defaultPageSize: 10,
      showSizeChanger: true,
    };
  }, [totalModal]);
  const rowSelection = {
    type: "checkbox",
    selectedRowKeys,
    onChange: onSelectChange,
  };
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
              {radioValue == "4" && (
                <div style={{ marginBottom: "10px" }}>
                  <Button
                    icon={<PlusOutlined />}
                    onClick={() => {
                      addNew();
                    }}
                  >
                    新增关键人
                  </Button>
                </div>
              )}
              <Table
                columns={columnsMemo}
                dataSource={list}
                loading={loading}
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
      <Modal
        title="添加关键人"
        open={isModalOpen}
        onOk={handleOk}
        width={"80%"}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedRowKeys([])
          setSelectedRows([])
          form.resetFields()
        }}
      >
        <div style={{ height: "450px", overflow: "scroll" }}>
          <Form
            labelCol={{
              span: 6,
            }}
            form={form}
            wrapperCol={{
              span: 18,
            }}
          >
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="客户名称" name="username">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="客户号" name="password">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <div style={{ textAlign: "right" }}>
                  <Button onClick={search} style={{ marginRight: "10px" }} type="primary">
                    搜索
                  </Button>
                  <Button onClick={()=>{
                    search('reset')
                  }}>重置</Button>
                </div>
              </Col>
            </Row>
          </Form>
          <Table
            columns={columnsModal}
            dataSource={modalList}
            loading={modalLoading}
            pagination={paginationModal}
            rowSelection={rowSelection}
          />
        </div>
      </Modal>
    </div>
  );
}
