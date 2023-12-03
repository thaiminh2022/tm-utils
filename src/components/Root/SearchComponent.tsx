import { ActionIcon, Input, UnstyledButton, rem } from "@mantine/core";
import {
    Spotlight,
    SpotlightActionData,
    SpotlightActionGroupData,
    spotlight,
} from "@mantine/spotlight";
import { IconSearch } from "@tabler/icons-react";
import { get_paths_by_category } from "../../constants";
import { useNavigate } from "react-router-dom";

function SearchComponent() {
    const navigate = useNavigate();
    const actions: (SpotlightActionGroupData | SpotlightActionData)[] =
        get_paths_by_category().map((c) => {
            return {
                group: c.category,
                actions: c.paths.map((p) => ({
                    ...p,
                    onClick: () => navigate(p.path),
                })),
            };
        });
    return (
        <>
            <ActionIcon
                hiddenFrom="md"
                variant="outline"
                onClick={() => spotlight.open()}
            >
                <IconSearch fontSize={10} />
            </ActionIcon>
            <UnstyledButton onClick={() => spotlight.open()} visibleFrom="md">
                <Input
                    placeholder="Search"
                    readOnly
                    leftSection={<IconSearch fontSize={10} />}
                    variant="filled"
                />
            </UnstyledButton>

            <Spotlight
                actions={actions}
                nothingFound="Nothing found..."
                highlightQuery
                searchProps={{
                    leftSection: (
                        <IconSearch
                            style={{ width: rem(20), height: rem(20) }}
                            stroke={1.5}
                        />
                    ),
                    placeholder: "Search...",
                }}
            />
        </>
    );
}
export default SearchComponent;
