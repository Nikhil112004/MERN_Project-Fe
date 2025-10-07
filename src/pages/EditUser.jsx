import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(location.state?.user || null);
  const [loading, setLoading] = useState(!location.state?.user);

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const mobileRef = useRef(null);
  const locationRef = useRef(null);
  const [gender, setGender] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/getUser/${id}`);
        setUser(res.data);
        setGender(res.data.gender);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    }
    if (!user) fetchUser();
  }, [id, user]);

  async function handleUpdate(e) {
    e.preventDefault();

    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;
    const mobile = mobileRef.current.value;
    const userLocation = locationRef.current.value;

    try {
      await axios.put(`http://localhost:3000/api/v1/updateUser/${id}`, {
        firstName,
        lastName,
        email,
        mobile,
        gender,
        location: userLocation,
      });
      alert("User updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      alert("Error updating user.");
      console.error(err);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700 dark:text-white">
        Loading user data...
      </div>
    );
  }

  return (
    <div className="bg-gray-350 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto p-6 bg-[#f5f6f8] dark:bg-gray-900 rounded-lg shadow-md">
        <h2 className="flex justify-center pt-10 pb-6 text-2xl font-bold text-gray-900 dark:text-white">
          Edit User
        </h2>

        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                First Name
              </label>
              <input
                ref={firstNameRef}
                defaultValue={user.firstName}
                type="text"
                className="block p-2 mt-2 w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Last Name
              </label>
              <input
                ref={lastNameRef}
                defaultValue={user.lastName}
                type="text"
                className="block p-2 mt-2 w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              ref={emailRef}
              defaultValue={user.email}
              type="email"
              className="block p-2 mt-2 w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Mobile
            </label>
            <input
              ref={mobileRef}
              defaultValue={user.mobile}
              type="tel"
              className="block p-2 mt-2 w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Gender
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
                    checked={gender === g}
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Location
            </label>
            <input
              ref={locationRef}
              defaultValue={user.location}
              type="text"
              className="block p-2 mt-2 w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#607afb] flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white hover:bg-[#5069e5]"
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
}
