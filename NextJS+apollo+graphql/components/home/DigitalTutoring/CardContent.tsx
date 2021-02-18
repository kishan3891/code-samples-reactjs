import { Typography } from 'antd';
const { Title } = Typography;
import Link from 'next/link';
import parse from 'html-react-parser';

export interface CardContentProps {
    title: string;
    description: string;
    longDescription: string;
    imageSrc: string;
    href: string;
}

export default function CardContent({ title, description, longDescription, imageSrc, href }: CardContentProps) {
    return (
        <div className="card-col-inner">
            <img alt={title} src={imageSrc} />
            <div className="card-col-bottom-content">
                <Title level={4}>{title}</Title>
                <p>{description}</p>
            </div>
            <div className="col-inner-content">
                <Title level={4}>{title}</Title>
                {parse(longDescription)}
                <div className="col-inner-bottom">
                    <Link href={href}>
                        <a>
                            Learn More <img alt="Arrow" src="button-arrow.svg" />
                        </a>
                    </Link>
                </div>
            </div>
            <div className="bg-overlay"></div>
        </div>
    );
}
