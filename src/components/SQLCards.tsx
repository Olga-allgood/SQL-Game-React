import { Row, Col, Typography } from "antd";
import { QuestionCard } from "./QuestionCard";
import { questions } from "../data/questions";

const { Title } = Typography;

export const SQLCards = () => {
  return (
    <>
      <Title level={2}>SQL Knowledge Cards</Title>

      <Row gutter={[16, 16]}>
        {questions.map((item) => (
          <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
            <QuestionCard
              question={item.question}
              answer={item.answer}
              keyTakeaway={item.keyTakeaway}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};