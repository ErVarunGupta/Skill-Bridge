import { LeftComponent } from "./left.components/LeftComponent";
import { RightComponent } from "./right.components/RightComponent";

import './Dashboard.css'

export const Dashboard =  () => {
  return (
    <>
      <div className="dashboard-container">
        <div className="left-container">
            <LeftComponent />
        </div>
        <div className="right-container">
            <RightComponent />
        </div>
      </div>
    </>
  );
};
