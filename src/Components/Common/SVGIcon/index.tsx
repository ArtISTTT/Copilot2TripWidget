import classNames from 'classnames';
import React from 'react';
import { Props, ReactSVG } from 'react-svg';
import styles from './styles.module.css';

interface IProps extends Omit<Props, 'src'> {
    name: string;
    width?: number;
    height?: number;
}

const SVGIcon: React.FC<IProps> = ({
    name,
    width = 24,
    height = 24,
    ref,
    ...restProps
}) => {
    const svgPath = `src/assets/images/icons/${name}.svg`;

    return (
        <ReactSVG
            {...restProps}
            beforeInjection={svg => {
                svg.setAttribute(
                    'style',
                    `width: ${width}px; height: ${height}px`
                );
            }}
            src={svgPath}
            width={width}
            height={height}
            className={classNames(styles.wrapper, [restProps.className])}
        />
    );
};

export default SVGIcon;
