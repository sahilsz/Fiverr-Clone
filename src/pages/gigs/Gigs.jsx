import "./Gigs.css";
// import { gigs } from "../../data";
import { useEffect, useRef, useState } from "react";
import req from "../../utils/newRequest";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import GigCard from "../../components/gigCard/GigCard";

export default function Gigs() {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");

  const { search } = useLocation();

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  const minRef = useRef();
  const maxRef = useRef();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigsData"],
    queryFn: () =>
      req(
        `/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
      ).then((res) => {
        return res.data;
      }),
  });

  const apply = () => {
    refetch();
  };

  useEffect(() => {
    refetch();
  }, [sort]);

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">FIVERR &gt; GRAPHICS & DESIGN</span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Fiverrs&apos;s AI
          artists
        </p>
        <div className="menu">
          <div className="left">
            <span>Budged</span>
            <input ref={minRef} type="text" placeholder="min" />
            <input ref={maxRef} type="text" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort By</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading
            ? "Loading..."
            : error
            ? "Something Went Wrong"
            : data.map((gig) => <GigCard key={gig._id} item={gig} />)}
        </div>
      </div>
    </div>
  );
}
