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

  const taskKey = `build-${task.id}`;

  const taskWasRevealed =
    revealedTasks.has(taskKey);

  const solvedInActivity =
    tasks.filter((item) =>
      solvedTasks.has(`build-${item.id}`)
    ).length;

  const progress = Math.round(
    (solvedInActivity / tasks.length) * 100
  );

  /*
    Store the index as well as the text.

    This lets the builder support repeated pieces,
    such as publication_year appearing twice.
  */

  const selectedIndexes =
    selected.map((item) => item.index);

  const builtQuery =
    selected.map((item) => item.piece);

  /* =========================================================
     ADD PIECE
  ========================================================= */

  const handlePiece = (
    piece,
    index
  ) => {
    if (
      submitted ||
      showAnswer ||
      selectedIndexes.includes(index)
    ) {
      return;
    }

    setSelected((previous) => [
      ...previous,
      {
        piece,
        index,
      },
    ]);
  };

  /* =========================================================
     REMOVE LAST PIECE
  ========================================================= */

  const handleUndo = () => {
    if (
      submitted ||
      showAnswer ||
      selected.length === 0
    ) {
      return;
    }

    setSelected((previous) =>
      previous.slice(0, -1)
    );
  };

  /* =========================================================
     CHECK
  ========================================================= */

  const handleCheck = () => {
    const isCorrect =
      JSON.stringify(builtQuery) ===
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

    /*
      Keep hint visible if learner
      has already requested it.
    */
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
      (previous) => previous + 1
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
            Assemble the SQL query from
            the available pieces.
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
          borderTop:
            "1px solid #f0f0f0",
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
            border:
              "1px solid #f0f0f0",
            borderRadius: 6,
          }}
        >
          <Text code>
            {builtQuery.length
              ? builtQuery.join(" ")
              : "Build your query..."}
          </Text>
        </div>

        {/* QUERY PIECES */}

        {!showAnswer && (
          <Space
            wrap
            style={{
              marginTop: 16,
            }}
          >
            {task.pieces.map(
              (piece, index) => (
                <Button
                  key={`${piece}-${index}`}
                  onClick={() =>
                    handlePiece(
                      piece,
                      index
                    )
                  }
                  disabled={
                    selectedIndexes.includes(
                      index
                    ) ||
                    submitted
                  }
                >
                  {piece}
                </Button>
              )
            )}
          </Space>
        )}

        {/* INITIAL ACTIONS */}

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
                onClick={handleUndo}
                disabled={
                  selected.length === 0
                }
              >
                Undo
              </Button>

              <Button
                onClick={handleReset}
                disabled={
                  selected.length === 0
                }
              >
                Reset
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
            </Space>
          )}
      </div>

      {/* HINT */}

      {showHint &&
        !showAnswer && (
          <div
            style={{
              marginTop: 18,
              padding: 16,
              background: "#fafafa",
              border:
                "1px solid #d9d9d9",
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
              {task.hint}
            </Paragraph>
          </div>
        )}

      {/* INCORRECT */}

      {submitted &&
        !correct &&
        !showAnswer && (
          <div
            style={{
              marginTop: 20,
            }}
          >
            <Text
              strong
              type="danger"
            >
              Not quite.
            </Text>

            <Space
              wrap
              style={{
                marginTop: 12,
              }}
            >
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
          </div>
        )}

      {/* CORRECT */}

      {submitted &&
        correct &&
        !showAnswer && (
          <div
            style={{
              marginTop: 20,
            }}
          >
            <Text
              strong
              type="success"
            >
              Correct!
            </Text>

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
          </div>
        )}

      {/* REVEALED ANSWER */}

      {showAnswer && (
        <div
          style={{
            marginTop: 20,
            padding: 16,
            background: "#fafafa",
            border:
              "1px solid #f0f0f0",
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
              onClick={
                handleNext
              }
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