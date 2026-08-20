import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ProgressContext = createContext(null);

const STORAGE_KEY = "sql-learning-progress";

/*
  Stored shape:

  {
    "reading-query": {
      solvedTasks: [
        "recognize-1",
        "build-1"
      ],
      revealedTasks: [
        "challenge-2"
      ]
    },

    "filtering-data": {
      solvedTasks: [],
      revealedTasks: []
    }
  }
*/

export const ProgressProvider = ({
  children,
}) => {
  /* =========================================================
     LOAD PROGRESS FROM LOCAL STORAGE
  ========================================================= */

  const [progress, setProgress] =
    useState(() => {
      try {
        const savedProgress =
          localStorage.getItem(
            STORAGE_KEY
          );

        if (savedProgress) {
          return JSON.parse(
            savedProgress
          );
        }
      } catch (error) {
        console.error(
          "Could not load progress:",
          error
        );
      }

      return {};
    });

  /* =========================================================
     SAVE PROGRESS TO LOCAL STORAGE
  ========================================================= */

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(progress)
      );
    } catch (error) {
      console.error(
        "Could not save progress:",
        error
      );
    }
  }, [progress]);

  /* =========================================================
     GET LEVEL
  ========================================================= */

  const getLevelProgress = (
    levelKey
  ) => {
    return (
      progress[levelKey] || {
        solvedTasks: [],
        revealedTasks: [],
      }
    );
  };

  /* =========================================================
     SOLVE TASK
  ========================================================= */

  const markTaskSolved = (
    levelKey,
    activityKey,
    taskId
  ) => {
    const taskKey =
      `${activityKey}-${taskId}`;

    setProgress(
      (previous) => {
        const level =
          previous[levelKey] || {
            solvedTasks: [],
            revealedTasks: [],
          };

        /*
          If answer was revealed,
          learner cannot receive
          independent mastery credit.
        */

        if (
          level.revealedTasks.includes(
            taskKey
          )
        ) {
          return previous;
        }

        /*
          Don't add duplicates.
        */

        if (
          level.solvedTasks.includes(
            taskKey
          )
        ) {
          return previous;
        }

        return {
          ...previous,

          [levelKey]: {
            ...level,

            solvedTasks: [
              ...level.solvedTasks,
              taskKey,
            ],
          },
        };
      }
    );
  };

  /* =========================================================
     REVEAL ANSWER
  ========================================================= */

  const markAnswerRevealed = (
    levelKey,
    activityKey,
    taskId
  ) => {
    const taskKey =
      `${activityKey}-${taskId}`;

    setProgress(
      (previous) => {
        const level =
          previous[levelKey] || {
            solvedTasks: [],
            revealedTasks: [],
          };

        const updatedRevealed =
          level.revealedTasks.includes(
            taskKey
          )
            ? level.revealedTasks
            : [
                ...level.revealedTasks,
                taskKey,
              ];

        /*
          Remove mastery credit if
          answer becomes revealed.
        */

        const updatedSolved =
          level.solvedTasks.filter(
            (item) =>
              item !== taskKey
          );

        return {
          ...previous,

          [levelKey]: {
            solvedTasks:
              updatedSolved,

            revealedTasks:
              updatedRevealed,
          },
        };
      }
    );
  };

  /* =========================================================
     RESET ONE LEVEL
  ========================================================= */

  const resetLevel = (
    levelKey
  ) => {
    setProgress(
      (previous) => ({
        ...previous,

        [levelKey]: {
          solvedTasks: [],
          revealedTasks: [],
        },
      })
    );
  };

  /* =========================================================
     RESET EVERYTHING
  ========================================================= */

  const resetAllProgress = () => {
    setProgress({});
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        getLevelProgress,
        markTaskSolved,
        markAnswerRevealed,
        resetLevel,
        resetAllProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

/* =========================================================
   CUSTOM HOOK
========================================================= */

export const useProgress = () => {
  const context =
    useContext(ProgressContext);

  if (!context) {
    throw new Error(
      "useProgress must be used inside ProgressProvider"
    );
  }

  return context;
};