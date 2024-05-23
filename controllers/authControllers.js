import User from "../models/user.js";
import HttpError from "../helpers/HttpError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res, next) => {
  try {
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw HttpError(409, "Email in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ email, password: hashedPassword });

    res.send({
      user: {
        email,
        subscription: subscription || "starter",
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw HttpError(401, "Email or password is wrong");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: 60 * 60,
    });

    await User.findByIdAndUpdate(user._id, { token });

    res.send({
      token,
      user: {
        email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const id = req.user.id;
    await User.findByIdAndUpdate(id, { token: null });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);
    res.json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(error)
  }
};

const changeSubscription = async (req, res, next) => {
    try {
      const id = req.user.id;
      const { subscription } = req.body;
      const user = await User.findByIdAndUpdate(
        id,
        { subscription },
        { new: true }
      );
      res.json({
        email: user.email,
        subscription: user.subscription,
      });
    } catch (error) {
        next(error)
    }
}

export { 
    register,
    login, 
    logout, 
    getCurrentUser, 
    changeSubscription 
};