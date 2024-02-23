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
          <div class="list-box" key={index}>
            <div class="img">
              <Image preview={false} src={logo} />
            </div>
            <div className="list-content">
              <div className="list-content-title">家乐福10元抵扣券</div>
              <div className="list-content-time">2023-10-13 04:39:55</div>
              <div className="list-comment">
                <div className="list-rate">
                  <span>用户评价：</span>
                  <Rate style={{fontSize:"16px"}} disabled value={3} />
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
