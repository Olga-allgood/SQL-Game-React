import { useState } from "react";
import {
  Button,
  Card,
  Progress,
  Radio,
  Space,
  Tag,
  Typography,
} from "antd";

const { Title, Text, Paragraph } = Typography;

/* =========================================================
   CASE FILES
========================================================= */

const cases = [
  {
    id: 1,
    title: "The Missing Homework",
    scenario:
      "The instructor notices that several students may not have submitted Homework 1. She wants to identify exactly which students did not submit it.",

    question:
      "What query would best answer the instructor's question?",

    skills: ["WHERE", "Filtering"],

    options: [
      {
        id: "a",
        label:
          "Count the total number of students.",
        queryType:
          "SELECT COUNT(*) FROM students;",
      },
      {
        id: "b",
        label:
          "Find students where submitted = 'No'.",
        queryType:
          "SELECT * FROM submissions WHERE submitted = 'No';",
      },
      {
        id: "c",
        label:
          "Calculate the average student score.",
        queryType:
          "SELECT AVG(score) FROM students;",
      },
      {
        id: "d",
        label:
          "Sort students by their age.",
        queryType:
          "SELECT * FROM students ORDER BY age;",
      },
    ],

    correctAnswer: "b",

    explanation:
      "The instructor wants to identify specific students who did not submit the assignment. WHERE is used to filter rows that match a condition.",

    xp: 50,
  },

  {
    id: 2,
    title: "The Largest Class",
    scenario:
      "The program coordinator wants to know which course currently has the largest enrollment.",

    question:
      "Which analysis would best answer this question?",

    skills: ["GROUP BY", "COUNT()", "ORDER BY"],

    options: [
      {
        id: "a",
        label:
          "Calculate the average age of all students.",
        queryType:
          "SELECT AVG(age) FROM students;",
      },
      {
        id: "b",
        label:
          "Count students in each course and compare the counts.",
        queryType:
          "SELECT course, COUNT(*) FROM students GROUP BY course;",
      },
      {
        id: "c",
        label:
          "Find the oldest student.",
        queryType:
          "SELECT MAX(age) FROM students;",
      },
      {
        id: "d",
        label:
          "Find students whose age is greater than 20.",
        queryType:
          "SELECT * FROM students WHERE age > 20;",
      },
    ],

    correctAnswer: "b",

    explanation:
      "Because the question asks which course has the largest enrollment, we need to group students by course and count the students in each group.",

    xp: 75,
  },

  {
    id: 3,
    title: "The High-Performing Course",
    scenario:
      "The department chair wants to compare academic performance between courses.",

    question:
      "Which analysis should you choose?",

    skills: ["AVG()", "GROUP BY"],

    options: [
      {
        id: "a",
        label:
          "Find the highest individual score.",
        queryType:
          "SELECT MAX(score) FROM students;",
      },
      {
        id: "b",
        label:
          "Calculate the average score for each course.",
        queryType:
          "SELECT course, AVG(score) FROM students GROUP BY course;",
      },
      {
        id: "c",
        label:
          "Count all students.",
        queryType:
          "SELECT COUNT(*) FROM students;",
      },
      {
        id: "d",
        label:
          "Find students who scored above 80.",
        queryType:
          "SELECT * FROM students WHERE score > 80;",
      },
    ],

    correctAnswer: "b",

    explanation:
      "The question asks us to compare courses, so we need one average for each course. GROUP BY creates the course groups and AVG() calculates the average within each group.",

    xp: 75,
  },

  {
    id: 4,
    title: "The Top Students",
    scenario:
      "The instructor wants to identify the five students with the highest scores.",

    question:
      "Which approach would answer this question?",

    skills: ["ORDER BY", "DESC", "LIMIT"],

    options: [
      {
        id: "a",
        label:
          "Sort scores from highest to lowest and return five rows.",
        queryType:
          "ORDER BY score DESC LIMIT 5",
      },
      {
        id: "b",
        label:
          "Calculate the average score.",
        queryType:
          "AVG(score)",
      },
      {
        id: "c",
        label:
          "Group students by course.",
        queryType:
          "GROUP BY course",
      },
      {
        id: "d",
        label:
          "Find students older than 20.",
        queryType:
          "WHERE age > 20",
      },
    ],

    correctAnswer: "a",

    explanation:
      "To find the five highest scores, sort the results in descending order and then limit the results to five rows.",

    xp: 75,
  },

  {
    id: 5,
    title: "The Participation Problem",
    scenario:
      "An instructor suspects that students in one course may be submitting fewer assignments. She wants to compare the number of submitted assignments between courses.",

    question:
      "Which analysis would provide the most useful evidence?",

    skills: ["JOIN", "GROUP BY", "COUNT()"],

    options: [
      {
        id: "a",
        label:
          "Find the average age of students.",
        queryType:
          "AVG(age)",
      },
      {
        id: "b",
        label:
          "Count submitted assignments for each course.",
        queryType:
          "GROUP BY course + COUNT(*)",
      },
      {
        id: "c",
        label:
          "Find the oldest student.",
        queryType:
          "MAX(age)",
      },
      {
        id: "d",
        label:
          "Find all students older than 20.",
        queryType:
          "WHERE age > 20",
      },
    ],

    correctAnswer: "b",

    explanation:
      "The question is about participation by course. We need to connect students with submissions, group the records by course, and count submitted assignments.",

    xp: 100,
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export const SQLCaseFile = () => {
  const [currentCase, setCurrentCase] = useState(0);
  const [selected, setSelected] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [score, setScore] = useState(0);

  const caseFile = cases[currentCase];

  const maxScore = cases.reduce(
    (total, item) => total + item.xp,
    0
  );

  const progress = Math.round(
    ((currentCase + (submitted ? 1 : 0)) /
      cases.length) *
      100
  );

  const handleCheck = () => {
    if (!selected || submitted) return;

    const isCorrect = selected === caseFile.correctAnswer;

    setSubmitted(true);
    setCorrect(isCorrect);

    if (isCorrect) {
      setScore((previous) => previous + caseFile.xp);
    }
  };

  const handleNext = () => {
    if (currentCase >= cases.length - 1) return;

    setCurrentCase((previous) => previous + 1);
    setSelected("");
    setSubmitted(false);
    setCorrect(false);
  };

  return (
    <Card
      style={{
        maxWidth: 800,
        margin: "0 auto",
      }}
      styles={{
        body: {
          padding: 24,
        },
      }}
    >
      {/* HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <Title
            level={2}
            style={{ margin: 0 }}
          >
            SQL Case File
          </Title>

          <Text type="secondary">
            Decide what query you need.
          </Text>
        </div>

        <Text strong>
          {score} / {maxScore} XP
        </Text>
      </div>

      {/* PROGRESS */}

      <Progress
        percent={progress}
        showInfo={false}
        size="small"
        style={{
          marginTop: 16,
        }}
      />

      {/* CASE */}

      <div
        style={{
          marginTop: 28,
          paddingTop: 24,
          borderTop: "1px solid #f0f0f0",
        }}
      >
        <Space size="middle">
          <Text type="secondary">
            Case {currentCase + 1} of {cases.length}
          </Text>

          <Tag>
            +{caseFile.xp} XP
          </Tag>
        </Space>

        <Title
          level={4}
          style={{
            marginTop: 8,
            marginBottom: 12,
          }}
        >
          {caseFile.title}
        </Title>

        <Paragraph>
          {caseFile.scenario}
        </Paragraph>

        <Paragraph strong>
          {caseFile.question}
        </Paragraph>

        {/* SKILLS */}

        <Space
          wrap
          size={[6, 6]}
          style={{
            marginBottom: 18,
          }}
        >
          {caseFile.skills.map((skill) => (
            <Tag key={skill}>
              {skill}
            </Tag>
          ))}
        </Space>

        {/* OPTIONS */}

        <Radio.Group
          value={selected}
          onChange={(event) =>
            setSelected(event.target.value)
          }
          disabled={submitted}
          style={{
            width: "100%",
          }}
        >
          <Space
            direction="vertical"
            size="middle"
            style={{
              width: "100%",
            }}
          >
            {caseFile.options.map((option) => (
              <Radio
                key={option.id}
                value={option.id}
              >
                {option.label}
              </Radio>
            ))}
          </Space>
        </Radio.Group>

        {/* CHECK */}

        <Button
          type="primary"
          onClick={handleCheck}
          disabled={!selected || submitted}
          style={{
            marginTop: 20,
          }}
        >
          Check Decision
        </Button>
      </div>

      {/* FEEDBACK */}

      {submitted && (
        <div
          style={{
            marginTop: 24,
            paddingTop: 20,
            borderTop: "1px solid #f0f0f0",
          }}
        >
          <Text
            strong
            type={correct ? "success" : "danger"}
          >
            {correct
              ? `Correct · +${caseFile.xp} XP`
              : "Not quite"}
          </Text>

          <Paragraph
            style={{
              marginTop: 8,
            }}
          >
            {caseFile.explanation}
          </Paragraph>

          {!correct && (
            <Paragraph>
              <Text strong>
                Best approach:
              </Text>{" "}
              {
                caseFile.options.find(
                  (option) =>
                    option.id === caseFile.correctAnswer
                )?.label
              }
            </Paragraph>
          )}

          {currentCase < cases.length - 1 ? (
            <Button
              type="primary"
              onClick={handleNext}
            >
              Next Case
            </Button>
          ) : (
            <Text strong>
              Case files complete · {score} /{" "}
              {maxScore} XP
            </Text>
          )}
        </div>
      )}
    </Card>
  );
};

export default SQLCaseFile;