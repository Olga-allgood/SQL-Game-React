// src/components/sql/SQLCaseFile.jsx

import { ChoiceActivity } from "./ChoiceActivity";

export default function SQLCaseFile({
  cases,
  solvedTasks,
  revealedTasks,
  onSolved,
  onReveal,
}) {
  return (
    <ChoiceActivity
      activityKey="casefile"
      title="📁 SQL Case File"
      subtitle="Analyze what different parts of a query mean."
      tasks={cases}
      solvedTasks={solvedTasks}
      revealedTasks={revealedTasks}
      onSolved={onSolved}
      onReveal={onReveal}
    />
  );
}