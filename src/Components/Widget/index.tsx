import { WidgetPosition, WidgetType } from '@/types/app';
import CircleWidget from './CircleWidget';
import RectangleWidget from './RectangleWidget';

type IProps = {
    position: WidgetPosition;
    type: WidgetType;
};

const Widget: React.FC<IProps> = ({ position, type }) => {
    console.log(position, type);

    if (type === WidgetType.Circle) {
        return <CircleWidget position={position} />;
    }

    return <RectangleWidget position={position} />;
};

export default Widget;
