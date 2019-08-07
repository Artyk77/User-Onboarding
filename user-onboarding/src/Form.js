import React, { useState, useEffect } from 'react';
import axios from "axios";
import { withFormik, Form as FormikForm, Field } from "formik";
import * as Yup from 'yup';


const UserForm = ({ values, errors, touched, handleSubmit, status }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (status) {
            setUsers([...users, status]);
        }
    }, [status]);

    return (
        <>
            <div className="user-form">
                <h1>Gamer On Boarding</h1>
                <FormikForm>
                    <Field type="text" name="username" placeholder="Name" />
                    {touched.username && errors.username && (
                        <p className="error">{errors.username}</p>
                    )}

                    <Field type="text" name="email" placeholder="Email" />
                    {touched.email && errors.email && <p className="error">{errors.email}</p>}

                    <Field type="password" name="password" placeholder="Password" />
                    {touched.password && errors.password && <p className="error">{errors.password}</p>}

                    <Field component="select" className="role-select" name="role">
                        <option>Please Choose a Game Role</option>

                        <option value="scouter">Scouter</option>
                        <option value="rover">Rover</option>
                        <option value="seeker">Seeker</option>
                    </Field>

                    <label className="checkbox-container">
                        I have read and agree to the Terms of Service
                    <Field type="checkbox" name="tos" checked={values.tos} />
                        <span className="checkmark" />
                    </label>

                    
                    <button type="submit">Submit</button>
                </FormikForm>

                {users.map(user => (
                    <p key={user.id}>{user.username}</p>))}
            </div>
            </>
    
    );
};


const FormikUserForm = withFormik({
    mapPropsToValues({ username, email, password, role, tos }) {
        return {
            tos: tos || false,
            role: role || '',
            password: password || '',
            email: email || '',
            username: username || ''
        };
    },

    validationSchema: Yup.object().shape({

        username: Yup.string().required("Name is a required field"),
        email: Yup.string()
            .email("Input a valid email")
            .required("Email is a required field"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is a required field"),
        tos: Yup.boolean().oneOf([true], "Must Accept Terms of Service")
    }),

    handleSubmit(values, { setStatus }) {
        axios
            .post('https://reqres.in/api/users/', values)
            .then(res => {
                setStatus(res.data);
            })
            .catch(err => console.log(err.response));
    }
})(UserForm);

export default FormikUserForm;