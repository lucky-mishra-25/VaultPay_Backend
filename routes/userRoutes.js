const express = require("express");

const User = require("../models/User");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();


// GET ALL CLIENTS
router.get(
  "/clients",
  auth,
  admin,
  async (req, res) => {
    try {
      const clients = await User.find({
        role: "client",
      });

      res.json(clients);

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

module.exports = router;