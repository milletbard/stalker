import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SingleCharts from "@/components/Single/SingleCharts";
import React from "react";

export default async function Single() {
  return (
    <DefaultLayout>
      <SingleCharts />
    </DefaultLayout>
  );
}
