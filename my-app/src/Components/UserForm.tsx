import { TextField, Button, Box } from "@mui/material";
import { useState } from "react";
import { userFormFields } from "./config/userFormConfig";
import { User } from "./config/user";

interface Props {
  initialValues?: User;
  onSubmit: (data: User) => void;
}

const UserForm = ({ initialValues = {
    firstName: "",
    lastName: "",
    phone: "",
    email: ""
}, onSubmit }: Props) => {
  const [formData, setFormData] = useState<User>(initialValues);
  const [errors, setErrors] = useState<any>({});

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let newErrors: any = {};

    userFormFields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit(formData);
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {userFormFields.map((field) => (
        <TextField
          key={field.name}
          label={field.label}
          type={field.type}
          value={formData[field.name] || ""}
          onChange={(e) => handleChange(field.name, e.target.value)}
          required={field.required}
          error={!!errors[field.name]}
          helperText={errors[field.name]}
          fullWidth
        />
      ))}

      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default UserForm;
