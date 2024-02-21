import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Stack, Text, TextInput, Textarea } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { object, string } from "yup";

// TODO > move to a shared file
const allowNumbersRegex = /^\d*$/;

const formSchema = object({
  name: string().required(),
  email: string().email().required(),
  phone: string().matches(allowNumbersRegex, "Only numbers").required(),
  comment: string().required(),
});

export function ContactAgentForm() {
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

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Card withBorder h={"full"} p={"xl"} shadow="lg">
      <form onSubmit={onSubmit}>
        <Stack>
          <Text mx={"auto"} display={"flex"} mb={"xs"} size="xl">
            Contact Agent
          </Text>

          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                label="Full Name"
                required
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                label="Email"
                type="email"
                required
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                label="Phone Number"
                type="tel"
                required
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="comment"
            control={control}
            render={({ field, fieldState }) => (
              <Textarea
                {...field}
                label="Comments"
                required
                error={fieldState.error?.message}
              />
            )}
          />

          <Button type="submit">Contact Now</Button>
        </Stack>
      </form>
    </Card>
  );
}
