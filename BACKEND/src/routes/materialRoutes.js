import { Router } from "express";
import { downloadPdf, getMaterials, MaterialController, updateMaterial } from "../controllers/materialController.js";
import { authValidation } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

router.post(
  "/upload_material",
  authValidation,
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  MaterialController
);

router.get("/get_materials", authValidation, getMaterials);
router.put("/update_material/:id", authValidation, updateMaterial);

router.get('/uploads/:filename', authValidation, downloadPdf);

export default router;