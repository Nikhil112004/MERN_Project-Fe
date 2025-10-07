import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../config"; 

export function NewUser() {
  const navigate = useNavigate();

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const mobileRef = useRef(null);
  const locationRef = useRef(null);
  const [gender, setGender] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const mobile = mobileRef.current?.value;
    const location = locationRef.current?.value;

    if (!firstName || !lastName || !email || !gender || !mobile || !location) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await axios.post(`${BACKEND_URL}api/v1/createUser`, {
        firstName,
        lastName,
        email,
        mobile,
        gender,
        location,
      });
      alert("You have successfully registered!");
      navigate("/dashboard");
    } catch (e) {
      alert("Registration failed. Try again.");
    }
  }

  return (
    <div className="bg-gray-350 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto p-6 bg-[#f5f6f8] dark:bg-gray-900 rounded-lg shadow-md">
        <h2 className="flex justify-center pt-10 pb-6 text-2xl font-bold text-gray-900 dark:text-white">
          Add New User
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                First Name
              </label>
              <input
                ref={firstNameRef}
                id="firstName"
                name="firstName"
                placeholder="Enter first name"
                type="text"
                className="block p-2 mt-2 w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Last Name
              </label>
              <input
                ref={lastNameRef}
                id="lastName"
                name="lastName"
                placeholder="Enter last name"
                type="text"
                className="block p-2 mt-2 w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email Address
            </label>
            <input
              ref={emailRef}
              id="email"
              name="email"
              placeholder="Enter email address"
              type="email"
              className="block p-2 mt-2 w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-primary focus:border-primary"
            />
          </div>

          <div>
            <label
              htmlFor="mobile"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Mobile
            </label>
            <input
              ref={mobileRef}
              id="mobile"
              name="mobile"
              placeholder="Enter mobile number"
              type="tel"
              className="block p-2 mt-2 w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Your Gender
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {["male", "female", "other"].map((g) => (
                <label
                  key={g}
                  className={`flex items-center p-4 rounded-lg border cursor-pointer 
                    ${
                      gender === g
                        ? "border-blue-500 bg-blue-50 dark:bg-gray-700"
                        : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700`}
                >
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    onChange={(e) => setGender(e.target.value)}
                    className="form-radio h-4 w-4 text-primary border-gray-300 dark:border-gray-600 focus:ring-primary"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white capitalize">
                    {g}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Enter Your Location
            </label>
            <input
              ref={locationRef}
              id="location"
              name="location"
              placeholder="Enter location"
              type="text"
              className="block p-2 mt-2 w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-primary focus:border-primary"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#607afb] flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white hover:bg-[#5069e5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#607afb]"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
