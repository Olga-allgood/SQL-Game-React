import { useState } from "react";

import {
  Button,
  Drawer,
  Grid,
  Layout,
  Menu,
  Typography,
} from "antd";

import {
  ApartmentOutlined,
  CalculatorOutlined,
  CodeOutlined,
  FilterOutlined,
  GroupOutlined,
  MenuOutlined,
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
  Header,
} = Layout;

const { Text } = Typography;

const menuItems = [
  {
    key: "progress",
    icon: <TrophyOutlined />,
    label: "My Progress",
  },

  {
    type: "group",
    label: "SQL FOUNDATIONS",

    children: [
      {
        key: "reading-query",
        icon: <ReadOutlined />,
        label: "1. Reading a Query",
      },

      {
        key: "filtering-data",
        icon: <FilterOutlined />,
        label: "2. Filtering Data",
      },

      {
        key: "sorting-results",
        icon: <SortAscendingOutlined />,
        label: "3. Sorting & Controlling",
      },

      {
        key: "summarizing-data",
        icon: <CalculatorOutlined />,
        label: "4. Summarizing Data",
      },

      {
        key: "grouping-data",
        icon: <GroupOutlined />,
        label: "5. Grouping Data",
      },

      {
        key: "connecting-data",
        icon: <ApartmentOutlined />,
        label: "6. Connecting Data",
      },

      {
        key: "practical-sql",
        icon: <CodeOutlined />,
        label: "7. Practical SQL",
      },
    ],
  },
];

export default function Student() {
  const [
    selectedMenu,
    setSelectedMenu,
  ] = useState("reading-query");

  const [
    drawerOpen,
    setDrawerOpen,
  ] = useState(false);

  const screens =
    Grid.useBreakpoint();

  const isMobile =
    !screens.md;

  const handleMenuClick = ({
    key,
  }) => {
    setSelectedMenu(key);

    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  const navigation = (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[
        selectedMenu,
      ]}
      onClick={
        handleMenuClick
      }
      items={menuItems}
      style={{
        borderInlineEnd: "none",
      }}
    />
  );

  const renderContent = () => {
    switch (selectedMenu) {
      case "progress":
        return <ProgressPage />;

      case "reading-query":
        return <ReadingQuery />;

      case "filtering-data":
        return <FilteringData />;

      case "sorting-results":
        return <SortingResults />;

      case "summarizing-data":
        return <SummarizingData />;

      case "grouping-data":
        return <GroupingData />;

      case "connecting-data":
        return <ConnectingData />;

      case "practical-sql":
        return <PracticalSQL />;

      default:
        return <ReadingQuery />;
    }
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      {/* DESKTOP SIDEBAR */}

      {!isMobile && (
        <Sider
          width={260}
          style={{
            minHeight: "100vh",
            position: "sticky",
            top: 0,
            alignSelf: "flex-start",
          }}
        >
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

          {navigation}
        </Sider>
      )}

      {/* MOBILE DRAWER */}

      {isMobile && (
        <Drawer
          title="SQL Learning Lab"
          placement="left"
          open={drawerOpen}
          onClose={() =>
            setDrawerOpen(false)
          }
          width={280}
          styles={{
            body: {
              padding: 0,
              background:
                "#001529",
            },
          }}
        >
          {navigation}
        </Drawer>
      )}

      <Layout
        style={{
          minWidth: 0,
        }}
      >
        {/* MOBILE HEADER */}

        {isMobile && (
          <Header
            style={{
              height: 56,
              padding: "0 12px",
              display: "flex",
              alignItems: "center",
              background: "#fff",
              borderBottom:
                "1px solid #f0f0f0",
              position: "sticky",
              top: 0,
              zIndex: 10,
            }}
          >
            <Button
              type="text"
              icon={
                <MenuOutlined />
              }
              onClick={() =>
                setDrawerOpen(true)
              }
              style={{
                fontSize: 18,
                flexShrink: 0,
              }}
            />

            <Text
              strong
              style={{
                marginLeft: 6,
                whiteSpace: "nowrap",
              }}
            >
              SQL Learning Lab
            </Text>
          </Header>
        )}

        {/* MAIN CONTENT */}

        <Content
          style={{
            width: "100%",
            minWidth: 0,
            maxWidth: 1200,
            margin: "0 auto",

            padding: isMobile
              ? "16px 12px 32px"
              : "30px",

            overflowX: "hidden",
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
}