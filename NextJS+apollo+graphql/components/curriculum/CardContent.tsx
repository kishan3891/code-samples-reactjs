import { Typography } from 'antd';
const { Title } = Typography;

export interface CardContentProps {
    title: string;
    longDescription: string;
    imageSrc: string;
}

export default function CardContent({
    title,
    longDescription,
    imageSrc
}: CardContentProps) {
    return (
        <div className="card-col-inner">
            <img alt={title} src={imageSrc} />
            <div className="col-inner-content">
                <Title level={4}>{title}</Title>
                <p>{longDescription}</p>
            </div>
        </div>
    );
}