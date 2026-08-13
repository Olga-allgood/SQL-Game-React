export const questions = [
  {
    id: 1,
    question: "What does SELECT do in SQL?",
    answer:
      "SELECT specifies which columns you want to retrieve from a table. Example: SELECT name, email FROM students;",
    keyTakeaway: "SELECT = choose the columns you want to see.",
  },

  {
    id: 2,
    question: "What does FROM do in a SQL query?",
    answer:
      "FROM specifies the table or tables from which SQL should retrieve the data. Example: SELECT name FROM students;",
    keyTakeaway: "FROM = choose where the data comes from.",
  },

  {
    id: 3,
    question: "What does SELECT * mean?",
    answer:
      "SELECT * returns all columns from the specified table. Example: SELECT * FROM students;",
    keyTakeaway: "* = all columns.",
  },

  {
    id: 4,
    question: "What does WHERE do in SQL?",
    answer:
      "WHERE filters rows based on a condition. Only rows that meet the condition are returned. Example: SELECT * FROM students WHERE age > 18;",
    keyTakeaway: "WHERE = filter individual rows.",
  },

  {
    id: 5,
    question: "How do you use AND in a SQL WHERE clause?",
    answer:
      "AND combines multiple conditions. A row must satisfy all conditions to be returned. Example: SELECT * FROM students WHERE age > 18 AND grade = 'A';",
    keyTakeaway: "AND = all conditions must be true.",
  },

  {
    id: 6,
    question: "How do you use OR in a SQL WHERE clause?",
    answer:
      "OR combines conditions where at least one condition must be true. Example: SELECT * FROM students WHERE major = 'Math' OR major = 'Science';",
    keyTakeaway: "OR = at least one condition must be true.",
  },

  {
    id: 7,
    question: "How do you filter for a range of values in SQL?",
    answer:
      "Use BETWEEN to filter values within a specified range. Example: SELECT * FROM students WHERE score BETWEEN 70 AND 90;",
    keyTakeaway: "BETWEEN = filter within a range.",
  },

  {
    id: 8,
    question: "How do you search for a pattern in SQL?",
    answer:
      "Use LIKE with wildcard characters. Example: WHERE name LIKE 'A%' finds names that start with A.",
    keyTakeaway: "LIKE = search for a text pattern. % represents zero or more characters.",
  },

  {
    id: 9,
    question: "What does ORDER BY do?",
    answer:
      "ORDER BY sorts query results. By default, results are sorted in ascending order. Example: SELECT * FROM students ORDER BY score;",
    keyTakeaway: "ORDER BY = sort your results.",
  },

  {
    id: 10,
    question: "How do you sort SQL results from highest to lowest?",
    answer:
      "Use DESC with ORDER BY. Example: SELECT * FROM students ORDER BY score DESC;",
    keyTakeaway: "ASC = ascending. DESC = descending.",
  },

  {
    id: 11,
    question: "What does DISTINCT do?",
    answer:
      "DISTINCT removes duplicate values from the query results. Example: SELECT DISTINCT department FROM employees;",
    keyTakeaway: "DISTINCT = return unique values.",
  },

  {
    id: 12,
    question: "What does COUNT() do?",
    answer:
      "COUNT() returns the number of rows or non-null values that match the query. Example: SELECT COUNT(*) FROM students;",
    keyTakeaway: "COUNT() = count records or values.",
  },

  {
    id: 13,
    question: "What do SUM(), AVG(), MIN(), and MAX() do?",
    answer:
      "These are aggregate functions. SUM() calculates a total, AVG() calculates an average, MIN() finds the smallest value, and MAX() finds the largest value.",
    keyTakeaway:
      "Aggregate functions calculate a value from multiple rows.",
  },

  {
    id: 14,
    question: "What does GROUP BY do?",
    answer:
      "GROUP BY combines rows with the same value into groups, often so aggregate functions such as COUNT(), SUM(), or AVG() can be applied to each group. Example: SELECT department, COUNT(*) FROM employees GROUP BY department;",
    keyTakeaway: "GROUP BY = create groups so you can calculate something about each group.",
  },

  {
    id: 15,
    question: "What is the difference between WHERE and HAVING?",
    answer:
      "WHERE filters individual rows before grouping. HAVING filters groups after GROUP BY has been applied. Example: HAVING COUNT(*) > 10;",
    keyTakeaway: "WHERE = filter rows. HAVING = filter groups.",
  },

  {
    id: 16,
    question: "What does INNER JOIN do?",
    answer:
      "INNER JOIN combines rows from two tables when there is a matching value in both tables. Example: SELECT students.name, courses.name FROM students INNER JOIN courses ON students.course_id = courses.id;",
    keyTakeaway: "INNER JOIN = return matching records from both tables.",
  },

  {
    id: 17,
    question: "What does LEFT JOIN do?",
    answer:
      "LEFT JOIN returns all rows from the left table and matching rows from the right table. If there is no match, the right-side columns contain NULL.",
    keyTakeaway: "LEFT JOIN = keep everything from the left table, even without a match.",
  },

  {
    id: 18,
    question: "What does NULL mean in SQL?",
    answer:
      "NULL represents a missing or unknown value. NULL is not the same as zero or an empty string. To check for NULL, use IS NULL or IS NOT NULL.",
    keyTakeaway: "NULL = missing or unknown value. Use IS NULL, not = NULL.",
  },

  {
    id: 19,
    question: "What does LIMIT do?",
    answer:
      "LIMIT restricts the number of rows returned by a query. Example: SELECT * FROM students LIMIT 10;",
    keyTakeaway: "LIMIT = control how many rows are returned.",
  },

  {
    id: 20,
    question: "What is the basic order of clauses in a SQL query?",
    answer:
      "A common SQL query structure is SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY, and LIMIT. Not every query uses every clause.",
    keyTakeaway:
      "Think: SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT.",
  },
];