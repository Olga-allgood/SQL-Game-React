export const sortingCards = [
  {
    id: 1,
    question: "What does ORDER BY do in SQL?",
    answer:
      "ORDER BY sorts query results using one or more columns. Example: SELECT product_name, price FROM products ORDER BY price;",
    keyTakeaway:
      "ORDER BY = sort the rows returned by a query.",
  },

  {
    id: 2,
    question: "What does ASC mean in SQL?",
    answer:
      "ASC sorts values in ascending order. Numbers go from smallest to largest, and text is generally sorted alphabetically. Example: SELECT title, year FROM books ORDER BY year ASC;",
    keyTakeaway:
      "ASC = ascending order.",
  },

  {
    id: 3,
    question: "What does DESC mean in SQL?",
    answer:
      "DESC sorts values in descending order. Numbers go from largest to smallest. Example: SELECT employee_name, salary FROM employees ORDER BY salary DESC;",
    keyTakeaway:
      "DESC = descending order.",
  },

  {
    id: 4,
    question: "What does LIMIT do in SQL?",
    answer:
      "LIMIT restricts the number of rows returned by a query. Example: SELECT product_name, price FROM products ORDER BY price DESC LIMIT 5;",
    keyTakeaway:
      "LIMIT = control how many rows are returned.",
  },

  {
    id: 5,
    question: "What does DISTINCT do in SQL?",
    answer:
      "DISTINCT removes duplicate combinations from the selected columns. Example: SELECT DISTINCT department FROM employees;",
    keyTakeaway:
      "DISTINCT = return unique results.",
  },

  {
    id: 6,
    question: "How do ORDER BY and LIMIT work together?",
    answer:
      "ORDER BY determines the ranking of rows, while LIMIT keeps only a specified number of rows from that sorted result. Example: SELECT title, rating FROM movies ORDER BY rating DESC LIMIT 3;",
    keyTakeaway:
      "ORDER BY ranks the rows; LIMIT chooses how many to keep.",
  },
];

/* =========================================================
   RECOGNIZE
========================================================= */

export const recognitionTasks = [
  {
    id: 1,

    question:
      "Which query lists products from the lowest price to the highest price?",

    options: [
      {
        id: "a",
        label:
          "SELECT product_name, price FROM products ORDER BY price ASC;",
      },
      {
        id: "b",
        label:
          "SELECT product_name, price FROM products ORDER BY price DESC;",
      },
      {
        id: "c",
        label:
          "SELECT product_name, price FROM products LIMIT 1;",
      },
    ],

    correctAnswer: "a",

    hint:
      "You want the smallest prices first. ASC means ascending, so values move from low to high.",

    explanation:
      "ORDER BY price ASC sorts the products from the lowest price to the highest price.",
  },

  {
    id: 2,

    question:
      "Which query returns the three highest-paid employees?",

    options: [
      {
        id: "a",
        label:
          "SELECT employee_name, salary FROM employees ORDER BY salary ASC LIMIT 3;",
      },
      {
        id: "b",
        label:
          "SELECT employee_name, salary FROM employees ORDER BY salary DESC LIMIT 3;",
      },
      {
        id: "c",
        label:
          "SELECT employee_name, salary FROM employees LIMIT 3;",
      },
    ],

    correctAnswer: "b",

    hint:
      "The largest salaries need to appear first, so sort salary in descending order before limiting the result.",

    explanation:
      "DESC places the largest salaries first, and LIMIT 3 keeps only the top three rows.",
  },

  {
    id: 3,

    question:
      "Which query returns each department only once?",

    options: [
      {
        id: "a",
        label:
          "SELECT department FROM employees;",
      },
      {
        id: "b",
        label:
          "SELECT DISTINCT department FROM employees;",
      },
      {
        id: "c",
        label:
          "SELECT department FROM employees ORDER BY department;",
      },
    ],

    correctAnswer: "b",

    hint:
      "The goal is to remove repeated department values, not just sort them.",

    explanation:
      "DISTINCT removes duplicate department values from the result.",
  },
];

/* =========================================================
   BUILD
========================================================= */

export const builderTasks = [
  {
    id: 1,

    prompt:
      "Build a query that returns book titles and publication years from newest to oldest.",

    pieces: [
      "DESC",
      "books",
      "publication_year",
      "SELECT",
      "title,",
      "FROM",
      "ORDER BY",
      "publication_year",
    ],

    answer: [
      "SELECT",
      "title,",
      "publication_year",
      "FROM",
      "books",
      "ORDER BY",
      "publication_year",
      "DESC",
    ],

    hint:
      "Select title and publication_year first. Then sort publication_year from largest to smallest using DESC.",

    explanation:
      "ORDER BY publication_year DESC places the newest publication years first.",
  },

  {
    id: 2,

    prompt:
      "Build a query that returns the five cheapest products.",

    pieces: [
      "price",
      "LIMIT",
      "5",
      "products",
      "ASC",
      "product_name,",
      "FROM",
      "ORDER BY",
      "SELECT",
    ],

    answer: [
      "SELECT",
      "product_name,",
      "price",
      "FROM",
      "products",
      "ORDER BY",
      "price",
      "ASC",
      "LIMIT",
      "5",
    ],

    hint:
      "Sort price from smallest to largest first. Then use LIMIT to keep only five rows.",

    explanation:
      "ORDER BY price ASC puts the cheapest products first, and LIMIT 5 keeps the first five.",
  },

  {
    id: 3,

    prompt:
      "Build a query that returns each unique department from employees.",

    pieces: [
      "department",
      "employees",
      "DISTINCT",
      "SELECT",
      "FROM",
    ],

    answer: [
      "SELECT",
      "DISTINCT",
      "department",
      "FROM",
      "employees",
    ],

    hint:
      "DISTINCT goes after SELECT and before the column whose repeated values you want to remove.",

    explanation:
      "SELECT DISTINCT department returns each department only once.",
  },
];

