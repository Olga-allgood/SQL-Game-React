import { useState } from "react";
import { Button, Card, Progress, Space, Typography } from "antd";

const { Title, Text, Paragraph } = Typography;

const tasks = [
  {
    id: 1,
    level: "Beginner",
    question: "Select all columns from the students table.",
    pieces: ["students", "FROM", "*", "SELECT"],
    answer: ["SELECT", "*", "FROM", "students"],
    explanation:
      "SELECT * retrieves all columns from the students table.",
    hint: "Start with the keyword that tells SQL what you want to retrieve.",
    xp: 50,
  },

  {
    id: 2,
    level: "Beginner",
    question: "Select the name column from the students table.",
    pieces: ["name", "students", "SELECT", "FROM"],
    answer: ["SELECT", "name", "FROM", "students"],
    explanation:
      "SELECT name retrieves the name column from the students table.",
    hint: "First specify what column you want. Then specify the table.",
    xp: 50,
  },

  {
    id: 3,
    level: "Beginner",
    question: "Select all students whose age is greater than 18.",
    pieces: ["18", "students", ">", "SELECT", "WHERE", "*", "FROM", "age"],
    answer: ["SELECT", "*", "FROM", "students", "WHERE", "age", ">", "18"],
    explanation:
      "WHERE filters rows. Here, only students whose age is greater than 18 are returned.",
    hint: "Use WHERE to filter the rows. The condition is age > 18.",
    xp: 50,
  },

  {
    id: 4,
    level: "Beginner",
    question: "Select the name of students whose score is greater than 80.",
    pieces: [
      "name",
      "80",
      "students",
      "WHERE",
      "SELECT",
      "score",
      ">",
      "FROM",
    ],
    answer: [
      "SELECT",
      "name",
      "FROM",
      "students",
      "WHERE",
      "score",
      ">",
      "80",
    ],
    explanation:
      "The query selects student names and filters the rows to scores greater than 80.",
    hint: "Think about the basic structure: SELECT → FROM → WHERE.",
    xp: 50,
  },

  {
    id: 5,
    level: "Beginner",
    question: "Select students whose age is greater than 18 and whose grade is A.",
    pieces: [
      "grade",
      "A",
      "students",
      "AND",
      "SELECT",
      "18",
      "WHERE",
      "age",
      "=",
      "FROM",
      ">",
      "*",
    ],
    answer: [
      "SELECT",
      "*",
      "FROM",
      "students",
      "WHERE",
      "age",
      ">",
      "18",
      "AND",
      "grade",
      "=",
      "A",
    ],
    explanation:
      "AND allows us to require both conditions to be true.",
    hint: "You need two WHERE conditions connected with AND.",
    xp: 75,
  },

  {
    id: 6,
    level: "Beginner",
    question: "Sort all students by their score from highest to lowest.",
    pieces: ["score", "students", "DESC", "SELECT", "ORDER BY", "*", "FROM"],
    answer: [
      "SELECT",
      "*",
      "FROM",
      "students",
      "ORDER BY",
      "score",
      "DESC",
    ],
    explanation:
      "ORDER BY sorts the results. DESC sorts from highest to lowest.",
    hint: "Use ORDER BY followed by the column you want to sort.",
    xp: 75,
  },

  {
    id: 7,
    level: "Beginner",
    question: "Show the unique departments from the employees table.",
    pieces: [
      "departments",
      "DISTINCT",
      "employees",
      "SELECT",
      "FROM",
      "department",
    ],
    answer: [
      "SELECT",
      "DISTINCT",
      "department",
      "FROM",
      "employees",
    ],
    explanation:
      "DISTINCT removes duplicate values from the results.",
    hint: "Which SQL keyword means 'unique values only'?",
    xp: 75,
  },

  {
    id: 8,
    level: "Intermediate",
    question: "Count all students.",
    pieces: ["students", "COUNT(*)", "SELECT", "FROM"],
    answer: ["SELECT", "COUNT(*)", "FROM", "students"],
    explanation:
      "COUNT(*) counts the number of rows in the students table.",
    hint: "Use the aggregate function that counts rows.",
    xp: 100,
  },

  {
    id: 9,
    level: "Intermediate",
    question: "Find the average score of all students.",
    pieces: ["score", "students", "AVG(score)", "SELECT", "FROM"],
    answer: ["SELECT", "AVG(score)", "FROM", "students"],
    explanation:
      "AVG(score) calculates the average value of the score column.",
    hint: "Which aggregate function calculates an average?",
    xp: 100,
  },

  {
    id: 10,
    level: "Intermediate",
    question: "Find the highest score in the students table.",
    pieces: ["MAX(score)", "students", "FROM", "score", "SELECT"],
    answer: ["SELECT", "MAX(score)", "FROM", "students"],
    explanation:
      "MAX() returns the largest value in a column.",
    hint: "Use the aggregate function that finds the largest value.",
    xp: 100,
  },

  {
    id: 11,
    level: "Intermediate",
    question: "Count how many students are in each course.",
    pieces: [
      "course",
      "students",
      "COUNT(*)",
      "GROUP BY",
      "SELECT",
      "FROM",
    ],
    answer: [
      "SELECT",
      "course",
      "COUNT(*)",
      "FROM",
      "students",
      "GROUP BY",
      "course",
    ],
    explanation:
      "GROUP BY creates a group for each course, and COUNT(*) counts the students in each group.",
    hint: "You need GROUP BY because you want a separate count for each course.",
    xp: 125,
  },

  {
    id: 12,
    level: "Intermediate",
    question: "Find the average score for each course.",
    pieces: [
      "AVG(score)",
      "course",
      "students",
      "GROUP BY",
      "SELECT",
      "FROM",
    ],
    answer: [
      "SELECT",
      "course",
      "AVG(score)",
      "FROM",
      "students",
      "GROUP BY",
      "course",
    ],
    explanation:
      "GROUP BY creates a group for each course, allowing AVG() to calculate an average for each group.",
    hint: "You need both AVG() and GROUP BY.",
    xp: 125,
  },

  {
    id: 13,
    level: "Intermediate",
    question: "Show courses that have more than 10 students.",
    pieces: [
      "COUNT(*)",
      "10",
      "students",
      "HAVING",
      "SELECT",
      "course",
      "GROUP BY",
      ">",
      "FROM",
    ],
    answer: [
      "SELECT",
      "course",
      "COUNT(*)",
      "FROM",
      "students",
      "GROUP BY",
      "course",
      "HAVING",
      "COUNT(*)",
      ">",
      "10",
    ],
    explanation:
      "HAVING filters groups after GROUP BY. Here we keep only courses with more than 10 students.",
    hint: "WHERE filters rows. Which keyword filters groups?",
    xp: 150,
  },

  {
    id: 14,
    level: "Intermediate",
    question: "Find students whose names start with A.",
    pieces: [
      "A%",
      "students",
      "name",
      "LIKE",
      "SELECT",
      "*",
      "WHERE",
      "FROM",
    ],
    answer: [
      "SELECT",
      "*",
      "FROM",
      "students",
      "WHERE",
      "name",
      "LIKE",
      "A%",
    ],
    explanation:
      "LIKE allows pattern matching. A% means the name starts with A.",
    hint: "Use LIKE for searching for a text pattern.",
    xp: 125,
  },

  {
    id: 15,
    level: "Advanced",
    question: "Show student names together with their course names.",
    pieces: [
      "courses.name",
      "students",
      "JOIN",
      "courses",
      "students.name",
      "SELECT",
      "FROM",
      "ON",
      "students.course_id = courses.id",
    ],
    answer: [
      "SELECT",
      "students.name",
      "courses.name",
      "FROM",
      "students",
      "JOIN",
      "courses",
      "ON",
      "students.course_id = courses.id",
    ],
    explanation:
      "JOIN combines related information from two tables using matching keys.",
    hint: "You need to connect the students and courses tables using their related IDs.",
    xp: 175,
  },

  {
    id: 16,
    level: "Advanced",
    question: "Show all students, including students who are not enrolled in a course.",
    pieces: [
      "students",
      "courses",
      "LEFT JOIN",
      "SELECT",
      "*",
      "FROM",
      "ON",
      "students.course_id = courses.id",
    ],
    answer: [
      "SELECT",
      "*",
      "FROM",
      "students",
      "LEFT JOIN",
      "courses",
      "ON",
      "students.course_id = courses.id",
    ],
    explanation:
      "LEFT JOIN keeps every row from the left table, even when there is no matching row in the right table.",
    hint: "Which JOIN keeps every record from the first table?",
    xp: 175,
  },

  {
    id: 17,
    level: "Advanced",
    question: "Find students who do not have a course assigned.",
    pieces: [
      "students",
      "course_id",
      "SELECT",
      "*",
      "FROM",
      "WHERE",
      "IS NULL",
    ],
    answer: [
      "SELECT",
      "*",
      "FROM",
      "students",
      "WHERE",
      "course_id",
      "IS NULL",
    ],
    explanation:
      "IS NULL checks whether a value is missing.",
    hint: "NULL represents a missing or unknown value. Use IS NULL to find it.",
    xp: 175,
  },

  {
    id: 18,
    level: "Advanced",
    question: "Show the five students with the highest scores.",
    pieces: [
      "students",
      "score",
      "SELECT",
      "ORDER BY",
      "DESC",
      "*",
      "FROM",
      "LIMIT",
      "5",
    ],
    answer: [
      "SELECT",
      "*",
      "FROM",
      "students",
      "ORDER BY",
      "score",
      "DESC",
      "LIMIT",
      "5",
    ],
    explanation:
      "ORDER BY score DESC puts the highest scores first, and LIMIT 5 returns only the first five rows.",
    hint: "First sort from highest to lowest, then limit the number of results.",
    xp: 200,
  },

  {
    id: 19,
    level: "Advanced",
    question:
      "Find the courses whose average score is greater than 80.",
    pieces: [
      "AVG(score)",
      "80",
      "course",
      "students",
      "GROUP BY",
      "HAVING",
      "SELECT",
      ">",
      "FROM",
    ],
    answer: [
      "SELECT",
      "course",
      "AVG(score)",
      "FROM",
      "students",
      "GROUP BY",
      "course",
      "HAVING",
      "AVG(score)",
      ">",
      "80",
    ],
    explanation:
      "GROUP BY creates course groups, AVG calculates each group's average, and HAVING filters those groups.",
    hint: "Because you are filtering an aggregate result, use HAVING rather than WHERE.",
    xp: 225,
  },

  {
    id: 20,
    level: "Boss Challenge",
    question:
      "Find the top 3 courses by average student score.",
    pieces: [
      "course",
      "students",
      "AVG(score)",
      "DESC",
      "3",
      "GROUP BY",
      "SELECT",
      "FROM",
      "ORDER BY",
      "LIMIT",
    ],
    answer: [
      "SELECT",
      "course",
      "AVG(score)",
      "FROM",
      "students",
      "GROUP BY",
      "course",
      "ORDER BY",
      "AVG(score)",
      "DESC",
      "LIMIT",
      "3",
    ],
    explanation:
      "GROUP BY calculates an average for each course. ORDER BY sorts those averages from highest to lowest, and LIMIT 3 keeps the top three.",
    hint:
      "Think about the sequence: group the courses → calculate averages → sort them → keep only three.",
    xp: 300,
  },
];

