import cloudinary from "../config/cloudinary.js";
import Material from "../models/StudyMaterialModel.js";

export const MaterialController = async (req, res) => {
  try {
    const { title, category, description, visibility } = req.body;

    const file = req.files?.file?.[0];
    const image = req.files?.image?.[0];

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "File is required",
      });
    }

    // Upload file (PDF or doc)
    const uploadedFile = await cloudinary.uploader.upload(file.path, {
      folder: "material_files",
      resource_type: "auto", // allows pdf, video, etc.
    });

    // Upload image (optional)
    let uploadedImage = null;
    if (image) {
      uploadedImage = await cloudinary.uploader.upload(image.path, {
        folder: "material_images",
        resource_type: "image",
      });
    }

    const material = new Material({
      title,
      category,
      description,
      fileUrl: uploadedFile.secure_url,
      imageUrl: uploadedImage ? uploadedImage.secure_url : null,
      visibility,
    });

    await material.save();

    return res.status(200).json({
      success: true,
      message: "Successfully uploaded document!",
      material,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMaterials = async(req, res) =>{
    try {
        const materials = await Material.find();

        if(!materials){
            return res.status(404).json({
                success: false,
                message: "Materials not available!"
            })
        }

        return res.status(200).json({
            success: true,
            materials
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const updateMaterial = async(req, res) =>{
  try {
    const id = req.params.id;
    const {...formData} = req.body;

    const material = await Material.findById(id);

    if(!material){
      return res.status(404).json({
        success: false,
        message: "Material not found!"
      })
    }

    material.reviews.push(formData)

    // Object.assign(material, formData);

    await material.save();

    return res.status(200).json({
      success: true,
      message: "Material update successfully!"
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


export const downloadPdf = async(req, res)=>{
  const filePath = path.join(__dirname, 'uploads', req.params.filename);
  res.setHeader('Content-Type', 'application/pdf'); // ensures browser sees PDF
  res.setHeader('Content-Disposition', 'inline');   // or 'attachment' to force download
  res.sendFile(filePath, (err) => {
    if (err) res.status(404).send('File not found');
  });
}