export const groupingCards = [
  {
    id: 1,
    question: "What does GROUP BY do in SQL?",
    answer:
      "GROUP BY combines rows that share the same value so aggregate functions can calculate a result for each group. Example: SELECT department, COUNT(*) FROM employees GROUP BY department;",
    keyTakeaway:
      "GROUP BY = create groups so you can calculate something about each group.",
  },

  {
    id: 2,
    question: "How do GROUP BY and COUNT() work together?",
    answer:
      "GROUP BY creates groups, and COUNT() counts the rows inside each group. Example: SELECT category, COUNT(*) FROM products GROUP BY category;",
    keyTakeaway:
      "GROUP BY creates the groups; COUNT() measures each group.",
  },

  {
    id: 3,
    question: "How do GROUP BY and AVG() work together?",
    answer:
      "GROUP BY creates groups, and AVG() calculates an average for each group. Example: SELECT department, AVG(salary) FROM employees GROUP BY department;",
    keyTakeaway:
      "GROUP BY + AVG() = calculate a separate average for each group.",
  },

  {
    id: 4,
    question: "What does HAVING do in SQL?",
    answer:
      "HAVING filters grouped results after GROUP BY has been applied. Example: SELECT department, COUNT(*) FROM employees GROUP BY department HAVING COUNT(*) > 5;",
    keyTakeaway:
      "HAVING = filter groups after aggregation.",
  },

  {
    id: 5,
    question: "What is the difference between WHERE and HAVING?",
    answer:
      "WHERE filters individual rows before grouping. HAVING filters grouped or aggregated results after GROUP BY. Example: SELECT category, AVG(price) FROM products WHERE price > 10 GROUP BY category HAVING AVG(price) > 50;",
    keyTakeaway:
      "WHERE filters rows. HAVING filters groups.",
  },

  {
    id: 6,
    question: "When should you use HAVING instead of WHERE?",
    answer:
      "Use HAVING when the condition depends on an aggregate result such as COUNT(), AVG(), SUM(), MIN(), or MAX(). Example: HAVING COUNT(*) >= 3;",
    keyTakeaway:
      "Use HAVING when filtering depends on a group-level calculation.",
  },
];

/* =========================================================
   RECOGNIZE
========================================================= */

export const recognitionTasks = [
  {
    id: 1,

    question:
      "Which query counts how many employees work in each department?",

    options: [
      {
        id: "a",
        label:
          "SELECT department, COUNT(*) FROM employees GROUP BY department;",
      },
      {
        id: "b",
        label:
          "SELECT COUNT(*) FROM employees;",
      },
      {
        id: "c",
        label:
          "SELECT department FROM employees WHERE COUNT(*) > 1;",
      },
    ],

    correctAnswer: "a",

    hint:
      "You need a separate count for each department. That requires grouping rows by department before counting them.",

    explanation:
      "GROUP BY department creates one group per department, and COUNT(*) counts the employees in each group.",
  },

  {
    id: 2,

    question:
      "Which query returns only product categories that contain more than 5 products?",

    options: [
      {
        id: "a",
        label:
          "SELECT category, COUNT(*) FROM products GROUP BY category HAVING COUNT(*) > 5;",
      },
      {
        id: "b",
        label:
          "SELECT category, COUNT(*) FROM products WHERE COUNT(*) > 5 GROUP BY category;",
      },
      {
        id: "c",
        label:
          "SELECT category FROM products WHERE category > 5;",
      },
    ],

    correctAnswer: "a",

    hint:
      "The condition depends on COUNT(*), which is calculated after grouping. Which clause filters aggregate results?",

    explanation:
      "HAVING filters grouped results, so HAVING COUNT(*) > 5 keeps only categories containing more than five products.",
  },

  {
    id: 3,

    question:
      "Which query calculates the average salary for each department?",

    options: [
      {
        id: "a",
        label:
          "SELECT department, AVG(salary) FROM employees GROUP BY department;",
      },
      {
        id: "b",
        label:
          "SELECT AVG(salary) FROM employees;",
      },
      {
        id: "c",
        label:
          "SELECT department FROM employees HAVING AVG(salary);",
      },
    ],

    correctAnswer: "a",

    hint:
      "The question asks for one average per department rather than one average for the entire table.",

    explanation:
      "GROUP BY department creates separate department groups, and AVG(salary) calculates an average for each group.",
  },
];

/* =========================================================
   BUILD
========================================================= */

export const builderTasks = [
  {
    id: 1,

    prompt:
      "Build a query that counts the number of orders for each customer_id.",

    pieces: [
      "COUNT(*)",
      "orders",
      "customer_id,",
      "GROUP BY",
      "SELECT",
      "customer_id",
      "FROM",
    ],

    answer: [
      "SELECT",
      "customer_id,",
      "COUNT(*)",
      "FROM",
      "orders",
      "GROUP BY",
      "customer_id",
    ],

    hint:
      "Select the group column and the aggregate result. Then GROUP BY the same customer_id column.",

    explanation:
      "GROUP BY customer_id creates a group for each customer, and COUNT(*) counts the orders in each group.",
  },

  {
    id: 2,

    prompt:
      "Build a query that calculates the average rating for each course.",

    pieces: [
      "AVG(rating)",
      "course_name,",
      "reviews",
      "GROUP BY",
      "SELECT",
      "FROM",
      "course_name",
    ],

    answer: [
      "SELECT",
      "course_name,",
      "AVG(rating)",
      "FROM",
      "reviews",
      "GROUP BY",
      "course_name",
    ],

    hint:
      "Select course_name and AVG(rating), then group the rows by course_name.",

    explanation:
      "The query produces one average rating for each course.",
  },

  {
    id: 3,

    prompt:
      "Build a query that returns departments with more than 10 employees.",

    pieces: [
      "HAVING",
      "department,",
      "employees",
      "COUNT(*) > 10",
      "SELECT",
      "GROUP BY",
      "COUNT(*)",
      "department",
      "FROM",
    ],

    answer: [
      "SELECT",
      "department,",
      "COUNT(*)",
      "FROM",
      "employees",
      "GROUP BY",
      "department",
      "HAVING",
      "COUNT(*) > 10",
    ],

    hint:
      "First group employees by department and count each group. Then filter those group counts using HAVING.",

    explanation:
      "HAVING COUNT(*) > 10 keeps only department groups containing more than ten employees.",
  },
];

/* =========================================================
   APPLY — SQL DETECTIVE
========================================================= */

export const detectiveTasks = [
  {
    id: 1,

    title: "The Busy Support Teams",

    scenario:
      "A support manager wants to know how many tickets each team currently handles.",

    question:
      "Which query best answers the manager's question?",

    options: [
      {
        id: "a",
        label:
          "SELECT team, COUNT(*) FROM tickets GROUP BY team;",
      },
      {
        id: "b",
        label:
          "SELECT COUNT(*) FROM tickets;",
      },
      {
        id: "c",
        label:
          "SELECT team FROM tickets HAVING COUNT(*);",
      },
    ],

    correctAnswer: "a",

    hint:
      "The manager needs a separate ticket count for each team, so the rows must first be grouped by team.",

    explanation:
      "GROUP BY team creates one group per team and COUNT(*) counts the tickets within each group.",
  },

  {
    id: 2,

    title: "The High-Value Categories",

    scenario:
      "A retailer wants to identify product categories whose average price is greater than 100 dollars.",

    question:
      "Which query correctly finds those categories?",

    options: [
      {
        id: "a",
        label:
          "SELECT category, AVG(price) FROM products GROUP BY category HAVING AVG(price) > 100;",
      },
      {
        id: "b",
        label:
          "SELECT category, AVG(price) FROM products WHERE AVG(price) > 100 GROUP BY category;",
      },
      {
        id: "c",
        label:
          "SELECT category FROM products WHERE price > 100;",
      },
    ],

    correctAnswer: "a",

    hint:
      "The condition is based on the average price of each category, not on individual product prices.",

    explanation:
      "GROUP BY creates the category groups, AVG(price) calculates each average, and HAVING filters those averages.",
  },
];

/* =========================================================
   ANALYZE — CASE FILE
========================================================= */