/* =========================================================
   APPLY — SQL DETECTIVE
========================================================= */

export const detectiveTasks = [
  {
    id: 1,

    title: "The Bestseller Display",

    scenario:
      "A bookstore wants to feature the four books with the highest sales totals.",

    question:
      "Which query best answers the request?",

    options: [
      {
        id: "a",
        label:
          "SELECT title, sales FROM books ORDER BY sales DESC LIMIT 4;",
      },
      {
        id: "b",
        label:
          "SELECT title, sales FROM books ORDER BY sales ASC LIMIT 4;",
      },
      {
        id: "c",
        label:
          "SELECT title, sales FROM books LIMIT 4;",
      },
    ],

    correctAnswer: "a",

    hint:
      "The highest sales need to appear first. Then the result should be restricted to four rows.",

    explanation:
      "ORDER BY sales DESC ranks the largest sales first, and LIMIT 4 keeps only the top four.",
  },

  {
    id: 2,

    title: "The Customer Regions",

    scenario:
      "A marketing analyst wants to see which different cities appear in the customer database without repeated city names.",

    question:
      "Which query is most appropriate?",

    options: [
      {
        id: "a",
        label:
          "SELECT city FROM customers;",
      },
      {
        id: "b",
        label:
          "SELECT DISTINCT city FROM customers;",
      },
      {
        id: "c",
        label:
          "SELECT city FROM customers LIMIT 1;",
      },
    ],

    correctAnswer: "b",

    hint:
      "The analyst wants unique city values, so repeated values need to be removed.",

    explanation:
      "DISTINCT removes repeated city values and returns each city only once.",
  },
];

/* =========================================================
   ANALYZE — CASE FILE
========================================================= */

export const caseFiles = [
  {
    id: 1,

    title: "The Leaderboard",

    scenario:
      "A dashboard uses this query: SELECT student_name, score FROM results ORDER BY score DESC LIMIT 10;",

    question:
      "What is the query designed to produce?",

    options: [
      {
        id: "a",
        label:
          "The ten lowest scores.",
      },
      {
        id: "b",
        label:
          "The ten highest scores.",
      },
      {
        id: "c",
        label:
          "Ten random scores.",
      },
    ],

    correctAnswer: "b",

    hint:
      "DESC puts larger score values first. LIMIT 10 then keeps the first ten rows.",

    explanation:
      "ORDER BY score DESC ranks the highest scores first, and LIMIT 10 returns the top ten.",
  },

  {
    id: 2,

    title: "The Course Catalog",

    scenario:
      "An analyst runs: SELECT DISTINCT category FROM courses ORDER BY category ASC;",

    question:
      "What happens to the query result?",

    options: [
      {
        id: "a",
        label:
          "Duplicate categories are removed, then the remaining categories are sorted alphabetically.",
      },
      {
        id: "b",
        label:
          "Only one category is returned.",
      },
      {
        id: "c",
        label:
          "Categories are sorted from Z to A and duplicates remain.",
      },
    ],

    correctAnswer: "a",

    hint:
      "Think about the two operations separately: DISTINCT affects duplicates, while ASC affects sorting.",

    explanation:
      "DISTINCT removes repeated categories, and ORDER BY category ASC sorts the unique values in ascending order.",
  },
];

/* =========================================================
   CHALLENGE — PREDICT
========================================================= */

export const challengeTasks = [
  {
    id: 1,

    query: `
SELECT employee_name, salary
FROM employees
ORDER BY salary DESC
LIMIT 2;
`,

    question:
      "Which rows will this query return?",

    options: [
      {
        id: "a",
        label:
          "The two employees with the highest salaries.",
      },
      {
        id: "b",
        label:
          "The two employees with the lowest salaries.",
      },
      {
        id: "c",
        label:
          "Any two employees.",
      },
    ],

    correctAnswer: "a",

    hint:
      "DESC places the largest salaries first. LIMIT 2 keeps the first two rows after sorting.",

    explanation:
      "The query ranks salaries from highest to lowest and returns only the first two employees.",
  },

  {
    id: 2,

    query: `
SELECT DISTINCT category
FROM products;
`,

    question:
      "What will the result contain?",

    options: [
      {
        id: "a",
        label:
          "Every product and its category.",
      },
      {
        id: "b",
        label:
          "Each unique product category once.",
      },
      {
        id: "c",
        label:
          "Only the first category.",
      },
    ],

    correctAnswer: "b",

    hint:
      "DISTINCT removes repeated values from the selected column.",

    explanation:
      "The query returns each unique category once.",
  },

  {
    id: 3,

    query: `
SELECT course_name, start_date
FROM courses
ORDER BY start_date ASC
LIMIT 1;
`,

    question:
      "Which course will appear in the result?",

    options: [
      {
        id: "a",
        label:
          "The course with the earliest start date.",
      },
      {
        id: "b",
        label:
          "The course with the latest start date.",
      },
      {
        id: "c",
        label:
          "Every course.",
      },
    ],

    correctAnswer: "a",

    hint:
      "ASC places earlier dates first, and LIMIT 1 keeps only the first row.",

    explanation:
      "Sorting start_date in ascending order places the earliest date first, and LIMIT 1 returns that course.",
  },
];