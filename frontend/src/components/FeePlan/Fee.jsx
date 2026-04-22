import React, { useEffect, useState, useContext } from "react"
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PaymentModal from "./PaymentModal";
import { plansAPI } from "../../features/plansAPI";
import { AuthContext } from "../../context/AuthContext";

const Fee = () => {
  const { user } = useContext(AuthContext);
  
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const [currency, setCurrency] = useState("PKR");
  const [showModal, setShowModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [country, setCountry] = useState("");
  const [customFee, setCustomFee] = useState("");
  
  // Plan management state
  const [activePlan, setActivePlan] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activatingPlan, setActivatingPlan] = useState(false);
  const [showActivePlanDetails, setShowActivePlanDetails] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const conversionRates = { PKR: 1, USD: 280, GBP: 350 };
  const symbols = { PKR: "PKR", USD: "$", GBP: "£" };

  const convertFee = (feeInPKR) => {
    return (feeInPKR / conversionRates[currency]).toFixed(2);
  };

  // Default plans as fallback
  const defaultPlans = [
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

  // Load active plan from localStorage on mount (for quick display)
  useEffect(() => {
    const savedPlan = localStorage.getItem("activePlan");
    if (savedPlan) {
      try {
        setActivePlan(JSON.parse(savedPlan));
      } catch (e) {
        console.error("Error parsing saved plan:", e);
      }
    }
  }, [refreshKey]);

  // Fetch user's active plan on component mount
  useEffect(() => {
    fetchPlansAndUserPlan();
  }, [user, refreshKey]);

  const fetchPlansAndUserPlan = async () => {
    try {
      setLoading(true);
      
      // Fetch available plans (public)
      const plansResponse = await plansAPI.getAllPlans();
      setPlans(plansResponse);
      
      // If user is logged in, fetch their active plan
      if (user && user._id) {
        const userPlanResponse = await plansAPI.getUserPlan();
        console.log("User plan response:", userPlanResponse);
        setActivePlan(userPlanResponse.activePlan);
        // Save to localStorage for persistence
        if (userPlanResponse.activePlan) {
          localStorage.setItem("activePlan", JSON.stringify(userPlanResponse.activePlan));
        } else {
          localStorage.removeItem("activePlan");
        }
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
      // Fallback to default plans if API fails
      setPlans(defaultPlans);
    } finally {
      setLoading(false);
    }
  };

  // Switch Plan: Deactivate old plan first, then activate new one
  const handleSwitchPlan = async (plan) => {
    if (!user || !user._id) {
      toast.error("Please login to switch plans");
      return;
    }

    try {
      setActivatingPlan(true);
      
      // If there's an active plan, deactivate it first
      if (activePlan && activePlan.name) {
        await plansAPI.deactivatePlan();
      }
      
      // Now activate the new plan
      const response = await plansAPI.activatePlan(plan.name);
      
      console.log("Switch response:", response);
      
      // Update UI immediately with the new active plan
      setActivePlan(response.activePlan);
      // Save to localStorage for persistence
      localStorage.setItem("activePlan", JSON.stringify(response.activePlan));
      
      toast.success(`Switched to "${plan.name}" plan successfully!`);
      
      // Force re-render
      setTimeout(() => setRefreshKey(prev => prev + 1), 1500);
    } catch (error) {
      console.error("Error switching plan:", error);
      toast.error(error.response?.data?.message || "Failed to switch plan");
    } finally {
      setActivatingPlan(false);
    }
  };

  // Activate a new plan (calls switchPlan internally if plan already active)
  const handleActivatePlan = async (plan) => {
    // If there's already an active plan, use switch logic
    if (activePlan && activePlan.name) {
      await handleSwitchPlan(plan);
    } else {
      // No active plan, just activate directly
      await handleDirectActivate(plan);
    }
  };

  // Direct activate without checking for existing plan
  const handleDirectActivate = async (plan) => {
    if (!user || !user._id) {
      toast.error("Please login to activate a plan");
      return;
    }

    try {
      setActivatingPlan(true);
      const response = await plansAPI.activatePlan(plan.name);
      
      console.log("Activate response:", response);
      
      // Update UI immediately with the new active plan
      setActivePlan(response.activePlan);
      // Save to localStorage for persistence
      localStorage.setItem("activePlan", JSON.stringify(response.activePlan));
      
      toast.success(`Plan "${plan.name}" activated successfully!`);
      
      // Force re-render by updating refresh key
      setTimeout(() => setRefreshKey(prev => prev + 1), 1500);
    } catch (error) {
      console.error("Error activating plan:", error);
      toast.error(error.response?.data?.message || "Failed to activate plan");
    } finally {
      setActivatingPlan(false);
    }
  };

  const handleDeactivatePlan = async () => {
    if (!user || !user._id) {
      toast.error("Please login to manage plans");
      return;
    }

    try {
      setActivatingPlan(true);
      const response = await plansAPI.deactivatePlan();
      
      // Update UI immediately - clear active plan
      setActivePlan(null);
      
      // Clean localStorage on deactivate
      localStorage.removeItem("activePlan");
      
      toast.success("Plan deactivated successfully!");
      
      // Force re-render
      setTimeout(() => setRefreshKey(prev => prev + 1), 1500);
    } catch (error) {
      console.error("Error deactivating plan:", error);
      toast.error(error.response?.data?.message || "Failed to deactivate plan");
    } finally {
      setActivatingPlan(false);
    }
  };

  const handleEnroll = (plan) => {
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };

  const handleCustomPlanEnroll = () => {
    const enteredValue = parseFloat(customFee);

    if (!country || isNaN(enteredValue) || enteredValue <= 0) {
      toast.error("Please enter valid details");
      return;
    }

    const feeInPKR = enteredValue * conversionRates[currency];
    const feeInUSD = feeInPKR / conversionRates["USD"];

    if (feeInUSD < 35) {
      toast.warning("Minimum fee must be at least $35 USD");
      return;
    }

    // Set custom plan and open payment modal
    setSelectedPlan({
      name: "Custom Plan",
      fee: enteredValue,
      features: ["Customized Plan", "Flexible Schedule", "Personalized Learning"],
    });
    setShowPaymentModal(true);
    setShowModal(false);
    setCountry("");
    setCustomFee("");
  };

  // Check if a plan is the active plan
  const isActivePlan = (planName) => {
    return activePlan && activePlan.name === planName;
  };

  // Check if user has any active plan
  const hasActivePlan = activePlan && activePlan.name;
  
  // Debug: Log state changes
  console.log("DEBUG - user:", user, "hasActivePlan:", hasActivePlan, "activePlan:", activePlan);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-gradient-to-br from-[#F8F5F1] to-white min-h-screen">

      <ToastContainer position="top-center" autoClose={2000} hideProgressBar />

      {/* ================= HERO SECTION ================= */}
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-between px-8 py-20 max-w-7xl mx-auto">
        <div className="md:w-1/2 space-y-6" data-aos="fade-right">
          <h1 className="text-5xl font-extrabold text-[#0E7C5A] leading-tight">
            Learn Quran Online <br />
            <span className="text-[#AF864C]">With Certified Tutors</span>
          </h1>

          <p className="text-gray-700 text-lg">
            Flexible one-on-one Quran classes for kids & adults worldwide.
            Start your spiritual journey today.
          </p>

          <button className="bg-[#0E7C5A] text-white px-6 py-3 rounded-xl shadow-lg hover:bg-[#0C6148] transition">
            Start Free Trial
          </button>
        </div>

        <div className="md:w-1/2 mt-10 md:mt-0" data-aos="fade-left">
          <img
            src="https://images.pexels.com/photos/7621144/pexels-photo-7621144.jpeg"
            alt="Online Quran Learning"
            className="rounded-3xl shadow-2xl"
          />
        </div>
      </section>

      {/* ================= CURRENT ACTIVE PLAN SECTION ================= */}
      {user && user._id && hasActivePlan && (
        <section className="py-8 bg-gradient-to-r from-green-50 to-emerald-50 border-y border-green-200">
          <div className="max-w-4xl mx-auto px-6">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-green-500 text-white p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-[#0E7C5A]">Current Active Plan</h2>
              </div>
              <button
                onClick={() => setShowActivePlanDetails(!showActivePlanDetails)}
                className="text-[#0E7C5A] hover:text-[#0C6148] flex items-center gap-1 font-medium"
              >
                {showActivePlanDetails ? "Hide Details" : "Show Details"}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-5 w-5 transition-transform ${showActivePlanDetails ? "rotate-180" : ""}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Active Plan Card */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-green-400 overflow-hidden">
              <div className="bg-green-500 text-white px-6 py-3 flex items-center justify-between">
                <span className="font-semibold text-lg">✓ {activePlan.name}</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Active</span>
              </div>
              
              {/* Collapsible Details */}
              {showActivePlanDetails && (
                <div className="p-6 space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    {/* Price */}
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-green-700 font-medium">Price</p>
                      <p className="text-2xl font-bold text-[#0E7C5A]">
                        {convertFee(activePlan.fee)} {symbols[currency]}
                      </p>
                    </div>
                    
                    {/* Activated Date */}
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-green-700 font-medium">Activated On</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {formatDate(activePlan.activatedAt)}
                      </p>
                    </div>
                    
                    {/* Duration */}
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-green-700 font-medium">Status</p>
                      <p className="text-lg font-semibold text-green-600">
                        {activePlan.activatedAt ? "Subscribed" : "Pending"}
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  {activePlan.features && activePlan.features.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-600 mb-2">Plan Features:</p>
                      <div className="flex flex-wrap gap-2">
                        {activePlan.features.map((feature, index) => (
                          <span 
                            key={index}
                            className="bg-white border border-green-200 text-green-700 px-3 py-1 rounded-full text-sm"
                          >
                            ✓ {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={handleDeactivatePlan}
                      disabled={activatingPlan}
                      className="flex-1 bg-red-500 text-white py-3 px-6 rounded-xl hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2 font-medium"
                    >
                      {activatingPlan ? (
                        <>
                          <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Deactivate Plan
                        </>
                      )}
                    </button>
                    <div className="text-center text-gray-500 flex items-center justify-center">
                      or
                    </div>
                    <button
                      onClick={() => {
                        document.getElementById("pricing-section")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="flex-1 bg-[#0E7C5A] text-white py-3 px-6 rounded-xl hover:bg-[#0C6148] transition flex items-center justify-center gap-2 font-medium"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Switch Plan
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ================= PRICING SECTION ================= */}
      <section id="pricing-section" className="py-20 bg-[#F8F5F1]">
        <h2 className="text-4xl font-bold text-center text-[#0E7C5A] mb-10">
          Our Fee Plans
        </h2>

        {/* Currency Switch */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap px-4">
          {["PKR", "USD", "GBP"].map((cur) => (
            <button
              key={cur}
              onClick={() => setCurrency(cur)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                currency === cur
                  ? "bg-[#0E7C5A] text-white"
                  : "border border-[#0E7C5A] text-[#0E7C5A] hover:bg-[#0E7C5A] hover:text-white"
              }`}
            >
              {cur}
            </button>
          ))}

          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-2 rounded-lg bg-[#AF864C] text-white hover:bg-[#946D3A]"
          >
            + Custom Plan
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          {loading ? (
            <div className="col-span-3 text-center py-10">
              <div className="animate-spin h-10 w-10 border-4 border-[#0E7C5A] border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading plans...</p>
            </div>
          ) : (
            plans.map((plan, index) => (
              <div
                key={index}
                data-aos="zoom-in"
                className={`bg-white rounded-2xl shadow-xl p-8 transition hover:-translate-y-2 ${
                  isActivePlan(plan.name)
                    ? "border-4 border-green-500 ring-2 ring-green-300"
                    : plan.highlight
                    ? "border-4 border-[#0E7C5A] scale-105"
                    : ""
                }`}
              >
                {/* Active Plan Badge */}
                {isActivePlan(plan.name) && (
                  <div className="bg-green-500 text-white text-center py-1 px-3 rounded-full text-sm font-semibold mb-3">
                    ✓ Active Plan
                  </div>
                )}
                
                <h3 className="text-2xl font-bold text-[#AF864C] mb-3">
                  {plan.name}
                </h3>

                <p className="text-4xl font-bold text-[#0E7C5A] mb-4">
                  {convertFee(plan.fee)} {symbols[currency]}
                </p>

                <ul className="space-y-2 mb-6 text-gray-700">
                  {plan.features.map((feature, i) => (
                    <li key={i}>✔ {feature}</li>
                  ))}
                </ul>

                {/* Plan Management Buttons */}
                {user && user._id ? (
                  <div className="space-y-2">
                    {isActivePlan(plan.name) ? (
                      <button
                        onClick={handleDeactivatePlan}
                        disabled={activatingPlan}
                        className="w-full bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                      >
                        {activatingPlan ? (
                          <>
                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                            Deactivating...
                          </>
                        ) : (
                          "Deactivate Plan"
                        )}
                      </button>
                    ) : hasActivePlan ? (
                      // User has an active plan - show "Switch Plan" button
                      <button
                        onClick={() => handleSwitchPlan(plan)}
                        disabled={activatingPlan}
                        className="w-full bg-[#AF864C] text-white py-3 rounded-xl hover:bg-[#946D3A] disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                      >
                        {activatingPlan ? (
                          <>
                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                            Switching...
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Switch to {plan.name}
                          </>
                        )}
                      </button>
                    ) : (
                      // No active plan - show "Activate Plan" button
                      <button
                        onClick={() => handleDirectActivate(plan)}
                        disabled={activatingPlan}
                        className="w-full bg-[#0E7C5A] text-white py-3 rounded-xl hover:bg-[#0C6148] disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                      >
                        {activatingPlan ? (
                          <>
                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                            Activating...
                          </>
                        ) : (
                          "Activate Plan"
                        )}
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => handleEnroll({...plan, fee: parseFloat(convertFee(plan.fee))})}
                    className="w-full bg-[#0E7C5A] text-white py-3 rounded-xl hover:bg-[#0C6148] transition"
                  >
                    Enroll Now
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 text-center bg-gradient-to-r from-[#0E7C5A] to-[#0C6148] text-white">
        <h2 className="text-4xl font-bold mb-6">
          Start Your Quran Learning Journey Today
        </h2>
        <button onClick={() => handleEnroll(plans[0])} className="bg-[#AF864C] px-10 py-4 rounded-2xl text-lg hover:bg-[#946D3A] transition">
          Enroll Now
        </button>
      </section>

      {/* ================= CUSTOM PLAN MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-[90%] max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-[#0E7C5A]">
              Create Custom Plan
            </h2>

            <input
              type="text"
              placeholder="Enter country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full border p-2 rounded-lg mb-4"
            />

            <input
              type="number"
              placeholder={`Enter fee in ${currency}`}
              value={customFee}
              onChange={(e) => setCustomFee(e.target.value)}
              className="w-full border p-2 rounded-lg mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleCustomPlanEnroll}
                className="px-4 py-2 bg-[#0E7C5A] text-white rounded-lg"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= PAYMENT MODAL ================= */}
      <PaymentModal 
        isOpen={showPaymentModal} 
        onClose={() => setShowPaymentModal(false)} 
        plan={selectedPlan} 
        currency={currency}
      />
    </div>
  );
};

export default Fee;
