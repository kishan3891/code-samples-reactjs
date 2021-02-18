import { Typography } from 'antd'
const { Title } = Typography

interface Props {
    imageURL: string;
    title: string;
    designation: string;
    description: string;
}

export default function CardContent({
    imageURL,
    title,
    description,
    designation,
}: Props) {
    return (
        <div className='card-col-inner'>
            <img alt={title} src={imageURL} />
            <div className='card-col-bottom-content'>
                <Title level={4}>{title}</Title>
                <span>{designation}</span>
            </div>
            <div className="col-inner-content">
                <h4 className="ant-typography">{title}</h4>
                <p>{description}</p>
            </div>
            <div className='bg-overlay'></div>
        </div>
    )
}
