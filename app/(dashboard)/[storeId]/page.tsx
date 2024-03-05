import Logout from "@/app/auth/_components/logout";
import Heading from "./settings/_components/hading";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import Overview from "@/components/overview";
import { graphRevernue } from "@/service/get-graph-revenue";
import { getProductsInStock } from "@/service/get-products-instock";
import { getRevenue } from "@/service/get-revenue";
import { getTotalSales } from "@/service/get-totalSales";
import { FcSalesPerformance } from "react-icons/fc";
import { SlBasket } from "react-icons/sl";

const DashboardPage = async ({ params }: { params: { storeId: string } }) => {
  const graphData = await graphRevernue(params.storeId);
  const reminProductsInStock = await getProductsInStock(params.storeId);
  const totalRevenue = await getRevenue(params.storeId);
  const totalSales = await getTotalSales(params.storeId);

  return (
    <div>
      <Heading title="Dashboard" description="dashboard for you store" />
      <Separator className="mt-4" />
      <div className="pt-5 grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">TotalRevenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-x-1">
              <DollarSign />
              <h2>{totalRevenue}</h2>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <FcSalesPerformance className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-x-1">
              <h2>{totalSales}</h2>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">
              Remaining Stock
            </CardTitle>
            <SlBasket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-x-1">
              <h2>{reminProductsInStock}</h2>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="pt-10">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Overview data={graphData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
