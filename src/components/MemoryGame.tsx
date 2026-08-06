
import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Radio,
  Row,
  Space,
  Tag,
  Table,
  Typography,
} from "antd";

const { Title, Text } = Typography;

type Student = {
  key: string;
  name: string;
  age: number;
  department: string;
};

type Pair = {
  id: number;
  concept: string;
  query: string;
  explanation: string;

  table: Student[];

  correctAnswer: string;
  choices: string[];
};

type Level = {
  id: number;
  title: string;
  description: string;
  pairIds: number[];
};

type GameCard = {
  id: number;
  value: string;
  type: "query" | "explanation";
  pairId: number;
};

/* -----------------------------
   SQL QUESTIONS
----------------------------- */

const sqlPairs: Pair[] = [
  {
    id: 1,
    concept: "WHERE",

    query: `SELECT *
FROM students
WHERE age > 18;`,

    explanation:
      "Filters rows and returns students whose age is greater than 18.",

    table: [
      {
        key: "1",
        name: "Anna",
        age: 20,
        department: "Math",
      },
      {
        key: "2",
        name: "Ben",
        age: 17,
        department: "History",
      },
      {
        key: "3",
        name: "Carlos",
        age: 22,
        department: "Math",
      },
      {
        key: "4",
        name: "Diana",
        age: 16,
        department: "Art",
      },
    ],

    correctAnswer: "Anna, Carlos",

    choices: [
      "Anna, Carlos",
      "Ben, Diana",
      "Anna, Ben, Carlos",
      "All students",
    ],
  },

  {
    id: 2,
    concept: "ORDER BY",

    query: `SELECT *
FROM students
ORDER BY age DESC;`,

    explanation:
      "Sorts the students from the oldest to the youngest.",

    table: [
      {
        key: "1",
        name: "Anna",
        age: 20,
        department: "Math",
      },
      {
        key: "2",
        name: "Ben",
        age: 17,
        department: "History",
      },
      {
        key: "3",
        name: "Carlos",
        age: 22,
        department: "Math",
      },
      {
        key: "4",
        name: "Diana",
        age: 16,
        department: "Art",
      },
    ],

    correctAnswer:
      "Carlos, Anna, Ben, Diana",

    choices: [
      "Carlos, Anna, Ben, Diana",
      "Diana, Ben, Anna, Carlos",
      "Anna, Ben, Carlos, Diana",
      "Carlos, Ben, Anna, Diana",
    ],
  },

  {
    id: 3,
    concept: "COUNT()",

    query: `SELECT COUNT(*)
FROM students;`,

    explanation:
      "Counts the total number of rows in the students table.",

    table: [
      {
        key: "1",
        name: "Anna",
        age: 20,
        department: "Math",
      },
      {
        key: "2",
        name: "Ben",
        age: 17,
        department: "History",
      },
      {
        key: "3",
        name: "Carlos",
        age: 22,
        department: "Math",
      },
      {
        key: "4",
        name: "Diana",
        age: 16,
        department: "Art",
      },
    ],

    correctAnswer: "4",

    choices: ["2", "3", "4", "5"],
  },

  {
    id: 4,
    concept: "GROUP BY",

    query: `SELECT department, COUNT(*)
FROM students
GROUP BY department;`,

    explanation:
      "Groups students by department and counts the students in each department.",

    table: [
      {
        key: "1",
        name: "Anna",
        age: 20,
        department: "Math",
      },
      {
        key: "2",
        name: "Ben",
        age: 17,
        department: "History",
      },
      {
        key: "3",
        name: "Carlos",
        age: 22,
        department: "Math",
      },
      {
        key: "4",
        name: "Diana",
        age: 16,
        department: "Art",
      },
    ],

    correctAnswer:
      "Math: 2, History: 1, Art: 1",

    choices: [
      "Math: 2, History: 1, Art: 1",
      "Math: 1, History: 2, Art: 1",
      "Math: 4",
      "4 departments",
    ],
  },

  {
    id: 5,
    concept: "DISTINCT",

    query: `SELECT DISTINCT department
FROM students;`,

    explanation:
      "Returns each department only once and removes duplicate values.",

    table: [
      {
        key: "1",
        name: "Anna",
        age: 20,
        department: "Math",
      },
      {
        key: "2",
        name: "Ben",
        age: 17,
        department: "History",
      },
      {
        key: "3",
        name: "Carlos",
        age: 22,
        department: "Math",
      },
      {
        key: "4",
        name: "Diana",
        age: 16,
        department: "Art",
      },
    ],

    correctAnswer:
      "Math, History, Art",

    choices: [
      "Math, History, Art",
      "Math, Math, History, Art",
      "Anna, Ben, Carlos, Diana",
      "4",
    ],
  },

  {
    id: 6,
    concept: "HAVING",

    query: `SELECT department, COUNT(*)
FROM students
GROUP BY department
HAVING COUNT(*) > 1;`,

    explanation:
      "Keeps only groups that contain more than one student.",

    table: [
      {
        key: "1",
        name: "Anna",
        age: 20,
        department: "Math",
      },
      {
        key: "2",
        name: "Ben",
        age: 17,
        department: "History",
      },
      {
        key: "3",
        name: "Carlos",
        age: 22,
        department: "Math",
      },
      {
        key: "4",
        name: "Diana",
        age: 16,
        department: "Art",
      },
    ],

    correctAnswer: "Math: 2",

    choices: [
      "Math: 2",
      "History: 1",
      "Art: 1",
      "Math: 2, History: 1, Art: 1",
    ],
  },

  {
    id: 7,
    concept: "JOIN",

    query: `SELECT students.name, courses.name
FROM students
JOIN courses
ON students.course_id = courses.id;`,

    explanation:
      "Combines information from the students and courses tables.",

    table: [
      {
        key: "1",
        name: "Anna",
        age: 20,
        department: "Math",
      },
      {
        key: "2",
        name: "Ben",
        age: 17,
        department: "History",
      },
      {
        key: "3",
        name: "Carlos",
        age: 22,
        department: "Math",
      },
      {
        key: "4",
        name: "Diana",
        age: 16,
        department: "Art",
      },
    ],

    correctAnswer:
      "Student information + course information",

    choices: [
      "Student information + course information",
      "Only student information",
      "Only course information",
      "Deletes both tables",
    ],
  },

  {
    id: 8,
    concept: "INSERT",

    query: `INSERT INTO students
(name, age, department)
VALUES ('Emma', 21, 'Biology');`,

    explanation:
      "Adds a new student row to the students table.",

    table: [
      {
        key: "1",
        name: "Anna",
        age: 20,
        department: "Math",
      },
      {
        key: "2",
        name: "Ben",
        age: 17,
        department: "History",
      },
      {
        key: "3",
        name: "Carlos",
        age: 22,
        department: "Math",
      },
      {
        key: "4",
        name: "Diana",
        age: 16,
        department: "Art",
      },
    ],

    correctAnswer: "Emma is added",

    choices: [
      "Emma is added",
      "Emma is deleted",
      "Emma is updated",
      "Nothing happens",
    ],
  },

  {
    id: 9,
    concept: "UPDATE",

    query: `UPDATE students
SET age = 21
WHERE name = 'Anna';`,

    explanation:
      "Changes Anna's age to 21.",

    table: [
      {
        key: "1",
        name: "Anna",
        age: 20,
        department: "Math",
      },
      {
        key: "2",
        name: "Ben",
        age: 17,
        department: "History",
      },
      {
        key: "3",
        name: "Carlos",
        age: 22,
        department: "Math",
      },
      {
        key: "4",
        name: "Diana",
        age: 16,
        department: "Art",
      },
    ],

    correctAnswer:
      "Anna's age becomes 21",

    choices: [
      "Anna's age becomes 21",
      "Everyone's age becomes 21",
      "Anna is deleted",
      "A new Anna is created",
    ],
  },

  {
    id: 10,
    concept: "DELETE",

    query: `DELETE FROM students
WHERE age < 18;`,

    explanation:
      "Removes students whose age is less than 18.",

    table: [
      {
        key: "1",
        name: "Anna",
        age: 20,
        department: "Math",
      },
      {
        key: "2",
        name: "Ben",
        age: 17,
        department: "History",
      },
      {
        key: "3",
        name: "Carlos",
        age: 22,
        department: "Math",
      },
      {
        key: "4",
        name: "Diana",
        age: 16,
        department: "Art",
      },
    ],

    correctAnswer:
      "Ben and Diana",

    choices: [
      "Ben and Diana",
      "Anna and Carlos",
      "Everyone",
      "Nobody",
    ],
  },
];

