export const connectingCards = [
  {
    id: 1,
    question: "What is a primary key?",
    answer:
      "A primary key is a column that uniquely identifies each row in a table. Example: In a customers table, customer_id can uniquely identify each customer.",
    keyTakeaway:
      "Primary key = uniquely identify each row.",
  },

  {
    id: 2,
    question: "What is a foreign key?",
    answer:
      "A foreign key is a column that references a key in another table. It creates a relationship between the tables. Example: orders.customer_id can reference customers.customer_id.",
    keyTakeaway:
      "Foreign key = connect a row to related data in another table.",
  },

  {
    id: 3,
    question:
      "How do primary and foreign keys work together?",
    answer:
      "A primary key identifies a row in one table, while a foreign key stores that identifier in another table. Example: customers.customer_id = orders.customer_id;",
    keyTakeaway:
      "Primary and foreign keys create relationships between tables.",
  },

  {
    id: 4,
    question: "What does JOIN ... ON do?",
    answer:
      "JOIN combines related rows from different tables. ON specifies the condition that determines how the rows match. Example: SELECT customers.name, orders.total FROM customers JOIN orders ON customers.customer_id = orders.customer_id;",
    keyTakeaway:
      "JOIN connects tables. ON defines how the rows match.",
  },

  {
    id: 5,
    question: "What does INNER JOIN do?",
    answer:
      "INNER JOIN returns only rows that have matching values in both tables. Example: SELECT customers.name, orders.total FROM customers INNER JOIN orders ON customers.customer_id = orders.customer_id;",
    keyTakeaway:
      "INNER JOIN = keep matching rows from both tables.",
  },

  {
    id: 6,
    question: "What does LEFT JOIN do?",
    answer:
      "LEFT JOIN returns every row from the left table plus matching rows from the right table. When no match exists, columns from the right table contain NULL.",
    keyTakeaway:
      "LEFT JOIN = keep every row from the left table, even when no match exists.",
  },

  {
    id: 7,
    question:
      "What is the difference between INNER JOIN and LEFT JOIN?",
    answer:
      "INNER JOIN keeps only matching rows. LEFT JOIN keeps every row from the left table and adds matching data from the right table when available.",
    keyTakeaway:
      "INNER JOIN = matches only. LEFT JOIN = preserve all rows on the left.",
  },
];

/* =========================================================
   RECOGNIZE
========================================================= */

export const recognitionTasks = [
  {
    id: 1,

    question:
      "customers has customer_id as its primary key. orders also contains customer_id. Which condition correctly connects the tables?",

    options: [
      {
        id: "a",
        label:
          "ON customers.customer_id = orders.customer_id",
      },
      {
        id: "b",
        label:
          "ON customers.name = orders.total",
      },
      {
        id: "c",
        label:
          "ON customers = orders",
      },
    ],

    correctAnswer: "a",

    hint:
      "Look for the column that represents the same customer in both tables.",

    explanation:
      "customers.customer_id uniquely identifies each customer, while orders.customer_id references that customer. Matching those columns connects each order to its customer.",
  },

  {
    id: 2,

    question:
      "Which query returns customer names together with their order totals, but only when a matching order exists?",

    options: [
      {
        id: "a",
        label:
          "SELECT customers.name, orders.total FROM customers INNER JOIN orders ON customers.customer_id = orders.customer_id;",
      },
      {
        id: "b",
        label:
          "SELECT customers.name, orders.total FROM customers;",
      },
      {
        id: "c",
        label:
          "SELECT customers.name, orders.total FROM customers INNER JOIN orders ON customers.name = orders.total;",
      },
    ],

    correctAnswer: "a",

    hint:
      "You need matching records from both tables, and the shared relationship is customer_id.",

    explanation:
      "INNER JOIN connects customers with matching orders using customer_id.",
  },

  {
    id: 3,

    question:
      "Which query keeps every course, including courses that currently have no enrollments?",

    options: [
      {
        id: "a",
        label:
          "SELECT courses.title, enrollments.student_id FROM courses INNER JOIN enrollments ON courses.course_id = enrollments.course_id;",
      },
      {
        id: "b",
        label:
          "SELECT courses.title, enrollments.student_id FROM courses LEFT JOIN enrollments ON courses.course_id = enrollments.course_id;",
      },
      {
        id: "c",
        label:
          "SELECT courses.title FROM enrollments;",
      },
    ],

    correctAnswer: "b",

    hint:
      "The courses table must be preserved even when there is no matching enrollment. Which JOIN keeps every row from the left table?",

    explanation:
      "LEFT JOIN keeps all courses. Courses without an enrollment still appear, with NULL values for enrollment columns.",
  },
];

/* =========================================================
   BUILD
========================================================= */

export const builderTasks = [
  {
    id: 1,

    prompt:
      "Build a query that returns customer names and their order totals using matching customer_id values.",

    pieces: [
      "orders.total",
      "orders",
      "customers.name,",
      "customers.customer_id = orders.customer_id",
      "SELECT",
      "ON",
      "FROM",
      "customers",
      "INNER JOIN",
    ],

    answer: [
      "SELECT",
      "customers.name,",
      "orders.total",
      "FROM",
      "customers",
      "INNER JOIN",
      "orders",
      "ON",
      "customers.customer_id = orders.customer_id",
    ],

    hint:
      "Start by selecting columns from both tables. FROM identifies the first table. INNER JOIN adds the second table. ON then describes how their customer_id values match.",

    explanation:
      "INNER JOIN connects each customer to matching orders using customer_id.",
  },

  {
    id: 2,

    prompt:
      "Build a query that returns book titles and their author's name.",

    pieces: [
      "authors.name",
      "books.author_id = authors.author_id",
      "authors",
      "books.title,",
      "SELECT",
      "JOIN",
      "ON",
      "books",
      "FROM",
    ],

    answer: [
      "SELECT",
      "books.title,",
      "authors.name",
      "FROM",
      "books",
      "JOIN",
      "authors",
      "ON",
      "books.author_id = authors.author_id",
    ],

    hint:
      "books contains author_id, which identifies the related author. Match that value with authors.author_id.",

    explanation:
      "The JOIN links each book to its author through the author_id relationship.",
  },

  {
    id: 3,

    prompt:
      "Build a query that returns every employee and any assigned project, including employees without projects.",

    pieces: [
      "projects.title",
      "employees",
      "employees.employee_id = projects.employee_id",
      "projects",
      "LEFT JOIN",
      "employees.name,",
      "SELECT",
      "FROM",
      "ON",
    ],

    answer: [
      "SELECT",
      "employees.name,",
      "projects.title",
      "FROM",
      "employees",
      "LEFT JOIN",
      "projects",
      "ON",
      "employees.employee_id = projects.employee_id",
    ],

    hint:
      "Because every employee must remain in the result, employees should be the left table and you should use LEFT JOIN.",

    explanation:
      "LEFT JOIN keeps all employees and adds project information when a matching project exists.",
  },
];

/* =========================================================
   APPLY — SQL DETECTIVE
========================================================= */

export const detectiveTasks = [
  {
    id: 1,

    title: "The Customer Orders",

    scenario:
      "A sales manager has a customers table and an orders table. She needs a report showing the customer name beside each order total.",

    question:
      "Which query correctly combines the tables?",

    options: [
      {
        id: "a",
        label:
          "SELECT customers.name, orders.total FROM customers JOIN orders ON customers.customer_id = orders.customer_id;",
      },
      {
        id: "b",
        label:
          "SELECT customers.name, orders.total FROM customers WHERE customers.customer_id = orders.customer_id;",
      },
      {
        id: "c",
        label:
          "SELECT customers.name, orders.total FROM customers JOIN orders ON customers.name = orders.total;",
      },
    ],

    correctAnswer: "a",

    hint:
      "Find the identifier that represents the same customer in both tables. The ON condition should compare those two columns.",

    explanation:
      "customer_id connects each order with the customer who placed it.",
  },

  {
    id: 2,

    title: "The Missing Assignments",

    scenario:
      "A teacher wants a list of every student and any homework submission associated with that student. Students who have not submitted anything must still appear.",

    question:
      "Which JOIN should be used?",

    options: [
      {
        id: "a",
        label:
          "SELECT students.name, submissions.assignment FROM students INNER JOIN submissions ON students.student_id = submissions.student_id;",
      },
      {
        id: "b",
        label:
          "SELECT students.name, submissions.assignment FROM students LEFT JOIN submissions ON students.student_id = submissions.student_id;",
      },
      {
        id: "c",
        label:
          "SELECT students.name FROM submissions;",
      },
    ],

    correctAnswer: "b",

    hint:
      "The requirement says every student must remain in the result, even if no matching submission exists.",

    explanation:
      "LEFT JOIN preserves every student and adds submission data where matching records exist.",
  },
];

/* =========================================================
   ANALYZE — CASE FILE
========================================================= */

