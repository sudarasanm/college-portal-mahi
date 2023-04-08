
import Button from "../../../utilities/Button";
import Table from "../../../utilities/Table";

const COA = ({data,index,lenght}) => {
    data.map((data)=>{
        for (index=0; index<lenght; index++) {
        data[index]=<Button name='view' outline='4'/>
        return data;
        }
    })
    return(
        <>
    <Table data={data} />
   
    
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