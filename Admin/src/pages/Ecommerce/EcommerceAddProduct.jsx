import React, { useState } from "react";
import { Button, Card, CardBody, CardTitle, Col, Container, Form, Input, Label, Row, FormFeedback } from "reactstrap";
import Dropzone from "react-dropzone";
import Select from "react-select";
import Breadcrumbs from "../../components/Common/Breadcrumb";

const EcommerenceAddProduct = () => {
  document.title = "Add Product | Swift Shop - Admin & Dashboard";

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [formData, setFormData] = useState({
    productname: '',
    color: '',
    brand: '',
    price: '',
    categories: '',
    productdesc: '',
    quantity: '',
    tags: [],
  });

  const [errors, setErrors] = useState({});

  const CategoryOptions = [
    { value: 'Accessories', label: 'Accessories' },
    { value: 'Decor', label: 'Decor' },
    { value: 'Furniture', label: 'Furniture' },
    { value: 'lighting', label: 'Lighting' },
    { value: 'Textiles', label: 'Textiles' },
    { value: 'Kitchenware', label: 'Kitchenware' },
    { value: 'Wall Art', label: 'Wall Art' },
    { value: 'Rugs', label: 'Rugs' },
    { value: 'Outdoor', label: 'Outdoor' },
    { value: 'Storage', label: 'Storage' },
  ];

  const options = [
    { value: 'homeDecor', label: 'Home Decor' },
    { value: 'interiorDesign', label: 'Interior Design' },
    { value: 'cozyVibes', label: 'Cozy Vibes' },
    { value: 'modernDecor', label: 'Modern Decor' },
    { value: 'vintageStyle', label: 'Vintage Style' },
    { value: 'rusticCharm', label: 'Rustic Charm' },
    { value: 'minimalistDesign', label: 'Minimalist Design' },
    { value: 'bohoDecor', label: 'Boho Decor' },
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (name) => (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedOption ? selectedOption.value : '',
    }));
  };

  const handleTagsChange = (selectedOptions) => {
    const tags = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setFormData((prevData) => ({
      ...prevData,
      tags,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.productname) newErrors.productname = 'Please Enter Your Product Name';
    if (!formData.color) newErrors.color = 'Select Your Color';
    if (!formData.brand) newErrors.brand = 'Please Enter Your Brand Name';
    if (!formData.price) newErrors.price = 'Please Enter Your Price';
    if (!formData.categories) newErrors.categories = 'Please Enter Your Category';
    if (formData.tags.length < 1) newErrors.tags = 'Please select at least one feature';
    if (!formData.productdesc) newErrors.productdesc = 'Please Enter Your Product Description';
    if (!formData.quantity || formData.quantity < 1) newErrors.quantity = 'Quantity Error! Minimum Quantity Should be 1';
    if (selectedFiles.length < 2) newErrors.images = 'Please upload at least 2 images.';
    if (selectedFiles.length > 5) newErrors.images = 'You can upload a maximum of 5 images.';

    return newErrors;
  };

  const handleReset = () => {
    setFormData({
      productname: '',
      color: '',
      brand: '',
      price: '',
      categories: '',
      productdesc: '',
      quantity: '',
      tags: [],
    });
    setSelectedFiles([]);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const formDataToSend = new FormData();

      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      selectedFiles.forEach(file => {
        formDataToSend.append('images', file);
      });

      const response = await fetch('http://localhost:5000/add-product', {
        method: 'POST',
        body: formDataToSend,
      });

      const responseText = await response.text();

      if (response.ok) {
        const data = JSON.parse(responseText);
        alert(`Product added successfully! Product ID: ${data.productId}`);
        handleReset();
      } else {
        const data = JSON.parse(responseText);
        alert(`Error: ${data.message || 'Failed to add product'}`);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const removeImage = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Add Product" />

          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <CardTitle tag="h4">Basic Information</CardTitle>
                  <p className="card-title-desc mb-4">Fill all information below</p>

                  <Form onSubmit={handleSubmit} autoComplete="off">
                    <Row>
                      <Col sm="6">
                        <div className="mb-3">
                          <Label htmlFor="productname">Product Name</Label>
                          <Input
                            id="productname"
                            name="productname"
                            type="text"
                            placeholder="Product Name"
                            value={formData.productname}
                            onChange={handleChange}
                            invalid={!!errors.productname}
                          />
                          {errors.productname && (
                            <FormFeedback type="invalid">{errors.productname}</FormFeedback>
                          )}
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="color">Color</Label>
                          <Input
                            id="color"
                            name="color"
                            type="text"
                            placeholder="Color"
                            value={formData.color}
                            onChange={handleChange}
                            invalid={!!errors.color}
                          />
                          {errors.color && (
                            <FormFeedback type="invalid">{errors.color}</FormFeedback>
                          )}
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="brand">Brand</Label>
                          <Input
                            id="brand"
                            name="brand"
                            type="text"
                            placeholder="Brand Name"
                            value={formData.brand}
                            onChange={handleChange}
                            invalid={!!errors.brand}
                          />
                          {errors.brand && (
                            <FormFeedback type="invalid">{errors.brand}</FormFeedback>
                          )}
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="price">Price</Label>
                          <Input
                            id="price"
                            name="price"
                            type="number"
                            placeholder="Price"
                            value={formData.price}
                            onChange={handleChange}
                            invalid={!!errors.price}
                          />
                          {errors.price && (
                            <FormFeedback type="invalid">{errors.price}</FormFeedback>
                          )}
                        </div>
                      </Col>

                      <Col sm="6">
                        <div className="mb-3">
                          <div className="control-label" style={{ marginBottom: "0.5rem" }}>Category</div>
                          <Select
                            name="categories"
                            options={CategoryOptions}
                            value={CategoryOptions.find((option) => option.value === formData.categories)}
                            onChange={handleSelectChange("categories")}
                          />
                          {errors.categories && (
                            <span className="text-danger">{errors.categories}</span>
                          )}
                        </div>
                        <div className="mb-3">
                          <div className="control-label" style={{ marginBottom: "0.5rem" }}>Tags</div>
                          <Select
                            classNamePrefix="select2-selection"
                            name="tags"
                            placeholder="Select..."
                            options={options}
                            isMulti
                            value={options.filter((option) => formData.tags.includes(option.value))}
                            onChange={handleTagsChange}
                          />
                          {errors.tags && (
                            <span className="text-danger">{errors.tags}</span>
                          )}
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="productdesc">Product Description</Label>
                          <Input
                            id="productdesc"
                            name="productdesc"
                            type="textarea"
                            placeholder="Product Description"
                            value={formData.productdesc}
                            onChange={handleChange}
                            invalid={!!errors.productdesc}
                          />
                          {errors.productdesc && (
                            <FormFeedback type="invalid">{errors.productdesc}</FormFeedback>
                          )}
                        </div>

                        <div className="mb-3">
                          <Label htmlFor="quantity">Quantity</Label>
                          <Input
                            id="quantity"
                            name="quantity"
                            type="number"
                            placeholder="Quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            invalid={!!errors.quantity}
                          />
                          {errors.quantity && (
                            <FormFeedback type="invalid">{errors.quantity}</FormFeedback>
                          )}
                        </div>
                      </Col>
                    </Row>


                    <Card>
                      <CardBody>
                        <CardTitle className="mb-3">Product Images</CardTitle>
                        <Dropzone
                          onDrop={(acceptedFiles) => {
                            const validFiles = acceptedFiles.filter(file => file.type.startsWith('image/'));
                            if (selectedFiles.length + validFiles.length <= 5) {
                              setSelectedFiles([...selectedFiles, ...validFiles]);
                            } else {
                              alert('You can only upload a maximum of 5 images.');
                            }
                          }}
                          accept="image/*"
                        >
                          {({ getRootProps, getInputProps }) => (
                            <div className="dropzone" {...getRootProps()}>
                              <input {...getInputProps()} />
                              <div className="dz-message needsclick">
                                <div className="mb-3">
                                  <i className="display-4 text-muted bx bxs-cloud-upload" />
                                </div>
                                <h4>Drop files here or click to upload.</h4>
                              </div>
                            </div>
                          )}
                        </Dropzone>

                        <div className="image-preview">
                          {selectedFiles.length > 0 && <h5>Image Previews:</h5>}
                          <div className="image-preview-container">
                            {selectedFiles.map((file, index) => (
                              <Card key={index} className="image-preview-card">
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt={`Preview ${index + 1}`}
                                  className="image-preview-img"
                                />
                                <CardBody>
                                  <CardTitle className="card-title">{file.name}</CardTitle>
                                  <Button color="danger" size="sm" onClick={() => removeImage(index)}>Remove</Button>
                                </CardBody>
                              </Card>
                            ))}
                          </div>
                          {errors.images && <p className="text-danger">{errors.images}</p>}
                        </div>

                        <div className="mt-4">
                          <Button type="submit" color="primary">Add Product</Button>
                          <Button type="reset" color="secondary" onClick={handleReset} className="ms-2">Reset</Button>
                        </div>
                      </CardBody>
                    </Card>

                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EcommerenceAddProduct;