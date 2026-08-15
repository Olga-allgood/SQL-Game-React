import { useState } from "react";
import {
  Button,
  Card,
  Progress,
  Table,
  Tag,
  Typography,
} from "antd";

const { Title, Text, Paragraph } = Typography;

/* =========================================================
   CHALLENGES
========================================================= */

const challenges = [
  {
    id: 1,

    title: "The At-Risk Course",

    scenario:
      "The program coordinator wants to identify whether any course has a particularly low average score. Use the student data to determine which course has the lowest average score.",

    skills: [
      "AVG()",
      "GROUP BY",
      "ORDER BY",
      "LIMIT",
    ],

    hint:
      "Calculate an average score for each course, then find the smallest average.",

    correctQuery: `
SELECT course, AVG(score)
FROM students
GROUP BY course
ORDER BY AVG(score) ASC
LIMIT 1;
`,

    resultColumns: ["course", "avg_score"],

    resultRows: [
      {
        course: "Python",
        avg_score: "79.0",
      },
    ],

    interpretation:
      "Python has the lowest average score in this dataset.",

    xp: 150,
  },

  {
    id: 2,

    title: "The Missing Work",

    scenario:
      "An instructor wants to identify students who have not submitted Homework 1. Use both tables to find the students who still need to submit the assignment.",

    skills: [
      "JOIN",
      "WHERE",
    ],

    hint:
      "Connect students to submissions using student_id, then filter for submissions marked No.",

    correctQuery: `
SELECT students.name
FROM students
JOIN submissions
  ON students.id = submissions.student_id
WHERE submissions.submitted = 'No';
`,

    resultColumns: ["name"],

    resultRows: [
      {
        name: "John",
      },
    ],

    interpretation:
      "John is the student who has not submitted Homework 1.",

    xp: 150,
  },

  {
    id: 3,

    title: "The Enrollment Leader",

    scenario:
      "The department is deciding where to allocate an additional teaching assistant. They want to assign the assistant to the course with the largest enrollment.",

    skills: [
      "COUNT()",
      "GROUP BY",
      "ORDER BY",
      "LIMIT",
    ],

    hint:
      "Count students in each course and identify the course with the largest count.",

    correctQuery: `
SELECT course, COUNT(*)
FROM students
GROUP BY course
ORDER BY COUNT(*) DESC
LIMIT 1;
`,

    resultColumns: ["course", "student_count"],

    resultRows: [
      {
        course: "SQL",
        student_count: 4,
      },
    ],

    interpretation:
      "SQL has the largest enrollment in this dataset.",

    xp: 175,
  },

  {
    id: 4,

    title: "The Participation Comparison",

    scenario:
      "The instructor wants to compare Homework 1 participation between courses. Determine how many students in each course submitted the assignment.",

    skills: [
      "JOIN",
      "WHERE",
      "GROUP BY",
      "COUNT()",
    ],

    hint:
      "Join students and submissions, keep submitted assignments, and group the results by course.",

    correctQuery: `
SELECT students.course, COUNT(*)
FROM students
JOIN submissions
  ON students.id = submissions.student_id
WHERE submissions.submitted = 'Yes'
GROUP BY students.course;
`,

    resultColumns: ["course", "submitted"],

    resultRows: [
      {
        course: "SQL",
        submitted: 3,
      },
      {
        course: "Python",
        submitted: 1,
      },
    ],

    interpretation:
      "SQL has more submitted Homework 1 records than Python in this dataset.",

    xp: 200,
  },

  {
    id: 5,

    title: "The Top Three",

    scenario:
      "The instructor wants to recognize the three highest-scoring students in the class. Find their names and scores.",

    skills: [
      "ORDER BY",
      "DESC",
      "LIMIT",
    ],

    hint:
      "Sort students by score from highest to lowest and return only three rows.",

    correctQuery: `
SELECT name, score
FROM students
ORDER BY score DESC
LIMIT 3;
`,

    resultColumns: ["name", "score"],

    resultRows: [
      {
        name: "Anna",
        score: 88,
      },
      {
        name: "Sarah",
        score: 87,
      },
      {
        name: "John",
        score: 87,
      },
    ],

    interpretation:
      "Anna, Sarah, and John have the three highest scores in this dataset.",

    xp: 150,
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
    score: 88,
  },
  {
    key: "2",
    id: 2,
    name: "Mike",
    age: 22,
    course: "SQL",
    score: 84,
  },
  {
    key: "3",
    id: 3,
    name: "Sarah",
    age: 17,
    course: "SQL",
    score: 87,
  },
  {
    key: "4",
    id: 4,
    name: "John",
    age: 25,
    course: "SQL",
    score: 87,
  },
  {
    key: "5",
    id: 5,
    name: "Lisa",
    age: 20,
    course: "Python",
    score: 79,
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
  {
    title: "score",
    dataIndex: "score",
    key: "score",
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
   NORMALIZE QUERY
========================================================= */

const normalizeQuery = (query) =>
  query
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\s*;\s*$/, "")
    .replace(/\s*,\s*/g, ",")
    .replace(/\s*=\s*/g, "=");

/* =========================================================
   COMPONENT
========================================================= */

export const SQLChallenge = () => {
  const [currentChallenge, setCurrentChallenge] =
    useState(0);

  const [query, setQuery] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const [correct, setCorrect] = useState(false);

  const [score, setScore] = useState(0);

  const [showHint, setShowHint] = useState(false);

  const challenge =
    challenges[currentChallenge];

  const maxScore = challenges.reduce(
    (total, item) => total + item.xp,
    0
  );

  const progress = Math.round(
    ((currentChallenge +
      (submitted ? 1 : 0)) /
      challenges.length) *
      100
  );

  /* =======================================================
     CHECK QUERY
  ======================================================= */

  const handleCheck = () => {
    if (submitted) return;

    const isCorrect =
      normalizeQuery(query) ===
      normalizeQuery(
        challenge.correctQuery
      );

    setSubmitted(true);
    setCorrect(isCorrect);

    if (isCorrect) {
      setScore(
        (previous) =>
          previous + challenge.xp
      );
    }
  };

  /* =======================================================
     NEXT
  ======================================================= */

  const handleNext = () => {
    if (
      currentChallenge >=
      challenges.length - 1
    ) {
      return;
    }

    setCurrentChallenge(
      (previous) => previous + 1
    );

    setQuery("");
    setSubmitted(false);
    setCorrect(false);
    setShowHint(false);
  };

  /* =======================================================
     RESET
  ======================================================= */

  const handleReset = () => {
    setQuery("");
    setSubmitted(false);
    setCorrect(false);
    setShowHint(false);
  };

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
        }}
      >
        <div>
          <Title
            level={2}
            style={{
              margin: 0,
            }}
          >
            SQL Challenge
          </Title>

          <Text type="secondary">
            Solve an unfamiliar data problem.
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

      {/* CHALLENGE */}

      <div
        style={{
          marginTop: 28,
          paddingTop: 24,
          borderTop:
            "1px solid #f0f0f0",
        }}
      >
        <Text type="secondary">
          Challenge {currentChallenge + 1} of{" "}
          {challenges.length}
        </Text>

        <Title
          level={4}
          style={{
            marginTop: 8,
          }}
        >
          {challenge.title}
        </Title>

        <Paragraph>
          {challenge.scenario}
        </Paragraph>

        {/* SKILLS */}

        <div
          style={{
            marginBottom: 18,
          }}
        >
          {challenge.skills.map(
            (skill) => (
              <Tag
                key={skill}
                style={{
                  marginBottom: 6,
                }}
              >
                {skill}
              </Tag>
            )
          )}
        </div>
      </div>

      {/* DATABASE */}

      <div
        style={{
          marginTop: 24,
        }}
      >
        <Text strong>
          Database
        </Text>

        <div
          style={{
            marginTop: 10,
          }}
        >
          <Text type="secondary">
            students
          </Text>

          <Table
            columns={studentColumns}
            dataSource={students}
            pagination={false}
            size="small"
            scroll={{
              x: true,
            }}
            style={{
              marginTop: 6,
            }}
          />
        </div>

        <div
          style={{
            marginTop: 18,
          }}
        >
          <Text type="secondary">
            submissions
          </Text>

          <Table
            columns={submissionColumns}
            dataSource={submissions}
            pagination={false}
            size="small"
            scroll={{
              x: true,
            }}
            style={{
              marginTop: 6,
            }}
          />
        </div>
      </div>

      {/* QUERY */}

      <div
        style={{
          marginTop: 28,
          paddingTop: 24,
          borderTop:
            "1px solid #f0f0f0",
        }}
      >
        <Text type="secondary">
          Your SQL query
        </Text>

        <textarea
          value={query}
          onChange={(event) =>
            setQuery(event.target.value)
          }
          disabled={submitted}
          placeholder="Start with SELECT ..."
          spellCheck={false}
          style={{
            width: "100%",
            minHeight: 150,
            marginTop: 8,
            padding: 12,
            resize: "vertical",
            boxSizing: "border-box",
            border:
              "1px solid #d9d9d9",
            borderRadius: 6,
            fontFamily: "monospace",
            fontSize: 14,
            lineHeight: 1.6,
          }}
        />

        {/* ACTIONS */}

        <div
          style={{
            marginTop: 12,
          }}
        >
          <Button
            type="primary"
            onClick={handleCheck}
            disabled={
              !query.trim() ||
              submitted
            }
          >
            Check Query
          </Button>

          <Button
            onClick={handleReset}
            style={{
              marginLeft: 8,
            }}
          >
            Reset
          </Button>

          {!submitted && (
            <Button
              type="link"
              onClick={() =>
                setShowHint(true)
              }
              style={{
                marginLeft: 4,
              }}
            >
              Show Hint
            </Button>
          )}
        </div>

        {/* HINT */}

        {showHint && !submitted && (
          <div
            style={{
              marginTop: 16,
              padding: 14,
              background:
                "#fafafa",
              borderRadius: 6,
            }}
          >
            <Text type="secondary">
              Hint
            </Text>

            <Paragraph
              style={{
                marginTop: 6,
                marginBottom: 0,
              }}
            >
              {challenge.hint}
            </Paragraph>
          </div>
        )}
      </div>

      {/* FEEDBACK */}

      {submitted && (
        <div
          style={{
            marginTop: 24,
            paddingTop: 20,
            borderTop:
              "1px solid #f0f0f0",
          }}
        >
          {correct ? (
            <>
              <Text
                strong
                type="success"
              >
                Correct · +
                {challenge.xp} XP
              </Text>

              <Paragraph
                style={{
                  marginTop: 8,
                }}
              >
                {challenge.interpretation}
              </Paragraph>

              {/* RESULT */}

              <Text type="secondary">
                Query result
              </Text>

              <Table
                columns={challenge.resultColumns.map(
                  (column) => ({
                    title: column,
                    dataIndex: column,
                    key: column,
                  })
                )}
                dataSource={challenge.resultRows.map(
                  (row, index) => ({
                    ...row,
                    key: index,
                  })
                )}
                pagination={false}
                size="small"
                style={{
                  marginTop: 8,
                }}
              />
            </>
          ) : (
            <>
              <Text
                strong
                type="danger"
              >
                Not quite
              </Text>

              <Paragraph
                type="secondary"
                style={{
                  marginTop: 8,
                }}
              >
                Your query does not solve
                the problem yet. Study
                the solution and think
                about which SQL operations
                are needed.
              </Paragraph>

              <div
                style={{
                  marginTop: 12,
                  padding: 16,
                  background:
                    "#fafafa",
                  border:
                    "1px solid #f0f0f0",
                  borderRadius: 6,
                  overflowX: "auto",
                }}
              >
                <Text
                  code
                  style={{
                    whiteSpace:
                      "pre-wrap",
                  }}
                >
                  {challenge.correctQuery.trim()}
                </Text>
              </div>

              <Paragraph
                style={{
                  marginTop: 16,
                }}
              >
                <Text type="secondary">
                  Why it works
                </Text>
              </Paragraph>

              <Paragraph>
                {challenge.interpretation}
              </Paragraph>
            </>
          )}

          {/* NEXT */}

          {currentChallenge <
          challenges.length - 1 ? (
            <Button
              type="primary"
              onClick={handleNext}
              style={{
                marginTop: 8,
              }}
            >
              Next Challenge
            </Button>
          ) : (
            <div
              style={{
                marginTop: 16,
              }}
            >
              <Text strong>
                SQL Challenges complete ·{" "}
                {score} / {maxScore} XP
              </Text>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default SQLChallenge;