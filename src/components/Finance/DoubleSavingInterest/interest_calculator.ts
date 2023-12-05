export type DoubleInterestValue = {
    start_value: number;
    money_each_month: number;
    expected_time: number;
    interest_rate: number;
    time_multiplier: "12" | "1" | "4";
};

function calculate_interest_money(
    multiplier: number,
    interest_rate: number,
    expected_time: number,
    start_value: number
): number {
    // Calculate first part
    const base = 1 + interest_rate / multiplier;
    return start_value * Math.pow(base, expected_time * multiplier);
}

function calculate_interest_per_month(
    multiplier: number,
    interest_rate: number,
    expected_time: number,
    money_each_month: number
): number {
    const per_month_multiplier = convert_to_month(multiplier);

    let culmulative_interest = 0;
    for (let i = 0; i < expected_time * multiplier; i++) {
        culmulative_interest += Math.pow(1 + interest_rate / multiplier, i);
    }

    return culmulative_interest * per_month_multiplier * money_each_month;
}

function convert_to_month(time_multiplier: number): number {
    let per_month_multiplier = 12;
    switch (time_multiplier) {
        case 1:
            // yearly
            per_month_multiplier = 12;
            break;

        case 4:
            // seasonly
            per_month_multiplier = 3;
            break;

        case 12:
            // monthly
            per_month_multiplier = 1;
            break;
    }
    return per_month_multiplier;
}

export function calculate_rate(values: DoubleInterestValue, iteration?: number) {
    const interest_rate = values.interest_rate / 100;
    const multiplier = parseInt(values.time_multiplier);
    const expected_time = iteration ?? values.expected_time;
    const interest_money = calculate_interest_money(
        multiplier,
        interest_rate,
        expected_time,
        values.start_value
    );

    const month_amount = calculate_interest_per_month(
        multiplier,
        interest_rate,
        expected_time,
        values.money_each_month
    );

    const final_amount = interest_money + month_amount;
    return final_amount;
}
