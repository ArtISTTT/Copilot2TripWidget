import React from 'react';
import './index.less';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux';
import Widget from './Components/Widget';
import { WidgetPosition, WidgetType } from './types/app';
import styles from './styles';

interface IParams
    extends Record<string, string | WidgetPosition | WidgetType | undefined> {
    position?: WidgetPosition;
    type?: WidgetType;
}

// Inject styles
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);

// Get script params
function getScriptParams() {
    const params: IParams = {};
    const script = document.currentScript as HTMLScriptElement;

    if (script && script.hasAttribute('src')) {
        const url = new URL(script.src);

        url.searchParams.forEach((value, key) => {
            params[key] = value;
        });
    }

    return params;
}

const scriptParams = getScriptParams();

// Create root element
const chatRoot = document.createElement('div', {
    is: 'copilot2tripWdiget',
});
document.body.appendChild(chatRoot);

// Render widget
ReactDOM.createRoot(chatRoot).render(
    <React.StrictMode>
        <Provider store={store}>
            <Widget
                position={scriptParams.position ?? WidgetPosition.Left}
                type={scriptParams.type ?? WidgetType.Circle}
            />
        </Provider>
    </React.StrictMode>
);
