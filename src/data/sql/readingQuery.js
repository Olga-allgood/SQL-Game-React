// src/data/sql/readingQuery.js

export const readingQueryCards = [
  {
    id: 1,
    question: "What does SELECT do in SQL?",
    answer:
      "SELECT specifies which columns you want to retrieve from a table. Example: SELECT title, author FROM books;",
    keyTakeaway:
      "SELECT = choose which columns appear in the result.",
  },

  {
    id: 2,
    question: "What does FROM do in SQL?",
    answer:
      "FROM identifies the table containing the data. Example: SELECT product_name FROM products;",
    keyTakeaway:
      "FROM = identify where the data comes from.",
  },

  {
    id: 3,
    question: "What does SELECT * mean?",
    answer:
      "SELECT * retrieves every column from a table. Example: SELECT * FROM courses;",
    keyTakeaway:
      "* = all columns.",
  },

  {
    id: 4,
    question:
      "How do you select more than one column?",
    answer:
      "Separate the column names with commas after SELECT. Example: SELECT first_name, email FROM customers;",
    keyTakeaway:
      "Use commas to select multiple columns.",
  },
];

/* =========================================================
   RECOGNIZE
========================================================= */

export const recognitionTasks = [
  {
    id: 1,

    question:
      "Which query retrieves only the title of each book?",

    options: [
      {
        id: "a",
        label: "SELECT * FROM books;",
      },
      {
        id: "b",
        label: "SELECT title FROM books;",
      },
      {
        id: "c",
        label: "FROM books SELECT title;",
      },
    ],

    correctAnswer: "b",

    hint:
      "The result should contain only one column. Look for the query where SELECT is followed by title.",

    explanation:
      "SELECT title requests only the title column, while FROM books identifies the source table.",
  },

  {
    id: 2,

    question:
      "Which query retrieves both product_name and price from products?",

    options: [
      {
        id: "a",
        label:
          "SELECT product_name, price FROM products;",
      },
      {
        id: "b",
        label:
          "SELECT * FROM products;",
      },
      {
        id: "c",
        label:
          "SELECT products FROM product_name, price;",
      },
    ],

    correctAnswer: "a",

    hint:
      "When you need two specific columns, place both column names after SELECT and separate them with a comma.",

    explanation:
      "SELECT product_name, price requests exactly those two columns from the products table.",
  },

  {
    id: 3,

    question:
      "Which query retrieves every column from courses?",

    options: [
      {
        id: "a",
        label:
          "SELECT course_name FROM courses;",
      },
      {
        id: "b",
        label:
          "SELECT * FROM courses;",
      },
      {
        id: "c",
        label:
          "SELECT courses;",
      },
    ],

    correctAnswer: "b",

    hint:
      "You do not need to name individual columns when you want every column. Look for the special symbol that means all columns.",

    explanation:
      "SELECT * retrieves every column from the courses table.",
  },
];

/* =========================================================
   BUILD
========================================================= */

export const builderTasks = [
  {
    id: 1,

    prompt:
      "Build a query that retrieves all columns from courses.",

    pieces: [
      "courses",
      "*",
      "FROM",
      "SELECT",
    ],

    answer: [
      "SELECT",
      "*",
      "FROM",
      "courses",
    ],

    hint:
      "Start with SELECT. Use * because every column is needed. Then use FROM followed by the table name.",

    explanation:
      "SELECT * requests every column, and FROM courses identifies the source table.",
  },

  {
    id: 2,

    prompt:
      "Build a query that retrieves the product_name column from products.",

    pieces: [
      "products",
      "product_name",
      "SELECT",
      "FROM",
    ],

    answer: [
      "SELECT",
      "product_name",
      "FROM",
      "products",
    ],

    hint:
      "Think: What information do I need? product_name. Where does it come from? products.",

    explanation:
      "SELECT product_name chooses the column, and FROM products identifies the table.",
  },

  {
    id: 3,

    prompt:
      "Build a query that retrieves first_name and email from customers.",

    pieces: [
      "FROM",
      "email",
      "customers",
      "SELECT",
      "first_name,",
    ],

    answer: [
      "SELECT",
      "first_name,",
      "email",
      "FROM",
      "customers",
    ],

    hint:
      "Both requested columns must appear after SELECT. Separate the column names with a comma, then add FROM and the table name.",

    explanation:
      "SELECT first_name, email retrieves two specific columns from customers.",
  },
];

