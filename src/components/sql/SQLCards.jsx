// src/components/sql/SQLCards.jsx

import {
  Col,
  Row,
  Typography,
} from "antd";

import { KnowledgeCard } from "./KnowledgeCard";

const {
  Title,
  Paragraph,
} = Typography;

export const SQLCards = ({
  cards,
}) => {
  return (
    <>
      <Title level={3}>
        🧠 Learn
      </Title>

      <Paragraph type="secondary">
        Learn how SELECT, FROM,
        multiple columns, and * work
        in a basic SQL query.
      </Paragraph>

      <Row gutter={[16, 16]}>
        {cards.map((item) => (
          <Col
            key={item.id}
            xs={24}
            sm={12}
            md={8}
            lg={6}
          >
            <KnowledgeCard
              question={
                item.question
              }
              answer={
                item.answer
              }
              keyTakeaway={
                item.keyTakeaway
              }
            />
          </Col>
        ))}
      </Row>
    </>
  );
};