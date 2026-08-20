import { useState } from "react";

import {
  Card,
  Menu,
  Progress,
  Space,
  Tag,
  Typography,
} from "antd";

import { SQLCards } from "../../components/sql/SQLCards";
import SQLRecognition from "../../components/sql/SQLRecognition";
import { QueryBuilder } from "../../components/sql/QueryBuilder";
import SQLDetective from "../../components/sql/SQLDetective";
import SQLCaseFile from "../../components/sql/SQLCaseFile";
import SQLChallenge from "../../components/sql/SQLChallenge";

import {
  groupingCards,
  recognitionTasks,
  builderTasks,
  detectiveTasks,
  caseFiles,
  challengeTasks,
} from "../../data/sql/groupingData";

import {
  useProgress,
} from "../../context/ProgressContext";

const {
  Title,
  Text,
  Paragraph,
} = Typography;

const LEVEL_KEY = "grouping-data";

export default function GroupingData() {
  const [
    activity,
    setActivity,
  ] = useState("learn");

  const {
    getLevelProgress,
    markTaskSolved,
    markAnswerRevealed,
  } = useProgress();

  const levelProgress =
    getLevelProgress(
      LEVEL_KEY
    );

  const solvedTasks =
    new Set(
      levelProgress.solvedTasks
    );

  const revealedTasks =
    new Set(
      levelProgress.revealedTasks
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
          (solvedTasks.size /
            totalTasks) *
            100
        );

  const handleSolved = (
    activityKey,
    taskId
  ) => {
    markTaskSolved(
      LEVEL_KEY,
      activityKey,
      taskId
    );
  };

  const handleReveal = (
    activityKey,
    taskId
  ) => {
    markAnswerRevealed(
      LEVEL_KEY,
      activityKey,
      taskId
    );
  };

  const renderActivity = () => {
    switch (activity) {
      case "learn":
        return (
          <SQLCards
            cards={
              groupingCards
            }
          />
        );

      case "recognize":
        return (
          <SQLRecognition
            tasks={
              recognitionTasks
            }
            solvedTasks={
              solvedTasks
            }
            revealedTasks={
              revealedTasks
            }
            onSolved={
              handleSolved
            }
            onReveal={
              handleReveal
            }
          />
        );

      case "build":
        return (
          <QueryBuilder
            tasks={
              builderTasks
            }
            solvedTasks={
              solvedTasks
            }
            revealedTasks={
              revealedTasks
            }
            onSolved={
              handleSolved
            }
            onReveal={
              handleReveal
            }
          />
        );

      case "detective":
        return (
          <SQLDetective
            tasks={
              detectiveTasks
            }
            solvedTasks={
              solvedTasks
            }
            revealedTasks={
              revealedTasks
            }
            onSolved={
              handleSolved
            }
            onReveal={
              handleReveal
            }
          />
        );

      case "casefile":
        return (
          <SQLCaseFile
            cases={
              caseFiles
            }
            solvedTasks={
              solvedTasks
            }
            revealedTasks={
              revealedTasks
            }
            onSolved={
              handleSolved
            }
            onReveal={
              handleReveal
            }
          />
        );

      case "challenge":
        return (
          <SQLChallenge
            tasks={
              challengeTasks
            }
            solvedTasks={
              solvedTasks
            }
            revealedTasks={
              revealedTasks
            }
            onSolved={
              handleSolved
            }
            onReveal={
              handleReveal
            }
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* LEVEL HEADER */}

      <div
        style={{
          marginBottom: 20,
        }}
      >
        <Space>
          <Tag color="blue">
            Level 5
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
          }}
        >
          Grouping Data
        </Title>

        <Paragraph type="secondary">
          Learn how to summarize
          categories and groups using
          GROUP BY and how to filter
          rows and grouped results with
          WHERE and HAVING.
        </Paragraph>
      </div>

      {/* MASTERY */}

      <Card
        style={{
          marginBottom: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div>
            <Title
              level={4}
              style={{
                margin: 0,
              }}
            >
              Level 5 Mastery
            </Title>

            <Text type="secondary">
              {solvedTasks.size}{" "}
              of {totalTasks} assessed
              tasks solved
              independently
            </Text>
          </div>

          <Title
            level={2}
            style={{
              margin: 0,
            }}
          >
            {mastery}%
          </Title>
        </div>

        <Progress
          percent={mastery}
          showInfo={false}
          style={{
            marginTop: 16,
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
            task
            {revealedTasks.size === 1
              ? ""
              : "s"}{" "}
            reviewed with the answer
            revealed.
          </Text>
        )}
      </Card>

      {/* LEARNING CYCLE */}

      <Card
        styles={{
          body: {
            padding: 0,
          },
        }}
        style={{
          marginBottom: 24,
        }}
      >
        <Menu
          mode="horizontal"
          selectedKeys={[
            activity,
          ]}
          onClick={({ key }) =>
            setActivity(key)
          }
          items={[
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
          ]}
        />
      </Card>

      {renderActivity()}
    </>
  );
}