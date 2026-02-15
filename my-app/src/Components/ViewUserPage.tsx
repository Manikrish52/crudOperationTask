import {
  Container,
  Typography,
  Paper,
  Box,
  Divider,
  Button,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "./config/user";
import { userFormFields } from "./config/userFormConfig";


const ViewUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const mockUser: User = {
      id: Number(id),
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "123456789",
    };

    setUser(mockUser);
  }, [id]);

  if (!user) return null;

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 5 }}>
        <Typography variant="h5" gutterBottom>
          User Details
        </Typography>

        <Divider sx={{ marginBottom: 3 }} />

        <Box display="flex" flexDirection="column" gap={2}>
          {userFormFields.map((field) => (
            <Box key={field.name}>
              <Typography variant="subtitle2" color="text.secondary">
                {field.label}
              </Typography>
              <Typography variant="body1">
                {user[field.name] || "-"}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box mt={4}>
          <Button variant="contained" onClick={() => navigate("/")}>
            Back
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ViewUserPage;
