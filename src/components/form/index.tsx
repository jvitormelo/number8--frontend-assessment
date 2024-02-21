import { ControlledTextArea } from "@/components/form/controlled/text-area";
import { ControlledTextInput } from "@/components/form/controlled/text-input";
import { HtmlHTMLAttributes, PropsWithChildren } from "react";

type Props = PropsWithChildren & HtmlHTMLAttributes<HTMLFormElement>;

const Form = ({ children, ...rest }: Props) => {
  return <form {...rest}>{children}</form>;
};

Form.TextInput = ControlledTextInput;
Form.TextArea = ControlledTextArea;

export { Form };
