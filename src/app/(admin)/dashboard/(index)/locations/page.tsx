import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import Link from "next/link";
import { columns } from "./columns";
import { getLocations } from "./lib/data";

export default async function LocationPage() {
  const data = await getLocations();

  return (
    <div className="space-y-4">
      <div className="text-left">
        <Link href="/dashboard/locations/create">
          <Button>
            <PlusCircle className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Location
            </span>
          </Button>
        </Link>
      </div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Locations</CardTitle>
          <CardDescription>Manage your locations</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={data}
            searchPlaceholder="Search Location..."
            label="Locations"
          />
        </CardContent>
      </Card>
    </div>
  );
}