export const QueryBuilder = () => {
  const [currentTask, setCurrentTask] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [usedAnswer, setUsedAnswer] = useState(false);
  const [totalXP, setTotalXP] = useState(0);

  const task = tasks[currentTask];

  const handleClick = (piece: string) => {
    if (selected.includes(piece) || completed) {
      return;
    }

    setSelected([...selected, piece]);
    setFeedback("");
  };

  const handleCheck = () => {
    const isCorrect =
      JSON.stringify(selected) === JSON.stringify(task.answer);

    if (isCorrect) {
      setFeedback(task.explanation);
      setCompleted(true);

      // Only award XP for solving independently.
      if (!usedAnswer) {
        setTotalXP((previous) => previous + task.xp);
      }

      setShowHint(false);
    } else {
      setFeedback(
        "You're close. Check the order of your SQL clauses."
      );
      setShowHint(true);
    }
  };

  const handleHint = () => {
    setShowHint(true);
    setFeedback(task.hint);
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
    setUsedAnswer(true);
    setShowHint(false);
  };

  const handleNext = () => {
    if (currentTask < tasks.length - 1) {
      setCurrentTask(currentTask + 1);
      setSelected([]);
      setFeedback("");
      setShowHint(false);
      setShowAnswer(false);
      setCompleted(false);
      setUsedAnswer(false);
    }
  };

  const handleReset = () => {
    setSelected([]);
    setFeedback("");
    setShowHint(false);
    setShowAnswer(false);
    setCompleted(false);
    setUsedAnswer(false);
  };

  const progress =
    ((currentTask + (completed ? 1 : 0)) / tasks.length) * 100;

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
      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <Text strong>
          Task {currentTask + 1} of {tasks.length}
        </Text>

        <Text type="secondary">
          {totalXP} XP
        </Text>
      </div>

      <Progress
        percent={Math.round(progress)}
        showInfo={false}
        size="small"
      />

      {/* Question */}

      <div style={{ marginTop: 28 }}>
        <Text type="secondary">
          {task.level}
        </Text>

        <Title
          level={4}
          style={{
            marginTop: 6,
            marginBottom: 0,
          }}
        >
          {task.question}
        </Title>
      </div>

      {/* Query being built */}

      <div style={{ marginTop: 24 }}>
        <Text type="secondary">
          Your query
        </Text>

        <div
          style={{
            marginTop: 8,
            padding: 16,
            minHeight: 70,
            background: "#fafafa",
            borderRadius: 6,
            border: "1px solid #f0f0f0",
          }}
        >
          <Text code>
            {selected.length > 0
              ? selected.join(" ")
              : "Build your query using the SQL pieces below."}
          </Text>
        </div>
      </div>

      {/* SQL pieces */}

      <Space
        wrap
        size={[8, 8]}
        style={{
          marginTop: 16,
        }}
      >
        {task.pieces.map((piece, index) => (
          <Button
            key={`${piece}-${index}`}
            disabled={selected.includes(piece) || completed}
            onClick={() => handleClick(piece)}
          >
            {piece}
          </Button>
        ))}
      </Space>

      {/* Main action */}

      <Space
        style={{
          marginTop: 24,
        }}
      >
        <Button
          type="primary"
          onClick={handleCheck}
          disabled={selected.length === 0 || completed}
        >
          Check Answer
        </Button>

        <Button onClick={handleReset}>
          Reset
        </Button>
      </Space>

      {/* Learning support */}

      {!completed && (
        <div
          style={{
            marginTop: 16,
          }}
        >
          <Space size="middle">
            <Button
              type="link"
              onClick={handleHint}
              style={{
                paddingLeft: 0,
              }}
            >
              Show Hint
            </Button>

            <Button
              type="link"
              onClick={handleShowAnswer}
              style={{
                paddingLeft: 0,
              }}
            >
              Show Answer
            </Button>
          </Space>
        </div>
      )}

      {/* Hint */}

      {showHint && !showAnswer && !completed && (
        <div
          style={{
            marginTop: 20,
            paddingTop: 16,
            borderTop: "1px solid #f0f0f0",
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
            {task.hint}
          </Paragraph>
        </div>
      )}

      {/* Worked example */}

      {showAnswer && !completed && (
        <div
          style={{
            marginTop: 20,
            paddingTop: 20,
            borderTop: "1px solid #f0f0f0",
          }}
        >
          <Text type="secondary">
            Correct query
          </Text>

          <div
            style={{
              marginTop: 8,
              padding: 16,
              background: "#fafafa",
              borderRadius: 6,
              border: "1px solid #f0f0f0",
            }}
          >
            <Text
              code
              style={{
                whiteSpace: "pre-wrap",
              }}
            >
              {task.answer.join(" ")}
            </Text>
          </div>

          <div style={{ marginTop: 16 }}>
            <Text type="secondary">
              Why it works
            </Text>

            <Paragraph
              style={{
                marginTop: 6,
                marginBottom: 0,
              }}
            >
              {task.explanation}
            </Paragraph>
          </div>

          <Text
            type="secondary"
            style={{
              display: "block",
              marginTop: 12,
            }}
          >
            Study the example, then try building the query
            yourself.
          </Text>
        </div>
      )}

      {/* Feedback after checking */}

      {feedback && (
        <div
          style={{
            marginTop: 24,
            paddingTop: 20,
            borderTop: "1px solid #f0f0f0",
          }}
        >
          <Text
            strong
            type={completed ? "success" : "secondary"}
          >
            {completed ? "Correct" : "Not quite"}
          </Text>

          <Paragraph
            style={{
              marginTop: 8,
              marginBottom: 0,
            }}
          >
            {feedback}
          </Paragraph>
        </div>
      )}

      {/* Completed */}

      {completed && (
        <div
          style={{
            marginTop: 24,
            paddingTop: 20,
            borderTop: "1px solid #f0f0f0",
          }}
        >
          <Text
            strong
            type="success"
          >
            {usedAnswer
              ? "Practice complete"
              : `+${task.xp} XP`}
          </Text>

          <div style={{ marginTop: 12 }}>
            {currentTask < tasks.length - 1 ? (
              <Button
                type="primary"
                onClick={handleNext}
              >
                Next Challenge
              </Button>
            ) : (
              <Text strong>
                SQL Quest complete — {totalXP} XP earned.
              </Text>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};