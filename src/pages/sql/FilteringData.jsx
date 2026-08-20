import SQLLevelPage from "../../components/sql/SQLLevelPage";

import {
  filteringCards,
  recognitionTasks,
  builderTasks,
  detectiveTasks,
  caseFiles,
  challengeTasks,
} from "../../data/sql/filteringData";

export default function FilteringData() {
  return (
    <SQLLevelPage
      levelNumber={2}
      levelKey="filtering-data"
      title="Filtering Data"
      description="Learn how to filter rows using WHERE, comparison operators, AND, OR, NOT, BETWEEN, IN, and LIKE."
      cards={
        filteringCards
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