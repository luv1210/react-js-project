import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("movies")) || [];
    setMovies(data);
  }, []);

  // Delete movie
  const handleDelete = (id) => {
    const updated = movies.filter((movie) => movie.id !== id);
    setMovies(updated);
    localStorage.setItem("movies", JSON.stringify(updated));
  };


  // Clear all filters
  const clearFilters = () => {
    setSearch("");
    setLanguageFilter("");
    setSortBy("");
  };

  // ---- Filtering, Sorting, Searching Logic ----
  const filteredMovies = movies
    // SEARCHING (case-insensitive, trims spaces)
    .filter((m) =>
      m.title.toLowerCase().trim().includes(search.toLowerCase().trim())
    )

    // LANGUAGE FILTER
    .filter((m) => (languageFilter ? m.language === languageFilter : true))

    // SORTING
    .sort((a, b) => {
      if (sortBy === "az") return a.title.localeCompare(b.title);
      if (sortBy === "za") return b.title.localeCompare(a.title);
      if (sortBy === "latest") return b.id - a.id;
      if (sortBy === "oldest") return a.id - b.id;
      return 0;
    });

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
                <Card.Img
                  src={movie.poster}
                  style={{ height: "300px", objectFit: "cover" }}
                />

                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>{movie.language}</Card.Text>

                  <div className="d-flex justify-content-between mt-3">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(movie.id)}
                    >
                      Delete
                    </Button>

                    <Link to={`/edit/${movie.id}`}>
                      <Button variant="warning" size="sm">
                        Edit
                      </Button>
                    </Link>

                  
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
