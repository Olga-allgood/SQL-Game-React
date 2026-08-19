export const filteringCards = [
  {
    id: 1,
    question: "What does WHERE do in SQL?",
    answer:
      "WHERE filters rows based on a condition. Example: SELECT name, age FROM employees WHERE age > 30;",
    keyTakeaway:
      "WHERE = keep only rows that match a condition.",
  },

  {
    id: 2,
    question: "How do comparison operators work in SQL?",
    answer:
      "Comparison operators compare values. Common operators include =, >, <, >=, <=, and <> or !=. Example: SELECT product_name, price FROM products WHERE price >= 50;",
    keyTakeaway:
      "Comparison operators help define filtering conditions.",
  },

  {
    id: 3,
    question: "What does AND do in a WHERE clause?",
    answer:
      "AND combines conditions and requires all of them to be true. Example: SELECT name, score FROM students WHERE score >= 80 AND age >= 18;",
    keyTakeaway:
      "AND = every condition must be true.",
  },

  {
    id: 4,
    question: "What does OR do in a WHERE clause?",
    answer:
      "OR combines conditions and requires at least one of them to be true. Example: SELECT title, category FROM books WHERE category = 'History' OR category = 'Science';",
    keyTakeaway:
      "OR = at least one condition must be true.",
  },

  {
    id: 5,
    question: "What does NOT do in SQL?",
    answer:
      "NOT reverses a condition. Example: SELECT product_name FROM products WHERE NOT category = 'Electronics';",
    keyTakeaway:
      "NOT = exclude rows that match a condition.",
  },

  {
    id: 6,
    question: "What does BETWEEN do in SQL?",
    answer:
      "BETWEEN filters values inside an inclusive range. Example: SELECT title, price FROM books WHERE price BETWEEN 10 AND 25;",
    keyTakeaway:
      "BETWEEN includes both the lower and upper boundaries.",
  },

  {
    id: 7,
    question: "What does IN do in SQL?",
    answer:
      "IN checks whether a value matches one of several specified values. Example: SELECT name, department FROM employees WHERE department IN ('Sales', 'Marketing');",
    keyTakeaway:
      "IN = match one value from a list.",
  },

  {
    id: 8,
    question: "What does LIKE do in SQL?",
    answer:
      "LIKE searches for text patterns. The % wildcard represents zero or more characters. Example: SELECT first_name, email FROM customers WHERE first_name LIKE 'A%';",
    keyTakeaway:
      "LIKE = filter text using a pattern.",
  },
];

/* =========================================================
   RECOGNIZE
========================================================= */

export const recognitionTasks = [
  {
    id: 1,

    question:
      "Which query returns products that cost more than 100?",

    options: [
      {
        id: "a",
        label:
          "SELECT product_name, price FROM products WHERE price > 100;",
      },
      {
        id: "b",
        label:
          "SELECT product_name, price FROM products;",
      },
      {
        id: "c",
        label:
          "SELECT product_name, price WHERE products > 100;",
      },
    ],

    correctAnswer: "a",

    hint:
      "You need a condition that compares the price column with 100. Look for WHERE followed by price > 100.",

    explanation:
      "WHERE price > 100 keeps only rows where the price is greater than 100.",
  },

  {
    id: 2,

    question:
      "Which query returns employees who work in Sales or Marketing?",

    options: [
      {
        id: "a",
        label:
          "SELECT name, department FROM employees WHERE department = 'Sales' AND department = 'Marketing';",
      },
      {
        id: "b",
        label:
          "SELECT name, department FROM employees WHERE department = 'Sales' OR department = 'Marketing';",
      },
      {
        id: "c",
        label:
          "SELECT name, department FROM employees WHERE department > 'Sales';",
      },
    ],

    correctAnswer: "b",

    hint:
      "One employee can belong to either department. Which logical operator allows either condition to be true?",

    explanation:
      "OR is appropriate because either department can satisfy the condition.",
  },

  {
    id: 3,

    question:
      "Which query returns books priced from 10 through 25, including both endpoints?",

    options: [
      {
        id: "a",
        label:
          "SELECT title, price FROM books WHERE price BETWEEN 10 AND 25;",
      },
      {
        id: "b",
        label:
          "SELECT title, price FROM books WHERE price = 10 OR 25;",
      },
      {
        id: "c",
        label:
          "SELECT title, price FROM books WHERE price NOT 10 AND 25;",
      },
    ],

    correctAnswer: "a",

    hint:
      "You need an inclusive range. Think about the SQL keyword specifically designed for a lower and upper boundary.",

    explanation:
      "BETWEEN 10 AND 25 includes values from 10 through 25, including both endpoints.",
  },
];

