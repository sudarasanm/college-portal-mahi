import { useState, useEffect } from "react";
import axios from "axios";
import Dropdown from "../../../utilities/Dropdown";
import Download from "../../../utilities/Download"
import Upload from "../../../utilities/Upload"
import Search from "../../../utilities/Search"
import Table from "../../../utilities/Table"

const ReportGeneration = () => {
    let omit = [ "_id"]
    const omitFields = (field) => !omit.some(item => item == field)
  
      const [ branch, setBranch ] = useState("ALL")
      const [ batch, setBatch ] = useState(null)
      const [ filter, setFilter ] = useState(null)
      const [ fields, setFields ] = useState(null)
      const [ search, setSearch ] = useState("")
      const [isloading, setIsloading] = useState(false)
      const [ data, setData ] = useState(null)
      const [ editedDoc, setEditedDoc ] = useState({})
  
      
      useEffect(() => {
          setData(null)
          let data = {
              batch:batch
          }
          console.log(data)
          setIsloading(true)
          axios
              .post(process.env.NEXT_PUBLIC_URL + '/admin/enrolment/query', data)
              .then((response) => {
              if(response.data.results.length == 0){
                  console.log("Empty array")
                  setIsloading(false)
              }
              let data = response.data.results,
                  fields = [];
                  console.log(data)
              fields = Object.keys(data[0]).filter((key) => omitFields(key));
              console.log(fields)
              setFilter(fields[0]);
              setFields(fields);
              setData(data);
              setIsloading(false)
              })
              .catch((err) => console.log(err.message));
      }, [batch])
  
      useEffect(() => {
          if(JSON.stringify(editedDoc) != "{}")
              for(let idx in data)
                  if(data[idx]._id == editedDoc._id) {
                      axios.put(process.env.NEXT_PUBLIC_URL + '/admin/query/update', editedDoc)
                          .then(response => {
                              data[idx] = {...editedDoc}
                              setData([...data])
                          }).catch(err => console.log(err.message))
                  }
      }, [ editedDoc ])
      
      const filterSearch = (doc) => doc[filter.charAt(0).toLowerCase() + filter.slice(1)].toString().toLowerCase().includes(search.toString().toLowerCase())
      
      const filterCheck = (doc) => (branch == "ALL" ? true : doc.branch == branch) && filterSearch(doc)
  
      return (
      <>
          <div className="mr-2 flex justify-between">
              <div className="flex space-x-6">
                  <Dropdown name="Batch" update={setBatch} data={[2018, 2019, 2020]} />
                  {data?
                      <Dropdown name="Branch" update={setBranch} data={["ALL", "IT", "CSE", "Civil", "Mech", "EEE", "EIE", "Prod", "IBT"]} />
                      :<></>
                  }
              </div>
              {
                  data?
                  <Search options={fields} filter={filter} setFilter={setFilter} search={search} update={setSearch}/>
                  :<>
                  </>
              }
              <div className="flex mt-2 space-x-2">
                  <Upload url={process.env.NEXT_PUBLIC_URL + '/admin/enrolment/query/upload'}/>
                  {data ? 
                 
                  <Download url={process.env.NEXT_PUBLIC_URL + '/admin/enrolment/query/download'} ids={data.filter(doc => filterCheck(doc)).map(doc => doc._id)} name={"enrolmentData_downlad_"+batch} />
              
                  : <></>}
                  
              </div>
      </div><br/>
          
              {
                  data ?
                  <>
                  {/* <Table editable data={data} update={setEditedDoc} omit={omit} indexed/><br/>  */}
                  <Table editable data={data.filter(doc => filterCheck(doc))} update={setEditedDoc} omit={omit} indexed/><br/> 
       
                  </>
                  
                  : batch?isloading?<>Loading...</>:<>No Data Exists</>:
                      <>
                      Please choose batch
                      </>
              }
      </>  
         
          
      )
}
export default ReportGeneration