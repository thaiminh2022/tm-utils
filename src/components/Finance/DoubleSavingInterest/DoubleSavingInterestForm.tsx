import { UseFormReturnType } from "@mantine/form";
import { DoubleInterestValue } from "./interest_calculator";
import { Button, Fieldset, NumberInput, Select } from "@mantine/core";
import {
    IconCalendar,
    IconCash,
    IconPercentage,
    IconPigMoney,
} from "@tabler/icons-react";

const interest_rate = [
    { value: "12", label: "Tháng" },
    { value: "1", label: "Năm" },
    { value: "4", label: "Quý" },
];

type Props = {

    form: UseFormReturnType<DoubleInterestValue>
}

function DoubleSavingInterestForm(
    { form }: Props
) {
    return (
        <>
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
            <Button type="submit">Tính toán</Button>
        </>
    );
}

export default DoubleSavingInterestForm;