/* =========================================================
   BUILD
========================================================= */

export const builderTasks = [
  {
    id: 1,

    prompt:
      "Build a query that returns the product_name and price of products costing more than 50.",

    pieces: [
      "price > 50",
      "FROM",
      "product_name,",
      "products",
      "SELECT",
      "price",
      "WHERE",
    ],

    answer: [
      "SELECT",
      "product_name,",
      "price",
      "FROM",
      "products",
      "WHERE",
      "price > 50",
    ],

    hint:
      "First select the two requested columns. Then identify the products table. Finally add WHERE with the price condition.",

    explanation:
      "The query selects product_name and price, then filters the products table to rows where price is greater than 50.",
  },

  {
    id: 2,

    prompt:
      "Build a query that returns the name and score of students whose score is at least 80 and whose age is at least 18.",

    pieces: [
      "score >= 80",
      "students",
      "AND",
      "SELECT",
      "name,",
      "WHERE",
      "score",
      "FROM",
      "age >= 18",
    ],

    answer: [
      "SELECT",
      "name,",
      "score",
      "FROM",
      "students",
      "WHERE",
      "score >= 80",
      "AND",
      "age >= 18",
    ],

    hint:
      "Both conditions must be true, so use AND between the score and age conditions.",

    explanation:
      "AND requires both score >= 80 and age >= 18 to be true for a row to be returned.",
  },

  {
    id: 3,

    prompt:
      "Build a query that returns title and category for books in either History or Science.",

    pieces: [
      "category = 'History'",
      "SELECT",
      "OR",
      "title,",
      "FROM",
      "category",
      "WHERE",
      "books",
      "category = 'Science'",
    ],

    answer: [
      "SELECT",
      "title,",
      "category",
      "FROM",
      "books",
      "WHERE",
      "category = 'History'",
      "OR",
      "category = 'Science'",
    ],

    hint:
      "Because either category is acceptable, use OR between the two category conditions.",

    explanation:
      "OR allows a book to match either History or Science.",
  },
];

/* =========================================================
   APPLY — SQL DETECTIVE
========================================================= */

export const detectiveTasks = [
  {
    id: 1,

    title: "The Discount Candidates",

    scenario:
      "A store manager wants to review products that cost 20 dollars or less before deciding which items to discount.",

    question:
      "Which query correctly identifies those products?",

    options: [
      {
        id: "a",
        label:
          "SELECT product_name, price FROM products WHERE price <= 20;",
      },
      {
        id: "b",
        label:
          "SELECT product_name, price FROM products WHERE price >= 20;",
      },
      {
        id: "c",
        label:
          "SELECT product_name, price FROM products;",
      },
    ],

    correctAnswer: "a",

    hint:
      "The phrase '20 dollars or less' means values can be below 20 or exactly 20. Which comparison operator expresses that?",

    explanation:
      "<= includes values below 20 as well as values equal to 20.",
  },

  {
    id: 2,

    title: "The Regional Mailing List",

    scenario:
      "A company needs a mailing list for customers who live in either Seattle, Portland, or San Francisco.",

    question:
      "Which query is the clearest way to filter those cities?",

    options: [
      {
        id: "a",
        label:
          "SELECT first_name, city FROM customers WHERE city IN ('Seattle', 'Portland', 'San Francisco');",
      },
      {
        id: "b",
        label:
          "SELECT first_name, city FROM customers WHERE city BETWEEN 'Seattle' AND 'San Francisco';",
      },
      {
        id: "c",
        label:
          "SELECT first_name, city FROM customers WHERE city > 'Seattle';",
      },
    ],

    correctAnswer: "a",

    hint:
      "The filter needs to match one value from a specific list of three cities. Which SQL operator is designed for that?",

    explanation:
      "IN is ideal when a column can match one value from a specific list.",
  },
];

