import { useState, useEffect, ChangeEvent } from "react";
import { Button, Grid, Typography, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { User } from "./config/user";
import UserTable from "./UserTable";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const UsersPage = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setUsers([
        { id: 1, firstName: "krish", lastName: "k", email: "krish@yop.com", phone: "123456789" },
        { id: 2, firstName: "krish", lastName: "k", email: "krish@yop.com", phone: "123456789" },
        { id: 3, firstName: "krish", lastName: "k", email: "krish@yop.com", phone: "123456789" },
        { id: 4, firstName: "krish", lastName: "k", email: "krish@yop.com", phone: "123456789" },
        { id: 5, firstName: "krish", lastName: "k", email: "krish@yop.com", phone: "123456789" },
        { id: 6, firstName: "krish", lastName: "k", email: "krish@yop.com", phone: "123456789" },
        { id: 7, firstName: "krish", lastName: "k", email: "krish@yop.com", phone: "123456789" },
        { id: 8, firstName: "krish", lastName: "k", email: "krish@yop.com", phone: "123456789" },
        { id: 9, firstName: "hari", lastName: "k", email: "krish@yop.com", phone: "123456789" },
        { id: 10, firstName: "krish", lastName: "k", email: "krish@yop.com", phone: "123456789" },
        { id: 11, firstName: "krish", lastName: "k", email: "krish@yop.com", phone: "123456789" },
      ]);

      setLoading(false);
    }, 1500);
  }, []);

  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName} ${user.email} ${user.phone}`
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  return (
   <Grid m={2}>
  <Grid
    container
    spacing={2}
    sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
  >
    <Grid >
      <TextField
        label="Search Users"
        variant="outlined"
        size="small"
        value={searchText}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
      />
    </Grid>
    <Grid >
      <Button
        sx={{ textTransform: "none", backgroundColor: "#d12f2ff2" }}
        variant="contained"
        onClick={() => navigate("/create")}
      >
        <AddCircleOutlineIcon />
        <Typography sx={{ textTransform: "none", ml: 1, fontWeight: "600" }}>
          Add User
        </Typography>
      </Button>
    </Grid>
  </Grid>

 
    <UserTable
      users={filteredUsers}
      loading={loading}
      onView={(user) => navigate(`/view/${user.id}`)}
      onEdit={(user) => navigate(`/edit/${user.id}`)}
      onDelete={handleDelete}
    />

</Grid>

  );
};

export default UsersPage;
