import {
  Button,
  Flex,
  NumberFormatter,
  Stack,
  Tabs,
  Text,
} from "@mantine/core";

import { useForm } from "@mantine/form";
import { lazy, useEffect, useMemo, useState } from "react";
import { useElementSize, useLocalStorage } from "@mantine/hooks";
import { IconCalculator, IconGraph, IconTable } from "@tabler/icons-react";

import { DoubleInterestValue, calculate_rate} from "./interest_calculator";
import DoubleSavingInterestForm from "./DoubleSavingInterestForm";
import FomulaHelper from "./FomulaHelper";

const DataTable = lazy(() => import("./DataTable"));
const MoneyGraph = lazy(() => import("./MoneyGraph"));

import { useIsMobile } from "@/hooks";
import React from "react";

const default_double_interest_value: DoubleInterestValue = {
  start_money: 0,
  monthly_money: 0,
  interest_rate: 0,
  expected_time: 0,
  cycle_type: "yearly",
} as const;

function DoubleSavingInterest() {
  const is_mobile = useIsMobile();
  const [final_money, set_final_money] = useState(0);

  const [form_storage_value, set_form_storage_value] =
    useLocalStorage<DoubleInterestValue>({
      key: "double_interest_form_value",
      defaultValue: default_double_interest_value,
    });

  const form = useForm<DoubleInterestValue>({
    initialValues: form_storage_value,
  });

  useEffect(() => {
    form.setValues(form_storage_value);
    calculate_final_money(form_storage_value);
  }, [form_storage_value]);

  function form_onSubmit(values: DoubleInterestValue) {
    calculate_final_money(values);
    set_form_storage_value(values);
  }
  function calculate_final_money(values: DoubleInterestValue) {
    let money = calculate_rate(values);
    set_final_money(money);
  }

  const { ref, width, height } = useElementSize();

  const table_data = useMemo(() => {
    let data = [];
    for (let i = 1; i <= form.values.expected_time; i++) {
      const data_each_year = calculate_rate(form.values, i);
      data.push(data_each_year);
    }
    return data;
  }, [final_money]);

  return (
    <>
      <Flex direction={is_mobile ? "column" : "row"} gap="md" w="100%">
        <Stack miw="60%" gap="xs">
          <form onSubmit={form.onSubmit(form_onSubmit)} onReset={form.onReset}>
            <DoubleSavingInterestForm form={form}/>
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

          <Tabs defaultValue="table">
            <Tabs.List>
              <Tabs.Tab value="graph" leftSection={<IconGraph />}>
                Biểu đồ
              </Tabs.Tab>
              <Tabs.Tab value="table" leftSection={<IconTable />}>
                Bảng giá trị
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="graph" ref={ref}>
              <React.Suspense> 

              <MoneyGraph money_data={table_data} width={width} height={height} />
              </React.Suspense>
            </Tabs.Panel>
            <Tabs.Panel value="table">
              <DataTable data={table_data} />
            </Tabs.Panel>
          </Tabs>
        </Stack>
        <FomulaHelper />
      </Flex>
    </>
  );
}

export default DoubleSavingInterest;
