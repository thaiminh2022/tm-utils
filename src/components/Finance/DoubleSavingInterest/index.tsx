import { NumberFormatter } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { DoubleInterestValue, calculate_rate } from "./interest_calculator";
import DoubleSavingInterestForm from "./DoubleSavingInterestForm";
import FomulaHelper from "./FomulaHelper";

function DoubleSavingInterest() {
  const [final_money, set_final_money] = useState(0);
  const form = useForm<DoubleInterestValue>({
    initialValues: {
      start_value: 0,
      money_each_month: 0,
      interest_rate: 0,
      expected_time: 0,
      time_multiplier: "1",
    },
  });
  function form_onSubmit(values: DoubleInterestValue) {
    let money = calculate_rate(values);
    set_final_money(money);
  }
  return (
    <>
      <form onSubmit={form.onSubmit(form_onSubmit)}>
        <DoubleSavingInterestForm form={form} />
      </form>
      <h1>
        <NumberFormatter
          value={final_money}
          suffix=" VNĐ"
          thousandSeparator=","
          decimalSeparator="."
        />
      </h1>
      <FomulaHelper />
    </>
  );
}

export default DoubleSavingInterest;
