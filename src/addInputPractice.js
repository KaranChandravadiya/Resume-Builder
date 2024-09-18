//ONLY MULTIPLE INPUT FIELDS PRACTICE CODE NOT USE IN PROJECT


// import { useState } from "react";

// export default function AddInputPractice() {
//   const [inputs, setInputs] = useState([{ firstName: "", lastName: "" ,year : ""}]);

//   const handleAddInput = () => {
//     setInputs([...inputs, { firstName: "", lastName: "" , year : ""}]);
//   };

//   const handleChange = (event, index) => {
//     let { name, value } = event.target;
//     // console.log(name, value)
//     let onChangeValue = [...inputs];
//     // console.log(onChangeValue ,"onChangeValue onChangeValue ")
//     onChangeValue[index][name] = value;
//     setInputs(onChangeValue);
//   };

//   const handleDeleteInput = (index) => {
//     const newArray = [...inputs];
//     setInputs(newArray.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="container">
//       {inputs.map((item, index) => (
//         <div className="input_container" key={index}>
//           <input
//             name="firstName"
//             type="text"
//             value={item.firstName}
//             onChange={(event) => handleChange(event, index)}
//           />
//           <input
//             name="lastName"
//             type="text"
//             value={item.lastName}
//             onChange={(event) => handleChange(event, index)}
//           />
//           <input
//             name="year"
//             type="text"
//             value={item.year}   
//             onChange={(event) => handleChange(event, index)}
//           />
//           {inputs.length > 1 && (
//             <button onClick={() => handleDeleteInput(index)}>Delete</button>
//           )}
//           <div>
//           {index === inputs.length - 1 && (
//             <button onClick={() => handleAddInput()}>Add</button>
//           )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }