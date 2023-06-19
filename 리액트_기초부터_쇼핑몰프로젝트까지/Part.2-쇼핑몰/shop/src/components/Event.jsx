import { Outlet } from "react-router-dom";

function Event() {
    return ( 
        <>
            <div>오늘의 이벤트는</div>
            <Outlet/>
        </>
    );
}

export default Event;