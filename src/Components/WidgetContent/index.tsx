import WidgetHeader from './Header';

const WidgetContent: React.FC = () => {
    return (
        <div className='widgetContent'>
            <WidgetHeader />
            <div className='widgetContentFrame'>
                <iframe
                    src={'https://copilot2trip.com/'}
                    width='353'
                    height='567'
                    title='Copilot Widget'
                    allow='microphone'
                />
            </div>
        </div>
    );
};

export default WidgetContent;
