import { Button, ButtonProps } from "@mantine/core";
import { ArrowLeft, MoveLeftIcon } from "lucide-react";
import { useRouter } from "next/router";

type Props = ButtonProps & {
  // The route to go back to if there is no history
  fallbackRoute?: string;
};

const hasHistory = () => {
  return window.history.length > 1;
};

export function BackButton({ fallbackRoute, ...rest }: Props) {
  const { push, back } = useRouter();

  function handleBack() {
    if (hasHistory()) {
      back();
    } else {
      push(fallbackRoute || "/");
    }
  }

  return (
    <Button
      leftSection={<ArrowLeft size={16} />}
      onClick={handleBack}
      variant="subtle"
      {...rest}
    >
      Back
    </Button>
  );
}
