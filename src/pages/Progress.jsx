import {
  Button,
  Card,
  Progress,
  Space,
  Typography,
} from "antd";

import {
  useProgress,
} from "../context/ProgressContext";

/* =========================================================
   LEVEL 1 DATA
========================================================= */

import {
  recognitionTasks as readingRecognition,
  builderTasks as readingBuilder,
  detectiveTasks as readingDetective,
  caseFiles as readingCases,
  challengeTasks as readingChallenges,
} from "../data/sql/readingQuery";

/* =========================================================
   LEVEL 2 DATA
========================================================= */

import {
  recognitionTasks as filteringRecognition,
  builderTasks as filteringBuilder,
  detectiveTasks as filteringDetective,
  caseFiles as filteringCases,
  challengeTasks as filteringChallenges,
} from "../data/sql/filteringData";

/* =========================================================
   LEVEL 3 DATA
========================================================= */

import {
  recognitionTasks as sortingRecognition,
  builderTasks as sortingBuilder,
  detectiveTasks as sortingDetective,
  caseFiles as sortingCases,
  challengeTasks as sortingChallenges,
} from "../data/sql/sortingResults";

/* =========================================================
   LEVEL 4 DATA
========================================================= */

import {
  recognitionTasks as summarizingRecognition,
  builderTasks as summarizingBuilder,
  detectiveTasks as summarizingDetective,
  caseFiles as summarizingCases,
  challengeTasks as summarizingChallenges,
} from "../data/sql/summarizingData";

/* =========================================================
   LEVEL 5 DATA
========================================================= */

import {
  recognitionTasks as groupingRecognition,
  builderTasks as groupingBuilder,
  detectiveTasks as groupingDetective,
  caseFiles as groupingCases,
  challengeTasks as groupingChallenges,
} from "../data/sql/groupingData";

/* =========================================================
   LEVEL 6 DATA
========================================================= */

import {
  recognitionTasks as connectingRecognition,
  builderTasks as connectingBuilder,
  detectiveTasks as connectingDetective,
  caseFiles as connectingCases,
  challengeTasks as connectingChallenges,
} from "../data/sql/connectingData";

/* =========================================================
   LEVEL 7 DATA
========================================================= */

import {
  recognitionTasks as practicalRecognition,
  builderTasks as practicalBuilder,
  detectiveTasks as practicalDetective,
  caseFiles as practicalCases,
  challengeTasks as practicalChallenges,
} from "../data/sql/practicalSQL";

const {
  Title,
  Text,
  Paragraph,
} = Typography;

