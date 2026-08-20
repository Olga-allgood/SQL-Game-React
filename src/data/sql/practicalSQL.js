// src/data/sql/practicalSQL.js

export const practicalCards = [
  {
    id: 1,
    question: "What does NULL mean in SQL?",
    answer:
      "NULL represents a missing or unknown value. It is not the same as 0, an empty string, or the text 'NULL'. Example: SELECT name, email FROM customers WHERE email IS NULL;",
    keyTakeaway:
      "NULL = missing or unknown value.",
  },

  {
    id: 2,
    question: "How do you check for NULL values?",
    answer:
      "Use IS NULL or IS NOT NULL. Do not use = NULL. Example: SELECT name FROM customers WHERE email IS NULL;",
    keyTakeaway:
      "Use IS NULL or IS NOT NULL when checking for missing values.",
  },

  {
    id: 3,
    question: "What does CASE do in SQL?",
    answer:
      "CASE adds conditional logic to a query. It can return different values depending on conditions. Example: SELECT name, CASE WHEN score >= 90 THEN 'Excellent' ELSE 'Review' END AS status FROM students;",
    keyTakeaway:
      "CASE = conditional if/else-style logic in SQL.",
  },

  {
    id: 4,
    question: "What does COALESCE() do?",
    answer:
      "COALESCE() returns the first non-NULL value from a list. It is often used to display a fallback value. Example: SELECT name, COALESCE(email, 'No email') FROM customers;",
    keyTakeaway:
      "COALESCE() = replace missing values with a fallback.",
  },

  {
    id: 5,
    question: "What is the common SQL clause order?",
    answer:
      "A common query structure is SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT. Example: SELECT category, COUNT(*) FROM products WHERE active = 'Yes' GROUP BY category HAVING COUNT(*) > 2 ORDER BY COUNT(*) DESC LIMIT 5;",
    keyTakeaway:
      "Think: SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT.",
  },

  {
    id: 6,
    question: "Why does SQL clause order matter?",
    answer:
      "SQL clauses have a standard written structure. Putting clauses in the wrong order causes syntax errors or makes the query invalid. Example: WHERE comes before GROUP BY, while HAVING comes after GROUP BY.",
    keyTakeaway:
      "Correct clause order keeps SQL queries valid and readable.",
  },
];

/* =========================================================
   RECOGNIZE
   4 ASSESSED TASKS
========================================================= */

export const recognitionTasks = [
  {
    id: 1,

    question:
      "Which query finds customers whose phone number is missing?",

    options: [
      {
        id: "a",
        label:
          "SELECT name FROM customers WHERE phone = NULL;",
      },
      {
        id: "b",
        label:
          "SELECT name FROM customers WHERE phone IS NULL;",
      },
      {
        id: "c",
        label:
          "SELECT name FROM customers WHERE phone = 'NULL';",
      },
    ],

    correctAnswer: "b",

    hint:
      "NULL represents an unknown value, so SQL uses a special comparison rather than =.",

    explanation:
      "IS NULL is the correct way to test whether a value is missing.",
  },

  {
    id: 2,

    question:
      "Which expression displays 'No phone' when phone is NULL?",

    options: [
      {
        id: "a",
        label:
          "COALESCE(phone, 'No phone')",
      },
      {
        id: "b",
        label:
          "COUNT(phone, 'No phone')",
      },
      {
        id: "c",
        label:
          "CASE phone = NULL",
      },
    ],

    correctAnswer: "a",

    hint:
      "You need a function that returns a fallback value when the first value is NULL.",

    explanation:
      "COALESCE(phone, 'No phone') returns phone when it exists and 'No phone' when it does not.",
  },

  {
    id: 3,

    question:
      "Which clause order is valid?",

    options: [
      {
        id: "a",
        label:
          "SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT",
      },
      {
        id: "b",
        label:
          "FROM → SELECT → ORDER BY → WHERE → GROUP BY",
      },
      {
        id: "c",
        label:
          "SELECT → WHERE → FROM → HAVING → GROUP BY",
      },
    ],

    correctAnswer: "a",

    hint:
      "Start with SELECT and FROM. WHERE comes before GROUP BY, and HAVING comes after GROUP BY.",

    explanation:
      "The standard written order is SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT.",
  },

  // NEW
  {
    id: 4,

    question:
      "Which query returns only employees who have a department assigned?",

    options: [
      {
        id: "a",
        label:
          "SELECT employee_name, department FROM employees WHERE department IS NOT NULL;",
      },
      {
        id: "b",
        label:
          "SELECT employee_name, department FROM employees WHERE department = NULL;",
      },
      {
        id: "c",
        label:
          "SELECT employee_name, department FROM employees WHERE department IS NULL;",
      },
    ],

    correctAnswer: "a",

    hint:
      "The rows you want are the opposite of missing values. Which condition checks that a value exists?",

    explanation:
      "IS NOT NULL keeps rows where department contains a known value.",
  },
];