export const caseFiles = [
  {
    id: 1,

    title: "WHERE or HAVING?",

    scenario:
      "An analyst needs the average salary by department, but only for employees whose salary is greater than 50000.",

    question:
      "Where should the salary > 50000 condition be applied?",

    options: [
      {
        id: "a",
        label:
          "WHERE salary > 50000 before GROUP BY",
      },
      {
        id: "b",
        label:
          "HAVING salary > 50000 after GROUP BY",
      },
      {
        id: "c",
        label:
          "ORDER BY salary > 50000",
      },
    ],

    correctAnswer: "a",

    hint:
      "The condition applies to individual employee rows before the department averages are calculated.",

    explanation:
      "WHERE filters individual employee rows before GROUP BY and AVG() calculate the department averages.",
  },

  {
    id: 2,

    title: "Filtering the Groups",

    scenario:
      "A query groups orders by customer and calculates COUNT(*). The analyst wants to keep only customers with at least 5 orders.",

    question:
      "Which condition is appropriate?",

    options: [
      {
        id: "a",
        label:
          "WHERE COUNT(*) >= 5",
      },
      {
        id: "b",
        label:
          "HAVING COUNT(*) >= 5",
      },
      {
        id: "c",
        label:
          "WHERE customer_id >= 5",
      },
    ],

    correctAnswer: "b",

    hint:
      "The condition depends on the number of rows inside each customer group, so it must be evaluated after grouping.",

    explanation:
      "HAVING filters aggregate results after GROUP BY, so HAVING COUNT(*) >= 5 is appropriate.",
  },

  {
    id: 3,

    title: "Two Different Filters",

    scenario:
      "Consider: SELECT category, AVG(price) FROM products WHERE in_stock = 'Yes' GROUP BY category HAVING AVG(price) > 50;",

    question:
      "What does this query do?",

    options: [
      {
        id: "a",
        label:
          "It keeps in-stock products, calculates the average price by category, then keeps categories whose average price is above 50.",
      },
      {
        id: "b",
        label:
          "It keeps categories named Yes and then sorts by price.",
      },
      {
        id: "c",
        label:
          "It calculates one average price for every product in the table.",
      },
    ],

    correctAnswer: "a",

    hint:
      "Read the operations in sequence: WHERE filters rows, GROUP BY creates groups, and HAVING filters those groups.",

    explanation:
      "WHERE removes out-of-stock rows first. GROUP BY then creates category groups, AVG() calculates each average, and HAVING keeps averages above 50.",
  },
];

/* =========================================================
   CHALLENGE — PREDICT
========================================================= */

export const challengeTasks = [
  {
    id: 1,

    query: `
SELECT department, COUNT(*)
FROM employees
GROUP BY department;
`,

    question:
      "What kind of result will this query produce?",

    options: [
      {
        id: "a",
        label:
          "One row per department with the number of employees in that department.",
      },
      {
        id: "b",
        label:
          "One row for every employee.",
      },
      {
        id: "c",
        label:
          "One number representing all employees.",
      },
    ],

    correctAnswer: "a",

    hint:
      "GROUP BY department creates one result group for each department.",

    explanation:
      "The query returns one row per department together with that department's employee count.",
  },

  {
    id: 2,

    query: `
SELECT category, AVG(price)
FROM products
GROUP BY category
HAVING AVG(price) > 75;
`,

    question:
      "Which categories appear in the result?",

    options: [
      {
        id: "a",
        label:
          "Categories whose average product price is greater than 75.",
      },
      {
        id: "b",
        label:
          "Every category containing at least one product priced above 75.",
      },
      {
        id: "c",
        label:
          "Only products priced exactly 75.",
      },
    ],

    correctAnswer: "a",

    hint:
      "HAVING evaluates AVG(price) for each category group, not individual product prices.",

    explanation:
      "The query calculates the average price for each category and returns only categories whose average exceeds 75.",
  },

  {
    id: 3,

    query: `
SELECT city, COUNT(*)
FROM customers
WHERE active = 'Yes'
GROUP BY city
HAVING COUNT(*) >= 3;
`,

    question:
      "What does this query return?",

    options: [
      {
        id: "a",
        label:
          "Cities that have at least three active customers.",
      },
      {
        id: "b",
        label:
          "All cities with at least three total customers, regardless of status.",
      },
      {
        id: "c",
        label:
          "Three active customers from every city.",
      },
    ],

    correctAnswer: "a",

    hint:
      "WHERE first removes inactive customers. The remaining rows are grouped by city, and HAVING checks each city count.",

    explanation:
      "The query first keeps active customers, groups them by city, and then keeps only cities with at least three active customers.",
  },
];