import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { getOrders } from "./lib/data";

export default async function Page() {
  const order = await getOrders();
  return (
    <div className="space-y-4">
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription>Manage your orders</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            searchPlaceholder="Search Order..."
            data={order}
            label="Orders"
          />
        </CardContent>
      </Card>
    </div>
  );
}
