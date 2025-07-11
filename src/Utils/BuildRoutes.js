import React from "react";
import { Route } from "react-router-dom";

export default function BuildRouter(Routes) {
  return Object.values(Routes).map((route) =>  {
   return <Route path={route.path} key={route.path} Component={route.Component}/>
  });
}
