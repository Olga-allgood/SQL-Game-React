import { useState } from "react";

import {
  Layout,
  Menu,
} from "antd";

import {
  ApartmentOutlined,
  CalculatorOutlined,
  CodeOutlined,
  FilterOutlined,
  GroupOutlined,
  ReadOutlined,
  SortAscendingOutlined,
  TrophyOutlined,
} from "@ant-design/icons";

import ReadingQuery from "./sql/ReadingQuery";
import FilteringData from "./sql/FilteringData";
import SortingResults from "./sql/SortingResults";
import SummarizingData from "./sql/SummarizingData";
import GroupingData from "./sql/GroupingData";
import ConnectingData from "./sql/ConnectingData";
import PracticalSQL from "./sql/PracticalSQL";
import ProgressPage from "./Progress";

const {
  Sider,
  Content,
} = Layout;

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
      <Sider width={260}>
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

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedMenu]}
          onClick={({ key }) =>
            setSelectedMenu(key)
          }
          items={[
            {
              key: "progress",
              icon: (
                <TrophyOutlined />
              ),
              label: "My Progress",
            },

            {
              type: "group",
              label: "SQL FOUNDATIONS",

              children: [
                {
                  key: "reading-query",
                  icon: (
                    <ReadOutlined />
                  ),
                  label:
                    "1. Reading a Query",
                },

                {
                  key: "filtering-data",
                  icon: (
                    <FilterOutlined />
                  ),
                  label:
                    "2. Filtering Data",
                },

                {
                  key: "sorting-results",
                  icon: (
                    <SortAscendingOutlined />
                  ),
                  label:
                    "3. Sorting & Controlling",
                },

                {
                  key: "summarizing-data",
                  icon: (
                    <CalculatorOutlined />
                  ),
                  label:
                    "4. Summarizing Data",
                },

                {
                  key: "grouping-data",
                  icon: (
                    <GroupOutlined />
                  ),
                  label:
                    "5. Grouping Data",
                },

                {
                  key: "connecting-data",
                  icon: (
                    <ApartmentOutlined />
                  ),
                  label:
                    "6. Connecting Data",
                },

                {
                  key: "practical-sql",
                  icon: (
                    <CodeOutlined />
                  ),
                  label:
                    "7. Practical SQL",
                },
              ],
            },
          ]}
        />
      </Sider>

      <Layout>
        <Content
          style={{
            padding: 30,
            width: "100%",
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          {selectedMenu ===
            "progress" && (
            <ProgressPage />
          )}

          {selectedMenu ===
            "reading-query" && (
            <ReadingQuery />
          )}

          {selectedMenu ===
            "filtering-data" && (
            <FilteringData />
          )}

          {selectedMenu ===
            "sorting-results" && (
            <SortingResults />
          )}

          {selectedMenu ===
            "summarizing-data" && (
            <SummarizingData />
          )}

          {selectedMenu ===
            "grouping-data" && (
            <GroupingData />
          )}

          {selectedMenu ===
            "connecting-data" && (
            <ConnectingData />
          )}

          {selectedMenu ===
            "practical-sql" && (
            <PracticalSQL />
          )}
        </Content>
      </Layout>
    </Layout>
  );
}