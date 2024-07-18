import React from "react";
import { useLocation, Link } from "react-router-dom";
import * as BC from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";

export const BreadCrumbs = () => {
  const { pathname } = useLocation();

  // Split the pathname into individual segments, filtering out empty strings
  const paths = pathname
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace("/", "")
    .replace("%20", " ")
    .split("/")
    .filter((x) => x);

  return (
    <BC.Breadcrumb>
      <BC.BreadcrumbList className="flex items-center text-lg">
        {paths.map((value, index) => {
          // Create the URL for the current breadcrumb item
          const to = `/${paths.slice(0, index + 1).join("/")}`;
          // Determine if the current item is the last one
          const isLast = index === paths.length - 1;
          return (
            <div key={index}>
              {isLast ? (
                // If it's the last item, display it as plain text
                <BC.BreadcrumbItem>
                  <BC.BreadcrumbPage className="capitalize">
                    {value}
                  </BC.BreadcrumbPage>
                </BC.BreadcrumbItem>
              ) : (
                // Otherwise, display it as a link
                <div className="flex items-center gap-2">
                  <BC.BreadcrumbItem>
                    <BC.BreadcrumbLink className="capitalize" asChild>
                      <Link to={to}> {value} </Link>
                    </BC.BreadcrumbLink>
                  </BC.BreadcrumbItem>

                  <BC.BreadcrumbSeparator />
                </div>
              )}
            </div>
          );
        })}
      </BC.BreadcrumbList>
    </BC.Breadcrumb>
  );
};
