import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../App";
import { useLocation } from "react-router-dom";

function FeedbackForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const feedbackLocation = ["/feedback"]

  const [form, setForm] = useState({
    reporterType: "",
    projectReference: "",
    reporterName: "",
    phoneNumber: "",
    email: "",
    roleLicense: "",
    issueType: "",
    issueDescription: "",
    submitAnonymously: false,
    consentFollowup: false,
  });

  const [hasProjectID, setHasProjectID] = useState(false);
  const [addMoreFields, setAddMoreFields] = useState(false);
  const [isRegistered, setIsRegistered] = useState(null);

  const handleIDstateChange = (e) => {
    if (e.target.value === "yes") {
      setHasProjectID(true);
    }
    if (e.target.value === "no") {
      setHasProjectID(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleReporterType = (e) => {
    if (
      [
        "hydrogeologist",
        "water-civil-engineer",
        "licensed-driller",
        "licensed-contractor",
        "licensed-drilling-company",
      ].includes(e.target.value)
    ) {
      setAddMoreFields(true);
    } else {
      setAddMoreFields(false);
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    // You can handle file uploads here
    console.log(`${name}:`, files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
  };

  return (
    <section className={`${feedbackLocation.includes(location.pathname) && "my-32"} flex flex-col items-center`}>
      <h1 className="text-center md:w-[70%] py-4 font-semibold">
        We care deeply about the state of water in our communities. Your
        feedback helps us respond faster, improve project performance, and make
        clean water more available and accessible to everyone.
      </h1>
      <form
        onSubmit={handleSubmit}
        className="md:w-[80%] w-full space-y-6 max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg"
      >
        <div>
          <h1 className="text-black font-bold text-[20px] pb-6">
            Feedback Form
          </h1>
          <div className="text-black pb-6">
            <label htmlFor="project-has-ID">
              Do you have the project's ID?
            </label>
            <div className="pb-4">
              <div className="">
                <input
                  type="radio"
                  name="hasID"
                  value={"yes"}
                  id="hasIDyes"
                  onChange={handleIDstateChange}
                  required
                />
                <label htmlFor="hasIDyes"> YES</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="hasID"
                  value={"no"}
                  id="hasIDno"
                  onChange={handleIDstateChange}
                  required
                />
                <label htmlFor="hasIDno"> NO</label>
              </div>
            </div>
            {hasProjectID && (
              <div>
                <label className="block font-medium">Project ID</label>
                <input
                  name="project-id"
                  type="text"
                  required
                  placeholder="Input Project ID"
                  className="w-full p-2 border rounded"
                />
              </div>
            )}
          </div>
          <label className="block font-medium">Who is submitting?</label>
          <select
            name="reporterType"
            required
            onChange={handleReporterType}
            className="w-full p-2 border rounded"
          >
            <option value="">Select</option>
            <option value="community-member">Community Member</option>
            <option value="hydrogeologist">Hydrogeologist</option>
            <option value="water-civil-engineer">Water / Civil Engineer</option>
            <option value="licensed-driller">Licensed Driller</option>
            <option value="licensed-contractor">Licensed Contractor</option>
            <option value="licensed-drilling-company">
              Licensed Drilling Company
            </option>
          </select>
        </div>
        {/* professional fields inputs */}
        {addMoreFields && (
          <section>
            <div className="pb-4">
              <p className="font-semibold">
                Are you registered on the ngwater.app platform?
              </p>
              <div className="">
                <input
                  type="radio"
                  name="registered-reporter"
                  value={"yes"}
                  id="registered-reporter-yes"
                  onChange={(e) => {
                    if (e.target.value === "yes") {
                      setIsRegistered(true);
                    }
                  }}
                  required
                />
                <label htmlFor="registered-reporter-yes"> YES</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="registered-reporter"
                  value={"no"}
                  id="registered-reporter-no"
                  onChange={(e) => {
                    if (e.target.value === "no") {
                      setIsRegistered(false);
                    }
                  }}
                  required
                />
                <label htmlFor="registered-reporter-no"> NO</label>
              </div>
            </div>
            {/* if user is registered */}
            {isRegistered === true && (
              <div>
                <label className="block font-medium">License Number:</label>
                <input
                  name="roleLicense"
                  type="text"
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            )}
            {/* user not registered */}
            {isRegistered === false && (
              <div className="pb-4">
                <p className="font-semibold">
                  Would you like to register with NGWATER?
                </p>
                <div className="">
                  <input
                    type="radio"
                    name="ask-to-register"
                    value={"yes"}
                    id="ask-to-register-yes"
                    onChange={(e) => {
                      if (e.target.value === "yes") {
                        navigate("/login?signup=true");
                      }
                    }}
                    onClick={() => scrollToTop()}
                    required
                  />
                  <label htmlFor="ask-to-register-yes"> YES</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="ask-to-register"
                    value={"no"}
                    id="ask-to-register-no"
                    required
                  />
                  <label htmlFor="registered-reporter-no"> NO</label>
                </div>
              </div>
            )}
          </section>
        )}
        <div>
          <label className="block font-medium">Full Name</label>
          <input
            name="reporterName"
            type="text"
            required
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Contact Phone</label>
          <input
            name="phoneNumber"
            type="tel"
            required
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Email (Optional)</label>
          <input
            name="email"
            type="email"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Issue Type</label>
          <select
            name="issueType"
            required
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Issue</option>
            <option>No Water</option>
            <option>Leak</option>
            <option>Contamination</option>
            <option>Pump Damage</option>
            <option>Construction Issue</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Describe the Issue</label>
          <textarea
            name="issueDescription"
            maxLength={500}
            required
            rows={4}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Upload Photos (2–5)</label>
          <input
            id="fileUpload"
            name="photos"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="fileUpload"
            className="inline-block cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Upload Images
          </label>
        </div>
        <div>
          <label className="block font-medium">Upload Video (≤30s)</label>
          <input
          id="videoUpload"
            name="video"
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="videoUpload"
            className="inline-block cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Upload Video
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="submitAnonymously"
            checked={form.submitAnonymously}
            onChange={handleChange}
          />
          <label className="font-medium">I DON’T WANT ADMIN TO CONTACT ME</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="consentFollowup"
            checked={form.consentFollowup}
            onChange={handleChange}
          />
          <label className="font-medium">Allow admin to contact me?</label>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Submit Feedback
        </button>
      </form>
    </section>
  );
}

export default FeedbackForm;
