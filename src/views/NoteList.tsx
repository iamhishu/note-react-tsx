import React, { useState } from "react";
import { Button, Col, Form, FormGroup, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Tag } from "./../App";

type NoteListProps = {
  availbleTags: Tag[];
};

export default function NoteList({ availbleTags }: NoteListProps) {
  const [selectedTags, setselectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col className="text-start">
          <h1>User Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <Button variant="dark" type="button">
                Create Note
              </Button>
            </Link>
            <Link to="/editTag">
              <Button variant="outline-dark" type="button">
                Edit Tag
              </Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label> Title</Form.Label>
              <Form.Control
                //   ref={titleRef}
                value={title}
                type="text"
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="Tags">
              <Form.Label> Tags </Form.Label>
              <ReactSelect
                options={availbleTags.map((tag) => {
                  return {
                    label: tag.label,
                    value: tag.value,
                  };
                })}
                isMulti
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setselectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3"></Row>
    </>
  );
}
