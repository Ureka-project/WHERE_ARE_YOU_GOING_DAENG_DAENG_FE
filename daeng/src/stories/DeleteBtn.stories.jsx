import DeleteBtn from "../components/DeleteBtn";

export default {
    title: "Components/DeleteBtn",
    component: DeleteBtn,
};

const Template = (args) => <DeleteBtn {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: "삭제",
};