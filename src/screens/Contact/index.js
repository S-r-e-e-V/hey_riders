import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Contact.css";

const ContactForm = () => {
  const initialValues = {
    name: "",
    email: "",
    message: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Add your form submission logic here

    setSubmitting(false);
    resetForm();
  };

  return (
    <div className="contact-page">
      <div className="form-container">
        <h2 className="title">Contact Us</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <Field type="text" name="name" placeholder="Your Name" />
                <ErrorMessage name="name" component="div" className="error" />
              </div>

              <div className="form-group">
                <Field type="email" name="email" placeholder="Your Email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <div className="form-group">
                <Field
                  as="textarea"
                  name="message"
                  placeholder="Your Message"
                  rows="5"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="error"
                />
              </div>

              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ContactForm;
