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
  readingQueryCards,
  recognitionTasks,
  builderTasks,
  detectiveTasks,
  caseFiles,
  challengeTasks,
} from "../../data/sql/readingQuery";

const {
  Title,
  Text,
  Paragraph,
} = Typography;

export default function ReadingQuery() {
  const [
    activity,
    setActivity,
  ] = useState("learn");

  /*
   * These Sets live at the Level 1
   * level so progress survives when
   * the learner moves between
   * activities.
   */

  const [
    solvedTasks,
    setSolvedTasks,
  ] = useState(new Set());

  const [
    revealedTasks,
    setRevealedTasks,
  ] = useState(new Set());

  /* =========================================================
     TOTAL ASSESSED TASKS
  ========================================================= */

  const totalTasks =
    recognitionTasks.length +
    builderTasks.length +
    detectiveTasks.length +
    caseFiles.length +
    challengeTasks.length;

  /* =========================================================
     RECORD SOLVED TASK
  ========================================================= */

  const handleSolved = (
    activityKey,
    taskId
  ) => {
    const taskKey =
      `${activityKey}-${taskId}`;

    /*
     * If the answer was previously
     * revealed, it should not count
     * toward independent mastery.
     */

    if (
      revealedTasks.has(taskKey)
    ) {
      return;
    }

    setSolvedTasks(
      (previous) => {
        const updated =
          new Set(previous);

        updated.add(taskKey);

        return updated;
      }
    );
  };

  /* =========================================================
     RECORD REVEALED ANSWER
  ========================================================= */

  const handleReveal = (
    activityKey,
    taskId
  ) => {
    const taskKey =
      `${activityKey}-${taskId}`;

    setRevealedTasks(
      (previous) => {
        const updated =
          new Set(previous);

        updated.add(taskKey);

        return updated;
      }
    );

    /*
     * If it somehow counted before
     * reveal, remove it from
     * independent mastery.
     */

    setSolvedTasks(
      (previous) => {
        const updated =
          new Set(previous);

        updated.delete(taskKey);

        return updated;
      }
    );
  };

  /* =========================================================
     MASTERY
  ========================================================= */

  const mastery =
    totalTasks === 0
      ? 0
      : Math.round(
          (solvedTasks.size /
            totalTasks) *
            100
        );

  /* =========================================================
     ACTIVITY RENDERING
  ========================================================= */

  const renderActivity = () => {
    switch (activity) {
      case "learn":
        return (
          <SQLCards
            cards={
              readingQueryCards
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
            cases={caseFiles}
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
      {/* =====================================================
          LEVEL HEADER
      ===================================================== */}

      <div
        style={{
          marginBottom: 20,
        }}
      >
        <Space>
          <Tag color="blue">
            Level 1
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
          Reading a Query
        </Title>

        <Paragraph type="secondary">
          Learn how SELECT, FROM,
          and * define the
          information returned by
          a basic SQL query.
        </Paragraph>
      </div>

      {/* =====================================================
          LEVEL 1 MASTERY
      ===================================================== */}

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
              Level 1 Mastery
            </Title>

            <Text type="secondary">
              {solvedTasks.size} of{" "}
              {totalTasks} assessed
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

        {revealedTasks.size >
          0 && (
          <Text
            type="secondary"
            style={{
              display: "block",
              marginTop: 8,
            }}
          >
            {
              revealedTasks.size
            }{" "}
            task
            {revealedTasks.size ===
            1
              ? ""
              : "s"}{" "}
            reviewed with the
            answer revealed.
          </Text>
        )}
      </Card>

      {/* =====================================================
          LEARNING CYCLE
      ===================================================== */}

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
              label:
                "1. Learn",
            },
            {
              key: "recognize",
              label:
                "2. Recognize",
            },
            {
              key: "build",
              label:
                "3. Build",
            },
            {
              key: "detective",
              label:
                "4. Apply",
            },
            {
              key: "casefile",
              label:
                "5. Analyze",
            },
            {
              key: "challenge",
              label:
                "6. Challenge",
            },
          ]}
        />
      </Card>

      {/* =====================================================
          CURRENT ACTIVITY
      ===================================================== */}

      {renderActivity()}
    </>
  );
}