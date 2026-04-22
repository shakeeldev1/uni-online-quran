import Service from "../models/Service.js";

/* =============================
   GET ALL SERVICES (Admin)
============================= */
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch services",
    });
  }
};

/* =============================
   GET ACTIVE SERVICES (Public)
============================= */
export const getActiveServices = async (req, res) => {
  try {
    const services = await Service.find({ status: "Active" })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error("Error fetching active services:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch active services",
    });
  }
};

/* =============================
   GET SERVICE BY ID
============================= */
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch service",
    });
  }
};

/* =============================
   CREATE SERVICE
============================= */
export const createService = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    
    const { name, description, status, image } = req.body;

    const newService = new Service({
      name,
      description,
      status: status || "Active",
      image: image || "",
    });

    const savedService = await newService.save();
    console.log("Service created:", savedService);

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: savedService,
    });
  } catch (error) {
    console.error("Create service error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create service",
      error: error.message,
    });
  }
};

/* =============================
   UPDATE SERVICE
============================= */
export const updateService = async (req, res) => {
  try {
    const { name, description, status, image } = req.body;

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      { name, description, status, image },
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      data: updatedService,
    });
  } catch (error) {
    console.error("Update service error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update service",
    });
  }
};

/* =============================
   DELETE SERVICE
============================= */
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    await service.deleteOne();

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Delete service error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete service",
    });
  }
};

/* =============================
   TOGGLE STATUS
============================= */
export const toggleServiceStatus = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    service.status = service.status === "Active" ? "Inactive" : "Active";

    await service.save();

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: service,
    });
  } catch (error) {
    console.error("Toggle status error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to toggle status",
    });
  }
};
