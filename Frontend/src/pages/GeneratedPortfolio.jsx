import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// ✅ Import Templates
import Template1 from "../components/templates/Template1";
import Template2 from "../components/templates/Template2";
import Template3 from "../components/templates/Template3";

const GeneratedPortfolio = () => {
  const { id } = useParams(); // get id from URL
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch portfolio data
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/portfolio/${id}`);
        const result = await res.json();

        setData(result);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [id]);

  // ✅ Loading UI
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-lg">
        Loading portfolio...
      </div>
    );
  }

  // ✅ If no data found
  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        Portfolio not found ❌
      </div>
    );
  }

  // 🧠 Template Mapping (MAIN MAGIC 🔥)
  const templates = {
    template1: Template1,
    template2: Template2,
    template3: Template3,
  };

  // Select template based on design
  const SelectedTemplate = templates[data.design] || Template1;

  // Debug (optional)
  console.log("Selected Design:", data.design);

  // ✅ Render selected template
  return <SelectedTemplate data={data} />;
};

export default GeneratedPortfolio;