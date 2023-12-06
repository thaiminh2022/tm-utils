import React, { useMemo } from "react";
import { calculate_rate } from "./interest_calculator";
import { Table, Title } from "@mantine/core";
import { Props } from "./DataTable";

export function DataTable({ value, final_money }: Props) {
    const data = useMemo(() => {
        let data = [];
        for (let i = 1; i <= value.expected_time; i++) {
            const data_each_year = calculate_rate(value, i);
            data.push(data_each_year);
        }
        return data;
    }, [final_money]);

    const rows = data.map((data_each_year, i) => {
        const year = i + 1;
        return (
            <Table.Tr>
                <Table.Td>{year}</Table.Td>
                <Table.Td>{data_each_year}</Table.Td>
            </Table.Tr>
        );
    });

    return (
        <div>
            <Title order={2} size="h4">
                Bảng dữ liệu
            </Title>
            <Table.ScrollContainer>
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Năm</Table.Th>
                            <Table.Th>Số tiền</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </div>
    );
}