/* =========================================================
   BUILD
   5 ASSESSED TASKS
========================================================= */

export const builderTasks = [
  {
    id: 1,

    prompt:
      "Build a query that returns customer names where email is missing.",

    pieces: [
      "email IS NULL",
      "customers",
      "name",
      "WHERE",
      "FROM",
      "SELECT",
    ],

    answer: [
      "SELECT",
      "name",
      "FROM",
      "customers",
      "WHERE",
      "email IS NULL",
    ],

    hint:
      "Use WHERE to filter rows, and use IS NULL rather than = NULL.",

    explanation:
      "WHERE email IS NULL keeps only customers whose email value is missing.",
  },

  {
    id: 2,

    prompt:
      "Build a query that returns employee names and displays 'Unassigned' when department is NULL.",

    pieces: [
      "employees",
      "SELECT",
      "name,",
      "COALESCE(department, 'Unassigned')",
      "FROM",
    ],

    answer: [
      "SELECT",
      "name,",
      "COALESCE(department, 'Unassigned')",
      "FROM",
      "employees",
    ],

    hint:
      "Select name first, then use COALESCE() around department with the fallback text.",

    explanation:
      "COALESCE() returns department when it exists and 'Unassigned' when the department value is NULL.",
  },

  {
    id: 3,

    prompt:
      "Build a query that groups orders by status, keeps groups with more than 5 orders, sorts the counts from highest to lowest, and returns 3 rows.",

    pieces: [
      "COUNT(*) DESC",
      "orders",
      "status,",
      "LIMIT 3",
      "SELECT",
      "GROUP BY",
      "COUNT(*)",
      "HAVING",
      "ORDER BY",
      "status",
      "COUNT(*) > 5",
      "FROM",
    ],

    answer: [
      "SELECT",
      "status,",
      "COUNT(*)",
      "FROM",
      "orders",
      "GROUP BY",
      "status",
      "HAVING",
      "COUNT(*) > 5",
      "ORDER BY",
      "COUNT(*) DESC",
      "LIMIT 3",
    ],

    hint:
      "Use the standard clause order: SELECT → FROM → GROUP BY → HAVING → ORDER BY → LIMIT.",

    explanation:
      "The query groups orders by status, filters the grouped counts, ranks them, and limits the final result.",
  },

  // NEW
  {
    id: 4,

    prompt:
      "Build a query that returns product names where description is available.",

    pieces: [
      "products",
      "description IS NOT NULL",
      "SELECT",
      "product_name",
      "FROM",
      "WHERE",
    ],

    answer: [
      "SELECT",
      "product_name",
      "FROM",
      "products",
      "WHERE",
      "description IS NOT NULL",
    ],

    hint:
      "You want rows where description is present, so use IS NOT NULL in the WHERE clause.",

    explanation:
      "WHERE description IS NOT NULL removes products whose description is missing.",
  },

  // NEW
  {
    id: 5,

    prompt:
      "Build a query that labels orders over 500 as 'Large' and all other orders as 'Standard'.",

    pieces: [
      "orders",
      "SELECT",
      "order_id,",
      "CASE WHEN total > 500 THEN 'Large' ELSE 'Standard' END AS size",
      "FROM",
    ],

    answer: [
      "SELECT",
      "order_id,",
      "CASE WHEN total > 500 THEN 'Large' ELSE 'Standard' END AS size",
      "FROM",
      "orders",
    ],

    hint:
      "CASE should evaluate total > 500 and return one label when true and another label otherwise.",

    explanation:
      "CASE creates a calculated size label for each order based on its total.",
  },
];

/* =========================================================
   APPLY — SQL DETECTIVE
   3 ASSESSED TASKS
========================================================= */

