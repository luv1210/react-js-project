import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, Button, Container } from "react-bootstrap";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("movies")) || [];
    const foundMovie = stored.find((m) => m.id === Number(id));
    if (foundMovie) {
      setMovie(foundMovie);
    }
  }, [id]);

  if (!movie) {
    return (
      <Container className="py-5 text-center text-light">
        <h2>Movie not found!</h2>
        <Link to="/" className="btn btn-light mt-3">
          Back to Home
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Card className="bg-secondary text-light p-4">
        <div className="d-flex flex-column flex-md-row align-items-center">
          <img
            src={movie.poster}
            alt={movie.title}
            className="rounded me-md-4 mb-3 mb-md-0"
            style={{ width: "300px", height: "400px", objectFit: "cover" }}
          />
          <div>
            <h2>{movie.title}</h2>
            <p className="text-light mt-3">
              <strong>Description:</strong> {movie.description || "No description available"}
            </p>
            <p>
              <strong>Language:</strong> {movie.language || "N/A"}
            </p>
            <p>
              <strong>Genres:</strong> {movie.genres || "N/A"}
            </p>
            <p>
              <strong>Format:</strong> {movie.format || "N/A"}
            </p>
            <p>
              <strong>Industry:</strong> {movie.industry || "N/A"}
            </p>
            <p>
              <strong>Timing:</strong> {movie.timing || "N/A"} minutes
            </p>
          </div>
        </div>
        <div className="mt-4">
          <Button variant="light" onClick={() => navigate(-1)}>
             Back
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default MovieDetail;
