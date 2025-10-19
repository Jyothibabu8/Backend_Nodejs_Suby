const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer  = require('multer');

// ✅ Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {     // ✅ fixed second argument
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() +path.extName + file.originalname);
        
    }
});

const upload = multer({ storage: storage });

// ✅ Add Firm Controller
const addFirm = async (req, res) => {
    try {
        const { firmName, area, category, region, offer } = req.body;
        const image = req.file ? req.file.filename : undefined;

        // Find vendor
        const vendor = await Vendor.findById(req.vendorId);
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        // Create new firm
        const firm = new Firm({
            firmName,
            area,
            category,
            region,
            offer,
            image,
            vendor: vendor._id
        });

        const savedFirm = await firm.save();

        // ✅ Push only the ObjectId of the firm to the vendor
        vendor.firm.push(savedFirm._id);
        await vendor.save();

        return res.status(200).json({
            message: "Firm added successfully",
            firm: savedFirm
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteFirmById = async(req,res)=>{
    try {
        const firmId = req.params.firmId;
        const deleteProduct = await Firm.findByIdAndDelete(firmId);
        if(!deleteFirmById){
            return res.status(404).json({error:"no product found"})
        }
        
    } catch (error) {
        console.error(error)
        res.status(500).json({error:"internal server error"})
        
    }
}

// ✅ Export with multer middleware
module.exports = { addFirm: [upload.single('image'), addFirm],deleteFirmById };