export const detectiveTasks = [
  {
    id: 1,

    title: "The Missing Contact Information",

    scenario:
      "A support team needs a list of customers who do not have an email address on file.",

    question:
      "Which query correctly identifies those customers?",

    options: [
      {
        id: "a",
        label:
          "SELECT name FROM customers WHERE email IS NULL;",
      },
      {
        id: "b",
        label:
          "SELECT name FROM customers WHERE email = NULL;",
      },
      {
        id: "c",
        label:
          "SELECT name FROM customers WHERE email = '';",
      },
    ],

    correctAnswer: "a",

    hint:
      "A missing value is represented by NULL, and SQL checks it with IS NULL.",

    explanation:
      "IS NULL correctly identifies rows where email has no known value.",
  },

  {
    id: 2,

    title: "The Performance Label",

    scenario:
      "A manager wants each employee to be labeled 'High' when sales are at least 100000 and 'Standard' otherwise.",

    question:
      "Which SQL expression best supports this requirement?",

    options: [
      {
        id: "a",
        label:
          "CASE WHEN sales >= 100000 THEN 'High' ELSE 'Standard' END",
      },
      {
        id: "b",
        label:
          "COALESCE(sales, 'High')",
      },
      {
        id: "c",
        label:
          "GROUP BY sales >= 100000",
      },
    ],

    correctAnswer: "a",

    hint:
      "The output should change depending on whether a condition is true or false.",

    explanation:
      "CASE evaluates the condition and returns different labels depending on the result.",
  },

  // NEW
  {
    id: 3,

    title: "The Clean Inventory Report",

    scenario:
      "An inventory manager wants a report showing each product name and its warehouse location. Some products do not yet have a warehouse assigned, but the report should display 'Not assigned' instead of NULL.",

    question:
      "Which query best solves the problem?",

    options: [
      {
        id: "a",
        label:
          "SELECT product_name, COALESCE(warehouse, 'Not assigned') FROM products;",
      },
      {
        id: "b",
        label:
          "SELECT product_name, warehouse FROM products WHERE warehouse IS NOT NULL;",
      },
      {
        id: "c",
        label:
          "SELECT product_name, COUNT(warehouse) FROM products;",
      },
    ],

    correctAnswer: "a",

    hint:
      "The missing rows should remain in the report. You only want to replace the displayed NULL value.",

    explanation:
      "COALESCE preserves every product row while replacing a NULL warehouse value with 'Not assigned'.",
  },
];

/* =========================================================
   ANALYZE — SQL CASE FILE
   4 ASSESSED TASKS
========================================================= */

export const caseFiles = [
  {
    id: 1,

    title: "Missing or Empty?",

    scenario:
      "A customer record has NULL in the phone column.",

    question:
      "Which statement is correct?",

    options: [
      {
        id: "a",
        label:
          "NULL means the phone value is missing or unknown.",
      },
      {
        id: "b",
        label:
          "NULL means the phone number is 0.",
      },
      {
        id: "c",
        label:
          "NULL means the phone column contains an empty string.",
      },
    ],

    correctAnswer: "a",

    hint:
      "NULL represents the absence of a known value. It is different from 0 and ''.",

    explanation:
      "NULL represents missing or unknown information, not a numeric zero or empty text value.",
  },

  {
    id: 2,

    title: "Reading Conditional Logic",

    scenario:
      "Consider: SELECT title, CASE WHEN price > 50 THEN 'Premium' ELSE 'Standard' END AS category FROM books;",

    question:
      "What happens to a book priced at 65?",

    options: [
      {
        id: "a",
        label:
          "It receives the label Premium.",
      },
      {
        id: "b",
        label:
          "It receives the label Standard.",
      },
      {
        id: "c",
        label:
          "It is removed from the result.",
      },
    ],

    correctAnswer: "a",

    hint:
      "Evaluate the condition price > 50 for a price of 65.",

    explanation:
      "Because 65 is greater than 50, the CASE expression returns 'Premium'.",
  },

  {
    id: 3,

    title: "Finding the Clause Problem",

    scenario:
      "A learner writes: SELECT department, COUNT(*) FROM employees HAVING COUNT(*) > 3 GROUP BY department;",

    question:
      "What is wrong with the query?",

    options: [
      {
        id: "a",
        label:
          "HAVING appears before GROUP BY.",
      },
      {
        id: "b",
        label:
          "SELECT cannot contain COUNT(*).",
      },
      {
        id: "c",
        label:
          "GROUP BY can never be used with HAVING.",
      },
    ],

    correctAnswer: "a",

    hint:
      "Think about the standard written order of GROUP BY and HAVING.",

    explanation:
      "GROUP BY must come before HAVING in the written SQL query.",
  },

  // NEW
  {
    id: 4,

    title: "Filtering or Replacing?",

    scenario:
      "Two analysts need different reports. Analyst A wants to remove customers without an email. Analyst B wants to keep every customer but display 'No email' when the email is missing.",

    question:
      "Which statement correctly distinguishes their approaches?",

    options: [
      {
        id: "a",
        label:
          "Analyst A can use WHERE email IS NOT NULL, while Analyst B can use COALESCE(email, 'No email').",
      },
      {
        id: "b",
        label:
          "Both analysts should use WHERE email IS NULL.",
      },
      {
        id: "c",
        label:
          "Both analysts should use COUNT(email).",
      },
    ],

    correctAnswer: "a",

    hint:
      "One requirement filters rows out. The other keeps the rows but changes how missing values are displayed.",

    explanation:
      "IS NOT NULL filters out missing email rows, while COALESCE keeps the rows and substitutes a readable fallback value.",
  },
];

