import { useState } from "react";
const userData = [
  { name: "Jeevan", isChecked: false },
  { name: "Manish", isChecked: false },
  { name: "Prince", isChecked: false },
  { name: "Arti", isChecked: false },
  { name: "rahul", isChecked: false },
];

const MultipleSelect = () => {
  const [users, setUsers] = useState(userData);

  const handleChange = (e) => {
    const { name, checked } = e.target;

    if (name === "allSelect") {
      let tempUser = users.map((user) => {
        return { ...user, isChecked: checked };
      });
      setUsers(tempUser);
    } else {
      let tempUser = users.map((user) => {
        if (user.name === name) {
          return { ...user, isChecked: checked };
        } else {
          return user;
        }
      });
      setUsers(tempUser);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(users.filter((user) => user.isChecked === true));
  };

  return (
    <div className="container mx-auto my-4 max-w-md">
      <form onSubmit={handleSubmit} className="form w-full">
        <h3 className="text-2xl font-bold mb-4">Select Users</h3>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="allSelect"
            checked={!users.some((user) => user?.isChecked !== true)}
            onChange={handleChange}
          />
          <label className="form-check-label ml-2">All Select</label>
        </div>
        {users.map((user, index) => (
          <div className="form-check" key={index}>
            <input
              type="checkbox"
              className="form-check-input"
              name={user.name}
              checked={user?.isChecked || false}
              onChange={handleChange}
            />
            <label className="form-check-label ml-2">{user.name}</label>
          </div>
        ))}
        <input className="bg-green-400 px-4 py-1 rounded" type="submit" />
      </form>
    </div>
  );
};

export default MultipleSelect;
