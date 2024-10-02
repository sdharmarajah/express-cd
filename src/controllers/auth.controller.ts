import catchAsync from "../utils/catchAsync";
import { authService, userService, tokenService } from "../services";

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthToken(user);
  res.send({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    token: tokens.token,
  });
});

export default {
  login,
};
