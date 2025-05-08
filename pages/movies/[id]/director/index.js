import React from "react";
import axios from "axios";
const index = (props) => {
  const director = props.director;
  return (
    <div className="bg-white max-w-3xl mx-auto my-8 rounded-lg border overflow-hidden shadow-md">
      <h1 className="text-2xl font-bold p-4 text-gray-800 bg-blue-600 text-white shadow-md">
        Director Details
      </h1>

      <div className="space-y-4 p-6">
        <div className="border-b pb-4">
          <label className="text-sm text-gray-600">ID</label>
          <div className="text-lg font-medium">{director.id}</div>
        </div>

        <div className="border-b pb-4">
          <label className="text-sm text-gray-600">Name</label>
          <div className="text-lg font-medium">{director.name}</div>
        </div>

        <div>
          <label className="text-sm text-gray-600">Biography</label>
          <div className="text-gray-700 leading-relaxed mt-2">
            {director.biography}
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;

export async function getServerSideProps(context) {
  const id = context.query.id;
  const response = await axios.get(
    `http://localhost:3000/api/directors/${id}`
  );
  return {
    props: {
      director:response.data
    },
  };
}
