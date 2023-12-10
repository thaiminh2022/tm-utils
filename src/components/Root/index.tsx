import { AppShell, Burger, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import SearchComponent from "./SearchComponent";
import { IconTools } from "@tabler/icons-react";
import { SITE_NAME } from "../../constants";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import React from "react";

function Root() {
  const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: !opened, mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" justify="space-between" mx="md">
          <Group>
            <Burger opened={opened} onClick={toggle} />
            <IconTools fontSize={"lg"} />
            <Title order={1} size="h3">
              {SITE_NAME}
            </Title>
          </Group>
          <SearchComponent />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Navigation toggle_burger = {toggle}/>
      </AppShell.Navbar>

      <AppShell.Main>
        <React.Suspense>
          <Outlet />
        </React.Suspense>
      </AppShell.Main>
    </AppShell>
  );
}

export default Root;
