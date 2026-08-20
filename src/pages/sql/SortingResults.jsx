import SQLLevelPage from "../../components/sql/SQLLevelPage";

import {
  sortingCards,
  recognitionTasks,
  builderTasks,
  detectiveTasks,
  caseFiles,
  challengeTasks,
} from "../../data/sql/sortingResults";

export default function SortingResults() {
  return (
    <SQLLevelPage
      levelNumber={3}
      levelKey="sorting-results"
      title="Sorting & Controlling Results"
      description="Learn how to organize query results with ORDER BY, ASC, DESC, LIMIT, and DISTINCT."
      cards={
        sortingCards
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