import { Form } from "@/components/form";
import { useFeedback } from "@/hooks/use-feedback";
import { useContactAgentForm } from "@/modules/real-state/components/contact-agent-form/use-form";
import { Alert, Button, Card, Stack, Text } from "@mantine/core";

export function ContactAgentForm() {
  const { control, handleSubmit, reset } = useContactAgentForm();
  const { feedback, setFeedback } = useFeedback();

  const onSubmit = handleSubmit((data) => {
    setFeedback({
      title: "Message sent successfully",
      message: "We will contact you soon",
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

          <Form.TextInput
            name="name"
            control={control}
            label="Full Name"
            required
          />

          <Form.TextInput
            name="email"
            control={control}
            label="Email"
            type="email"
            required
          />

          <Form.TextInput
            name="phone"
            control={control}
            label="Phone Number"
            type="tel"
            required
          />

          <Form.TextArea
            name="comment"
            control={control}
            label="Comments"
            required
          />

          {feedback && (
            <Alert color={feedback.color} title={feedback.title}>
              {feedback.message}
            </Alert>
          )}

          <Button type="submit">Contact Now</Button>
        </Stack>
      </Form>
    </Card>
  );
}
