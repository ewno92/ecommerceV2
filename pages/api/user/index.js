import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";
import auth from "../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await changeInfor(req, res);
      break;
    case "GET":
      await getUsers(req, res);
      break;
  }
};

const getUsers = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid" });

    const users = await Users.find().select("-password");
    res.json({ users });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const changeInfor = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (req.body.name) {
      const { name } = req.body;
      const newUser = Users.findById({ _id: result._id }, (err, user) => {
        if (err)
          return res.status(500).json({
            err: `Server Error`,
          });
        user.name = name;
        user.save();
      });
      res.json({
        msg: "Name Update Success!",
      });
    }

    if (req.body.password) {
      const { password } = req.body;
      const newUser = Users.findById({ _id: result._id }, (err, user) => {
        if (err)
          return res.status(500).json({
            err: `Server Error`,
          });
        user.password = password;
        user.save();
      });
    }
    const newser = await auth(req, res);
    res.json({
      msg: "Password Update Success!",
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
