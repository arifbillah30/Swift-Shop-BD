import React from 'react';
import { Link } from 'react-router-dom';

const AccountOrders = () => {
  return (
    <main>
      <div className="mb-4 pb-4"></div>
      <section className="my-account container">
        <h2 className="page-title">Orders</h2>
        <div className="row">
          <div className="col-lg-3">
            <ul className="account-nav">
              <li><Link to="/account-dashboard" className="menu-link menu-link_us-s">Dashboard</Link></li>
              <li><Link to="/account-orders" className="menu-link menu-link_us-s menu-link_active">Orders</Link></li>
              <li><Link to="/account-edit-address" className="menu-link menu-link_us-s">Addresses</Link></li>
              <li><Link to="/account-details" className="menu-link menu-link_us-s">Account Details</Link></li>
              <li><Link to="/account-wishlist" className="menu-link menu-link_us-s">Wishlist</Link></li>
              <li><Link to="/login-register" className="menu-link menu-link_us-s">Logout</Link></li>
            </ul>
          </div>
          <div className="col-lg-9">
            <div className="page-content my-account__orders-list">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#2416</td>
                    <td>October 1, 2023</td>
                    <td>On hold</td>
                    <td>$1,200.65 for 3 items</td>
                    <td><button className="btn btn-primary">VIEW</button></td>
                  </tr>
                  <tr>
                    <td>#2417</td>
                    <td>October 2, 2023</td>
                    <td>On hold</td>
                    <td>$1,200.65 for 3 items</td>
                    <td><button className="btn btn-primary">VIEW</button></td>
                  </tr>
                  <tr>
                    <td>#2418</td>
                    <td>October 3, 2023</td>
                    <td>On hold</td>
                    <td>$1,200.65 for 3 items</td>
                    <td><button className="btn btn-primary">VIEW</button></td>
                  </tr>
                  <tr>
                    <td>#2419</td>
                    <td>October 4, 2023</td>
                    <td>On hold</td>
                    <td>$1,200.65 for 3 items</td>
                    <td><button className="btn btn-primary">VIEW</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <div className="mb-5 pb-xl-5"></div>
    </main>
  );
};

export default AccountOrders;