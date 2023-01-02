import React, { FormEvent, useRef, useState } from "react";
import { Form, Stack, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "../../App";
import { v4 as uuidv4 } from "uuid";

type NoteFromProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (data: Tag) => void;
  avaiableTags: Tag[];
};

export default function NoteForm({
  onSubmit,
  onAddTag,
  avaiableTags,
}: NoteFromProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markDownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setselectedTags] = useState<Tag[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markDownRef.current!.value,
      tags: selectedTags,
    });
  };

  return (
    <Form className="w-100" onSubmit={handleSubmit}>
      <Stack direction="vertical" gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label> Title</Form.Label>
              <Form.Control ref={titleRef} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label> Tags</Form.Label>
              <CreatableReactSelect
                options={avaiableTags.map((tag) => {
                  return {
                    label: tag.label,
                    value: tag.value,
                  };
                })}
                onCreateOption={(label) => {
                  const newTag = { id: uuidv4(), label };
                  onAddTag(newTag);
                  setselectedTags((prev) => [...prev, newTag]);
                }}
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
        <Row>
          <Form.Group controlId="textArea">
            <Form.Label> Body</Form.Label>
            <Form.Control ref={markDownRef} required as="textarea" rows={17} />
          </Form.Group>
        </Row>
        <Stack gap={2} direction="horizontal" className="justify-content-end">
          <Button variant="secondary" type="submit">
            {" "}
            Save{" "}
          </Button>
          <Link to="..">
            <Button variant="outline-secondary" type="submit">
              {" "}
              Cancel{" "}
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
}
