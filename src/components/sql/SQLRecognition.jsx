// src/components/sql/SQLRecognition.jsx

import { ChoiceActivity } from "./ChoiceActivity";

export default function SQLRecognition({
  tasks,
  solvedTasks,
  revealedTasks,
  onSolved,
  onReveal,
}) {
  return (
    <ChoiceActivity
      activityKey="recognize"
      title="🎯 Spot the SQL"
      subtitle="Recognize how SELECT, FROM, and * work."
      tasks={tasks}
      solvedTasks={solvedTasks}
      revealedTasks={revealedTasks}
      onSolved={onSolved}
      onReveal={onReveal}
    />
  );
}