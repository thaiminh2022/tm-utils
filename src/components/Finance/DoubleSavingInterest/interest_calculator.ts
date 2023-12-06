export type DoubleInterestValue = {
    start_money: number;
    monthly_money: number;
    expected_time: number;
    interest_rate: number;
    cycle_type: CycleType;
};
type CycleType = "yearly" | "monthly" | "seasonly";

function calculate_base_money_interest(
    base_money: number,
    interest_per_cycle: number,
    total_cycle: number
): number {
    // Calculate first part
    const base = 1 + interest_per_cycle;
    return base_money * Math.pow(base, total_cycle);
}

function calculate_monthly_money_interest(
    total_cycle: number,
    total_month_per_cycle: number,
    interest_per_cycle: number,
    money_per_month: number
): number {
    let culmulative_interest = 0;
    for (let i = 0; i < total_cycle; i++) {
        culmulative_interest += Math.pow(1 + interest_per_cycle, i);
        console.log(culmulative_interest);
    }
    return culmulative_interest * total_month_per_cycle * money_per_month;
}

function convert_to_month(m: CycleType): number {
    let per_month_multiplier = 12;
    switch (m) {
        case "yearly":
            per_month_multiplier = 12;
            break;

        case "seasonly":
            per_month_multiplier = 3;
            break;

        case "monthly":
            // monthly
            per_month_multiplier = 1;
            break;
    }
    return per_month_multiplier;
}

function get_multiplier(saving_type: CycleType) {
    if (saving_type == "monthly") {
        return 12;
    }
    if (saving_type == "seasonly") {
        return 4;
    }
    if (saving_type == "yearly") {
        return 1;
    } else {
        return 1;
    }
}

export function calculate_rate(values: DoubleInterestValue, iteration?: number) {
    const r = values.interest_rate / 100;
    const m = get_multiplier(values.cycle_type);
    const n = iteration ?? values.expected_time;
    const a = values.monthly_money;

    const interest_per_cycle = r / m;
    const total_cycle = n * m;
    const month_per_cycle = convert_to_month(values.cycle_type);

    const interest_money = calculate_base_money_interest(
        values.start_money,
        interest_per_cycle,
        total_cycle
    );
    const month_amount = calculate_monthly_money_interest(
        total_cycle,
        month_per_cycle,
        interest_per_cycle,
        a
    );

    const final_amount = interest_money + month_amount;
    return Math.floor(final_amount);
}
