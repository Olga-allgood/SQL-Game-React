
import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Divider,
  Input,
  Progress,
  Row,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

interface Clue {
  question: string;
  hint: string;
  skills: string[];
  correctQuery: string;
  result: string[];
  explanation: string;
}

const clues: Clue[] = [
  {
    question: "Who has NOT submitted Homework 1?",
    hint: "Use WHERE to filter the submissions.",
    skills: ["SELECT", "WHERE"],
    correctQuery: `
SELECT *
FROM submissions
WHERE submitted = 'No';
`,
    result: ["John"],
    explanation:
      "SELECT chooses the data you want to see, while WHERE filters the rows. Here, submitted = 'No' keeps only the students who did not submit the homework.",
  },

  {
    question: "Which students have submitted Homework 1?",
    hint: "Look for students whose submitted value is 'Yes'.",
    skills: ["SELECT", "WHERE"],
    correctQuery: `
SELECT *
FROM submissions
WHERE submitted = 'Yes';
`,
    result: ["Anna", "Mike"],
    explanation:
      "SELECT chooses the columns you want to see, while WHERE filters the submissions table. By using submitted = 'Yes', we keep only the students who submitted their homework.",
  },

  {
    question: "How many students have submitted Homework 1?",
    hint: "You need to count the submitted rows.",
    skills: ["SELECT", "WHERE", "COUNT()"],
    correctQuery: `
SELECT COUNT(*)
FROM submissions
WHERE submitted = 'Yes';
`,
    result: ["2"],
    explanation:
      "COUNT(*) counts the number of rows that match the condition. WHERE first filters the table to submitted homework, and SELECT COUNT(*) counts those rows.",
  },

  {
    question: "Show the students from youngest to oldest.",
    hint: "Use ORDER BY with the age column.",
    skills: ["SELECT", "ORDER BY"],
    correctQuery: `
SELECT name, age
FROM students
ORDER BY age ASC;
`,
    result: [
      "Sarah — 17",
      "Anna — 19",
      "Mike — 22",
      "John — 25",
    ],
    explanation:
      "SELECT chooses the name and age columns. ORDER BY sorts the results. ASC means ascending, so the students are displayed from the youngest to the oldest.",
  },

  {
    question: "How many students are enrolled in each course?",
    hint: "You need to group students by course and count them.",
    skills: ["SELECT", "GROUP BY", "COUNT()"],
    correctQuery: `
SELECT course, COUNT(*)
FROM students
GROUP BY course;
`,
    result: ["SQL — 4"],
    explanation:
      "GROUP BY puts rows with the same course together. COUNT(*) then tells us how many students are in each group.",
  },

  {
    question: "Which courses have more than 2 students?",
    hint: "Use GROUP BY to create groups, then HAVING to filter those groups.",
    skills: ["SELECT", "GROUP BY", "HAVING", "COUNT()"],
    correctQuery: `
SELECT course, COUNT(*)
FROM students
GROUP BY course
HAVING COUNT(*) > 2;
`,
    result: ["SQL — 4"],
    explanation:
      "GROUP BY creates a group for each course. COUNT(*) counts the students in each group, and HAVING filters those groups based on the count.",
  },
];

const students = [
  {
    key: "1",
    id: 1,
    name: "Anna",
    age: 19,
    course: "SQL",
  },
  {
    key: "2",
    id: 2,
    name: "Mike",
    age: 22,
    course: "SQL",
  },
  {
    key: "3",
    id: 3,
    name: "Sarah",
    age: 17,
    course: "SQL",
  },
  {
    key: "4",
    id: 4,
    name: "John",
    age: 25,
    course: "SQL",
  },
];

const submissions = [
  {
    key: "1",
    student_id: 1,
    assignment: "Homework 1",
    submitted: "Yes",
  },
  {
    key: "2",
    student_id: 2,
    assignment: "Homework 1",
    submitted: "Yes",
  },
  {
    key: "3",
    student_id: 4,
    assignment: "Homework 1",
    submitted: "No",
  },
];

const studentColumns = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "course",
    dataIndex: "course",
    key: "course",
  },
];

