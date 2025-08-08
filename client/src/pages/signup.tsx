import { Signupbox } from "../components/signupbox";

function Signup() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://source.unsplash.com/random/1600x900?vacation')",
      }}
    >
      <Signupbox />
    </div>
  );
}

export default Signup;