/* =========================================================
   ANALYZE — CASE FILE
========================================================= */

export const caseFiles = [
  {
    id: 1,

    title: "The Scholarship Review",

    scenario:
      "A scholarship program uses this query: SELECT name, score FROM students WHERE score >= 90 AND attendance >= 95;",

    question:
      "What must be true for a student to appear in the result?",

    options: [
      {
        id: "a",
        label:
          "The student must have either a score of at least 90 or attendance of at least 95.",
      },
      {
        id: "b",
        label:
          "The student must have both a score of at least 90 and attendance of at least 95.",
      },
      {
        id: "c",
        label:
          "Every student will appear.",
      },
    ],

    correctAnswer: "b",

    hint:
      "Focus on the logical operator connecting the two conditions. AND requires both conditions to be satisfied.",

    explanation:
      "AND means both conditions must be true: score >= 90 and attendance >= 95.",
  },

  {
    id: 2,

    title: "The Search Pattern",

    scenario:
      "A customer database uses this query: SELECT first_name, email FROM customers WHERE first_name LIKE 'A%';",

    question:
      "Which customers will this query return?",

    options: [
      {
        id: "a",
        label:
          "Customers whose first names begin with A.",
      },
      {
        id: "b",
        label:
          "Customers whose first names end with A.",
      },
      {
        id: "c",
        label:
          "Customers whose names contain exactly one letter.",
      },
    ],

    correctAnswer: "a",

    hint:
      "In the pattern 'A%', the A must come first. The % wildcard can represent any characters that follow it.",

    explanation:
      "LIKE 'A%' matches text beginning with A followed by zero or more characters.",
  },
];

/* =========================================================
   CHALLENGE — PREDICT
========================================================= */

export const challengeTasks = [
  {
    id: 1,

    query: `
SELECT title, price
FROM books
WHERE price BETWEEN 15 AND 30;
`,

    question:
      "Which description best matches the rows returned by this query?",

    options: [
      {
        id: "a",
        label:
          "Books priced from 15 through 30, including 15 and 30.",
      },
      {
        id: "b",
        label:
          "Books priced below 15 or above 30.",
      },
      {
        id: "c",
        label:
          "Only books priced exactly 15 or exactly 30.",
      },
    ],

    correctAnswer: "a",

    hint:
      "BETWEEN defines an inclusive range. Both boundary values are included.",

    explanation:
      "BETWEEN 15 AND 30 includes every value from 15 through 30, including both endpoints.",
  },

  {
    id: 2,

    query: `
SELECT employee_name, department
FROM employees
WHERE department != 'Sales';
`,

    question:
      "Which employees will appear in the result?",

    options: [
      {
        id: "a",
        label:
          "Only employees in Sales.",
      },
      {
        id: "b",
        label:
          "Employees whose department is not Sales.",
      },
      {
        id: "c",
        label:
          "All employees regardless of department.",
      },
    ],

    correctAnswer: "b",

    hint:
      "The != operator means 'not equal to.' Think about which rows remain when Sales is excluded.",

    explanation:
      "department != 'Sales' filters out Sales employees and keeps employees from other departments.",
  },

  {
    id: 3,

    query: `
SELECT first_name, city
FROM customers
WHERE city = 'Seattle'
   OR city = 'Portland';
`,

    question:
      "Which customers are included?",

    options: [
      {
        id: "a",
        label:
          "Only customers who somehow live in both Seattle and Portland.",
      },
      {
        id: "b",
        label:
          "Customers who live in Seattle or Portland.",
      },
      {
        id: "c",
        label:
          "Customers who live outside Seattle and Portland.",
      },
    ],

    correctAnswer: "b",

    hint:
      "OR means only one of the conditions needs to be true.",

    explanation:
      "A customer is included if city equals Seattle or city equals Portland.",
  },
];