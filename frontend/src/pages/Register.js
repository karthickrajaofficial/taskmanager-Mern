import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { reset, register } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && user) {
      navigate('/login');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>

      <div className="min-h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 flex justify-center items-center p-4 md:p-8 overflow-hidden">
       
        <section className="w-full max-w-md bg-white p-6 md:p-8 shadow-lg rounded-lg">
 
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold flex justify-center items-center space-x-2 text-gray-800">
              <FaUser className="text-3xl" />
              <span>Register</span>
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Please create an account
            </p>
          </div>

         
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="name"
                value={name}
                placeholder="Enter your name"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                onChange={onChange}
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                onChange={onChange}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Enter your password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                onChange={onChange}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password2"
                value={password2}
                placeholder="Confirm your password"
                id="password2"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                onChange={onChange}
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Already a User?{' '}
              <Link to="/login" className="text-pink-500 hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

export default Register;
