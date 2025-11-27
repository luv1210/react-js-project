import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  // For Modal
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("movies")) || [];
    setMovies(data);
  }, []);

  // Delete movie
  const handleDelete = (id) => {
    const updated = movies.filter((movie) => movie.id !== id);
    setMovies(updated);
    localStorage.setItem("movies", JSON.stringify(updated));
    setShowModal(false);
  };

  // Clear filters
  const clearFilters = () => {
    setSearch("");
    setLanguageFilter("");
    setSortBy("");
  };

  // Search, Filter, Sort
  const filteredMovies = movies
    .filter((m) =>
      m.title.toLowerCase().trim().includes(search.toLowerCase().trim())
    )
    .filter((m) => (languageFilter ? m.language === languageFilter : true))
    .sort((a, b) => {
      if (sortBy === "az") return a.title.localeCompare(b.title);
      if (sortBy === "za") return b.title.localeCompare(a.title);
      if (sortBy === "latest") return b.id - a.id;
      if (sortBy === "oldest") return a.id - b.id;
      return 0;
    });

  // Open Modal
  const handleCardClick = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  return (
    <div>
      {/* Filters Section */}
      <Row className="mb-4">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>

        <Col md={3}>
          <Form.Select
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
          >
            <option value="">Filter by Language</option>
            <option value="Hindi">Hindi</option>
            <option value="English">English</option>
            <option value="Gujarati">Gujarati</option>
            <option value="Tamil">Tamil</option>
            <option value="Telugu">Telugu</option>
          </Form.Select>
        </Col>

        <Col md={3}>
          <Form.Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="az">Title A → Z</option>
            <option value="za">Title Z → A</option>
            <option value="latest">Latest Added</option>
            <option value="oldest">Oldest Added</option>
          </Form.Select>
        </Col>

        <Col md={2}>
          <Button variant="secondary" className="w-100" onClick={clearFilters}>
            Clear
          </Button>
        </Col>
      </Row>

      {/* Movie List */}
      <Row>
        {filteredMovies.length === 0 ? (
          <p>No movies found.</p>
        ) : (
          filteredMovies.map((movie) => (
            <Col md={3} sm={6} xs={12} key={movie.id} className="mb-4">
              <Card className="h-100 bg-dark text-light">

                {/* CLICK AREA FOR MODAL */}
                <div
                  onClick={() => handleCardClick(movie)}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Img
                    src={movie.poster}
                    style={{ height: "300px", objectFit: "cover" }}
                  />

                  <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>{movie.language}</Card.Text>
                  </Card.Body>
                </div>

                {/* BUTTONS (Do NOT open modal) */}
                <div className="d-flex justify-content-between p-2">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(movie.id)}
                  >
                    Delete
                  </Button>

                  <Link to={`/edit/${movie.id}`}>
                    <Button variant="warning" size="sm">Edit</Button>
                  </Link>
                </div>
              </Card>
            </Col>
          ))
        )}
      </Row>

      {/* Movie Detail Modal */}
      {selectedMovie && (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedMovie.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row>
              <Col md={5}>
                <img
                  src={selectedMovie.poster}
                  className="img-fluid rounded"
                  alt="poster"
                />
              </Col>

              <Col md={7}>
                <h5 className="mb-2">{selectedMovie.title}</h5>

                <p>
                  <strong>Description:</strong> <br />
                  {selectedMovie.description}
                </p>

                <p>
                  <strong>Language:</strong> {selectedMovie.language}
                </p>

                <p>
                  <strong>Genres:</strong> {selectedMovie.genres || "N/A"}
                </p>

                <p>
                  <strong>Format:</strong> {selectedMovie.format || "N/A"}
                </p>

                <p>
                  <strong>Industry:</strong> {selectedMovie.industry || "N/A"}
                </p>

                <p>
                  <strong>Timing:</strong> {selectedMovie.timing || "N/A"}
                </p>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={() => handleDelete(selectedMovie.id)}>
              Delete
            </Button>

            <Link to={`/edit/${selectedMovie.id}`}>
              <Button variant="warning">Edit</Button>
            </Link>

            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Home;
