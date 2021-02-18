import { Spin } from 'antd';
import Lottie from 'react-lottie';

import { SpinProps } from 'antd/lib/spin';
import animationData from './loader-animation.json';

interface Props extends SpinProps {
    children?: any;
}

export default function Loading(props: Props) {
    const { children, ...spinProps} = props;

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
            wrapperClassName="recon-loader"
            size="small"
            indicator={<Lottie options={defaultOptions} height={48} width={48} />}
        >
            {children}
        </Spin>
    );
}
