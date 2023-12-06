import { Blockquote, Divider, List, Stack, Text } from "@mantine/core";
import { IconMath } from "@tabler/icons-react";
import { MathComponent } from "mathjax-react";
import "./fomula_style.css";

const fomula = String.raw`P(1 + \frac{r}{m})^{n \times m} + uA \times \sum_{i=0}^{n*m-1}((1+r)^{i})`;

function FomulaHelper() {
  return (
    <section>
      <Blockquote color="green" cite="Thaiminh2022" icon={<IconMath />} mt="lg">
        <Text size="md" fw="bold">
          Tổng tiền thu được sau n năm, lãi r, kì hạn m, số tiền ban đầu P và
          mỗi tháng gửi thêm A đồng
        </Text>
        <div className="double-interest">
          <MathComponent tex={fomula} />
        </div>
        <Stack>
          <List size="xl">
            <List.Item>P: Tiền vốn</List.Item>
            <List.Item>r: Tiền lãi mỗi chu kì</List.Item>
            <List.Item>m: Số lẫn nhận lãi mỗi năm. </List.Item>
            <List.Item>n: Thời gian dự tính gửi theo năm</List.Item>
            <List.Item>u: Số tháng có trong một chu kì</List.Item>
            <List.Item>A: Tiền thêm vào mỗi tháng</List.Item>
          </List>
          <Divider color="teal" />
          <Text size="xl">
            Chi tiết và chứng minh công thức sẽ được giải thích kĩ lưỡng hơn
            tại: <a href=""> Thaiminh2022 Blog</a>
          </Text>
        </Stack>
      </Blockquote>
    </section>
  );
}

export default FomulaHelper;