export default function ProgressPage() {
  const {
    getLevelProgress,
    resetAllProgress,
  } = useProgress();

  /* =========================================================
     LEVEL DEFINITIONS
  ========================================================= */

  const levels = [
    {
      key: "reading-query",
      number: 1,
      title: "Reading a Query",

      total:
        readingRecognition.length +
        readingBuilder.length +
        readingDetective.length +
        readingCases.length +
        readingChallenges.length,
    },

    {
      key: "filtering-data",
      number: 2,
      title: "Filtering Data",

      total:
        filteringRecognition.length +
        filteringBuilder.length +
        filteringDetective.length +
        filteringCases.length +
        filteringChallenges.length,
    },

    {
      key: "sorting-results",
      number: 3,
      title:
        "Sorting & Controlling Results",

      total:
        sortingRecognition.length +
        sortingBuilder.length +
        sortingDetective.length +
        sortingCases.length +
        sortingChallenges.length,
    },

    {
      key: "summarizing-data",
      number: 4,
      title: "Summarizing Data",

      total:
        summarizingRecognition.length +
        summarizingBuilder.length +
        summarizingDetective.length +
        summarizingCases.length +
        summarizingChallenges.length,
    },

    {
      key: "grouping-data",
      number: 5,
      title: "Grouping Data",

      total:
        groupingRecognition.length +
        groupingBuilder.length +
        groupingDetective.length +
        groupingCases.length +
        groupingChallenges.length,
    },

    {
      key: "connecting-data",
      number: 6,
      title: "Connecting Data",

      total:
        connectingRecognition.length +
        connectingBuilder.length +
        connectingDetective.length +
        connectingCases.length +
        connectingChallenges.length,
    },

    {
      key: "practical-sql",
      number: 7,
      title: "Practical SQL",

      total:
        practicalRecognition.length +
        practicalBuilder.length +
        practicalDetective.length +
        practicalCases.length +
        practicalChallenges.length,
    },
  ];

  /* =========================================================
     CALCULATE EACH LEVEL
  ========================================================= */

  const levelResults =
    levels.map((level) => {
      const saved =
        getLevelProgress(
          level.key
        );

      const solved =
        saved.solvedTasks.length;

      const revealed =
        saved.revealedTasks.length;

      const mastery =
        level.total === 0
          ? 0
          : Math.round(
              (solved /
                level.total) *
                100
            );

      return {
        ...level,
        solved,
        revealed,
        mastery,
      };
    });

  /* =========================================================
     OVERALL PROGRESS
  ========================================================= */

  const totalTasks =
    levelResults.reduce(
      (total, level) =>
        total + level.total,
      0
    );

  const totalSolved =
    levelResults.reduce(
      (total, level) =>
        total + level.solved,
      0
    );

  const totalRevealed =
    levelResults.reduce(
      (total, level) =>
        total + level.revealed,
      0
    );

  const overallMastery =
    totalTasks === 0
      ? 0
      : Math.round(
          (totalSolved /
            totalTasks) *
            100
        );

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      <Title level={2}>
        My Progress
      </Title>

      <Paragraph type="secondary">
        Track your mastery across
        SQL Foundations.
      </Paragraph>

      {/* =====================================================
          OVERALL MASTERY
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
              Overall Mastery
            </Title>

            <Text type="secondary">
              {totalSolved} of{" "}
              {totalTasks} assessed
              tasks solved independently
            </Text>
          </div>

          <Title
            level={2}
            style={{
              margin: 0,
            }}
          >
            {overallMastery}%
          </Title>
        </div>

        <Progress
          percent={overallMastery}
          showInfo={false}
          style={{
            marginTop: 16,
          }}
        />

        {totalRevealed > 0 && (
          <Text
            type="secondary"
            style={{
              display: "block",
              marginTop: 8,
            }}
          >
            {totalRevealed}{" "}
            task
            {totalRevealed === 1
              ? ""
              : "s"}{" "}
            reviewed with the
            answer revealed.
          </Text>
        )}
      </Card>

      {/* =====================================================
          LEVEL PROGRESS
      ===================================================== */}

      <Space
        direction="vertical"
        size="middle"
        style={{
          width: "100%",
        }}
      >
        {levelResults.map(
          (level) => (
            <Card
              key={level.key}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems:
                    "center",
                  gap: 24,
                }}
              >
                <div>
                  <Text
                    type="secondary"
                  >
                    Level{" "}
                    {level.number}
                  </Text>

                  <Title
                    level={4}
                    style={{
                      margin:
                        "4px 0",
                    }}
                  >
                    {level.title}
                  </Title>

                  <Text type="secondary">
                    {level.solved}{" "}
                    of{" "}
                    {level.total}{" "}
                    assessed tasks
                    solved independently
                  </Text>
                </div>

                <Title
                  level={3}
                  style={{
                    margin: 0,
                  }}
                >
                  {
                    level.mastery
                  }
                  %
                </Title>
              </div>

              <Progress
                percent={
                  level.mastery
                }
                showInfo={false}
                style={{
                  marginTop: 14,
                }}
              />

              {level.revealed >
                0 && (
                <Text
                  type="secondary"
                  style={{
                    display:
                      "block",
                    marginTop: 6,
                  }}
                >
                  {
                    level.revealed
                  }{" "}
                  task
                  {level.revealed ===
                  1
                    ? ""
                    : "s"}{" "}
                  reviewed with the
                  answer revealed
                </Text>
              )}
            </Card>
          )
        )}
      </Space>

      {/* =====================================================
          RESET
      ===================================================== */}

      <Button
        danger
        style={{
          marginTop: 24,
        }}
        onClick={
          resetAllProgress
        }
      >
        Reset Progress
      </Button>
    </>
  );
}