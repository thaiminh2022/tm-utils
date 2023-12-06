import {
  Button,
  Flex,
  NumberFormatter,
  Stack,
  Tabs,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMemo, useState } from "react";
import { DoubleInterestValue, calculate_rate } from "./interest_calculator";
import DoubleSavingInterestForm from "./DoubleSavingInterestForm";
import FomulaHelper from "./FomulaHelper";
import { useElementSize, useMediaQuery } from "@mantine/hooks";
import { IconCalculator, IconGraph, IconTable } from "@tabler/icons-react";
import DataTable from "./DataTable";
import MoneyGraph from "./MoneyGraph";

function DoubleSavingInterest() {
  const isMobile = useMediaQuery(`(max-width: 62em)`);

  const [final_money, set_final_money] = useState(0);
  const form = useForm<DoubleInterestValue>({
    initialValues: {
      start_money: 0,
      monthly_money: 0,
      interest_rate: 0,
      expected_time: 0,
      cycle_type: "yearly",
    },
  });
  function form_onSubmit(values: DoubleInterestValue) {
    let money = calculate_rate(values);
    set_final_money(money);
  }

  const { ref, width, height } = useElementSize();
  const data = useMemo(() => {
    let data = [];
    for (let i = 1; i <= form.values.expected_time; i++) {
      const data_each_year = calculate_rate(form.values, i);
      data.push(data_each_year);
    }
    return data;
  }, [final_money]);

  return (
    <>
      <Flex direction={isMobile ? "column" : "row"} gap="md" w="100%">
        <Stack miw="60%" gap="xs">
          <form onSubmit={form.onSubmit(form_onSubmit)}>
            <DoubleSavingInterestForm form={form} />
            <Button
              fullWidth
              leftSection={<IconCalculator />}
              size="compact-md"
              mt="md"
              type="submit"
              fw="bold"
              color="green"
            >
              Tính toán
            </Button>
          </form>
          <Text size="xl" w="100%" style={{ textAlign: "center" }}>
            Sau <Text span>{form.values.expected_time}</Text> năm, bạn sẽ có{" "}
            <Text span c="green" fw="bolder">
              <NumberFormatter
                value={final_money}
                suffix=" VNĐ"
                thousandSeparator=","
                decimalSeparator="."
              />
            </Text>
          </Text>

          <Tabs>
            <Tabs.List>
              <Tabs.Tab value="graph" leftSection={<IconGraph />}>
                Biểu đồ
              </Tabs.Tab>
              <Tabs.Tab value="table" leftSection={<IconTable />}>
                Bảng giá trị
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="graph" ref={ref}>
              <MoneyGraph money_data={data} width={width} height={height} />
            </Tabs.Panel>
            <Tabs.Panel value="table">
              <DataTable data={data} />
            </Tabs.Panel>
          </Tabs>
        </Stack>
        <FomulaHelper />
      </Flex>
    </>
  );
}

export default DoubleSavingInterest;
