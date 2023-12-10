import { Group, NumberInput, Text } from "@mantine/core";
import { MathComponent } from "mathjax-react";
import React from "react";
import { UserAnswer } from ".";
import { UseFormReturnType } from "@mantine/form";

type Props = {
    form: UseFormReturnType<UserAnswer>
    eq: string,
};

function NhamNghiemForm({form, eq}: Props) {
  return (
    <>
      <Text size="lg" fw="bold">
        Tìm nghiệm cho phương trình sau:
      </Text>
      <div className="math-eq">
        <MathComponent tex={eq} />
      </div>

      <Group grow>
        <NumberInput
          label="Nghiệm 1"
          description="Nghiệm của phương trình"
          hideControls
          size="md"
          mt="sm"
          variant="filled"
          {...form.getInputProps("user_answer1")}
        />
        <NumberInput
          label="Nghiệm 2"
          description="Nghiệm của phương trình"
          size="md"
          hideControls
          mt="sm"
          variant="filled"
          {...form.getInputProps("user_answer2")}
        />
      </Group>
    </>
  );
}

export default NhamNghiemForm;
