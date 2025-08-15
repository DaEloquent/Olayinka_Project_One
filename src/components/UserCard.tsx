import React, { useState } from "react";
import type { User } from "../types/user";

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="card border rounded-lg p-4 shadow-md bg-white dark:bg-gray-800 dark:text-white">
      <h2 className="text-lg font-bold">{user.name}</h2>
      <p className="text-sm text-gray-500">{user.email}</p>
      <p className="text-sm">Company: {user.company.name}</p>
      <p className="text-sm">City: {user.address.city}</p>

      {showDetails && (
        <div className="mt-2 text-sm text-gray-500">
          <p>Phone: {user.phone}</p>
          <p>Website: {user.website}</p>
        </div>
      )}

      <button
        className="mt-3 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => setShowDetails((prev) => !prev)}
      >
        {showDetails ? "Hide Details" : "View More"}
      </button>
    </div>
  );
};

export default UserCard;
