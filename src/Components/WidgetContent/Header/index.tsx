import images from '@/images';

type IProps = {
    onClick?: () => void;
};

const WidgetHeader: React.FC<IProps> = ({ onClick }) => {
    const openNewTab = () => {
        console.log('open new tab');
    };

    return (
        <div className='widgetContentHeader' onClick={onClick}>
            <img src={images.logo} />
            <div className='button' onClick={openNewTab}>
                <span>Open new Tab</span>
                <img src={images['new-tab']} />
            </div>
        </div>
    );
};

export default WidgetHeader;
