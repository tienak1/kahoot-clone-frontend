import React from "react";
import { useParams } from "react-router-dom";

export default function PresentationDetail() {
  const params = useParams();
  console.log(params.name);
  return <div>PresentationDetail</div>;
}
