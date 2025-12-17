import express from "express";
import {
  getTopUsersFromML,
  getRecommendationsFromML
} from "../ML_INTEGRATION/mlClient.js";

const router = express.Router();

router.get("/top-users", async (req, res) => {
  try {
    const limit = Number(req.query.limit || 10);
    const data = await getTopUsersFromML(limit);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "ML service error" });
  }
});

router.get("/recommend", async (req, res) => {
  try {
    const { userIndex, limit } = req.query;
    const data = await getRecommendationsFromML(userIndex, limit);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "ML service error" });
  }
});

export default router;
