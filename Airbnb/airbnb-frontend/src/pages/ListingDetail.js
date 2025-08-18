// pages/ListingDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';

const ListingDetail = () => {
  const { id } = useParams();

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-6 mt-6 bg-white shadow rounded">
        <h2 className="text-3xl font-bold">Listing #{id}</h2>
        <p className="mt-4 text-gray-600">More details coming soon...</p>
      </div>
    </>
  );
};

export default ListingDetail;
