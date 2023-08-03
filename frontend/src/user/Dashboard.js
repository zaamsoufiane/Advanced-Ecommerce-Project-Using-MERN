import React, {Fragment} from 'react'
import Layout from "../core/Layout"
import {isAuthenticate} from '../core/helpers'
import { Link } from 'react-router-dom'
const Dashboard = () => {

    const {user} = isAuthenticate()
  
  return (
    <Fragment>
        <Layout title="Dashboard" description={`Hello ${user.name}`} className="container">
            <div className="row">
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-header">User Information</h5>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item border-0">{user.name}</li>
                                <li className="list-group-item border-0">{user.email}</li>
                                <li className="list-group-item border-0">{user.role == 1 ? "Admin" : "User"}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-header">Purcharse History</h5>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item border-0">history</li>
                                <li className="list-group-item border-0"></li>
                                <li className="list-group-item border-0"></li>
                            </ul>
                        </div>
                    </div>
                    <hr />
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-header">User Links</h5>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item border-0">
                                    <Link className='nav-link' to="/cart">My Cart</Link>
                                </li>
                                <li className="list-group-item border-0">
                                    <Link className='nav-link' to="/profile">Profile</Link>
                                </li>
                                <li className="list-group-item"></li>
                            </ul>
                        </div>
                    </div>
                </div>
                
            </div>
        </Layout>
    </Fragment>
  )
}

export default Dashboard