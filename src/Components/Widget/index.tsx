import type { WidgetPosition, WidgetType } from '@/types/app';

type IProps = {
    position: WidgetPosition;
    type: WidgetType;
};

const Widget: React.FC<IProps> = ({ position, type }) => {
    console.log(position, type);
    return <div>WIDGET</div>;
};

export default Widget;
