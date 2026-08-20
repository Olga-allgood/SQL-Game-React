import SQLLevelPage from "../../components/sql/SQLLevelPage";

import {
  practicalCards,
  recognitionTasks,
  builderTasks,
  detectiveTasks,
  caseFiles,
  challengeTasks,
} from "../../data/sql/practicalSQL";

export default function PracticalSQL() {
  return (
    <SQLLevelPage
      levelNumber={7}
      levelKey="practical-sql"
      title="Practical SQL"
      description="Learn how to handle missing data, add conditional logic, provide fallback values, and organize SQL clauses correctly."
      cards={
        practicalCards
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