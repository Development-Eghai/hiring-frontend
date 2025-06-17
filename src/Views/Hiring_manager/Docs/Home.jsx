import React from "react";
import JsonData from "../Hiring_manager_utils/JsonData";
import { HiringManagerHomeCard } from "Components/Card/HiringManagerHomeCard";


export const Home = () => {
    const { jsonOnly } = JsonData();

    return (
        <div className="h-100">
            <div className="row my-3">
                {jsonOnly?.home_cards?.map((card, index) =>
                    <div className="col-12 col-md-6 col-lg-4 col-xl mb-3 px-2" key={index}>
                        <HiringManagerHomeCard data={card} />
                    </div>
                )}
            </div>
        </div>
    )
}