export const summarizingCards = [
  {
    id: 1,
    question: "What are aggregate functions in SQL?",
    answer:
      "Aggregate functions calculate a summary value from multiple rows. Common aggregate functions include COUNT(), SUM(), AVG(), MIN(), and MAX(). Example: SELECT AVG(price) FROM products;",
    keyTakeaway:
      "Aggregate functions summarize data across multiple rows.",
  },

  {
    id: 2,
    question: "What does COUNT(*) do?",
    answer:
      "COUNT(*) counts the number of rows returned by a query. Example: SELECT COUNT(*) FROM orders;",
    keyTakeaway:
      "COUNT(*) = count rows.",
  },

  {
    id: 3,
    question: "What is the difference between COUNT(*) and COUNT(column)?",
    answer:
      "COUNT(*) counts rows, while COUNT(column) counts only non-NULL values in that column. Example: SELECT COUNT(email) FROM customers;",
    keyTakeaway:
      "COUNT(*) counts rows; COUNT(column) ignores NULL values.",
  },

  {
    id: 4,
    question: "What does SUM() do in SQL?",
    answer:
      "SUM() adds together the numeric values in a column. Example: SELECT SUM(amount) FROM orders;",
    keyTakeaway:
      "SUM() = calculate a total.",
  },

  {
    id: 5,
    question: "What does AVG() do in SQL?",
    answer:
      "AVG() calculates the arithmetic mean of the non-NULL numeric values in a column. Example: SELECT AVG(score) FROM exams;",
    keyTakeaway:
      "AVG() = calculate the average.",
  },

  {
    id: 6,
    question: "What does MIN() do in SQL?",
    answer:
      "MIN() returns the smallest value in a column. Example: SELECT MIN(price) FROM products;",
    keyTakeaway:
      "MIN() = find the smallest value.",
  },

  {
    id: 7,
    question: "What does MAX() do in SQL?",
    answer:
      "MAX() returns the largest value in a column. Example: SELECT MAX(salary) FROM employees;",
    keyTakeaway:
      "MAX() = find the largest value.",
  },
];

/* =========================================================
   RECOGNIZE
========================================================= */

export const recognitionTasks = [
  {
    id: 1,

    question:
      "Which query tells you how many orders are stored in the orders table?",

    options: [
      {
        id: "a",
        label:
          "SELECT COUNT(*) FROM orders;",
      },
      {
        id: "b",
        label:
          "SELECT SUM(*) FROM orders;",
      },
      {
        id: "c",
        label:
          "SELECT orders FROM COUNT(*);",
      },
    ],

    correctAnswer: "a",

    hint:
      "You need to count rows, not add numeric values. Which aggregate function counts records?",

    explanation:
      "COUNT(*) counts every row in the orders table.",
  },

  {
    id: 2,

    question:
      "Which query calculates the average exam score?",

    options: [
      {
        id: "a",
        label:
          "SELECT SUM(score) FROM exams;",
      },
      {
        id: "b",
        label:
          "SELECT AVG(score) FROM exams;",
      },
      {
        id: "c",
        label:
          "SELECT MAX(score) FROM exams;",
      },
    ],

    correctAnswer: "b",

    hint:
      "The question asks for the arithmetic mean rather than the total or highest value.",

    explanation:
      "AVG(score) calculates the average of the score values.",
  },

  {
    id: 3,

    question:
      "Which query finds the most expensive product?",

    options: [
      {
        id: "a",
        label:
          "SELECT MIN(price) FROM products;",
      },
      {
        id: "b",
        label:
          "SELECT AVG(price) FROM products;",
      },
      {
        id: "c",
        label:
          "SELECT MAX(price) FROM products;",
      },
    ],

    correctAnswer: "c",

    hint:
      "You need the largest value in the price column.",

    explanation:
      "MAX(price) returns the largest price value.",
  },
];

/* =========================================================
   BUILD
========================================================= */

export const builderTasks = [
  {
    id: 1,

    prompt:
      "Build a query that counts all customers.",

    pieces: [
      "customers",
      "COUNT(*)",
      "SELECT",
      "FROM",
    ],

    answer: [
      "SELECT",
      "COUNT(*)",
      "FROM",
      "customers",
    ],

    hint:
      "Use COUNT(*) after SELECT because you want the number of rows. Then identify the customers table with FROM.",

    explanation:
      "COUNT(*) counts every row in the customers table.",
  },

  {
    id: 2,

    prompt:
      "Build a query that calculates the total amount of all orders.",

    pieces: [
      "orders",
      "SUM(amount)",
      "FROM",
      "SELECT",
    ],

    answer: [
      "SELECT",
      "SUM(amount)",
      "FROM",
      "orders",
    ],

    hint:
      "You need to add all values in the amount column. Use SUM() around that column.",

    explanation:
      "SUM(amount) adds together the values stored in the amount column.",
  },

  {
    id: 3,

    prompt:
      "Build a query that returns both the lowest and highest product price.",

    pieces: [
      "MAX(price)",
      "products",
      "MIN(price),",
      "SELECT",
      "FROM",
    ],

    answer: [
      "SELECT",
      "MIN(price),",
      "MAX(price)",
      "FROM",
      "products",
    ],

    hint:
      "You need two summary values in the same SELECT clause. Use MIN() for the lowest price and MAX() for the highest price.",

    explanation:
      "The query calculates two aggregate values: the minimum price and the maximum price.",
  },
];

