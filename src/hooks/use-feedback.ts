import { useState } from "react";

type Feedback = {
  title: string;
  message: string;
  color: "green" | "red";
};

const DEFAULT_DISAPPEAR_TIME = 2500;

type Props = {
  /** Time in MS */
  disappearTime?: number;
};

export const useFeedback = (props?: Props) => {
  const disappearTime = props?.disappearTime ?? DEFAULT_DISAPPEAR_TIME;
  const [feedback, setFeedback] = useState<null | Feedback>(null);

  const handleSetFeedback = (feedback: Feedback) => {
    setFeedback(feedback);

    if (disappearTime) {
      setTimeout(() => {
        setFeedback(null);
      }, disappearTime);
    }
  };

  return { feedback, setFeedback: handleSetFeedback };
};
