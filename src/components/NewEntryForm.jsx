const stages = ["stage A", "stage B (I)", "stage B (II)"];
import { useState, useEffect } from "react";
import { MapPin, Camera, Video } from "lucide-react";
import DragNDrop from "./DragNDrop";
import { UploadFile } from "./DragNDrop";
import UserDashboardHeader from "./UserDashboardHeader";
import { scrollToTop } from "../App";

function NewEntryForm() {
  // manage rod entry in stage B
  const [entries, setEntries] = useState([{ rod: "", minutes: "" }]);

  const handleChange = (index, field, value) => {
    const updated = [...entries];
    updated[index][field] = value;
    setEntries(updated);
  };

  const addMore = () => {
    if (entries.length < 5) {
      setEntries([...entries, { rod: "", minutes: "" }]);
    }
  };

  // capitalize function
  function capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const [selectedOption, setSelectedOption] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(null);
  const [waterCut, setWaterCut] = useState(null);

  //   handle state(state as in States in Nigeria) change and get userState
  const handleStateChange = (e) => {
    const selected = e.target.value;
    setUserState(selected);
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleRadioChange = (e) => {
    setIsSuccessful(e.target.value === "true");
  };
  // true or false for water cut
  const handleWaterCutRadioChange = (e) => {
    setWaterCut(e.target.value === "true");
  };

  //   fetch states
  useEffect(() => {
    fetch("https://nga-states-lga.onrender.com/fetch")
      .then((response) => response.json())
      .then((data) => {
        setStates(data);
      })
      .catch((error) => console.error("Error fetching states:", error));
  }, []);

  // fetch lga based on states
  useEffect(() => {
    fetch(`https://nga-states-lga.onrender.com/?state=${userState}`)
      .then((res) => res.json())
      .then((data) => {
        setLGAs(data);
      })
      .catch((error) => console.log("error fetching lga", error));
  });

  const [presentStage, setPresentStage] = useState("stage A");
  const [states, setStates] = useState([]);
  const [LGAs, setLGAs] = useState([]);
  const [userState, setUserState] = useState("");

  return (
    <section className="md:pl-64 pl-0 flex flex-col items-center">
      <UserDashboardHeader activeSection={"New Entry"} />
      <div className="flex flex-col md:items-left items-center px-10">
        <div className="bg-[#EFF6FF] flex flex-col gap-3 md:p-1 px-6 pb-4">
          <div className="flex flex-row justify-between">
            <h1 className="md:text-[18px] text-[14px] font-semibold text-[#2563EB]">
              {capitalize(presentStage)}
            </h1>
            <h1>
              {stages.indexOf(presentStage) + 1} of {stages.length}
            </h1>
          </div>
          {/* state bar */}
          <div className="md:w-[60vw] w-[90vw] h-2 rounded-full border border-gray-600 p-0">
            <div
              className={`${presentStage === "stage A" && "w-[33%]"} ${
                presentStage === "stage B (I)" && "w-[66%]"
              } ${
                presentStage === "stage B (II)" && "w-[100%]"
              } bg-blue-500 h-full rounded-full`}
            ></div>
          </div>
        </div>
        {/* form content */}
        {presentStage === "stage A" && (
          <div className="bg-white rounded-lg p-3 w-full md:mt-4 mt-0 flex flex-col gap-4">
            <h1 className="md:block hidden font-semibold text-[20px]">
              New Entry - <span>{capitalize(presentStage)}</span>
            </h1>
            {/* client and site info */}
            <h2 className="font-semibold text-[18px] text-[#2C3E50] py-4 bg-[#EFF6FF] p-4 mt-8 mb-4">
              Client and Site Information
            </h2>
            <form action="" className="w-[90%]">
              <div className="flex flex-row gap-4 flex-wrap pb-4">
                {/*  */}
                <div className="md:w-[45%] w-[100%]">
                  <label htmlFor="project-type">Project Type</label>
                  <select
                    name="project-type"
                    id="curve-type"
                    className="p-3 w-[100%] border border-[#E5E7EB] rounded-lg bg-[#F5F7FA]"
                    value={selectedOption}
                    onChange={handleSelectChange}
                  >
                    <option value="">Select Project Type</option>
                    <option value="federal">Federal</option>
                    <option value="state">State</option>
                    <option value="agency">Agency</option>
                    <option value="community">Community</option>
                    <option value="individual">Individual</option>
                  </select>
                </div>
                {/*  */}
                {selectedOption === "agency" && (
                  <div className="md:w-[45%] w-[100%]">
                    <label htmlFor="agencyname">Name of Agency</label>
                    <input
                      type="text"
                      name="agencyname"
                      className="p-3 w-[100%] border border-[#E5E7EB] rounded-lg bg-[#F5F7FA]"
                    />
                  </div>
                )}
                {/*  */}
                <div className="md:w-[45%] w-[100%]">
                  <label htmlFor="clientname">Name of client</label>
                  <input
                    type="text"
                    name="clientname"
                    className="p-3 w-[100%] border border-[#E5E7EB] rounded-lg bg-[#F5F7FA]"
                  />
                </div>
                {/*  */}
                <div className="md:w-[45%] w-[100%]">
                  <label htmlFor="clientphonenumber">Client Phone No.</label>
                  <input
                    type="tel"
                    name="clientphonenumber"
                    className="p-3 w-[100%] border border-[#E5E7EB] rounded-lg bg-[#F5F7FA]"
                  />
                </div>
              </div>
              {/*  */}
              <div className="flex flex-row gap-4 flex-wrap">
                <div className="md:w-[45%] w-[100%]">
                  <label htmlFor="client-email">Client Email Address</label>
                  <input
                    type="email"
                    name="client-email"
                    id="client-email"
                    className="p-3 w-[100%] border border-[#E5E7EB] rounded-lg bg-[#F5F7FA]"
                  />
                </div>
                <div className="md:w-[45%] w-[100%]">
                  <label htmlFor="state">State</label>
                  <select
                    name="state"
                    id="state"
                    className="p-3 w-[100%] border border-[#E5E7EB] rounded-lg bg-[#F5F7FA]"
                    onChange={handleStateChange}
                    value={userState}
                  >
                    <option value="">Select State</option>
                    {states.map((state, index) => (
                      <option key={index} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:w-[45%] w-[100%]">
                  <label htmlFor="lga">Local Government Area</label>
                  <select
                    name="lga"
                    id="lga"
                    className="p-3 w-[100%] border border-[#E5E7EB] rounded-lg bg-[#F5F7FA]"
                  >
                    <option value="">Select LGA</option>
                    {LGAs.map((lga, index) => (
                      <option key={index} value={lga}>
                        {lga}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:w-[45%] w-[100%]">
                  <label htmlFor="town">Town</label>
                  <input
                    type="text"
                    name="town"
                    className="p-3 w-[100%] border border-[#E5E7EB] rounded-lg bg-[#F5F7FA]"
                  />
                </div>
              </div>
              <div className="md:w-[92%] w-[100%] py-4">
                <label htmlFor="street-address">Street Address</label>
                <input
                  type="text"
                  name="street-address"
                  className="p-3 w-[100%] border border-[#E5E7EB] rounded-lg bg-[#F5F7FA]"
                />
              </div>
              <div className="flex flex-row gap-4 flex-wrap pb-4">
                <div className="w-[100%] flex flex-col">
                  <label htmlFor="latitude">GPS Location</label>
                  <div className="flex flex-row flex-wrap gap-4">
                    <input
                      type="text"
                      name="latitude"
                      className="p-3 md:w-[40%] w-[100%] border border-[#E5E7EB] rounded-lg bg-[#F5F7FA]"
                      placeholder="Latitude"
                    />
                    <input
                      type="text"
                      name="longitude"
                      className="p-3 md:w-[40%] w-[100%] border border-[#E5E7EB] rounded-lg bg-[#F5F7FA]"
                      placeholder="Longitude"
                    />
                    <button className="sm:w-[9%] w-[20%] bg-[#0A2647] font-bold flex flex-row justify-center items-center text-white rounded-lg md:h-auto h-12">
                      <MapPin />
                    </button>
                  </div>
                </div>
              </div>
              {/* consultant info */}
              <h2 className="font-semibold text-[18px] text-[#2C3E50] py-4 bg-[#EFF6FF] p-4 mt-8 mb-4">
                Consultant Information
              </h2>
              <div className="flex flex-row gap-4 flex-wrap pb-4">
                <div className="md:w-[45%] w-[100%]">
                  <label htmlFor="consultant-name">Consultant Name</label>
                  <input
                    type="text"
                    name="consultant-name"
                    id="consultant-name"
                    className="p-3 w-[100%] border border-[#E5E7EB] rounded-lg bg-[#F5F7FA]"
                  />
                </div>
                <div className="md:w-[45%] w-[100%]">
                  <label htmlFor="consultant-phone-number">
                    Consultant Phone Number
                  </label>
                  <input
                    type="tel"
                    name="consultant-phone-number"
                    id="consultant-phone-number"
                    className="p-3 w-[100%] border border-[#E5E7EB] rounded-lg bg-[#F5F7FA]"
                  />
                </div>
                <div className="md:w-[45%] w-[100%]">
                  <label htmlFor="consultant-email">Consultant Email</label>
                  <input
                    type="email"
                    name="consultant-email"
                    id="consultant-email"
                    className="p-3 w-[100%] border border-[#E5E7EB] rounded-lg bg-[#F5F7FA]"
                  />
                </div>
                <div className="md:w-[45%] w-[100%]">
                  <label htmlFor="license-number">
                    License Number (NMGS / COMEG)
                  </label>
                  <input
                    type="text"
                    name="clientname"
                    className="p-3 w-[100%] border border-[#E5E7EB] rounded-lg bg-[#F5F7FA]"
                  />
                </div>
              </div>
              <div className="md:w-[92%] w-[100%]">
                <label htmlFor="consultant-address">
                  Address of Consultant
                </label>
                <input
                  type="text"
                  name="consultant-address"
                  id="consultant-address"
                  className="p-3 w-[100%] border border-[#E5E7EB] rounded-lg bg-[#F5F7FA]"
                />
              </div>
              {/* geological data */}
              <h2 className="font-semibold text-[18px] text-[#2C3E50] py-6 mt-8 mb-4 bg-[#EFF6FF]">
                Geological Data
              </h2>
              <div className="flex flex-row gap-4 flex-wrap pb-4">
                {[
                  {
                    name: "estimated-overburden",
                    label: "Estimated Overburden",
                  },
                  { name: "estimated-depth", label: "Estimated Depth" },
                  {
                    name: "estimated-fracture-depth",
                    label: "Estimated Fracture Depth",
                  },
                  {
                    name: "estimated-weathered-zone",
                    label: "Estimated Weathered Zone",
                  },
                  {
                    name: "curve-type",
                    label: "Curve Type (Optional)",
                  },
                ].map((data, index) => (
                  <div key={index} className="md:w-[45%] w-[100%]">
                    <label htmlFor={data.name}>{data.label}</label>
                    <input
                      type="text"
                      className="p-3 w-[100%] border border-[#E5E7EB] rounded-lg bg-[#F5F7FA]"
                      name={data.name}
                    />
                  </div>
                ))}
              </div>
              {/* physical features */}
              <h2 className="font-semibold text-[18px] text-[#2C3E50] p-6 mt-8 mb-4 bg-[#EFF6FF]">
                Physical Features
              </h2>
              <div className="flex flex-row gap-2 items-center text-[14px] pb-4">
                <p>Accessibility: </p>
                <input
                  type="radio"
                  name="accessibility"
                  value={"yes"}
                  id="accessibility-yes"
                />
                <label htmlFor="accessibility-yes">Yes</label>
                <input
                  type="radio"
                  name="accessibility"
                  value={"yes"}
                  id="accessibility-yes"
                />
                <label htmlFor="accessibility-yes">No</label>
              </div>
              <h2 className="font-semibold text-[18px] text-[#2C3E50] p-6 mt-8 mb-4 ">
                Site Media
              </h2>
              <DragNDrop /> {/*for pc*/}
              <UploadFile /> {/*for mobile*/}
              {/* buttons for submission */}
              <div className="w-[100%] flex flex-row gap-4 justify-end py-8">
                <button className="bg-white p-2 border-[1px] border-[#1A237E] text-[16px] text-[#1A237E] rounded-3xl md:block hidden cursor-pointer">
                  Save Draft
                </button>
                <button
                  className="bg-[#1A237E] p-2 text-[16px] text-white rounded-3xl cursor-pointer"
                  onClick={() => {
                    setPresentStage(stages[stages.indexOf(presentStage) + 1]);
                    scrollToTop();
                  }}
                >
                  Next Stage
                </button>
              </div>
            </form>
          </div>
        )}
        {presentStage === "stage B (I)" && (
          <div className="bg-white rounded-lg p-3 w-full md:mt-4 mt-0 flex flex-col gap-4">
            <h1 className="md:block hidden font-semibold text-[20px]">
              New Entry - <span>{capitalize(presentStage)}</span>
            </h1>
            <form action="" className="w-[90%]">
              <div className="flex flex-row gap-4 flex-wrap pb-4">
                {[
                  {
                    name: "name-of-drilling-company",
                    label: "Name of Drilling Company",
                    type: "text",
                  },
                  {
                    name: "license-of-drilling-company",
                    label: "License of Drilling Company",
                    type: "text",
                  },
                  {
                    name: "permit-no.",
                    label: "Permit No.",
                    type: "text",
                  },
                  {
                    name: "permit-issue-date",
                    label: "Permit Issue Date",
                    type: "date",
                  },
                  {
                    name: "actual-overburden",
                    label: "Actual Oveerburden",
                    type: "text",
                  },
                  {
                    name: "actual-fractured-zone",
                    label: "Actual Fractured Zone",
                    type: "text",
                  },
                  {
                    name: "actual-weathered-zone",
                    label: "Actual Weathered Zone",
                    type: "text",
                  },
                  {
                    name: "actual-depth-drilled",
                    label: "Actual Depth Drilled",
                    type: "text",
                  },
                  {
                    name: "drilled-diameter",
                    label: "Drilled Diameter",
                    type: "text",
                  },
                ].map((input, index) => (
                  <div key={index} className="md:w-[45%] w-[100%]">
                    <label htmlFor={input.name}>{input.label}</label>
                    <input
                      type={input.type}
                      name={input.name}
                      className="p-3 w-[100%] border border-[#E5E7EB] rounded-lg bg-[#F5F7FA]"
                    />
                  </div>
                ))}
                <div className="md:w-[45%] w-[100%]">
                  <label htmlFor="drilling-method">
                    Drilling Method (Mud Drill, DTHH, Both)
                  </label>
                  <div className="">
                    <div className="flex flex-row gap-2">
                      <input
                        type="radio"
                        name="drilling-method"
                        id="mud-drill"
                        value={"mud-drill"}
                      />
                      <label htmlFor="mud-drill">Mud Drill</label>
                    </div>
                    <div className="flex flex-row gap-2">
                      <input
                        type="radio"
                        name="drilling-method"
                        id="dthh"
                        value={"dthh"}
                      />
                      <label htmlFor="dthh">DTHH</label>
                    </div>
                    <div className="flex flex-row gap-2">
                      <input
                        type="radio"
                        name="drilling-method"
                        id="both-drilling-methods"
                        value={"both"}
                      />
                      <label htmlFor="both-drilling-methods">Both</label>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <h1 className="text-[16px] text-center font-bold mb-4">
                    Rate of Penetration:
                  </h1>

                  {entries.map((entry, index) => (
                    <div
                      key={index}
                      className="w-full flex flex-row flex-wrap gap-4 mb-4"
                    >
                      <div className="w-[100%] sm:w-[45%]">
                        <label htmlFor={`rod-${index}`}>Rod</label>
                        <input
                          type="number"
                          name={`rod-${index}`}
                          min={1}
                          value={entry.rod}
                          onChange={(e) =>
                            handleChange(index, "rod", e.target.value)
                          }
                          className="p-3 w-full border border-[#E5E7EB] rounded-lg bg-[#F5F7FA]"
                        />
                      </div>
                      <div className="w-[100%] sm:w-[45%]">
                        <label htmlFor={`minutes-${index}`}>
                          No. of Minutes
                        </label>
                        <input
                          type="number"
                          name={`minutes-${index}`}
                          min={1}
                          value={entry.minutes}
                          onChange={(e) =>
                            handleChange(index, "minutes", e.target.value)
                          }
                          className="p-3 w-full border border-[#E5E7EB] rounded-lg bg-[#F5F7FA]"
                        />
                      </div>
                    </div>
                  ))}

                  {entries.length < 5 && (
                    <div className="w-full flex justify-center">
                      <button
                        onClick={addMore}
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Add More
                      </button>
                    </div>
                  )}
                </div>
                {/* casing used */}
                <div className="w-[100%] py-4">
                  <h1 className="text-[16px] text-center font-bold">
                    Casing Used:
                  </h1>
                  <div className="w-[100%] flex flex-row flex-wrap gap-4">
                    {[
                      { name: "diameter", label: "Diameter" },
                      {
                        name: "type",
                        label: "Type",
                      },
                      {
                        name: "length",
                        label: "Length",
                      },
                      {
                        name: "number-of-casing-used",
                        label: "Number of Casing Used",
                      },
                    ].map((data, index) => (
                      <div key={index} className="w-[45%]">
                        <label htmlFor={data.name}>{data.label}</label>
                        <input
                          type="text"
                          name={data.name}
                          className="p-3 w-[100%] border border-[#E5E7EB] rounded-lg bg-[#F5F7FA]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="md:w-[45%] w-[100%]">
                  <label htmlFor="gravel-packing-size">
                    Gravel Packing Size
                  </label>
                  <input
                    type="text"
                    name="clientname"
                    className="p-3 w-[100%] border border-[#E5E7EB] rounded-lg bg-[#F5F7FA]"
                  />
                </div>
                <div className="md:w-[45%] w-[100%]">
                  <label htmlFor="drilling-method">
                    Was the job Successful? (Yes / No)
                  </label>
                  <div className="">
                    <div className="flex flex-row gap-2">
                      <input
                        type="radio"
                        name="project-successful"
                        value={true}
                        checked={isSuccessful === true}
                        onChange={handleRadioChange}
                        required
                      />{" "}
                      Yes
                    </div>
                    <div className="flex flex-row gap-2">
                      <input
                        type="radio"
                        name="project-successful"
                        value={false}
                        checked={isSuccessful === false}
                        onChange={handleRadioChange}
                        required
                      />{" "}
                      No
                    </div>
                  </div>
                </div>
                {/* video and pictures */}
                <h2 className="font-semibold text-[18px] text-[#2C3E50] pt-6 pb-2 w-full">
                  Physical Features
                </h2>
                <DragNDrop />
                <UploadFile />
                {/* buttons for submission */}
                <div className="w-[100%] flex flex-row gap-4 justify-end py-8">
                  <button className="bg-white p-2 border-[1px] border-[#1A237E] text-[16px] text-[#1A237E] rounded-3xl md:block hidden cursor-pointer">
                    Save Draft
                  </button>
                  <button
                    className="bg-[#1A237E] p-2 text-[16px] text-white rounded-3xl cursor-pointer"
                    onClick={(e) => {
                      if (isSuccessful === false) {
                        e.preventDefault();
                        console.log("we submit then");
                      } else {
                        setPresentStage(
                          stages[stages.indexOf(presentStage) + 1]
                        );
                      }
                    }}
                  >
                    {isSuccessful === false ? "Submit" : "Next Stage"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
        {presentStage === "stage B (II)" && (
          <div className="bg-white rounded-lg p-3 w-full md:mt-4 mt-0 flex flex-col gap-4">
            <h1 className="md:block hidden font-semibold text-[20px]">
              New Entry - <span>{capitalize(presentStage)}</span>
            </h1>
            <form action="" className="w-[90%]">
              <div className="flex flex-row gap-4 flex-wrap pb-4">
                <div className="md:w-[45%] w-[100%]">
                  <label htmlFor="depthinstalled">Depth Installed</label>
                  <input
                    type="text"
                    name="depthinstalled"
                    className="p-3 w-[100%] border border-[#E5E7EB] rounded-lg bg-[#F5F7FA]"
                  />
                </div>
                <div className="md:w-[45%] w-[100%]">
                  <label htmlFor="discharging-rate">
                    Discharging Rate (Litre per minute)
                  </label>
                  <input
                    type="text"
                    name="discharging-rate"
                    className="p-3 w-[100%] border border-[#E5E7EB] rounded-lg bg-[#F5F7FA]"
                  />
                </div>
                <div className="md:w-[45%] w-[100%]">
                  <label htmlFor="water-cut">
                    Does the Water Cut? (Yes / No)
                  </label>
                  <div className="">
                    <div className="flex flex-row gap-2">
                      <input
                        type="radio"
                        name="water-cut"
                        value={true}
                        checked={waterCut === true}
                        onChange={handleWaterCutRadioChange}
                        required
                      />{" "}
                      Yes
                    </div>
                    <div className="flex flex-row gap-2">
                      <input
                        type="radio"
                        name="water-cut"
                        value={false}
                        checked={waterCut === false}
                        onChange={handleWaterCutRadioChange}
                        required
                      />{" "}
                      No
                    </div>
                  </div>
                </div>
                {waterCut === true && (
                  <div className="flex flex-row gap-4 flex-wrap pb-4">
                    <div className="md:w-[45%] w-[100%]">
                      <label htmlFor="water-cut-date">On what Day?</label>
                      <input
                        type="date"
                        name="water-cut-date"
                        className="p-3 w-[100%] border border-[#E5E7EB] rounded-lg bg-[#F5F7FA]"
                      />
                    </div>
                    <div className="md:w-[45%] w-[100%]">
                      <label htmlFor="water-cut-time">At What Time?</label>
                      <input
                        type="time"
                        name="water-cut-time"
                        className="p-3 w-[100%] border border-[#E5E7EB] rounded-lg bg-[#F5F7FA]"
                      />
                    </div>
                  </div>
                )}
                <div className="md:w-[45%] w-[100%]">
                  <label htmlFor="static-water-level">Static Water Level</label>
                  <input
                    type="text"
                    name="static-water-level"
                    className="p-3 w-[100%] border border-[#E5E7EB] rounded-lg bg-[#F5F7FA]"
                  />
                </div>
                <div className="w-full flex flex-row justify-end">
                  <button className="bg-[#1A237E] p-2 text-white font-semibold rounded-lg cursor-pointer">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}

export default NewEntryForm;
