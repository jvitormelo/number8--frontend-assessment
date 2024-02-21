import { Form } from "@/components/form";
import { useFeedback } from "@/hooks/use-feedback";
import { useContactAgentForm } from "./use-form";

import { Alert, Button, Card, Stack, Text, Transition } from "@mantine/core";

export function ContactAgentForm() {
  const { control, handleSubmit, reset } = useContactAgentForm();
  const { feedback, setFeedback } = useFeedback();

  const onSubmit = handleSubmit((data) => {
    setFeedback({
      title: "Message sent successfully",
      message: "We will contact you soon!",
      color: "green",
    });

    console.log(data);
    reset();
  });

  return (
    <Card withBorder h={"full"} p={"xl"} shadow="lg">
      <Form onSubmit={onSubmit}>
        <Stack>
          <Text mx={"auto"} display={"flex"} mb={"xs"} size="xl">
            Contact Agent
          </Text>

          <Transition transition={"fade"} duration={500} mounted={!!feedback}>
            {(styles) => (
              <Alert
                style={styles}
                color={feedback?.color}
                title={feedback?.title}
              >
                {feedback?.message}
              </Alert>
            )}
          </Transition>

          <Form.TextInput
            name="name"
            control={control}
            label="Full Name"
            placeholder="Your full name"
            required
          />

          <Form.TextInput
            name="email"
            control={control}
            label="Email"
            type="email"
            placeholder="Your email"
            required
          />

          <Form.TextInput
            name="phone"
            control={control}
            label="Phone Number"
            type="tel"
            placeholder="Your phone number"
            required
          />

          <Form.TextArea
            name="comments"
            control={control}
            label="Comments"
            placeholder="Your message"
            required
          />

          <Button type="submit">Contact Now</Button>
        </Stack>
      </Form>
    </Card>
  );
}
