import { Spin } from 'antd';
import Lottie from 'react-lottie';

import { SpinProps } from 'antd/lib/spin';
import animationData from './loader-animaion-white.json';

interface Props extends SpinProps {
    children?: any;
}

export default function LoadingWhite(props: Props) {
    const { children, ...spinProps } = props;

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        /* rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },*/
    };
    return (
        <Spin
            {...spinProps}
            className="recon-loader-white"
            size="small"
            indicator={<Lottie options={defaultOptions} height={24} width={24} />}
        >
            {children}
        </Spin>
    );
}
