
import Button from "../../../utilities/Button";
import Table from "../../../utilities/Table";
import { useState } from 'react';
import axios from 'axios';


const COA = ({data,index,lenght}) => {

    const [datas, setData] = useState("");

    const handleClick = async () => {
        try {
          const response = await fetch('http://localhost:5002/fa/getuplodedData');
          const dataset = await response.json()
          const datas = dataset.test
          setData(datas);

        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };


  const modifiedData = data?.map((item) => {
    return {
      ...item,
      view: <Button name='view' outline='0' event={handleClick} />
    };
  });
  
    return(
    <>
    <Table data ={modifiedData} />
    <Table data = {datas}/>
 
  
    </>
 );
 
}
    


export default COA

export async function getServerSideProps(context) {
    const response = await fetch("http://localhost:5002/fa/getdetials");
    const data = await response.json()
    const datas = data.final
    const lengths = data.length
    return {
        props: {
            data: datas,
            lenght: lengths
        },
    };
}