import React from 'react';
import ReactDOM from 'react-dom'
import Slider from './Slider';
import NewsList from './NewsList'
import '../styles/form.css'

const RegisterForm = () => {
    return (
        <div class="container bg-light border rounded border-dark" id="regForm">
        <form>
    <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group">
        <label for="exampleInputFirstName">First name</label>
        <input type="text" class="form-control" id="exampleInputFirstName" placeholder="First name"/>
    </div>
    <div class="form-group">
        <label for="exampleInputLastName">Last name</label>
        <input type="text" class="form-control" id="exampleInputLastName" placeholder="Last name"/>
    </div>
    <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
    </div>
    <div class="form-group">
        <label for="exampleInputPassword1">Repeat password</label>
        <input type="password" class="form-control" id="exampleInputPassword" placeholder="Password"/>
    </div>

    <button type="submit" class="btn btn-primary">Submit</button>
</form>
</div>
    )

    
}

export default RegisterForm;