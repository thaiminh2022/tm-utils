import { Blockquote, List, Text } from "@mantine/core";
import { IconSquareRoot2 } from "@tabler/icons-react";
import { MathComponent } from "mathjax-react";
import React from "react";

const tex_default = "ax^{2}-bx+c=0";
const tex_nhamgnhiem = `x^{2} - Sx + P = 0`;

function FomulaHelper() {
  return (
    <section style={{ flexGrow: "1" }}>
      <Blockquote
        cite="Thaiminh2022"
        icon={<IconSquareRoot2 stroke={1.5} />}
        mt="lg"
      >
        <Text fw="bold" size="lg">
          Phương trình bậc 2 được miêu tả dưới dạng:
        </Text>
        <div className="math-eq">
          <MathComponent tex={tex_default} />
        </div>

        <Text size="lg">
          Khi phương trình có nghiệm thực, ta có thể áp dụng định lí Viet để có:
        </Text>
        <div className="math-eq">
          <MathComponent tex={tex_nhamgnhiem} />
        </div>
        <Text size="lg" fw="bold">
          Với những đại lượng:
        </Text>
        <List>
          <List.Item>
            <MathComponent tex={String.raw`S=x1+x2= \frac{-b}{a}`} />
          </List.Item>
          <List.Item>
            <MathComponent tex={String.raw`P=x1 \times x2= \frac{c}{a}`} />
          </List.Item>
        </List>
        <Text size="lg" fs="italic" fw={500}>
          Vậy ta cần tìm 2 nghiệm sao cho thỏa mãn điều kiện S và P
        </Text>
        <Text size="lg" fw="bold">
          Trường hợp đặc biệt:
        </Text>
        <List>
          <List.Item>
            <MathComponent tex={String.raw`a+b+c =0 \to x_1 = -1 \cup x_2 = \frac{c}{a}`} />
          </List.Item>
          <List.Item>
            <MathComponent tex={String.raw`a-b+c =0 \to x_1 = 1 \cup x_2 = \frac{-c}{a}`} />
          </List.Item>
        </List>
 
      </Blockquote>
    </section>
  );
}

export default FomulaHelper;
