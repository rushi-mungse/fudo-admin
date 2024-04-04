import { Button } from "antd";

import { ServeCard } from "@/components/cards/serve-card";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

import { TbFreezeRow } from "react-icons/tb";
import { FaShippingFast } from "react-icons/fa";
import { GiHotMeal } from "react-icons/gi";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FeaturedProducts } from "@/components/featured-products";

const HomePage = () => {
  return (
    <div className="bg-background relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="relative overflow-hidden min-h-screen">
          <Section>
            <div className="container w-[90%] mx-auto relative">
              <div className="relative">
                <Heading
                  title="Your Favourite Food Delivery Partner Fudo"
                  text="We are focused on being the best helping hand to local bussinesses"
                  className="mb-4 md:mg-4 lg:mb-4"
                />
                <div className="md:flex items-center justify-center">
                  <Button>Order Now</Button>
                </div>
              </div>
            </div>

            <div className="container w-[90%] mx-auto relative mt-10 md:mt-16">
              <div className="relative">
                <h1 className="h5">What We Serve</h1>
                <p className="text-n-4">
                  Be The Fastest In Delivering Your Food
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 justify-items-center mt-10 md:mt-16 gap-8">
                <ServeCard
                  icon={<FaShippingFast className="size-20 text-yellow-500" />}
                  title="Fastest Delivery"
                  description="Delivery that is always ontime even faster."
                />

                <ServeCard
                  icon={<TbFreezeRow className="size-20 text-blue-500" />}
                  title="Easy To Order"
                  description="You only need a few steps in ordering food."
                />

                <ServeCard
                  icon={<GiHotMeal className="size-20 text-purple-500" />}
                  title="Best Quality"
                  description="Not only fast for us quality is also number one."
                />
              </div>
            </div>
          </Section>
        </div>
      </main>

      <FeaturedProducts />

      <SiteFooter />
    </div>
  );
};

export default HomePage;
