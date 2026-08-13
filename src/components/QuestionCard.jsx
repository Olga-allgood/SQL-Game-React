import { useState } from "react";
import { Card, Typography, Button } from "antd";

const { Text } = Typography;

export const QuestionCard = ({
  question,
  answer,
  keyTakeaway,
}) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const renderAnswer = () => {
    const parts = answer.split("Example:");

    if (parts.length === 1) {
      return <Text>{answer}</Text>;
    }

    return (
      <>
        <Text>{parts[0]}</Text>

        <Text type="primary" strong>
          Example:
          {parts.slice(1).join("Example:")}
        </Text>
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
      <Text strong>{question}</Text>

      {showAnswer && (
        <>
          <div style={{ marginTop: 12 }}>
            {renderAnswer()}
          </div>

          <div style={{ marginTop: 16, marginBottom: 16 }}>
            <Text type="secondary">
              Key takeaway:
            </Text>

            <div style={{ marginTop: 4 }}>
              <Text type="primary" strong>
                {keyTakeaway}
              </Text>
            </div>
          </div>

          <Button
            onClick={() => setShowAnswer(false)}
            style={{ marginTop: "auto" }}
          >
            Hide Answer
          </Button>
        </>
      )}

      {!showAnswer && (
        <Button
          type="primary"
          onClick={() => setShowAnswer(true)}
          style={{ marginTop: "auto" }}
        >
          Show Answer
        </Button>
      )}
    </Card>
  );
};