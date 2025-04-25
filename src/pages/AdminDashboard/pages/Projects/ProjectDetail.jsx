import React from 'react';

const ProjectDetails = () => {
  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen w-full overflow-x-hidden">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Project Details</h1>
        <div className="space-x-2">
          <button className="bg-white border border-blue-600 text-blue-600 px-4 py-2 rounded-md text-sm">Export</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">Edit Project</button>
        </div>
      </div>

      {/* Client Info */}
      <section className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Client Information</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p><strong>Client Name:</strong> John Development Company Ltd</p>
            <p><strong>Email Address:</strong> contact@johndevelopment.com</p>
            <p><strong>GPS Coordinates:</strong> 6.5244° N, 3.3792° E</p>
          </div>
          <div>
            <p><strong>Phone Number:</strong> +234 904 234 5678</p>
            <p><strong>Address:</strong> 123 Main Street, Central District, Lagos State</p>
            <p><strong>Elevation:</strong> 45 meters above sea level</p>
          </div>
        </div>
      </section>

      {/* Geologist Info */}
      <section className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Geologist Information</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p><strong>Phone Number:</strong> +234 802 365 8710</p>
          </div>
          <div>
            <p><strong>License Number:</strong> NMG/2023/123456 + COMEG/2023/678910</p>
            <p><strong>Address:</strong> 45 Geoscience Road, Professional District, Abuja</p>
          </div>
        </div>
      </section>

      {/* Geological Data */}
      <section className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Geological Data</h2>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <p><strong>Overburden:</strong> 25 meters</p>
            <p><strong>Water-Bearing Zone:</strong> 35 meters</p>
          </div>
          <div>
            <p><strong>Depth:</strong> 150 meters</p>
            <p><strong>Curve Type:</strong> Type A</p>
          </div>
          <div>
            <p><strong>Likely Fracture Depth:</strong> 65 meters</p>
            <p><strong>Accessibility:</strong> Yes</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-4">
          {[1,2,3,4,5].map((_, i) => (
            <img
              key={i}
              src={`https://via.placeholder.com/150x100?text=Image+${i+1}`}
              alt={`Geological site ${i+1}`}
              className="w-32 h-20 object-cover rounded-md"
            />
          ))}
        </div>
      </section>

      {/* Drilling Info */}
      <section className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Drilling Information</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p><strong>Drilling Contractor:</strong> Deep Wells Nigeria Ltd</p>
            <p><strong>Project Number:</strong> PJD2024/25</p>
            <p><strong>Rate of Penetration:</strong></p>
            <ul className="list-disc list-inside">
              <li>1 meter – 45</li>
              <li>2 meters – 42</li>
            </ul>
          </div>
          <div>
            <p><strong>License Number:</strong> DW/2023/789</p>
            <p><strong>Date:</strong> 15 January 2024</p>
            <p><strong>Casing Details:</strong></p>
            <ul className="list-disc list-inside">
              <li>6" PVC – 100m</li>
              <li>4" Steel – 50m</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetails;
