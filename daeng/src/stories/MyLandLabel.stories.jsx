import MyLandLabel from "../components/hopscotch/MyLandLabel";

export default {
  title: "Components/MyLandLabel",
  component: MyLandLabel,
  argTypes: {
    region: { control: "text" },
    subRegion: { control: "text" },
  },
};

const Template = (args) => <MyLandLabel {...args} />;

export const Default = Template.bind({});
Default.args = {
  region: "서울",
  subRegion: "강남구",
};

export const AnotherRegion = Template.bind({});
AnotherRegion.args = {
  region: "부산",
  subRegion: "해운대구",
};
