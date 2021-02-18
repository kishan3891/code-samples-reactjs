import { Typography } from "antd";
const { Title } = Typography;

export interface PopOverContentProps {
  title: string;
  description: string;
  imageSrc: string;
}

export default function PopOverContent({
  title,
  description,
  imageSrc,
}: PopOverContentProps) {
  return (
    <div className='card-col-inner'>
      <img alt={title} src={imageSrc} />
      <div className="col-inner-content">
        <Title level={4}>{title}</Title>
        <p>{description}</p>
      </div>
    </div>
  );
}
