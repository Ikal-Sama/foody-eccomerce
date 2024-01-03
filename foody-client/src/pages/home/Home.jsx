import React from "react";
import Banner from "../../components/Banner";
import Categories from "./Categories";
import SpecialDshs from "./SpecialDshs";
import Testimonials from "./Testimonials";
import Service from "./Service";

const Home = () => {
  return (
    <div>
      <Banner />
      <Categories />
      <SpecialDshs />
      <Testimonials />
      <Service />
    </div>
  );
};

export default Home;
