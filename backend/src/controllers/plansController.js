import User from "../models/User.js";

// Available plans configuration
const availablePlans = [
  {
    name: "Basic",
    fee: 6000,
    features: [
      "3 Classes / Week",
      "30 Minutes",
      "12 Classes / Month",
      "Free Trial Class",
    ],
    highlight: false,
  },
  {
    name: "Standard",
    fee: 9000,
    features: [
      "5 Classes / Week",
      "30 Minutes",
      "Tajweed Practice",
      "Weekly Progress Report",
    ],
    highlight: true,
  },
  {
    name: "Premium",
    fee: 12000,
    features: [
      "6 Classes / Week",
      "45 Minutes",
      "Hifz + Tajweed",
      "24/7 Support",
    ],
    highlight: false,
  },
];

// @desc    Get all available plans
// @route   GET /api/plans
// @access  Public
export const getAllPlans = (req, res) => {
  try {
    res.json(availablePlans);
  } catch (error) {
    console.error("Error fetching plans:", error);
    res.status(500).json({ message: "Server error fetching plans" });
  }
};

// @desc    Get user's current active plan
// @route   GET /api/plans/user
// @access  Private
export const getUserPlan = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      activePlan: user.activePlan,
      availablePlans: availablePlans,
    });
  } catch (error) {
    console.error("Error fetching user plan:", error);
    res.status(500).json({ message: "Server error fetching user plan" });
  }
};

// @desc    Activate a plan for the user
// @route   POST /api/plans/activate
// @access  Private
export const activatePlan = async (req, res) => {
  try {
    const { planName } = req.body;

    if (!planName) {
      return res.status(400).json({ message: "Plan name is required" });
    }

    // Find the plan in available plans
    const plan = availablePlans.find((p) => p.name === planName);

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user's active plan
    user.activePlan = {
      name: plan.name,
      fee: plan.fee,
      activatedAt: new Date(),
      features: plan.features,
    };

    await user.save();

    res.json({
      message: `Plan "${planName}" activated successfully`,
      activePlan: user.activePlan,
    });
  } catch (error) {
    console.error("Error activating plan:", error);
    res.status(500).json({ message: "Server error activating plan" });
  }
};

// @desc    Deactivate user's current plan
// @route   POST /api/plans/deactivate
// @access  Private
export const deactivatePlan = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user has an active plan
    if (!user.activePlan || !user.activePlan.name) {
      return res.status(400).json({ message: "No active plan to deactivate" });
    }

    const deactivatedPlanName = user.activePlan.name;

    // Clear user's active plan
    user.activePlan = {
      name: null,
      fee: null,
      activatedAt: null,
      features: [],
    };

    await user.save();

    res.json({
      message: `Plan "${deactivatedPlanName}" deactivated successfully`,
      activePlan: user.activePlan,
    });
  } catch (error) {
    console.error("Error deactivating plan:", error);
    res.status(500).json({ message: "Server error deactivating plan" });
  }
};
