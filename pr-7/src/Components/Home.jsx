import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("movies")) || [];
    setMovies(stored);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Delete this movie?")) {
      const updated = movies.filter((m) => m.id !== id);
      setMovies(updated);
      localStorage.setItem("movies", JSON.stringify(updated));
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-light">All Movies</h2>
      <Row>
        {movies.length === 0 ? (
          <p className="text-secondary">No movies added yet.</p>
        ) : (
          movies.map((movie) => (
            <Col md={4} lg={3} sm={6} xs={12} key={movie.id} className="mb-4">
              <Card className="h-100 bg-secondary text-light">
                <Link to={`/movie/${movie.id}`}>
                  <Card.Img
                    variant="top"
                    src={movie.poster}
                    alt={movie.title}
                    style={{ height: "300px", objectFit: "cover" }}
                  />
                </Link>
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>

                  <p className="mb-1"><strong>Language:</strong> {movie.language || "N/A"}</p>
                  <p className="mb-1"><strong>Genres:</strong> {movie.genres || "N/A"}</p>
                  <p className="mb-3"><strong>Format:</strong> {movie.format || "N/A"}</p>

                  <div className="d-flex justify-content-between">
                    <Link to={`/edit/${movie.id}`}>
                      <Button variant="info" size="sm">
                        Edit
                      </Button>
                    </Link>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(movie.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default Home;
