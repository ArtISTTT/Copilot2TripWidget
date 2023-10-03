import { WidgetPosition } from '@/types/app';
import { useState } from 'react';
import images from '@/images';
import cn from 'classnames';
import WidgetHeader from '../WidgetContent/Header';

type IProps = {
    position: WidgetPosition;
};

const RectangleWidget: React.FC<IProps> = ({ position }) => {
    const [isOpened, setIsOpened] = useState(false);
    const [showFrame, setShowFrame] = useState(false);

    const onClose = () => {
        setIsOpened(false);

        setTimeout(() => {
            setShowFrame(false);
        }, 200);
    };

    const onOpen = () => {
        setIsOpened(true);

        setShowFrame(true);
    };

    const onTriggerOpen = () => {
        if (isOpened) {
            onClose();
            return;
        }

        onOpen();
    };

    return (
        <div
            className={cn('widgetWrapper', {
                right: position === WidgetPosition.Right,
                opened: isOpened,
                reacangle: true,
            })}
        >
            {isOpened && (
                <div className='widgetCloseIcon' onClick={onClose}>
                    <img src={images.close} />
                </div>
            )}
            <div className='widgetContent'>
                <WidgetHeader onClick={onTriggerOpen} />
                <div className='widgetContentWrapper'>
                    <div
                        className={cn('widgetContentFrame', {
                            show: showFrame,
                        })}
                    >
                        <iframe
                            src={'https://copilot2trip.com/'}
                            width='353'
                            height='567'
                            title='Copilot Widget'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RectangleWidget;
