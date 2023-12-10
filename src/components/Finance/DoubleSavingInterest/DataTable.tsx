import {  Table } from "@mantine/core";

type Props = {
    data: number[]
};
function DataTable({ data }: Props) {

  const rows = data.map((data_each_year, i) => {
    const year = i + 1;
    return (
      <Table.Tr key={data_each_year + i}>
        <Table.Td>{year}</Table.Td>
        <Table.Td>{data_each_year}</Table.Td>
      </Table.Tr>
    );
  });

  return (
            <Table striped withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Năm</Table.Th>
              <Table.Th>Số tiền</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
          <Table.Caption>Số tiền sau mỗi năm</Table.Caption>
        </Table>
  );
}

export default DataTable;
