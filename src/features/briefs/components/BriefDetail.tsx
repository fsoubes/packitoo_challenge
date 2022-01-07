import React, { Fragment } from "react";
import { useGetBriefQuery } from "../../../shared/api/api";
import { useParams } from "react-router-dom";

interface BriefDetailProps {}

const BriefDetail: React.FC<BriefDetailProps> = () => {
  const { id } = useParams<{ id: string }>();
  const { data: brief } = useGetBriefQuery(id as string);

  const detail ={
      "comment": brief?.comment,
      "productId": brief?.productId
  }

  return <Fragment>
    <div style={{margin:"1rem"}}>
      <h2>{brief?.title}</h2>
       <pre style={{background:"#eee", marginTop:"1.25rem", padding:"5px"}}>{JSON.stringify(detail, null, 4)}</pre>
    </div>
  </Fragment>;
};

export default BriefDetail;


