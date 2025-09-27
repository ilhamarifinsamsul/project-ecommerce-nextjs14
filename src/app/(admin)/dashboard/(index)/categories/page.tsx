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
import Link from "next/link";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { getCategories } from "./lib/data";

// async function CategoriesTable() {
//   const data = await getCategories();
//   return <DataTable columns={columns} data={data} />;
// }

export default async function CategoriesPage() {
  const data = await getCategories();
  return (
    <div className="space-y-4">
      <div className="text-left">
        <Link href="/dashboard/categories/create">
          <Button>
            <PlusCircle className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Category
            </span>
          </Button>
        </Link>
      </div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>Manage your categories</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={data}
            searchPlaceholder="Search Category..."
            label="Categories"
          />
        </CardContent>
      </Card>
    </div>
  );
}
