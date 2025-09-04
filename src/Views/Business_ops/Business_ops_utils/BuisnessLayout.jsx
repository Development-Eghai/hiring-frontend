import { useCommonState } from "Components/CustomHooks";
import Sidebar from "Components/Panel_compnent/Sidebar";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import JsonData from "./JsonData";
import Header from "Components/Panel_compnent/Header";


export const BuisnessLayout = () => {
    const { commonState } = useCommonState();
    const { jsonOnly } = JsonData();
    const [showSideBar,setShowSideBar] = useState(true)
  

    return (
        <div className="w-100 d-flex flex-wrap main_bg">
            <Sidebar responsiveOn="xl" menuOptions={jsonOnly?.sidebar_data} />

            <main className="layout_main_content">
                <div class="container-fluid overflow-y-auto p-2 vh-100 ">
                    <header className="py-2">
                        <Header setShowSideBar={setShowSideBar} />
                    </header>
                    <div className="pt-3 main_content_height">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    )
}