import { useState } from "react";
import {
  Button,
  Card,
  Col,
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

/* =========================================================
   TYPES
========================================================= */

interface Clue {
  question: string;
  hint: string;
  skills: string[];
  correctQuery: string;
  result: string[];
  explanation: string;
  xp: number;
}

/* =========================================================
   CLUES
========================================================= */

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
      "WHERE filters rows based on a condition. Here, submitted = 'No' keeps only the student who did not submit the homework.",
    xp: 10,
  },

  {
    question: "Which students have submitted Homework 1?",
    hint: "Look for rows where submitted is 'Yes'.",
    skills: ["SELECT", "WHERE"],
    correctQuery: `
SELECT *
FROM submissions
WHERE submitted = 'Yes';
`,
    result: ["Anna", "Mike", "Sarah", "Lisa"],
    explanation:
      "WHERE filters the submissions table so that only students with submitted = 'Yes' are returned.",
    xp: 10,
  },

  {
    question: "How many students have submitted Homework 1?",
    hint: "Filter the submitted rows, then count them.",
    skills: ["SELECT", "WHERE", "COUNT()"],
    correctQuery: `
SELECT COUNT(*)
FROM submissions
WHERE submitted = 'Yes';
`,
    result: ["4"],
    explanation:
      "WHERE selects only submitted homework, and COUNT(*) counts the rows that remain.",
    xp: 10,
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
      "Lisa — 20",
      "Mike — 22",
      "John — 25",
    ],
    explanation:
      "ORDER BY sorts the results. ASC means ascending, so the youngest students appear first.",
    xp: 10,
  },

  {
    question: "Show the students from oldest to youngest.",
    hint: "ORDER BY can sort in descending order.",
    skills: ["SELECT", "ORDER BY", "DESC"],
    correctQuery: `
SELECT name, age
FROM students
ORDER BY age DESC;
`,
    result: [
      "John — 25",
      "Mike — 22",
      "Lisa — 20",
      "Anna — 19",
      "Sarah — 17",
    ],
    explanation:
      "DESC sorts values from largest to smallest, so the oldest student appears first.",
    xp: 10,
  },

  {
    question: "Which students are older than 20?",
    hint: "Use a comparison operator with age.",
    skills: ["SELECT", "WHERE", ">"],
    correctQuery: `
SELECT name, age
FROM students
WHERE age > 20;
`,
    result: [
      "Mike — 22",
      "John — 25",
    ],
    explanation:
      "The > operator keeps only rows where age is greater than 20.",
    xp: 10,
  },

  {
    question: "Which students are 20 or younger?",
    hint: "Use <= with the age column.",
    skills: ["SELECT", "WHERE", "<="],
    correctQuery: `
SELECT name, age
FROM students
WHERE age <= 20;
`,
    result: [
      "Sarah — 17",
      "Anna — 19",
      "Lisa — 20",
    ],
    explanation:
      "The <= operator includes values that are equal to 20 as well as values below 20.",
    xp: 10,
  },

  {
    question: "How many students are older than 20?",
    hint: "Filter the students first, then count them.",
    skills: ["SELECT", "WHERE", "COUNT()"],
    correctQuery: `
SELECT COUNT(*)
FROM students
WHERE age > 20;
`,
    result: ["2"],
    explanation:
      "WHERE filters the students to those older than 20, and COUNT(*) counts those rows.",
    xp: 10,
  },

  {
    question: "What is the average age of the students?",
    hint: "Use the AVG function.",
    skills: ["SELECT", "AVG()"],
    correctQuery: `
SELECT AVG(age)
FROM students;
`,
    result: ["20.6"],
    explanation:
      "AVG(age) calculates the arithmetic mean of all values in the age column.",
    xp: 10,
  },

  {
    question: "What is the youngest age in the class?",
    hint: "Use MIN with the age column.",
    skills: ["SELECT", "MIN()"],
    correctQuery: `
SELECT MIN(age)
FROM students;
`,
    result: ["17"],
    explanation:
      "MIN(age) returns the smallest value in the age column.",
    xp: 10,
  },

  {
    question: "What is the oldest age in the class?",
    hint: "Use MAX with the age column.",
    skills: ["SELECT", "MAX()"],
    correctQuery: `
SELECT MAX(age)
FROM students;
`,
    result: ["25"],
    explanation:
      "MAX(age) returns the largest value in the age column.",
    xp: 10,
  },

  {
    question: "How many students are enrolled in each course?",
    hint: "Group students by course and count each group.",
    skills: ["SELECT", "GROUP BY", "COUNT()"],
    correctQuery: `
SELECT course, COUNT(*)
FROM students
GROUP BY course;
`,
    result: [
      "Python — 1",
      "SQL — 4",
    ],
    explanation:
      "GROUP BY creates one group for each course. COUNT(*) then counts the students in each group.",
    xp: 15,
  },

  {
    question: "Which courses have more than 2 students?",
    hint: "Use GROUP BY first, then HAVING to filter the groups.",
    skills: ["SELECT", "GROUP BY", "HAVING", "COUNT()"],
    correctQuery: `
SELECT course, COUNT(*)
FROM students
GROUP BY course
HAVING COUNT(*) > 2;
`,
    result: ["SQL — 4"],
    explanation:
      "HAVING filters groups after GROUP BY has created them. Here we keep only courses with more than two students.",
    xp: 15,
  },

  {
    question: "Show the three oldest students.",
    hint: "Sort by age from highest to lowest and limit the results.",
    skills: ["SELECT", "ORDER BY", "LIMIT"],
    correctQuery: `
SELECT name, age
FROM students
ORDER BY age DESC
LIMIT 3;
`,
    result: [
      "John — 25",
      "Mike — 22",
      "Lisa — 20",
    ],
    explanation:
      "ORDER BY DESC puts the oldest students first, and LIMIT 3 keeps only the first three rows.",
    xp: 15,
  },

  {
    question: "Show the two youngest students.",
    hint: "Sort age in ascending order and limit the results.",
    skills: ["SELECT", "ORDER BY", "LIMIT"],
    correctQuery: `
SELECT name, age
FROM students
ORDER BY age ASC
LIMIT 2;
`,
    result: [
      "Sarah — 17",
      "Anna — 19",
    ],
    explanation:
      "Sorting by age ASC puts the youngest students first. LIMIT 2 returns only the first two rows.",
    xp: 15,
  },

  {
    question: "Which students are enrolled in SQL?",
    hint: "Filter the course column.",
    skills: ["SELECT", "WHERE"],
    correctQuery: `
SELECT name
FROM students
WHERE course = 'SQL';
`,
    result: [
      "Anna",
      "Mike",
      "Sarah",
      "John",
    ],
    explanation:
      "WHERE course = 'SQL' keeps only students enrolled in the SQL course.",
    xp: 10,
  },

  {
    question: "How many students are enrolled in SQL?",
    hint: "Filter the SQL students and count them.",
    skills: ["SELECT", "WHERE", "COUNT()"],
    correctQuery: `
SELECT COUNT(*)
FROM students
WHERE course = 'SQL';
`,
    result: ["4"],
    explanation:
      "WHERE selects students in the SQL course, and COUNT(*) tells us how many there are.",
    xp: 10,
  },

  {
    question: "Show the students whose age is between 18 and 22.",
    hint: "BETWEEN checks whether a value falls within a range.",
    skills: ["SELECT", "WHERE", "BETWEEN"],
    correctQuery: `
SELECT name, age
FROM students
WHERE age BETWEEN 18 AND 22;
`,
    result: [
      "Anna — 19",
      "Lisa — 20",
      "Mike — 22",
    ],
    explanation:
      "BETWEEN checks whether a value falls within an inclusive range. Here, ages 18 through 22 are included.",
    xp: 15,
  },

  {
    question: "Show the students who are either 17 or 25 years old.",
    hint: "Use OR when either condition can be true.",
    skills: ["SELECT", "WHERE", "OR"],
    correctQuery: `
SELECT name, age
FROM students
WHERE age = 17 OR age = 25;
`,
    result: [
      "Sarah — 17",
      "John — 25",
    ],
    explanation:
      "OR allows either condition to be true. The query returns students whose age is 17 or 25.",
    xp: 15,
  },

  {
    question: "Which students have not submitted Homework 1?",
    hint: "Connect the students and submissions tables using student_id.",
    skills: ["SELECT", "LEFT JOIN", "WHERE"],
    correctQuery: `
SELECT students.name
FROM students
LEFT JOIN submissions
  ON students.id = submissions.student_id
WHERE submissions.submitted = 'No';
`,
    result: ["John"],
    explanation:
      "LEFT JOIN connects students to their submissions using the student ID. WHERE then identifies the student whose submission is marked 'No'.",
    xp: 20,
  },
];

