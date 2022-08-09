import React from "react";
import { useParams } from "react-router-dom";

function CodePage() {
  let { code } = useParams();
  return (
    <div>
      <h3>code: {code}</h3>
    </div>
  );
}

export default CodePage;
