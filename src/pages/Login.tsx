import { Button } from "@mui/material";

const Login = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:8888/login";
  };

  return (
    <>
      <div className="login">
        <h1>Discover whenever</h1>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          href="http://localhost:8888/login"
          sx={{
            borderRadius: 20,
            width: 150,
          }}
        >
          Login
        </Button>
      </div>
    </>
  );
};
export default Login;
