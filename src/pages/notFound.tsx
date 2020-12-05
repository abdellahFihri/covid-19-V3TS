import React from "react";
import DataErr from "../hoc/noData/messageError";

const NotFound: React.FunctionComponent = () => (
  <div>
    {" "}
    <DataErr errMsg="Page not found(404)" iconFill="#ff0000" />
  </div>
);

export default NotFound;
