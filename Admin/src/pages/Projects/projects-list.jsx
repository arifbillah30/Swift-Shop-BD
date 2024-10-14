import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import moment from 'moment';

import {
  Badge,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  FormFeedback,
  Label,
  UncontrolledTooltip,
  Button,
  Card,
  CardBody,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";

//Import Images
import companies01 from "../../assets/images/companies/img-1.png";

import Flatpickr from 'react-flatpickr';
import "flatpickr/dist/themes/material_blue.css";

//Import Component
import Breadcrumbs from "../../components/Common/Breadcrumb";
import DeleteModal from "../../components/Common/DeleteModal";

import {
  getProjects as onGetProjects,
  updateProject as onUpdateProject,
  deleteProject as onDeleteProject,
} from "../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

import Spinners from "../../components/Common/Spinner";
import { ToastContainer } from "react-toastify";
import TableContainer from "../../components/Common/TableContainer";

const ProjectStatus = ({ status }) => {
  switch (status) {
    case "Pending":
      return <Badge className="bg-warning"> {status} </Badge>;

    case "Delay":
      return <Badge className="bg-danger"> {status} </Badge>;

    case "Completed":
      return <Badge className="bg-success"> {status} </Badge>;

    default:
      return <Badge className="bg-success"> {status} </Badge>;
  }
};

const ProjectsList = () => {
  //meta title
  document.title = "Project List | Skote - React Admin & Dashboard Template";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ProjectsProjectProperties = createSelector(
    (state) => state.projects,
    (Projects) => ({
      projects: Projects.projects,
      loading: Projects.loading
    })
  );

  const { projects, loading } = useSelector(ProjectsProjectProperties);

  const [isLoading, setLoading] = useState(loading)
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [project, setProject] = useState();
  const [projectData, setProjectData] = useState();

  const toggle = () => {
    if (modal) {
      setModal(false);
      setProject(null);
    } else {
      setModal(true);
    }
  };


  const handleProjectClick = useCallback((arg) => {
    const project = arg;
    setProject({
      id: project.id,
      img: project.img,
      name: project.name,
      description: project.description,
      status: project.status,
      color: project.color,
      dueDate: project.dueDate,
      team: project.team,
    });

    setIsEdit(true);

    toggle();
  }, [toggle]);

  //delete order
  const [deleteModal, setDeleteModal] = useState(false);
  const onClickDelete = useCallback((project) => {
    setProject(project);
    setDeleteModal(true);
  }, []);

  const handleDeleteOrder = () => {
    if (project && project.id) {
      dispatch(onDeleteProject(project.id));
    }
    setDeleteModal(false);
  };

  useEffect(() => {
    dispatch(onGetProjects());
  }, [dispatch]);

  useEffect(() => {
    setProjectData(projects);
  }, [projects]);

  const [selectedImage, setSelectedImage] = useState();

  const handleImageChange = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      setSelectedImage(reader.result);
      validation.setFieldValue("img", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleProjectClicks = () => {
    navigate("/projects-create")
  }

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (project && project.id) || "",
      img: (project && project.img) || "",
      name: (project && project.name) || "",
      description: (project && project.description) || "",
      status: (project && project.status) || "",
      color: (project && project.color) || "",
      dueDate: (project && project.dueDate) || "",
      team: (project && project.team) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      description: Yup.string().required("Please Enter Your Description"),
      status: Yup.string().required("Please Enter Your Status"),
      color: Yup.string().required("Please Enter Your Color"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateProject = {
          id: project.id,
          img: values.img,
          name: values.name,
          description: values.description,
          status: values.status,
          color: values.color,
          dueDate: values.dueDate,
          team: values.team,
        };
        // update project
        dispatch(onUpdateProject(updateProject));
      }
      toggle();
    },
  });


  const columns = useMemo(
    () => [
      {
        header: "#",
        accessorKey: "img",
        cell: (cellProps) => (
          <div className="avatar-sm bg-light rounded p-2">
            <img src={cellProps.row.original.img} alt="" className="img-fluid rounded-circle" />
          </div>
        ),
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Projects",
        accessorKey: "Projects",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <>
              <h5 className="text-truncate font-size-14">
                <Link to={`/projects-overview/${cellProps.row.original.id}`} className="text-dark">{cellProps.row.original.name} </Link>
              </h5>
              <p className="text-muted mb-0">{cellProps.row.original.description}</p>
            </>
          );
        }
      },
      {
        header: "Due Date",
        accessorKey: "dueDate",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: (cellProps) => <ProjectStatus status={cellProps.row.original.status} />,
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Team",
        accessorKey: "total",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <div className="avatar-group">
              {cellProps.row.original.team.map((member, index) =>
                <div className="avatar-group-item" key={index}>
                  {!member.img || member.img !== "Null" ?
                    <React.Fragment>
                      <UncontrolledTooltip
                        placement="top"
                        target={`UncontrolledTooltipExample-${member.id}`}
                      >
                        {member.fullname}
                      </UncontrolledTooltip>
                      <Link to="#" className="team-member d-inline-block" id={`UncontrolledTooltipExample-${member.id}`} onClick={() => console.log("click")}>
                        <img src={member.img} className="rounded-circle avatar-xs" alt="" />
                      </Link>
                    </React.Fragment>
                    :
                    <React.Fragment>
                      <UncontrolledTooltip
                        placement="top"
                        target={`UncontrolledTooltipExample-${member.id}`}
                      >
                        {member.name}
                      </UncontrolledTooltip>
                      <Link to="#" className="d-inline-block" id={`UncontrolledTooltipExample-${member.id}`} >
                        <div className="avatar-xs">
                          <span className={`avatar-title rounded-circle bg-${member.color}  text-white font-size-16`}>{member.name}</span>
                        </div>
                      </Link>
                    </React.Fragment>
                  }
                </div>
              )}
            </div>
          );
        }
      },
      {
        header: "Action",
        enableColumnFilter: false,
        enableSorting: false,
        cell: (cellProps) => {
          return (
            <UncontrolledDropdown>
              <DropdownToggle tag="a" href="#" className="card-drop">
                <i className="mdi mdi-dots-horizontal font-size-18" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem href="#!" onClick={() => handleProjectClick(cellProps.row.original)}>
                  <i className="mdi mdi-pencil font-size-16 text-success me-1" />Edit
                </DropdownItem>
                <DropdownItem href="#!" onClick={() => onClickDelete(cellProps.row.original)}>
                  <i className="mdi mdi-trash-can font-size-16 text-danger me-1" />Delete
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          );
        }
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteOrder}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Projects" breadcrumbItem="Projects List" />
          <Row>
            <Col lg="12">
              <div>
                {
                  isLoading ? <Spinners setLoading={setLoading} />
                    :
                    <Row>
                      <Col lg={12}>
                        <Card>
                          <CardBody>
                            <TableContainer
                              columns={columns}
                              data={projectData}
                              isGlobalFilter={true}
                              isAddButton={true}
                              isPagination={true}
                              isCustomPageSize={true}
                              handleUserClick={handleProjectClicks}
                              SearchPlaceholder="9 records..."
                              buttonClass="btn btn-success btn-rounded"
                              buttonName=" Add New Project"
                              tableClass="project-list-table align-middle table-nowrap dt-responsive nowrap w-100 table-borderless dataTable no-footer dtr-inline"
                              theadClass="table-light"
                              paginationWrapper="dataTables_paginate paging_simple_numbers pagination-rounded"
                              pagination="pagination"
                            />
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                }
              </div>
            </Col>
          </Row>

          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} tag="h4">
              {!!isEdit ? "Edit Project" : "Add Project"}
            </ModalHeader>
            <ModalBody>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
                autoComplete="off">

                <Row>
                  <Col xs={12}>
                    <div className="text-center">
                      <div className="position-relative d-inline-block">
                        <div className="position-absolute bottom-0 end-0">
                          <Label htmlFor="customer-image-input" className="mb-0" id="tooltip">
                            <div className="avatar-xs cursor-pointer">
                              <div className="avatar-title bg-light border rounded-circle text-muted">
                                <i className="bx bx-images"></i>
                              </div>
                            </div>
                          </Label>
                          <UncontrolledTooltip placement="right" target="tooltip">
                            Select Image
                          </UncontrolledTooltip>
                          <Input name="picture" className="form-control d-none" value="" id="customer-image-input" type="file" accept="image/png, image/gif, image/jpeg" onChange={handleImageChange} />
                        </div>
                        <div className="avatar-lg p-1">
                          <div className="avatar-title bg-light rounded-circle">
                            <img src={selectedImage || companies01} alt="" id="customer-img" className="avatar-md rounded-circle object-cover" />
                          </div>
                        </div>
                      </div>
                      {validation.errors.picture && validation.touched.picture ? (
                        <FormFeedback type="invalid" className='d-block'> {validation.errors.picture} </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label>Name</Label>
                      <Input
                        name="name"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.name || ""}
                        invalid={
                          validation.touched.name && validation.errors.name ? true : false
                        }
                      />
                      {validation.touched.name && validation.errors.name ? (
                        <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-3">
                      <Label>Description</Label>
                      <Input
                        name="description"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.description || ""}
                        invalid={
                          validation.touched.description && validation.errors.description ? true : false
                        }
                      />
                      {validation.touched.description && validation.errors.description ? (
                        <FormFeedback type="invalid">{validation.errors.description}</FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-3">
                      <Label>Status</Label>
                      <Input
                        name="status"
                        id="status1"
                        type="select"
                        className="form-select"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.status || ""}
                        invalid={
                          validation.touched.status && validation.errors.status ? true : false
                        }
                      >
                        <option>Completed</option>
                        <option>Pending</option>
                        <option>Delay</option>
                      </Input>
                      {validation.touched.status && validation.errors.status ? (
                        <FormFeedback type="invalid">{validation.errors.status}</FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-3">
                      <Label>Color</Label>
                      <Input
                        name="color"
                        type="select"
                        className="form-select"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.color || ""}
                        invalid={
                          validation.touched.color && validation.errors.color ? true : false
                        }
                      >
                        <option>success</option>
                        <option>warning</option>
                        <option>danger</option>
                      </Input>
                      {validation.touched.color && validation.errors.color ? (
                        <FormFeedback type="invalid">{validation.errors.color}</FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-3">
                      <Label>DueDate</Label>
                      <Flatpickr
                        type="date"
                        name="dueDate"
                        className="form-control"
                        value={validation.values.dueDate || ""}
                        onChange={(date) => validation.setFieldValue("dueDate", moment(date[0]).format('DD MMMM, YYYY'))}
                        options={{
                          mode: "single",
                          dateFormat: "d M, Y"
                        }}
                      />
                      {
                        validation.touched.dueDate && validation.errors.dueDate ? (
                          <span className="text-danger">{validation.errors.dueDate}</span>
                        ) : null
                      }
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="text-end">
                      <Button type="submit" color="success" className="save-user">Save</Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
          </Modal>
        </Container>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default ProjectsList;
