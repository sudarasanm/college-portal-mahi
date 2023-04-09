import Table from "../../utilities/Table"
import Upload from "../../utilities/Upload"
import Button from "../../utilities/Button"
import { useState } from 'react';

const CourseOutcome = ({data,index,lenght}) => {




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
const modifiedData = data?.map((item) =>{
    return{
        ...item,
        Upload: <Upload url={'http://localhost:5002/ci/uploadDetials'}/>,
        View : <Button name='view' outline='0' event={handleClick} />
    }

})
    
    return( 
        <>
    <Table data={modifiedData}/>
    <Table data = {datas}/>


    
    </>
 );
 
}

export default CourseOutcome
export async function getServerSideProps(context) {
    const response = await fetch("http://localhost:5002/ci/getfaculty");
    const data = await response.json()
    const datas = data.test
    const lengths = data.length
    return {
        props: {
            data: datas,
            lenght: lengths
        },
    };
}