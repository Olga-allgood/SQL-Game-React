import SQLLevelPage from "../../components/sql/SQLLevelPage";

import {
  connectingCards,
  recognitionTasks,
  builderTasks,
  detectiveTasks,
  caseFiles,
  challengeTasks,
} from "../../data/sql/connectingData";

export default function ConnectingData() {
  return (
    <SQLLevelPage
      levelNumber={6}
      levelKey="connecting-data"
      title="Connecting Data"
      description="Learn how relational tables connect through primary and foreign keys, JOIN ... ON, INNER JOIN, and LEFT JOIN."
      cards={
        connectingCards
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