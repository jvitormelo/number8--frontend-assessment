import { Control, FieldValues, Path } from "react-hook-form";

export type ControlledProps<T extends FieldValues, BaseProps> = Omit<
  BaseProps,
  "value" | "onChange"
> & {
  control: Control<T>;
  name: Path<T>;
};
