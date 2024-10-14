import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/authContext'; // Adjust the path based on your folder structure

const AccountDetails = () => {
  const { authData, updateUserData } = useAuth(); 
    const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    displayName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Load user details from authData
    if (authData.user) {
      setFormData(prevData => ({
        ...prevData,
        firstName: authData.user.firstName || '',
        lastName: authData.user.lastName || '',
        displayName: authData.user.displayName || '',
        email: authData.user.email || '',
      }));
    }
  }, [authData]); // Add authData as a dependency

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName) {
      errors.firstName = 'First name is required.';
    }
    if (!formData.lastName) {
      errors.lastName = 'Last name is required.';
    }
    if (!formData.displayName) {
      errors.displayName = 'Display name is required.';
    }
    if (!formData.email) {
      errors.email = 'Email is required.';
    }
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords did not match!';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:5000/update-account', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            displayName: formData.displayName,
            email: formData.email,
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
          }),
        });

        if (response.ok) {

          updateUserData({
            firstName: formData.firstName,
            lastName: formData.lastName,
            displayName: formData.displayName,
            email: formData.email,
          });


          alert('Account details updated successfully!');
          // Optionally, update session storage or context if necessary
        } else {
          const data = await response.json();
          setFormErrors(prevErrors => ({
            ...prevErrors,
            server: data.message || 'Update failed',
          }));
        }
      } catch (error) {
        console.error('Error updating account:', error);
        setFormErrors(prevErrors => ({
          ...prevErrors,
          server: 'An error occurred. Please try again later.',
        }));
      }
    }
  };

  return (
    <main>
      <div className="mb-4 pb-4"></div>
      <section className="my-account container">
        <h2 className="page-title">Account Details</h2>
        <div className="row">
          <div className="col-lg-3">
            <ul className="account-nav">
              <li><a href="/account-dashboard" className="menu-link menu-link_us-s">Dashboard</a></li>
              <li><a href="/account-orders" className="menu-link menu-link_us-s">Orders</a></li>
              <li><a href="/account-address" className="menu-link menu-link_us-s">Addresses</a></li>
              <li><a href="/account-edit" className="menu-link menu-link_us-s menu-link_active">Account Details</a></li>
              <li><a href="/account-wishlist" className="menu-link menu-link_us-s">Wishlist</a></li>
              <li>
                <a href="/logout" className="menu-link menu-link_us-s">Logout</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-9">
            <div className="page-content my-account__edit">
              <div className="my-account__edit-form">
                <form name="account_edit_form" className="needs-validation" noValidate onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-floating my-3">
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="firstName">First Name</label>
                        {formErrors.firstName && (
                          <div className="invalid-feedback">{formErrors.firstName}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating my-3">
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Last Name"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="lastName">Last Name</label>
                        {formErrors.lastName && (
                          <div className="invalid-feedback">{formErrors.lastName}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-floating my-3">
                        <input
                          type="text"
                          className="form-control"
                          id="displayName"
                          placeholder="Display Name"
                          value={formData.displayName}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="displayName">Display Name</label>
                        {formErrors.displayName && (
                          <div className="invalid-feedback">{formErrors.displayName}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-floating my-3">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          disabled
                        />
                        <label htmlFor="email">Email Address</label>
                        {formErrors.email && (
                          <div className="invalid-feedback">{formErrors.email}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="my-3">
                        <h5 className="text-uppercase mb-0">Password Change</h5>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-floating my-3">
                        <input
                          type="password"
                          className="form-control"
                          id="currentPassword"
                          placeholder="Current password"
                          value={formData.currentPassword}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="currentPassword">Current password</label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-floating my-3">
                        <input
                          type="password"
                          className="form-control"
                          id="newPassword"
                          placeholder="New password"
                          value={formData.newPassword}
                          onChange={handleChange}
                        />
                        <label htmlFor="newPassword">New password</label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-floating my-3">
                        <input
                          type="password"
                          className="form-control"
                          id="confirmPassword"
                          placeholder="Confirm new password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                        />
                        <label htmlFor="confirmPassword">Confirm new password</label>
                        {formErrors.confirmPassword && (
                          <div className="invalid-feedback">{formErrors.confirmPassword}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="form-footer">
                    <button type="submit" className="btn btn-primary">Update Account</button>
                    {formErrors.server && (
                      <div className="text-danger">{formErrors.server}</div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AccountDetails;
