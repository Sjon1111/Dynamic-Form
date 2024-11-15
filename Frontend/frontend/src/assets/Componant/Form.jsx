import React, { useEffect, useRef, useState } from 'react';
import Axios from 'axios';
import '../Style/style.css';

export default function Form() {


  const [title, settitle] = useState("New Form")
  const [titletxt, settitletxt] = ("")

  const [nameText, setnameText] = useState([{ text: "name", placeholder: "placeholder" }]);
  const [number, setNumber] = useState([{ number: "", placeholder: "number" }]);
  const [email, setEmail] = useState([{ email: "", placeholder: "email" }]);
  const [password, setPassword] = useState([{ password: "", placeholder: "password" }]);
  const [date, setDate] = useState([{ date: "", placeholder: "date" }]);
  const [copyText, setCopyText] = useState(null);
  const [selectedFormIndex, setSelectedFormIndex] = useState(null);
  const [selectedFormData, setSelectedFormData] = useState([]);
  const [updateInput, setUpdateinput] = useState([]);



  const [saveValue, setsaveValue] = useState([]);

  const [formData, setFormData] = useState([]);

  const addElement = useRef();
  const headerElement = useRef();
  const inputElements = useRef();
  const addbtnElement = useRef();
  const valDiv = useRef();
  const inputDiv = useRef()
  const formEditor = useRef()
  const titleEditor = useRef()

  const hideElement = () => {
    titleEditor.current.style.display = 'none';
    formEditor.current.style.display = "block";
    addElement.current.style.display = 'block';
    setnameText((reduceName) => reduceName.slice(0, -1));
    setNumber((reducenum) => reducenum.slice(0, -1));
    setEmail((reduceemail) => reduceemail.slice(0, -1));
    setPassword((reducepass) => reducepass.slice(0, -1));
    setDate((reducedate) => reducedate.slice(0, -1));
  }
  const addInput = () => {
    inputElements.current.style.display = 'block';
    addbtnElement.current.style.display = 'none';
  }

  const handleEditChange = (field, value) => {
    if (!copyText) return;

    const { index, type } = copyText;
    let updatedArray;

    switch (type) {
      case 'text':
        updatedArray = [...nameText];
        updatedArray[index][field] = value;
        setnameText(updatedArray);
        break;
      case 'number':
        updatedArray = [...number];
        updatedArray[index][field] = value;
        setNumber(updatedArray);
        break;
      case 'email':
        updatedArray = [...email];
        updatedArray[index][field] = value;
        setEmail(updatedArray);
        break;
      case 'password':
        updatedArray = [...password];
        updatedArray[index][field] = value;
        setPassword(updatedArray);
        break;
      case 'date':
        updatedArray = [...date];
        updatedArray[index][field] = value;
        setDate(updatedArray);
        break;
      default:
        break;
    }

    setCopyText({ ...copyText, [field]: value }); // Update copyText to reflect the edited value
  };

  const handleCopy = (index, type) => {
    titleEditor.current.style.display = 'none';
    let copiedItem;

    switch (type) {
      case 'text':
        copiedItem = { ...nameText[index], type, index };
        break;
      case 'number':
        copiedItem = { ...number[index], type, index };
        break;
      case 'email':
        copiedItem = { ...email[index], type, index };
        break;
      case 'password':
        copiedItem = { ...password[index], type, index };
        break;
      case 'date':
        copiedItem = { ...date[index], type, index };
        break;
      default:
        break;
    }

    setCopyText(copiedItem);
  };

  const setlable = () => {
    titleEditor.current.style.display = 'inline';
  }
  const handleLable = (event) => {
    settitle(event)
  }

  const addText = () => setnameText([...nameText, { text: "", placeholder: "name" }]);
  const addNum = () => setNumber([...number, { number: "", placeholder: "number" }]);
  const addEmail = () => setEmail([...email, { email: "", placeholder: "email" }]);
  const addPassword = () => setPassword([...password, { password: "", placeholder: "password" }]);
  const addDate = () => setDate([...date, { date: "", placeholder: "date" }]);

  const handleSubmit = async () => {

    const formData = [

      ...nameText.map(item => ({ type: 'text', value: item.text, placeholder: item.placeholder })),
      ...number.map(item => ({ type: 'number', value: item.number, placeholder: item.placeholder })),
      ...email.map(item => ({ type: 'email', value: item.email, placeholder: item.placeholder })),
      ...password.map(item => ({ type: 'password', value: item.password, placeholder: item.placeholder })),
      ...date.map(item => ({ type: 'date', value: item.date, placeholder: item.placeholder })),
    ];


    console.log("Form Data:", formData);
    const response = await Axios.post("http://localhost:8000/Form/insert", formData)
    if (response.status === 201) {
      alert("Form Created successful!");
      window.location.reload();
    }
    console.log(response)
  };
  const handleFormChange = (newValue, fieldIndex) => {

    const updatedSaveValue = [...saveValue];


    updatedSaveValue[selectedFormIndex].fields[fieldIndex] = {
      ...updatedSaveValue[selectedFormIndex].fields[fieldIndex],
      value: newValue,
    };


    setsaveValue(updatedSaveValue);
  };

  const handleFormupdate = (newValue, fieldIndex, fieldKey) => {

    const updatedSaveValue = [...saveValue];


    updatedSaveValue[selectedFormIndex].fields[fieldIndex][fieldKey] = newValue;

    setsaveValue(updatedSaveValue);
    console.log(saveValue)
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get('http://localhost:8000/Form/get'); // Update with correct endpoint
        if (response.data) {
          setFormData(response.data); // Store retrieved form data in state
        }
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };

    fetchData();
  }, [saveValue]);


  const handleFormClick = (index) => {
    setSelectedFormIndex(index); // Set the selected form index
    setsaveValue(formData)
    console.log(saveValue[index])
  };
  const submitForm = (index) => {

    alert('Data Submited , check console')
    console.log("Submitted Data:", saveValue[index].fields);

  };
  const editForm = (index) => {
    valDiv.current.style.display = "none";
    inputDiv.current.style.display = "block";
    const updateVal = [...formData]
    setUpdateinput(updateVal[index])
    console.log(updateInput)
  }
  const deleteForm = async (index) => {
    try {

      const formId = saveValue[index]._id;


      const response = await Axios.delete(`http://localhost:8000/Form/delete/${formId}`);

      if (response.status === 200) {

        const updatedSaveValue = saveValue.filter((_, i) => i !== index);
        setsaveValue(updatedSaveValue);


        setSelectedFormIndex(null);
        alert("Form deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };

  const deleteField = (index, fieldIndex) => {
    const updatedSaveValue = [...saveValue];


    updatedSaveValue[index] = {
      ...updatedSaveValue[index],
      fields: updatedSaveValue[index].fields.filter((_, i) => i !== fieldIndex)
    };


    setsaveValue(updatedSaveValue);
  };
  const updateForm = async (index) => {
    if (index === null) return;


    const updatedForm = {
      _id: saveValue[index]._id,
      fields: saveValue[index].fields
    };

    try {

      const response = await Axios.put(`http://localhost:8000/Form/update/${updatedForm._id}`, updatedForm);

      if (response.status === 200) {
        console.log("Form updated successfully:", response.data);
        alert("Form updated successfully")
      } else {
        console.error("Failed to update form.");
      }
    } catch (error) {
      console.error("Error updating form in database:", error);
    }
  }
  const CancelUpdate = () => {
    valDiv.current.style.display = "block";
    inputDiv.current.style.display = "none";
  }
  return (
    <>
      <div className="grid">
        <div className="header" ref={headerElement}>
          <h1>Welcome To My Form.com</h1>
          <span>This is a simple form builder</span>
          <br />
          <button className="btn" onClick={() => hideElement()}>Create New Form</button>
        </div>



        {/* <div className="add"><h2>Forms</h2></div> */}
        <div className="additem" ref={addElement}>
          <label className='title' htmlFor="">{title}</label><button className='addbtn' onClick={setlable}>Edit</button>

          {nameText.map((item, index) => (
            <div key={index}>
              <input
                type="text"
                name="name"
                placeholder={item.placeholder}
                value={item.text}
                className="dyinput"
                readOnly
                onChange={(event) => handleEditChange('text', event.target.value)}
              />
              <button onClick={() => handleCopy(index, 'text')}>Edit</button>
            </div>
          ))}

          {number.map((item, index) => (
            <div key={index}>
              <input
                type="number"
                name="number"
                placeholder={item.placeholder}
                value={item.number}
                className="dyinput"
                readOnly
                onChange={(event) => handleEditChange('number', event.target.value)}
              />
              <button onClick={() => handleCopy(index, 'number')}>Edit</button>
            </div>
          ))}

          {email.map((item, index) => (
            <div key={index}>
              <input
                type="email"
                name="email"
                placeholder={item.placeholder}
                value={item.email}
                className="dyinput"
                readOnly
                onChange={(event) => handleEditChange('email', event.target.value)}
              />
              <button onClick={() => handleCopy(index, 'email')}>Edit</button>
            </div>
          ))}

          {password.map((item, index) => (
            <div key={index}>
              <input
                type="password"
                name="password"
                placeholder={item.placeholder}
                value={item.password}
                className="dyinput"
                readOnly
                onChange={(event) => handleEditChange('password', event.target.value)}
              />
              <button onClick={() => handleCopy(index, 'password')}>Edit</button>
            </div>
          ))}

          {date.map((item, index) => (
            <div key={index}>
              <input
                type="date"
                name="date"
                placeholder={item.placeholder}
                value={item.date}
                className="dyinput"
                readOnly
                onChange={(event) => handleEditChange('date', event.target.value)}
              />
              <button onClick={() => handleCopy(index, 'date')}>Edit</button>
            </div>
          ))}
          <br></br>
          <button className="addbtn" ref={addbtnElement} onClick={() => addInput()}>ADD INPUT</button>
          <br />
          <div className="inputbtn_div" ref={inputElements}>
            <button className="closebtn" onClick={() => addElement.current.style.display = 'none'}>Close Add Input</button>
            <br />
            <button className="inputbtn" onClick={addText}>Text</button>
            <button className="inputbtn" onClick={addNum}>Number</button>
            <button className="inputbtn" onClick={addEmail}>Email</button>
            <button className="inputbtn" onClick={addPassword}>Password</button>
            <button className="inputbtn" onClick={addDate}>Date</button>
          </div>
          <br />
          <button className="submitbtn" onClick={handleSubmit}>SUBMIT</button>
        </div>

        <div className="edit" ref={formEditor}>
          <h2>Form Editor</h2>
          {/* <span>Edit the selected form field</span> */}
          <input className='formLable'
            type="text"
            placeholder="Edit Form Name"
            value={title}
            onChange={(event) => handleLable(event.target.value)}
            ref={titleEditor}
          />
          {copyText && (
            <div>
              <label>Name</label>
              <input
                type={copyText.type === 'date' ? 'date' : copyText.type === 'password' ? 'password' : 'text'}
                name={copyText.type}
                placeholder={copyText.placeholder}
                value={copyText[copyText.type] || ''}
                className="dyinput"
                onChange={(event) => handleEditChange(copyText.type, event.target.value)}
              />
              <label className='placeholder'>Placeholder</label>
              <input
                type="text"
                placeholder="Edit Placeholder"
                value={copyText.placeholder || ''}
                onChange={(event) => handleEditChange('placeholder', event.target.value)}
              />
            </div>
          )}
        </div>
        <div className='view-Data'>
          <h1>View Form Data</h1>
          {/* {formData.map((form, formIndex) => (
            <div key={form._id} className="form-section">
              <h2>Form {formIndex + 1}</h2>
              {form.fields.map((field, fieldIndex) => (
                <div key={field._id} className="form-field">
                  <label>{field.placeholder}</label>
                  <input
                    type={field.type}
                    value={field.value}
                    placeholder={field.placeholder}
                    onChange={(e) => handleInputformdata(e, formIndex, fieldIndex)}

                  />
                </div>
              ))}
            </div>
          ))} */}

          {formData.map((form, index) => (
            <button className='editbtn' key={index} onClick={() => handleFormClick(index)}>
              {`Form ${index + 1}`}
            </button>
          ))}
          {selectedFormIndex !== null && (
            <div className="form-section" ref={valDiv}>
              <h2>{`Form ${selectedFormIndex + 1}`}</h2>
              {saveValue[selectedFormIndex].fields.map((field, fieldIndex) => (
                <div key={field._id} className="form-field" >
                  <div>
                    <label className='lable'>{field.placeholder}</label>

                    <input
                      type={field.type}
                      value={field.value || ""}
                      placeholder={field.placeholder}
                      onChange={(e) => handleFormChange(e.target.value, fieldIndex)}
                    />
                  </div>

                </div>


              ))}
              <button className='editbtn' onClick={() => submitForm(selectedFormIndex)}>Submit Data</button>
              <button className='editbtn' onClick={() => editForm(selectedFormIndex)}>Edit Form</button>
              <button className='editbtn' onClick={() => deleteForm(selectedFormIndex)}>Delete Form</button>
            </div>

          )}

          {selectedFormIndex !== null && (
            <div className="form-section updateInput" ref={inputDiv}>
              <h2>{`Form ${selectedFormIndex + 1}`}</h2>
              {saveValue[selectedFormIndex].fields.map((field, fieldIndex) => (
                <div key={field._id} className="form-field">
                  <div className="edittextDiv">
                    <input
                      type="text"
                      value={field.placeholder || ""}
                      placeholder="label"
                      className="editText"
                      onChange={(e) => handleFormupdate(e.target.value, fieldIndex, "placeholder")}
                    /><button onClick={() => deleteField(selectedFormIndex, fieldIndex)}>Delete</button>
                    <input
                      type="text"
                      value={field.value || ""}
                      placeholder="value"
                      onChange={(e) => handleFormupdate(e.target.value, fieldIndex, "value")}
                    />
                  </div>
                </div>
              ))}

              <button className='editbtn' onClick={() => updateForm(selectedFormIndex)}>Update Data</button>
              {/* <button className='editbtn' onClick={() => editForm(selectedFormIndex)}>Edit Form</button> */}
              <button className='editbtn' onClick={() => CancelUpdate()}>Cancel</button>
            </div>

          )}


        </div>
      </div>
    </>
  );
}
