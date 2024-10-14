import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Input,
  FormGroup,
  Label,
  Button,
} from "reactstrap";

// Import Editor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// FlatPickr
import "flatpickr/dist/themes/material_blue.css";
import FlatPickr from "react-flatpickr";

// Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";

const CreateBlog = () => {
  // Meta title
  document.title = "Create Blog | SwiftShop - Admin & Dashboard";

  const [startDate, setStartDate] = useState(new Date());
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogThumbnail, setBlogThumbnail] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const startDateChange = (date) => {
    setStartDate(date);
  };

  const handleThumbnailChange = (e) => {
    setBlogThumbnail(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error messages
    setErrorMessage("");

    // Form data for file upload
    const formData = new FormData();
    formData.append("blogThumbnail", blogThumbnail);
    formData.append("blogDate", startDate.toISOString().split("T")[0]);
    formData.append("blogHeading", blogTitle);
    formData.append("blogContent", blogContent);

    try {
      const response = await fetch('http://localhost:5000/blogs/add', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Blog post created successfully.');
        // Reset form fields
        setBlogTitle("");
        setBlogContent("");
        setBlogThumbnail(null);
        setStartDate(new Date());
      } else {
        const errorResponse = await response.json();
        setErrorMessage(errorResponse.message || 'Failed to create blog post.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('An error occurred while submitting the form.');
    }
  };

  return (
    <div className="page-content">
      <Container fluid>
        {/* Render Breadcrumbs */}
        <Breadcrumbs title="Blogs" breadcrumbItem="Create Blog" />

        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                <CardTitle className="mb-4">Create New Blog</CardTitle>
                <form onSubmit={handleSubmit}>
                  <FormGroup className="mb-4" row>
                    <Label htmlFor="blogTitle" className="col-form-label col-lg-2">
                      Blog Title
                    </Label>
                    <Col lg="10">
                      <Input
                        id="blogTitle"
                        name="blogTitle"
                        type="text"
                        placeholder="Enter Blog Name..."
                        value={blogTitle}
                        onChange={(e) => setBlogTitle(e.target.value)}
                        required
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup className="mb-4" row>
                    <Label className="col-form-label col-lg-2">
                      Blog Description
                    </Label>
                    <Col lg="10">
                      <CKEditor
                        editor={ClassicEditor}
                        data={blogContent}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setBlogContent(data);
                        }}
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup className="mb-4" row>
                    <Label className="col-form-label col-lg-2">
                      Blog Date
                    </Label>
                    <Col lg="10">
                      <FlatPickr
                        className="form-control"
                        name="blogDate"
                        options={{
                          dateFormat: "d M, Y",
                        }}
                        placeholder="Select Date"
                        value={startDate}
                        onChange={startDateChange}
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup className="mb-4" row>
                    <Label className="col-form-label col-lg-2">
                      Add Thumbnail
                    </Label>
                    <Col lg="10">
                      <Input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleThumbnailChange}
                        required
                      />
                    </Col>
                  </FormGroup>

                  {/* Display Error Message */}
                  {errorMessage && (
                    <Row>
                      <Col lg="10" className="offset-lg-2">
                        <div className="alert alert-danger">{errorMessage}</div>
                      </Col>
                    </Row>
                  )}

                  <Row className="justify-content-end">
                    <Col lg="10">
                      <Button type="submit" color="primary">
                        Create Blog
                      </Button>
                    </Col>
                  </Row>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CreateBlog;