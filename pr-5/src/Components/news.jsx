import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './news.css';

const News = () => {
  const articles = [
    {
      id: 1,
      title: "Tips & Procedure To Apply Luxury Beauty Cosmetic Cream",
      category: "Natural Cleansers",
      image: "https://images.unsplash.com/photo-1600180758890-6d8cf9fcd7b6",
      author: "Hiếu Bùi",
      date: "Jan 10, 2025",
    },
    {
      id: 2,
      title: "The Best Way To Select Good High-End Cosmetic Products",
      category: "Cosmetics",
      image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
      author: "Hiếu Bùi",
      date: "Jan 10, 2025",
    },
    {
      id: 3,
      title: "Lightweight Makeup To Enhance Your Natural Beauty",
      category: "Make Up",
      image: "https://images.unsplash.com/photo-1596464716121-3808e0a5f9c2",
      author: "Hiếu Bùi",
      date: "Jan 10, 2025",
    },
    {
      id: 4,
      title: "Natural Cleansers",
      category: "Make Up",
      image: "https://images.unsplash.com/photo-1596464716121-3808e0a5f9c2",
      author: "Hiếu Bùi",
      date: "Jan 10, 2025",
    },
       {
      id: 5,
      title: "Lightweight Makeup To Enhance Your Natural Beauty",
      category: "Make Up",
      image: "https://images.unsplash.com/photo-1596464716121-3808e0a5f9c2",
      author: "Hiếu Bùi",
      date: "Jan 10, 2025",
    },
       {
      id: 6,
      title: "Lightweight Makeup To Enhance Your Natural Beauty",
      category: "Make Up",
      image: "https://images.unsplash.com/photo-1596464716121-3808e0a5f9c2",
      author: "Hiếu Bùi",
      date: "Jan 10, 2025",
    },
  ];

  return (
    <Container className="my-5 news-container">
      <h2 className="text-center mb-4 fw-bold">News</h2>
      <Row>
        {articles.map((article) => (
          <Col key={article.id} md={4} className="mb-4">
            <Card className="news-card border-0 shadow-sm">
              <Card.Img
                variant="top"
                src={article.image}
                className="news-img"
              />
              <Card.Body>
                <small className="text-muted d-block mb-1">
                  {article.category}
                </small>
                <Card.Title className="fw-semibold fs-6 mb-2">
                  {article.title}
                </Card.Title>
                <div className="d-flex justify-content-between text-muted small">
                  <span>By {article.author}</span>
                  <span>{article.date}</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default News;