export const caseFiles = [
  {
    id: 1,

    title: "Understanding the Relationship",

    scenario:
      "The courses table contains course_id as its primary key. The enrollments table contains course_id as a foreign key.",

    question:
      "What does the course_id column in enrollments represent?",

    options: [
      {
        id: "a",
        label:
          "It identifies which course an enrollment belongs to.",
      },
      {
        id: "b",
        label:
          "It uniquely identifies every student.",
      },
      {
        id: "c",
        label:
          "It stores the course title.",
      },
    ],

    correctAnswer: "a",

    hint:
      "A foreign key stores an identifier that points to a related row in another table.",

    explanation:
      "enrollments.course_id references courses.course_id and identifies the course associated with each enrollment.",
  },

  {
    id: 2,

    title: "INNER or LEFT?",

    scenario:
      "A manager needs a report listing every employee, including employees who have not yet been assigned to a department.",

    question:
      "Why would LEFT JOIN be more appropriate than INNER JOIN?",

    options: [
      {
        id: "a",
        label:
          "LEFT JOIN preserves employees even when no matching department exists.",
      },
      {
        id: "b",
        label:
          "LEFT JOIN removes employees without departments.",
      },
      {
        id: "c",
        label:
          "INNER JOIN always returns more rows than LEFT JOIN.",
      },
    ],

    correctAnswer: "a",

    hint:
      "Ask which table must be preserved regardless of whether a matching row exists.",

    explanation:
      "With employees as the left table, LEFT JOIN keeps every employee. Department columns will contain NULL when no matching department exists.",
  },

  {
    id: 3,

    title: "Reading a JOIN",

    scenario:
      "Consider: SELECT books.title, authors.name FROM books JOIN authors ON books.author_id = authors.author_id;",

    question:
      "What is the ON clause doing?",

    options: [
      {
        id: "a",
        label:
          "It specifies how rows from books and authors should be matched.",
      },
      {
        id: "b",
        label:
          "It sorts books by author.",
      },
      {
        id: "c",
        label:
          "It filters out expensive books.",
      },
    ],

    correctAnswer: "a",

    hint:
      "ON defines the relationship used to connect rows from the two tables.",

    explanation:
      "The ON clause matches books.author_id with authors.author_id so each book can be connected to its author.",
  },
];

/* =========================================================
   CHALLENGE — PREDICT
========================================================= */

export const challengeTasks = [
  {
    id: 1,

    query: `
SELECT customers.name, orders.total
FROM customers
INNER JOIN orders
  ON customers.customer_id = orders.customer_id;
`,

    question:
      "What happens to a customer who has no matching order?",

    options: [
      {
        id: "a",
        label:
          "The customer does not appear in the result.",
      },
      {
        id: "b",
        label:
          "The customer appears with NULL for orders.total.",
      },
      {
        id: "c",
        label:
          "The query produces an error.",
      },
    ],

    correctAnswer: "a",

    hint:
      "INNER JOIN keeps only rows that have a matching record in both tables.",

    explanation:
      "A customer without an order has no matching row in orders, so INNER JOIN excludes that customer.",
  },

  {
    id: 2,

    query: `
SELECT customers.name, orders.total
FROM customers
LEFT JOIN orders
  ON customers.customer_id = orders.customer_id;
`,

    question:
      "What happens to a customer who has no matching order?",

    options: [
      {
        id: "a",
        label:
          "The customer disappears from the result.",
      },
      {
        id: "b",
        label:
          "The customer remains, and order columns contain NULL.",
      },
      {
        id: "c",
        label:
          "The customer is automatically given an order.",
      },
    ],

    correctAnswer: "b",

    hint:
      "LEFT JOIN preserves every row from the table appearing before LEFT JOIN.",

    explanation:
      "All customers remain in the result. When no order matches, columns from orders contain NULL.",
  },

  {
    id: 3,

    query: `
SELECT students.name, courses.title
FROM students
JOIN courses
  ON students.course_id = courses.course_id;
`,

    question:
      "What relationship is this query using?",

    options: [
      {
        id: "a",
        label:
          "students.course_id connects each student to a course.",
      },
      {
        id: "b",
        label:
          "students.name connects each student to a course title.",
      },
      {
        id: "c",
        label:
          "The tables are not related.",
      },
    ],

    correctAnswer: "a",

    hint:
      "Look specifically at the two columns compared by the ON clause.",

    explanation:
      "The query uses course_id to connect each student record with the matching course record.",
  },
];