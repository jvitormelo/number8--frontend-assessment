import { ControlledProps } from "@/types/global";
import { Textarea } from "@mantine/core";
import { ComponentProps } from "react";
import { FieldValues, useController } from "react-hook-form";

type Props = ComponentProps<typeof Textarea>;

export const ControlledTextArea = <T extends FieldValues>({
  name,
  control,
  ...props
}: ControlledProps<T, Props>) => {
  const { field, fieldState } = useController({
    name,
    control,
  });

  return <Textarea error={fieldState.error?.message} {...props} {...field} />;
};