/* -----------------------------
   LEVELS
----------------------------- */

const levels: Level[] = [
  {
    id: 1,
    title: "Basic filtering",
    description:
      "Learn how SQL selects and organizes rows. Practice filtering data with WHERE and sorting results with ORDER BY.",

    pairIds: [1, 2],
  },

  {
    id: 2,
    title: "Aggregation",
    description:
      "Learn how SQL summarizes data. Practice counting rows with COUNT() and grouping related records with GROUP BY.",

    pairIds: [3, 4],
  },

  {
    id: 3,
    title: "Result manipulation",
    description:
      "Learn how to control grouped and duplicate results. Practice removing duplicates with DISTINCT and filtering groups with HAVING.",

    pairIds: [5, 6],
  },

  {
    id: 4,
    title: "Multiple tables",
    description:
      "Learn how SQL combines information stored in different tables using JOIN.",

    pairIds: [7],
  },

  {
    id: 5,
    title: "Data modification",
    description:
      "Learn how SQL changes data in a database. Practice adding rows with INSERT, changing rows with UPDATE, and removing rows with DELETE.",

    pairIds: [8, 9, 10],
  },
];

/* -----------------------------
   CREATE CARDS
----------------------------- */

function createCards(pairIds: number[]): GameCard[] {
  const cards: GameCard[] = [];

  pairIds.forEach((pairId) => {
    const pair = sqlPairs.find(
      (item) => item.id === pairId
    );

    if (!pair) return;

    cards.push({
      id: pair.id * 2,
      value: pair.query,
      type: "query",
      pairId: pair.id,
    });

    cards.push({
      id: pair.id * 2 + 1,
      value: pair.explanation,
      type: "explanation",
      pairId: pair.id,
    });
  });

  return cards.sort(
    () => Math.random() - 0.5
  );
}

