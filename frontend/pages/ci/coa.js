import Table from "../../utilities/Table"
import Upload from "../../utilities/Upload"

const CourseOutcome = ({data,index,lenght}) => {
    data.map((data)=>{
        for (index=0; index<lenght; index++) {
        data[index]=<Upload url={'http://localhost:5002/ci/uploadDetials'}/>
        return data;
        }
    })
    return(
        <>
    <Table data={data} />
    
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