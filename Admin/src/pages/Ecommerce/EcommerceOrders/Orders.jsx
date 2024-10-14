import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import "bootstrap/dist/css/bootstrap.min.css";
import TableContainer from "../../../components/Common/TableContainer";
import * as Yup from "yup";
import { useFormik } from "formik";
import Spinners from "../../../components/Common/Spinner";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { Button, Col, Row, FormGroup, Input, Label, Card, CardBody, Badge } from "reactstrap";
import { ToastContainer } from "react-toastify";

const EcommerceOrder = () => {
  document.title = "Orders | Swift Shop Admin & Dashboard";

  const [isEdit, setIsEdit] = useState(false);
  const [order, setOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form validation using Formik
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: order?.id || '',
      billingName: order?.billingName || '',
      orderDate: order?.orderDate || '',
      productPrice: order?.productPrice || '',
      paymentStatus: order?.paymentMethod
       || 'Paid',
      paymentMethod: order?.paymentMethod || 'Mastercard',
    },
    onSubmit: async (values) => {
      if (isEdit) {
        const updateOrder = {
          id: order.id, // Order ID from state
          ...values, // Use spread operator to get values
        };
        // Update order API call
        try {
          const response = await fetch(`http://localhost:5000/update-orders/${order.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateOrder),
          });

          if (!response.ok) throw new Error('Failed to update order');
          const updatedOrder = await response.json();
          console.log('Order updated:', updatedOrder);
          fetchOrders(); // Re-fetch orders
        } catch (error) {
          setError(error.message);
        }
      } else {
        const newOrder = {
          id: Math.floor(Math.random() * 1000), // Placeholder for ID
          ...values,
        };
        // Add new order API call
        try {
          const response = await fetch('http://localhost:5000/add-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newOrder),
          });

          if (!response.ok) throw new Error('Failed to add order');
          const addedOrder = await response.json();
          console.log('Order added:', addedOrder);
          fetchOrders(); // Re-fetch orders
        } catch (error) {
          setError(error.message);
        }
      }
      validation.resetForm();
      setIsEdit(false);
    },
  });

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/all-orders');
      if (!response.ok) throw new Error('Failed to fetch orders');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleOrderClick = (order) => {
    setOrder(order);
    setIsEdit(true);
  };

  const columns = useMemo(
    () => [
      {
        header: 'Order ID',
        accessorKey: 'id',
        cell: (cellProps) => <Link to="#" className="text-body fw-bold">{cellProps.row.original.id}</Link>,
      },
      {
        header: 'Billing Name',
        accessorKey: 'billingName',
      },
      {
        header: 'Date',
        accessorKey: 'createdDate',
      },
      {
        header: 'Price',
        accessorKey: 'productPrice',
        cell: (cellProps) => `$ ${cellProps.row.original.productPrice}`,
      },
      {
        header: 'Payment Status',
        accessorKey: 'paymentMethod',
        cell: (cellProps) => (
          <Badge className={`font-size-12 badge-soft-${cellProps.row.original.paymentStatus === "Paid" ? "success" : "danger"}`}>
            {cellProps.row.original.paymentStatus}
          </Badge>
        ),
      },
      {
        header: 'Payment Method',
        accessorKey: 'paymentMethod',
      },
      {
        header: 'Action',
        accessorKey: 'action',
        cell: (cellProps) => (
          <div className="d-flex gap-3">
            <Link to="#" className="text-success" onClick={() => handleOrderClick(cellProps.row.original)}>
              <i className="ri ri-pencil-fill font-size-18"></i>
            </Link>
            <Link to="#" className="text-danger" onClick={() => handleDeleteOrder(cellProps.row.original.id)}>
              <i className="ri ri-delete-bin-5-fill font-size-18"></i>
            </Link>
          </div>
        ),
      },
    ],
    [orders]
  );

  const handleDeleteOrder = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        const response = await fetch(`http://localhost:5000/delete-orders/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete order');
        fetchOrders(); // Re-fetch orders
      } catch (error) {
        setError(error.message);
      }
    }
  };

  if (loading) return <Spinners />;
  if (error) return <div>Error: {error}</div>;

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Ecommerce" breadcrumbItem="Orders" />
        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                <TableContainer
                  columns={columns}
                  data={orders}
                  isGlobalFilter={true}
                  SearchPlaceholder="Search Orders..."
                  tableClass="align-middle table-nowrap dt-responsive nowrap w-100"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default EcommerceOrder;