const submissionColumns = [
  {
    title: "student_id",
    dataIndex: "student_id",
    key: "student_id",
  },
  {
    title: "assignment",
    dataIndex: "assignment",
    key: "assignment",
  },
  {
    title: "submitted",
    dataIndex: "submitted",
    key: "submitted",
  },
];

const normalizeQuery = (query: string) =>
  query
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/;$/, "");

const SQLDetective = () => {
  const [currentClue, setCurrentClue] = useState(0);
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [solved, setSolved] = useState(false);
  const [caseComplete, setCaseComplete] = useState(false);

  const clue = clues[currentClue];

  const runQuery = () => {
    const userQuery = normalizeQuery(query);
    const correctQuery = normalizeQuery(clue.correctQuery);

    setSubmitted(true);

    if (userQuery === correctQuery) {
      setSolved(true);
    } else {
      setSolved(false);
    }
  };

  const nextClue = () => {
    if (currentClue === clues.length - 1) {
      setCaseComplete(true);
      return;
    }

    setCurrentClue((previous) => previous + 1);
    setQuery("");
    setSubmitted(false);
    setSolved(false);
  };

  const isLastClue = currentClue === clues.length - 1;

  const progressPercent = caseComplete
    ? 100
    : Math.round(
        ((currentClue + (submitted ? 1 : 0)) / clues.length) * 100
      );

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      {/* Header */}

      <Space direction="vertical" size={4}>
        <Tag color="purple">SQL LEARNING LAB</Tag>

        <Title level={1} style={{ margin: 0 }}>
          🕵️ SQL Detective
        </Title>

        <Text type="secondary">
          Solve the mystery by using SQL to uncover the evidence.
        </Text>
      </Space>

      <Divider />

      {/* Case Introduction */}

      <Card style={{ marginBottom: 24 }}>
        <Space align="start">
          <span style={{ fontSize: 40 }}>🗂️</span>

          <div>
            <Title level={3} style={{ marginTop: 0 }}>
              The Mystery of the Missing Homework
            </Title>

            <Paragraph type="secondary">
              Three students claim they submitted their homework.
              Use SQL to investigate what really happened.
            </Paragraph>

            <Tag color="blue">CASE #001</Tag>
          </div>
        </Space>
      </Card>

      {/* Progress */}

      <Card size="small" style={{ marginBottom: 24 }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Text strong>Investigation progress</Text>

          <Progress
            percent={progressPercent}
            status={
              caseComplete
                ? "success"
                : solved
                ? "success"
                : "active"
            }
          />

          <Title level={5} style={{ marginBottom: 0 }}>
            Detective skills practiced
          </Title>

          <Space direction="vertical" style={{ width: "100%" }}>
            {clues.map((clueItem, index) => (
              <Space key={index} wrap>
                <Tag
                  color={
                    caseComplete || index < currentClue
                      ? "green"
                      : index === currentClue
                      ? "blue"
                      : "default"
                  }
                >
                  {caseComplete || index < currentClue
                    ? "✓"
                    : `Clue ${index + 1}`}
                </Tag>

                {clueItem.skills.map((skill) => (
                  <Tag key={skill} color="purple">
                    {skill}
                  </Tag>
                ))}
              </Space>
            ))}
          </Space>
        </Space>
      </Card>

      {/* Investigation Complete */}

      {caseComplete ? (
        <Card
          style={{
            textAlign: "center",
            padding: "30px 20px",
          }}
        >
          <div style={{ fontSize: 60 }}>🎉</div>

          <Title level={2}>
            Investigation Complete!
          </Title>

          <Paragraph style={{ fontSize: 16 }}>
            Great work, Detective! 🕵️
          </Paragraph>

          <Paragraph type="secondary">
            You made it through the entire case and practiced
            some important SQL skills along the way.
            Every query makes you a better SQL detective!
          </Paragraph>

          <Divider />

          <Title level={4}>
            Detective skills practiced
          </Title>

          <Space wrap>
            <Tag color="blue">SELECT</Tag>
            <Tag color="green">WHERE</Tag>
            <Tag color="purple">COUNT()</Tag>
            <Tag color="orange">ORDER BY</Tag>
            <Tag color="cyan">GROUP BY</Tag>
            <Tag color="magenta">HAVING</Tag>
          </Space>
        </Card>
      ) : (
        <Row gutter={[24, 24]}>
          {/* Database */}

          <Col xs={24} lg={11}>
            <Card title="🗄️ Database">
              <Card
                type="inner"
                title={<Text code>students</Text>}
                style={{ marginBottom: 16 }}
              >
                <Table
                  columns={studentColumns}
                  dataSource={students}
                  pagination={false}
                  size="small"
                />
              </Card>

              <Card
                type="inner"
                title={<Text code>submissions</Text>}
              >
                <Table
                  columns={submissionColumns}
                  dataSource={submissions}
                  pagination={false}
                  size="small"
                />
              </Card>
            </Card>
          </Col>

          {/* Challenge */}

          <Col xs={24} lg={13}>
            <Card
              title={
                <Space wrap>
                  <Tag color="blue">
                    🔎 CLUE {currentClue + 1}
                  </Tag>

                  <Text type="secondary">
                    {currentClue + 1} / {clues.length}
                  </Text>

                  <Text type="secondary">
                    Skills practiced:
                  </Text>

                  {clue.skills.map((skill) => (
                    <Tag key={skill} color="purple">
                      {skill}
                    </Tag>
                  ))}
                </Space>
              }
            >
              <Title level={2}>
                {clue.question}
              </Title>

              <Alert
                message="Hint"
                description={clue.hint}
                type="info"
                showIcon
                style={{ marginBottom: 20 }}
              />

              <Text strong>Your SQL query</Text>

              <TextArea
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                placeholder="SELECT ..."
                autoSize={{ minRows: 7, maxRows: 14 }}
                spellCheck={false}
                style={{
                  marginTop: 8,
                  fontFamily: "monospace",
                }}
              />

              <Button
                type="primary"
                size="large"
                block
                style={{ marginTop: 16 }}
                onClick={runQuery}
              >
                ▶ Check Query
              </Button>

              {/* Incorrect Answer */}

              {submitted && !solved && (
                <Card
                  title="💡 Let's look at the answer"
                  style={{ marginTop: 20 }}
                >
                  <Alert
                    message="Not quite — and that's okay!"
                    description="Here's the correct way to solve this clue."
                    type="warning"
                    showIcon
                  />

                  <Divider />

                  <Text strong>Correct query:</Text>

                  <pre
                    style={{
                      padding: 16,
                      marginTop: 8,
                      background: "#f5f5f5",
                      borderRadius: 8,
                      overflowX: "auto",
                    }}
                  >
                    {clue.correctQuery.trim()}
                  </pre>

                  <Text strong>Why it works:</Text>

                  <Paragraph style={{ marginTop: 8 }}>
                    {clue.explanation}
                  </Paragraph>

                  <Button
                    type="primary"
                    block
                    size="large"
                    onClick={nextClue}
                  >
                    {isLastClue
                      ? "Got it → Finish Investigation"
                      : "Got it → Next Clue"}
                  </Button>
                </Card>
              )}

              {/* Correct Answer */}

              {submitted && solved && (
                <Card
                  style={{
                    marginTop: 20,
                    background: "#f6ffed",
                  }}
                >
                  <Alert
                    message="✓ Correct!"
                    description={clue.explanation}
                    type="success"
                    showIcon
                  />

                  <Divider />

                  <Text strong>Query result:</Text>

                  <div style={{ marginTop: 10 }}>
                    {clue.result.map((item, index) => (
                      <Tag
                        key={index}
                        color="green"
                        style={{ marginBottom: 8 }}
                      >
                        {item}
                      </Tag>
                    ))}
                  </div>

                  <Button
                    type="primary"
                    block
                    size="large"
                    style={{ marginTop: 16 }}
                    onClick={nextClue}
                  >
                    {isLastClue
                      ? "Finish Investigation →"
                      : "Next Clue →"}
                  </Button>
                </Card>
              )}
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default SQLDetective;

