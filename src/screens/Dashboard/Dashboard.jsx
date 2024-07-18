import React from "react";
import { ContactRound, Wallet, WalletCards } from "lucide-react";
import { comma } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Dashboard = () => {
  const statsArray = [
    {
      title: "Wallet Requests",
      icon: <Wallet className="text-blue-500" />,
      content: comma(1000),
      footer: "Updated 1 min ago",
    },

    {
      title: "Reversal Requests",
      icon: <WalletCards className=" text-green-500" />,

      content: comma(10000),
      footer: "Updated 1 min ago",
    },

    {
      title: "Customer Requests",
      icon: <ContactRound className=" text-cyan-500" />,

      content: comma(100),
      footer: "Updated 1 min ago",
    },
  ];
  return (
    <div>
      {" "}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statsArray.map((item) => (
          <Card
            className={`rounded-xl border bg-card text-card-foreground shadow`}
          >
            <CardHeader className="p-6 flex flex-row items-center justify-between space-y-0 pb-2 ">
              <CardTitle className="tracking-tight text-sm font-medium">
                {item.title}
              </CardTitle>
              {item.icon}
            </CardHeader>
            <CardContent className={`p-6 pt-0`}>
              <div className="text-2xl font-bold">{item.content}</div>
            </CardContent>
            <CardFooter className={`-mt-2 ml-1`}>
              <p className="text-xs text-muted-foreground">{item.footer}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
