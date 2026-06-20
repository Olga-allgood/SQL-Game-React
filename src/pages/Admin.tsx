import { Descriptions } from "antd";
import Card from "antd/es/card/Card";


export default function Admin () {
    return (
        <Card title="Admin">
 <Descriptions>
    <Descriptions.Item label="Username">Admin</Descriptions.Item>
     <Descriptions.Item label="Email">admin@example.com</Descriptions.Item>
 </Descriptions>
        </Card>
    )

}