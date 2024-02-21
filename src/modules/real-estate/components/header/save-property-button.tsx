import { useToast } from "@/hooks/use-toast";
import { RealEstate } from "@/modules/real-estate/types";
import {
  ActionIcon,
  Button,
  Group,
  List,
  ListItem,
  Modal,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useLocalStorage } from "@mantine/hooks";
import { List as ListIcon } from "lucide-react";
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
        <List spacing={"xs"}>
          {savedProperties.map((realEstate) => (
            <ListItem key={realEstate.id} className={styles.listItem}>
              <Link href={`/${realEstate.slug}`} target="_blank">
                {realEstate.title}
              </Link>
            </ListItem>
          ))}
        </List>
      </Modal>
    </>
  );
}
