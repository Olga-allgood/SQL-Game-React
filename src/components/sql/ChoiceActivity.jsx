// src/components/sql/ChoiceActivity.jsx

import { useState } from "react";
import {
  Button,
  Card,
  Progress,
  Radio,
  Space,
  Typography,
} from "antd";

const { Title, Text, Paragraph } = Typography;

export const ChoiceActivity = ({
  activityKey,
  title,
  subtitle,
  tasks,
  solvedTasks,
  revealedTasks,
  onSolved,
  onReveal,
}) => {
  const [currentTask, setCurrentTask] = useState(0);
  const [selected, setSelected] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const task = tasks[currentTask];

  const taskKey = `${activityKey}-${task.id}`;

  const taskWasRevealed =
    revealedTasks.has(taskKey);

  const solvedInActivity = tasks.filter((item) =>
    solvedTasks.has(`${activityKey}-${item.id}`)
  ).length;

  const progress = Math.round(
    (solvedInActivity / tasks.length) * 100
  );

  const correctOption = task.options.find(
    (option) => option.id === task.correctAnswer
  );

  const handleCheck = () => {
    if (!selected) return;

    const isCorrect =
      selected === task.correctAnswer;

    setSubmitted(true);
    setCorrect(isCorrect);

    if (
      isCorrect &&
      !taskWasRevealed
    ) {
      onSolved(activityKey, task.id);
    }
  };

  const handleTryAgain = () => {
    setSelected("");
    setSubmitted(false);
    setCorrect(false);
    setShowAnswer(false);
  };

  const handleShowHint = () => {
    setShowHint(true);
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);

    onReveal(
      activityKey,
      task.id
    );
  };

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

    setSelected("");
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
            style={{ margin: 0 }}
          >
            {title}
          </Title>

          <Text type="secondary">
            {subtitle}
          </Text>
        </div>

        <Text strong>
          {progress}%
        </Text>
      </div>

      {/* ACTIVITY PROGRESS */}

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
          Task {currentTask + 1} of {tasks.length}
        </Text>

        {task.title && (
          <Title
            level={4}
            style={{
              marginTop: 8,
              marginBottom: 8,
            }}
          >
            {task.title}
          </Title>
        )}

        {task.scenario && (
          <Paragraph>
            {task.scenario}
          </Paragraph>
        )}

        {task.query && (
          <div
            style={{
              marginTop: 16,
              marginBottom: 20,
              padding: 16,
              background: "#fafafa",
              border: "1px solid #f0f0f0",
              borderRadius: 6,
            }}
          >
            <Text
              code
              style={{
                whiteSpace: "pre-wrap",
              }}
            >
              {task.query.trim()}
            </Text>
          </div>
        )}

        <Paragraph strong>
          {task.question}
        </Paragraph>

        <Radio.Group
          value={selected}
          onChange={(event) =>
            setSelected(event.target.value)
          }
          disabled={submitted || showAnswer}
        >
          <Space
            direction="vertical"
            size="middle"
          >
            {task.options.map((option) => (
              <Radio
                key={option.id}
                value={option.id}
              >
                {option.label}
              </Radio>
            ))}
          </Space>
        </Radio.Group>

        {!submitted && !showAnswer && (
          <Space
            wrap
            style={{
              marginTop: 20,
            }}
          >
            <Button
              type="primary"
              disabled={!selected}
              onClick={handleCheck}
            >
              Check Answer
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

      {/* HINT */}

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
            {task.hint}
          </Paragraph>
        </div>
      )}

      {/* INCORRECT FEEDBACK */}

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

            <div
              style={{
                marginTop: 12,
              }}
            >
              <Space wrap>
                <Button
                  type="primary"
                  onClick={handleTryAgain}
                >
                  Try Again
                </Button>

                {!showHint && (
                  <Button
                    onClick={handleShowHint}
                  >
                    Show Hint
                  </Button>
                )}

                <Button
                  onClick={handleShowAnswer}
                >
                  Show Answer
                </Button>
              </Space>
            </div>
          </div>
        )}

      {/* CORRECT FEEDBACK */}

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
                The answer was previously revealed,
                so this task does not count toward
                independent mastery.
              </Text>
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
            Correct answer
          </Text>

          <Paragraph
            style={{
              marginTop: 8,
            }}
          >
            <Text code>
              {correctOption?.label}
            </Text>
          </Paragraph>

          <Paragraph>
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

      {(correct || showAnswer) && (
        <div
          style={{
            marginTop: 22,
          }}
        >
          {currentTask < tasks.length - 1 ? (
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