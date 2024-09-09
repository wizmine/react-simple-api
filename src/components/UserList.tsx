import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { IUser } from "../types/types";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/users?offset=${offset}&limit=6`);
      const newUsers = response.data;

      setUsers((prevUsers) => [...prevUsers, ...newUsers]);

      if (newUsers.length < 6) {
        setHasMore(false);
      }

      setError(null);
    } catch (err) {
      setError("Have lost connection with a server.");
    }
  }, [offset]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleShowMore = () => {
    setOffset((prevOffset) => prevOffset + 6);
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {users?.map((user) => (
          <li key={user.id}>
            <img src={user.photo} alt={user.name} />
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Position: {user.position.name}</p>
          </li>
        ))}
      </ul>
      {hasMore && !error && <button onClick={handleShowMore}>Show more</button>}{" "}
    </div>
  );
};

export default UserList;