/* =========================================================
   CHALLENGE — PREDICT
   5 ASSESSED TASKS
========================================================= */

export const challengeTasks = [
  {
    id: 1,

    query: `
SELECT name, COALESCE(phone, 'No phone')
FROM customers;
`,

    question:
      "What appears for a customer whose phone value is NULL?",

    options: [
      {
        id: "a",
        label:
          "No phone",
      },
      {
        id: "b",
        label:
          "NULL is removed from the entire row",
      },
      {
        id: "c",
        label:
          "0",
      },
    ],

    correctAnswer: "a",

    hint:
      "COALESCE() returns the first non-NULL value in its argument list.",

    explanation:
      "Because phone is NULL, COALESCE() returns the fallback text 'No phone'.",
  },

  {
    id: 2,

    query: `
SELECT name,
       CASE
         WHEN score >= 90 THEN 'Excellent'
         WHEN score >= 70 THEN 'Pass'
         ELSE 'Review'
       END AS status
FROM students;
`,

    question:
      "What status is assigned to a student with a score of 82?",

    options: [
      {
        id: "a",
        label:
          "Excellent",
      },
      {
        id: "b",
        label:
          "Pass",
      },
      {
        id: "c",
        label:
          "Review",
      },
    ],

    correctAnswer: "b",

    hint:
      "82 does not satisfy score >= 90, so SQL moves to the next WHEN condition.",

    explanation:
      "82 satisfies score >= 70, so CASE returns 'Pass'.",
  },

  {
    id: 3,

    query: `
SELECT category, COUNT(*)
FROM products
WHERE active = 'Yes'
GROUP BY category
HAVING COUNT(*) >= 2
ORDER BY COUNT(*) DESC
LIMIT 3;
`,

    question:
      "Which description best matches the query?",

    options: [
      {
        id: "a",
        label:
          "It finds the top three active product categories that each contain at least two active products.",
      },
      {
        id: "b",
        label:
          "It returns three individual active products.",
      },
      {
        id: "c",
        label:
          "It finds categories containing exactly two products regardless of active status.",
      },
    ],

    correctAnswer: "a",

    hint:
      "Follow the clauses in sequence: WHERE filters active rows, GROUP BY creates category groups, HAVING filters group counts, ORDER BY ranks them, and LIMIT keeps three.",

    explanation:
      "The query keeps active products, groups them by category, keeps categories with at least two active products, ranks those groups by count, and returns the top three.",
  },

  // NEW
  {
    id: 4,

    query: `
SELECT employee_name
FROM employees
WHERE manager_id IS NULL;
`,

    question:
      "Which employees will appear in the result?",

    options: [
      {
        id: "a",
        label:
          "Employees whose manager_id is missing.",
      },
      {
        id: "b",
        label:
          "Employees who definitely have a manager.",
      },
      {
        id: "c",
        label:
          "Every employee.",
      },
    ],

    correctAnswer: "a",

    hint:
      "IS NULL keeps only rows where the selected column has no known value.",

    explanation:
      "The query returns employees whose manager_id is NULL.",
  },

  // NEW
  {
    id: 5,

    query: `
SELECT order_id,
       CASE
         WHEN total >= 1000 THEN 'Large'
         WHEN total >= 500 THEN 'Medium'
         ELSE 'Small'
       END AS order_size
FROM orders;
`,

    question:
      "What label will an order with a total of 750 receive?",

    options: [
      {
        id: "a",
        label:
          "Large",
      },
      {
        id: "b",
        label:
          "Medium",
      },
      {
        id: "c",
        label:
          "Small",
      },
    ],

    correctAnswer: "b",

    hint:
      "SQL evaluates CASE conditions from top to bottom. 750 does not satisfy total >= 1000, so check the next condition.",

    explanation:
      "750 satisfies total >= 500, so CASE returns 'Medium'.",
  },
];