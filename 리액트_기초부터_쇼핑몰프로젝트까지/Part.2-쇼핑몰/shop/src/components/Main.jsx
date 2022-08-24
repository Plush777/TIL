import { useState } from "react";
import data from '../data';

function Main() {
    let [shoes] = useState(data)

    return ( 
        <>
            <div className="main-bg"></div>
            <div className="container">
                <div className="row">
                    {shoes.map((data, index) => {
                        return (
                            <ShoesList shoes={data} key={index} />
                            //shoes={data} 파라미터로 data 자체를 넘김
                            //shoes=shoes[index] map 반복문 index 값을 찾아서 넘김
                        );
                    })}
                </div>
            </div>
        </>
       
    );
}

function ShoesList({ shoes }) {
    const shoesData = shoes;

    return (
        <div className="col-md-4">
            <img src={shoesData.img} alt={shoesData.alt} width="80%" />
            <h4>{shoesData.title}</h4>
            <p>{shoesData.price}</p>
        </div>
    );
}

export default Main;