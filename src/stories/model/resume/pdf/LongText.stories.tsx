import { ComponentMeta, ComponentStory } from '@storybook/react';

import LongText from '@/components/model/resume/pdf/LongText';
import PDFWrapper from '@/stories/utils/PDFWrapper';

export default {
  title: 'model/resume/pdf/LongText',
  component: LongText,
} as ComponentMeta<typeof LongText>;

const Template: ComponentStory<typeof LongText> = (args) => (
  <PDFWrapper>
    <LongText {...args} />
  </PDFWrapper>
);

export const Default = Template.bind({});
Default.args = {
  label: '志望動機',
  value:
    '学生時代から現在まで、個人的な趣味でスマートフォン向けのゲームづくりをしてきました。現在、在籍するインターネット系の広告代理店では企画営業を3年経験してきましたが、社会人としての基礎的なスキルは一通り身についた今、改めて今後のキャリアを考えた時に、好きなゲームづくりを仕事にしたいと考え、転職活動をしています。御社では、これまでにVRを取り入れたゲームを３作品リリースされています。新しい技術を用いて、これまでにないゲームを開発したいと思い、御社を志望しました。開発だけでなく、広告の営業を通して身につけたWebマーケティングの知見を活かして、「売れる」ゲームの企画に携わりたいと考えています。',
};
