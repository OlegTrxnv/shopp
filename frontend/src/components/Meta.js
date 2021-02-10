import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({
  title = "Welcome to Shopp",
  description = "Keep selling you best for cheap",
  keywords = "electronics, buy electronics, cheap electronics, best electronics",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

export default Meta;
