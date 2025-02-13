"use client";

export default function Button({ children, onClick, filter, activeFilter }) {
  return (
    <button
      onClick={() => onClick(filter)}
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-700" : ""
      }`}
    >
      {children}
    </button>
  );
}
