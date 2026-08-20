// src/components/sql/SQLLevelPage.jsx

import { useState } from "react";

import {
  Card,
  Grid,
  Menu,
  Progress,
  Space,
  Tag,
  Typography,
} from "antd";

import { SQLCards } from "./SQLCards";
import SQLRecognition from "./SQLRecognition";
import { QueryBuilder } from "./QueryBuilder";
import SQLDetective from "./SQLDetective";
import SQLCaseFile from "./SQLCaseFile";
import SQLChallenge from "./SQLChallenge";

import { useProgress } from "../../context/ProgressContext";

const { Title, Text, Paragraph } = Typography;

export default function SQLLevelPage({
  levelNumber,
  levelKey,
  title,
  description,
  cards,
  recognitionTasks,
  builderTasks,
  detectiveTasks,
  caseFiles,
  challengeTasks,
}) {
  const [activity, setActivity] = useState("learn");

  const screens = Grid.useBreakpoint();

  const isMobile = !screens.md;

  const {
    getLevelProgress,
    markTaskSolved,
    markAnswerRevealed,
  } = useProgress();

  /* =========================================================
     LEVEL PROGRESS
  ========================================================= */

  const levelProgress = getLevelProgress(levelKey);

  const solvedTasks = new Set(
    levelProgress?.solvedTasks || []
  );

  const revealedTasks = new Set(
    levelProgress?.revealedTasks || []
  );

  const totalTasks =
    recognitionTasks.length +
    builderTasks.length +
    detectiveTasks.length +
    caseFiles.length +
    challengeTasks.length;

  const mastery =
    totalTasks === 0
      ? 0
      : Math.round(
          (solvedTasks.size / totalTasks) * 100
        );

  /* =========================================================
     PROGRESS HANDLERS
  ========================================================= */

  const handleSolved = (
    activityKey,
    taskId
  ) => {
    markTaskSolved(
      levelKey,
      activityKey,
      taskId
    );
  };

  const handleReveal = (
    activityKey,
    taskId
  ) => {
    markAnswerRevealed(
      levelKey,
      activityKey,
      taskId
    );
  };

  /* =========================================================
     ACTIVITY
  ========================================================= */

  const renderActivity = () => {
    switch (activity) {
      case "learn":
        return (
          <SQLCards
            cards={cards}
          />
        );

      case "recognize":
        return (
          <SQLRecognition
            tasks={recognitionTasks}
            solvedTasks={solvedTasks}
            revealedTasks={revealedTasks}
            onSolved={handleSolved}
            onReveal={handleReveal}
          />
        );

      case "build":
        return (
          <QueryBuilder
            tasks={builderTasks}
            solvedTasks={solvedTasks}
            revealedTasks={revealedTasks}
            onSolved={handleSolved}
            onReveal={handleReveal}
          />
        );

      case "detective":
        return (
          <SQLDetective
            tasks={detectiveTasks}
            solvedTasks={solvedTasks}
            revealedTasks={revealedTasks}
            onSolved={handleSolved}
            onReveal={handleReveal}
          />
        );

      case "casefile":
        return (
          <SQLCaseFile
            cases={caseFiles}
            solvedTasks={solvedTasks}
            revealedTasks={revealedTasks}
            onSolved={handleSolved}
            onReveal={handleReveal}
          />
        );

      case "challenge":
        return (
          <SQLChallenge
            tasks={challengeTasks}
            solvedTasks={solvedTasks}
            revealedTasks={revealedTasks}
            onSolved={handleSolved}
            onReveal={handleReveal}
          />
        );

      default:
        return (
          <SQLCards
            cards={cards}
          />
        );
    }
  };

  /* =========================================================
     ACTIVITY MENU
  ========================================================= */

  const activityItems = [
    {
      key: "learn",
      label: "1. Learn",
    },
    {
      key: "recognize",
      label: "2. Recognize",
    },
    {
      key: "build",
      label: "3. Build",
    },
    {
      key: "detective",
      label: "4. Apply",
    },
    {
      key: "casefile",
      label: "5. Analyze",
    },
    {
      key: "challenge",
      label: "6. Challenge",
    },
  ];

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div
      style={{
        width: "100%",
        minWidth: 0,
      }}
    >
      {/* =====================================================
          LEVEL HEADER
      ===================================================== */}

      <div
        style={{
          marginBottom: isMobile
            ? 16
            : 20,
        }}
      >
        <Space
          wrap
          size={[8, 8]}
        >
          <Tag color="blue">
            Level {levelNumber}
          </Tag>

          <Text type="secondary">
            SQL Foundations
          </Text>
        </Space>

        <Title
          level={2}
          style={{
            marginTop: 8,
            marginBottom: 4,

            fontSize: isMobile
              ? 24
              : undefined,

            lineHeight: 1.25,
          }}
        >
          {title}
        </Title>

        <Paragraph
          type="secondary"
          style={{
            maxWidth: 760,
            marginBottom: 0,
          }}
        >
          {description}
        </Paragraph>
      </div>

      {/* =====================================================
          MASTERY CARD
      ===================================================== */}

      <Card
        style={{
          marginBottom: isMobile
            ? 16
            : 24,
        }}
        styles={{
          body: {
            padding: isMobile
              ? 16
              : 24,
          },
        }}
      >
        <div
          style={{
            display: "flex",

            flexDirection: isMobile
              ? "column"
              : "row",

            justifyContent:
              "space-between",

            alignItems: isMobile
              ? "stretch"
              : "center",

            gap: isMobile
              ? 10
              : 16,
          }}
        >
          <div
            style={{
              minWidth: 0,
            }}
          >
            <Title
              level={4}
              style={{
                margin: 0,
              }}
            >
              Level {levelNumber} Mastery
            </Title>

            <Text type="secondary">
              {solvedTasks.size} of{" "}
              {totalTasks} assessed tasks
              solved independently
            </Text>
          </div>

          <Title
            level={2}
            style={{
              margin: 0,

              fontSize: isMobile
                ? 26
                : undefined,
            }}
          >
            {mastery}%
          </Title>
        </div>

        <Progress
          percent={mastery}
          showInfo={false}
          style={{
            marginTop: 14,
            marginBottom: 0,
          }}
        />

        {revealedTasks.size > 0 && (
          <Text
            type="secondary"
            style={{
              display: "block",
              marginTop: 8,
            }}
          >
            {revealedTasks.size}{" "}
            {revealedTasks.size === 1
              ? "task"
              : "tasks"}{" "}
            reviewed with the answer
            revealed.
          </Text>
        )}
      </Card>

      {/* =====================================================
          ACTIVITY NAVIGATION
      ===================================================== */}

      <Card
        styles={{
          body: {
            padding: 0,
          },
        }}
        style={{
          marginBottom: isMobile
            ? 16
            : 24,

          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            overflowX: "auto",
            overflowY: "hidden",
            WebkitOverflowScrolling:
              "touch",
          }}
        >
          <Menu
            mode="horizontal"
            selectedKeys={[activity]}
            onClick={({ key }) =>
              setActivity(key)
            }
            items={activityItems}
            style={{
              minWidth: isMobile
                ? 600
                : "100%",

              borderBottom: "none",
            }}
          />
        </div>
      </Card>

      {/* =====================================================
          CURRENT ACTIVITY
      ===================================================== */}

      <div
        style={{
          width: "100%",
          minWidth: 0,
        }}
      >
        {renderActivity()}
      </div>
    </div>
  );
}