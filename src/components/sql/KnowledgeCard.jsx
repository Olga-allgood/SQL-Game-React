// src/components/sql/KnowledgeCard.jsx

import { useState } from "react";
import {
  Button,
  Card,
  Typography,
} from "antd";

const { Text } = Typography;

export const KnowledgeCard = ({
  question,
  answer,
  keyTakeaway,
}) => {
  const [showAnswer, setShowAnswer] =
    useState(false);

  const renderAnswer = () => {
    const parts =
      answer.split("Example:");

    if (parts.length === 1) {
      return (
        <Text>
          {answer}
        </Text>
      );
    }

    const explanation =
      parts[0].trim();

    const example =
      parts
        .slice(1)
        .join("Example:")
        .trim();

    return (
      <>
        <Text>
          {explanation}
        </Text>

        <div
          style={{
            marginTop: 12,
            padding: 12,
            background: "#fafafa",
            borderRadius: 6,
          }}
        >
          <Text type="secondary">
            Example
          </Text>

          <div
            style={{
              marginTop: 6,
            }}
          >
            <Text code>
              {example}
            </Text>
          </div>
        </div>
      </>
    );
  };

  return (
    <Card
      style={{
        height: "100%",
      }}
      styles={{
        body: {
          height: "100%",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Text strong>
        {question}
      </Text>

      {showAnswer ? (
        <>
          <div
            style={{
              marginTop: 12,
            }}
          >
            {renderAnswer()}
          </div>

          <div
            style={{
              marginTop: 16,
              marginBottom: 16,
            }}
          >
            <Text type="secondary">
              Key takeaway
            </Text>

            <div
              style={{
                marginTop: 4,
              }}
            >
              <Text strong>
                {keyTakeaway}
              </Text>
            </div>
          </div>

          <Button
            onClick={() =>
              setShowAnswer(false)
            }
            style={{
              marginTop: "auto",
            }}
          >
            Hide Answer
          </Button>
        </>
      ) : (
        <Button
          type="primary"
          onClick={() =>
            setShowAnswer(true)
          }
          style={{
            marginTop: "auto",
          }}
        >
          Reveal
        </Button>
      )}
    </Card>
  );
};