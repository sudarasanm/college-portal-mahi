import Dropdown from "../../../utilities/Dropdown"
import Table from "../../../utilities/Table";
import Upload from "../../../utilities/Upload";

const COA = ({data}) => {
    
    return <div>
        <Dropdown name = 'Semester' data={[1,2,3,4,5,6,7,8]}/>
        <Dropdown name = 'CourseCode' data={["18IPC702","18IEE708","18IPC607","18IEE801"]}/>
        <Dropdown name = 'Branch' data={["Information Technology","Computer Science","Civil","EEE","ECE"]}/>
        <Upload url={'http://localhost:5002/ci/uploadDetials'}/>
        <>
    <Table data={data} />
   
    
    </>
    </div>
}

export default COA

export async function getServerSideProps(context) {
    const response = await fetch("http://localhost:5002/fa/getuplodedData");
    const data = await response.json()
    const datas = data.test
    return {
        props: {
            data: datas,
        },
    };
}