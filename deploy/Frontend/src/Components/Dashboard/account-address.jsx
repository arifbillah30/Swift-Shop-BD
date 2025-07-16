// Frontend/src/Components/Dashboard/account-address.jsx

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/authContext';

const AddressForm = ({ address, setAddress, onSubmit, title }) => (
    <div className="checkoutDetailsSection" style={{ marginTop: "20px" }}>
        <h4>{title}</h4>
        <div className="checkoutDetailsForm">
            <form onSubmit={onSubmit}>
                <div className="checkoutDetailsFormRow">
                    <input
                        type="text"
                        placeholder="First Name"
                        value={address.first_name || ''}
                        onChange={(e) => setAddress({ ...address, first_name: e.target.value })}
                        style={{ flex: 1 }}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={address.last_name || ''}
                        onChange={(e) => setAddress({ ...address, last_name: e.target.value })}
                        style={{ flex: 1 }}
                        required
                    />
                </div>

                <input
                    type="text"
                    placeholder="Company Name (optional)"
                    value={address.company_name || ''}
                    onChange={(e) => setAddress({ ...address, company_name: e.target.value })}
                />

                <select
                    name="country"
                    id="country"
                    value={address.country || ''}
                    onChange={(e) => setAddress({ ...address, country: e.target.value })}
                    required
                >
                    <option value="" disabled>
                        Country / Region
                    </option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>

                    <option value="United States">United States</option>
                </select>

                <input
                    type="text"
                    placeholder="Street Address*"
                    value={address.address_line || ''}
                    onChange={(e) => setAddress({ ...address, address_line: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Town / City *"
                    value={address.city || ''}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Postcode / ZIP *"
                    value={address.postcode || ''}
                    onChange={(e) => setAddress({ ...address, postcode: e.target.value })}
                    required
                />

                <input
                    type="text"
                    placeholder="Phone *"
                    value={address.phone || ''}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    required
                />

                <button type="submit" className="btn btn-primary btn-checkout">
                    Save Address
                </button>
            </form>
        </div>
    </div>
);

const AccountAddress = () => {
    const { authData } = useAuth();
    const [isEditingBilling, setIsEditingBilling] = useState(false);
    const [isEditingShipping, setIsEditingShipping] = useState(false);
    const [billingAddress, setBillingAddress] = useState({});
    const [shippingAddress, setShippingAddress] = useState({});

    useEffect(() => {
        const fetchAddresses = async (userEmail) => {
          console.log("Fetching addresses for email:", userEmail);
          try {
            const response = await fetch(`/addresses/${userEmail}`);
            const data = await response.json();
            console.log("Fetched Addresses:", data);
      
            if (data.success && Array.isArray(data.data)) {
              // Find the billing and shipping addresses in the array
              const billingAddressData = data.data.find(address => address.address_type === 'billing');
              const shippingAddressData = data.data.find(address => address.address_type === 'shipping');
      
              // Update the state with the found addresses (or an empty object if not found)
              setBillingAddress(billingAddressData || {});
              setShippingAddress(shippingAddressData || {});
      
              // Log the complete addresses after updating the state
              console.log("Full Billing Address:", billingAddressData); 
              console.log("Full Shipping Address:", shippingAddressData); 
      
            } else {
              console.error("API response does not contain an array of addresses:", data);
            }
          } catch (error) {
            console.error("Error fetching addresses:", error);
          }
        };
      
        if (authData.user.email) {
          fetchAddresses(authData.user.email);
        }
      }, [authData.user.email]);

    const handleEditBilling = () => {
        setIsEditingBilling(true);
        setIsEditingShipping(false);
    };

    const handleEditShipping = () => {
        setIsEditingShipping(true);
        setIsEditingBilling(false);
    };

    const handleBillingSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/addresses/${authData.user.email}/billing`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(billingAddress),
            });

            const data = await response.json();
            if (data.success) {
                alert("Billing address updated successfully!");
                setIsEditingBilling(false);
            } else {
                alert("Failed to update billing address.");
            }
        } catch (error) {
            console.error('Error updating billing address:', error);
            alert("Failed to update billing address.");
        }
    };

    const handleShippingSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/addresses/${authData.user.email}/shipping`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(shippingAddress),
            });

            const data = await response.json();
            if (data.success) {
                alert("Shipping address updated successfully!");
                setIsEditingShipping(false);
            } else {
                alert("Failed to update shipping address.");
            }
        } catch (error) {
            console.error('Error updating shipping address:', error);
            alert("Failed to update shipping address.");
        }
    };

    return (
        <main>
            <div className="mb-4 pb-4"></div>
            <section className="my-account container">
                <h2 className="page-title">Addresses</h2>
                <div className="row">
                    <div className="col-lg-3">
                        <ul className="account-nav">
                            <li><a href="/account-dashboard" className="menu-link menu-link_us-s">Dashboard</a></li>
                            <li><a href="/account-orders" className="menu-link menu-link_us-s">Orders</a></li>
                            <li><a href="/account-address" className="menu-link menu-link_us-s menu-link_active">Addresses</a></li>
                            <li><a href="/account-details" className="menu-link menu-link_us-s">Account Details</a></li>
                            <li><a href="/account-wishlist" className="menu-link menu-link_us-s">Wishlist</a></li>
                            <li><a href="#" className="menu-link menu-link_us-s">Logout</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-9">
                        <div className="page-content my-account__address">
                            <p className="notice">The following addresses will be used on the checkout page by default.</p>
                            <div className="my-account__address-list">
                                <div className="my-account__address-item">
                                    <div className="my-account__address-item__title">
                                        <h5>Billing Address</h5>
                                        <a href="#billing" onClick={handleEditBilling} className="edit-button">Edit</a>
                                    </div>
                                    <div className="my-account__address-item__detail">
                                    <p>{billingAddress.first_name } {billingAddress?.last_name}</p>
                                    <p>{billingAddress?.address_line || 'Not provided'}</p>
                                        <p>{billingAddress?.city || 'Not provided'}</p>
                                        <p>{billingAddress?.postcode || 'Not provided'}</p>


                                        <p>{billingAddress?.country || 'Not provided'}</p>
                                        <br />
                                        <p>{billingAddress?.phone || 'Not provided'}</p>
                                    </div>
                                </div>
                                <div className="my-account__address-item">
                                    <div className="my-account__address-item__title">
                                        <h5>Shipping Address</h5>
                                        <a href="#shipping" onClick={handleEditShipping} className="edit-button">Edit</a>
                                    </div>
                                    <div className="my-account__address-item__detail">
                                        {/* Use optional chaining and provide fallback text */}
                                        <p>{shippingAddress.first_name || 'Not provided'} {shippingAddress?.last_name}</p>
                                        <p>{shippingAddress?.address_line || 'Not provided'}</p>
                                        <p>{shippingAddress?.city || 'Not provided'}</p>
                                        <p>{shippingAddress?.postcode || 'Not provided'}</p>


                                        <p>{shippingAddress?.country || 'Not provided'}</p>
                                        <br />
                                        <p>{shippingAddress?.phone || 'Not provided'}</p>
                                    </div>
                                </div>
                            </div>

                            {isEditingBilling && (
                                <AddressForm
                                    address={billingAddress}
                                    setAddress={setBillingAddress}
                                    onSubmit={handleBillingSubmit}
                                    title="Edit Billing Address"
                                />
                            )}

                            {isEditingShipping && (
                                <AddressForm
                                    address={shippingAddress}
                                    setAddress={setShippingAddress}
                                    onSubmit={handleShippingSubmit}
                                    title="Edit Shipping Address"
                                />
                            )}
                        </div>

                    </div>
                </div>

            </section>

        </main>

    );

};


export default AccountAddress;