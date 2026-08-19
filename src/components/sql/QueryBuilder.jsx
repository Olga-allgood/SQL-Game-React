import { useState } from "react";

import {
  Button,
  Card,
  Progress,
  Space,
  Typography,
} from "antd";

const { Title, Text, Paragraph } = Typography;

export const QueryBuilder = ({
  tasks,
  solvedTasks,
  revealedTasks,
  onSolved,
  onReveal,
}) => {
  const [currentTask, setCurrentTask] = useState(0);
  const [selected, setSelected] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const task = tasks[currentTask];

  const taskKey =
    `build-${task.id}`;

  const taskWasRevealed =
    revealedTasks.has(taskKey);

  const solvedInActivity =
    tasks.filter((item) =>
      solvedTasks.has(
        `build-${item.id}`
      )
    ).length;

  const progress = Math.round(
    (solvedInActivity /
      tasks.length) *
      100
  );

  /* =========================================================
     ADD QUERY PIECE
  ========================================================= */

  const handlePiece = (piece) => {
    if (
      selected.includes(piece) ||
      submitted ||
      showAnswer
    ) {
      return;
    }

    setSelected(
      (previous) => [
        ...previous,
        piece,
      ]
    );
  };

  /* =========================================================
     CHECK
  ========================================================= */

  const handleCheck = () => {
    const isCorrect =
      JSON.stringify(selected) ===
      JSON.stringify(task.answer);

    setSubmitted(true);
    setCorrect(isCorrect);

    if (
      isCorrect &&
      !taskWasRevealed
    ) {
      onSolved(
        "build",
        task.id
      );
    }
  };

  /* =========================================================
     RESET
  ========================================================= */

  const handleReset = () => {
    setSelected([]);
    setSubmitted(false);
    setCorrect(false);
    setShowAnswer(false);
  };

  /* =========================================================
     TRY AGAIN
  ========================================================= */

  const handleTryAgain = () => {
    setSelected([]);
    setSubmitted(false);
    setCorrect(false);
    setShowAnswer(false);

    // Keep hint visible.
  };

  /* =========================================================
     SHOW HINT
  ========================================================= */

  const handleShowHint = () => {
    setShowHint(true);
  };

  /* =========================================================
     SHOW ANSWER
  ========================================================= */

  const handleShowAnswer = () => {
    setShowAnswer(true);

    onReveal(
      "build",
      task.id
    );
  };

  /* =========================================================
     NEXT
  ========================================================= */

  const handleNext = () => {
    if (
      currentTask >=
      tasks.length - 1
    ) {
      return;
    }

    setCurrentTask(
      (previous) =>
        previous + 1
    );

    setSelected([]);
    setSubmitted(false);
    setCorrect(false);
    setShowHint(false);
    setShowAnswer(false);
  };

  return (
    <Card
      style={{
        maxWidth: 850,
        margin: "0 auto",
      }}
    >
      {/* HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 16,
        }}
      >
        <div>
          <Title
            level={3}
            style={{
              margin: 0,
            }}
          >
            🔧 Build the Query
          </Title>

          <Text type="secondary">
            Assemble a basic SQL query
            from building blocks.
          </Text>
        </div>

        <Text strong>
          {progress}%
        </Text>
      </div>

      {/* PROGRESS */}

      <div
        style={{
          marginTop: 18,
        }}
      >
        <Text type="secondary">
          Correctly solved:{" "}
          {solvedInActivity} / {tasks.length}
        </Text>

        <Progress
          percent={progress}
          showInfo={false}
          size="small"
          style={{
            marginTop: 6,
          }}
        />
      </div>

      {/* TASK */}

      <div
        style={{
          marginTop: 28,
          paddingTop: 24,
          borderTop: "1px solid #f0f0f0",
        }}
      >
        <Text type="secondary">
          Task {currentTask + 1} of{" "}
          {tasks.length}
        </Text>

        <Title
          level={4}
          style={{
            marginTop: 8,
          }}
        >
          {task.prompt}
        </Title>

        {/* BUILT QUERY */}

        <div
          style={{
            marginTop: 16,
            padding: 16,
            minHeight: 64,
            background: "#fafafa",
            border: "1px solid #f0f0f0",
            borderRadius: 6,
          }}
        >
          <Text code>
            {selected.length
              ? selected.join(" ")
              : "Build your query..."}
          </Text>
        </div>

        {/* PIECES */}

        {!showAnswer && (
          <Space
            wrap
            style={{
              marginTop: 16,
            }}
          >
            {task.pieces.map((piece) => (
              <Button
                key={piece}
                onClick={() =>
                  handlePiece(piece)
                }
                disabled={
                  selected.includes(piece) ||
                  submitted
                }
              >
                {piece}
              </Button>
            ))}
          </Space>
        )}

        {/* ACTIONS */}

        {!submitted &&
          !showAnswer && (
            <Space
              wrap
              style={{
                marginTop: 20,
              }}
            >
              <Button
                type="primary"
                onClick={handleCheck}
                disabled={
                  selected.length === 0
                }
              >
                Check Query
              </Button>

              <Button
                onClick={handleReset}
              >
                Reset
              </Button>

              {!showHint && (
                <Button
                  onClick={handleShowHint}
                >
                  Show Hint
                </Button>
              )}
            </Space>
          )}
      </div>

      {/* =====================================================
          HINT
      ===================================================== */}

      {showHint && !showAnswer && (
        <div
          style={{
            marginTop: 18,
            padding: 16,
            background: "#fafafa",
            border: "1px solid #d9d9d9",
            borderRadius: 6,
          }}
        >
          <Text strong>
            💡 Hint
          </Text>

          <Paragraph
            style={{
              marginTop: 8,
              marginBottom: 0,
            }}
          >
            {task.hint ||
              "Remember the structure: SELECT tells SQL what to return, and FROM tells SQL where the data comes from."}
          </Paragraph>
        </div>
      )}

      {/* FEEDBACK */}

      {submitted &&
        !showAnswer && (
          <div
            style={{
              marginTop: 20,
            }}
          >
            <Text
              strong
              type={
                correct
                  ? "success"
                  : "danger"
              }
            >
              {correct
                ? "Correct!"
                : "Not quite."}
            </Text>

            {correct ? (
              <>
                <Paragraph
                  style={{
                    marginTop: 8,
                  }}
                >
                  {task.explanation}
                </Paragraph>

                {taskWasRevealed && (
                  <Text type="secondary">
                    The answer was previously
                    revealed, so this task does
                    not count toward independent
                    mastery.
                  </Text>
                )}
              </>
            ) : (
              <>
                <Paragraph
                  type="secondary"
                  style={{
                    marginTop: 8,
                  }}
                >
                  Think about the order of the
                  SQL keywords and try again.
                </Paragraph>

                <Space wrap>
                  <Button
                    type="primary"
                    onClick={
                      handleTryAgain
                    }
                  >
                    Try Again
                  </Button>

                  {!showHint && (
                    <Button
                      onClick={
                        handleShowHint
                      }
                    >
                      Show Hint
                    </Button>
                  )}

                  <Button
                    onClick={
                      handleShowAnswer
                    }
                  >
                    Show Answer
                  </Button>
                </Space>
              </>
            )}
          </div>
        )}

      {/* ANSWER */}

      {showAnswer && (
        <div
          style={{
            marginTop: 20,
            padding: 16,
            background: "#fafafa",
            border: "1px solid #f0f0f0",
            borderRadius: 6,
          }}
        >
          <Text strong>
            Correct query
          </Text>

          <div
            style={{
              marginTop: 8,
            }}
          >
            <Text code>
              {task.answer.join(" ")};
            </Text>
          </div>

          <Paragraph
            style={{
              marginTop: 12,
            }}
          >
            {task.explanation}
          </Paragraph>

          <Text type="secondary">
            Because the answer was revealed,
            this task does not count toward
            independent mastery.
          </Text>
        </div>
      )}

      {/* NEXT */}

      {(correct ||
        showAnswer) && (
        <div
          style={{
            marginTop: 22,
          }}
        >
          {currentTask <
          tasks.length - 1 ? (
            <Button
              type="primary"
              onClick={handleNext}
            >
              Next Task
            </Button>
          ) : (
            <Text strong>
              Activity complete
            </Text>
          )}
        </div>
      )}
    </Card>
  );
};