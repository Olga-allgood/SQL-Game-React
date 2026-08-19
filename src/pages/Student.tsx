import { useState } from "react";

import {
  Card,
  Descriptions,
  Layout,
  Menu,
  Typography,
} from "antd";

import {
  FilterOutlined,
  ReadOutlined,
  UserOutlined,
} from "@ant-design/icons";

import ReadingQuery from "./sql/ReadingQuery";
import FilteringData from "./sql/FilteringData";

const {
  Sider,
  Content,
} = Layout;

const { Title } = Typography;

export default function Student() {
  const [
    selectedMenu,
    setSelectedMenu,
  ] = useState("reading-query");

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <Sider
        width={260}
        style={{
          minHeight: "100vh",
        }}
      >
        {/* APP TITLE */}

        <div
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            padding: 20,
          }}
        >
          SQL Learning Lab
        </div>

        {/* NAVIGATION */}

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[
            selectedMenu,
          ]}
          onClick={({ key }) =>
            setSelectedMenu(key)
          }
          items={[
            {
              key: "profile",
              icon: (
                <UserOutlined />
              ),
              label: "My Profile",
            },

            {
              type: "group",
              label: "SQL FOUNDATIONS",

              children: [
                {
                  key:
                    "reading-query",

                  icon: (
                    <ReadOutlined />
                  ),

                  label:
                    "1. Reading a Query",
                },

                {
                  key:
                    "filtering-data",

                  icon: (
                    <FilterOutlined />
                  ),

                  label:
                    "2. Filtering Data",
                },
              ],
            },
          ]}
        />
      </Sider>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <Layout>
        <Content
          style={{
            padding: 30,
            width: "100%",
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          {/* =================================================
              PROFILE
          ================================================= */}

          {selectedMenu ===
            "profile" && (
            <>
              <Title level={2}>
                My Profile
              </Title>

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

          {/* =================================================
              LEVEL 1
          ================================================= */}

          {selectedMenu ===
            "reading-query" && (
            <ReadingQuery />
          )}

          {/* =================================================
              LEVEL 2
          ================================================= */}

          {selectedMenu ===
            "filtering-data" && (
            <FilteringData />
          )}
        </Content>
      </Layout>
    </Layout>
  );
}