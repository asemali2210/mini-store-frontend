import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { STRAPI_API_URL } from "@/lip/strapi.config";
function NewsletterForm() {
  const initVAlues = {
    email: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
  });
  const registerUser = async (values) => {
    try {
      const response = await axios.post(STRAPI_API_URL + "/subscribers", {
        data: {
          email: values.email,
        },
      });
      console.log("User created:", response.data);
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
    }
  };
  return (
    <Formik
      className="d-flex align-items-center"
      initialValues={{ email: "" }}
      validationSchema={validationSchema}
      onSubmit={registerUser}
    >
      {({ errors, touched }) => (
        <Form>
          {errors.email && touched.email && (
            <div className="error__message mb-2">{errors.email}</div>
          )}
          <Field
            name="email"
            type="email"
            className="input__email"
            placeholder="Email address"
          />
          <button className="submit__btn" type="submit">
            Subscribe
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default NewsletterForm;
