import { WidgetPosition } from '@/types/app';
import { useState } from 'react';
import images from '@/images';
import cn from 'classnames';
import WidgetContent from '../WidgetContent';

type IProps = {
    position: WidgetPosition;
};

const CircleWidget: React.FC<IProps> = ({ position }) => {
    const [isOpened, setIsOpened] = useState(false);

    const onClose = () => {
        setIsOpened(false);
    };

    return (
        <div
            className={cn('widgetWrapper', {
                right: position === WidgetPosition.Right,
                opened: isOpened,
            })}
        >
            {isOpened && (
                <>
                    <WidgetContent />
                    <div className='widgetCloseIcon' onClick={onClose}>
                        <img src={images.close} />
                    </div>
                </>
            )}
            <img
                src={images['logo-btn']}
                className='widgetBtn'
                onClick={() => setIsOpened(!isOpened)}
            />
        </div>
    );
};

export default CircleWidget;
