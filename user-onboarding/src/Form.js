import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';


const UserForm = ({ errors, touched, values, handleSubmit, status }) => {
    const [users, setUsers] = useState([]);
    console.log(users);

    useEffect(() => {
        if (status) {
            setUsers([...users, status]);
        }
    }, [status]);

    return (
        <div className="user-form">
            <h1>User Onboarding</h1>
            <Form>
                <Field type="text" name="username" placeholder="Name" />
                {touched.username && errors.username && (
                    <p className="error">{errors.username}</p>
                )}

                <Field type="text" email="email" placeholder="Email" />
                {touched.email && errors.email && <p className="error">{errors.email}</p>}

                <Field type="text" password="password" placeholder="Password" />
                {touched.password && errors.password && <p className="error">{errors.password}</p>}

                <Field component="select" className="role-select" name="role">
                    <option>Please Choose a Game Role</option>
                    <option value="herbivore">Herbivore</option>
                    <option value="carnivore">Carnivore</option>
                    <option value="omnivore">Omnivore</option>
                </Field>

                <label className="checkbox-container">
                    Terms of Service
                    <Field type="checkbox" name="tos"  checked={values.tos}/>
                    <span className="checkmark" />
                </label>

                <Field component="button" type="submit" name="submit" />
                    <button type="submit">Submit</button>
            </Form>

                {users.map(user => (
                    <p key={user.id}>{user.username}</p>
                ))}
        </div>
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
                username: Yup.string().required(),
            email: Yup.string().required(),
            password: Yup.string().required(),
        }),
    
    handleSubmit(values, {setStatus}) {
                axios
                    .post('https://reqres.in/api/users/', values)
                    .then(res => {
                        setStatus(res.data);
                    })
                    .catch(err => console.log(err.response));
            }
        })(UserForm); // currying functions in Javascript
        
export default FormikUserForm;