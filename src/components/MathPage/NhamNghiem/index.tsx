import { Button, Group, NumberInput, Text } from "@mantine/core";
import { MathComponent } from "mathjax-react";
import React, { useState } from "react";
import {
  QuadraticAnswerType,
  get_problem,
} from "./quadratic_equation_generator";
import { useMediaQuery } from "@mantine/hooks";
import "./nham_nghiem_style.css";

type Props = {};

function NhamNghiem({}: Props) {
  const isMobile = useMediaQuery(`(max-width: 62em)`);
  const [eq, set_eq] = useState<string>("");
  const [answers, set_answers] = useState<QuadraticAnswerType>("unreal");

  function generate_new_question() {
    const problem = get_problem();
    set_eq(problem.eq);
    set_answers(problem.answer);

    console.log(problem.answer);
  }

  return (
    <form action="">
      <Text>Find the answer for this equation:</Text>
      <div className="math-eq">
        <MathComponent tex={eq} />
      </div>
      <NumberInput />
      <NumberInput />
      <Group>
        <Button type="button" onClick={generate_new_question}>
          Generate new question
        </Button>
        <Button type="submit">Submit Answers</Button>
      </Group>
    </form>
  );
}

export default NhamNghiem;
