import SQLLevelPage from "../../components/sql/SQLLevelPage";

import {
  groupingCards,
  recognitionTasks,
  builderTasks,
  detectiveTasks,
  caseFiles,
  challengeTasks,
} from "../../data/sql/groupingData";

export default function GroupingData() {
  return (
    <SQLLevelPage
      levelNumber={5}
      levelKey="grouping-data"
      title="Grouping Data"
      description="Learn how to summarize categories and groups using GROUP BY and how to filter rows and grouped results with WHERE and HAVING."
      cards={
        groupingCards
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