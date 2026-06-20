import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Welcome to Student Management</h1>
      <h2>Please Select Your Role</h2>

      <Button onClick={() => navigate("/admin")}>
        Admin
      </Button>

      <Button onClick={() => navigate("/student")}>
        Student
      </Button>
    </>
  );
}

export default LandingPage;