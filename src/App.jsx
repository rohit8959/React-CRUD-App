import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import firebaseAppConfig from './util/firebase-config';
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore'
import 'remixicon/fonts/remixicon.css';
const db = getFirestore(firebaseAppConfig);

const App = () => {
  const model = {
    name: "",
    salary: "",
    date: ""
  }
  const [form, setForm] = useState(model);

  const [employeeData, setEmployeeData] = useState([]);
  const [update, setUpdate] = useState(true);
  const [edit, setEdit] = useState(null);


  const handleData = (e) => {
    const input = e.target;
    const value = input.value;
    const name = input.name;
    setForm({
      ...form,
      [name]: value
    })
  }

  useEffect(() => {

    const req = async () => {
      const snapshot = await getDocs(collection(db, "employees"));
      console.log(snapshot.empty);
      let temp = []
      snapshot.forEach((doc) => {
        const document = doc.data();
        document.uid = doc.id;
        temp.push(document)
      })
      setEmployeeData(temp)
    }
    req();

  }, [update])

  const addEmployee = async (e) => {
    try {
      e.preventDefault();
      const sent = await addDoc(collection(db, "employees"), form);
      Swal.fire({
        title: 'success',
        text: 'Do you want to continue',
        icon: 'success',
        confirmButtonText: 'ok'
      })

    }
    catch (err) {
      console.log(err.message);
    }
    finally {
      setForm(model);
      setUpdate(!update)
    }

  }

  const deleteEmployee = (id) => {
    const ref = doc(db, "employees", id);
    deleteDoc(ref);
    setUpdate(!update)
  }

  const editEmployee = (item) => {
    setEdit(item);
    setForm(item);
  }

  const saveEmployee = (e) => {
    e.preventDefault();
    const ref = doc(db, "employees", edit.uid);

    updateDoc(ref, form);
    setUpdate(!update);
    setForm(model);
    setEdit(null)



  }

  return (
    <div className="px-24 ">
      <div className="flex flex-col items-center w-full">
        <h1 className=" text-indigo-600 text-5xl font-bold flex gap-4 py-8 shadow-lg px-16 rounded w-full justify-center fixed bg-white ">
          <p className="text-black">CRUD</p>
          APP
        </h1>
        <div className=" px-8 py-8 w-full flex gap-12 shadow-lg  mt-32">

          <form onSubmit={edit ? saveEmployee : addEmployee} className="flex flex-col gap-8 w-[30%] shadow-lg h-[500px] fixed bg-white ">
            <h1 className="text-2xl text-orange-600 font-bold bg-slate-200 py-4 px-8 text-center rounded">Add Employee</h1>

            <div className="flex flex-col gap-1 px-4">
              <label className="font-semibold">Fullname</label>
              <input
                onChange={handleData}
                type="text"
                required
                name="name"
                value={form.name}
                placeholder="Enter your name"
                className="border-1 border-gray-200 p-3 rounded" />
            </div>

            <div className="flex flex-col gap-1 px-4">
              <label className="font-semibold">Salary</label>
              <input
                value={form.salary}
                onChange={handleData}
                type="number"
                required
                name="salary"
                placeholder="Enter your salary"
                className="border-1 border-gray-200 p-3 rounded" />
            </div>

            <div className="flex flex-col gap-1 px-4">
              <label className="font-semibold">Joining Date</label>
              <input
                onChange={handleData}
                value={form.date}
                type="date"
                required
                name="date"
                placeholder="Enter your joining date"
                className="border-1 border-gray-200 p-3 rounded" />
            </div>
            {
              edit ? <button className=" ml-4 w-fit bg-rose-500 text-white font-semibold rounded px-8 py-2 hover:bg-green-600 cursor-pointer">
                Save</button>
                :
                <button className="ml-4 w-fit bg-green-500 text-white font-semibold rounded px-8 py-2 hover:bg-green-600 cursor-pointer">
                  Add</button>
            }
          </form>

          <table className="  h-fit w-[70%] ml-[40%] " >
            <thead >
              <tr className="bg-rose-500 text-white w-full" >
                <th className="p-4 ">Serial No.</th>
                <th>Employee Name</th>
                <th>Salary</th>
                <th>Joining Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                employeeData.map((item, index) => (
                  <tr style={{ background: (index % 2 != 0) && "#f3f2fa" }} key={index} className="text-center capitalize" >
                    <td className="p-4 ">{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.salary}</td>
                    <td>{item.date}</td>
                    <td >
                      <div className="flex gap-2 font-semibold text-center">
                        <button
                          onClick={() => { editEmployee(item) }}
                          className="bg-blue-500 text-white p-1 rounded cursor-pointer ">
                          <i className="ri-edit-box-line">
                          </i>
                        </button>
                        <button
                          onClick={() => { deleteEmployee(item.uid) }}
                          className="bg-red-500 text-white p-1 rounded cursor-pointer ">
                          <i className="ri-delete-bin-line">
                          </i>
                        </button>
                      </div>

                    </td>
                  </tr>
                ))
              }



            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
export default App;