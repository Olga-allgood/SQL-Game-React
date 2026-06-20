import { Descriptions } from "antd";
import Card from "antd/es/card/Card";


export default function Student () {
    return (
        <Card>
 <Descriptions>
    <Descriptions.Item label="Username">Jack Smith </Descriptions.Item>
     <Descriptions.Item label="Email">jack.smith@example.com</Descriptions.Item>
 </Descriptions>
        </Card>
    )

}