/* =========================================================
   DATABASE
========================================================= */

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
  {
    key: "5",
    id: 5,
    name: "Lisa",
    age: 20,
    course: "Python",
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
    student_id: 3,
    assignment: "Homework 1",
    submitted: "Yes",
  },
  {
    key: "4",
    student_id: 4,
    assignment: "Homework 1",
    submitted: "No",
  },
  {
    key: "5",
    student_id: 5,
    assignment: "Homework 1",
    submitted: "Yes",
  },
];

/* =========================================================
   TABLE COLUMNS
========================================================= */

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

/* =========================================================
   QUERY NORMALIZATION
========================================================= */

const normalizeQuery = (query: string) =>
  query
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/;$/, "");

/* =========================================================
   COMPONENT
========================================================= */

const SQLDetective = () => {
  const [currentClue, setCurrentClue] = useState(0);
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [solved, setSolved] = useState(false);
  const [caseComplete, setCaseComplete] = useState(false);
  const [score, setScore] = useState(0);

  const clue = clues[currentClue];

  /* -------------------------------------------------------
     CHECK QUERY
  ------------------------------------------------------- */

  const runQuery = () => {
    if (submitted) return;

    const userQuery = normalizeQuery(query);
    const correctQuery = normalizeQuery(clue.correctQuery);

    const isCorrect = userQuery === correctQuery;

    setSubmitted(true);
    setSolved(isCorrect);

    if (isCorrect) {
      setScore((previous) => previous + clue.xp);
    }
  };

  /* -------------------------------------------------------
     NEXT CLUE
  ------------------------------------------------------- */

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

  /* -------------------------------------------------------
     PROGRESS
  ------------------------------------------------------- */

  const progressPercent = caseComplete
    ? 100
    : Math.round(
        ((currentClue + (submitted ? 1 : 0)) /
          clues.length) *
          100
      );

  const maxScore = clues.reduce(
    (total, clueItem) => total + clueItem.xp,
    0
  );

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <Card
      style={{
        maxWidth: 1000,
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
          gap: 16,
        }}
      >
        <div>
          <Title
            level={2}
            style={{
              margin: 0,
            }}
          >
            SQL Detective
          </Title>

          <Text type="secondary">
            The Mystery of the Missing Homework
          </Text>
        </div>

        <Space size="large">
          <Text type="secondary">
            Clue {currentClue + 1} of {clues.length}
          </Text>

          <Text strong>
            {score} XP
          </Text>
        </Space>
      </div>

      {/* PROGRESS */}

      <Progress
        percent={progressPercent}
        showInfo={false}
        size="small"
        style={{
          marginTop: 16,
        }}
      />

      {/* =================================================
          COMPLETION SCREEN
      ================================================= */}

      {caseComplete ? (
        <div
          style={{
            textAlign: "center",
            padding: "56px 20px 32px",
          }}
        >
          <Title level={3}>
            Investigation complete
          </Title>

          <Paragraph type="secondary">
            You solved all {clues.length} SQL clues.
          </Paragraph>

          <Title
            level={2}
            style={{
              marginTop: 24,
            }}
          >
            {score} / {maxScore} XP
          </Title>

          <Paragraph type="secondary">
            {score === maxScore
              ? "Excellent work. You solved every clue."
              : score >= maxScore * 0.7
              ? "Great work. You demonstrated strong SQL skills."
              : "Good start. Review the clues and keep practicing."}
          </Paragraph>

          <Space
            wrap
            size={[6, 6]}
            style={{
              marginTop: 16,
            }}
          >
            {[
              "SELECT",
              "WHERE",
              "COUNT()",
              "ORDER BY",
              "GROUP BY",
              "HAVING",
              "JOIN",
            ].map((skill) => (
              <Tag key={skill}>
                {skill}
              </Tag>
            ))}
          </Space>
        </div>
      ) : (
        <>
          {/* =================================================
              DATABASE
          ================================================= */}

          <div
            style={{
              marginTop: 28,
            }}
          >
            <Text strong>
              Database
            </Text>

            <Row
              gutter={[16, 16]}
              style={{
                marginTop: 10,
              }}
            >
              <Col xs={24} md={12}>
                <Text type="secondary">
                  students
                </Text>

                <Table
                  columns={studentColumns}
                  dataSource={students}
                  pagination={false}
                  size="small"
                  style={{
                    marginTop: 6,
                  }}
                />
              </Col>

              <Col xs={24} md={12}>
                <Text type="secondary">
                  submissions
                </Text>

                <Table
                  columns={submissionColumns}
                  dataSource={submissions}
                  pagination={false}
                  size="small"
                  style={{
                    marginTop: 6,
                  }}
                />
              </Col>
            </Row>
          </div>

          {/* =================================================
              CLUE
          ================================================= */}

          <div
            style={{
              marginTop: 32,
              paddingTop: 24,
              borderTop: "1px solid #f0f0f0",
            }}
          >
            <Text type="secondary">
              Clue {currentClue + 1}
            </Text>

            <Title
              level={4}
              style={{
                marginTop: 6,
                marginBottom: 10,
              }}
            >
              {clue.question}
            </Title>

            {/* SKILLS */}

            <Space
              wrap
              size={[6, 6]}
              style={{
                marginBottom: 12,
              }}
            >
              {clue.skills.map((skill) => (
                <Tag key={skill}>
                  {skill}
                </Tag>
              ))}
            </Space>

            {/* HINT */}

            <div>
              <Text type="secondary">
                Hint: {clue.hint}
              </Text>
            </div>

            {/* QUERY */}

            <div
              style={{
                marginTop: 20,
              }}
            >
              <Text type="secondary">
                Your SQL query
              </Text>

              <TextArea
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                placeholder="SELECT ..."
                autoSize={{
                  minRows: 5,
                  maxRows: 10,
                }}
                spellCheck={false}
                disabled={submitted}
                style={{
                  marginTop: 8,
                  fontFamily: "monospace",
                }}
              />
            </div>

            {/* CHECK */}

            <Button
              type="primary"
              onClick={runQuery}
              disabled={!query.trim() || submitted}
              style={{
                marginTop: 16,
              }}
            >
              Check Query
            </Button>
          </div>

          {/* =================================================
              FEEDBACK
          ================================================= */}

          {submitted && (
            <div
              style={{
                marginTop: 24,
                paddingTop: 20,
                borderTop: "1px solid #f0f0f0",
              }}
            >
              {solved ? (
                <>
                  <Text
                    strong
                    type="success"
                  >
                    Correct · +{clue.xp} XP
                  </Text>

                  <Paragraph
                    style={{
                      marginTop: 8,
                    }}
                  >
                    {clue.explanation}
                  </Paragraph>

                  <Text type="secondary">
                    Query result
                  </Text>

                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    {clue.result.map(
                      (item, index) => (
                        <div key={index}>
                          <Text code>
                            {item}
                          </Text>
                        </div>
                      )
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Text strong>
                    Not quite
                  </Text>

                  <Paragraph
                    type="secondary"
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Compare your query with the
                    solution and review what each
                    clause is doing.
                  </Paragraph>

                  {/* ANSWER */}

                  <div
                    style={{
                      marginTop: 12,
                      padding: 16,
                      background: "#fafafa",
                      borderRadius: 6,
                      border:
                        "1px solid #f0f0f0",
                      overflowX: "auto",
                    }}
                  >
                    <Text
                      code
                      style={{
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {clue.correctQuery.trim()}
                    </Text>
                  </div>

                  {/* EXPLANATION */}

                  <div
                    style={{
                      marginTop: 16,
                    }}
                  >
                    <Text type="secondary">
                      Why it works
                    </Text>

                    <Paragraph
                      style={{
                        marginTop: 6,
                      }}
                    >
                      {clue.explanation}
                    </Paragraph>
                  </div>
                </>
              )}

              {/* NEXT */}

              <Button
                type="primary"
                onClick={nextClue}
                style={{
                  marginTop: 8,
                }}
              >
                {currentClue ===
                clues.length - 1
                  ? "Finish Investigation"
                  : "Next Clue"}
              </Button>
            </div>
          )}
        </>
      )}
    </Card>
  );
};

export default SQLDetective;