/* =========================================================
   APPLY — SQL DETECTIVE
========================================================= */

export const detectiveTasks = [
  {
    id: 1,

    title: "The Library Report",

    scenario:
      "A librarian needs a report containing each book's title and author, but no other information.",

    question:
      "Which query best solves the request?",

    options: [
      {
        id: "a",
        label:
          "SELECT title, author FROM books;",
      },
      {
        id: "b",
        label:
          "SELECT * FROM books;",
      },
      {
        id: "c",
        label:
          "SELECT books FROM title, author;",
      },
    ],

    correctAnswer: "a",

    hint:
      "The librarian needs exactly two columns. Look for the query that names both requested columns after SELECT.",

    explanation:
      "SELECT title, author returns exactly the two requested columns from the books table.",
  },

  {
    id: 2,

    title: "The Product Export",

    scenario:
      "A store manager wants to export every field currently stored for every product.",

    question:
      "Which query should the manager use?",

    options: [
      {
        id: "a",
        label:
          "SELECT product_name FROM products;",
      },
      {
        id: "b",
        label:
          "SELECT product_name, price FROM products;",
      },
      {
        id: "c",
        label:
          "SELECT * FROM products;",
      },
    ],

    correctAnswer: "c",

    hint:
      "The manager wants all available fields, not one or two selected columns.",

    explanation:
      "SELECT * returns all columns stored in products.",
  },
];

/* =========================================================
   ANALYZE — CASE FILE
========================================================= */

export const caseFiles = [
  {
    id: 1,

    title: "The Employee List",

    scenario:
      "You find this query in a report: SELECT first_name, department FROM employees;",

    question:
      "What does SELECT first_name, department tell you?",

    options: [
      {
        id: "a",
        label:
          "The result will contain first_name and department.",
      },
      {
        id: "b",
        label:
          "The data comes from two tables.",
      },
      {
        id: "c",
        label:
          "Every column will be returned.",
      },
    ],

    correctAnswer: "a",

    hint:
      "Focus only on the part after SELECT. Those names determine which columns appear in the result.",

    explanation:
      "SELECT first_name, department tells SQL to return those two columns.",
  },

  {
    id: 2,

    title: "Tracing the Source",

    scenario:
      "An analyst is reviewing this query: SELECT city, population FROM cities;",

    question:
      "What does FROM cities tell you?",

    options: [
      {
        id: "a",
        label:
          "The result contains only city.",
      },
      {
        id: "b",
        label:
          "The requested data comes from the cities table.",
      },
      {
        id: "c",
        label:
          "Every column from cities is returned.",
      },
    ],

    correctAnswer: "b",

    hint:
      "FROM answers the question: Which table contains the data being requested?",

    explanation:
      "FROM cities identifies cities as the table that supplies the data.",
  },
];

/* =========================================================
   CHALLENGE — PREDICT
========================================================= */

export const challengeTasks = [
  {
    id: 1,

    query: `
SELECT title, author
FROM books;
`,

    question:
      "Which columns will appear in the result?",

    options: [
      {
        id: "a",
        label:
          "title and author",
      },
      {
        id: "b",
        label:
          "all columns from books",
      },
      {
        id: "c",
        label:
          "books only",
      },
    ],

    correctAnswer: "a",

    hint:
      "Read the SELECT clause first. Every column listed after SELECT will appear in the result.",

    explanation:
      "The query selects exactly two columns: title and author.",
  },

  {
    id: 2,

    query: `
SELECT *
FROM inventory;
`,

    question:
      "What information will this query return?",

    options: [
      {
        id: "a",
        label:
          "Only the item_name column",
      },
      {
        id: "b",
        label:
          "Every column from inventory",
      },
      {
        id: "c",
        label:
          "Only the inventory table name",
      },
    ],

    correctAnswer: "b",

    hint:
      "Focus on the symbol immediately after SELECT. The * symbol represents all available columns.",

    explanation:
      "SELECT * retrieves every column from the inventory table.",
  },
];