/* -----------------------------
   GAME
----------------------------- */

export default function MemoryGame() {
  const [levelIndex, setLevelIndex] =
    useState(0);

  const currentLevel = levels[levelIndex];

  /*
   * Pair IDs currently displayed on the board.
   *
   * We always try to show 2 pairs = 4 cards.
   */
  const [activePairIds, setActivePairIds] =
    useState<number[]>(
      currentLevel.pairIds.slice(0, 2)
    );

  const [cards, setCards] =
    useState<GameCard[]>(
      createCards(
        currentLevel.pairIds.slice(0, 2)
      )
    );

  const [selectedCard, setSelectedCard] =
    useState<number | null>(null);

  const [matchedCards, setMatchedCards] =
    useState<number[]>([]);

  const [incorrectCards, setIncorrectCards] =
    useState<number[]>([]);

  const [moves, setMoves] =
    useState(0);

  const [message, setMessage] =
    useState<string | null>(null);

  const [currentChallenge, setCurrentChallenge] =
    useState<Pair | null>(null);

  const [selectedAnswer, setSelectedAnswer] =
    useState<string | null>(null);

  const [challengeCorrect, setChallengeCorrect] =
    useState(false);

  const [gameComplete, setGameComplete] =
    useState(false);

  /*
   * How many pairs from this level
   * have already been completed.
   */
  const [completedPairIds, setCompletedPairIds] =
    useState<number[]>([]);

  /* -----------------------------
     CARD CLICK
  ----------------------------- */

  const handleCardClick = (card: GameCard) => {
    if (matchedCards.includes(card.id)) {
      return;
    }

    if (selectedCard === card.id) {
      return;
    }

    if (currentChallenge) {
      return;
    }

    /*
     * First card selected
     */
    if (selectedCard === null) {
      setSelectedCard(card.id);
      setMessage(null);
      return;
    }

    const firstCard = cards.find(
      (item) => item.id === selectedCard
    );

    if (!firstCard) {
      return;
    }

    setMoves(
      (previousMoves) =>
        previousMoves + 1
    );

    /*
     * CORRECT MATCH
     */
    if (
      firstCard.pairId === card.pairId &&
      firstCard.type !== card.type
    ) {
      setMatchedCards([
        ...matchedCards,
        firstCard.id,
        card.id,
      ]);

      setSelectedCard(null);

      setMessage(
        `Correct! You matched ${cardPairConcept(
          card.pairId
        )}.`
      );

      const matchedPair =
        sqlPairs.find(
          (pair) =>
            pair.id === card.pairId
        );

      if (matchedPair) {
        setTimeout(() => {
          setCurrentChallenge(
            matchedPair
          );

          setSelectedAnswer(null);
          setChallengeCorrect(false);
        }, 500);
      }

      return;
    }

    /*
     * INCORRECT MATCH
     */
    setIncorrectCards([
      firstCard.id,
      card.id,
    ]);

    setMessage(
      "Not quite. Try another match."
    );

    setTimeout(() => {
      setIncorrectCards([]);
      setSelectedCard(null);
      setMessage(null);
    }, 800);
  };

  /* -----------------------------
     MULTIPLE CHOICE ANSWER
  ----------------------------- */

  const handleAnswer = (
    answer: string
  ) => {
    setSelectedAnswer(answer);

    if (
      currentChallenge &&
      answer ===
        currentChallenge.correctAnswer
    ) {
      setChallengeCorrect(true);
    } else {
      setChallengeCorrect(false);
    }
  };

  /* -----------------------------
     AFTER PREDICTION
  ----------------------------- */

  const continueAfterChallenge = () => {
    if (
      !currentChallenge ||
      !challengeCorrect
    ) {
      return;
    }

    const pairId =
      currentChallenge.id;

    /*
     * Mark this concept as completed
     */
    const newCompletedPairIds = [
      ...completedPairIds,
      pairId,
    ];

    setCompletedPairIds(
      newCompletedPairIds
    );

    /*
     * Remove the completed pair
     * from the board.
     */
    const remainingActivePairs =
      activePairIds.filter(
        (id) => id !== pairId
      );

    /*
     * Find another concept from
     * this level that isn't currently
     * on the board.
     */
    const nextPair = currentLevel.pairIds.find(
      (id) =>
        !newCompletedPairIds.includes(
          id
        ) &&
        !remainingActivePairs.includes(
          id
        )
    );

    /*
     * Replace the completed pair
     * with a new pair.
     */
    if (nextPair !== undefined) {
      const newActivePairIds = [
        ...remainingActivePairs,
        nextPair,
      ];

      setActivePairIds(
        newActivePairIds
      );

      setCards(
        createCards(
          newActivePairIds
        )
      );

      setMatchedCards([]);
    } else {
      /*
       * No more pairs in the level.
       *
       * Move to next level.
       */
      const levelComplete =
        currentLevel.pairIds.every(
          (id) =>
            newCompletedPairIds.includes(
              id
            )
        );

      if (levelComplete) {
        const nextLevelIndex =
          levelIndex + 1;

        if (
          nextLevelIndex >=
          levels.length
        ) {
          setGameComplete(true);
        } else {
          const nextLevel =
            levels[nextLevelIndex];

          const nextPairs =
            nextLevel.pairIds.slice(
              0,
              2
            );

          setLevelIndex(
            nextLevelIndex
          );

          setActivePairIds(
            nextPairs
          );

          setCards(
            createCards(
              nextPairs
            )
          );

          setCompletedPairIds([]);
          setMatchedCards([]);
        }
      }
    }

    setCurrentChallenge(null);
    setSelectedAnswer(null);
    setChallengeCorrect(false);
    setMessage(null);
  };

  /* -----------------------------
     NEW GAME
  ----------------------------- */

  const startNewGame = () => {
    const firstLevel = levels[0];

    const firstPairs =
      firstLevel.pairIds.slice(
        0,
        2
      );

    setLevelIndex(0);

    setActivePairIds(
      firstPairs
    );

    setCards(
      createCards(
        firstPairs
      )
    );

    setSelectedCard(null);
    setMatchedCards([]);
    setIncorrectCards([]);

    setMoves(0);

    setMessage(null);

    setCurrentChallenge(null);
    setSelectedAnswer(null);
    setChallengeCorrect(false);

    setCompletedPairIds([]);

    setGameComplete(false);
  };

  /* -----------------------------
     TABLE COLUMNS
  ----------------------------- */

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
  ];

  /* -----------------------------
     RENDER
  ----------------------------- */

  return (
    <div>
      {/* LEVEL HEADER */}

      <Card
        style={{
          marginBottom: 24,
          backgroundColor: "#f0f5ff",
        }}
      >
        <Space
          direction="vertical"
          size={4}
        >
          <Space>
            <Tag color="blue">
              Level {currentLevel.id}
            </Tag>

            <Text strong>
              {currentLevel.title}
            </Text>
          </Space>

          <Text>
            {currentLevel.description}
          </Text>
        </Space>
      </Card>

      <Title level={2}>
        🧠 SQL Query Match
      </Title>

      <Text>
        Match each SQL query with what it
        does. Then predict the result.
      </Text>

      {/* GAME INFO */}

      <div
        style={{
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <Space wrap>
          <Text strong>
            Moves: {moves}
          </Text>

          <Text strong>
            Level progress:{" "}
            {completedPairIds.length} /{" "}
            {currentLevel.pairIds.length}
          </Text>

          <Button
            onClick={startNewGame}
          >
            New Game
          </Button>
        </Space>
      </div>

      {/* FEEDBACK */}

      {message && (
        <Alert
          message={message}
          type={
            message.startsWith("Correct")
              ? "success"
              : "error"
          }
          showIcon
          style={{
            marginBottom: 20,
          }}
        />
      )}

      {/* GAME COMPLETE */}

      {gameComplete && (
        <Alert
          type="success"
          showIcon
          message="🎉 SQL Master!"
          description="You completed all five levels and practiced the core SQL concepts."
          style={{
            marginBottom: 20,
          }}
        />
      )}

      {/* CARDS */}



{!gameComplete && (
  <Row gutter={[16, 16]}>
    {activePairIds.map((pairId) => {
      const queryCard = cards.find(
        (card) =>
          card.pairId === pairId &&
          card.type === "query"
      );

      const explanationCard = cards.find(
        (card) =>
          card.pairId === pairId &&
          card.type === "explanation"
      );

      if (!queryCard || !explanationCard) {
        return null;
      }

      const renderCard = (card: GameCard) => {
        const isMatched =
          matchedCards.includes(card.id);

        const isSelected =
          selectedCard === card.id;

        const isIncorrect =
          incorrectCards.includes(card.id);

        let backgroundColor = "#ffffff";
        let borderColor = "#d9d9d9";

        if (isMatched) {
          backgroundColor = "#f6ffed";
          borderColor = "#b7eb8f";
        }

        if (isSelected) {
          backgroundColor = "#e6f4ff";
          borderColor = "#91caff";
        }

        if (isIncorrect) {
          backgroundColor = "#fff2f0";
          borderColor = "#ffccc7";
        }

        return (
          <Card
            hoverable={!isMatched}
            onClick={() =>
              handleCardClick(card)
            }
            style={{
              minHeight: 170,
              cursor: isMatched
                ? "default"
                : "pointer",
              backgroundColor,
              borderColor,
              transition:
                "all 0.2s ease",
            }}
          >
            <div
              style={{
                marginBottom: 12,
              }}
            >
              <Tag
                color={
                  card.type === "query"
                    ? "blue"
                    : "purple"
                }
              >
                {card.type === "query"
                  ? "SQL QUERY"
                  : "WHAT IT DOES"}
              </Tag>
            </div>

            {card.type === "query" ? (
              <Text
                style={{
                  fontFamily: "monospace",
                  whiteSpace: "pre-wrap",
                  fontSize: 15,
                }}
              >
                {card.value}
              </Text>
            ) : (
              <Text>{card.value}</Text>
            )}

            {isMatched && (
              <div
                style={{
                  marginTop: 15,
                }}
              >
                <Text
                  type="success"
                  strong
                >
                  ✓ Matched
                </Text>
              </div>
            )}
          </Card>
        );
      };

      return (
        <Col
          span={24}
          key={pairId}
        >
          <Row gutter={[16, 16]}>
            {/* LEFT — SQL QUERY */}

            <Col
              xs={24}
              md={12}
            >
              {renderCard(queryCard)}
            </Col>

            {/* RIGHT — EXPLANATION */}

            <Col
              xs={24}
              md={12}
            >
              {renderCard(
                explanationCard
              )}
            </Col>
          </Row>
        </Col>
      );
    })}
  </Row>
)}



      {/* PREDICTION CHALLENGE */}

      {currentChallenge && (
        <Card
          style={{
            marginTop: 30,
          }}
        >
          <Title level={3}>
            🔍 Now predict the result
          </Title>

          <Text>
            You matched the concept.
            Now use the SQL query to
            figure out what the database
            will return.
          </Text>

          {/* QUERY */}

          <Card
            size="small"
            style={{
              marginTop: 20,
              marginBottom: 20,
              backgroundColor:
                "#fafafa",
            }}
          >
            <Text
              style={{
                fontFamily:
                  "monospace",
                whiteSpace:
                  "pre-wrap",
              }}
            >
              {
                currentChallenge.query
              }
            </Text>
          </Card>

          {/* TABLE */}

          <Text strong>
            Students table:
          </Text>

          <Table
            columns={columns}
            dataSource={
              currentChallenge.table
            }
            pagination={false}
            size="small"
            style={{
              marginTop: 10,
              marginBottom: 20,
            }}
          />

          {/* ANSWERS */}

          <Text strong>
            What will this query
            return?
          </Text>

          <div
            style={{
              marginTop: 15,
            }}
          >
            <Radio.Group
              onChange={(event) =>
                handleAnswer(
                  event.target.value
                )
              }
              value={
                selectedAnswer
              }
            >
              <Space direction="vertical">
                {currentChallenge.choices.map(
                  (choice) => (
                    <Radio
                      key={choice}
                      value={choice}
                    >
                      {choice}
                    </Radio>
                  )
                )}
              </Space>
            </Radio.Group>
          </div>

          {/* ANSWER FEEDBACK */}

          {selectedAnswer && (
            <div
              style={{
                marginTop: 20,
              }}
            >
              {challengeCorrect ? (
                <>
                  <Alert
                    type="success"
                    showIcon
                    message="Correct! 🎉"
                    description="You correctly predicted the query result."
                  />

                  <Button
                    type="primary"
                    onClick={
                      continueAfterChallenge
                    }
                    style={{
                      marginTop: 15,
                    }}
                  >
                    Continue
                  </Button>
                </>
              ) : (
                <Alert
                  type="error"
                  showIcon
                  message="Not quite."
                  description="Look carefully at the SQL query and try again."
                />
              )}
            </div>
          )}
        </Card>
      )}
    </div>
  );
}

/* -----------------------------
   HELPER
----------------------------- */

function cardPairConcept(
  pairId: number
) {
  const pair = sqlPairs.find(
    (item) => item.id === pairId
  );

  return pair?.concept ?? "SQL";
}
