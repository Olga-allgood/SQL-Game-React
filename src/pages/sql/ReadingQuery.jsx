import SQLLevelPage from "../../components/sql/SQLLevelPage";

import {
  readingQueryCards,
  recognitionTasks,
  builderTasks,
  detectiveTasks,
  caseFiles,
  challengeTasks,
} from "../../data/sql/readingQuery";

export default function ReadingQuery() {
  return (
    <SQLLevelPage
      levelNumber={1}
      levelKey="reading-query"
      title="Reading a Query"
      description="Learn how SELECT, FROM, multiple columns, and * define the information returned by a basic SQL query."
      cards={
        readingQueryCards
      }
      recognitionTasks={
        recognitionTasks
      }
      builderTasks={
        builderTasks
      }
      detectiveTasks={
        detectiveTasks
      }
      caseFiles={
        caseFiles
      }
      challengeTasks={
        challengeTasks
      }
    />
  );
}