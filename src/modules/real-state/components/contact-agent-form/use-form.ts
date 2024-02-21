import { yupResolver } from "@hookform/resolvers/yup";
import { useReducer } from "react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";

// TODO > move to a shared file
const allowNumbersRegex = /^\d*$/;

const formSchema = object({
  name: string().required(),
  email: string().email().required(),
  phone: string().matches(allowNumbersRegex, "Only numbers").required(),
  comment: string().required(),
});

export const useContactAgentForm = () => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      comment: "",
    },
  });

  return { control, handleSubmit };
};
