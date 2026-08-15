import { useState } from "react";
import {
  Button,
  Card,
  Progress,
  Radio,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";

const { Title, Text, Paragraph } = Typography;

/* =========================================================
   INVESTIGATIONS
========================================================= */

const investigations = [
  {
    id: 1,
    question: "Which course has the most students?",
    queryHint:
      "Group students by course and count each group.",
    skills: ["COUNT()", "GROUP BY"],
    correctQuery: `
SELECT course, COUNT(*)
FROM students
GROUP BY course
ORDER BY COUNT(*) DESC
LIMIT 1;
`,
    resultColumns: ["course", "count"],
    resultRows: [
      {
        course: "SQL",
        count: 4,
      },
    ],
    interpretationQuestion:
      "What does this result tell you?",
    interpretationOptions: [
      "SQL has the most students enrolled.",
      "SQL students have the highest scores.",
      "SQL is the most difficult course.",
      "Every SQL student completed the course.",
    ],
    correctInterpretation:
      "SQL has the most students enrolled.",
    interpretationExplanation:
      "The query counts students in each course and sorts the counts from highest to lowest. It does not tell us anything about student performance.",
    xp: 100,
  },

  {
    id: 2,
    question:
      "Which course has the highest average score?",
    queryHint:
      "Calculate the average score for each course, then sort the averages.",
    skills: ["AVG()", "GROUP BY", "ORDER BY"],
    correctQuery: `
SELECT course, AVG(score)
FROM students
GROUP BY course
ORDER BY AVG(score) DESC
LIMIT 1;
`,
    resultColumns: ["course", "avg_score"],
    resultRows: [
      {
        course: "SQL",
        avg_score: "86.5",
      },
    ],
    interpretationQuestion:
      "What can you conclude from this result?",
    interpretationOptions: [
      "SQL has the highest average student score.",
      "Every SQL student scored 86.5.",
      "SQL has the most students.",
      "The highest individual score is 86.5.",
    ],
    correctInterpretation:
      "SQL has the highest average student score.",
    interpretationExplanation:
      "AVG(score) gives the mean score for each course. The result identifies SQL as the course with the highest average. It does not mean every SQL student scored 86.5.",
    xp: 100,
  },

  {
    id: 3,
    question:
      "Which students have not submitted Homework 1?",
    queryHint:
      "Connect students to submissions and filter for a submission marked No.",
    skills: ["LEFT JOIN", "WHERE"],
    correctQuery: `
SELECT students.name
FROM students
LEFT JOIN submissions
  ON students.id = submissions.student_id
WHERE submissions.submitted = 'No';
`,
    resultColumns: ["name"],
    resultRows: [
      {
        name: "John",
      },
    ],
    interpretationQuestion:
      "Which statement is supported by the result?",
    interpretationOptions: [
      "John did not submit Homework 1.",
      "John has never submitted homework.",
      "John has the lowest grade.",
      "John is enrolled in Python.",
    ],
    correctInterpretation:
      "John did not submit Homework 1.",
    interpretationExplanation:
      "The query specifically checks the Homework 1 submission status. It does not provide evidence about John's other assignments, grades, or course.",
    xp: 125,
  },

  {
    id: 4,
    question:
      "Which three students are the oldest?",
    queryHint:
      "Sort students by age from highest to lowest and keep three rows.",
    skills: ["ORDER BY", "DESC", "LIMIT"],
    correctQuery: `
SELECT name, age
FROM students
ORDER BY age DESC
LIMIT 3;
`,
    resultColumns: ["name", "age"],
    resultRows: [
      {
        name: "John",
        age: 25,
      },
      {
        name: "Mike",
        age: 22,
      },
      {
        name: "Lisa",
        age: 20,
      },
    ],
    interpretationQuestion:
      "What does this result tell you?",
    interpretationOptions: [
      "John, Mike, and Lisa are the three oldest students.",
      "John, Mike, and Lisa have the highest grades.",
      "There are only three students in the class.",
      "John is three years older than Mike.",
    ],
    correctInterpretation:
      "John, Mike, and Lisa are the three oldest students.",
    interpretationExplanation:
      "ORDER BY age DESC places the oldest students first, and LIMIT 3 selects the first three rows. The result says nothing about grades.",
    xp: 100,
  },

  {
    id: 5,
    question:
      "How many students are older than 20?",
    queryHint:
      "Filter students whose age is greater than 20, then count them.",
    skills: ["WHERE", ">", "COUNT()"],
    correctQuery: `
SELECT COUNT(*)
FROM students
WHERE age > 20;
`,
    resultColumns: ["count"],
    resultRows: [
      {
        count: 2,
      },
    ],
    interpretationQuestion:
      "Which conclusion is supported by the result?",
    interpretationOptions: [
      "There are 2 students older than 20.",
      "The average age is 20.",
      "There are 2 students exactly 20 years old.",
      "The oldest student is 20.",
    ],
    correctInterpretation:
      "There are 2 students older than 20.",
    interpretationExplanation:
      "WHERE age > 20 keeps only students older than 20, and COUNT(*) counts those rows. The result does not tell us the average or maximum age.",
    xp: 100,
  },

  {
    id: 6,
    question:
      "Which courses have more than 2 students?",
    queryHint:
      "Group students by course, count each group, then filter the groups.",
    skills: ["GROUP BY", "COUNT()", "HAVING"],
    correctQuery: `
SELECT course, COUNT(*)
FROM students
GROUP BY course
HAVING COUNT(*) > 2;
`,
    resultColumns: ["course", "count"],
    resultRows: [
      {
        course: "SQL",
        count: 4,
      },
    ],
    interpretationQuestion:
      "What can you conclude from this result?",
    interpretationOptions: [
      "SQL is the only course with more than 2 students.",
      "SQL has the highest average score.",
      "SQL students are more successful than Python students.",
      "There are exactly 2 Python students.",
    ],
    correctInterpretation:
      "SQL is the only course with more than 2 students.",
    interpretationExplanation:
      "HAVING COUNT(*) > 2 filters the grouped results. Only SQL meets that condition. The query does not compare academic performance.",
    xp: 125,
  },

  {
    id: 7,
    question:
      "Which students are between 18 and 22 years old?",
    queryHint:
      "Use BETWEEN to filter an inclusive age range.",
    skills: ["WHERE", "BETWEEN"],
    correctQuery: `
SELECT name, age
FROM students
WHERE age BETWEEN 18 AND 22;
`,
    resultColumns: ["name", "age"],
    resultRows: [
      {
        name: "Anna",
        age: 19,
      },
      {
        name: "Lisa",
        age: 20,
      },
      {
        name: "Mike",
        age: 22,
      },
    ],
    interpretationQuestion:
      "What does the result show?",
    interpretationOptions: [
      "Anna, Lisa, and Mike are between 18 and 22 years old.",
      "Anna, Lisa, and Mike are the three youngest students.",
      "These students have the highest scores.",
      "There are exactly three students in the database.",
    ],
    correctInterpretation:
      "Anna, Lisa, and Mike are between 18 and 22 years old.",
    interpretationExplanation:
      "BETWEEN includes both endpoints, so ages 18 through 22 are included. The result is about age, not performance or total enrollment.",
    xp: 100,
  },

  {
    id: 8,
    question:
      "Which course should the instructor investigate for low participation?",
    queryHint:
      "Count submitted Homework 1 records for each course. Then compare the results.",
    skills: ["JOIN", "GROUP BY", "COUNT()"],
    correctQuery: `
SELECT students.course, COUNT(*)
FROM students
JOIN submissions
  ON students.id = submissions.student_id
WHERE submissions.submitted = 'Yes'
GROUP BY students.course
ORDER BY COUNT(*) ASC
LIMIT 1;
`,
    resultColumns: ["course", "submitted"],
    resultRows: [
      {
        course: "Python",
        submitted: 1,
      },
    ],
    interpretationQuestion:
      "What is the most appropriate conclusion?",
    interpretationOptions: [
      "Python has fewer submitted Homework 1 records in this dataset.",
      "Python students are less capable.",
      "Python is a harder course.",
      "Python students always have lower grades.",
    ],
    correctInterpretation:
      "Python has fewer submitted Homework 1 records in this dataset.",
    interpretationExplanation:
      "The result provides evidence about Homework 1 submissions in this dataset. It does not establish why participation is lower or whether Python students perform worse academically.",
    xp: 175,
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
   QUERY NORMALIZATION
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

export const SQLInvestigator = () => {
  const [currentInvestigation, setCurrentInvestigation] =
    useState(0);

  const [query, setQuery] = useState("");

  const [querySubmitted, setQuerySubmitted] =
    useState(false);

  const [queryCorrect, setQueryCorrect] =
    useState(false);

  const [selectedInterpretation, setSelectedInterpretation] =
    useState("");

  const [interpretationSubmitted, setInterpretationSubmitted] =
    useState(false);

  const [interpretationCorrect, setInterpretationCorrect] =
    useState(false);

  const [score, setScore] = useState(0);

  const investigation =
    investigations[currentInvestigation];

  const queryXP = investigation.xp;

  const interpretationXP = Math.round(
    investigation.xp * 0.5
  );

  const maxScore = investigations.reduce(
    (total, item) =>
      total +
      item.xp +
      Math.round(item.xp * 0.5),
    0
  );

  /* =======================================================
     RUN QUERY
  ======================================================= */

  const runQuery = () => {
    if (querySubmitted) {
      return;
    }

    const isCorrect =
      normalizeQuery(query) ===
      normalizeQuery(investigation.correctQuery);

    setQuerySubmitted(true);
    setQueryCorrect(isCorrect);

    if (isCorrect) {
      setScore(
        (previous) =>
          previous + queryXP
      );
    }
  };

  /* =======================================================
     CHECK INTERPRETATION
  ======================================================= */

  const checkInterpretation = () => {
    if (
      interpretationSubmitted ||
      !queryCorrect
    ) {
      return;
    }

    const isCorrect =
      selectedInterpretation ===
      investigation.correctInterpretation;

    setInterpretationSubmitted(true);
    setInterpretationCorrect(isCorrect);

    if (isCorrect) {
      setScore(
        (previous) =>
          previous + interpretationXP
      );
    }
  };

  /* =======================================================
     NEXT INVESTIGATION
  ======================================================= */

  const nextInvestigation = () => {
    if (
      currentInvestigation >=
      investigations.length - 1
    ) {
      return;
    }

    setCurrentInvestigation(
      (previous) => previous + 1
    );

    setQuery("");
    setQuerySubmitted(false);
    setQueryCorrect(false);
    setSelectedInterpretation("");
    setInterpretationSubmitted(false);
    setInterpretationCorrect(false);
  };

  /* =======================================================
     RESET
  ======================================================= */

  const resetInvestigation = () => {
    setQuery("");
    setQuerySubmitted(false);
    setQueryCorrect(false);
    setSelectedInterpretation("");
    setInterpretationSubmitted(false);
    setInterpretationCorrect(false);
  };

  /* =======================================================
     PROGRESS
  ======================================================= */

  const complete =
    currentInvestigation ===
      investigations.length - 1 &&
    interpretationSubmitted;

  const progress = complete
    ? 100
    : Math.round(
        ((currentInvestigation +
          (queryCorrect &&
          interpretationSubmitted
            ? 1
            : 0)) /
          investigations.length) *
          100
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
            SQL Investigator
          </Title>

          <Text type="secondary">
            Write the query. Read the evidence.
            Make a conclusion.
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

      {/* INVESTIGATION */}

      <div
        style={{
          marginTop: 28,
          paddingTop: 24,
          borderTop:
            "1px solid #f0f0f0",
        }}
      >
        <Space size="middle">
          <Text type="secondary">
            Investigation{" "}
            {currentInvestigation + 1} of{" "}
            {investigations.length}
          </Text>

          <Tag>
            {queryXP} + {interpretationXP} XP
          </Tag>
        </Space>

        <Title
          level={4}
          style={{
            marginTop: 8,
            marginBottom: 8,
          }}
        >
          {investigation.question}
        </Title>

        <Space
          wrap
          size={[6, 6]}
        >
          {investigation.skills.map(
            (skill) => (
              <Tag key={skill}>
                {skill}
              </Tag>
            )
          )}
        </Space>
      </div>

      {/* DATABASE */}

      <div
        style={{
          marginTop: 28,
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

      {/* STEP 1 */}

      <div
        style={{
          marginTop: 28,
          paddingTop: 24,
          borderTop:
            "1px solid #f0f0f0",
        }}
      >
        <Text type="secondary">
          Step 1 · Write your SQL query
        </Text>

        <Paragraph
          type="secondary"
          style={{
            marginTop: 6,
            marginBottom: 8,
          }}
        >
          Hint: {investigation.queryHint}
        </Paragraph>

        <textarea
          value={query}
          onChange={(event) =>
            setQuery(event.target.value)
          }
          placeholder="SELECT ..."
          disabled={querySubmitted}
          spellCheck={false}
          style={{
            width: "100%",
            minHeight: 130,
            resize: "vertical",
            padding: 12,
            border:
              "1px solid #d9d9d9",
            borderRadius: 6,
            fontFamily: "monospace",
            fontSize: 14,
            lineHeight: 1.6,
            boxSizing: "border-box",
          }}
        />

        <Space
          style={{
            marginTop: 12,
          }}
        >
          <Button
            type="primary"
            onClick={runQuery}
            disabled={
              !query.trim() ||
              querySubmitted
            }
          >
            Run Query
          </Button>

          <Button
            onClick={resetInvestigation}
          >
            Reset
          </Button>
        </Space>
      </div>

      {/* QUERY FEEDBACK */}

      {querySubmitted && (
        <div
          style={{
            marginTop: 24,
            paddingTop: 20,
            borderTop:
              "1px solid #f0f0f0",
          }}
        >
          {queryCorrect ? (
            <>
              <Text
                strong
                type="success"
              >
                Query correct · +
                {queryXP} XP
              </Text>

              <Paragraph
                type="secondary"
                style={{
                  marginTop: 6,
                  marginBottom: 14,
                }}
              >
                Now interpret the evidence
                returned by your query.
              </Paragraph>

              <Text type="secondary">
                Query result
              </Text>

              <Table
                size="small"
                pagination={false}
                columns={investigation.resultColumns.map(
                  (column) => ({
                    title: column,
                    dataIndex: column,
                    key: column,
                  })
                )}
                dataSource={investigation.resultRows.map(
                  (row, index) => ({
                    ...row,
                    key: index,
                  })
                )}
                style={{
                  marginTop: 8,
                }}
              />
            </>
          ) : (
            <>
              <Text strong>
                Query not quite right
              </Text>

              <Paragraph
                type="secondary"
                style={{
                  marginTop: 6,
                }}
              >
                Review the question and your
                SQL clauses.
              </Paragraph>

              <div
                style={{
                  marginTop: 12,
                  padding: 14,
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
                  {investigation.correctQuery.trim()}
                </Text>
              </div>
            </>
          )}
        </div>
      )}

      {/* STEP 2 */}

      {queryCorrect && (
        <div
          style={{
            marginTop: 28,
            paddingTop: 24,
            borderTop:
              "1px solid #f0f0f0",
          }}
        >
          <Text type="secondary">
            Step 2 · Interpret the evidence
          </Text>

          <Title
            level={5}
            style={{
              marginTop: 8,
            }}
          >
            {
              investigation.interpretationQuestion
            }
          </Title>

          <Radio.Group
            value={
              selectedInterpretation
            }
            onChange={(event) =>
              setSelectedInterpretation(
                event.target.value
              )
            }
            disabled={
              interpretationSubmitted
            }
            style={{
              width: "100%",
            }}
          >
            <Space
              direction="vertical"
              size="small"
            >
              {investigation.interpretationOptions.map(
                (option) => (
                  <Radio
                    key={option}
                    value={option}
                  >
                    {option}
                  </Radio>
                )
              )}
            </Space>
          </Radio.Group>

          <Button
            type="primary"
            onClick={
              checkInterpretation
            }
            disabled={
              !selectedInterpretation ||
              interpretationSubmitted
            }
            style={{
              marginTop: 16,
            }}
          >
            Check Interpretation
          </Button>

          {/* INTERPRETATION FEEDBACK */}

          {interpretationSubmitted && (
            <div
              style={{
                marginTop: 20,
                paddingTop: 18,
                borderTop:
                  "1px solid #f0f0f0",
              }}
            >
              <Text
                strong
                type={
                  interpretationCorrect
                    ? "success"
                    : "danger"
                }
              >
                {interpretationCorrect
                  ? `Correct · +${interpretationXP} XP`
                  : "Not quite"}
              </Text>

              <Paragraph
                type="secondary"
                style={{
                  marginTop: 6,
                  marginBottom: 0,
                }}
              >
                {
                  investigation.interpretationExplanation
                }
              </Paragraph>

              {!interpretationCorrect && (
                <Paragraph
                  style={{
                    marginTop: 10,
                  }}
                >
                  <Text strong>
                    Correct interpretation:{" "}
                  </Text>

                  {
                    investigation.correctInterpretation
                  }
                </Paragraph>
              )}

              <Button
                type="primary"
                onClick={
                  nextInvestigation
                }
                disabled={
                  currentInvestigation ===
                  investigations.length - 1
                }
                style={{
                  marginTop: 14,
                }}
              >
                Next Investigation
              </Button>

              {currentInvestigation ===
                investigations.length - 1 && (
                <div
                  style={{
                    marginTop: 14,
                  }}
                >
                  <Text strong>
                    Investigation complete ·{" "}
                    {score} / {maxScore} XP
                  </Text>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default SQLInvestigator;