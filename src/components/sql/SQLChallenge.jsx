// src/components/sql/SQLChallenge.jsx

import { ChoiceActivity } from "./ChoiceActivity";

export default function SQLChallenge({
  tasks,
  solvedTasks,
  revealedTasks,
  onSolved,
  onReveal,
}) {
  return (
    <ChoiceActivity
      activityKey="challenge"
      title="🏆 SQL Challenge"
      subtitle="Predict what basic SQL queries will return."
      tasks={tasks}
      solvedTasks={solvedTasks}
      revealedTasks={revealedTasks}
      onSolved={onSolved}
      onReveal={onReveal}
    />
  );
}