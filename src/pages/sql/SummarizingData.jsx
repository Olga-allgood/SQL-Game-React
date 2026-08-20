import SQLLevelPage from "../../components/sql/SQLLevelPage";

import {
  summarizingCards,
  recognitionTasks,
  builderTasks,
  detectiveTasks,
  caseFiles,
  challengeTasks,
} from "../../data/sql/summarizingData";

export default function SummarizingData() {
  return (
    <SQLLevelPage
      levelNumber={4}
      levelKey="summarizing-data"
      title="Summarizing Data"
      description="Learn how SQL can summarize many rows using COUNT(), SUM(), AVG(), MIN(), and MAX()."
      cards={
        summarizingCards
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