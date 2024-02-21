import { useToast } from "@/hooks/use-toast";
import { RealEstate } from "@/modules/real-estate/types";
import { ActionIcon, Button, Group, Modal, Stack, Text } from "@mantine/core";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import { List as ListIcon, TrashIcon } from "lucide-react";
import Link from "next/link";

import styles from "./styles.module.css";

type Props = {
  realEstate: RealEstate;
};

type SavedRealEstate = Pick<RealEstate, "id" | "title" | "slug">;

export function SaveProperty({ realEstate }: Props) {
  const [opened, { open, close }] = useDisclosure(false);
  const { showToast } = useToast();

  const [savedProperties, setSavedProperties] = useLocalStorage<
    SavedRealEstate[]
  >({
    key: "saved-properties",
    defaultValue: [],
  });

  const isSaved = savedProperties.some(({ id }) => id === realEstate.id);

  function handleSave() {
    if (isSaved) {
      setSavedProperties((oldValue) =>
        oldValue.filter(({ id }) => id !== realEstate.id)
      );
      showToast({
        title: "Property Removed",
        message: `You have removed ${realEstate.title} from your list of properties`,
        color: "red",
      });
    } else {
      setSavedProperties([
        ...savedProperties,
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
  }

  function removeProperty(id: number) {
    setSavedProperties((oldValue) => oldValue.filter((item) => item.id !== id));
  }

  return (
    <>
      <Group gap={"xs"}>
        <ActionIcon variant="filled" size={"lg"} onClick={open} h={"full"}>
          <ListIcon size={20} />
        </ActionIcon>

        <Button onClick={handleSave} leftSection={"❤️"} variant="light">
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
              className={styles.listItem}
            >
              <Link href={`/${realEstate.slug}`} target="_blank">
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
