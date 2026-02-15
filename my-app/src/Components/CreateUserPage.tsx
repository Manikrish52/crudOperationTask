import { Container, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { User } from "./config/user";
import UserForm from "./UserForm";


const CreateUserPage = () => {
  const navigate = useNavigate();

  const handleCreate = (data: User) => {
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 5 }}>
        <Typography variant="h5" gutterBottom>
          Create New User
        </Typography>

        <UserForm  onSubmit={handleCreate} />
      </Paper>
    </Container>
  );
};

export default CreateUserPage;
