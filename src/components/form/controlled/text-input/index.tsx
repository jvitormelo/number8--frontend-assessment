import { ControlledProps } from "@/types/global";
import { TextInput } from "@mantine/core";
import { ComponentProps } from "react";
import { FieldValues, useController } from "react-hook-form";

type Props = ComponentProps<typeof TextInput>;

export const ControlledTextInput = <T extends FieldValues>({
  name,
  control,
  ...props
}: ControlledProps<T, Props>) => {
  const { field, fieldState } = useController({
    name,
    control,
  });

  return <TextInput error={fieldState.error?.message} {...props} {...field} />;
};
