// src/components/sql/SQLDetective.jsx

import { ChoiceActivity } from "./ChoiceActivity";

export default function SQLDetective({
  tasks,
  solvedTasks,
  revealedTasks,
  onSolved,
  onReveal,
}) {
  return (
    <ChoiceActivity
      activityKey="detective"
      title="🕵️ SQL Detective"
      subtitle="Apply basic query-reading skills to practical requests."
      tasks={tasks}
      solvedTasks={solvedTasks}
      revealedTasks={revealedTasks}
      onSolved={onSolved}
      onReveal={onReveal}
    />
  );
}