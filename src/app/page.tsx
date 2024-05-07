import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import { getSnapshotMovers } from "@/service/fugle";

export const metadata: Metadata = {
  title: "Stalker",
  description: "stalker dashboard",
};

export const revalidate = 0;

export default async function Home() {
  const snapshotMovers = await getSnapshotMovers({ direction: "up" });

  return (
    <>
      <DefaultLayout>
        <ECommerce snapshotMovers={snapshotMovers.data} />
      </DefaultLayout>
    </>
  );
}
