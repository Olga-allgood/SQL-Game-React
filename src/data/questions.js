export const questions = [
  {
    id: 1,
    question: "What does SELECT do in SQL?",
    answer:
      "SELECT specifies which columns you want to retrieve from a table. Example: SELECT name, email FROM students;",
    keyTakeaway:
      "SELECT = choose the columns you want to see.",
  },

  {
    id: 2,
    question: "What does FROM do in a SQL query?",
    answer:
      "FROM specifies the table or tables from which SQL should retrieve the data. Example: SELECT name FROM students;",
    keyTakeaway:
      "FROM = choose where the data comes from.",
  },

  {
    id: 3,
    question: "What does SELECT * mean?",
    answer:
      "SELECT * returns all columns from the specified table. Example: SELECT * FROM students;",
    keyTakeaway:
      "* = all columns.",
  },

  {
    id: 4,
    question: "What does WHERE do in SQL?",
    answer:
      "WHERE filters individual rows based on a condition. Only rows that meet the condition are returned. Example: SELECT * FROM students WHERE age > 20;",
    keyTakeaway:
      "WHERE = filter individual rows before further processing.",
  },

  {
    id: 5,
    question: "How do comparison operators work in SQL?",
    answer:
      "Comparison operators compare values. Common operators include =, >, <, >=, <=, and <> or !=. Example: WHERE age > 20;",
    keyTakeaway:
      "Comparison operators let you filter values based on relationships.",
  },

  {
    id: 6,
    question: "How do you use AND in a SQL WHERE clause?",
    answer:
      "AND combines multiple conditions. A row must satisfy all conditions to be returned. Example: SELECT * FROM students WHERE age > 18 AND score >= 80;",
    keyTakeaway:
      "AND = all conditions must be true.",
  },

  {
    id: 7,
    question: "How do you use OR in a SQL WHERE clause?",
    answer:
      "OR combines conditions where at least one condition must be true. Example: SELECT * FROM students WHERE age = 17 OR age = 25;",
    keyTakeaway:
      "OR = at least one condition must be true.",
  },

  {
    id: 8,
    question: "What does NOT do in SQL?",
    answer:
      "NOT reverses a condition. For example, WHERE NOT age = 20 returns rows where the age is not 20.",
    keyTakeaway:
      "NOT = reverse a condition.",
  },

  {
    id: 9,
    question: "How do you filter for a range of values in SQL?",
    answer:
      "Use BETWEEN to filter values within a specified range. BETWEEN is inclusive, meaning both endpoints are included. Example: SELECT * FROM students WHERE age BETWEEN 18 AND 22;",
    keyTakeaway:
      "BETWEEN = filter within an inclusive range.",
  },

  {
    id: 10,
    question: "How do you search for a pattern in SQL?",
    answer:
      "Use LIKE with wildcard characters. Example: WHERE name LIKE 'A%' finds names that start with A. The % wildcard represents zero or more characters.",
    keyTakeaway:
      "LIKE = search for a text pattern.",
  },

  {
    id: 11,
    question: "What does IN do in SQL?",
    answer:
      "IN checks whether a value matches one of several specified values. Example: SELECT * FROM students WHERE course IN ('SQL', 'Python', 'JavaScript');",
    keyTakeaway:
      "IN = match one value from a list of possibilities.",
  },

  {
    id: 12,
    question: "What does ORDER BY do?",
    answer:
      "ORDER BY sorts query results. Example: SELECT name, age FROM students ORDER BY age ASC;",
    keyTakeaway:
      "ORDER BY = sort your results.",
  },

  {
    id: 13,
    question: "What is ASC in SQL?",
    answer:
      "ASC means ascending order. For numbers, values go from smallest to largest. For text, values are generally ordered alphabetically. Example: ORDER BY age ASC;",
    keyTakeaway:
      "ASC = ascending = smallest to largest.",
  },

  {
    id: 14,
    question: "What is DESC in SQL?",
    answer:
      "DESC means descending order. For numbers, values go from largest to smallest. Example: SELECT name, score FROM students ORDER BY score DESC;",
    keyTakeaway:
      "DESC = descending = largest to smallest.",
  },

  {
    id: 15,
    question: "What does LIMIT do?",
    answer:
      "LIMIT restricts the number of rows returned by a query. Example: SELECT * FROM students LIMIT 3;",
    keyTakeaway:
      "LIMIT = control how many rows are returned.",
  },

  {
    id: 16,
    question: "How do ORDER BY and LIMIT work together?",
    answer:
      "ORDER BY sorts the rows and LIMIT selects only the specified number of rows from the sorted result. Example: SELECT name, score FROM students ORDER BY score DESC LIMIT 3;",
    keyTakeaway:
      "ORDER BY decides the ranking; LIMIT chooses how many rows to keep.",
  },

  {
    id: 17,
    question: "What does DISTINCT do?",
    answer:
      "DISTINCT removes duplicate combinations of the selected columns from the query results. Example: SELECT DISTINCT course FROM students;",
    keyTakeaway:
      "DISTINCT = return unique results.",
  },

  {
    id: 18,
    question: "What does AS do in SQL?",
    answer:
      "AS creates an alias, or temporary name, for a column or table. Example: SELECT AVG(score) AS average_score FROM students;",
    keyTakeaway:
      "AS = give a column or table a readable temporary name.",
  },

  {
    id: 19,
    question: "What does COUNT() do?",
    answer:
      "COUNT() counts rows or non-null values. COUNT(*) counts rows, while COUNT(column) counts non-null values in that column. Example: SELECT COUNT(*) FROM students;",
    keyTakeaway:
      "COUNT(*) = count rows. COUNT(column) = count non-null values.",
  },

  {
    id: 20,
    question: "What do SUM(), AVG(), MIN(), and MAX() do?",
    answer:
      "These are aggregate functions. SUM() calculates a total, AVG() calculates an average, MIN() finds the smallest value, and MAX() finds the largest value.",
    keyTakeaway:
      "Aggregate functions calculate a value from multiple rows.",
  },

  {
    id: 21,
    question: "What does AVG() do?",
    answer:
      "AVG() calculates the arithmetic mean of a numeric column. Example: SELECT AVG(score) FROM students;",
    keyTakeaway:
      "AVG() = calculate the average.",
  },

  {
    id: 22,
    question: "What does MIN() do?",
    answer:
      "MIN() returns the smallest value in a column. Example: SELECT MIN(age) FROM students;",
    keyTakeaway:
      "MIN() = find the smallest value.",
  },

  {
    id: 23,
    question: "What does MAX() do?",
    answer:
      "MAX() returns the largest value in a column. Example: SELECT MAX(age) FROM students;",
    keyTakeaway:
      "MAX() = find the largest value.",
  },

  {
    id: 24,
    question: "What does GROUP BY do?",
    answer:
      "GROUP BY combines rows with the same value into groups, often so aggregate functions such as COUNT(), SUM(), or AVG() can be applied to each group. Example: SELECT course, COUNT(*) FROM students GROUP BY course;",
    keyTakeaway:
      "GROUP BY = create groups so you can calculate something about each group.",
  },

  {
    id: 25,
    question: "How do GROUP BY and COUNT() work together?",
    answer:
      "GROUP BY creates separate groups, and COUNT() counts the rows within each group. Example: SELECT course, COUNT(*) FROM students GROUP BY course;",
    keyTakeaway:
      "GROUP BY creates the groups; COUNT() counts rows inside each group.",
  },

  {
    id: 26,
    question: "What is the difference between WHERE and HAVING?",
    answer:
      "WHERE filters individual rows before grouping. HAVING filters groups after GROUP BY has been applied. Example: SELECT course, COUNT(*) FROM students GROUP BY course HAVING COUNT(*) > 2;",
    keyTakeaway:
      "WHERE = filter rows. HAVING = filter groups.",
  },

  {
    id: 27,
    question: "When should you use HAVING instead of WHERE?",
    answer:
      "Use HAVING when you need to filter based on an aggregate result or a group. Example: HAVING COUNT(*) > 2 keeps only groups containing more than two rows.",
    keyTakeaway:
      "HAVING is used to filter aggregated groups.",
  },

  {
    id: 28,
    question: "What does INNER JOIN do?",
    answer:
      "INNER JOIN combines rows from two tables when there is a matching value in both tables. Example: SELECT students.name, submissions.submitted FROM students INNER JOIN submissions ON students.id = submissions.student_id;",
    keyTakeaway:
      "INNER JOIN = return rows with matching records in both tables.",
  },

  {
    id: 29,
    question: "What does JOIN ... ON do?",
    answer:
      "JOIN connects rows from different tables, while ON specifies how the rows should be matched. Example: JOIN submissions ON students.id = submissions.student_id;",
    keyTakeaway:
      "JOIN = connect tables. ON = define how they match.",
  },

  {
    id: 30,
    question: "What does LEFT JOIN do?",
    answer:
      "LEFT JOIN returns all rows from the left table and matching rows from the right table. If there is no match, the right-side columns contain NULL.",
    keyTakeaway:
      "LEFT JOIN = keep everything from the left table, even without a match.",
  },

  {
    id: 31,
    question: "What is the difference between INNER JOIN and LEFT JOIN?",
    answer:
      "INNER JOIN returns only rows that have a match in both tables. LEFT JOIN returns every row from the left table, including rows that have no match in the right table.",
    keyTakeaway:
      "INNER JOIN = matches only. LEFT JOIN = keep everything on the left.",
  },

  {
    id: 32,
    question: "How can JOIN and WHERE be used together?",
    answer:
      "JOIN can connect related tables, while WHERE filters the resulting rows. Example: SELECT students.name FROM students JOIN submissions ON students.id = submissions.student_id WHERE submissions.submitted = 'Yes';",
    keyTakeaway:
      "JOIN connects the data; WHERE filters the connected rows.",
  },

  {
    id: 33,
    question: "How can JOIN, WHERE, GROUP BY, and COUNT() work together?",
    answer:
      "JOIN connects related tables, WHERE filters the rows, GROUP BY creates groups, and COUNT() counts rows within each group.",
    keyTakeaway:
      "JOIN → connect data, WHERE → filter rows, GROUP BY → create groups, COUNT() → measure each group.",
  },

  {
    id: 34,
    question: "How do you find the group with the highest or lowest aggregate value?",
    answer:
      "Use GROUP BY with an aggregate function, then ORDER BY the aggregate and LIMIT 1. Example: SELECT course, AVG(score) AS average_score FROM students GROUP BY course ORDER BY average_score ASC LIMIT 1;",
    keyTakeaway:
      "GROUP BY → calculate → ORDER BY → LIMIT 1 = find the highest or lowest group.",
  },

  {
    id: 35,
    question: "What does NULL mean in SQL?",
    answer:
      "NULL represents a missing or unknown value. NULL is not the same as zero, an empty string, or the text 'NULL'.",
    keyTakeaway:
      "NULL = missing or unknown value.",
  },

  {
    id: 36,
    question: "How do you check for NULL values?",
    answer:
      "Use IS NULL or IS NOT NULL. Example: SELECT * FROM students WHERE email IS NULL; Do not use = NULL because NULL represents an unknown value.",
    keyTakeaway:
      "Use IS NULL or IS NOT NULL to check for missing values.",
  },

  {
    id: 37,
    question: "What does CASE do in SQL?",
    answer:
      "CASE creates conditional logic and returns different values depending on conditions. Example: SELECT name, CASE WHEN score >= 90 THEN 'A' WHEN score >= 80 THEN 'B' ELSE 'C' END AS grade FROM students;",
    keyTakeaway:
      "CASE = if/else logic inside SQL.",
  },

  {
    id: 38,
    question: "What does COALESCE() do?",
    answer:
      "COALESCE() returns the first non-NULL value from a list of expressions. Example: SELECT COALESCE(email, 'No email') FROM students;",
    keyTakeaway:
      "COALESCE() = use a fallback when a value is NULL.",
  },

  {
    id: 39,
    question: "What are SQL string functions?",
    answer:
      "String functions manipulate text values. Common examples include UPPER(), LOWER(), LENGTH(), CONCAT(), and SUBSTRING(). Example: SELECT UPPER(name) FROM students;",
    keyTakeaway:
      "String functions = manipulate text values.",
  },

  {
    id: 40,
    question: "What are SQL numeric functions?",
    answer:
      "Numeric functions perform calculations or transformations on numbers. Examples include ROUND(), CEILING(), FLOOR(), and ABS(). Example: SELECT ROUND(AVG(score), 2) FROM students;",
    keyTakeaway:
      "Numeric functions = transform or calculate numeric values.",
  },

  {
    id: 41,
    question: "What does UNION do in SQL?",
    answer:
      "UNION combines the results of two SELECT queries and removes duplicate rows. The queries must return the same number of compatible columns. Example: SELECT name FROM students UNION SELECT name FROM instructors;",
    keyTakeaway:
      "UNION = combine results from multiple SELECT queries.",
  },

  {
    id: 42,
    question: "What is a subquery in SQL?",
    answer:
      "A subquery is a query nested inside another query. It can be used to calculate a value or provide data to the outer query. Example: SELECT name FROM students WHERE score > (SELECT AVG(score) FROM students);",
    keyTakeaway:
      "Subquery = a query inside another query.",
  },

  {
    id: 43,
    question: "What is a CTE in SQL?",
    answer:
      "A Common Table Expression (CTE) creates a temporary named result that can be referenced by the main query. It starts with WITH. Example: WITH high_scores AS (SELECT * FROM students WHERE score >= 90) SELECT * FROM high_scores;",
    keyTakeaway:
      "CTE = give a temporary result a name so the query is easier to organize.",
  },

  {
    id: 44,
    question: "What is the difference between a primary key and a foreign key?",
    answer:
      "A primary key uniquely identifies each row in a table. A foreign key is a column that references a key in another table, creating a relationship between tables.",
    keyTakeaway:
      "Primary key = uniquely identify a row. Foreign key = connect related tables.",
  },

  {
    id: 45,
    question: "What is the basic order of clauses in a SQL query?",
    answer:
      "A common SQL query structure is SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY, and LIMIT. Not every query uses every clause. Example: SELECT course, COUNT(*) AS student_count FROM students WHERE score >= 80 GROUP BY course HAVING COUNT(*) > 1 ORDER BY student_count DESC LIMIT 3;",
    keyTakeaway:
      "Think: SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT.",
  },
];