import React, { memo } from "react";

const reRenderCondition = (prev: any, next: any) => {
  return JSON.stringify(prev) === JSON.stringify(next);
};

const customMemo = (Component: React.FC<any>) => {
  return memo(Component, reRenderCondition);
};

export default customMemo;
