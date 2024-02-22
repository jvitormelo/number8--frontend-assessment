import { allowNumbersRegex } from "@/utils/string";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string } from "yup";

const formSchema = object({
  name: string().required(),
  email: string().email().required(),
  phone: string().matches(allowNumbersRegex, "Only numbers").required(),
  comments: string().required(),
});

export const useContactAgentForm = () => {
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      comments: "",
    },
  });

  return { control, handleSubmit, reset };
};
