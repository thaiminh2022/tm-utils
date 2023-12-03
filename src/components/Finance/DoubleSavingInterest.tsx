import { Button, Fieldset, NumberFormatter, NumberInput, Select, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
    IconCalendar,
    IconCash,
    IconPercentage,
    IconPigMoney,
} from "@tabler/icons-react";
import React, { useState } from "react";

const interest_rate = [
    { value: "12", label: "Tháng" },
    { value: "1", label: "Năm" },
    { value: "4", label: "Quý" },
];

function DoubleSavingInterest() {
    const [final_money, set_final_money] = useState(0);
    const form = useForm<DoubleInterestForm>({
        initialValues: {
            start_value: 0,
            money_each_month: 0,
            interest_rate: 0,
            expected_time: 0,
            time_multiplier: "1",
        },
    });

    function calculate_rate(values: DoubleInterestForm) {
        const interest_rate = values.interest_rate / 100;

        // Calculate first part
        const multiplier = parseInt(values.time_multiplier);
        const base = 1 + interest_rate / multiplier;
        const first_amount =
            values.start_value * Math.pow(base, values.expected_time * multiplier);

        // per-month  amount
        let per_month_multiplier;
        switch (values.time_multiplier) {
            case "1":
                // yearly
                per_month_multiplier = 12;
                break;

            case "4":
                // seasonly
                per_month_multiplier = 3;
                break;

            case "12":
                // monthly
                per_month_multiplier = 1;
                break;
        }

        let culmulative_interest = 0;
        for (let i = 0; i < values.expected_time * multiplier; i++) {
            culmulative_interest += Math.pow(1 + interest_rate / multiplier, i);
        }

        const second_amount = culmulative_interest * per_month_multiplier * values.money_each_month;

        const final_amount = first_amount + second_amount;
        set_final_money(Math.floor(final_amount));
    }
    function form_onSubmit(values: DoubleInterestForm) {
        calculate_rate(values);
    }

    return (
        <>
            <form onSubmit={form.onSubmit(form_onSubmit)}>
                <Fieldset legend="Bước 1: Đầu tư ban đầu">
                    <NumberInput
                        label="Số tiền ban đầu"
                        clampBehavior="strict"
                        suffix=" VNĐ"
                        allowNegative={false}
                        thousandSeparator=" "
                        placeholder="VD: 8 000 000"
                        defaultValue={8000000}
                        leftSection={<IconPigMoney stroke={1.5} />}
                        hideControls
                        {...form.getInputProps("start_value")}
                    />
                </Fieldset>
                <Fieldset legend="Bước 2: Đóng góp">
                    <NumberInput
                        label="Tiền thêm vào hàng tháng"
                        clampBehavior="strict"
                        suffix=" VNĐ"
                        allowNegative={false}
                        thousandSeparator=" "
                        placeholder="VD: 300 000"
                        leftSection={<IconCash stroke={1.5} />}
                        defaultValue={0}
                        hideControls
                        {...form.getInputProps("money_each_month")}
                    />

                    <NumberInput
                        label="Thời gian gửi (năm)"
                        description="Thời gian gửi dự tính"
                        clampBehavior="strict"
                        suffix=" Năm"
                        allowNegative={false}
                        placeholder="VD: 1 Năm"
                        leftSection={<IconCalendar stroke={1.5} />}
                        defaultValue={1}
                        hideControls
                        mt="sm"
                        {...form.getInputProps("expected_time")}
                    />
                </Fieldset>
                <Fieldset legend="Thông tin lãi suất">
                    <NumberInput
                        label="Lãi suất"
                        clampBehavior="strict"
                        suffix=" %"
                        placeholder="VD: 7.2%"
                        defaultValue={7.2}
                        leftSection={<IconPercentage stroke={1.5} />}
                        min={0}
                        max={100}
                        hideControls
                        {...form.getInputProps("interest_rate")}
                    />
                    <Select
                        label="Hạng gửi"
                        description="Chu kì mỗi lần tính lãi suất"
                        data={interest_rate}
                        allowDeselect={false}
                        checkIconPosition="left"
                        {...form.getInputProps("time_multiplier")}
                    />
                </Fieldset>
                <Button type="submit">Làm mới</Button>
            </form>
            <h1><NumberFormatter value={final_money} suffix=" VNĐ" thousandSeparator="," decimalSeparator="."/></h1>
        </>
    );
}

type DoubleInterestForm = {
    start_value: number;
    money_each_month: number;
    expected_time: number;
    interest_rate: number;
    time_multiplier: "12" | "1" | "4";
};

export default DoubleSavingInterest;
