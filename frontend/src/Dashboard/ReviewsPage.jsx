import React from "react";
import ReviewsHeader from "./reviewsPage/ReviewsHeader";
import ReviewsSummaryCards from "./reviewsPage/ReviewsSummaryCards";
import ReviewsTable from "./reviewsPage/ReviewsTable";


function ReviewsPage() {
  return (
    <div>
      <ReviewsHeader />
      <ReviewsSummaryCards />
      <ReviewsTable />
    </div>
  );
}

export default ReviewsPage;
