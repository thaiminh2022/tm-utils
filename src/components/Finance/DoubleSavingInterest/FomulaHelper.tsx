import { Blockquote, Text, Title } from '@mantine/core'
import { IconMath } from '@tabler/icons-react'
import React from 'react'


function FomulaHelper() {
    return (
        <section>
            <Title order={2} size="h2">Công thức và giải thích</Title>
            <Blockquote color="green" cite="Thaiminh2022" icon={<IconMath />} mt="lg">
                <Text size="xl">Σ</Text>

            </Blockquote>
        </section>
    )
}

export default FomulaHelper
