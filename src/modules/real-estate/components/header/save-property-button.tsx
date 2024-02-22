import { useToast } from "@/hooks/use-toast";
import { RealEstate } from "@/modules/real-estate/types";
import { ActionIcon, Button, Group, Modal, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Heart, List as ListIcon, TrashIcon } from "lucide-react";
import Link from "next/link";

import { useSavedProperties } from "../../hooks/use-saved-properties";
import styles from "./styles.module.css";

type Props = {
  realEstate: RealEstate;
};

export function SaveProperty({ realEstate }: Props) {
  const [opened, { open, close }] = useDisclosure(false);
  const { savedProperties, isSaved, removeProperty, handleSave } =
    useSavedPropertiesActions(realEstate);

  return (
    <>
      <Group gap={"xs"}>
        <ActionIcon variant="light" size={"lg"} onClick={open} h={"full"}>
          <ListIcon size={20} />
        </ActionIcon>

        <Button
          w={180}
          onClick={handleSave}
          leftSection={
            isSaved ? (
              <Heart color="red" fill="red" size={20} />
            ) : (
              <Heart size={20} />
            )
          }
          variant="light"
        >
          {isSaved ? "Remove Property" : "Save Property"}
        </Button>
      </Group>

      <Modal opened={opened} onClose={close} title="Saved Properties">
        <Stack p={0} m={0} gap={"xs"} component={"ul"}>
          {savedProperties.map((realEstate) => (
            <Group
              key={realEstate.id}
              component={"li"}
              justify="space-between"
              wrap="nowrap"
              className={styles.listItem}
            >
              <Link passHref href={`/${realEstate.slug}`} target="_blank">
                {realEstate.title}
              </Link>

              <ActionIcon
                onClick={() => removeProperty(realEstate.id)}
                color="red"
              >
                <TrashIcon size={20} />
              </ActionIcon>
            </Group>
          ))}

          {savedProperties.length === 0 && <Text>No saved properties</Text>}
        </Stack>
      </Modal>
    </>
  );
}

function useSavedPropertiesActions(realEstate: RealEstate) {
  const { showToast } = useToast();
  const { savedProperties, setSavedProperties } = useSavedProperties();

  const isSaved = savedProperties.some(({ id }) => id === realEstate.id);

  function removeProperty(id: number) {
    setSavedProperties((oldValue) => oldValue.filter((item) => item.id !== id));
  }

  function handleSave() {
    if (isSaved) {
      removeProperty(realEstate.id);
      showToast({
        title: "Property Removed",
        message: `You have removed ${realEstate.title} from your list of properties`,
        color: "red",
      });
      return;
    }

    setSavedProperties((oldValue) => [
      ...oldValue,
      {
        id: realEstate.id,
        title: realEstate.title,
        slug: realEstate.slug,
      },
    ]);

    showToast({
      title: "Property Saved",
      message: `You have saved ${realEstate.title} to your list of properties`,
    });
  }

  return {
    savedProperties,
    setSavedProperties,
    isSaved,
    removeProperty,
    handleSave,
  };
}
