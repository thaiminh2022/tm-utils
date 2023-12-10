import { ActionIcon, Button, Flex, Group, Stack, Text } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import {
  QuadraticAnswerType,
  QuadraticProblem,
  get_problem,
} from "./quadratic_equation_generator";
import "./nham_nghiem_style.css";
import { useForm } from "@mantine/form";
import { useIsMobile } from "@/hooks";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import NhamNghiemForm from "./NhamNghiemForm";
import { useCounter } from "@mantine/hooks";
import FomulaHelper from "./FomulaHelper";

export type UserAnswer = {
  user_answer1?: number;
  user_answer2?: number;
};
function compare_object(o1: any, o2: any) {
  return JSON.stringify(o1) == JSON.stringify(o2);
}
type NhamNghiemQuestion = {
  is_correct?: boolean;
} & QuadraticProblem &
  UserAnswer;

function NhamNghiem() {
  const is_mobile = useIsMobile();
  const [questions, set_questions] = useState<NhamNghiemQuestion[]>(() => {
    const dummy = new Array(10).fill(0);
    return dummy.map(() => get_problem());
  });
  const [index, setIndex] = useState(0);
  const [correct_streak, set_correct_streak] = useState(0);

  let question = questions[index];
  const answer_correct = questions[index].is_correct;

  function generate_new_question() {
    const new_problem = get_problem();
    set_questions((prev) => [...prev, new_problem]);
  }

  function change_index_by(value: number) {
    if (index + value > questions.length - 1) {
      for (let _ = 0; _ < value; _++) {
        generate_new_question();
      }
    }
    if (index + value >= 0) {
      setIndex((prev) => {
        const new_index = prev + value;

        return new_index;
      });
    }
  }
  
  const question_form = useForm<UserAnswer>({
    initialValues: {
      user_answer1: undefined,
      user_answer2: undefined,
    },
  });
useEffect(() => {
    question_form.reset();
    question_form.setFieldValue("user_answer1", question.user_answer1);
    question_form.setFieldValue("user_answer2", question.user_answer2);
  }, [question]);

  function form_submit(values: UserAnswer) {
    if (
      values.user_answer1 === undefined ||
      values.user_answer2 === undefined
    ) {
      return;
    }
    question.user_answer1 = values.user_answer1;
    question.user_answer2 = values.user_answer2;

    let correct = false;
    if (values.user_answer2 == values.user_answer1) {
      const user_answer: QuadraticAnswerType = values.user_answer1;
      correct = compare_object(question.answer, user_answer);
    }

    if (values.user_answer1 != values.user_answer2) {
      const user_answer: QuadraticAnswerType = {
        answer1: values.user_answer1,
        answer2: values.user_answer2,
      };
      const user_answer_2: QuadraticAnswerType = {
        answer1: values.user_answer2,
        answer2: values.user_answer1,
      };
      correct =
        compare_object(user_answer, question.answer) ||
        compare_object(user_answer_2, question.answer);
    }

    question.is_correct = correct;
    if (correct) {
      set_correct_streak((prev) => prev + 1);
    } else {
      set_correct_streak(0);
    }
  }
  return (
    <Flex direction={is_mobile ? "column" : "row"} w="100%" gap="md">
      <Stack miw="60%" gap="sm">
        <form onSubmit={question_form.onSubmit(form_submit)}>
          <NhamNghiemForm form={question_form} eq={question.eq} />
          <Stack gap="sm">
            <Text size="lg">
              Bạn đã đúng liên tiếp:{" "}
              <Text span fw="bold" c="green">{`${correct_streak} câu`}</Text>
            </Text>
            <Group mt="md" justify="center">
              <Button
                type="submit"
                w="80%"
                color={
                  answer_correct !== undefined
                    ? answer_correct
                      ? "green"
                      : "red"
                    : undefined
                }
                size="md"
              >
                Kiểm tra đáp án
              </Button>
            </Group>
            <Group justify="center">
              <ActionIcon
                size="lg"
                variant="subtle"
                onClick={() => change_index_by(-1)}
              >
                <IconArrowLeft />
              </ActionIcon>
              <ActionIcon
                size="lg"
                variant="subtle"
                onClick={() => change_index_by(+1)}
              >
                <IconArrowRight />
              </ActionIcon>
              <Text fw="bold">{`${index + 1}/${questions.length}`}</Text>
            </Group>
          </Stack>
        </form>
      </Stack>
      <FomulaHelper />
    </Flex>
  );
}

export default NhamNghiem;
