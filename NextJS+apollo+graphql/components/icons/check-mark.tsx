/* eslint-disable max-len */
import Icon from '@ant-design/icons';

export function CheckMarkArrow(props) {

    const CheckMark = () => (
        <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M21.5397 0.468629C22.1534 1.09347 22.1534 2.10653 21.5397 2.73137L8.96831 15.5314C8.35463 16.1562 7.35966 16.1562 6.74598 15.5314L0.460261 9.13137C-0.15342 8.50653 -0.15342 7.49347 0.460261 6.86863C1.07394 6.24379 2.06892 6.24379 2.6826 6.86863L7.85714 12.1373L19.3174 0.468629C19.9311 -0.15621 20.9261 -0.15621 21.5397 0.468629Z" fill="#3F0D28" />
        </svg>
    );

    return (
        <Icon
            {...props}
            component={CheckMark}
        />
    );
}