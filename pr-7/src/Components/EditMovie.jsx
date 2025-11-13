import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Form, Button } from "react-bootstrap";

const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState({
    title: "",
    poster: "",
    description: "",
    language: "",
    genres: "",
    format: "",
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("movies")) || [];
    const found = stored.find((m) => m.id === Number(id));
    if (found) setMovie(found);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const stored = JSON.parse(localStorage.getItem("movies")) || [];
    const updated = stored.map((m) => (m.id === Number(id) ? movie : m));
    localStorage.setItem("movies", JSON.stringify(updated));
    navigate("/"); // go back to home
  };

  return (
    <Card className="p-4 bg-secondary text-light mt-4">
      <h3 className="mb-3">Edit Movie</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Movie Title</Form.Label>
          <Form.Control
            type="text"
            value={movie.title}
            onChange={(e) => setMovie({ ...movie, title: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Poster Link</Form.Label>
          <Form.Control
            type="text"
            value={movie.poster}
            onChange={(e) => setMovie({ ...movie, poster: e.target.value })}
          />
        </Form.Group>


        <Form.Group className="mb-3">
          <Form.Label>Language</Form.Label>
          <Form.Control
            type="text"
            value={movie.language}
            onChange={(e) => setMovie({ ...movie, language: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Genres</Form.Label>
          <Form.Control
            type="text"
            value={movie.genres}
            onChange={(e) => setMovie({ ...movie, genres: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Format</Form.Label>
          <Form.Select
            value={movie.format}
            onChange={(e) => setMovie({ ...movie, format: e.target.value })}
          >
            <option value="">Select format</option>
            <option value="2D">2D</option>
            <option value="3D">3D</option>
            <option value="IMAX">IMAX</option>
            <option value="4DX">4DX</option>
          </Form.Select>
        </Form.Group>


        <Form.Group className="mb-3">
          <Form.Label>Industry</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter industry (e.g. Bollywood, Hollywood)"
            value={movie.industry}
            onChange={(e) => setMovie({ ...movie, industry: e.target.value })}
          />
        </Form.Group>

        
        <Form.Group className="mb-3">
          <Form.Label>Movie Timing</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter duration (e.g. 2h 15m)"
            value={movie.timing}
            onChange={(e) => setMovie({ ...movie, timing: e.target.value })}
          />
        </Form.Group>



        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={movie.description}
            onChange={(e) => setMovie({ ...movie, description: e.target.value })}
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Save Changes
        </Button>
        <Button variant="light" className="ms-2" onClick={() => navigate("/")}>
          Cancel
        </Button>
      </Form>
    </Card>
  );
};

export default EditMovie;