/* =========================================================
   APPLY — SQL DETECTIVE
========================================================= */

export const detectiveTasks = [
  {
    id: 1,

    title: "The Revenue Question",

    scenario:
      "A store manager wants to know the total value of all completed sales recorded in the sales table.",

    question:
      "Which query best answers the manager's question?",

    options: [
      {
        id: "a",
        label:
          "SELECT COUNT(amount) FROM sales;",
      },
      {
        id: "b",
        label:
          "SELECT SUM(amount) FROM sales;",
      },
      {
        id: "c",
        label:
          "SELECT AVG(amount) FROM sales;",
      },
    ],

    correctAnswer: "b",

    hint:
      "The manager wants the combined total of all sale amounts, not the number of sales or their average.",

    explanation:
      "SUM(amount) adds every sale amount together to calculate total revenue.",
  },

  {
    id: 2,

    title: "The Salary Benchmark",

    scenario:
      "Human Resources wants a single number representing the typical salary level across all employees.",

    question:
      "Which query provides the most useful summary?",

    options: [
      {
        id: "a",
        label:
          "SELECT AVG(salary) FROM employees;",
      },
      {
        id: "b",
        label:
          "SELECT MAX(salary) FROM employees;",
      },
      {
        id: "c",
        label:
          "SELECT COUNT(*) FROM employees;",
      },
    ],

    correctAnswer: "a",

    hint:
      "The question asks for a summary of the salary values overall, rather than the highest salary or employee count.",

    explanation:
      "AVG(salary) calculates the arithmetic mean of employee salaries.",
  },
];

/* =========================================================
   ANALYZE — SQL CASE FILE
========================================================= */

export const caseFiles = [
  {
    id: 1,

    title: "Understanding the Result",

    scenario:
      "An analyst runs: SELECT COUNT(*) FROM support_tickets; and receives the value 248.",

    question:
      "What does 248 represent?",

    options: [
      {
        id: "a",
        label:
          "The total number of rows in support_tickets.",
      },
      {
        id: "b",
        label:
          "The average ticket number.",
      },
      {
        id: "c",
        label:
          "The highest ticket ID.",
      },
    ],

    correctAnswer: "a",

    hint:
      "COUNT(*) counts rows rather than calculating with the values inside a particular numeric column.",

    explanation:
      "The result 248 means the query counted 248 rows in the support_tickets table.",
  },

  {
    id: 2,

    title: "Comparing Summary Measures",

    scenario:
      "A product analyst runs: SELECT MIN(price), MAX(price) FROM products;",

    question:
      "What information does this query provide?",

    options: [
      {
        id: "a",
        label:
          "The total and average product price.",
      },
      {
        id: "b",
        label:
          "The lowest and highest product prices.",
      },
      {
        id: "c",
        label:
          "The number of products and their total value.",
      },
    ],

    correctAnswer: "b",

    hint:
      "MIN() finds the smallest value and MAX() finds the largest value.",

    explanation:
      "The query returns two summary values: the lowest price and the highest price.",
  },
];

/* =========================================================
   CHALLENGE — PREDICT
========================================================= */

export const challengeTasks = [
  {
    id: 1,

    query: `
SELECT AVG(rating)
FROM reviews;
`,

    question:
      "What type of result will this query produce?",

    options: [
      {
        id: "a",
        label:
          "One summary value representing the average rating.",
      },
      {
        id: "b",
        label:
          "Every individual review rating.",
      },
      {
        id: "c",
        label:
          "Only the highest rating.",
      },
    ],

    correctAnswer: "a",

    hint:
      "AVG() combines many numeric values into one arithmetic mean.",

    explanation:
      "AVG(rating) returns one summary value representing the average of the rating values.",
  },

  {
    id: 2,

    query: `
SELECT SUM(quantity)
FROM order_items;
`,

    question:
      "What does the result represent?",

    options: [
      {
        id: "a",
        label:
          "The number of rows in order_items.",
      },
      {
        id: "b",
        label:
          "The total quantity across all order items.",
      },
      {
        id: "c",
        label:
          "The largest quantity in one row.",
      },
    ],

    correctAnswer: "b",

    hint:
      "SUM() adds the values inside the selected numeric column.",

    explanation:
      "SUM(quantity) adds all quantity values and produces their total.",
  },

  {
    id: 3,

    query: `
SELECT COUNT(email)
FROM customers;
`,

    question:
      "If some customers have NULL in the email column, what will COUNT(email) count?",

    options: [
      {
        id: "a",
        label:
          "Every customer row, including NULL emails.",
      },
      {
        id: "b",
        label:
          "Only rows where email is not NULL.",
      },
      {
        id: "c",
        label:
          "Only rows where email is NULL.",
      },
    ],

    correctAnswer: "b",

    hint:
      "COUNT(column) behaves differently from COUNT(*). It ignores NULL values in that column.",

    explanation:
      "COUNT(email) counts only non-NULL email values. COUNT(*) would count every row.",
  },
];