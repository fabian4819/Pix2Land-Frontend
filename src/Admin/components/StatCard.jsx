import React from "react";

const StatCard = ({ icon, count, title, bgColor }) => {
  return (
    <div
      className={`p-6 rounded-lg shadow-lg text-white ${bgColor} flex items-center justify-between`}
    >
      <div>
        <h2 className="text-4xl font-bold">{count}</h2>
        <p className="text-sm uppercase font-bold mt-1">transaksi {title}</p>
      </div>
      <div className="text-5xl opacity-70">{icon}</div>
    </div>
  );
};

export default StatCard;
