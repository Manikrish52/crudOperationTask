import { Container, Typography, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "./config/user";
import UserForm from "./UserForm";


const EditUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // 🔹 Later replace with API call
    // const fetchUser = async () => {
    //   const res = await axios.get(`/users/${id}`);
    //   setUser(res.data);
    // };

    // Temporary mock user for UI
    const mockUser: User = {
      id: Number(id),
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "123456789",
    };

    setUser(mockUser);
  }, [id]);

  const handleUpdate = (data: User) => {
    console.log("Updated User:", data);

    navigate("/");
  };

  if (!user) return null;

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 5 }}>
        <Typography variant="h5" gutterBottom>
          Edit User
        </Typography>

        <UserForm initialValues={user} onSubmit={handleUpdate} />
      </Paper>
    </Container>
  );
};

export default EditUserPage;
