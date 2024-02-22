import { notifications } from "@mantine/notifications";

type OpenToastParams = {
  title: string;
  message: string;
  color?: Parameters<typeof notifications.show>[0]["color"];
};

export function useToast() {
  function showToast(params: OpenToastParams) {
    notifications.show({ ...params });
  }

  return {
    showToast,
  };
}
