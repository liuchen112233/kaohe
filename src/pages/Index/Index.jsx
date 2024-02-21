import React from "react";
import { Col, Row } from "antd";
import {
  BellOutlined,
  RightOutlined,
  AlertOutlined,
  CheckSquareOutlined,
  SoundOutlined,
} from "@ant-design/icons";
import "./Index.less";
export default function Index() {
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
                <div>周年庆活动标题...</div>
                <div>2023-10-12</div>
              </div>
              <div className="content">
                <div>积分抽奖活动标…</div>
                <div>2023-10-12</div>
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
                  <span>活动到期</span>
                  <div className="tag">99+</div>
                </div>
                <div>
                  <span>更多</span>
                  <RightOutlined />
                </div>
              </div>
              <div className="content">
                <div>周年庆活动标题...</div>
                <div>2023-10-12</div>
              </div>
              <div className="content">
                <div>积分抽奖活动标…</div>
                <div>2023-10-12</div>
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
                  <span>活动到期</span>
                  <div className="tag">99+</div>
                </div>
                <div>
                  <span>更多</span>
                  <RightOutlined />
                </div>
              </div>
              <div className="content">
                <div>周年庆活动标题...</div>
                <div>2023-10-12</div>
              </div>
              <div className="content">
                <div>积分抽奖活动标…</div>
                <div>2023-10-12</div>
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
                  <span>活动到期</span>
                  <div className="tag">99+</div>
                </div>
                <div>
                  <span>更多</span>
                  <RightOutlined />
                </div>
              </div>
              <div className="content">
                <div style={{ color: "#333333" }}>
                  权益公告名称 6月25日18:00:00
                </div>
              </div>
              <div className="content">
                <div style={{ color: "#333333" }}>
                  9月20日权益公告XXX 6月25日18
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
        <div class="infoData">
          <div>
            <div>1320</div>
            <div>有效权益总量</div>
          </div>
          <div>
            <div>1320</div>
            <div>在线活动总量</div>
          </div>
          <div>
            <div>1320</div>
            <div>权益订单总量</div>
          </div>
          <div>
            <div>1320</div>
            <div>商品订单总量</div>
          </div>
          <div>
            <div>1320</div>
            <div>类型A使用量/发放量</div>
          </div>
        </div>
      </div>
      <div>
        <Row>
          <Col span={15}>
            <div>
              <span></span>
              <span>TOP10数据统计</span>
            </div>
          </Col>
          <Col span={9}></Col>
        </Row>
      </div>
    </div>
  );
}
