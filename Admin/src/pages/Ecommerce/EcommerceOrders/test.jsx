// Admin/src/pages/Ecommerce/EcommerceOrders/index.jsx

import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import "bootstrap/dist/css/bootstrap.min.css";
import TableContainer from "../../../components/Common/TableContainer";
import * as Yup from "yup";
import { useFormik } from "formik";
import Spinners from "../../../components/Common/Spinner";

//import components
import Breadcrumbs from "../../../components/Common/Breadcrumb";

import {
  getOrders as onGetOrders,
  addNewOrder as onAddNewOrder,
  updateOrder as onUpdateOrder,
} from "/src/store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

import { Button, Col, Row, UncontrolledTooltip, Input, Label, Card, CardBody, FormGroup, Badge } from "reactstrap";
import { ToastContainer } from "react-toastify";

//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";

const EcommerceOrder = () => {
  //meta title
  document.title = "Orders | Swift Shop Admin & Dashboard";

  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [order, setOrder] = useState(null);

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      orderId: (order && order.orderId) || '',
      billingName: (order && order.billingName) || '',
      orderDate: (order && order.orderDate) || '',
      total: (order && order.total) || '',
      paymentStatus: (order && order.paymentStatus) || 'Paid',
      badgeClass: (order && order.badgeClass) || 'success',
      paymentMethod: (order && order.paymentMethod) || 'Mastercard',
    },
    validationSchema: Yup.object({
      orderId: Yup.string()
        .matches(
          /[0-9\.\-\s+\/()]+/,
          "Please Enter Valid Order Id"
        ).required("Please Enter Your Order Id"),
      billingName: Yup.string().required("Please Enter Your Billing Name"),
      orderDate: Yup.string().required("Please Enter Your Order Date"),
      total: Yup.string().matches(
        /[0-9\.\-\s+\/()]+/,
        "Please Enter Valid Amount"
      ).required("Total Amount"),
      paymentStatus: Yup.string().required("Please Enter Your Payment Status"),
      badgeClass: Yup.string().required("Please Enter Your Badge Class"),
      paymentMethod: Yup.string().required("Please Enter Your Payment Method"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateOrder = {
          id: order ? order.id : 0,
          orderId: values.orderId,
          billingName: values.billingName,
          orderDate: values.orderDate,
          total: values.total,
          paymentStatus: values.paymentStatus,
          paymentMethod: values.paymentMethod,
          badgeClass: values.badgeClass,
        };
        // update order
        dispatch(onUpdateOrder(updateOrder));
        validation.resetForm();
      } else {
        const newOrder = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          orderId: values["orderId"],
          billingName: values["billingName"],
          orderDate: values["orderDate"],
          total: values["total"],
          paymentStatus: values["paymentStatus"],
          paymentMethod: values["paymentMethod"],
          badgeClass: values["badgeClass"],
        };
        // save new order
        dispatch(onAddNewOrder(newOrder));
        validation.resetForm();
      }
      toggle();
    },
  });
  const [transaction, setTransaction] = useState("")

  const toggleViewModal = () => setModal1(!modal1);

  const dispatch = useDispatch();

  const EcommerceOrderProperties = createSelector(
    (state) => state.ecommerce,
    (Ecommerce) => ({
      orders: Ecommerce.orders,
      loading: Ecommerce.loading
    })
  );

  const {
    orders, loading
  } = useSelector(EcommerceOrderProperties);

  const [isLoading, setLoading] = useState(loading)

  useEffect(() => {
    if (orders && !orders.length) {
      dispatch(onGetOrders());
    }
  }, [dispatch, orders]);

  useEffect(() => {
    setOrder(orders);
  }, [orders]);

  useEffect(() => {
    if (!isEmpty(orders) && !!isEdit) {
      setOrder(orders);
      setIsEdit(false);
    }
  }, [orders]);

  const toggle = () => {
    if (modal) {
      setModal(false);
      setOrder(null);
    } else {
      setModal(true);
    }
  };

  const handleOrderClick = (arg) => {
    const order = arg;
    setOrder({
      id: order.id,
      orderId: order.orderId,
      billingName: order.billingName,
      orderDate: order.orderDate,
      total: order.total,
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod,
      badgeClass: order.badgeClass,
    });

    setIsEdit(true);

    toggle();
  };

 


  const handleOrderClicks = () => {
    setOrder("");
    setIsEdit(false);
    toggle();
  };

  const columns = useMemo(
    () => [
      {
        header: () => {
          return (
            <FormGroup check className="font-size-16">
              <Label check>
                <Input type="checkbox" id="checkAll" />
              </Label>
            </FormGroup>
          )
        },
        accessorKey: "id",
        cell: () => (
          <FormGroup check className="font-size-16">
            <Label check>
              <Input type="checkbox" id="checkAll" />
            </Label>
          </FormGroup>
        ),
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: 'Order ID',
        accessorKey: 'orderId',
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return <Link to="#" className="text-body fw-bold">{cellProps.row.original.orderId}</Link>
        }
      },
      {
        header: 'Billing Name',
        accessorKey: 'billingName',
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: 'Date',
        accessorKey: 'orderDate',
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: 'Total',
        accessorKey: 'total',
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return `$ ${cellProps.row.original.total}`;
        }
      },
      {
        header: 'Payment Status',
        accessorKey: 'paymentStatus',
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return <Badge
            className={"font-size-12 badge-soft-" +
              (cellProps.row.original.paymentStatus === "Paid" ? "success" : "danger" && cellProps.row.original.paymentStatus === "Refund" ? "warning" : "danger")}
          >
            {cellProps.row.original.paymentStatus}
          </Badge>;
        }
      },
      {
        header: 'Payment Method',
        accessorKey: 'paymentMethod',
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return <span>
            <i
              className={
                (cellProps.row.original.paymentMethod === "Paypal" ? "fab fa-cc-paypal me-1" : "" ||
                  cellProps.row.original.paymentMethod === "COD" ? "fab fas fa-money-bill-alt me-1" : "" ||
                    cellProps.row.original.paymentMethod === "Mastercard" ? "fab fa-cc-mastercard me-1" : "" ||
                      cellProps.row.original.paymentMethod === "Visa" ? "fab fa-cc-visa me-1" : ""
                )}
            />{" "}
            {cellProps.row.original.paymentMethod}
          </span>;
        }
      },
      {
        header: 'View Details',
        enableColumnFilter: false,
        enableSorting: false,
        cell: (cellProps) => {
          return (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              onClick={() => {
                const orderData = cellProps.row.original; toggleViewModal(orderData);
                setTransaction(cellProps.row.original)
              }}
            >
              View Details
            </Button>);
        }
      },
      {
        header: 'Action',
        accessorKey: 'action',
        enableColumnFilter: false,
        enableSorting: false,
        cell: (cellProps) => {
          return (
            <div className="d-flex gap-3">
              <Link
                to="#"
                className="text-success"
                onClick={() => {
                  const orderData = cellProps.row.original;
                  handleOrderClick(orderData);
                }}
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </Link>
            </div>
          );
        }
      },
    ],
    [handleOrderClick, toggleViewModal]
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Orders" />
          <Row>
            {
              isLoading ? <Spinners setLoading={setLoading} />
                :
                <Col xs="12">
                  <Card>
                    <CardBody>
                      <TableContainer
                        columns={columns}
                        data={orders || []}
                        isGlobalFilter={true}
                        isAddButton={true}
                        isCustomPageSize={true}
                        handleUserClick={handleOrderClicks}
                        isPagination={true}
                        SearchPlaceholder="26 records..."
                        buttonClass="btn btn-success btn-rounded waves-effect waves-light mb-2 me-2 addOrder-modal"
                        tableClass="align-middle table-nowrap dt-responsive nowrap w-100 table-check dataTable no-footer dtr-inline"
                        theadClass="table-light"
                        pagination="pagination"
                        paginationWrapper="dataTables_paginate paging_simple_numbers pagination-rounded"
                      />
                    </CardBody>
                  </Card>
                </Col>
            }
          </Row>
        </div>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
}
EcommerceOrder.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default EcommerceOrder;
