import React from "react";
import { Image, Rate } from "antd";
import { RightOutlined } from "@ant-design/icons";
import logo from "@/assets/images/logo.png";
import "./List.less";
export default function List(props) {
  const { list } = props;
  return (
    <div className="list-container">
      {list.map((el, index) => {
        return (
          <div className="list-box" key={index}>
            <div className="list-box-img">
              <Image preview={false} src={logo} />
            </div>
            <div className="list-content">
              <div className="list-content-title">家乐福10元抵扣券</div>
              <div className="list-content-time">{el.time}</div>
              <div className="list-comment">
                <div className="list-rate">
                  <span>用户评价：</span>
                  <Rate style={{fontSize:"16px"}} disabled value={el.rate} />
                </div>
                <div className="list-check">
                  <span>查看</span>
                  <RightOutlined />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
