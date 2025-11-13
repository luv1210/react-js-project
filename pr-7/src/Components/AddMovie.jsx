import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
    const [movie, setMovie] = useState({ title: "", poster: "", description: "" });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!movie.title || !movie.poster) {
            alert("Please fill title and poster link!");
            return;
        }

        const newMovie = { id: Date.now(), ...movie };
        const stored = JSON.parse(localStorage.getItem("movies")) || [];
        stored.push(newMovie);
        localStorage.setItem("movies", JSON.stringify(stored));

        
        navigate("/");
    };

    return (
        <Card className="p-4 bg-secondary text-light">
            <h3 className="mb-3">Add Movie</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Movie Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter movie title"
                        value={movie.title}
                        onChange={(e) => setMovie({ ...movie, title: e.target.value })}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Poster Link</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter poster URL"
                        value={movie.poster}
                        onChange={(e) => setMovie({ ...movie, poster: e.target.value })}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Language</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter movie language (e.g. English, Hindi)"
                        value={movie.language}
                        onChange={(e) => setMovie({ ...movie, language: e.target.value })}
                    />
                </Form.Group>

                
                <Form.Group className="mb-3">
                    <Form.Label>Genres</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter genres (e.g. Action, Drama, Comedy)"
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
                        placeholder="Short description"
                        value={movie.description}
                        onChange={(e) => setMovie({ ...movie, description: e.target.value })}
                    />
                </Form.Group>

                <Button variant="success" type="submit">
                    Add Movie
                </Button>
            </Form>
        </Card>
    );
};

export default AddMovie;
