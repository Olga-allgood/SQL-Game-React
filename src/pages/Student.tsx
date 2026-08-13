
import { useState } from "react";
import {
  Layout,
  Menu,
  Card,
  Descriptions,
  Typography,
} from "antd";
import {
  ReadOutlined,
  UserOutlined,
  SmileOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import { QueryBuilder } from "../components/QueryBuilder";
import SQLDetective from "../components/SQLDetective";
import {SQLCards} from "../components/SQLCards";

const { Sider, Content } = Layout;
const { Title } = Typography;

export default function Student() {
  const [selectedMenu, setSelectedMenu] = useState("profile");

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <div
          style={{
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
            padding: "20px",
          }}
        >
          Learning App
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedMenu]}
          onClick={(item) => setSelectedMenu(item.key)}
          items={[
            {
              key: "profile",
              icon: <UserOutlined />,
              label: "My Profile",
            },
            {
            key: "SQL-cards",
            icon: <ReadOutlined />,
            label: "SQL Cards",
          },
            {
              key: "memory",
              icon: <SmileOutlined />,
              label: "Memory Game",
            },
            {
              key: "detective",
              icon: <SearchOutlined />,
              label: "SQL Detective",
            },
          ]}
        />
      </Sider>

      <Layout>
        <Content style={{ padding: "30px" }}>
          {selectedMenu === "profile" && (
            <>
              <Title level={2}>My Profile</Title>

              <Card>
                <Descriptions>
                  <Descriptions.Item label="Username">
                    Jack Smith
                  </Descriptions.Item>

                  <Descriptions.Item label="Email">
                    jack.smith@example.com
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </>
          )}
          {selectedMenu === "SQL-cards" && <SQLCards />}

          {selectedMenu === "memory" && <QueryBuilder />}

          {selectedMenu === "detective" && <SQLDetective />}
        </Content>
      </Layout>
    </Layout>
  );
}

